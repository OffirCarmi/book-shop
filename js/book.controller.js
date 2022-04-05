'use strict'

function onInit() {
    var lang = loadFromStorage('currLang')
    console.log(lang);
    if (!lang) lang = 'en-US'
    onSetLang(lang)
    if (lang==='he') document.querySelector('.lang-select').innerHTML =
     '<option value="he">עברית</option> <option value="en-US">English</option>'
     renderBooks()
}

function onSetLang(lang) {
    setLang(lang)
    renderBooks()
    // If lang is hebrew add RTL class to document.body
    if (lang === 'he') document.body.classList.add('rtl')
    else document.body.classList.remove('rtl')
}
function renderModal(bookId){
var book = getBookById(bookId)
console.log(book);
document.querySelector('.modal-title').innerText = book.title
document.querySelector('.modal-body h3').innerText = book.title
document.querySelector('.modal-body h4').innerText = getCurrency(book.price)
document.querySelector('img').src = `images/${book.title}.png`
document.querySelector('p').innerText = book.desc
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
        <td class="read rtl"> <button type="button" onclick="renderModal('${book.id}')" class="btn btn-primary btn-sm" data-trans="read" data-bs-toggle="modal" data-bs-target="#staticBackdrop")"> Info </button> </td>
        <td class="update rtl"> <button class="btn btn-success btn-sm" data-trans="update" onclick="onUpdateBook('${book.id}')"> Update </button> </td>
        <td class="delete rtl"> <button class="btn btn-danger btn-sm" data-trans="delete" onclick="onDeleteBook('${book.id}')"> Delete </button> </td>
    </tr>`
    })
    elTable.innerHTML = strHTML
    doTrans()
}



function onDeleteBook(bookId) {
    var currLang = getCurrLang()
    var confirmation = (currLang === 'he') ? confirm('לא ניתן לשחזר את הספר לאחר אישור')
        : confirm('Book can\'t be revived after confirmation')

    if (!confirmation) return

    var book = getBookById(bookId)
    deleteBook(bookId)
    renderBooks()
    if (currLang === 'he') flashMsg(`"${book.title}" הוסר`)
    else flashMsg(`"${book.title}" was deleted`)
}

function onAddBook() {
    var currLang = getCurrLang()
    var title
    var price
    if (currLang === 'he') {
        title = prompt('שם הספר')
        if (!title) return
        price = prompt('מחיר')
    } else {
        title = prompt('Enter title')
        if (!title) return
        price = prompt('Enter price')
    }
    addBook(title, price)
    renderBooks()

    if (currLang === 'he') flashMsg(`הספר "${title}" נוסף למאגר`)
    else flashMsg(`"${title}" was added`)

}

function onUpdateBook(bookId) {
    const book = getBookById(bookId)
    var currLang = getCurrLang()
    var newPrice = (currLang === 'he') ? + prompt('מחיר חדש', book.price)
        : +prompt('Enter new price', getCurrency(book.price))
    if (newPrice === book.price) return
    if (newPrice) {
        const book = updateBook(bookId, newPrice);
        renderBooks()
    }

    if (currLang === 'he') flashMsg(`המחיר של "${book.title}" עודכן ל${getCurrency(book.price)}`)
    else flashMsg(`${book.title}'s price was updated to ${getCurrency(book.price)}`)

}
getCurrency(book.price)
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

