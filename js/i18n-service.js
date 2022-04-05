'use strict'

var gCurrLang = 'en'

const gTrans = {
    headline: {
        en: 'My book store',
        he: 'חנות הספרים שלי',
    },
    id: {
        en: 'ID',
        he: 'קוד',
    },
    title: {
        en: 'Title',
        he: 'שם הספר',
    },
    price: {
        en: 'Price',
        he: 'מחיר',
    },
    actions: {
        en: 'Actions',
        he: 'פעולות',
    },

    'desc-title': {
        en: 'About the book',
        he: 'קצת על הספר',
    },
    read: {
        en: 'Info',
        he: 'מידע',
    },
    update: {
        en: 'Update',
        he: 'עדכן',
    },
    delete: {
        en: 'Delete',
        he: 'מחק',
    },
    msg: {
        en: '****',
        he: '****',
    },
    'btn-add': {
        en: 'Add new book',
        he: 'הוספת ספר חדש',
    },
    close: {
        en: 'Close',
        he: 'סגור',
    },
}

function setLang(lang) {
    gCurrLang = lang
}

function doTrans() {
    const els = document.querySelectorAll('[data-trans]')
    els.forEach(el => {
        const transKey = el.dataset.trans
        const txt = getTrans(transKey)
        console.log(el.dataset)

        if (el.nodeName === 'INPUT') el.placeholder = txt
        else el.innerText = txt
    })
}

function getTrans(transKey) {
    // If key is unknown return 'UNKNOWN'
    var key = gTrans[transKey]
    if (!key) return 'UNKNOWN'

    // Get from gTrans
    const translate = key[gCurrLang]

    // If translation not found - use english
    if (!translate) return key['en']

    return translate
}