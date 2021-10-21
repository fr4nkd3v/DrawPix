// Variables Globales
let currentColor = "black";

// Funciones importantes
const makeGrid = () => {
  gridSection = document.querySelector(".painterGrid");

  for (let j = 0; j < 14; j++) {
    for (let i = 0; i < 14; i++) {
      blockGrid = document.createElement("div");
      blockGrid.id = `block-${j}-${i}`;
      blockGrid.className = "painterBlock";
      gridSection.appendChild(blockGrid);
    }
  }
};

const setCurrentColor = (event) => {
  //tomar el color del bloque que se hizo click y asignarlo a currentColor
  let element = event.target;
  currentColor = window
    .getComputedStyle(element, null)
    .getPropertyValue("background-color");

  //le quita el activo al elemento anterior
  const colorBlockActive = document.querySelector(".color.active");
  colorBlockActive.classList.toggle("active");
  colorBlockActive.firstChild.classList.toggle("fa-check");

  //Le agrega el activo al elemento de color seleccionado
  element.classList.toggle("active");
  element.firstChild.classList.toggle("fa-check");
};

const paintBlock = (event) => {
  let block = event.target;
  block.style.backgroundColor = currentColor;
};

const paintBlockHover = (event) => {
  let block = event.target;
  if (event.buttons == 1) block.style.backgroundColor = currentColor;
};

const gridReset = () => {
  blocks.forEach((element) => (element.style.backgroundColor = "white"));
};

//Renderizado de la Grilla
makeGrid();

// Asignación de funciones
const squaresColors = document.querySelectorAll(".color");
squaresColors.forEach((element) =>
  element.addEventListener("click", setCurrentColor)
);

const blocks = document.querySelectorAll(".painterBlock");
blocks.forEach((element) => {
  element.addEventListener("mousedown", paintBlock);
  element.addEventListener("mouseover", paintBlockHover);
});

const resetButton = document.getElementById("reset");
resetButton.addEventListener("click", gridReset);
