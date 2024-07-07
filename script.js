setInterval( () => { 
  document.querySelector("#time").innerHTML = new Date().toLocaleString() 
}, 1000);

function dragElement(element) {
  var initialX, initialY, x, y;

  if (document.getElementById(element.id + "header")) {
    document.getElementById(element.id + "header").onmousedown = startDragging; 
  } else {
    element.onmousedown = startDragging;
  }

  function startDragging(e) {
    e = e || window.event;
    e.preventDefault();

    initialX = e.clientX;
    initialY = e.clientY;

    document.onmouseup = stopDragging;
    document.onmousemove = dragElement;
  }

  function dragElement(e) {
    e = e || window.event;
    e.preventDefault();

    currentX = initialX - e.clientX;
    currentY = initialY - e.clientY;
    initialX = e.clientX;
    initialY = e.clientY;

    element.style.top = (element.offsetTop - currentY) + "px";
    element.style.left = (element.offsetLeft - currentX) + "px";
  }

  function stopDragging() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

dragElement(document.getElementById("welcome"))

var welcomeScreen = document.querySelector("#welcome");

function closeWindow(element) {
  element.style.display = "none";
}

function openWindow(element) {
  element.style.display = "flex";
}

var welcomeScreenClose = document.querySelector(".close");
var welcomeScreenOpen = document.querySelector("#welcomeopen");

welcomeScreenClose.onclick = () => {
  closeWindow(welcomeScreen);
}

welcomeScreenOpen.onclick = () => {
  openWindow(welcomeScreen);
}