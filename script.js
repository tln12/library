let myLibrary = [];
const newBook = document.querySelector('#new-book')
const submitBook = document.querySelector('#submit-book')
const formWrapper = document.querySelector('.wrapper')
const form = document.querySelector('form')
const bod = document.querySelector('body')
const cardTemplate = document.querySelector('.card');

function Book(title, author, pages, readStatus) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.readStatus = readStatus;
}
Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function removeBookFromLibrary(index) {
    myLibrary.splice(index, 1);
}

function displayBooks(array) {
    array.forEach(book => console.table(book));
}

function createCard(book) {
    const dashboard = document.querySelector('#dashboard')
    
    // Create DOM Elements
    const card = document.createElement('div');
    const infoDiv = document.createElement('div');
    const wrapper = document.createElement('div');
    const toolbar = document.createElement('div');
    const title = document.createElement('h3');
    const author = document.createElement('span');
    const pages = document.createElement('span');
    const status = document.createElement('span');
    const deleteSymbol = document.createElement('span');
    const toggleLabel = document.createElement('label');
    const toggleInput = document.createElement('input');
    const toggleSpan = document.createElement('span');


    // Add classes, IDs, attributes
    card.classList.add('card');
    title.classList.add('card-title');
    author.classList.add('card-author');
    pages.classList.add('card-pages');
    status.classList.add('card-status');
    deleteSymbol.classList.add('material-symbols-outlined', "delete-symbol");
    toggleLabel.classList.add('switch');
    toggleSpan.classList.add('slider');
    toggleInput.classList.add('toggle-input');
    toggleInput.setAttribute('type', 'checkbox');
    toolbar.classList.add('card-tools');
    
    // Set content
    title.textContent = book.title;
    author.textContent = `by ${book.author}`;
    pages.textContent = `${book.pages} pages \u2022 `;
    status.textContent = getReadStatus();
    deleteSymbol.textContent = 'delete';
    
    infoDiv.appendChild(pages);
    infoDiv.appendChild(status);
    wrapper.appendChild(title);
    wrapper.appendChild(author);
    wrapper.appendChild(infoDiv);
    toggleLabel.appendChild(toggleInput);
    toggleLabel.appendChild(toggleSpan);
    toolbar.appendChild(deleteSymbol);
    toolbar.appendChild(toggleLabel);
    card.appendChild(wrapper);
    card.appendChild(toolbar);

    // Assign each card number of corresponding index in myLibrary
    card.setAttribute('data-index', myLibrary.indexOf(book));

    dashboard.appendChild(card);
}

function removeCard(card) {
    const dashboard = document.querySelector('#dashboard');
    dashboard.removeChild(card);
}

function getReadStatus() {
    if (form.elements['read'].checked == true) {
        return 'read';
    } else {
        return 'not read';
    }
}

newBook.addEventListener('click', () => {
    if (formWrapper.style.display == "none" || formWrapper.style.display == "") {
        formWrapper.style.display = "block";
    } else if (formWrapper.style.display == "block") {
        formWrapper.style.display = "none";
    }
});

submitBook.addEventListener('click', (e) => {
    e.preventDefault();
    
    const book = new Book(
        form.elements['title'].value,
        form.elements['author'].value,
        form.elements['pages'].value,
        getReadStatus()
    )
    addBookToLibrary(book);
    createCard(book);
    
    console.log(myLibrary);
    form.reset();
});

// Clicking delete symbol
document.addEventListener('click', (e) => {
    const card = e.target.closest('.delete-symbol').parentElement.parentElement;
    const index = card.getAttribute('data-index');

    removeCard(card);
    removeBookFromLibrary(index);    
});