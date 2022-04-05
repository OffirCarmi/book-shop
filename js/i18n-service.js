'use strict'
var gCurrLang = 'en-US'

const gTrans = {
    headline: {
        'en-US': 'My book store',
        he: 'חנות הספרים שלי',
    },
    id: {
        'en-US': 'ID',
        he: 'קוד',
    },
    title: {
        'en-US': 'Title',
        he: 'שם הספר',
    },
    price: {
        'en-US': 'Price',
        he: 'מחיר',
    },
    actions: {
        'en-US': 'Actions',
        he: 'פעולות',
    },
    'desc-title': {
        'en-US': 'About the book',
        he: 'קצת על הספר',
    },
    read: {
        'en-US': 'Info',
        he: 'מידע',
    },
    update: {
        'en-US': 'Update',
        he: 'עדכן',
    },
    delete: {
        'en-US': 'Delete',
        he: 'מחק',
    },
    msg: {
        'en-US': '****',
        he: '****',
    },
    'btn-add': {
        'en-US': 'Add new book',
        he: 'הוספת ספר חדש',
    },
    close: {
        'en-US': 'Close',
        he: 'סגור',
    },
}

function setLang(lang) {
    gCurrLang = lang
    saveToStorage('currLang', gCurrLang)

}

function getCurrency(num) {
    const opt = {
        style:'currency',
        currency: (gCurrLang === 'en-US')? 'USD' : 'ILS'
    }
    if (opt.currency === 'ILS') return new Intl.NumberFormat('he',opt).format(num)
    else return new Intl.NumberFormat('en-US',opt).format(num)
}

function doTrans() {
    const els = document.querySelectorAll('[data-trans]')
    els.forEach(el => {
        const transKey = el.dataset.trans
        const txt = getTrans(transKey)

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

function getCurrLang(){
    return gCurrLang
}