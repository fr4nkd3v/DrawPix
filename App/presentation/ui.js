import { createElement } from "../utils/index.js";

const header = document.getElementById('Header');
const menu = document.getElementById('Menu');
const canvasBar = document.getElementById('CanvasBar');
const canvasList = document.getElementById('CanvasBar-list');
const newCanvasButton = document.getElementById('NewCanvasButton');
const canvasBarSeparator = document.getElementById('CanvasBar-separator');

const welcomePanel = document.getElementById('WelcomePanel');
const templateList = document.getElementById('WelcomeContainer-templateList');
const customCanvasList = document.getElementById('WelcomeContainer-customCanvasList');
const generateCustomCanvasButton = document.getElementById('GenerateCustomCanvasButton');
const widthCustomCanvasInput = document.getElementById('WidthCustomCanvasInput');
const heightCustomCanvasInput = document.getElementById('HeightCustomCanvasInput');
const groupLastest = document.getElementById('GroupLastest');
const welcomeModalCloseButton = document.getElementById('WelcomeContainer-modalCloseButton');

const canvasEditorContainer = document.getElementById('container-CanvasEditor');
const canvasEditor = document.getElementById('CanvasEditor');
const canvasItemContextMenu = document.getElementById('ContextMenu');

const settingsBar = document.getElementById('SettingsBar');
const titleCanvasLabel = document.getElementById('CanvasBlock-titleCanvas');
const zoomControl = document.getElementById('ZoomControl');
const sizeCanvasLabel = document.getElementById('CanvasBlock-sizeCanvas');
const zoomOutButton = document.getElementById('ZoomOutButton');
const zoomInButton = document.getElementById('ZoomInButton');
const zoomPercentageLabel = document.getElementById('ZoomPercentageLabel');
const canvasToFitButton = document.getElementById('CanvasToFitButton');
const toolButtonGroup = document.getElementById('ToolButtonGroup');
const brushButton = document.getElementById('BrushButton');
const eraserButton = document.getElementById('EraserButton');
const colorPalette = document.getElementById('ColorPalette');
const colorPaletteDropdown = document.getElementById('ColorPaletteDropdown')
const colorPaletteDropdownSelect = colorPaletteDropdown.querySelector('.js-ColorPaletteDropdown-select');
const colorPaletteDropdownSelectText = colorPaletteDropdown.querySelector('#ColorPaletteDropdown-selectText');
const colorPaletteDropdownSelectList = document.getElementById('ColorPaletteDropdown-selectList');
const colorPaletteDropdownPreview = document.getElementById('ColorPaletteDropdown-preview');
const colorPickerInputColor = document.getElementById('ColorPicker-inputColor');
const colorPickerInputText = document.getElementById('ColorPicker-inputText');
const colorPickerBox = document.getElementById('ColorPicker-box');
const switchPressBrush = document.getElementById('SwitchPressBrush');
const switchPressEraser = document.getElementById('SwitchPressEraser');
const eraseAllButton = document.getElementById('EraseAllButton');
const saveCanvasButton = document.getElementById('SaveCanvasButton');

const backdrop = document.getElementById('Backdrop');

const toggleEnableElement = (element, isEnabled) => {
  if (isEnabled) {
    const cover = element.querySelector('.Cover');
    if (cover) cover.remove();
  } else {
    // If cover exists
    const haveCover = element.querySelector('.Cover');
    if (haveCover) return;

    // If element has no positioning apply relative
    let position = getComputedStyle(element, null).getPropertyValue('position');
    if (position === 'static') element.style.position = 'relative';

    // Create & insert cover
    const cover = createElement('div', {
      className: 'Cover'
    });
    element.appendChild(cover);
  }
};

const toggleShowBackdrop = (isShowed) => {
  if (isShowed) {
    backdrop.classList.add('is-showed');
  } else {
    backdrop.classList.remove('is-showed');
  }
};

export default {
  header,
  menu,
  canvasBar,
  canvasList,
  newCanvasButton,
  canvasBarSeparator,
  welcomePanel,
  welcomeModalCloseButton,
  templateList,
  customCanvasList,
  generateCustomCanvasButton,
  widthCustomCanvasInput,
  heightCustomCanvasInput,
  groupLastest,
  canvasEditorContainer,
  canvasEditor,
  canvasItemContextMenu,
  settingsBar,
  titleCanvasLabel,
  sizeCanvasLabel,
  zoomControl,
  zoomOutButton,
  zoomInButton,
  zoomPercentageLabel,
  canvasToFitButton,
  toolButtonGroup,
  brushButton,
  eraserButton,
  colorPalette,
  colorPaletteDropdown,
  colorPaletteDropdownSelect,
  colorPaletteDropdownSelectText,
  colorPaletteDropdownSelectList,
  colorPaletteDropdownPreview,
  colorPickerInputColor,
  colorPickerInputText,
  colorPickerBox,
  switchPressBrush,
  switchPressEraser,
  eraseAllButton,
  saveCanvasButton,
  backdrop,

  toggleEnableElement,
  toggleShowBackdrop,
}