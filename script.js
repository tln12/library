let myLibrary = [];
const newBook = document.querySelector('#new-book')
const submitBook = document.querySelector('#submit-book')
const formWrapper = document.querySelector('.wrapper')
const form = document.querySelector('form')
const bod = document.querySelector('body')


function Book(title, author, pages, read) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
}
Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function displayBooks(array) {
    array.forEach(book => console.table(book));
}

newBook.addEventListener('click', () => {
    formWrapper.style.display = "block";
})

submitBook.addEventListener('click', (e) => {
    e.preventDefault();

    if(form.elements['read'].checked == true){
        readStatus = "read";
    } else {
        readStatus = "not read"
    }
    addBookToLibrary(new Book(
        form.elements['title'].value,
        form.elements['author'].value,
        form.elements['pages'].value,
        readStatus,
    ));
    displayBooks(myLibrary);

})


const book1 = new Book("Harry Potter", "J.K. Rowling", "399", "not read")
// const book2 = new Book("Give and Take", "Adam Grant", "250", "read")
// const book3 = new Book("Deep Work", "Cal Newport", "200", "not read")

addBookToLibrary(book1);
// addBookToLibrary(book2);
// addBookToLibrary(book3);



