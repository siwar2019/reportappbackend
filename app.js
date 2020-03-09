var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
const mysql = require('mysql');
//body parser
var bodyParser = require("body-parser"); 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Create connection
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'sampleDB'
});

// Create table
app.get('/createpoststable', (req, res) => {
    let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), ,telephone INT(20),PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Posts table created...');
    });
});

//user
app.get('/usercreate', (req, res) => {
    let sql = 'CREATE TABLE user(id int AUTO_INCREMENT,email VARCHAR(255),password VARCHAR(255),firstname VARCHAR(255),lastname VARCHAR(255),address VARCHAR(255),tel VARCHAR(255),PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('inscription table created...');
    });
});

// Insert post 1 celle ci les valeur quon va ajouter au tableau de bd sont statiques
app.get('/addpost1', (req, res) => {
    let post = {title:'Post siwar', body:'postsiwar'};
    let sql = 'INSERT INTO posts SET ?';
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post 1 added...');
    });
  });



 //inscription add
app.post('/user', (req, res) => {
    // let post = {email:req.body.email, password:req.body.password,firstname:req.body.firstname,lastname:req.body.lastname,address:req.body.address ,tel:req.body.tel};
   let post = {email:"", password:"",firstname:"",lastname:"",address:"",tel:""};
  
    let sql = 'INSERT INTO user SET ?';
     let query = db.query(sql, req.body, (err, result) => {
         if(err) throw err;
         console.log(result);
         res.send('cuser added...');
     });
   });
  // Insert post4 les valeurs dynamiques req.body va afficher le body de requette mais f kol valeur bech n7otou req.body, najmou marra wa7da n7otaha f parametre de query
app.post('/addpost4', (req, res) => {
    let post = {title:req.body.title, body:req.body.body};
    let sql = 'INSERT INTO posts SET ?';
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post 4 added...');
    });
  });
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;

