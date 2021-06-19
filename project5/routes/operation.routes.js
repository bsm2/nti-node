const express = require('express')
const router = new express.Router()
const operationController =require('../controller/operation.controller')

// router.get('/operations',operationController.operationView )
router.get('/addOperation',operationController.addOperationView )
router.post('/addOperation',operationController.addOperationPost )
router.get('/operations',operationController.showAll )
router.get('/operation/:id',operationController.showOne )
router.get('/deleteOP/:id',operationController.deleteOP )
router.get('/editOp/:id',operationController.editOP )
router.post('/editOp/:id',operationController.editOpPost )
// router.get('/test',(req,res)=>{
//     res.send(req.session.user)

// })


module.exports = router