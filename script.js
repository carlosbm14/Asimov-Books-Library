// Array to store the books

let books = [];

// Select form and book list elements

const bookForm = document.getElementById('book-form');
const bookList = document.getElementById('book-list');

// Function to load books from localStorage
function loadBooks() {

    const storedBooks = localStorage.getItem('books');
    if (storedBooks) {
        books = JSON.parse(storedBooks);
        renderBooks();
    }
}

// Function to save books to localStorage

function saveBooks() {
    localStorage.setItem('books', JSON.stringify(books));
}

// Function to Add Books
function addBook() {

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const year = document.getElementById('year').value;
    const price = document.getElementById('price').value;
    const imageUrl = document.getElementById('image-url').value;

    // New book object with a unique ID
    const newBook = { 
        id: Date.now(), 
        title, author, 
        pages, 
        year, 
        price, 
        imageUrl
     };

    books.push(newBook); // Adding new book to the array
    saveBooks(); // Saving updated books array to localStorage
    renderBooks(); // Re-rendering books list

    bookForm.reset(); // Clearing form inputs

}


function renderBooks() {
    bookList.innerHTML = ''

    books.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');

        // Book content
        bookCard.innerHTML = ` 
        <img src="${book.imageUrl}" alt="${book.title}">
        <div class="book-details">
            <h3>${book.title}</h3>
            <p>by ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <p>Published: ${book.year}</p>
            <p>Price: ${book.price}</p>
        </div>
        <div class="book-actions">
            <button class="edit" onClick="editBook(${book.id})">Edit</button>
            <button class="delete" onClick="deleteBook(${book.id})">Delete</button>
        </div>

        `;
        bookList.appendChild(bookCard);
    });
}

function deleteBook(id) {

    books = books.filter(book => book.id !== id);
    saveBooks();
    renderBooks();
}

function editBook(id) {
    const book = books.find(book => book.id === id);
    document.getElementById('title').value = book.title;
    document.getElementById('author').value = book.author;
    document.getElementById('pages').value = book.pages;
    document.getElementById('year').value = book.year;
    document.getElementById('price').value = book.price;
    document.getElementById('image-url').value = book.imageUrl;

    // Remove the book from the list temporarily
    deleteBook(id);
}

// Event listener for the form submission

bookForm.addEventListener('submit', function(event) {
    event.preventDefault();
    addBook();
});


// Loading books from localStorage when page loads

window.addEventListener('load', loadBooks);




