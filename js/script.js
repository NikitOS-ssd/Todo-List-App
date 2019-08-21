setInterval(function() {
  var autoHeight = window.innerHeight;
  document.querySelector('.all-god').style.height = autoHeight + 'px';
}, 1)


function changeTextName() {
  var userName = document.querySelector('.user-name');
  var textName = document.querySelector('.user-name-change');
  textName.style.width = (userName.clientWidth + 20) + 'px';
  textName.style.display = 'block';
  textName.value = userName.innerHTML;
  userName.style.display = 'none';
  window.onkeypress = function() {changeName(event, userName, textName);};
}

function changeName(event, userName, textName) {
  event = event || window.event;
  var elem = event.target;
  if (event.keyCode == 13) {
    textName.style.display = 'none';
    userName.style.display = null;
    userName.innerHTML = textName.value;
  }
}
