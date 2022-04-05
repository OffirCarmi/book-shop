'use strict'

function onInit() {
    renderBooks()
}

function onSetLang(lang) {
    setLang(lang)
    renderBooks()
    
    // If lang is hebrew add RTL class to document.body
    if (lang === 'he') document.body.classList.add('rtl')
    else document.body.classList.remove('rtl')

    doTrans()
}

function renderBooks() {
    var books = getBooks()
    var elTable = document.querySelector('table')
    var strHTML = '<tr><th class="rtl" data-trans="id">id</th><th class="rtl" data-trans="title">title</th><th class="rtl" data-trans="price">price</th><th class="rtl" data-trans="actions" colspan="3">actions</th></tr>'
    books.forEach(book => {
        strHTML += `<tr>
        <td class="rtl">${book.id}</td>
        <td class="rtl">${book.title}</td>
        <td class="rtl">${getCurrency(book.price)}</td>
        <td class="read rtl"> <button data-trans="read" onclick="onReadBook('${book.id}')"> Info </button> </td>
        <td class="update rtl"> <button data-trans="update" onclick="onUpdateBook('${book.id}')"> Update </button> </td>
        <td class="delete rtl"> <button data-trans="delete" onclick="onDeleteBook('${book.id}')"> Delete </button> </td>
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
    if (!title) return
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

