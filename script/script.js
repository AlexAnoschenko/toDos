var addButton = document.getElementById("add-btn");
var mainInput = document.getElementById("text-input");
var dateTask = document.getElementById("date-task");
var blockForTasks = document.getElementById("block-for-tasks");

addButton.addEventListener("click", addNewTask);

function addNewTask() {
  var newInputedTask = mainInput.value;
  var newInputedDate = dateTask.value;

  if (newInputedTask !== "" && newInputedDate !== "") {
    var newDiv = document.createElement("div");
    blockForTasks.appendChild(newDiv);
    newDiv.className = "single-item";

    var nextTask = document.createElement("span");
    var nextDate = document.createElement("span");

    nextTask.innerHTML = newInputedTask;
    nextDate.innerHTML = newInputedDate;

    newDiv.appendChild(nextTask);
    newDiv.appendChild(nextDate);
  } else {
    return;
  }
}

blockForTasks.addEventListener("click", taskIsDone);

function taskIsDone(event) {
    var target = event.target;
    if (target.tagName == "SPAN") {
        target.parentNode.classList.add("checked");
    } else {
        return;
    }
};
