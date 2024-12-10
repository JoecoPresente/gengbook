const gengBookShop = {
    books: [
        { title: "Book Title 1", author: "Author One", price: 10.99, category: "Fiction", image: "book1.jpg" },
        { title: "Book Title 2", author: "Author Two", price: 12.99, category: "Technology", image: "book2.jpg" },
        { title: "Book Title 3", author: "Author Three", price: 15.99, category: "Science", image: "book3.jpg" },
        { title: "Book Title 4", author: "Author Four", price: 9.99, category: "History", image: "book4.jpg" },
        { title: "Book Title 5", author: "Author Five", price: 11.99, category: "Mystery", image: "book5.jpg" },
        { title: "Book Title 6", author: "Author Six", price: 13.99, category: "Biography", image: "book6.jpg" },
        { title: "Book Title 7", author: "Author Seven", price: 14.99, category: "Self-Help", image: "book7.jpg" },
        { title: "Book Title 8", author: "Author Eight", price: 18.99, category: "Adventure", image: "book8.jpg" },
        { title: "Book Title 9", author: "Author Nine", price: 19.99, category: "Fantasy", image: "book9.jpg" },
        { title: "Book Title 10", author: "Author Ten", price: 20.99, category: "Romance", image: "book10.jpg" },
    ]
};

// Cart array to store cart items
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function to show modal with book details
function showModal(bookIndex) {
    const book = gengBookShop.books[bookIndex];
    
    // Hide the image in the modal and show book details
    document.getElementById("modalImage").style.display = "none";  // Hides the image
    
    document.getElementById("modalTitle").innerText = book.title;
    document.getElementById("modalAuthor").innerText = "Author: " + book.author;
    document.getElementById("modalPrice").innerText = "Price: $" + book.price.toFixed(2);
    document.getElementById("modalCategory").innerText = "Category: " + book.category;
    
    const modal = document.getElementById("bookModal");
    modal.style.display = "block";
    
    // Store the current book index in the modal for later reference when adding to cart
    document.getElementById("addToCartBtn").setAttribute("data-book-index", bookIndex);
}

// Function to close modal
function closeModal() {
    const modal = document.getElementById("bookModal");
    modal.style.display = "none";
    
    // Optionally, show the image again when closing the modal
    document.getElementById("modalImage").style.display = "block";  // Unhides the image
}

// Function to add a book to the cart
function addToCart() {
    const bookIndex = this.getAttribute("data-book-index");
    const book = gengBookShop.books[bookIndex];

    // Retrieve current cart from localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if the book is already in the cart
    const existingBook = cart.find(item => item.title === book.title);
    if (existingBook) {
        existingBook.quantity += 1; // If it's already in the cart, increase the quantity
    } else {
        cart.push({ ...book, quantity: 1 }); // Add new book to the cart with quantity 1
    }

    // Save updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    alert(`${book.title} has been added to your cart!`);

    // Display the cart on the same page after adding a book
    displayCart();
}

// Function to calculate the total price of items in the cart
function calculateTotal() {
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
    });
    return total.toFixed(2);
}

// Function to display cart items on the cart page
function displayCart() {
    const cartItemsContainer = document.getElementById("cartItemsContainer");
    const totalPriceContainer = document.getElementById("totalPrice");
    
    cartItemsContainer.innerHTML = "";  // Clear existing cart items

    cart.forEach(item => {
        const cartItemDiv = document.createElement("div");
        cartItemDiv.classList.add("cart-item");

        const bookImage = document.createElement("img");
        bookImage.src = item.image;
        cartItemDiv.appendChild(bookImage);

        const bookTitle = document.createElement("p");
        bookTitle.innerText = item.title;
        cartItemDiv.appendChild(bookTitle);

        const bookPrice = document.createElement("p");
        bookPrice.innerText = `Price: $${item.price.toFixed(2)}`;
        cartItemDiv.appendChild(bookPrice);

        const quantityInput = document.createElement("input");
        quantityInput.type = "number";
        quantityInput.value = item.quantity;
        quantityInput.min = 1;
        quantityInput.classList.add("quantity");
        quantityInput.addEventListener("change", function() {
            updateCart(item.title, quantityInput.value);
        });
        cartItemDiv.appendChild(quantityInput);

        cartItemsContainer.appendChild(cartItemDiv);
    });

    totalPriceContainer.innerText = `Total Price: $${calculateTotal()}`;
}

// Function to update the quantity of an item in the cart
function updateCart(title, quantity) {
    cart = JSON.parse(localStorage.getItem("cart")) || [];
    const item = cart.find(item => item.title === title);
    
    if (item) {
        item.quantity = parseInt(quantity);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

// Checkout button functionality
document.getElementById("checkoutBtn").addEventListener("click", function() {
    const total = calculateTotal();
    if (cart.length > 0) {
        alert(`Proceeding to Checkout... Total Price: $${total}`);
        // You can redirect to a checkout page here (e.g., window.location.href = 'checkout.html')
    } else {
        alert("Your cart is empty! Please add some books before proceeding.");
    }
});

// Initialize cart display
window.onload = function() {
    displayCart();  // Display the cart when the page loads
};
