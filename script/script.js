var addButton = document.getElementById("add-btn");
var mainInput = document.getElementById("text-input");
var filterInput = document.getElementById("text-filter");
var dateTask = document.getElementById("date-task");
var itemsBlock = document.getElementById("items-block");
var sortAbcButton = document.getElementById("sort-abc-button");
var sortDateButton = document.getElementById("sort-date-button");

var todoList = [];
var reserveData = [];
var sortTodoStatus = true;
var sortDateStatus = true;

addButton.addEventListener("click", addNewTask);
itemsBlock.addEventListener("click", handler);
sortAbcButton.addEventListener("click", sortTodo);
window.addEventListener("load", backUp);
sortDateButton.addEventListener("click", sortDate);
filterInput.addEventListener("input", filterTodo);

function backUp() {
  if (
    localStorage.getItem("source") !== null &&
    localStorage.getItem("source") !== []
  ) {
    var session = localStorage.getItem("source");
    session = JSON.parse(localStorage.getItem("source"));

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
}

function updateWindow() {
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
}

function nextIdfunc() {
  if (todoList.length !== 0) {
    return todoList[todoList.length - 1].id + 1;
  } else {
    return 0;
  }
}

function saveList() {
  localStorage.setItem("session", JSON.stringify(todoList));
}

function addNewTask() {
  var newInputedTask = mainInput.value.trim();
  var newInputedDate = dateTask.value;

  if (newInputedTask.length > 0) {
    var tempTask = {};
    tempTask.todo = newInputedTask;
    tempTask.date = newInputedDate;
    tempTask.check = false;
    tempTask.id = nextIdfunc();

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

    createResevreData();
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
      if (todoList[i].id === targetId) {
        todoList[i].check = !todoList[i].check;
        if (todoList[i].check === true) {
          targetElem.classList.add("checked");
        } else {
          targetElem.classList.remove("checked");
        }
      }
    }

    saveList();
    createResevreData();
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
      createResevreData();
    }
  }
}

function sortTodo() {
  todoList.sort(function(a, b) {
    var nameA = a.todo.toLowerCase();
    var nameB = b.todo.toLowerCase();
    if (nameA > nameB) {
      if (sortTodoStatus === true) {
        return 1;
      } else {
        return -1;
      }
    }

    if (nameA < nameB) {
      if (sortTodoStatus === true) {
        return -1;
      } else {
        return 1;
      }
    }
  });

  sortTodoStatus = !sortTodoStatus;
  saveList();
  clearItemsBlock();
  updateWindow();
}

function sortDate() {
  todoList.sort(function(a, b) {
    var dateA = new Date(a.date);
    var dateB = new Date(b.date);
    if (sortDateStatus === true) {
      return dateA - dateB;
    } else {
      return dateB - dateA;
    }
  });

  sortDateStatus = !sortDateStatus;
  saveList();
  clearItemsBlock();
  updateWindow();
}

function createResevreData() {
  reserveData = todoList.slice();
  localStorage.setItem("source", JSON.stringify(reserveData));
}

function clearItemsBlock() {
  while (itemsBlock.hasChildNodes()) {
    itemsBlock.removeChild(itemsBlock.firstChild);
  }
}

function filterTodo() {
  var filter = filterInput.value.toLowerCase();
  var filterArray = todoList.filter(function(item) {
    return item.todo.toLowerCase().indexOf(filter) > -1;
  });

  localStorage.setItem("filter", JSON.stringify(filterArray));
  //console.log(filterArray);
  clearItemsBlock();

  if (filter == "") {
    backUp();
  } else {
    backUpFilter();
  }
}

function backUpFilter() {
  if (
    localStorage.getItem("filter") !== null &&
    localStorage.getItem("filter") !== []
  ) {
    var session = localStorage.getItem("filter");
    session = JSON.parse(localStorage.getItem("filter"));

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
  }
}
