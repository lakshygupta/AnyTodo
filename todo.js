var ul = document.getElementById("list");
var li;
var copymyobj;
var lastkey = 0;
var flag = 0;
function display() {
  for (var i in localStorage) {
    if (!localStorage.hasOwnProperty(i)) {
      continue; // skip keys like "setItem", "getItem" etc
    }
    var item2 = localStorage.getItem(i);
    var testnode = document.createTextNode(item2);
    li = document.createElement("li");
    var checkbox = document.createElement("input"); //create checkbox
    checkbox.type = "checkbox"; //checkbox type setting
    checkbox.setAttribute("id", "check"); //adding the class to the checkbox
    var label = document.createElement("label");
    li.setAttribute("class", "mycheck");
    ul.appendChild(label);
    li.appendChild(checkbox);
    label.appendChild(testnode);
    li.appendChild(label);
    ul.insertBefore(li, ul.childNodes[0]);
    rem = true;
    if (lastkey == undefined) {
      lastkey++;
      flag = i;
    }
  }

  setInterval(no(), 0000);

  var addButton = document.getElementById("add");
  addButton.addEventListener("click", addItem);

  var removeButton = document.getElementById("remove");
  removeButton.addEventListener("click", removeItem);

  var clearButton = document.getElementById("clear");
  clearButton.addEventListener("click", clearAll);

  document.querySelector('input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      addItem();
    }
});
  var lastkey;
  var count = flag + 1;
  function addItem() {
    var input = document.getElementById("input");
    var insert = input.value;
    var len = insert.length;
    var testnode = document.createTextNode(insert);

    if (len >= 46) {
      var add = "Please shorten your input";
      document.getElementById("main").textContent = add;
      input.value = "";
    } else if (insert === "") {
      var add = "Task cannot be empty";
      document.getElementById("main").textContent = add;
    } else {
      //create li
      li = document.createElement("li");

      //create checkbox
      var checkbox = document.createElement("input"); //create checkbox
      checkbox.type = "checkbox"; //checkbox type setting
      checkbox.setAttribute("id", "check"); //adding the class to the checkbox
      li.setAttribute("class", "mycheck");
      //create label
      var label = document.createElement("label");

      //add these elements to web page
      ul.appendChild(label);
      li.appendChild(checkbox);
      label.appendChild(testnode);
      li.appendChild(label);
      ul.insertBefore(li, ul.childNodes[0]);
      count += 1;
      lastkey = count;
      li.className = "visual";
      document.querySelector("h2").textContent = "";
      var add = "Task Added";
      document.getElementById("main").textContent = add;

      localStorage.setItem(count, insert);
      input.value = "";
    }
    var myobj = document.getElementById("pp");
    myobj.remove();
  }
}

var pp = false;
var rem = false;
function no() {
  if (ul.hasChildNodes() === false && pp == false && rem == false) {
    pp = true;
    var h2 = document.createElement("h2");
    var myValue = document.createTextNode("No Task to show");
    h2.appendChild(myValue);
    h2.style.color = "rgb(77, 74, 73)";
    document.querySelector("h2").appendChild(h2);
  }
}

function no1() {
  if (ul.hasChildNodes() === false) {
    var add = "No Task to show";
    document.querySelector("h2").textContent = add;
  }
}

var checkk = false;
var ing;
function removeItem() {
  li = ul.children;
  for (let index = 0; index < li.length; index++) {
    while (li[index] && li[index].children[0].checked) {
      ing = li[index];
      hello = ing.getElementsByTagName("label")[0].firstChild.data;
      ul.removeChild(li[index]);
      checkk = true;
      for (var i = 0, len = localStorage.length; i < len; i++) {
        var key = localStorage.key(i);
        var value = localStorage[key];
        if (value === hello) {
          // console.log(key + " => " + value);
          localStorage.removeItem(key);
        }
      }
    }
  }

  if (checkk == true) {
    var add = "Task Removed";
    document.getElementById("main").textContent = add;
  } else if (checkk == false) {
    var add = "No Task to remove";
    document.getElementById("main").textContent = add;
  }
  checkk = false;
  no1();
}

var clea = false;
function clearAll() {
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
    clea = true;
    localStorage.clear();
  }
  if (clea === true) {
    var add = "All Tasks Removed";
    document.getElementById("main").textContent = add;
  } else if (clea === false) {
    var add = "No Task to clear";
    document.getElementById("main").textContent = add;
  }
  // ul.remove();
  clea = false;
  pp = false;
  var isEmpty = document.getElementById('pp').innerHTML === "";
  if(isEmpty)
    no();
}

function editItem() {

}
