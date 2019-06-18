var addButton = document.getElementById("add-btn");
var mainInput = document.getElementById("text-input");
var dateTask = document.getElementById("date-task");
var blockForTasks = document.getElementById("block-for-tasks");

addButton.addEventListener("click", addNewTask);
blockForTasks.addEventListener("click", removeTask);
blockForTasks.addEventListener("click", taskIsDone);

function addNewTask() {
  var newInputedTask = mainInput.value;
  var newInputedDate = dateTask.value;

  if (newInputedTask !== "" && newInputedDate !== "") {
    var newDiv = document.createElement("div");
    blockForTasks.appendChild(newDiv);
    newDiv.className = "single-item";

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
  } else {
    return;
  }
}

function removeTask(event) {
  var target = event.target;
  if (target.tagName == "B") {
    target.parentNode.parentNode.remove();
  } else {
    return;
  }
}

function taskIsDone(event) {
  var target = event.target;
  if (target.tagName == "SPAN") {
    target.parentNode.classList.add("checked");
  } else {
    return;
  }
}
