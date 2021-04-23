require('dotenv').config()
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const db = require('./db')

db.dbInit()

const app = express()

//руты

const depRouters = require('./routers/dep')
const userInterfaceRouters = require('./routers/userInterface')
const userRouters = require('./routers/user')

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.use(
    express.urlencoded({
        extended: true
  }))

app.use(express.json() )

//запускать руты
app.use(userInterfaceRouters)
app.use(depRouters)
app.use(userRouters)


app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})