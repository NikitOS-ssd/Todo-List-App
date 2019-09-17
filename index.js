var fs = require('fs');
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

    res.render('index.ejs', {userName: req.body.login});
  }
});

var arrUser = {
  'naruto777': {
    name: 'Nikitos',
    age: 19,
    city: 'Moscow',
    profession: 'programmist'
  },
  'tanya-tulpina': {
    name: 'Tanya',
    age: 19,
    city: 'Stavropol',
    profession: 'jurnalist'
  }
};


const usersRouter = express.Router();

usersRouter.use('/:userid/about', function(req, res) {
  var userId = req.params.userid;
  var info = '<ul>';
  if (arrUser[userId]) {
    for (var key in arrUser[userId]) {
      info += `<li>${arrUser[userId][key]}</li>`;
    }
    info += '</ul>';
    res.send(info);
  } else {
    res.sendStatus(404);
  }
});

usersRouter.use('/:userid/globaly', function(req, res) {
  res.send(`Id - ${req.params.userid}`);
});

app.use('/user', usersRouter);

app.listen(3030);
