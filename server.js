const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()

app.set('view engine', 'ejs')
app.set('views', __dirname + "/views")
app.set('layout', 'layouts/layout')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressLayouts)
app.use(express.static('public'))

const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')
const bookRouter = require('./routes/books')

app.use('/', indexRouter)
app.use('/authors', authorRouter)
app.use('/books', bookRouter)

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true, useUnifiedTopology: true
})
const db = mongoose.connection

db.on("error", err => console.error(err))
db.once("open", () => console.log("Connected to mongoose"))


app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running............")
})

