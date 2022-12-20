var nameLabel = document.getElementById("name");
var imageTag = document.getElementById("imaage");
var container = document.getElementById("container");

var details = JSON.parse(window.localStorage.getItem("details"));
var selectedObj = JSON.parse(window.localStorage.getItem("selectedObj"));
var authorization = JSON.parse(window.localStorage.getItem("authorization"));

nameLabel.innerText = selectedObj.name;
imageTag.src = selectedObj.avatar;
loadDetailsData();

function loadDetailsData() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "http://localhost:4000/todos", true);
  xhr.setRequestHeader("Authorization", `Basic ${authorization}`);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var res = JSON.parse(xhr.response);
        loopOverData(res);
      } else {
        alert("Error");
      }
    }
  };
  xhr.send();

  return false;
}

function loopOverData(data) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].task) {
      container.innerHTML += drawHTML(data[i]);
    }
  }
}

function drawHTML(data) {
  return `
        <div class="Tasks">
             <p class="task" id='taskId' >${data.id}</p>
             <p class="task">${data.task}</p>
             <button id="btn1" onclick='toggle(${data.id})'>${
    data.completed ? "Completed" : "Not Completed"
  }</button>
             <button id="btn2" onclick='deleteTask(${data.id})'>Delete</button>
        </div>`;
}

function deleteTask(id) {
  var xhr = new XMLHttpRequest();
  xhr.open("DELETE", "http://localhost:4000/todos/" + id, true);
  xhr.setRequestHeader("Authorization", `Basic ${authorization}`);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var res = JSON.parse(xhr.response);
      } else {
        alert("Error");
      }
    }
  };

  xhr.send();

  return false;
}

function addTask() {
  var xhr = new XMLHttpRequest();

  var data = {
    task: document.getElementById("AddTask").value,
  };

  xhr.open("POST", "http://localhost:4000/todos/", true);
  xhr.setRequestHeader("Authorization", `Basic ${authorization}`);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var res = JSON.parse(xhr.response);
      } else {
        alert("Error");
      }
    }
  };

  xhr.send(JSON.stringify(data));

  return false;
}

function toggle(id) {
  var xhr = new XMLHttpRequest();
  xhr.open("PUT", "http://localhost:4000/todos/" + id, true);
  xhr.setRequestHeader("Authorization", `Basic ${authorization}`);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var res = JSON.parse(xhr.response);
      } else {
        alert("Error");
      }
    }
  };

  xhr.send();

  return false;
}

function logOut() {
  window.localStorage.removeItem("details");
  window.localStorage.removeItem("selectedObj");
  window.localStorage.removeItem("authorization");
  window.location.replace("../LoginPage/loginPage.html");

}
