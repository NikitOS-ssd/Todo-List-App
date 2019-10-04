var userName = document.querySelector('.user-name');
userName.addEventListener("click", function() {changeTextName(this)} );

var userStatus = document.querySelector('.user-status');
userStatus.addEventListener("click", function() {changeTextName(this)} );


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

      let userName = document.querySelector('.user-name').innerHTML;

      // сериализуем данные в json
      let user = JSON.stringify({userName: userName});
      let request = new XMLHttpRequest();

      // посылаем запрос на адрес "/user"
      request.open("POST", "/user", true);
      request.setRequestHeader("Content-Type", "application/json");
      request.addEventListener("load", function () {
        // получаем и парсим ответ сервера
        let receivedUser = JSON.parse(request.response);
        // смотрим ответ сервера
        console.log('Новое имя user`a: ' + receivedUser.userName);
      });
      request.send(user);
    }

  } else if (event.keyCode == 27) {
    input.style.display = 'none';
    elem.style.display = null;
    elem.innerHTML = elem.innerHTML;
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

timerClick.addEventListener("dblclick", funSetTimer);

function funSetTimer() {
  let userTimer = timerClick.value;

  let timer = JSON.stringify({userTimer: userTimer});
  let request = new XMLHttpRequest();

  request.open("POST", "/timers", true);
  request.setRequestHeader("Content-Type", "application/json");
  request.addEventListener("load", function () {

    let recedive = JSON.parse(request.response);

    alert('Установлен таймер на ' + recedive.userTimer + ' секунды');
    timerClick.value = '';
    setTimeout(function() {
      alert('Таймер сработал');
    }, +recedive.userTimer*1000);
  });
  request.send(timer);
}
