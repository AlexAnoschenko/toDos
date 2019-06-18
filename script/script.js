var addButton = document.getElementById("add-btn");
var mainInput = document.getElementById("text-input");
var dateTask = document.getElementById("date-task");

addButton.onclick = function() {
  var newInputedTask = mainInput.value;
  var newInputedDate = dateTask.value;

  if (newInputedTask !== "" && newInputedDate !== "") {
    var newDiv = document.createElement("div");
    document.body.appendChild(newDiv);
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
};
