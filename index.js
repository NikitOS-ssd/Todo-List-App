var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var userObj = 'Unknown';
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static(__dirname + '/public')); //Подключает модули с CSS и JS к обычным файлам
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.render('login.ejs');
});

app.get('/home', function(req, res) {
  res.render('index.ejs', {userName: 'Unknown'});
});

app.post('/login', urlencodedParser, function(req, res) {
  if(req.body.password == '') {
    res.render('login.ejs');
    console.log('Вход не выполнен');
  } else {
    console.log(req.body);
    let signDate = new Date();
    console.log(`${req.body.login} вошёл в систему в ${signDate.getHours()}:${signDate.getMinutes()}`);

    res.render('index.ejs', {userName: req.body.login});
  }
});

app.listen(3000);
