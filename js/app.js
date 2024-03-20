import { getColor, getId, isValidName, isValidNumber } from './utils.js';

// #region PRINCIPAL FUNCTIONS

// 1. Inicia la Aplicación
function startApp() {
  // 2 Establecemos el valor de los checkbox
  chbxPressedErase.checked = false;
  chbxPressedBrush.checked = false;

  // 3 Deshabilitamos la Paleta de Colores y la sección de config
  enableDisableElement(sectionSettings, false);
  enableDisableElement(divColorPalette, false);

  // 4 Lista los Lienzos guardados
  listDesigns();
  calculateElementsWidth();
}

function calculateElementsWidth() {
  const elements = document.querySelectorAll('.u-calcWidth');
  elements.forEach(element => {
    const widthValue = getComputedStyle(element).getPropertyValue('width')
    element.style.setProperty('--width', widthValue);
  })
}

// . Abre/Cierra CanvasBar
function openCloseCanvasBar() {
  // toggle classes CSS
  btnMenu.classList.toggle('is-active');
  sectionCanvasBar.classList.toggle('is-closed');

  const isNotClosed = !sectionCanvasBar.classList.contains('is-closed'); // is open?

  // Change Texts
  // sectionCanvasBar.querySelector('.WithoutDesigns-note').innerHTML =
  //   isNotClosed ? "Crea uno <span>Nuevo</span> aquí mismo :D" : "Crea uno<br/><span>Nuevo</span>";
  // sectionCanvasBar.querySelector('.WithoutDesigns-subtitle').innerHTML =
  //   isNotClosed ? "<p> AUN NO TIENES</p><p>LIENZOS</p>" : "<p>SIN</p><p>LIENZOS</p>";
}

// . Muestra/Oculta Welcome Container
// Recibe un boolean, si es true muestra el contenedor, si es false lo oculta
const showHideWelcomeContainer = (bool) => divWelcomeContainer.style.display = bool ? "block" : "none";

// . Muestra/Oculta la Grilla Principal de la App
// Recibe un boolean, si es true muestra el contenedor, si es false lo oculta
const showHideAppGrid = (bool) => sectionAppGrid.style.display = bool ? "flex" : "none";

// . Muestra/Oculta el Contenedor de Modales
function showHideModalContainer(bool) {
  // Resetea los valores
  inputModalHeight.value = "";
  inputModalWidth.value = "";

  if (bool) { // "Muestra"
    sectionModalContainer.classList.add("is-visible");
    inputModalWidth.focus();
  } else // "Oculta"
    sectionModalContainer.classList.remove("is-visible");
}

// . Habilitar/Deshabilitar un Elemento
// Genera un div a modo de muro que bloquea la interacción con el elemento
// Recibe un boolean, si es true "habilita" el elemento, si es false lo "deshabilita"
function enableDisableElement(element, bool) {

  if (bool) { // "Habilitar"

    const wall = element.querySelector(".Wall");
    if (wall) wall.remove();

  } else { // "Deshabilitar"

    // Si ya tiene un elemento Wall sale de la función
    const wallIsExists = element.querySelector(".Wall");
    if (wallIsExists) return;

    // Si no tiene algún posicionamiento le aplicamos relative
    let position = window.getComputedStyle(element, null).getPropertyValue("position");
    if (position === "static") element.style.position = "relative";
    
    // Creamos el div muro y lo agregamos
    const wall = document.createElement("div");
    wall.classList.add("Wall");
    element.appendChild(wall);
  }
}

// . Muestra/Oculta el ContextMenu de Diseños
function showHideContextMenu(bool, coords = { y: 0, x: 0 }) {
  if (bool) { // "Mostrar" y lo ubica en pantalla
    contextMenu.classList.remove("is-hidden");
    contextMenu.style.top = `${coords.y}px`;
    contextMenu.style.left = `${coords.x}px`;
  } else { // "Ocultar"
    contextMenu.classList.add("is-hidden");
    contextMenu.style.top = "0px";
    contextMenu.style.left = "0px";
  }
}

// . Crea una instancia de un nuevo Diseño y lo agrega a la lista
function createDesign(objArgs) {

  let { id, name, width, height, html } = objArgs; // 1 Destructuring

  // 2 Asigna valores por defecto
  if (!id) id = getId();
  if (!name) name = "Sin título";
  if (!width) width = 14;
  if (!height) height = 14;
  if (!html) html = sectionAppGrid.innerHTML;

  // 3 Instancia nuevo Diseño y lo agrega a la lista
  const design = new Design(id, name, width, height, html);
  App.addDesign(design);

  // 4 seleccionar la key del diseño actual
  App.selectedDesignKey = id;

  // 5 Lista los diseños
  listDesigns();
}

// . Genera la Grilla
// Recibe los parámetros de ancho y alto
function generateGrid(width, height) {
  sectionAppGrid.innerHTML = ''; // 1 Elimina los elementos HTML del Lienzo

  // 2 Genera el elemento que envuelve la Grilla
  const wrapperGrid = document.createElement("div");
  wrapperGrid.classList.add("AppGrid-wrapper");
  sectionAppGrid.appendChild(wrapperGrid);

  // 3 Recorre dos bucles para crear los BLOQUES del Lienzo
  // Las iteraciones de cada bucle se definen por el ancho y alto pasados en argumentos
  for (let j = 0; j < width; j++) {
    for (let i = 0; i < height; i++) {
      // 4 Se crea el elemento BLoque con id, clase y se inserta en el DOM
      const blockGrid = document.createElement('div');
      blockGrid.id = `block-${j}-${i}`;
      blockGrid.classList.add('AppGrid-block');

      wrapperGrid.appendChild(blockGrid);
    }
  }
  
  // 4 Definimos el valor de las columnas y filas para los estilos grid
  // Extendemos el ancho y alto de contenedor
  wrapperGrid.style.setProperty("width", "100%");
  wrapperGrid.style.setProperty("height", "100%");
  let lengthBlock = "";

  const getBlockWidth = () => {
    // Entonces el width será de 1fr para calcular su ancho
    wrapperGrid.style.setProperty('grid-template-columns', `repeat(${width}, 1fr)`);
    wrapperGrid.style.setProperty('grid-template-rows', `repeat(${height}, 1px)`);
    
    // Obtener el ancho de un bloque
    const block = document.querySelector(".AppGrid-block");
    lengthBlock = window.getComputedStyle(block, null).getPropertyValue("width");
  }

  const getBlockHeight = () => {
    // Entonces el height será de 1fr para calcular su alto
    wrapperGrid.style.setProperty('grid-template-rows', `repeat(${height}, 1fr)`);
    wrapperGrid.style.setProperty('grid-template-columns', `repeat(${width}, 1px)`);

    // Obtener el alto de un bloque
    const block = document.querySelector(".AppGrid-block");
    lengthBlock = window.getComputedStyle(block, null).getPropertyValue("height");
  }

  // Dependiendo del alto o ancho de la grilla y del contenedor se rellenan las columnas o filas y obtenemos la longitud
  appGridHeight = Number(window.getComputedStyle(sectionAppGrid, null).getPropertyValue("height").slice(0, -2));
  appGridWidth = Number(window.getComputedStyle(sectionAppGrid, null).getPropertyValue("width").slice(0, -2));

  if (appGridHeight > appGridWidth) getBlockWidth()
    else
  if (appGridHeight < appGridWidth) getBlockHeight()
    else
  if (appGridHeight === appGridWidth) {
    if (width > height || width === height) getBlockWidth();
    else if (height > width) getBlockHeight();
  }

  // 
  wrapperGrid.style.setProperty('grid-template-rows', `repeat(${height}, ${lengthBlock})`);
  wrapperGrid.style.setProperty('grid-template-columns', `repeat(${width}, ${lengthBlock})`);

  wrapperGrid.style.setProperty("width", "auto");
  wrapperGrid.style.setProperty("height", "auto");

  // 5 Establece el color seleccionado en negro y resetea el valor del input color
  setCurrentColor("black", document.querySelector(".ColorPalette-color.u-black"));
  inputColorPicker.value = "";

  // 6 Habilita Paleta de colores y Sección Config
  enableDisableElement(sectionSettings, true);
  enableDisableElement(divColorPalette, true);

  // 7 Establece el valor de los input width y height
  // inputGridWidth.value = width;
  // inputGridHeight.value = height;
}

// 3 Carga la lista de lienzos guardados
function listDesigns() {

  // 1 Elimina los diseños que puedan haber en la Lista
  divDesignsList.innerHTML = "";

  // 2 Si no tiene ningún diseño guardado
  if (!Object.keys(App.designs).length) {
    // Muestro el elemento "sin lienzos" y salgo de la función
    divWithoutDesigns.style.setProperty('display', 'flex');
    return;
  }

  // 3 Si tiene diseños guardados
  for (const key in App.designs) {

    // 3 Crea el elemento del diseño con clase y sub-elementos
    const elementDesign = document.createElement('div');
    elementDesign.classList.add('DesignsList-design');

    // 4 Si hay un diseño seleccionado aplica las clases correspondientes
    if (key === App.selectedDesignKey)
      elementDesign.classList.add('is-selected');

    // 5 Agrega estructura y data-key    
    elementDesign.dataset.key = key;
    elementDesign.innerHTML =
    `<svg class="DesignsList-designIcon">
      <use xlink:href="./assets/design-icon.svg#icon" />
    </svg>
    <div class="DesignsList-designIndicator"></div>
    <span class="DesignsList-designName">${App.designs[key].name}</span>
    <div class="DesignsList-designMenu">
      <div></div><div></div><div></div>
    </div>`;

    // 6 Si el html es el mismo al de la grilla aplica clases al Indicador
    const isHtmlEquals = (App.designs[key].html === sectionAppGrid.innerHTML);
    elementDesign.querySelector(".DesignsList-designIndicator")
      .classList.add(isHtmlEquals ? "is-saved" : "is-notSaved")
    
    // 7 Agrego el lienzo a la Lista
    divDesignsList.appendChild(elementDesign);
  }
  
  // 8 Oculto el elemento "sin lienzos"
  divWithoutDesigns.style.setProperty('display', 'none');
}

// 4 Seleccionar un color para el pintado de cuadros
function setCurrentColor(color, element) {
  // 1 Asigna el color del parámetro al color actual
  App.selectedColor = color;

  // 2 Si no le pasaron un elemento cierra la función
  if (element === undefined) return;

  // 3 Retira la clase active a quien la tenga
  const oldColor = document.querySelector('.ColorPalette-color.is-active');
  if (oldColor) oldColor.classList.remove("is-active");
  
  // 4 Agrega la clase active al bloque de color seleccionado
  element.classList.add("is-active");
}

// . Aplica los estilos de diseño no guardado
function setSavedUnsavedDesign(bool) {

  // 1 Obtiene el indicador del elemento del diseño seleccionado
  const indicator = document.querySelector(".DesignsList-design.is-selected .DesignsList-designIndicator");
  if (!indicator) return; // Si el elemento no existe sale de la función
  
  // 2 Si es true aplica estilos de Guardado
  // Si es false aplica estilos de NO-Guardado
  const addClass = bool ? "is-saved" : "is-notSaved";
  const removeClass = bool ? "is-notSaved" : "is-saved";

  // 3 Elimina la clase a remover y agrega la clase a añadir
  indicator.classList.remove(removeClass);
  indicator.classList.add(addClass);
}

// 5 Pinta un cuadro de la grilla con el color actual seleccionado
function paintBlock(element) {
  // 1 Cambia el color del elemento
  element.style.setProperty('background-color', App.selectedColor);
  element.classList.add("painted");

  setSavedUnsavedDesign(false);
}

// 6 Pinta o Limpia un cuadro de la grilla en HOVER
function blockHover(element, evtButton) {
  
  // 1 Si está presionando el pincel ó si mantiene presionado el click derecho
  // Pinta con el color actual
  if (App.isBrushPressed || evtButton == 1) {
    element.style.setProperty("background-color", App.selectedColor);
    element.classList.add("painted");

    setSavedUnsavedDesign(false);

  // 2 Si está presionando el borrador pinta con el color actual
  } else if (App.isEraserPressed) {
    element.style.setProperty('background-color', 'initial');
    element.classList.remove("painted");

    setSavedUnsavedDesign(false);
  }
}

// 7 Limpia todos los cuadros de la grilla
function resetGrid() {
  const gridBlocks = document.querySelectorAll(".AppGrid-block");
  gridBlocks.forEach((element) => {
    element.style.backgroundColor = "initial";
    element.classList.remove("painted");
  });
}

// 8 Genera una captura de la Grilla
// function getGridCapture() {
//   // 1 SI ya existe una captura se elimina
//   if (wrapperCapture.firstChild)
//     wrapperCapture.firstElementChild.remove();

//   // 2 Reseteamos la sombra porque genera resultados inesperados con la captura
//   sectionAppGrid.style.setProperty('box-shadow', 'initial');

//   // 3
//   html2canvas(sectionAppGrid).then((canvas) => {
//     wrapperCapture.appendChild(canvas);
//   });
//   sectionModalContainer.classList.toggle("visible");
//   articleCaptureModal.classList.add("visible");

//   // 4 
//   sectionAppGrid.style.setProperty('box-shadow', '0 0 50px 10px rgba(0, 0, 0, .5)');
// }

// 9 Cambia el valor de isPressed
function switchIsBrushPressed(bool = null) {
  if (bool === null) return; // 1 Si no indicaron el valor sale de la funcion

  // 2 Aplica cambios dependiendo de su valor
  if (bool) {
    // Cambio en las propiedades
    App.isBrushPressed = true;
    App.isEraserPressed = false;

    // Cambios en el grid
    sectionAppGrid.classList.add("is-brushPressed");
    sectionAppGrid.classList.remove("is-eraserPressed");

    // Cambios en checkbox
    chbxPressedBrush.checked = true;
    chbxPressedErase.checked = false;

  } else {
    App.isBrushPressed = false; // Cambio en la propiedad
    sectionAppGrid.classList.remove("is-brushPressed"); // Cambios en el grid
    chbxPressedBrush.checked = false; // Cambios en checkbox
  }
}

// 10 Cambia el valor de isErasing
function switchIsEraserPressed(bool = null) {
  if (bool === null) return; // Si no indicaron el valor sale de la funcion

  // 1 Aplica cambios dependiendo de su valor
  if (bool) {
    // Cambio en las propiedades
    App.isEraserPressed = true;
    App.isBrushPressed = false;

    // Cambios en el grid
    sectionAppGrid.classList.add("is-eraserPressed");
    sectionAppGrid.classList.remove("is-brushPressed");

    // Cambios en checkbox
    chbxPressedErase.checked = true;
    chbxPressedBrush.checked = false;

  } else {
    App.isEraserPressed = false; // Cambio en la propiedad
    sectionAppGrid.classList.remove("is-eraserPressed"); // Cambios en el grid
    chbxPressedErase.checked = false; // Cambios en checkbox
  }
  
}

// 11 Crea un elemento de color en la paleta de colores
// Recibe como argumento un color
function createColor(strColor) {
  
  // 1 Crea el elemento con su clase, backgroundColor y su eventListener
  const elementColor = document.createElement("div");
  elementColor.classList.add("ColorPalette-color");
  elementColor.style.setProperty("background-color", strColor);
  
  // 2 Inserta su icono interno
  elementColor.innerHTML =
    `<svg class="ColorPalette-icon"><use xlink:href="./assets/check-icon.svg#icon"></use></svg>`;
  
  
  // 3 Inserta el elemento en el DOM
  divColorPalette.appendChild(elementColor);

  // VALIDACION:
  // Si la paleta ya tiene 40 elementos o más
  // entonces se agregará el color,
  // pero se elimina el primer color ingresado por el usuario
  if (divColorPalette.childElementCount >= 40)
    divColorPalette.children[14].remove();
}

// Guarda el Diseño Seleccionado
function saveDesign() {
  // 1 Valida si existe un elemento seleccionado
  const selectedDesign = document.querySelector(".DesignsList-design.is-selected");
  if (!selectedDesign) return; // Si no existe sale de la función

  // 2 Guardar el html del grid en la variable que tiene el objeto del diseño seleccionado
  const key = selectedDesign.dataset.key;
  App.designs[key].html = sectionAppGrid.innerHTML

  // 3 Aplica los estilos de guardado
  setSavedUnsavedDesign(true);
}



// Handle Functions
function handlerFocusoutInputWith({ target: { value } }) {
  // VALIDACION:
  // Si el numero es invalido, cambia su valor y sale de la función
  if (!isValidNumber(Number(value))) {
    inputGridWidth.value = App.width;
    return;
  }

  // 1 Si el valor del input y el ancho de la config son diferentes
  // Rehace el lienzo con los nuevos valores
  if (Number(value) !== App.width)
    generateGrid(Number(value), Number(inputGridHeight.value));
}

function handlerFocusoutInputHeight({ target: { value } }) {
  // VALIDACION:
  // Si el numero es invalido, cambia su valor y sale de la función
  if (!isValidNumber(Number(value))) {
    inputGridHeight.value = App.height;
    return;
  }

  // 2 Si el valor del input y el ancho de la config son diferentes
  // Rehace el lienzo con los nuevos valores
  if (Number(value) !== App.height)
    generateGrid(Number(inputGridWidth.value), Number(value));
}

function handlerKeydownDocument(evt) {
  if (evt.key === 'Control') switchIsBrushPressed(true);
  if (evt.key === 'Shift') switchIsEraserPressed(true);
}

function handlerKeyupDocument(evt) {
  if (evt.key === 'Control') switchIsBrushPressed(false);
  if (evt.key === 'Shift') switchIsEraserPressed(false);
}

function handlerClickColor(evt) {
  // 1 Busca el ancestro mas cercano al elemento .color
  const nodeColor = evt.target.closest('#ColorPalette > .ColorPalette-color');
  if (!nodeColor) return; // 2 Si no lo encontró sale de la función

  // 3 Establecemos el color
  setCurrentColor(getColor(nodeColor), nodeColor);
}

function handlerClickWelcomeOptions(evt) {
  const template = evt.target.closest(".WelcomeContainer-template");
  
  if (!template) return;

  if (template.id === "CustomTemplate") {
    showHideModalContainer(true);
    return;
  }
  
  const {width, height} = template.dataset;

  showHideWelcomeContainer(false); // Oculta sección de Bienvenida
  showHideAppGrid(true); // Muestra la Grilla de la App

  generateGrid(width, height); // Crea una grilla
  createDesign({ width, height }); // Crea el diseño y lo guarda
}

function handlerInputNumber() {
  const newText = this.value.replace(/\D/g, "");
  this.value = newText;
}

// #endregion

// #region 3. EVENTS LISTENERS

eventListeners();
function eventListeners() {

  document.addEventListener('DOMContentLoaded', startApp);

  // al dar CLICK el Boton para mostrar la Barra de Diseños
  btnMenu.addEventListener('click', openCloseCanvasBar);

  // al dar CLICK la sección de Bienvenida
  divWelcomeOptions.addEventListener("click", handlerClickWelcomeOptions);
  
  // al dar CLICK en un COLOR (Event Delegation)
  divColorPalette.addEventListener('click', handlerClickColor);

  // al dar PRESIONAR el mouse sobre un BLOQUE del Lienzo (Event Delegation)
  sectionAppGrid.addEventListener("mousedown", ({ target }) => {
    // 1 Valida si hay un elemento bloque ascendente
    const block = target.closest('#AppGrid .AppGrid-block');
    if (!block) return; // Si no lo hay sale de la funcion

    paintBlock(block);
  });
  // al APARECER encima de un BLOQUE del Lienzo (Event Delegation)
  sectionAppGrid.addEventListener("mouseover", ({ target }) => {
    // 1 Valida si hay un elemento bloque ascendente
    const block = target.closest('#AppGrid .AppGrid-block');
    if (!block) return; // Si no lo hay sale de la funcion

    blockHover(block, event.buttons);
  });

  // al ARRASTRAR un BLOQUE del Lienzo
  sectionAppGrid.addEventListener("dragstart", (e) => e.preventDefault());

  // al PRESIONAR UNA TECLA en el documento
  document.addEventListener("keydown", handlerKeydownDocument);

  // al SOLTAR UNA TECLA en el documento
  document.addEventListener("keyup", handlerKeyupDocument);
  
  // al CAMBIAR EL VALOR del Input color
  inputColorPicker.addEventListener('change', (evt) => createColor(evt.target.value) );

  // // al QUITAR EL FOCO del input de ancho y alto
  // inputGridWidth.addEventListener('focusout', handlerFocusoutInputWith);
  // inputGridHeight.addEventListener('focusout', handlerFocusoutInputHeight);

  // Evento Change -> checkbox "Presionar Brocha" y "Presionar Borrador"
  chbxPressedBrush.addEventListener("change", (evt) => switchIsBrushPressed(evt.target.checked));
  chbxPressedErase.addEventListener("change", (evt) => switchIsEraserPressed(evt.target.checked));

  // al dar CLICK el Boton de REINICIAR LA GRILLA
  btnEraseGrid.addEventListener("click", resetGrid);
  
  // // al dar CLICK el Boton de HACER CAPTURA
  // btnCaptureDesign.addEventListener("click", getGridCapture);
  
  // al dar CLICK el Boton GUARDAR
  btnSaveDesign.addEventListener("click", saveDesign);

  // Evento Click -> Boton de Nuevo Diseño
  btnNewDesign.addEventListener("click", () => showHideModalContainer(true) );

  // Evento Input -> Input del Modal - Ancho y Alto del Diseño
  inputModalWidth.addEventListener("input", handlerInputNumber);
  inputModalHeight.addEventListener("input", handlerInputNumber);

  // Evento Click -> Boton Generar Diseño personalizado
  btnGenerateCustomDesign.addEventListener("click", function() {
    // 1 tomamos los valores de los input
    const width = inputModalWidth.value;
    const height = inputModalHeight.value;

    // 2 Si falta algún valor sale de la función
    if ( width === "" || height === "") {
      divErrorMessageModal.textContent = "Los campos no pueden estar vacíos";
      return;
    }
    
    if (width > 50 || height > 50) {
      divErrorMessageModal.textContent = "Los lienzos sólo pueden tener un ancho y alto máximo de 50";
      return;
    }
    divErrorMessageModal.textContent = ""; // Resetea el mensaje

    // 4 Oculta el Modal y Bienvenida, muestra la Grilla
    showHideWelcomeContainer(false);
    showHideAppGrid(true);
    
    // 3 Genera la Grilla y crea el diseño
    generateGrid(width, height);
    createDesign({ width, height });

    showHideModalContainer(false);
  });

  // Evento Click -> boton para cerrar al Container Modal
  sectionModalContainer.addEventListener("click", function(evt) {
    // 1 Busca el elemento de botón ancestro mas cercano
    const btnCloseModal = evt.target.closest(".Modal-closeButton");

    if (!btnCloseModal) return; // Si no existe sale de la función

    // Ocultamos al Modal Container
    showHideModalContainer(false);
  });

  // Evento click -> ContextMenu de Diseños
  divDesignsList.addEventListener("click", function(evt) {

    // 1 Busca el elemento de Menu de diseño y el elemento de diseño mas cercano
    const menuElement = evt.target.closest(".DesignsList-designMenu");
    const designElement = evt.target.closest(".DesignsList-design");
    
    if (menuElement) { // Click -> ContextMenu de Diseños

      // 2 Muestra el ContextMenu y lo ubica en pantalla
      showHideContextMenu(true, {y: evt.y, x: evt.x});
      // 3 Le brinda el valor de la key del diseño que dió click
      contextMenu.dataset.key = designElement.dataset.key;
      contextMenu.focus(); // 4 Le da el foco

    } else
    if (designElement) { // Click -> Elemento del Diseño

      // 2 Si este diseño ya está seleccionado sale de la función
      if (designElement.classList.contains("is-selected")) return;
      
      // 4 Muestra el diseño en pantalla
      const key = designElement.dataset.key;
      sectionAppGrid.innerHTML = App.designs[key].html;
      
      // 3 Quita la clase de selección al diseño anterior y la aplica al actual
      const oldSelected = divDesignsList.querySelector(".is-selected");
      if (oldSelected) oldSelected.classList.remove("is-selected");
      designElement.classList.add("is-selected");

      // 5 Guarda la key del diseño actual seleccionado
      App.selectedDesignKey = key;
    }
    
  });

  // Evento Blur -> ContextMenu de Diseños
  contextMenu.addEventListener("blur", () => showHideContextMenu(false) );

  // Evento Click -> Boton Renombrar Diseños
  btnRenameDesign.addEventListener("click", function() {
    // 1 Referencia al diseño actual
    const key = contextMenu.dataset.key;
    const currentDesign = divDesignsList.querySelector(`[data-key="${key}"]`);

    // 2 Habilita la edición del nombre de diseño
    const nameDesign = currentDesign.querySelector(".DesignsList-designName");
    nameDesign.dataset.oldname = nameDesign.textContent;
    nameDesign.setAttribute("contenteditable", "true");

    // 3 Maneja el evento en línea blur para quitar la edición
    nameDesign.onblur = () => nameDesign.setAttribute("contenteditable", "false");

    // 4 Maneja el evento en línea keyDown
    nameDesign.onkeydown = (evt) => {
      
      // 1 Si no presionó "enter" ni "escape" sale de la funcion
      if (evt.keyCode !== 13 && evt.keyCode !== 27) return; // key "Enter" - "Escape"

      // 2 Si presionó "Escape"
      if (evt.keyCode === 27) { // key "Escape"

        nameDesign.textContent = nameDesign.dataset.oldname; // Restaura el nombre anterior

        // Deja el foco, deshabilita la edición y retira el attributo de nombre anterior
        nameDesign.blur();
        nameDesign.setAttribute("contenteditable", "false");
        nameDesign.removeAttribute("data-oldname");
        return;
      }

      // 3 Si presionó "Enter"

      // Evita el salto de línea y cambia el nombre del Diseño
      evt.preventDefault();
      App.renameDesign(key, nameDesign.textContent);

      // Deja el foco, deshabilita la edición y retira el attributo de nombre anterior
      nameDesign.blur();
      nameDesign.setAttribute("contenteditable", "false");
      nameDesign.removeAttribute("data-oldname");
    };

    // 5 Oculta el Context Menu y da el foco al texto
    showHideContextMenu(false);
    nameDesign.focus();
  });
}
//#endregion
