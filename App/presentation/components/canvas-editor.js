import UI from '../ui.js';

export function CanvasEditorView({
  getSelectedColor,
  isBrushToolSelected,
  isEraserToolSelected,
  isBrushToolPressed,
  isEraserToolPressed,
  toggleSavedCanvasItem,
}) {
  const canvasEditor = UI.canvasEditor;
  const canvasEditorContainer = UI.canvasEditorContainer;

  function generateCanvasHtml(width, height) {
    canvasEditorContainer.classList.remove('no-canvas');
    canvasEditor.innerHTML = '';

    const wrapperCanvasEditor = document.createElement("div");
    wrapperCanvasEditor.classList.add("CanvasEditor-wrapper");
    wrapperCanvasEditor.style.setProperty("width", "100%");
    wrapperCanvasEditor.style.setProperty("height", "100%");
    canvasEditor.appendChild(wrapperCanvasEditor);

    // Generate pixel's Editor by width & height
    for (let w = 0; w < width; w++) {
      for (let h = 0; h < height; h++) {
        const pixelElement = generatePixel(`block-${w}-${h}`);
        wrapperCanvasEditor.appendChild(pixelElement);
      }
    }

    const { pixelsWidth, pixelsHeight } = getDimensionsInPixels(canvasEditor);
    let byWidth;
    if (pixelsHeight > pixelsWidth) {
      byWidth = true;
    } else if (pixelsHeight < pixelsWidth) {
      byWidth = false;
    } else { // pixelsHeight & pixelsWidth are equal
      if (width > height || width === height) byWidth = true;
      else byWidth = false;
    }
    const pixelSideLength = getPixelSideLength(byWidth, wrapperCanvasEditor, height, width);

    wrapperCanvasEditor.style.setProperty('grid-template-rows', `repeat(${height}, ${pixelSideLength})`);
    wrapperCanvasEditor.style.setProperty('grid-template-columns', `repeat(${width}, ${pixelSideLength})`);
    wrapperCanvasEditor.style.setProperty("width", "auto");
    wrapperCanvasEditor.style.setProperty("height", "auto");

    loadCanvasEditorEventListeners();

    return canvasEditor.innerHTML;
  }

  function loadCanvas(canvasHtml) {
    canvasEditorContainer.classList.remove('no-canvas');
    canvasEditor.innerHTML = canvasHtml;
    loadCanvasEditorEventListeners();
  }

  function getCanvasHtml() {
    return canvasEditor.innerHTML;
  }

  function clearCanvas() {
    canvasEditorContainer.classList.add('no-canvas');
    canvasEditor.innerHTML = "";
  }

  // When clicking the mouse in the pixel editor
  function handleCanvasEditorMousedown({ target }) {
    const pixelElement = target.closest('.js-CanvasEditor-pixel');
    if (!pixelElement) return;

    if (isBrushToolSelected()) {
      paintPixel(pixelElement);
    } else if (isEraserToolSelected()) {
      erasePixel(pixelElement);
    }
  }

  // When hovering the mouse in the pixel editor
  function handleCanvasEditorHover({ target, buttons }) {
    const pixelElement = target.closest('.js-CanvasEditor-pixel');
    if (!pixelElement) return;

    if (isBrushToolPressed()) {
      paintPixel(pixelElement);
    } else if (isEraserToolPressed()) {
      erasePixel(pixelElement);
    } else if (buttons === 1) { // Left click
      if (isBrushToolSelected())
        paintPixel(pixelElement);
      else if (isEraserToolSelected())
        erasePixel(pixelElement);
    }
  }

  function loadCanvasEditorEventListeners() {
    const wrapperCanvasEditor = canvasEditor.querySelector('.CanvasEditor-wrapper');

    wrapperCanvasEditor.addEventListener('mousedown', handleCanvasEditorMousedown);
    wrapperCanvasEditor.addEventListener('mouseover', handleCanvasEditorHover);
    wrapperCanvasEditor.addEventListener("dragstart", (e) => e.preventDefault());
  }

  function paintPixel(pixelElement) {
    const color = getSelectedColor();
    if (!color) return;

    pixelElement.style.setProperty('background-color', color);
    pixelElement.classList.add("is-painted");
    toggleSavedCanvasItem(false);
  }

  function erasePixel(pixelElement, toggleSaved = true) {
    pixelElement.style.setProperty('background-color', 'initial');
    pixelElement.classList.remove("is-painted");
    if (toggleSaved) toggleSavedCanvasItem(false);
  }

  function changeCanvasEditorIfBrushPressed() {
    canvasEditor.classList.remove('is-eraserPressed');
    canvasEditor.classList.add('is-brushPressed');
  }
  function changeCanvasEditorIfEraserPressed() {
    canvasEditor.classList.add('is-eraserPressed');
    canvasEditor.classList.remove('is-brushPressed');
  }

  function eraseAllPixels() {
    const pixels = canvasEditor.querySelectorAll(".js-CanvasEditor-pixel");
    pixels.forEach(erasePixel, false);
    toggleSavedCanvasItem(false);
  }

  return {
    generateCanvasHtml,
    loadCanvas,
    clearCanvas,
    changeCanvasEditorIfBrushPressed,
    changeCanvasEditorIfEraserPressed,
    eraseAllPixels,
    getCanvasHtml,
  }
}

function generatePixel(id) {
  const pixelEditor = document.createElement('div');
  pixelEditor.id = id;
  pixelEditor.classList.add('js-CanvasEditor-pixel', 'CanvasEditor-pixel');
  return pixelEditor;
}

function getPixelSideLength(byWidth, wrapperCanvasEditor, height, width) {
  wrapperCanvasEditor.style.setProperty('grid-template-columns', `repeat(${width}, ${byWidth ? '1fr' : '1px'})`);
  wrapperCanvasEditor.style.setProperty('grid-template-rows', `repeat(${height}, ${byWidth ? '1px' : '1fr'})`);

  const somePixel = wrapperCanvasEditor.querySelector('.js-CanvasEditor-pixel');
  const pixelSideLength = getComputedStyle(somePixel).getPropertyValue(byWidth ? 'width' : 'height');
  return pixelSideLength;
}

function getDimensionsInPixels(element) {
  const pixelsWidth = getComputedStyle(element).getPropertyValue('width').slice(0, 2);
  const pixelsHeight = getComputedStyle(element).getPropertyValue('height').slice(0, 2);

  return {
    pixelsWidth: Number(pixelsWidth),
    pixelsHeight: Number(pixelsHeight),
  }
}

