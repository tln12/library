let myLibrary = [];
const newBook = document.querySelector('#new-book')
const submitBook = document.querySelector('#submit-book')
const formWrapper = document.querySelector('.wrapper')
const form = document.querySelector('form')
const bod = document.querySelector('body')
const dashboard = document.querySelector('#dashboard')
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

    const card = document.createElement('div');
    const subDiv = document.createElement('div');
    const title = document.createElement('h3');
    const author = document.createElement('span');
    const pages = document.createElement('span');
    const status = document.createElement('span');

    card.classList.add('card');
    title.classList.add('card-title');
    author.classList.add('card-author');
    pages.classList.add('card-pages');
    status.classList.add('card-status');

    title.textContent = book.title;
    author.textContent = book.author;
    pages.textContent = book.pages;
    status.textContent = getReadStatus();

    subDiv.appendChild(pages);
    subDiv.appendChild(status);
    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(subDiv);
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
    formWrapper.style.display = "block";
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
    // displayBooks(myLibrary);
    createCard(book);
    form.reset();

})


const book1 = new Book("Harry Potter", "J.K. Rowling", "399", "not read")
// const book2 = new Book("Give and Take", "Adam Grant", "250", "read")
// const book3 = new Book("Deep Work", "Cal Newport", "200", "not read")

addBookToLibrary(book1);
// addBookToLibrary(book2);
// addBookToLibrary(book3);



