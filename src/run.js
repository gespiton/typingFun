// Import node module library
// Express. Htttp server manager
const express = require('express')
// File system
const fs = require('fs')

// Const a webport value
const webport = 4545

// Initliaze express application
const app = new express()
app.disable('x-powered-by')

// Setting express port
app.set('port', webport)
// Start express server
app.listen(app.set('port'), function() {
    console.log(`Server run on ${webport}`)
})


// Default index page
app.get('/', function(req, res) {
    let index = fs.readFileSync('./src/template/index.html','utf8')
    res.end(index)
})

app.get('/typing', function(req, res) {
    let typing = fs.readFileSync('./src/template/typing.html','utf8')
    res.end(typing)
})
