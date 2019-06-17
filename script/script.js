var addButton = document.getElementById("add-btn");
var mainInput = document.getElementById("text-input");
var todosList = document.getElementById("list");

addButton.onclick = function() {
    var task = mainInput.value;
    if (task !== "") {
        var newLi = document.createElement('li');
        newLi.innerHTML = task;
        todosList.appendChild(newLi);
    } else {
        return;
    }
  };