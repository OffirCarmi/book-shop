'use strict'
const STORAGE_KEY = 'booksDB'
var gId = 1001 
var gBooks
_createBooks()

function getBookById(bookId) {
    console.log('test');
    const book = gBooks.find(book => bookId === book.id)
    return book
}

function getBooks() {
    return gBooks
}

function addBook(title, price) {
    const book = _createBook(title, price)
    gBooks.unshift(book)
    _saveBooksToStorage()
    return book
}

function updateBook(bookId, price) {
    const book = gBooks.find(book => bookId === book.id)
    book.price = price
    _saveBooksToStorage()
    return book
}

function deleteBook(bookId) {
    const bookIdx = gBooks.findIndex(book => bookId === book.id)
    gBooks.splice(bookIdx, 1)
    _saveBooksToStorage()
}

function _createBook(title, price) {
    return {
        id: makeId(),
        title,
        price,
        desc: makeLorem(),
    }
}

function _createBooks() {
    var books = loadFromStorage(STORAGE_KEY)
    if (!books || !books.length) {
        books = [
            _createBook('The Butcher and the Wren', 25),
            _createBook('Battling the Big Lie', 28),
            _createBook('Ten Steps to Nanette', 26),
            _createBook('Nona the Ninth', 27),
            _createBook('The 1619 Project', 31),
        ]
    }
    gBooks = books
}

function _saveBooksToStorage() {
    saveToStorage(STORAGE_KEY, gBooks)
}