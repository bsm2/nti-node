
const dbConnection = require('../db/db')

registerView = (req,res)=>{
    res.render('register')

}

registerPost =(req,res)=>{
    user = req.body
    dbConnection(db => {
        if(!db) return console.log('database error')
        db.collection('users').insertOne(user, (e, result)=>{
            if(e) console.log(e)
            else console.log(result)
        })
    })
    res.redirect('operations')
}

loginView = (req,res)=>{
    res.render('login')

}

loginPost =(req,res)=>{
    password =req.body.pass
    name = req.body.name
    // data={
    //     err:[],
    //     user:null
    // }
    console.log(password)
    dbConnection(db=>{
        db.collection('users').findOne({pass:password},(err,result)=>{
            console.log(err)
            if(result==null) res.render('login',{msg:'no matched data found'}) 
            
            else {
                // req.session.id =password
                req.session.user = name
                console.log(req.session.user)
                res.redirect('/operations')
                // res.render('operations',{result})
            }
            console.log(result)
            
        })
    })
}



module.exports={
    registerView,
    registerPost,
    loginView,
    loginPost
}