const express = require('express')
const path = require('path')
const hbs = require('hbs')

const userRoutes = require('../routes/user.routes')
const operationRoutes = require('../routes/operation.routes')
const app = express()
const session =require('express-session')
app.set('view engine', 'hbs')
app.use(express.static(path.join(__dirname, '../public')))
hbs.registerPartials(path.join(__dirname, '../frontend/layouts'))
app.set('views', path.join(__dirname, '../frontend/views'))

app.use(express.urlencoded())
app.use(session({secret:"abc"}))
app.get('/test',(req,res)=>{
    res.send(req.session.id)

})
app.use(userRoutes)
app.use(operationRoutes)

module.exports = app