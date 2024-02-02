
const colorPicker = document.querySelector("#colorPicker");
const buttonEraser = document.querySelector("#toggleEraser");
const buttonRainbow = document.querySelector("#toggleRainbow");
const buttonShading = document.querySelector("#toggleShading");
const buttonLighten = document.querySelector("#toggleLighten");
const buttonGrabber = document.querySelector("#toggleGrabber");
const buttonLines = document.querySelector("#toggleLines");
const buttonClear = document.querySelector("#clear");
const canvas = document.querySelector("#canvas");

let brushColor="#fff"; //the variable that has the current color

let divElements; //the variable that holds an array of canvas' elements

let toggleDragMouse= false; //check if mouse is being dragged

let modeRainbow=false; //check if rainbow mode is on/off

function createCanvas(size){
    let dimensions=400/size
    for(let i=0;i<(size*size);i++){
        let divElement=document.createElement('div');
        divElement.setAttribute("id","grid");
        divElement.style.width=`${dimensions}px`;
        divElement.style.height=`${dimensions}px`;
        divElement.style.boxSizing="border-box";
        divElement.classList.add('gridLines');
        divElement.style.backgroundColor="white";
        divElement.style.cursor="pointer";
        canvas.appendChild(divElement);
    }
    divElements = document.querySelectorAll("#grid");
}

//set the new brush color
function setNewBrushColor(value){
    brushColor=value;
}

//set the background color of element
function setBackgroundColor(element){
    if(buttonClear.getAttribute("class")=="toggleOn"||buttonEraser.getAttribute("class")=="toggleOn"){
        element.style.backgroundColor=`#fff`;
    }else if(modeRainbow==true){
        element.style.backgroundColor=`${randomColor()}`;
    }else{
        element.style.backgroundColor=`${brushColor}`;
    }
}

//Clear canvas
function setClear(){
    // let oldBrushColor = brushColor;
    // brushColor="#fff"
    divElements.forEach(setBackgroundColor);
    // brushColor=oldBrushColor
}

//Toggle the grid lines
function setGridLines(){
    divElements.forEach(e=>{
        e.classList.toggle("gridLines")
    })
}

//return random color 
function randomColor() {
    // return "#" + Math.floor(Math.random()*16777215).toString(16);
    // this returns fewer colors but they are all nice and bright
    return `hsl(${Math.random() * 360}, 100%, 50%)`;
}

//set the default 
createCanvas(10);
divElements.forEach(setBackgroundColor);
brushColor="#000"
//set event listener for each canvas element
divElements.forEach(e => {
    e.addEventListener("mousedown",element => {
        setBackgroundColor(element.target);
    })
    e.addEventListener("mouseover",element => {
        if(toggleDragMouse==true){
            setBackgroundColor(element.target);
        }
    })
})

//set event listener for the whole document to check if mouse if being dragged
document.addEventListener("mousedown",()=>{
    toggleDragMouse=true;
})
document.addEventListener("mouseup",()=>{
    toggleDragMouse=false;
})



//get the value from the color picker
colorPicker.addEventListener("change",function(){
    setNewBrushColor(colorPicker.value);//set brush color
    buttonEraser.classList.remove("toggleOn")//turn off eraser
    buttonRainbow.classList.remove("toggleOn")//turn off rainbow
    modeRainbow=false;//turn off rainbow
})

//Button toggle grid lines
buttonLines.addEventListener("click",function(){
    buttonLines.classList.toggle("toggleOn")
    setGridLines();
    setTimeout(()=>{
        buttonLines.classList.toggle("toggleOn")
    },"100")
});

//Button clear
buttonClear.addEventListener("click",function(){
    buttonClear.classList.add("toggleOn")
    buttonEraser.classList.remove("toggleOn")
    setClear();
    setTimeout(()=>{
        buttonClear.classList.remove("toggleOn")
    },"100")
})

//Button toggle eraser
buttonEraser.addEventListener("click",()=>{
    if(buttonEraser.getAttribute("class")!="toggleOn"){
        buttonEraser.classList.add("toggleOn")
    }else{
        buttonEraser.classList.remove("toggleOn")
    }
})

//Button toggle Rainbow
buttonRainbow.addEventListener("click",()=>{
    if(buttonRainbow.getAttribute("class")!="toggleOn"){
        buttonRainbow.classList.add("toggleOn")
        modeRainbow=true;
    }else{
        buttonRainbow.classList.remove("toggleOn")
        modeRainbow=false;
    }
})