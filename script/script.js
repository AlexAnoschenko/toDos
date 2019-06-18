var addButton = document.getElementById("add-btn");
var mainInput = document.getElementsByClassName("text-input")[0];
var todosList = document.getElementsByClassName("item-list")[0];
var dateTask = document.getElementById("date-task");
var itemDiv = document.getElementById("item-div");
var dateDiv = document.getElementById("date-div");
var dateList = document.getElementById("date-list");
var listDateDiv = document.getElementById("list-date-div");

addButton.onclick = function() {
    listDateDiv.style.visibility = "visible";

  var task = mainInput.value;
  if (task !== "") {
    var newLi = document.createElement("li");
    newLi.innerHTML = task;
    todosList.appendChild(newLi);
    mainInput.value = "";

    var currentDate = dateTask.value;
    var newDate = document.createElement("li");
    newDate.innerHTML = currentDate;
    dateDiv.appendChild(newDate);
    dateTask.value = null;
  } else {
    return;
  }
};
