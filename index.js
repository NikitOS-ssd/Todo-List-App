var fs = require('fs');
var os = require('os');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var userObj = 'Unknown';
var urlencodedParser = bodyParser.urlencoded({ extended: false })


app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public')); //Подключает модули с CSS и JS к обычным файлам

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

    res.render('index.ejs', {userName: req.body});
  }
});

app.get('/reseter', function(req, res) {
  res.render('reseter.ejs');
});

var jsonParser = express.json();

app.post("/user", jsonParser, function (req, res) {
    var compuser = os.userInfo().username;
    console.log(`Пользователь ${compuser} поменя логин на ${req.body.userName}`);
    if(!req.body) return res.sendStatus(400);

    res.json(req.body); // отправляем пришедший ответ обратно
});

app.listen(3030);
