var userName = document.querySelector('.user-name');
userName.addEventListener("click", function() {changeTextName(this)} );

var userStatus = document.querySelector('.user-status');
userStatus.addEventListener("click", function() {changeTextName(this)} );

var logOut = document.querySelector('.log-out-a');
logOut.addEventListener("click", systemAllOut);

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

function setName(elem, input) {
  var logoutName = document.querySelector('.log-out-a > span');
  if (event.keyCode == 13) {
    input.style.display = 'none';
    elem.style.display = null;
    elem.innerHTML = input.value;

    if (elem.className == 'user-name') {
      logoutName.innerHTML = input.value;

      newUser.login = userName.innerHTML;

      localStorage.setItem('user', JSON.stringify(newUser));
      // console.log(newUser);
    } else {
      newUser.status = userStatus.innerHTML;

      localStorage.setItem('user', JSON.stringify(newUser));
      // console.log(newUser);
    }

  } else if (event.keyCode == 27) {
    input.style.display = 'none';
    elem.style.display = null;
  }
}

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

function funSetTimer(event) {
  event = event || window.event;
  if(event.key.toLowerCase() == 't') {
    let userTimer = timerClick.value;

    let timer = JSON.stringify({userTimer: userTimer});
    let request = new XMLHttpRequest();

    request.open("POST", "/timers", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", function () {
      // получаем и парсим ответ сервера
      let recedive = JSON.parse(request.response);
      // смотрим ответ сервера
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


function systemAllOut() {
  var outQuestion = confirm('Do you really want to leave');

  if(outQuestion == true) {
    localStorage.removeItem('user');
    window.location.replace('http://localhost:3000/');
  }
}
