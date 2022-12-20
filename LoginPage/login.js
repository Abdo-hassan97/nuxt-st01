var selectedObj = {};
var jsData;

let dropdown = document.getElementById("users");
dropdown.length = 0;

let defaultOption = document.createElement("option");
defaultOption.text = "  -- Select User --  ";

dropdown.add(defaultOption);
dropdown.selectedIndex = 0;

let myRequest = new XMLHttpRequest();
myRequest.open("GET", "http://localhost:4000/users");
myRequest.send();
myRequest.onreadystatechange = function () {
  if (this.readyState === 4 && this.status === 200) {
    jsData = JSON.parse(this.responseText);
    console.log(jsData);
    let option;

    for (let i = 0; i < jsData.length; i++) {
      option = document.createElement("option");
      option.text = jsData[i].username;
      option.value = jsData[i].id;
      dropdown.add(option);
    }
  }
};

function change(e) {
  let selectedId = e.target.value;
  selectedObj = jsData.find((x) => x.id == selectedId);
  document.getElementById("name").innerText = selectedObj.name;
  document.getElementById("avatar").src = selectedObj.avatar;
  document.getElementById("warning").innerText="";
  document.getElementById("pwd").value=null;
}

function login() {
  var data = {
    auth: {
      username: selectedObj.username,
      password: document.getElementById("pwd").value,
    },
  };

  let auth = window.btoa(`${data.auth.username}:${data.auth.password}`);

  var xhr = new XMLHttpRequest();
  xhr.open("GET", "http://localhost:4000/todos", true);
  xhr.setRequestHeader("Authorization", `Basic ${auth}`);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var res = JSON.parse(xhr.response);

        window.localStorage.setItem("selectedObj", JSON.stringify(selectedObj)); // Saving
        window.localStorage.setItem("details", JSON.stringify(res)); // Saving
        window.localStorage.setItem("authorization", JSON.stringify(auth)); // Saving

        window.location.replace("../DashBord/Dash.html");
      } else {
        document.getElementById("warning").innerText="Wrong password";
      }
    }
  };

  xhr.send(JSON.stringify(data));

  return false;
}
