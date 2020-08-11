

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//formidable ibrary (final, pr imag video)
var http = require('http');
var formidable = require('formidable');
var fs = require('fs');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//muler configguration
const multer = require('multer');
var app = express();
const mysql = require('mysql');
const cors = require('cors');

//body parser
//set the limite file
var bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));

 app.use(bodyParser.urlencoded({ extended: true }));
 app.use(bodyParser.json());

//muler
// destination des images, ./images, relative au fichier app.js, normalement fel  dossier courant, mais ma femmech dossier image
//oui les image sajalthom f public/uploads, ,h athika /image ta9rib jebtha coller mel google ki jiet config mta3 multer w f li5er masta3mltouch sta3mlit biblothq formidable
// doct multer zeid ? j c as nsit wlh, 5alih, ok
const Storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, './images');
  },
  filename(req, file, callback) {
    callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
  },
});
//la7dha brabi: hia bere7 kanetch hathi /api nn? badaltha enty kif bech ta3ml proxy nn?
// nn, el bere7 fel backend lo5ra, proxy fel package.json mte3 dev server
// la7tha 5ellini nchouf w taou nfehmek chnia la7kaya mte3 dev server w proxy
// apperemment femma confusion z8ira 3endek, a propos des dev server w les proxy m3a les apie
//eni l7a9 mec fahethom ntaba3 tuto n7ot kima ya3ml houa w ùanefhemch lweh aslan , bhama j c :p  ama lfayda temchi n9oul, apre st anefhem
//7asilou tfadhel, man3atlikch 
//nn, dima a3mel intrervention heka, comme ça nefhem fech t5ammem we nefhem projet mte3ek
//dacc :p
// ok, lanci l'app react native, 
const upload = multer({ storage: Storage });

 app.get('/', (req, res) => {
  res.status(200).send('You can post to /api/upload.');
});
 
// Le mieux tkelmeni w t9olli chnwya yemchi w yemchich, heka bech ta5ou barcha wa9t
// w normalement tefhem 5er
//chnoua el hajat eli fesdouli f code to9sed?
// enti taou ki jarrabet, chnoua 7ebbit tjareb, par exemple, 5ater elli badeltou, ma3andou 7etta da5l bi 7atta chey
// juste endpoint thaye3, bech itesti bih., ..d.onc impossible ikoun houa sbeb,
//5ater fema 7aja mech m5olya el connxiontsir bin el front w back,,eni haka mech fehmetou app.get aslan, w marithech 9bel
//eka 3leh na7itha, 9olet balik url mta3ftech yetbadel en fonction de hathaka,
// el app react native connecté taou wella la ?
//oui, behi, 
// bug, clavier inagez
// be
app.post('/api/upload', upload.array('photo', 3), (req, res) => {
  console.log('file', req.files);
  console.log('body', req.body);
  res.status(200).json({
    message: 'success!',
  });
});
// Create connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'sampleDB'
});



// Create table
app.get('/createpoststable', (req, res) => {
  let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255),telephone INT(20),PRIMARY KEY(id))';
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Posts table created...');
  });
});

// Create table imaage
app.get('/createtableimage', (req, res) => {
  let sql = 'CREATE TABLE image(id int AUTO_INCREMENT, filePath VARCHAR(255), fileData VARCHAR(255),fileUri INT(20),PRIMARY KEY(id))';
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('image table created...');
  });
});
// Create table video
app.get('/createtablevideo', (req, res) => {
  let sql = 'CREATE TABLE video(id int AUTO_INCREMENT, filePath VARCHAR(255), fileData VARCHAR(255),fileUri INT(20),PRIMARY KEY(id))';
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('video table created...');
  });
});
//new function englobe tout

app.post('/all', (req, res) => {
  console.log("image", req.body)
  console.log(req.body);
  var form = new formidable.IncomingForm({multiples: true});
  form.parse(req, function (err, fields, files) {/* 
    console.log({fields, files});
    res.send(); 5alheli gethi
    return; */
    var oldpath = files.image.path;
    var newpath = './public/uploads/' + files.image.name;
    /* var newpath = 'E:/PFE_ING/Reactjsapp/teestttt/src/components/uploabds' + files.image.name;
     */
    fs.rename(oldpath, newpath, function (err) {
      if (err) throw err;
//video.name mahech declaré fou9 kkma mta3 image
//houma les champs elli 3amarthom fel postman,et na3ref ama no9sed nejem nesta.mlha m3a ay requett post?? ok : 
      let sql = "INSERT INTO utilisateurs (image,video,description,incident_type) VALUES('" + files.image.name +"','" +files.video.name+"','"+ fields.description + "','"+ fields.incident_type +"')";
      let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('informations added...');
      });
    });
  });
});

//save descrption,type incident
app.post('/savedata', (req, res) => {
  let post = { descrption: "", incident_type: "",position:""};

  let sql = 'INSERT INTO utilisateurs SET ?';
  let query = db.query(sql, req.body, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('desc added...');
  });
});
//image final

app.post('/image', (req, res) => {
  console.log("image", req.body)
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    console.log(files)
    var oldpath = files.image.path;
    var newpath = './public/uploads/' + files.image.name;
    /* var newpath = 'E:/PFE_ING/Reactjsapp/teestttt/src/components/uploads' + files.image.name;
     */
    fs.rename(oldpath, newpath, function (err) {
      if (err) throw err;


      let sql = "INSERT INTO utilisateurs (image) VALUES('" + files.image.name + "')";
      let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('image added...');
      });
    });
  });
});
//video apload final
app.post('/video2', (req, res) => {

  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    console.log(files)
    var oldpath = files.videos.path;
    var newpath = './public/uploads/' + files.videos.name;
    fs.rename(oldpath, newpath, function (err) {
      if (err) throw err;


      let sql = "INSERT INTO utilisateurs (video) VALUES('" + files.videos.name + "')";
      let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('video added...');
      });
    });
  });
});
//dirctyly
app.post('/video3', (req, res) => {

  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    console.log(files)
    var oldpath = files.videos.path;
    var newpath = './public/uploads/' + files.videos.name;
    fs.rename(oldpath, newpath, function (err) {
      if (err) throw err;


      let sql = "INSERT INTO utilisateurs (video) VALUES('" + files.videos.name + "')";
      let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('video added...');
      });
    });
  });
});
//inscription derniere
app.post('/user', (req, res) => {
  // let post = {email:req.body.email, password:req.body.password,firstname:req.body.firstname,lastname:req.body.lastname,address:req.body.address ,tel:req.body.tel};
  let post = { email: "", password: "", firstname: "", lastname: "", address: "", tel: "" };
  
  let sql = 'INSERT INTO utilisateurs SET ?';
  let query = db.query(sql, req.body, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('c user added...');
  });
});

//authetification !
app.post('/authentification', function (req, res, next) {
  // de meme ici
  // manque la validation
  var email = req.body.email;
  var password = req.body.password;
  //res.send({message:req.body.email});
  db.query("select * from utilisateurs where email=? AND password=?"
    , [email, password], function (err, results, fields) {
      if (err) {
        console.log(err);
        res.send({ 'succes': false, 'message': 'could not connect to the db' });
      }
      if (results.length > 0) {
        // ouvre le composant qui reçoit cette reponse stp
        res.send({ 'succes': true, 'message': results[0].email });
      } else {
        res.send({ 'succes': false, 'message': 'user not found, please try again' });

      }
    });
});


//allproduct from
//user
app.get('/usercreate', (req, res) => {
  let sql = 'CREATE TABLE user(id int AUTO_INCREMENT,email VARCHAR(255),password VARCHAR(255),firstname VARCHAR(255),lastname VARCHAR(255),address VARCHAR(255),tel VARCHAR(255),PRIMARY KEY(id))';
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('inscription table created...');
  });
});

//user2champs kahaw
app.get('/usercreate3', (req, res) => {
  let sql = 'CREATE TABLE user3 (id2 int AUTO_INCREMENT,email VARCHAR(255),password VARCHAR(255) ,PRIMARY KEY(id2))';
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('inscription table3created...');
  });
});
app.use(cors());

//afficher les donneés de users 
app.get('/afficherusers', (req, res) => {
  let sql = 'select * from user';
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.json({
      data: result
    })
  });
});

// Insert post 1 celle ci les valeur quon va ajouter au tableau de bd sont statiques
app.get('/addpost1', (req, res) => {
  let post = { title: 'Post siwar', body: 'postsiwar' };
  let sql = 'INSERT INTO posts SET ?';
  let query = db.query(sql, post, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Post 1 added...');
  });
});
//select from 
app.get('/new', (req, res) => {
  let post = { title: 'Post siwar', body: 'postsiwar' };
  let sql = 'SELECT * FROM user ';
  let query = db.query(sql, post, (err, result) => {
    if (err) throw err;
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
  let post = { title: req.body.title, body: req.body.body };
  let sql = 'INSERT INTO posts SET ?';
  let query = db.query(sql, post, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Post 4 added...');
  });
});
//inscription add
app.post('/inscription', (req, res) => {

  let post = { email: "", password: "" };
  let sql = 'INSERT INTO user3 SET ?';
  let query = db.query(sql, req.body, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('user inscription added...');
  });
});

//sign in parameters
app.get('/signin2', function (req, res, next) {


  var email = req.body.email;
  var password = req.body.password;


  connection.query("select * from user3 where email=? AND password=?", [email, password], function (err, result, fields) {
    if (err) console.log(err);
    if (result.length > 0) {
      res.send({ 'succes': true, 'message': result[0].email });
    } else {
      res.send({ 'succes': false, 'message': 'user not found, please try again' });

    }
  });
});

//test authentification
app.get('/auth', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const string = "SELECT * FROM user3 WHERE email = ? AND password = ?"
  if (email && password) {
    db.query('SELECT * FROM user3 WHERE email = ? AND password = ?', [email, password], (err, results, fields) => {
      if (results.length > 0) {
        req.session.loggedin = true;
        req.session.email = email;
        res.send({ 'succes': true, 'message': result[0].email });
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

app.get('/home', (req, res) => {
  if (req.session.loggedin) {
    res.send('Welcome back, ' + req.session.email + '!');
  } else {
    res.send('Please login to view this page!');
  }
  res.end();
});

exports.login = function (req, res) {
  var email = req.body.email;
  var password = req.body.password;
  var username = req.params.username;
  connection.query('SELECT * FROM user WHERE username = ?', [username], function (error, results, fields) {
    if (error) {
      res.send({
        "code": 400,
        "failed": "error ocurred"
      })
    } else {
      if (results.length > 0) {
        bcrypt.compare(password, results[0].password, function (err, doesMatch) {
          if (doesMatch) {
            res.send({
              "code": 200,
              "success": "login sucessfull"
            });
          } else {
            res.send({
              "code": 204,
              "success": "Email and password does not match"
            });
          }
        });
      }
      else {
        res.send({
          "code": 204,
          "success": "Email does not exits"
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

/* image et video l version 9dima
//image correct
app.post('/image', (req, res) => {
  // let post = {email:req.body.email, password:req.body.password,firstname:req.body.firstname,lastname:req.body.lastname,address:req.body.address ,tel:req.body.tel};
 let post = {filePath:"", fileData:"",fileUri:""};

  let sql = 'INSERT INTO images SET ?';
   let query = db.query(sql, req.body, (err, result) => {
       if(err) throw err;
       console.log(result);
       res.send('image added...');
   });
 })
//video

app.post('/video', (req, res) => {
 let post = {filePath:"", fileData:"",fileUri:""};

  let sql = 'INSERT INTO video SET ?';
   let query = db.query(sql, req.body, (err, result) => {
       if(err) throw err;
       console.log(result);
       res.send('video added...');
   });
 }); */