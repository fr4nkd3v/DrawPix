
// 1. VALORES de CONFIGURACION de la APP
const appSettings = {
  width: 14,  // (Number) Ancho del lienzo
  height: 14, //  (Number) Alto del lienzo
  currentColor: null, // (String) Color seleccionado
  isPressed: null, // (Bollean) Determina si se mantiene presionado el pincel
  isErasing: null, // (Bollean) Determina si se mantiene presionado el borrador
  designs: {}, // (Array) tendrá los elementos de lienzos guardados
  currentDesign: null // Lienzo actual o seleccionado, tiene la KEY de la propiedad "designs"
};

// DOM Elements

// Boton de la Barra de Diseños
const btnDesignsbar = document.querySelector(".btn-designsbar");
// Barra de Diseños
const designsSection = document.querySelector(".my-designs");
const designsList = document.querySelector(".my-designs .content");
const divAnyDesigns = document.querySelector(".any-designs");


// 2. LIENZO y PALETA de Colores
const colorPalette = document.querySelector(".color-palette");

const divColors = document.querySelectorAll(".color"); // Array de Bloques de color

const inputColor = document.querySelector('.color-palette input[type="color"]'); // Input del Color
const gridSection = document.querySelector(".paint-grid"); // Grila pintable


// 3. ELEMENTOS de las OPCIONES de la APP

// Input del Ancho y del Alto del grid
const inputWidth = document.querySelector('#width'); 
const inputHeight = document.querySelector('#height');
// Checkbox para mantener presionado el pincel
const chbxPressed = document.querySelector("#pressed");
// Checkbox para mantener presionado el borrador
const chbxErasing = document.querySelector("#erase-cell");
// Boton para borrar la Grilla
const btnEraseAll = document.getElementById("erase-all");
// Boton para guardar una imagen de la Grilla
const btnSave = document.getElementById("save");
// Boton para tomar una captura de la Grilla
const btnCapture = document.getElementById("capture");



const modalContainer = document.querySelector(".modal-container");
const modalCapture = document.querySelector(".capture-modal");
const modalSaveName = document.querySelector(".save-name-modal");


// 4. ELEMENTOS relacionados a la CAPTURA del LIENZO

// Bloque que contendrá la captura de la Grilla
const wrapperCapture = document.querySelector(".wrapper-capture");
// Capture Buttons
const btnZoom = document.querySelector("#zoom"); // Boton - Hacer zoom a la captura
const btnCaptureSave = document.querySelector("#capture-save"); // Boton - Guardar la captura
const btnShare = document.querySelector("#share"); // Boton - Compartir la captura
const btnCopy = document.querySelector("#copy"); // Boton - Copiar la captura al portapapeles

const btnCloseCapture = document.querySelector("#close"); // Boton para cerrar el panel de la captura

// Input - Confirmar Nombre
const inputNameDesign = document.querySelector('#name-design');

// Boton - Confirmar Guardado
const btnSaveConfirm = document.querySelector("#save-confirm");

// #endregion