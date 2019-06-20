var addButton = document.getElementById("add-btn");
var mainInput = document.getElementById("text-input");
var dateTask = document.getElementById("date-task");
var blockForTasks = document.getElementById("block-for-tasks");

var todoList = [];

addButton.addEventListener("click", addNewTask);
blockForTasks.addEventListener("click", removeTask);
blockForTasks.addEventListener("click", taskIsDone);

window.onload = function() {
  if (localStorage.getItem("session") !== null) {
    var session = localStorage.getItem("session");
    session = JSON.parse(localStorage.getItem("session"));

    session.forEach(function(item, index) {
      var newDiv = document.createElement("div");
      blockForTasks.appendChild(newDiv);

      if (item.check == "true") {
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
  var newInputedTask = mainInput.value;
  var newInputedDate = dateTask.value;
  var checkTask = "false";
  var newId = 0;

  var tempTask = {};
  tempTask.todo = newInputedTask;
  tempTask.date = newInputedDate;
  tempTask.check = checkTask;
  tempTask.id = newId + todoList.length;

  var i = todoList.length;
  todoList[i] = tempTask;

  if (newInputedTask !== "" && newInputedDate !== "") {
    var newDiv = document.createElement("div");
    blockForTasks.appendChild(newDiv);
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

function removeTask(event) {
  var target = event.target;
  if (target.tagName == "B") {
    var targetId = +target.parentNode.parentNode.id;
    target.parentNode.parentNode.remove();

    for (let i = 0; i < todoList.length; i++) {
      if (todoList[i].id === targetId) {
        todoList.splice(i, 1);
      }
    }

    saveList();
    //console.log(todoList);
  } else {
    return;
  }
}

function taskIsDone(event) {
  var target = event.target;
  if (target.tagName == "SPAN") {
    var targetId = target.parentNode.id;
    //console.log(targetId);
    target.parentNode.classList.add("checked");

    for (var i = 0; i < todoList.length; i++) {
      if (todoList[i].id == targetId) {
        todoList[i].check = "true";
      }
      //console.log(todoList[i].check);
    }
    saveList();
    //console.log(targetId);
    //console.log(todoList);
  } else {
    return;
  }
}
