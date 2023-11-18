const express = require('express');
const { view_routes, user_routes, blog_routes } = require('./controllers')
const db = require('./config/connection')
const session = require('express-session')
const { engine } = require('express-session');
require('dotenv').config();

const PORT = process.env.PORT || 3333;

const app = express();

app.engine('hbs', engine({ extname: '.hbs' }))
app.set('view engine', '.hbs')
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false}))

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

app.use('/', view_routes, blog_routes)
app.use('/auth', user_routes);

db.sync({ force: false })
    .then(() => {
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    })