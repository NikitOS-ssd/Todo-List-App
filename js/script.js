setInterval(function() {
  var autoHeight = window.innerHeight;
  document.querySelector('.all-god').style.height = autoHeight + 'px';
}, 1)


function changeTextName(elem) {
  var textName = document.querySelector('.change-input');
  textName.value = elem.innerHTML;
  textName.style.width = (elem.clientWidth + 10) + 'px';
  textName.style.display = 'block';
  textName.style.fontSize = getComputedStyle(elem).fontSize;
  textName.style.fontWeight = getComputedStyle(elem).fontWeight;

  elem.style.display = 'none';
  window.onkeypress = function() {changeName(event, elem, textName);};
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
