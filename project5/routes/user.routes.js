const express = require('express')
const router = new express.Router()
const userController =require('../controller/user.controller')

router.get('', (req,res)=> res.send('no data matched'))
router.get('/register',userController.registerView )
router.post('/register',userController.registerPost )
router.get('/login',userController.loginView )
router.post('/login',userController.loginPost )




module.exports = router