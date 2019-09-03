var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static(__dirname + '/public')); //Подключает модули с CSS и JS к обычным файлам
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.render('login.ejs');
});

app.get('/home', function(req, res) {
  res.render('index.ejs');
});

app.post('/login', urlencodedParser, function(req, res) {
  if(!req.body) {
    return res.sendStatus(400);
  } else {
    console.log(req.body);

    res.render('index.ejs', {userObj: req.body});
  }
});

app.listen(3000);
