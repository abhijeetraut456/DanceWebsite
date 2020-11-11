const express = require('express');
const app =  express();
const port = 5000;
const path = require('path');
const fs = require('fs')
const bodyparser = require('body-parser');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contacts', {useNewUrlParser: true});


// Defining mongoose 
const ContactSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phone: String,
    messages: String
  });
  
  const contact = mongoose.model('contact', ContactSchema);

// Public file/static file  
app.use(express.static('static'));
app.use('/css' , express.static(__dirname +'static/css'))
app.use('css',express.static(__dirname + 'css/phone.css'));
app.use('js',express.static(__dirname +'static/js'));
app.use('images',express.static(__dirname +'static/img'));
app.use(express.urlencoded());

// Set the path of ejs/pug/mustach

app.set('view engine','ejs');
app.set('views','./views'); 
// app.set('views',path.join(__dirname,'./views')); 


//endpoints
app.get('/',(req,res)=>{
    res.status(200).render('index.ejs');
})
app.get('/contact',(req,res)=>{
    res.status(200).render('contact.ejs');
})

app.post('/contact',(req,res)=>{
     var myData = new contact(req.body)
     myData.save().then(()=>{
         res.send("Your Form Submited Succesfully ");
     }).catch(()=>{
         res.status(404).send('Your Form was not saved successfully');
     })
     
})

// app.get('/contact',(req,res)=>{
//     res.status(200).render('contact.ejs');
// })

app.listen(port ,(req,res)=>{
    console.info(`This port started successfuly  ${port}`)
})