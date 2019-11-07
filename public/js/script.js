var listsArray = [
  {id: 1, name: 'Number list №1', date: '20.04.19', img: 'https://propostuplenie.ru/website/navigator/var/custom/file/gbp-h.jpg', frontAbout: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum molestias nisi, expedita beatae dicta sapiente!', backAbout: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis ratione excepturi odio consectetur fugiat molestias, tempore minus atque voluptatem asperiores facilis quaerat voluptatum, culpa sed nemo. Voluptatem incidunt, id numquam mollitia aspernatur vel officiis nulla? Doloremque, neque, nihil. Doloremque, cum, temporibus! Similique, nisi, fugit. Quis, magnam.'},
  {id: 3, name: 'Number list №2', date: '22.04.19', img: 'https://propostuplenie.ru/website/navigator/var/custom/file/gbp-h.jpg', frontAbout: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur maxime similique fuga saepe eos totam.',  backAbout: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam ut minima veniam, expedita officia magni doloremque eaque perspiciatis amet quos possimus vitae nisi, ipsum laboriosam omnis repudiandae. Consectetur, sunt harum.'},
  {id: 4, name: 'Make a website', date: '11.11.19', img: 'http://techrocks.ru/wp-content/uploads/2018/01/Novyj-gibkij-grafik.png', frontAbout: 'Lorem ipsum gate and name this.', backAbout: 'First elem of the september work, I need to make a good website for online shopping and investing'},
  {id: 2, name: 'Learn programming', date: '07.12.19', img: 'http://techrocks.ru/wp-content/uploads/2018/01/Novyj-gibkij-grafik.png', frontAbout: 'Lorem ipsum gate and name this.', backAbout: 'Learn the basics of Swift. And practice JS language'}
];

listsArray.sort(function(a, b) {
  return a.id - b.id;
});


var userName = document.querySelector('.user-name');
userName.addEventListener("click", function() {changeTextName(this)} );

var userStatus = document.querySelector('.user-status');
userStatus.addEventListener("click", function() {changeTextName(this)} );

var logOut = document.querySelector('.log-out-a');
logOut.addEventListener("click", systemAllOut);

//берётся объект пользователя для работы с localStorage
var newUser = {};

if(!localStorage.getItem('user')) {
  newUser.login = userName.innerHTML;
  newUser.status = userStatus.innerHTML;
  newUser.lists = listsArray;

  localStorage.setItem('user', JSON.stringify(newUser));
} else {
  newUser = JSON.parse(localStorage.getItem('user'));
  userName.textContent = newUser.login;
  userStatus.textContent = newUser.status;
  let logOutSpan = logOut.querySelector('span');
  logOutSpan.textContent = newUser.login;
}

//ФУНКЦИЯ ДЛЯ ЗАМЕНЫ ПОЛЯ С ИМЕНЕМ ИЛИ СТАТУСОМ НА ПОЛЕ ВВОДА
function changeTextName(elem) {
  var elemCss = getComputedStyle(elem);

  var input = document.querySelector('.change-input');
  input.style.fontSize = elemCss.fontSize;
  input.style.width = (elem.clientWidth + 20) + 'px';
  input.style.display = 'block';
  input.value = elem.innerHTML;
  input.focus();
  input.select();

  elem.style.display = 'none';

  input.onkeydown = function() {setName(elem, input)};
  input.onblur = function() {noneSetName(elem, input)};
}

//ФУНКЦИЯ НОВОГО ИМЕНИ ИЛИ СТАТУСА
function setName(elem, input) {
  var logoutName = document.querySelector('.log-out-a > span');
  //при нажатии на кнопку с кодом 13 (enter) данные сохраняются в хранилище
  if (event.keyCode == 13) {
    input.style.display = 'none';
    elem.style.display = null;
    elem.innerHTML = input.value;

    //в зависимости от класса заменяемого поля изменяются определённые данные в obj newUser
    if (elem.className == 'user-name') {
      logoutName.innerHTML = input.value;

      newUser.login = userName.innerHTML;

      localStorage.setItem('user', JSON.stringify(newUser));
    } else {
      newUser.status = userStatus.innerHTML;

      localStorage.setItem('user', JSON.stringify(newUser));
    }
    //при нажатии на кнопку с кодом 27 (esc) данные не сохраняются
  } else if (event.keyCode == 27) {
    input.style.display = 'none';
    elem.style.display = null;
  }
}

//ФУНКЦИЯ ОТМЕНЫ ИЗМЕНЕНИЙ ПРИ НАЖАТИИ НА ДРУГУЮ ЧАСТЬ СТРАНИЦЫ
function noneSetName(elem, input) {
  input.style.display = 'none';
  elem.style.display = null;
  elem.innerHTML = elem.innerHTML;
}


var timerClick = document.querySelector('.timer');

timerClick.addEventListener("keypress", funSetTimer);

//ФУНКЦИЯ AJAX ЗАПРОСА
function funSetTimer(event) {
  event = event || window.event;
  //если внутри поля нажата клавиша 't' начинается процесс
  if(event.key.toLowerCase() == 't') {
    //берём нужные данные
    let userTimer = timerClick.value;

    //переводим передаваемые данные в JSON
    let timer = JSON.stringify({userTimer: userTimer});

    //начинаем составлять запрос
    let request = new XMLHttpRequest();

    request.open("POST", "/timers", true);
    request.setRequestHeader("Content-Type", "application/json");

    request.addEventListener("load", function () {
      // получаем и парсим ответ с сервера
      let recedive = JSON.parse(request.response);
      // смотрим ответ сервера и работаем с ним
      var tiktak = parseInt(recedive.userTimer);
      timerClick.value = '';
      if (tiktak > 0) {
        alert('Установлен таймер на ' + tiktak + ' секунды');
        setTimeout(function() {
          alert('Таймер сработал');
        }, tiktak*1000);
      } else {
        alert('Произошла ошибка. Попробуйте пожалуйста ещё раз');
      }

    });
    request.send(timer);
  }
}

//ОТРИСОВКА КАРТОЧЕК
showLists();
function showLists() {
  var newlist = document.querySelector('.block-list');
  var listApp = document.querySelector('.lists-block');

  for(var i = 0; i < newUser.lists.length; i++) {
    newlist = newlist.cloneNode(true);
    let listsParam = newUser.lists[i];
    newlist.querySelector('.name-list').textContent = listsParam.name;
    newlist.querySelector('.date-list').textContent = 'List start at: ' + listsParam.date;
    newlist.querySelector('.img-list').textContent = listsParam.img;
    newlist.querySelector('.about-list').textContent = listsParam.frontAbout;
    newlist.querySelector('.back-about-list').textContent = listsParam.backAbout;
    listApp.appendChild(newlist);
  }
  document.querySelector('.block-list').remove();
}


//ПОДСЧЁТ ЗАДАЧ
numberOfLists();
function numberOfLists() {
  var allLists = document.querySelectorAll('.block-list');
  var listsNumber = document.querySelector('.numb-of-lists');
  listsNumber.innerHTML = allLists.length;
}


//ФУНКЦИЯ ПОЛНОГО ВЫХОДА ИЗ ПРИЛОЖЕНИЯ С УДАЛЕНИЕМ ДАННЫХ ИЗ localStorage
function systemAllOut() {
  var outQuestion = confirm('Do you really want to leave');

  if(outQuestion == true) {
    localStorage.removeItem('user');
    window.location.replace('http://localhost:3000/');
  }
}


// ПЕРЕВОРОТ КАРТОЧКИ
var listBlock = document.querySelectorAll('.block-list');
listBlock.forEach((item, index) => {
  listBlock[index].addEventListener("dblclick", function() {listDeg(event)});
});

function listDeg(event) {
  event = event || window.event;
  var elem = event.target;

  var buttonBlockProv = elem.closest('.button-block');
  var prnts = elem.closest('.block-list');
  if(!buttonBlockProv) {
    if(!prnts.querySelector('.front').style.transform) {
      prnts.querySelector('.front').style.transform = 'rotateY(180deg)';
      prnts.querySelector('.back').style.transform = 'rotateY(360deg)';
    } else {
      prnts.querySelector('.front').style.transform = null;
      prnts.querySelector('.back').style.transform = null;
    }
  }
}
