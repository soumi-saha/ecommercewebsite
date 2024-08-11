document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: 1, name: "Iphone 15 Pro Max", price: 151700, img: "https://i.postimg.cc/y6DdLgc9/best-iphone-models.jpg" },
        { id: 2, name: "boAt Xtend Smartwatch", price: 1999, img: "https://i.postimg.cc/0ynncB1V/617ys-Oitci-L-AC-UF1000-1000-QL80.jpg" },
        { id: 3, name: "boAt Immortal 121 Airdopes", price: 2098, img: "https://i.postimg.cc/y8Kgk15G/61q-2yzb-Bt-L-AC-UF1000-1000-QL80.jpg" },
        { id: 4, name: "Adidas Niteball 2.0 Sneakers", price: 2850, img: "https://i.postimg.cc/t4FGrPXr/adidas-niteball-2-0-premium-quality-trending-sneaker-shoes.jpg" },
    ];

    function renderProducts() {
        const productList = document.getElementById('product-list');
        productList.innerHTML = '';
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.className = 'product';
            productDiv.innerHTML = `
                <img src="${product.img}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>$${product.price}</p>
                <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
            `;
            productList.appendChild(productDiv);
        });

        // Attach event listeners to "Add to Cart" buttons
        const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', addToCart);
        });
    }

    let cart = [];

    function addToCart(event) {
        const productId = parseInt(event.target.getAttribute('data-id'));
        const product = products.find(p => p.id === productId);

        // Check if product is already in cart
        const existingProduct = cart.find(p => p.id === productId);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        updateCartCount();
    }

    function updateCartCount() {
        const cartCount = document.getElementById('cart-count');
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }

    renderProducts();
});


    // Speech recognition setup
    const startSpeechButton = document.getElementById('start-speech');
    const searchBar = document.getElementById('search-bar');

    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        searchBar.value = transcript;
        // Optionally, trigger a search
        // searchProducts(transcript);
    };

    recognition.onerror = (event) => {
        console.error('Speech recognition error', event);
    };

    startSpeechButton.addEventListener('click', () => {
        recognition.start();
    });

    // Function to filter products based on search query
    function searchProducts(query) {
        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(query.toLowerCase())
        );
        renderProducts(filteredProducts);
    }

    // Attach search functionality to search bar
    searchBar.addEventListener('input', (event) => {
        searchProducts(event.target.value);
    });

