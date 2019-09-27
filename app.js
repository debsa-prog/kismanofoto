// must match CSS
var headerHeight = 0;
var closedHeight = 400;
var openHeight = 1400;
var closedWidth = 400;
var openWidth = 800;

var scrollDelay = 200;

var stretchHeight = openHeight-closedHeight;
var stretchWidth = openWidth-closedWidth;

var body = document.getElementsByTagName("body")[0];
var accordion = document.getElementById("accordion");


var mouseX = 0;
var mouseY = 0;
var sizeX = 0;
var sizeY = 0;
var docSizeY = 0;
var scrollTop = 0;
var scrollBottom = 0;


// headerHeight
// 
function fakeScroll(){
  body.style.height = (headerHeight + 2*openHeight - closedHeight) + "px"; 
 
  currentWidth = openWidth;
  accordion.style.position = "absolute"; 
  accordion.style.top = 0; 
  accordion.style.left = (sizeX - openWidth)/2 + "px"; 
  accordion.style.width = openWidth + "px";
  accordion.style.height = openHeight + "px";
  if(scrollTop<headerHeight){
    console.log("phase1");
    accordion.style.position = "absolute"; 
    accordion.style.top = headerHeight + "px"; 
    accordion.style.left = (sizeX - closedWidth)/2 + "px"; 
    accordion.style.width = closedWidth + "px";
    accordion.style.height = closedHeight + "px";
  }else if(scrollTop<headerHeight+stretchWidth){
    console.log("phase2");
    currentWidth = closedWidth + (scrollTop-headerHeight);
    accordion.style.position = "fixed"; 
    accordion.style.top = 0; 
    accordion.style.left = (sizeX - currentWidth)/2 + "px"; 
    accordion.style.width = currentWidth + "px";
    accordion.style.height = closedHeight + "px";
  }else if(scrollTop<(headerHeight+stretchWidth+openHeight-closedHeight)){
    console.log("phase3");
    currentWidth = openWidth;
    accordion.style.position = "fixed"; 
    accordion.style.top = 0; 
    accordion.style.left = (sizeX - currentWidth)/2 + "px"; 
    accordion.style.width = currentWidth + "px";
    accordion.style.height = (closedHeight + (scrollTop-(headerHeight+stretchWidth))) + "px";
  }else{
    console.log("phase4");
     currentWidth = openWidth;
     accordion.style.position = "absolute"; 
     accordion.style.top = (headerHeight+stretchWidth+stretchHeight) + "px"; 
     accordion.style.left = (sizeX - currentWidth)/2 + "px"; 
     accordion.style.width = openWidth + "px";
     accordion.style.height = openHeight + "px";
  }
}


var productList = document.getElementById("productList");

watchViewport(updateValues);

unwatchViewport(updateValues);

var state = getViewportState();

const updateValues = ({ size, scroll, mouse, orientation }) => {
  if (size.changed) {
    // console.log("size");
    // console.log(size);
    sizeX = size.x;
    sizeY = size.y;
    // docSizeY = size.docY;
    fakeScroll();
  }
  
  if (scroll.changed) {
    // console.log("scroll");
    // console.log(scroll);
    scrollTop = scroll.top;
    scrollBottom = scroll.bottom;
    fakeScroll();
  }
 
  if (mouse.changed) {
    // console.log("mouse");
    // console.log(mouse);
    // mouseX = mouse.x;
    // mouseY = mouse.y;
  }
};
