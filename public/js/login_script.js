var signButton = document.querySelector('#sign-button');
var registrButton = document.querySelector('#registr-button');

signButton.addEventListener("click", getSignBlock);
registrButton.addEventListener("click", getRegistrBlock);

function getSignBlock() {
  var loginBlock = document.querySelector('.login-block');
  var registrBlock = document.querySelector('.registration-block');
  if (loginBlock.style.display == 'none' || loginBlock.style.display == '') {
    registrBlock.style.opacity = '0.1';
    setTimeout(function() {
      registrBlock.style.display = 'none';
      registrBlock.style.opacity = null;
      loginBlock.style.display = 'flex';
    }, 450);
  }
}

function getRegistrBlock() {
  var registrBlock = document.querySelector('.registration-block');
  var loginBlock = document.querySelector('.login-block');
  if (registrBlock.style.display == 'none' || registrBlock.style.display == '') {
    loginBlock.style.opacity = '0.1';
    setTimeout(function() {
      loginBlock.style.display = 'none';
      loginBlock.style.opacity = null;
      registrBlock.style.display = 'flex';
    }, 450);
  }
}
