// #region 1. VARIABLES DECLARATION

let currentColor; //Color seleccionado de la aplicacion

// Node Elements
const colorBlocks = document.querySelectorAll(".color"); // Bloques de color
const colorBlockActive = document.querySelector(".color.active"); // Bloque de Color activo
const gridSection = document.querySelector(".painterGrid"); // Grila pintable
const resetButton = document.getElementById("reset"); // Boton para resetear la Grilla
// #endregion

// #region 2. MAIN FUNCTIONS

// 2.1 Crea la grilla para pintar
function makeGrid() {
  // Hace doble for de 14 veces cada uno para crear una cuadricula de 14x14 cuadros
  for (let j = 0; j < 14; j++) {
    for (let i = 0; i < 14; i++) {
      //Se crea el cuadro, se le aplica su ID y clase y se añade al DOM
      let blockGrid = document.createElement("div");
      blockGrid.id = `block-${j}-${i}`;
      blockGrid.className = "painterBlock";
      gridSection.appendChild(blockGrid);
    }
  }
}

// 2.2 Seleccionar un color para el pintado de cuadros
function setCurrentColor(color, element = null) {
  // Asigna el color del parámetro al color actual
  currentColor = color;

  //  Si realmente le han pasado un elemento nodo
  if (element !== null) {
    //Recorre todos los bloques de colores y les quita las clases de activo y a su icono ✅
    colorBlocks.forEach((node) => {
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
  if (event.buttons == 1) {
    block.style.backgroundColor = currentColor;
    block.classList.add("painted");
  }
}

// 2.5 Aplica el color blanco a todos los cuadros de la grilla
function gridReset() {
  gridBlocks.forEach((element) => {
    element.style.backgroundColor = "transparent";
    element.classList.remove("painted");
  });
}

// 2.6 Devuelve el background-color de un elemento
function getColor(element) {
  return window
    .getComputedStyle(element, null)
    .getPropertyValue("background-color");
}

// #endregion

// #region 3. EVENTS LISTENERS

function addEventsListener() {
  // Al clickear un Bloque de Color
  // prettier-ignore
  colorBlocks.forEach(
    (element) => element.addEventListener( "click",
      () => setCurrentColor( getColor(element), element ) )
  );

  gridBlocks.forEach((element) => {
    // Al clickear un Cuadro de la Grilla
    element.addEventListener("mousedown", paintBlock);
    // Al pasar el cursor por encima de un Cuadro de la Grilla
    element.addEventListener("mouseover", paintBlockHover);
    // Al empezar a arrastrar un Cuadro de la Grilla
    element.addEventListener("dragstart", (e) => e.preventDefault());
  });

  resetButton.addEventListener("click", gridReset); // Al clickear el Boton de Reiniciar la Grilla
}
//#endregion

//#region 4. START APP

// 4.1 Renderizado de la Grilla
makeGrid();
// 4.2 declaramos en variable los cuadros de la grilla
const gridBlocks = document.querySelectorAll(".painterBlock"); // Cuadros de la Grilla pintable
// 4.3 Agrega los Events Listener
addEventsListener();
// 4.4 Selecciona el color negro
setCurrentColor("black", document.querySelector(".color.black"));

//#endregion
