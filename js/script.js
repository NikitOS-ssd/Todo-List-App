var allList = [
  {id: 1, name: 'Learn HTML/CSS', about: 'I need choose a good book about Web-programming, HTML, CSS and JS', date: new Date()},
  {id: 2, name: 'Learn JavaScript', about: 'I need choose a good book about Web-programming, HTML, CSS and JS', date: new Date()},
  {id: 3, name: 'Learn Node.JS', about: 'I need choose a good book about Web-programming, HTML, CSS and JS', date: new Date()}
]
for (var i = 0; i < allList.length; i++) {
  let key = allList[i].id + '; ' + allList[i].name;
  // document.querySelector('#root').appendChild(key);switch
  // console.log(key);
}
