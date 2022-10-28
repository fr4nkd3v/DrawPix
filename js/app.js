
// #region PRINCIPAL FUNCTIONS

// 1 Inicia la Aplicación
function startApp() {
  
  // 1 Renderizado de la Grilla tomando ancho x alto
  makeGrid(appSettings.width, appSettings.height);

  // 2 Establece el color seleccionado en negro
  setCurrentColor("black", document.querySelector(".color.black"));

  // 3 Establecemos el valor de los checkbox
  chbxErasing.checked = false;
  chbxPressed.checked = false;

  // 4 Lista los Lienzos guardados
  updateDesignsList();
}

// 2 Crea el Lienzo (Grilla)
function makeGrid(w, h) {
  gridSection.innerHTML = ''; // 1 Elimina los elementos HTML del Lienzo

  // 2 Recorre dos bucles para crear los BLOQUES del Lienzo
  // Las itereaciones de cada bucle se definen por el ancho y alto en la variable appSettings
  for (let j = 0; j < w; j++) {
    for (let i = 0; i < h; i++) {
      // 3 Se crea el BLOQUE con id, clase y se inserta en el DOM
      const blockGrid = document.createElement('div');
      blockGrid.id = `block-${j}-${i}`;
      blockGrid.classList.add('painter-block');

      gridSection.style.setProperty('grid-template-columns', `repeat(${w}, 2.5em)`);
      gridSection.style.setProperty('grid-template-rows', `repeat(${h}, 2.5em)`);
      gridSection.appendChild(blockGrid);
    }
  }
  // 4 Establecemos el valor de los input alto - ancho
  inputWidth.value = w; inputHeight.value = h;
}

// 3 Carga la lista de lienzos guardados
function updateDesignsList() {
  // Función Local Para agregar el Boton de "Nuevo Lienzo"
  const insertBtnNewDesign = () => {
    const newDesign = document.createElement('div');
    newDesign.classList.add('new-design');
    newDesign.innerHTML = '<i class="fas fa-plus"></i><span>NUEVO LIENZO</span>';
    designsList.appendChild(newDesign);
  }
  // 1 Elimina los Lienzos que puedan haber en la Lista
  const designs = document.querySelectorAll('.my-designs .content > .design');
  designs.forEach( design => design.remove() );
  const btnNew = document.querySelector('.my-designs .content > .new-design');
  if (btnNew) btnNew.remove();

  // 2 Si no tiene ningún lienzo guardado
  if (!Object.keys(appSettings.designs).length) {
    // Muestro el elemento "sin lienzos" y salgo de la función
    divAnyDesigns.style.setProperty('display', 'flex');
    insertBtnNewDesign(); // Agrega el boton de Nuevo Lienzo
    return;
  }

  // 3 Si tiene lienzos guardados
  for (const key in appSettings.designs) {
    // 3 Crea el elemento del lienzo con clase, eventListener y subelementos
    const nodeDesign = document.createElement('div');
    nodeDesign.classList.add('design');

    if (key === appSettings.currentDesign)
      nodeDesign.classList.add('selected')

    // nodeDesign.addEventListener('click', () => gridSection.innerHTML = appSettings.designs[key] );
    nodeDesign.dataset.key = key;
    nodeDesign.innerHTML = `<i class="fas fa-shapes"></i><span>${key}</span>`;

    // 4 Agrego el lienzo a la Lista
    designsList.appendChild(nodeDesign);
  }
  
  // 5 Oculto el elemento "sin lienzos"
  divAnyDesigns.style.setProperty('display', 'none');

  insertBtnNewDesign(); // 6 Agrega el boton de Nuevo Lienzo
  
}

// 3 Seleccionar un color para el pintado de cuadros
function setCurrentColor(color, element) {
  // 1 Asigna el color del parámetro al color actual
  appSettings.currentColor = color;

  // 2 Si no le pasaron un elemento cierra la función
  if (element == undefined) return;

  // 3 Retira la clase active a quien la tenga
  const oldColor = document.querySelector('.color.active');
  if (oldColor) oldColor.classList.remove("active");
  
  // 4 Agrega la clase active al bloque de color seleccionado
  element.classList.add("active");
}

// 4 Pinta un cuadro de la grilla con el color actual seleccionado
function paintBlock({target}) {

  // 1 Valida si hay un elemento bloque ascendente
  const block = target.closest('.paint-grid > .painter-block');
  if (!block) return; // Si no lo hay sale de la funcion

  // 2 Si lo hay cambia su color
  block.style.setProperty('background-color', appSettings.currentColor);
  block.classList.add("painted");
}

// 5 Pinta o Limpia un cuadro de la grilla en HOVER
function blockHover({target}) {
  // 1 Valida si hay un elemento bloque ascendente
  const block = target.closest('.paint-grid > .painter-block');
  if (!block) return; // Si no lo hay sale de la funcion

  // Si lo hay:
  // 2 Si "isPressed" es true y mantiene presionado el click derecho
  // entonces pinta con el color actual
  if (appSettings.isPressed || event.buttons == 1) {
    block.style.setProperty("background-color", appSettings.currentColor);
    block.classList.add("painted");

  // 3 Si "isErasing" es true pinta con el color actual
  } else if (appSettings.isErasing) {
    target.style.setProperty('background-color', 'initial');
    target.classList.remove("painted");
  }

}

// 6 Limpia todos los cuadros de la grilla
function resetGrid() {
  const gridBlocks = document.querySelectorAll(".painter-block");
  gridBlocks.forEach((element) => {
    element.style.backgroundColor = "initial";
    element.classList.remove("painted");
  });
}

// 7 Genera una captura de la Grilla
function getGridCapture() {
  // 1 SI ya existe una captura se elimina
  if (wrapperCapture.firstChild)
    wrapperCapture.firstElementChild.remove();

  // 2 Reseteamos la sombra porque genera resultados inesperados con la captura
  gridSection.style.setProperty('box-shadow', 'initial');

  // 3
  html2canvas(gridSection).then((canvas) => {
    wrapperCapture.appendChild(canvas);
  });
  modalContainer.classList.toggle("visible");
  modalCapture.classList.add("visible");

  // 4 
  gridSection.style.setProperty('box-shadow', '0 0 50px 10px rgba(0, 0, 0, .5)');
}

// 8 Cierra el panel de la captura de la Grilla
function closeModalContainer() {
  modalContainer.classList.toggle("visible");
  modalContainer.children[0].classList.remove('visible');
  modalContainer.children[1].classList.remove('visible');
}

// 9 Cambia el valor de isPressed
function switchIsPressed(bool = null) {
  if (bool === null) return; // 1 Si no indicaron el valor sale de la funcion

  // 2 Aplica cambios dependiendo de su valor
  if (bool) {
    // Cambio en las propiedades
    appSettings.isPressed = true;
    appSettings.isErasing = false;

    // Cambios en el grid
    gridSection.classList.add("pressed");
    gridSection.classList.remove("erasing");

    // Cambios en checkbox
    chbxPressed.checked = true;
    chbxErasing.checked = false;

  } else {
    appSettings.isPressed = false; // Cambio en la propiedad
    gridSection.classList.remove("pressed"); // Cambios en el grid
    chbxPressed.checked = false; // Cambios en checkbox
  }
}

// 10 Cambia el valor de isErasing
function switchIsErasing(bool = null) {
  if (bool === null) return; // Si no indicaron el valor sale de la funcion

  // 1 Aplica cambios dependiendo de su valor
  if (bool) {
    // Cambio en las propiedades
    appSettings.isErasing = true;
    appSettings.isPressed = false;

    // Cambios en el grid
    gridSection.classList.add("erasing");
    gridSection.classList.remove("pressed");

    // Cambios en checkbox
    chbxErasing.checked = true;
    chbxPressed.checked = false;

  } else {
    appSettings.isErasing = false; // Cambio en la propiedad
    gridSection.classList.remove("erasing"); // Cambios en el grid
    chbxErasing.checked = false; // Cambios en checkbox
  }
  
}

// 11 Crea un elemento de color en la paleta de colores
// Recibe como argumento un color
function createColor(strColor) {
  
  // 1 Crea el elemento con su clase, backgroundColor y su eventListener
  const nodeColor = document.createElement("div");
  nodeColor.classList.add("color");
  nodeColor.style.setProperty("background-color", strColor);
  
  // nodeColor.addEventListener("click", () => setCurrentColor(strColor, nodeColor) );
  
  // 2 Crea su icono interno y lo inserta
  const i = document.createElement("i");
  i.classList.add("fas", "fa-check");
  nodeColor.appendChild(i);
  
  // 3 Inserta el elemento en el DOM
  colorPalette.appendChild(nodeColor);

  // VALIDACION:
  // Si la paleta ya tiene 40 elementos o más
  // entonces se agregará el color,
  // pero se elimina el primer color ingresado por el usuario
  if (colorPalette.childElementCount >= 40)
    colorPalette.children[14].remove();

}

// 12 Muestra el Contenedor del Modal y el Modal "Guardar"
function showModalSaveName() {
  modalContainer.classList.toggle('visible');
  modalSaveName.classList.add('visible');
  inputNameDesign.focus();
  inputNameDesign.value = '';
}

// 13 Guarda un Lienzo con su nombre
function saveNewDesign() {
  // 1 Valida el nombre del Lienzo a Guardar
  const name = inputNameDesign.value;

  // 2 Si es inválido llama otra función y sale de ésta
  if (!isValidName(name)) {
    // Instrucciones indicando que el nombre está mal
    alert('Nombre Incorrecto\nIngrese un nombre válido');
    return;
  }

  // 3 Guarda el lienzo con su respectivo nombre
  appSettings.designs[name] = gridSection.innerHTML;

  // 4 Establece el Lienzo Actual con su nombre
  appSettings.currentDesign = name;

  // 5 Actualizamos la Lista de Lienzos, Cerramos el Contenedor del Modal y Reseteamos la Grilla del Lienzo
  updateDesignsList();
  closeModalContainer();
  resetGrid()
}



// Handle Functions
function handlerBtnDesignsbarClick() {
  btnDesignsbar.classList.toggle('active');
  designsSection.classList.toggle('open');
}

function handleFocusoutInputWith({ target: { value } }) {
  // VALIDACION:
  // Si el numero es invalido, cambia su valor y sale de la función
  if (!isValidNumber(Number(value))) {
    inputWidth.value = appSettings.width;
    return;
  }

  // 1 Si el valor del input y el ancho de la config son diferentes
  // Rehace el lienzo con los nuevos valores
  if (Number(value) !== appSettings.width)
    makeGrid(Number(value), Number(inputHeight.value));
}

function handleFocusoutInputHeight({ target: { value } }) {
  // VALIDACION:
  // Si el numero es invalido, cambia su valor y sale de la función
  if (!isValidNumber(Number(value))) {
    inputHeight.value = appSettings.height;
    return;
  }

  // 2 Si el valor del input y el ancho de la config son diferentes
  // Rehace el lienzo con los nuevos valores
  if (Number(value) !== appSettings.height)
    makeGrid(Number(inputWidth.value), Number(value));
}

function handleKeydownDocument(evt) {
  if (evt.key === 'Control') switchIsPressed(true);
  if (evt.key === 'Shift') switchIsErasing(true);
}

function handleKeyupDocument(evt) {
  if (evt.key === 'Control') switchIsPressed(false);
  if (evt.key === 'Shift') switchIsErasing(false);
}

function handlerChangeInputColor(evt) {
  createColor(evt.target.value);
}

function handleClickColor(evt) {
  // 1 Busca el ancestro mas cercano al elemento .color
  const nodeColor = evt.target.closest('.color-palette > .color');

  if (!nodeColor) return; // 2 Si no lo encontró sale de la función

  // 3 Establecemos el color
  setCurrentColor(getColor(nodeColor), nodeColor);
}

function handleInputNameDesignKeydown(evt) {
  if (evt.key == 'Enter') saveNewDesign();
}

function handlerClickBtnSave() {
  // 1 Si no tiene un Lienzo Seleccionado
  if (!appSettings.currentDesign) {
    alert('No ha seleccionado ningún Lienzo\nSeleccione uno para guardar los cambios');
    return;
  }
  // Si lo tiene:
  // Entonces guarda los cambios en el Lienzo correspondiente
  appSettings.designs[appSettings.currentDesign] = gridSection.innerHTML;
  
}

function handlerClickDesignsList(evt) {
  const btnNewDesign = evt.target.closest('.my-designs > .content > .new-design');
  const divDesign = evt.target.closest('.my-designs > .content > .design');
  
  // 1 Si dió click en el Botón "Nuevo Lienzo"
  if (btnNewDesign) {
    showModalSaveName(); // Muestra el Modal para ingresar el nombre

  // 2 Si dió click en un Lienzo de la Lista
  } else if (divDesign) {
    // a Muestra el Lienzo seleccionado en la grilla
    const key = divDesign.dataset.key;
    gridSection.innerHTML = appSettings.designs[key];
    // b Selecciona el Lienzo en la variable "currentDesign"
    appSettings.currentDesign = key;
    // c Quita la clase "selected" al anterior seleccionado y lo aplicamos al actual
    const prevDesign = document.querySelector('.my-designs .design.selected');
    prevDesign.classList.remove('selected');
    divDesign.classList.add('selected');
  }

  
}

// #endregion

// #region 3. EVENTS LISTENERS

eventListeners();
function eventListeners() {

  // al cargar el DOM
  document.addEventListener('DOMContentLoaded', startApp);

  // al dar CLICK el Boton para mostrar la BARRA DE LIENZOS
  btnDesignsbar.addEventListener('click', handlerBtnDesignsbarClick);
  
  // al dar CLICK en un COLOR (Event Delegation)
  colorPalette.addEventListener('click', handleClickColor);


  // al dar PRESIONAR el mouse sobre un BLOQUE del Lienzo (Event Delegation)
  gridSection.addEventListener("mousedown", paintBlock);
  // al APARECER encima de un BLOQUE del Lienzo (Event Delegation)
  gridSection.addEventListener("mouseover", blockHover);
  // al ARRASTRAR un BLOQUE del Lienzo
  gridSection.addEventListener("dragstart", (e) => e.preventDefault());


  // al PRESIONAR UNA TECLA en el documento
  document.addEventListener("keydown", handleKeydownDocument);

  // al SOLTAR UNA TECLA en el documento
  document.addEventListener("keyup", handleKeyupDocument);
  
  // al CAMBIAR EL VALOR del color
  inputColor.addEventListener('change', handlerChangeInputColor);

  // al QUITAR EL FOCO del input de ancho y alto
  inputWidth.addEventListener('focusout', handleFocusoutInputWith);
  inputHeight.addEventListener('focusout', handleFocusoutInputHeight);

  // al CAMBIAR EL VALOR del check de los checkbox "Presionar" y "Borrar"
  chbxPressed.addEventListener("change", (evt) => switchIsPressed(evt.target.checked));
  chbxErasing.addEventListener("change", (evt) => switchIsErasing(evt.target.checked));

  // al dar CLICK el Boton de REINICIAR LA GRILLA
  btnEraseAll.addEventListener("click", resetGrid);
  
  // al dar CLICK el Boton de HACER CAPTURA
  btnCapture.addEventListener("click", getGridCapture);
  
  // al dar CLICK el Boton GUARDAR
  btnSave.addEventListener("click", handlerClickBtnSave);

  // al PRESIONAR una tecla en el Input del NOMBRE de LIENZO
  inputNameDesign.addEventListener('keydown', handleInputNameDesignKeydown);

  // al dar CLICK en el Boton "CONFIRMAR GUARDAR"
  btnSaveConfirm.addEventListener('click', saveNewDesign);

  // al dar CLICK en el Boton de "Nuevo Lienzo"
  designsList.addEventListener('click', handlerClickDesignsList);

  // al clickear el Boton de cerrar el panel de Captura
  btnCloseCapture.addEventListener("click", closeModalContainer);
}
//#endregion
