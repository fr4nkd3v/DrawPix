
// 1. APP SETTING VALUES
const App = {
  selectedColor: null, // (String) Color seleccionado
  isBrushPressed: null, // (Bollean) Determina si se mantiene presionado el pincel
  isEraserPressed: null, // (Bollean) Determina si se mantiene presionado el borrador

  designs: {}, // (Array) tendrá los HTML de lienzos guardados
  selectedDesignKey: null, // Lienzo actual o seleccionado, tiene la KEY de la propiedad "designs"

  // Añade un objeto con la estructura de diseño definida a la key designs
  addDesign: (designObj) => App.designs[designObj.id] = designObj,
  renameDesign: (designKey, designName) => App.designs[designKey].name = designName
};

// Object Constructor para los Diseños
function Design(id, name, width, height, html) {
  this.id = id;
  this.name = name;
  this.width = width;
  this.height = height;
  this.html = html;
}

// 2. DOM ELEMENTS

// -> Header
const btnMenu = document.querySelector("#Menu");

// -> CanvasBar
const sectionCanvasBar = document.querySelector("#CanvasBar");
const divDesignsList = document.querySelector("#DesignsList");
const divWithoutDesigns = document.querySelector("#WithoutDesigns");
const btnNewDesign = document.querySelector("#NewDesign");

// -> ColorPalette
const divColorPalette = document.querySelector("#ColorPalette");
const divColors = document.querySelectorAll(".ColorPalette-color");
const inputColorPicker = document.querySelector("#ColorPicker-input");

// -> AppGrid
const sectionAppGrid = document.querySelector("#AppGrid");

// -> WelcomeContainer
const divWelcomeContainer = document.querySelector("#WelcomeContainer");
const divWelcomeOptions = document.querySelector("#WelcomeContainer .WelcomeContainer-body");

// -> Settings
const sectionSettings = document.querySelector("#Settings");
// Input del Ancho y del Alto del grid
const inputGridWidth = document.querySelector("#GridWidth"); 
const inputGridHeight = document.querySelector("#GridHeight");
// Checkbox - Presionar Pincel
const chbxPressedBrush = document.querySelector("#PressedBrush");
// Checkbox - Presionar Borrador
const chbxPressedErase = document.querySelector("#PressedErase");
// Boton - Borrar todos los cuadros de la Grilla
const btnEraseGrid = document.querySelector("#EraseGrid");
// Boton - Tomar Captura del Diseño
const btnCaptureDesign = document.querySelector("#CaptureDesign");
// Boton - Guardar Diseño
const btnSaveDesign = document.querySelector("#SaveDesign");


// -> ModalContainer
const sectionModalContainer = document.querySelector("#ModalContainer");

const inputModalWidth = document.querySelector("#ModalGridWidth");
const inputModalHeight = document.querySelector("#ModalGridHeight");

const btnGenerateCustomDesign = document.querySelector("#generateCustomDesign");

const articleCaptureModal = document.querySelector("#CaptureModal");
const articleSaveNameModal = document.querySelector("#SaveNameModal");

const divErrorMessageModal = document.querySelector("#ModalErrorMessage");

// -> DesignsContextMenu
const contextMenu = document.querySelector("#DesignsContextMenu");

const btnRenameDesign = document.querySelector("#RenameDesign");


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