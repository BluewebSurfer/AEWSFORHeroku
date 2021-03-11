const express = require ("express");
const bodyParser = require ("body-parser");
const ejs=require ("ejs");
const Mongoose = require("mongoose");


const app =express();
app.set('view engine','ejs');
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ectented:true}));

connectionurl="mongodb+srv://Rupan:Rupan@9733199713@cluster0.whfx5.mongodb.net/information?retryWrites=true&w=majority"
Mongoose.connect(connectionurl,{useNewUrlParser: true,useUnifiedTopology:true})
.then(()=>console.log("databaseconnected"))
.catch((error)=>console.log("not connected"));


const contactschema=Mongoose.Schema({
    firstname:String,
    lastname:String,
    email:String,
    number:Number,
    message:String
    })

const helpschema=Mongoose.Schema({
    fullname:String,
    email:String,
    addhar:Number,
    number:Number,
    reason:String
    })


const volschema=Mongoose.Schema({
    fullname:String,
    email:String,
    addhar:Number,
    pan:String,
    number:Number,
    occupation:String
    })
            

const postMessage = Mongoose.model("postMessage",contactschema);
const helpMessage = Mongoose.model("helpMessage",helpschema);
const volMessage = Mongoose.model("volMessage", volschema);




    app.get("/",function(req,res){
        res.render("home");
    })

    app.get("/About",function(req,res){
        res.render("about");
    })
    app.get("/donation",function(req,res){
        res.render("donation");
    })
    app.get("/ourworks",function(req,res){
        res.render("ourworks");
    })


    app.get("/contact",function(req,res){
        res.render("contact")
    })
    app.post("/contact",async function(req,res){
     var input={ 
         firstname : req.body.firstname,
        lastname:req.body.lastname,
        email : req.body.email,
       number : req.body.number,
        message: req.body.message
    }
    const newpost=new postMessage(input);
      await newpost.save();
      res.redirect("/")
       console.log(firstname);
    })


    app.get("/help",function(req,res){
        res.render("help")
    })
    app.post("/help",async function(req,res){
     var inputhelp={ 
        fullname:req.body.fullname,
        email:req.body.email,
        addhar:req.body.addhar,
        number:req.body.number,
        reason:req.body.reason
    }
    const newposthelp=new helpMessage(inputhelp);
      await newposthelp.save();
      res.redirect("/")
       console.log(firstname);
    })

    app.get("/vol",function(req,res){
        res.render("vol")
    })
    app.post("/vol",async function(req,res){
     var inputvol={ 
         fullname:req.body.fullname,
        email:req.body.email,
        pan:req.body.pan,
        addhar:req.body.addhar,
        number:req.body.number,
        occupation:req.body.occupation
    }
    const newpostvol=new volMessage(inputvol);
      await newpostvol.save();
      res.redirect("/")
       console.log(firstname);
    })

    let port = process.env.PORT;
    if (port == null || port == "") {
      port = 8000;
    }
    app.listen(port,function(req,res){
        console.log("server started on port 8000");
    });
    // app.listen("4000")