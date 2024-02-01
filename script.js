
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

let toggleDragMouse= false;

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
    element.style.backgroundColor=`${brushColor}`;
}

//Clear canvas
function setClear(){
    let oldBrushColor = brushColor;
    brushColor="#fff"
    divElements.forEach(setBackgroundColor);
    brushColor=oldBrushColor
}

//Toggle the grid lines
function setGridLines(){
    divElements.forEach(e=>{
        e.classList.toggle("gridLines")
    })
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

document.addEventListener("mousedown",()=>{
    toggleDragMouse=true;
})
document.addEventListener("mouseup",()=>{
    toggleDragMouse=false;
})

divElements.forEach(e => {
    e.addEventListener("mousedown",element=> {
        setBackgroundColor(element.target);
    })
})


//get the value from the color picker
colorPicker.addEventListener("change",function(){
    setNewBrushColor(colorPicker.value);
})

//Button toggle grid lines
buttonLines.addEventListener("click",setGridLines);

//Button clear
buttonClear.addEventListener("click",setClear)

//Button toggle eraser
buttonEraser.addEventListener("click",()=>{
    setNewBrushColor('#fff')
})
