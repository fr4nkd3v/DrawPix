// #region 1. VARIABLES DECLARATION

let currentColor = "black"; //Color seleccionado de la aplicacion

// Node Elements
const colorBlocks = document.querySelectorAll(".color"); // Bloques de color
const colorBlockActive = document.querySelector(".color.active"); // Bloque de Color activo
const gridSection = document.querySelector(".painterGrid"); // Grila pintable
const gridBlocks = document.querySelectorAll(".painterBlock"); // Cuadros de la Grilla pintable
const resetButton = document.getElementById("reset"); // Boton para resetear la Grilla
// #endregion

// #region 2. MAIN FUNCTIONS

// 2.1 Crea la grilla para pintar
const makeGrid = () => {
  // Hace doble for de 14 veces cada uno para crear una cuadricula de 14x14 cuadros
  for (let j = 0; j < 14; j++) {
    for (let i = 0; i < 14; i++) {
      //Se crea el cuadro, se le aplica su ID y clase y se añade al DOM
      blockGrid = document.createElement("div");
      blockGrid.id = `block-${j}-${i}`;
      blockGrid.className = "painterBlock";
      gridSection.appendChild(blockGrid);
    }
  }
};

// 2.2 Seleccionar un color para el pintado de cuadros
const setCurrentColor = (event) => {
  //toma el color del bloque que se hizo click y asignarlo a currentColor
  let element = event.target;
  currentColor = window
    .getComputedStyle(element, null)
    .getPropertyValue("background-color");

  //quita las clases de activo al bloque de color anterior y a su icono ✅
  colorBlockActive.classList.toggle("active");
  colorBlockActive.firstChild.classList.toggle("fa-check");

  //Le agrega el activo al bloque de color seleccionado y a su icono ✅
  element.classList.toggle("active");
  element.firstChild.classList.toggle("fa-check");
};

// 2.3 Pinta un cuadro de la grilla con el color actual seleccionado
const paintBlock = (event) => {
  let block = event.target;
  block.style.backgroundColor = currentColor;
};

// 2.4 Pinta todos los cuadros de la grilla con el color actual mientras arrastra el cursor sobre ellos
const paintBlockHover = (event) => {
  let block = event.target;
  // Si al pasar por encima de un cuadro se mantiene presionado el click izquierdo del mouse, pinta con el color actual
  if (event.buttons == 1) block.style.backgroundColor = currentColor;
};

// 2.5 Aplica el color blanco a todos los cuadros de la grilla
const gridReset = () => {
  gridBlocks.forEach((element) => (element.style.backgroundColor = "white"));
};
// #endregion

// #region 3. EVENTS LISTENERS
colorBlocks.forEach(
  (
    element // Al clickear un Bloque de Color
  ) => element.addEventListener("click", setCurrentColor)
);

gridBlocks.forEach((element) => {
  // Al clickear un Cuadro de la Grilla
  element.addEventListener("mousedown", paintBlock);
  element.addEventListener("mouseover", paintBlockHover);
});

resetButton.addEventListener("click", gridReset); // Al clickear el Boton de Reiniciar la Grilla
//#endregion

//#region 4. START APP

// 4.1 Renderizado de la Grilla
makeGrid();

//#endregion
