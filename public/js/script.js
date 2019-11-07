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

  if (event.keyCode == 13) { //при нажатии на кнопку с кодом 13 (enter) данные сохраняются в хранилище
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

  } else if (event.keyCode == 27) { //при нажатии на кнопку с кодом 27 (esc) данные не сохраняются
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

//ПОДСЧЁТ ЗАДАЧ
numberOfLists();
function numberOfLists() {
  var allLists = document.querySelectorAll('.block-list');
  var listsNumber = document.querySelector('.numb-of-lists');
  listsNumber.innerHTML = allLists.length;
}


var timerClick = document.querySelector('.timer');

timerClick.addEventListener("keypress", funSetTimer);

//ФУНКЦИЯ AJAX ЗАПРОСА
function funSetTimer(event) {
  event = event || window.event;
  if(event.key.toLowerCase() == 't') { //если внутри поля нажата клавиша 't' начинается процесс
    let userTimer = timerClick.value; //берём нужные данные

    let timer = JSON.stringify({userTimer: userTimer}); //переводим передаваемые данные в JSON
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
