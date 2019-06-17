var btn = document.getElementById("addBtn");
var input = document.getElementById("textInput");
var list = document.getElementById("list");

btn.onclick = function() {
    var task = input.value;
    if (task !== "") {
        var newLi = document.createElement('li');
        newLi.innerHTML = task;
        list.appendChild(newLi);
    } else {
        return;
    }
  };