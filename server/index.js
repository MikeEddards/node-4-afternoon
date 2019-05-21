require('dotenv').config()
const express = require ('express')
const session = require('express-session')
const checkForSession = require('./middlewares/checkForSession')
const swagController = require('./controllers/SwagController')
const authController = require('./controllers/AuthController')
const cartController = require('./controllers/CartController')
const searchController = require('./controllers/SearchController')


const app = express()
const {SERVER_PORT, SESSION_SECRET} = process.env
app.use(express.json())
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))
app.use(checkForSession)


app.get('/api/swag', swagController.read)
app.get('/api/user', authController.getUser)
app.get('/api/search', searchController.search)
app.post('/api/register', authController.register)
app.post('/api/login', authController.login)
app.post('/api/signout', authController.signout)
app.post('/api/cart/checkout', cartController.checkout)
app.post('/api/cart/:id', cartController.add)
app.delete('/api/cart/:id', cartController.delete)




app.listen(SERVER_PORT, () => console.log(`Doing things on port ${SERVER_PORT}`))