setInterval( () => { 
  document.querySelector("#time").innerHTML = new Date().toLocaleString() 
}, 1000);

function dragElement(element) {
  var initialX = 0, initialY = 0, currentX = 0, currentY = 0;

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

function closeWindow(element) {
  element.style.display = "none";
}

function openWindow(element) {
  element.style.display = "flex";
  biggestIndex++;
  element.style.zIndex = biggestIndex;
  document.querySelector("#top-bar").style.zIndex = biggestIndex + 1;
}

function closableWindow(id) {
  document.querySelector(id + "close").addEventListener("click", () => {
    closeWindow(document.querySelector(id));
  })
}

var selectedIcon = undefined;

function selectIcon(element) {
  element.classList.add("selected");
  selectedIcon = element;
}

function deselectIcon(element) {
  element.classList.remove("selected");
  selectedIcon = undefined;
}

function handleIconTap(element, window) {
  if (element.classList.contains("selected")) {
    deselectIcon(element);
    openWindow(window);
  } else {
    selectIcon(element);
  }
}

function addIconTapHandling(element, window) {
  element.addEventListener("click", () => {
    handleIconTap(element, window);
  })
}

addIconTapHandling(document.querySelector("#welcomeicon"), document.querySelector("#welcome"))
addIconTapHandling(document.querySelector("#doomicon"), document.querySelector("#doom"))

var biggestIndex = 1;

function addWindowTapHandling(element) {
  element.addEventListener("mousedown", () =>
    handleWindowTap(element)
  )
}

function handleWindowTap(element) {
  biggestIndex++;
  element.style.zIndex = biggestIndex;
  document.querySelector("#top-bar").style.zIndex = biggestIndex + 1;
  deselectIcon(selectedIcon)
}

function initializeWindow(elementName) {
  var screen = document.querySelector("#" + elementName)
  addWindowTapHandling(screen)
  closableWindow("#" + elementName)
  dragElement(screen)
}

initializeWindow("doom")
initializeWindow("welcome")