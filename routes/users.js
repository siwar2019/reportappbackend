var express = require('express');
var app = express();

var router = express.Router();

// GET users listing. 
router.get('/', function(req, res, next) {
  res.send({ hello: 'siwar'});
});
router.get('/insc', function(req, res, next) {
  res.send('/insc');
});






// Insert post3 les valeurs dynamiques req.body va afficher le body de requette json ecrite fel postman
app.post('/addpost3', (req, res) => {
  let post = {title:"", body:""};
  let sql = 'INSERT INTO posts SET ?';
  let query = db.query(sql, req.body, (err, result) => {
      if(err) throw err;
      console.log(result);
      res.send('Post 3 added...');
  });
});

// Delete post
app.get('/deletepost/:id', (req, res) => {
  let newTitle = 'Updated Title';
  let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
      if(err) throw err;
      console.log(result);
      res.send('Post '+req.params.id+ ' deleted...');
  });
});
//delete2

app.get('/deletepost2/:id', (req, res) => {
    res.json({message : "Vous souhaitez accéder aux informations de la piscine n°" + req.params.id});
});
// Select posts
app.get('/getposts', (req, res) => {
  let sql = 'SELECT * FROM posts';
  let query = db.query(sql, (err, results) => {
      if(err) throw err;
      console.log(results);
      res.send('Posts fetched...');
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


//inscription add
app.post('/inscription', (req, res) => {
  // let post = {email:req.body.email, password:req.body.password,firstname:req.body.firstname,lastname:req.body.lastname,address:req.body.address ,tel:req.body.tel};
 //let post = {email:"", password:"",firstname:"",lastname:"",address:"",tel:""};
 let post = {email:"", password:""};
  let sql = 'INSERT INTO user SET ?';
   let query = db.query(sql, req.body, (err, result) => {
       if(err) throw err;
       console.log(result);
       res.send('user inscription added...');
   });
 });

module.exports = router;
