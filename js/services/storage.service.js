'use strict'

function saveToStorage(key, val) {
    var json = JSON.stringify(val)
    localStorage.setItem(key, json)
}

function loadFromStorage(key) {
    const json = localStorage.getItem(key)
    const val = JSON.parse(json)
    return val
}

// queryStringParams
function noName(){
    const queryStringParams = `?vendor=${gFilterBy.vendor}&minSpeed=${gFilterBy.minSpeed}`
    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + queryStringParams
    window.history.pushState({ path: newUrl }, '', newUrl)
}