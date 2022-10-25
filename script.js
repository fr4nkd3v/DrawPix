// #region 1. VARIABLES

let currentColor; // Color seleccionado
let isPressed = false; // Opción que determina si se mantiene presionado el pincel
let isErasing = false; // Determina si se mantiene presionado el borrador
let width, height; // Ancho y alto del grid

// DOM Elements
const paletteColor = document.querySelectorAll(".color"); // Bloques de color
const paletteColorActive = document.querySelector(".color.active"); // Bloque de Color activo
const gridSection = document.querySelector(".paint-grid"); // Grila pintable
const wrapperCapture = document.querySelector(".wrapper-capture"); // Bloque que contiene la captura de la Grilla
let gridBlocks; // Cuadros de la Grilla pintable

// Grid Options
const inputWidth = document.querySelector('#width'); // Input del Ancho del grid
const inputHeight = document.querySelector('#height'); // Input del Alto del grid

const chbxPressed = document.querySelector("#pressed"); // Checkbox para mantener presionado el pincel
const chbxErasing = document.querySelector("#erase-cell"); // Checkbox para mantener presionado el borrador

const eraseAll = document.getElementById("erase-all"); // Boton para borrar la Grilla

const gridSaveBtn = document.getElementById("grid-save"); // Boton para guardar una imagen de la Grilla
const captureBtn = document.getElementById("capture"); // Boton para tomar una captura de la Grilla

// Capture Buttons
const zoomBtn = document.querySelector("#zoom"); // Boton para hacer zoom a la captura
const captureSaveBtn = document.querySelector("#capture-save"); // Boton para guardar la captura
const shareBtn = document.querySelector("#share"); // Boton para compartir la captura
const copyBtn = document.querySelector("#copy"); // Boton para copiar la captura al portapapeles

const closeBtn = document.querySelector("#close"); // Boton para cerrar el panel de la captura

// #endregion

// #region 2. FUNCTIONS

function startApp() {
  // 4.1 Renderizado de la Grilla
  makeGrid(14, 14);
  // 4.2 declaramos en variable los cuadros de la grilla
  gridBlocks = document.querySelectorAll(".painterBlock"); // Cuadros de la Grilla pintable
  
  // 4.3 Selecciona el color negro
  setCurrentColor("black", document.querySelector(".color.black"));

  chbxErasing.checked = false;
  chbxPressed.checked = false;
}

// 2.1 Crea la grilla para pintar
function makeGrid(w, h) {
  gridSection.innerHTML = '';
  // Hace doble for de 14 veces cada uno para crear una cuadricula de 14x14 cuadros
  for (let j = 0; j < w; j++) {
    for (let i = 0; i < h; i++) {
      //Se crea el cuadro, se le aplica su ID y clase y se añade al DOM
      let blockGrid = document.createElement("div");
      blockGrid.id = `block-${j}-${i}`;
      blockGrid.className = "painterBlock";

      // Al clickear un Cuadro de la Grilla
      blockGrid.addEventListener("mousedown", paintBlock);

      // Al pasar el cursor por encima de un Cuadro de la Grilla
      blockGrid.addEventListener("mouseenter", (e) => {
        paintBlockHover(e);
        clearBlockHover(e);
      });
      // Al empezar a arrastrar un Cuadro de la Grilla
      blockGrid.addEventListener("dragstart", (e) => e.preventDefault());

      gridSection.style.gridTemplateColumns = `repeat(${w}, 2.5em)`;
      gridSection.style.gridTemplateRows = `repeat(${h}, 2.5em)`;
      gridSection.appendChild(blockGrid);
    }
  }

  // const widthSelector = document.querySelectorAll(`.painterBlock:nth-child(${w}n)`);
  // widthSelector.forEach( element => {
  //   element.style.borderRight = '1px solid #99999999';
  // });

  // const heightSelector = document.querySelectorAll(`.painterBlock:nth-child(-n + ${h})`);
  // heightSelector.forEach(element => {
  //   element.style.borderRight = '1px solid #99999999';
  // });

  width = w; height = h;
  inputWidth.value = w; inputHeight.value = h;
  
}

// 2.2 Seleccionar un color para el pintado de cuadros
function setCurrentColor(color, element = null) {
  // Asigna el color del parámetro al color actual
  currentColor = color;

  //  Si realmente le han pasado un elemento nodo
  if (element !== null) {
    //Recorre todos los bloques de colores y les quita las clases de activo y a su icono ✅
    paletteColor.forEach((node) => {
      node.classList.remove("active");
      node.firstChild.classList.remove("fa-check");
    });

    //Le agrega el activo al bloque de color seleccionado y a su icono ✅
    element.classList.add("active");
    element.firstChild.classList.add("fa-check");
  }
}

// 2.3 Pinta un cuadro de la grilla con el color actual seleccionado
function paintBlock(event) {
  let block = event.target;
  block.style.backgroundColor = currentColor;
  block.classList.add("painted");
}

// 2.4 Pinta todos los cuadros de la grilla con el color actual mientras arrastra el cursor sobre ellos
function paintBlockHover(event) {
  let block = event.target;
  // Si al pasar por encima de un cuadro se mantiene presionado el click izquierdo del mouse, pinta con el color actual

  if (isPressed || event.buttons == 1) {
    block.style.backgroundColor = currentColor;
    block.classList.add("painted");
  }
}

function clearBlockHover({target}) {
  let block = target;

  if (isErasing) {
    block.style.setProperty('background-color', 'initial');
    block.classList.remove("painted");
  }
}

// 2.5 Aplica el color blanco a todos los cuadros de la grilla
function gridReset() {
  gridBlocks.forEach((element) => {
    element.style.backgroundColor = "initial";
    element.classList.remove("painted");
  });
}

// 2.6 Devuelve el background-color de un elemento
function getColor(element) {
  return window
    .getComputedStyle(element, null)
    .getPropertyValue("background-color");
}

// 2.7 Genera una captura de la Grilla
function getGridCapture() {
  if (wrapperCapture.firstChild) {
    wrapperCapture.firstElementChild.remove();
  }

  html2canvas(gridSection).then((canvas) => {
    wrapperCapture.appendChild(canvas);
  });
  wrapperCapture.parentNode.classList.toggle("visible");
}

// 2.8 Cierra el panel de la captura de la Grilla
function closeCapture() {
  wrapperCapture.parentNode.classList.toggle("visible");
}

// 2.9 Cambia el valor de isPressed
function switchIsPressed() {
  isPressed = isPressed === true ? false : true;

  if (isPressed){
    gridSection.classList.add("pressed");
    gridSection.classList.remove("erasing");
  } else {
    gridSection.classList.remove("pressed");
  }
  
  chbxErasing.checked = false;
  isErasing = false;
}
// Cambia el valor de isErasing
function switchIsErasing() {
  isErasing = isErasing === true ? false : true;

  if (isErasing) {
    gridSection.classList.add("erasing");
    gridSection.classList.remove("pressed");
  } else {
    gridSection.classList.remove("erasing");
  }

  chbxPressed.checked = false;
  isPressed = false;
}

function isValidNumber(value) {
  return Number.isInteger(value) ? true : false;
}

// #endregion

// #region 3. EVENTS LISTENERS

eventListeners();
function eventListeners() {

  // Al cargar el DOM
  document.addEventListener('DOMContentLoaded', startApp);
  
  paletteColor.forEach( (colorBlock) => {
    // Al clickear un Bloque de Color
    colorBlock.addEventListener( "click",
      () => setCurrentColor( getColor(colorBlock), colorBlock ) );
  } );

  // Al quitar el foco del input de ancho y alto
  inputWidth.addEventListener('focusout', (e) => {
    if (Number(e.target.value) !== width) {

      if (isValidNumber(Number(e.target.value)))
        makeGrid(Number(e.target.value), Number(inputHeight.value));
      else
        inputWidth.value = width;
    }
  });

  inputHeight.addEventListener('focusout', (e) => {
    if (Number(e.target.value) !== height) {

      if (isValidNumber(Number(e.target.value)))
        makeGrid(Number(inputWidth.value), Number(e.target.value));
      else
        inputHeight.value = height;
    }
  });

  // Al cambiar el valor del check del checkbox "Presionar"
  chbxPressed.addEventListener("change", switchIsPressed);

  chbxErasing.addEventListener("change", switchIsErasing)

  eraseAll.addEventListener("click", gridReset); // Al clickear el Boton de Reiniciar la Grilla

  // gridSaveBtn.addEventListener("click", getGridCapture); // Al clickear el Boton de Reiniciar la Grilla

  captureBtn.addEventListener("click", getGridCapture); // Al clickear el Boton de hacer una captura

  closeBtn.addEventListener("click", closeCapture); // Al clickear el Boton de cerrar el panel de Captura
}
//#endregion
