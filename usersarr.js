function Newuser(name, status, password) {
  this.name = name,
  this.status = status,
  this.password = password
  if(!status) {
    this.status = 'Inkdd';
  }
}

Newuser.prototype.about = function() {
  console.log(`Name - ${this.name} \nStatus - ${this.status}\nPass - ${this.password}`);
}

var nikita = new Newuser('Nikita', '', 'NikitaVilordgina@');
console.log(nikita);
nikita.about();
