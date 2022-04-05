'use strict'

function onInit() {
    renderBooks()
}

function renderBooks() {
    var books = getBooks()
    var elTable = document.querySelector('table')
    var strHTML = '<tr><th>id</th><th>title</th><th>price</th><th colspan="3">actions</th></tr>'
    books.forEach(book => {
        strHTML += `<tr>
        <td>${book.id}</td>
        <td>${book.title}</td>
        <td>${book.price}</td>
        <td class="read"> <button onclick="onReadBook('${book.id}')"> read </button> </td>
        <td class="update"> <button onclick="onUpdateBook('${book.id}')"> update </button> </td>
        <td class="delete"> <button onclick="onDeleteBook('${book.id}')"> delete </button> </td>
    </tr>`
    })
    elTable.innerHTML = strHTML
}

function onDeleteBook(bookId) {
    deleteBook(bookId)
    renderBooks()
    flashMsg(`Book Deleted`)
}

function onAddBook() {
    var title = prompt('Enter title')
    var price = prompt('Enter price')
    addBook(title,price)
    renderBooks()
    flashMsg(`Book Added (id: ${book.id})`)

}

function onUpdateBook(bookId) {
    const book = getBookById(bookId)
    var newPrice = +prompt('Enter new price', book.price)
    if (newPrice) {
        const book = updateBook(bookId, newPrice);
        renderBooks()
        flashMsg(`Price updated to: ${book.price}`)
    }
}

function flashMsg(msg) {
    const el = document.querySelector('.user-msg')
    el.innerText = msg
    el.classList.add('open')
    setTimeout(() => {
        el.classList.remove('open')
    }, 3000)
}

function onReadBook(bookId) {
    var book = getBookById(bookId)
    var elModal = document.querySelector('.modal')
    elModal.querySelector('h3').innerText = book.title
    elModal.querySelector('h4 span').innerText = `$${book.price}`
    elModal.querySelector('img').src = `images/${book.title}.png`
    elModal.querySelector('p').innerText = book.desc
    elModal.classList.add('open')
}

function onCloseModal() {
    document.querySelector('.modal').classList.remove('open')
}

