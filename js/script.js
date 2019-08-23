setInterval(function() {
  var autoHeight = window.innerHeight;
  document.querySelector('.all-god').style.height = autoHeight + 'px';
}, 1)


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

  elem.style.display = 'none';

  input.onkeydown = function() {setName(elem, input)};
  input.onblur = function() {noneSetName(elem, input)};
}


function setName(elem, input) {

  if (event.keyCode == 13) {
    input.style.display = 'none';
    elem.style.display = null;
    elem.innerHTML = input.value;
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
