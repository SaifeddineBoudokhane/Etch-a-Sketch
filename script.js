
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

function createCanvas(size){
    let dimensions=400/size
    for(let i=0;i<(size*size);i++){
        let divElement=document.createElement('div');
        divElement.setAttribute("id","grid");
        divElement.style.width=`${dimensions}px`;
        divElement.style.height=`${dimensions}px`;
        divElement.style.boxSizing="border-box";
        divElement.classList.add('gridLines');
        divElement.style.backgroundColor="#fff";
        divElement.style.cursor="pointer";
        canvas.appendChild(divElement);
    }
    divElements = document.querySelectorAll("#grid");
}

//set the background color of element
//this is the most important function of course
function setBackgroundColor(element){
    if(buttonClear.getAttribute("class")=="toggleOn"||buttonEraser.getAttribute("class")=="toggleOn"){
        element.style.backgroundColor=`#fff`;
    }else if(buttonRainbow.getAttribute("class")=="toggleOn"){
        element.style.backgroundColor=`${randomColor()}`;
    }else if(buttonShading.getAttribute("class")=="toggleOn"){
        let currentBackgroundColor=element.style.backgroundColor
        let darkenedBackgroundColor=adjustColor(currentBackgroundColor,-20)
        element.style.backgroundColor=darkenedBackgroundColor;
    }else if(buttonLighten.getAttribute("class")=="toggleOn"){
        let currentBackgroundColor=element.style.backgroundColor
        let darkenedBackgroundColor=adjustColor(currentBackgroundColor,20)
        element.style.backgroundColor=darkenedBackgroundColor;
    }else{
        element.style.backgroundColor=`${brushColor}`;
    }
}

//Lightens or darkens an rgb colour 
//THIS FUNCTION WAS MADE BY CHATGPT I DO NOT TAKE CREDIT OF IT :)
function adjustColor(rgbColor, percentage) {
    // Parse RGB color string into an array of integers
    const colorValues = rgbColor.match(/\d+/g).map(Number);

    // Adjust each color channel based on the percentage
    const adjustedColor = colorValues.map((value, index) => {
        if (percentage > 0) {
            // Make color closer to white
            return value + Math.round((255 - value) * (percentage / 100));
        } else if (percentage < 0) {
            // Make color closer to black
            return value - Math.round(value * (Math.abs(percentage) / 100));
        } else {
            // No adjustment needed
            return value;
        }
    });

    // Ensure values are within the valid RGB range (0-255)
    const finalColor = adjustedColor.map(value => Math.min(255, Math.max(0, value)));

    // Construct the new RGB color string
    return `rgb(${finalColor[0]}, ${finalColor[1]}, ${finalColor[2]})`;
}

//set the new brush color
function setNewBrushColor(value){
    brushColor=value;
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
        console.log(e.style.backgroundColor)
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
    buttonLighten.classList.remove("toggleOn")//turn off lighten
    buttonShading.classList.remove("toggleOn")//turn off shading
})

//Button toggle grid lines
buttonLines.addEventListener("click",function(){
    buttonLines.classList.toggle("toggleOn")//turn on grid lines
    setGridLines();
    setTimeout(()=>{
        buttonLines.classList.toggle("toggleOn")//turn off grid lines
    },"100")
});

//Button clear
buttonClear.addEventListener("click",function(){
    buttonClear.classList.add("toggleOn")//turn on clear
    buttonEraser.classList.remove("toggleOn")//turn off eraser
        buttonLighten.classList.remove("toggleOn")//turn off lighten
        buttonShading.classList.remove("toggleOn")//turn off darken
    setClear();
    setTimeout(()=>{
        buttonClear.classList.remove("toggleOn")//turn off clear
    },"100")
})

//Button toggle eraser
buttonEraser.addEventListener("click",()=>{
    if(buttonEraser.getAttribute("class")!="toggleOn"){
        buttonEraser.classList.add("toggleOn")//turn on eraser
    }else{
        buttonEraser.classList.remove("toggleOn")//turn off eraser
    }
})

//Button toggle Rainbow
buttonRainbow.addEventListener("click",()=>{
    if(buttonRainbow.getAttribute("class")!="toggleOn"){
        buttonRainbow.classList.add("toggleOn")//turn on rainbow
        buttonLighten.classList.remove("toggleOn")//turn off lighten
        buttonShading.classList.remove("toggleOn")//turn off darken
    }else{
        buttonRainbow.classList.remove("toggleOn")//turn off rainbow
    }
})

//Button toggle Shading
buttonShading.addEventListener("click",()=>{
    if(buttonShading.getAttribute("class")!="toggleOn"){
        buttonShading.classList.add("toggleOn")//turn on shading
        buttonLighten.classList.remove("toggleOn")//turn off lighten
        buttonRainbow.classList.remove("toggleOn")//turn off rainbow
        buttonEraser.classList.remove("toggleOn")//turn off eraser
    }else{
        buttonShading.classList.remove("toggleOn")//turn off shading
    }
})

//Button toggle Lighten
buttonLighten.addEventListener("click",()=>{
    if(buttonLighten.getAttribute("class")!="toggleOn"){
        buttonLighten.classList.add("toggleOn")//turn on lighten
        buttonShading.classList.remove("toggleOn")//turn off shading
        buttonRainbow.classList.remove("toggleOn")//turn off rainbow
        buttonEraser.classList.remove("toggleOn")//turn off eraser
    }else{
        buttonLighten.classList.remove("toggleOn")//turn off lighten
    }
})