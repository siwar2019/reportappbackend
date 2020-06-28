var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//muler configguration
const multer = require('multer');
var app = express();
const mysql = require('mysql');
const cors=require('cors');
const selectall='select * from user' ;
//body parser
var bodyParser = require("body-parser"); 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//muler
const Storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, './images');
  },
  filename(req, file, callback) {
    callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: Storage });

app.get('/api', (req, res) => {
  res.status(200).send('You can post to /api/upload.');
});

app.post('/api/upload', upload.array('photo', 3), (req, res) => {
  console.log('file', req.files);
  console.log('body', req.body);
  res.status(200).json({
    message: 'success!',
  });
});
// Create connection
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'sampleDB'
});



// Create table
app.get('/createpoststable', (req, res) => {
    let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255),telephone INT(20),PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Posts table created...');
    });
});

// Create table imaage
app.get('/createtableimage', (req, res) => {
  let sql = 'CREATE TABLE image(id int AUTO_INCREMENT, filePath VARCHAR(255), fileData VARCHAR(255),fileUri INT(20),PRIMARY KEY(id))';
  db.query(sql, (err, result) => {
      if(err) throw err;
      console.log(result);
      res.send('image table created...');
  });
});
// Create table video
app.get('/createtablevideo', (req, res) => {
  let sql = 'CREATE TABLE video(id int AUTO_INCREMENT, filePath VARCHAR(255), fileData VARCHAR(255),fileUri INT(20),PRIMARY KEY(id))';
  db.query(sql, (err, result) => {
      if(err) throw err;
      console.log(result);
      res.send('video table created...');
  });
});
//video

app.post('/video', (req, res) => {
 let post = {filePath:"", fileData:"",fileUri:""};

  let sql = 'INSERT INTO video SET ?';
   let query = db.query(sql, req.body, (err, result) => {
       if(err) throw err;
       console.log(result);
       res.send('video added...');
   });
 });
//image
app.post('/image', (req, res) => {
  // let post = {email:req.body.email, password:req.body.password,firstname:req.body.firstname,lastname:req.body.lastname,address:req.body.address ,tel:req.body.tel};
 let post = {filePath:"", fileData:"",fileUri:""};

  let sql = 'INSERT INTO image SET ?';
   let query = db.query(sql, req.body, (err, result) => {
       if(err) throw err;
       console.log(result);
       res.send('image added...');
   });
 });
//inscription derniere
app.post('/user', (req, res) => {
  // let post = {email:req.body.email, password:req.body.password,firstname:req.body.firstname,lastname:req.body.lastname,address:req.body.address ,tel:req.body.tel};
 let post = {email:"", password:"",firstname:"",lastname:"",address:"",tel:""};

  let sql = 'INSERT INTO user SET ?';
   let query = db.query(sql, req.body, (err, result) => {
       if(err) throw err;
       console.log(result);
       res.send('c user added...');
   });
 });

//authetification !
app.post('/authentification', function(req, res,next) {
  var email = req.body.email;
  var password = req.body.password;
  //res.send({message:req.body.email});
  db.query("select * from user where email=? AND password=?"
  ,[email,password],function(err,results,fields) {
    if(err){ 
      console.log(err) ;
      res.send({'succes':false,'message':'could not connect to the db'}) ;
    }
    if(results.length>0) {
     
     res.send({'succes':true,'message' :results[0].email}) ;
  }else {
    res.send({'succes':false,'message':'user not found, please try again'}) ;

}
   } ) ;
});


//allproduct from
//user
app.get('/usercreate', (req, res) => {
    let sql = 'CREATE TABLE user(id int AUTO_INCREMENT,email VARCHAR(255),password VARCHAR(255),firstname VARCHAR(255),lastname VARCHAR(255),address VARCHAR(255),tel VARCHAR(255),PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('inscription table created...');
    });
});

//user2champs kahaw
app.get('/usercreate3', (req, res) => {
    let sql = 'CREATE TABLE user3 (id2 int AUTO_INCREMENT,email VARCHAR(255),password VARCHAR(255) ,PRIMARY KEY(id2))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('inscription table3created...');
    });
});
app.use(cors());
//afficher les donneés de users 
app.get('/afficherusers', (req, res) => {
  let sql = 'select * from user';
  db.query(sql, (err, result) => {
      if(err) throw err;
      console.log(result);
      res.json({
        data:result
      })
  });
});
//ajout de user
/*
app.get('/useradd2', (req, res) => {
  const{email,password}=req.query;
  const insert_req='insert into user (email,password) VALUES ('${email}',${password})' 
  db.query(insert_req,(err,result)=> {
    if(err) {
      return res.send(err)
    }
    else {
      return res.send("succesufuly aded")
    }
  });
});

}
*/
/*
//allproduct from user
app.get('/r'),(req,res) => {
  db.query('select * from user',(err,resultas)=> {
    if(err) {
      return res.send(err) 
    }
      else {
        return res.json({
          data:resultas 
        })
        }
      });
    }
    
*/
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
//select from 
  app.get('/new', (req, res) => {
    let post = {title:'Post siwar', body:'postsiwar'};
    let sql = 'SELECT * FROM user ';
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('hbjhhg');
    });
  });


// Creating a GET route that returns data from the 'users' table.
app.post('/new2', function (req, res) {
    // Connecting to the database.
    connection.getConnection(function (err, connection) {
  
    // Executing the MySQL query (select all data from the 'users' table).
    connection.query('SELECT * FROM user', function (error, results, fields) {
      // If some error occurs, we throw an error.
      if (error) throw error;
  
      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(results)
    });
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
 //inscription add
app.post('/inscription', (req, res) => {

  let post = {email:"", password:""};
   let sql = 'INSERT INTO user3 SET ?';
    let query = db.query(sql, req.body, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('user inscription added...');
    });
  });
 
//sign in parameters
app.get('/signin2',function(req,res,next){
 

  var email=req.body.email;
  var password=req.body.password;
  
  
  connection.query("select * from user3 where email=? AND password=?",[email,password],function(err,result,fields) 
  {
    if(err) console.log(err) ;
    if(result.length>0) {
      res.send({'succes':true,'message' : result[0].email}) ;
  }else {
    res.send({'succes':false,'message':'user not found, please try again'}) ;

}
   } ) ;
});

//test authentification
app.get('/auth', (req, res)=>{
  const email = req.body.email;
  const password = req.body.password;
  const string = "SELECT * FROM user3 WHERE email = ? AND password = ?"
  if (email && password) {
    db.query('SELECT * FROM user3 WHERE email = ? AND password = ?', [email, password], (err, results, fields)=> {
          if (results.length > 0) {
            req.session.loggedin = true;
            req.session.email = email;
              res.send({'succes':true,'message' : result[0].email}) ;
              res.send('ok');
           res.redirect('/home');
          } else {
              res.send('Incorrect Username and/or Password!');
          }           
          res.end();
      });
  } else {
    
     res.send('Please enter Username and Password!.');
      res.end();
  }
});

app.get('/home', (req, res)=> {
  if (req.session.loggedin) {
     res.send('Welcome back, ' + req.session.email + '!');
  } else {
      res.send('Please login to view this page!');
  }
  res.end();
});

exports.login = function(req,res){
  var email= req.body.email;
  var password = req.body.password;
 var username = req.params.username;
  connection.query('SELECT * FROM user WHERE username = ?',[username], function (error, results, fields) {
  if (error) {
   res.send({
      "code":400,
      "failed":"error ocurred"
    })
  }else{
    if(results.length >0){
      bcrypt.compare(password, results[0].password, function(err, doesMatch){
        if (doesMatch){
     res.send({
       "code":200,
       "success":"login sucessfull"
         });
      }else{
     res.send({
       "code":204,
       "success":"Email and password does not match"
         });
      }
    });
  }
    else{
      res.send({
        "code":204,
        "success":"Email does not exits"
          });
    }
  }
  });

}
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;

