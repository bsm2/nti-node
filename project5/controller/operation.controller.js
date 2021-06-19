
const { ObjectID } = require('bson')
const dbConnection = require('../db/db')

operationView = (req,res)=>{
    res.render('operations')

}

addOperationView = (req,res)=>{
    res.render('addOperation')

}

addOperationPost = (req,res)=>{
    operation = req.body
    dbConnection(db => {
        if(!db) return console.log('database error')
        db.collection('operations').insertOne(operation, (e, result)=>{
            if(e) console.log(e)
            else console.log(result)
        })
    })
    res.redirect('operations')

}

showAll =(req,res)=>{
    dbConnection(db=>{
        db.collection('operations').find().toArray((err,op)=>{
            if(err) console.log(err)
            console.log(op)
            res.render('operations',{op})
        })
    })

}

deleteOP =(req,res)=>{
    let id = req.params.id
    console.log(id)
    dbConnection(db=>{
        db.collection('operations').deleteOne({_id:ObjectID(id)},(err,sop)=>{
            if(err) console.log(err)
            // console.log(sop)
            
        })
    })
    res.redirect('/operations')
    

}

showOne =(req,res)=>{
    let id = req.params.id
    console.log(id)
    dbConnection(db=>{
        db.collection('operations').findOne({_id:ObjectID(id)},(err,sop)=>{
            if(err) console.log(err)
            console.log(sop)
            res.render('operations',{sop})
        })
    })

}
editOP = (req,res)=>{
    let id = req.params.id
    console.log(id)
    dbConnection(db=>{
        db.collection('operations').findOne({_id:ObjectID(id)},(err,op)=>{
            if(err) console.log(err)
            console.log(op)
            res.render('editOperation',{op})
        })
    })
    

}

editOpPost = (req,res)=>{
    let operation = req.body
    let id = req.params.id
    console.log(operation)
    dbConnection(db => {
        if(!db) return console.log('database error')
        db.collection('operations').updateOne({_id:ObjectID(id)},
        {
            $set:{  amount:operation.amount,
                    date:operation.date,
                    location:operation.location
                }
        },
        (e, op)=>{
            if(e) console.log(e)
            // res.render('operations',{op}); 
            res.redirect('/operations')
        })

    })
    
   

}





module.exports={
    operationView,
    addOperationView,
    addOperationPost,
    showAll,
    showOne,
    deleteOP,
    editOP,
    editOpPost
}