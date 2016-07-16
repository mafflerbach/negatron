const electron = require('electron');

$(document).ready(function() {
  $('#start').click(function() {
    var foo = new Test();
    foo.call();
  })
})