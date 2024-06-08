import { createElement, getComputedStyleProperty, parsePixelSizeToNumber } from '../../utils/index.js';
import UI from '../ui.js';

export function CanvasEditorView({
  getSelectedColor,
  isBrushToolSelected,
  isEraserToolSelected,
  isBrushToolPressed,
  isEraserToolPressed,
  toggleSavedCanvasItem,
  updateZoomPercentage,
}) {
  const canvasEditor = UI.canvasEditor;
  const canvasEditorContainer = UI.canvasEditorContainer;

  function generateCanvasHtml(width, height) {
    // Clear canvas
    canvasEditorContainer.classList.remove('no-canvas');
    canvasEditor.innerHTML = '';

    // Create canvas wrapper
    const canvasEditorWrapper = createElement('div', {
      className: 'CanvasEditor-wrapper js-CanvasEditor-wrapper',
    });
    canvasEditor.appendChild(canvasEditorWrapper);

    // Generate editor pixels by width & height
    for (let w = 0; w < width; w++) {
      for (let h = 0; h < height; h++) {
        // const pixelElement = generatePixel(`block-${w}-${h}`);
        const pixelElement = generatePixel();
        canvasEditorWrapper.appendChild(pixelElement);
      }
    }

    // Adjust canvas to 100% in canvas editor
    canvasToFit({canvasEditorWrapper, width, height});

    // Load event listeners & return canvas wrapper html
    loadCanvasEditorEventListeners();
    return canvasEditor.innerHTML;
  }

  function loadCanvas(canvasHtml, width, height) {
    canvasEditorContainer.classList.remove('no-canvas');
    canvasEditor.innerHTML = canvasHtml;

    const canvasEditorWrapper = getCurrentCanvasWrapper();
    if (!canvasEditorWrapper) return;

    // Adjust canvas to 100% in canvas editor
    canvasToFit({canvasEditorWrapper, width, height});

    loadCanvasEditorEventListeners();
  }

  function getCurrentCanvasWrapper() {
    const canvasEditorWrapper = canvasEditor.querySelector('.js-CanvasEditor-wrapper');
    return canvasEditorWrapper;
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
    const canvasEditorWrapper = getCurrentCanvasWrapper();
    if (!canvasEditorWrapper) return;

    canvasEditorWrapper.addEventListener('mousedown', handleCanvasEditorMousedown);
    canvasEditorWrapper.addEventListener('mouseover', handleCanvasEditorHover);
    canvasEditorWrapper.addEventListener("dragstart", (e) => e.preventDefault());
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

  function getPixel100PercentageSize() {
    const canvasEditorWrapper = getCurrentCanvasWrapper();
    if (!canvasEditorWrapper) return;

    const pixelSizeRaw = canvasEditorWrapper.dataset.pixelSize;
    if (!pixelSizeRaw) return;

    const pixelSize = parsePixelSizeToNumber(pixelSizeRaw, 2);
    return pixelSize;
  }

  function makeZoom({ percentage, width, height }) {
    const size = getPixel100PercentageSize();
    if (!size) return;

    const newSize = (size * percentage / 100).toFixed(2).toString() + 'px';
    const canvasEditorWrapper = getCurrentCanvasWrapper();
    if (!canvasEditorWrapper) return;

    canvasEditorWrapper.style.setProperty('grid-template-columns', `repeat(${width}, ${newSize}`);
    canvasEditorWrapper.style.setProperty('grid-template-rows', `repeat(${height}, ${newSize}`);
    updateZoomPercentage(percentage);
  }

  function canvasToFit({ canvasEditorWrapper, width, height }) {
    // Extend canvas wrapper dimensions
    canvasEditorWrapper.style.setProperty("width", "100%");
    canvasEditorWrapper.style.setProperty("height", "100%");
    canvasEditorWrapper.style.setProperty('grid-template-rows', `repeat(${height}, 1fr)`);
    canvasEditorWrapper.style.setProperty('grid-template-columns', `repeat(${width}, 1fr)`);

    // Get canvas editor dimensions
    const { widthInPixels, heightInPixels } = getDimensionsInPixels(canvasEditor);

    // Get pixel side size to fit
    let dimension;
    if (heightInPixels > widthInPixels) {
      dimension = 'width';
    } else if (heightInPixels < widthInPixels) {
      dimension = 'height';
    } else { // Are equal
      if (width > height || width === height)
        dimension = 'width';
      else
        dimension = 'height';
    }
    const pixelSideSize = getPixelSideSize(dimension, canvasEditorWrapper, height, width);

    // Set final styles & set pixel size data of 100% zoom
    canvasEditorWrapper.style.setProperty('grid-template-rows', `repeat(${height}, ${pixelSideSize})`);
    canvasEditorWrapper.style.setProperty('grid-template-columns', `repeat(${width}, ${pixelSideSize})`);
    canvasEditorWrapper.style.setProperty("width", "auto");
    canvasEditorWrapper.style.setProperty("height", "auto");
    canvasEditorWrapper.dataset.pixelSize = pixelSideSize;
    updateZoomPercentage(100);
  }

  return {
    generateCanvasHtml,
    loadCanvas,
    clearCanvas,
    changeCanvasEditorIfBrushPressed,
    changeCanvasEditorIfEraserPressed,
    eraseAllPixels,
    getCanvasHtml,
    makeZoom,
    canvasToFit,
    getCurrentCanvasWrapper,
  }
}

function generatePixel() {
  const pixelEditor = document.createElement('div');
  // pixelEditor.id = id;
  pixelEditor.classList.add('js-CanvasEditor-pixel', 'CanvasEditor-pixel');
  return pixelEditor;
}

function getPixelSideSize(dimension, wrapperCanvasEditor, height, width) {
  if (!['width', 'height'].includes(dimension)) {
    console.error(`Dimension ${dimension} not available.`);
    return;
  }

  wrapperCanvasEditor.style.setProperty('grid-template-columns', `repeat(${width}, '1fr'`);
  wrapperCanvasEditor.style.setProperty('grid-template-rows', `repeat(${height}, '1fr'`);

  const somePixel = wrapperCanvasEditor.querySelector('.js-CanvasEditor-pixel');
  const pixelSideSizeInPixels = getComputedStyleProperty(somePixel, dimension);
  const pixelSize = parsePixelSizeToNumber(pixelSideSizeInPixels, 2);
  return `${pixelSize}px`;
}

function getDimensionsInPixels(element) {
  const pixelsWidth = getComputedStyleProperty(element, 'width').slice(0, -2);
  const pixelsHeight = getComputedStyleProperty(element, 'height').slice(0, -2);

  return {
    widthInPixels: Number(pixelsWidth),
    heightInPixels: Number(pixelsHeight),
  }
}

