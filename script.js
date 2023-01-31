let myLibrary = [];
const newBook = document.querySelector('#new-book')
const submitBook = document.querySelector('#submit-book')
const formWrapper = document.querySelector('.wrapper')
const form = document.querySelector('form')
const bod = document.querySelector('body')
const cardTemplate = document.querySelector('.card')

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

function displayBooks(array) {
    array.forEach(book => console.table(book))
}

function createCard(book) {
    const dashboard = document.querySelector('#dashboard')
    
    // Create DOM Elements
    const card = document.createElement('div');
    const infoDiv = document.createElement('div');
    const wrapper = document.createElement('div');
    const title = document.createElement('h3');
    const author = document.createElement('span');
    const pages = document.createElement('span');
    const status = document.createElement('span');
    const deleteSymbol = document.createElement('span');

    card.classList.add('card');
    title.classList.add('card-title');
    author.classList.add('card-author');
    pages.classList.add('card-pages');
    status.classList.add('card-status');
    deleteSymbol.classList.add('material-symbols-outlined', "deleteSymbol");
    
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

    card.appendChild(wrapper);
    card.appendChild(deleteSymbol);
    dashboard.appendChild(card);
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
})

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
    form.reset();
})