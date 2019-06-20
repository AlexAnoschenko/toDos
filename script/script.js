var addButton = document.getElementById("add-btn");
var mainInput = document.getElementById("text-input");
var dateTask = document.getElementById("date-task");
var itemsBlock = document.getElementById("items-block");

var todoList = [];

addButton.addEventListener("click", addNewTask);
itemsBlock.addEventListener("click", handler);

window.onload = function updateWindow() {
  if (
    localStorage.getItem("session") !== null &&
    localStorage.getItem("session") !== []
  ) {
    var session = localStorage.getItem("session");
    session = JSON.parse(localStorage.getItem("session"));

    session.forEach(function(item, index) {
      var newDiv = document.createElement("div");
      itemsBlock.appendChild(newDiv);

      if (item.check == true) {
        newDiv.className = "single-item checked";
      } else {
        newDiv.className = "single-item";
      }

      newDiv.id = index;

      var nextTask = document.createElement("span");
      var nextDate = document.createElement("span");
      var closeButton = document.createElement("span");

      nextTask.innerHTML = item.todo;
      nextDate.innerHTML = item.date;
      closeButton.innerHTML = "<b>[X]<b>";
      nextTask.classList.add("styleTask");
      nextDate.classList.add("styleDate");
      closeButton.classList.add("close-button");

      newDiv.appendChild(nextTask);
      newDiv.appendChild(nextDate);
      newDiv.appendChild(closeButton);
    });
    todoList = session;
  }
};

function saveList() {
  localStorage.setItem("session", JSON.stringify(todoList));
}

function addNewTask() {
  var newInputedTask = mainInput.value.trim();
  var newInputedDate = dateTask.value;
  var checkTask = false;

  if (newInputedTask.length > 0) {
    var tempTask = {};
    tempTask.todo = newInputedTask;
    tempTask.date = newInputedDate;
    tempTask.check = checkTask;
    tempTask.id = todoList.length;

    todoList.push(tempTask);
  }

  if (newInputedTask.length > 0 && newInputedDate !== "") {
    var newDiv = document.createElement("div");
    itemsBlock.appendChild(newDiv);
    newDiv.className = "single-item";
    newDiv.id = todoList.length - 1;

    var nextTask = document.createElement("span");
    var nextDate = document.createElement("span");
    var closeButton = document.createElement("span");

    nextTask.innerHTML = newInputedTask;
    nextDate.innerHTML = newInputedDate;
    closeButton.innerHTML = "<b>[X]<b>";
    nextTask.classList.add("styleTask");
    nextDate.classList.add("styleDate");
    closeButton.classList.add("close-button");

    newDiv.appendChild(nextTask);
    newDiv.appendChild(nextDate);
    newDiv.appendChild(closeButton);
    saveList();
  } else {
    return;
  }
}

function handler(event) {
  var target = event.target;
  if (target.tagName === "SPAN") {
    var targetId = +target.parentNode.id;
    var targetElem = target.parentNode;

    for (var i = 0; i < todoList.length; i++) {
      if (todoList[i].id == targetId) {
        todoList[i].check = !todoList[i].check;
        if (todoList[i].check === true) {
          targetElem.classList.add("checked");
        } else {
          targetElem.classList.remove("checked");
        }
      }
    }
    saveList();
  } else {
    if (target.tagName === "B") {
      var targetId = +target.parentNode.parentNode.id;
      target.parentNode.parentNode.remove();

      for (let i = 0; i < todoList.length; i++) {
        if (todoList[i].id === targetId) {
          todoList.splice(i, 1);
        }
      }
      saveList();
    }
  }
}
