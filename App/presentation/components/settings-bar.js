import { NATIVE_COLOR_PALETTES } from '../../constants/index.js';
import { createElement } from '../../utils/index.js';
import UI from '../ui.js'

export function SettingsBarView({
  setSelectedColor,
  selectBrushTool,
  selectEraserTool,
  setBrushPressed,
  setEraserPressed,
  unsetToolPressed,
  handleEraseAllPixels,
  handleUpdateCanvasHtml,
}) {
  const settingsBar = UI.settingsBar;
  const toolButtonGroup = UI.toolButtonGroup;
  const brushButton = UI.brushButton;
  const eraserButton = UI.eraserButton;
  const colorPalette = UI.colorPalette;
  const colorPaletteDropdown = UI.colorPaletteDropdown;
  const colorPaletteDropdownSelect = UI.colorPaletteDropdownSelect;
  const colorPaletteDropdownSelectText = UI.colorPaletteDropdownSelectText;
  const colorPaletteDropdownSelectList = UI.colorPaletteDropdownSelectList;
  const colorPaletteDropdownPreview = UI.colorPaletteDropdownPreview;
  const colorPickerInputColor = UI.colorPickerInputColor;
  const colorPickerInputText = UI.colorPickerInputText;
  const colorPickerBox = UI.colorPickerBox;
  const switchPressBrush = UI.switchPressBrush;
  const switchPressEraser = UI.switchPressEraser;
  const eraseAllButton = UI.eraseAllButton;
  const saveCanvasButton = UI.saveCanvasButton;

  brushButton.onclick = handleBrushButtonClick;
  eraserButton.onclick = handleEraserButtonClick;
  colorPalette.onclick = handleColorPaletteClick;
  colorPaletteDropdown.onclick = handleColorPaletteDropdownClick;
  colorPaletteDropdownSelect.onblur = handleColorPaletteDropdownSelectBlur;
  colorPickerInputColor.onchange = handleChangeColorpickerValue;
  switchPressBrush.onchange = handleSwitchPressBrushChange;
  switchPressEraser.onchange = handleSwitchPressEraserChange;
  eraseAllButton.onclick = handleEraseAllPixels;
  saveCanvasButton.onclick = handleUpdateCanvasHtml;

  function renderColorPalette(colorPaletteArr, idPalette) {
    // If this color palette is already selected
    if (colorPalette.dataset.paletteSelected === idPalette) return;

    // Clear & load the color palette
    const htmlColorList = colorPaletteArr.reduce((acc, color) => acc += templatePaletteColor(color), '');
    colorPalette.innerHTML = htmlColorList;
    colorPalette.dataset.paletteSelected = idPalette;

    // Select first color in palette
    changePaletteColorSelected(colorPaletteArr[0]);
    changeColorpickerValue(colorPaletteArr[0]);
    setSelectedColor(colorPaletteArr[0]);
  }

  function handleChangeColorpickerValue() {
    changeColorpickerValue(this.value);
    addColorInColorPalette(this.value);
    changePaletteColorSelected(this.value);
    setSelectedColor(this.value);
  }

  function addColorInColorPalette(color) {
    const colorElement = templatePaletteColor(color, true);
    colorPalette.appendChild(colorElement);
  }

  function renderColorPaletteItems() {
    const htmlColorPaletteSelectItems = NATIVE_COLOR_PALETTES.reduce((acc, palette) => {
      const { id, name, colorPalette } = palette;
      const isDefault = (id === 'DEFAULT_COLOR_PALETTE');
      return acc += templateColorPaletteDropdownItem(name, id, colorPalette, isDefault);
    }, '')
    colorPaletteDropdownSelectList.innerHTML = htmlColorPaletteSelectItems;
  }

  function handleBrushButtonClick() {
    selectBrushTool();
  }
  function handleEraserButtonClick() {
    selectEraserTool();
  }

  function handleColorPaletteClick({ target }) {
    const colorElement = target.closest('.js-ColorPalette-color');
    if (!colorElement) return;

    const { color } = colorElement.dataset;
    setSelectedColor(color);
    changePaletteColorSelected(color);
    changeColorpickerValue(color);
  }

  function handleColorPaletteDropdownClick({ target }) {
    const item = target.closest('.js-ColorPaletteDropdown-item');
    const select = target.closest('.js-ColorPaletteDropdown-select');
    if (item) {
      handleColorPaletteDropdownItemClick(item);
    } else if (select) {
      toggleExpandColorPaletteDropdown(true);
    }
  }

  function handleColorPaletteDropdownItemClick(item) {
    const { idPalette } = item.dataset;
    const foundPalette = getColorPaletteObjectById(idPalette);
    if (!foundPalette) return;

    renderColorPalette(foundPalette.colorPalette, foundPalette.id);
    // Update item selected
    colorPaletteDropdownSelectText.textContent = foundPalette.name;
    changePaletteDropdownItemSelected(idPalette);
    changePaletteDropdownPreview(foundPalette.colorPalette);

    toggleExpandColorPaletteDropdown(false);
  }

  function handleColorPaletteDropdownSelectBlur() {
    toggleExpandColorPaletteDropdown(false);
  }

  function handleSwitchPressBrushChange() {
    if (this.checked) setBrushPressed();
    else unsetToolPressed();
  }
  function handleSwitchPressEraserChange() {
    if (this.checked) setEraserPressed();
    else unsetToolPressed();
  }

  function toggleExpandColorPaletteDropdown(isExpanded) {
    if (isExpanded) {
      colorPaletteDropdown.classList.add('is-expanded');
    } else {
      colorPaletteDropdown.classList.remove('is-expanded');
    }
  }

  function changeToolSelected(buttonClicked) {
    const buttons = toolButtonGroup.querySelectorAll('.js-ToolButtonGroup-button');
    buttons.forEach(button => {
      if (button !== buttonClicked)
        button.classList.remove('is-selected');
      else
        button.classList.add('is-selected');
    })
  }

  function selectBrushToolButton() {
    changeToolSelected(brushButton);
  }
  function selectEraserToolButton() {
    changeToolSelected(eraserButton);
  }

  function changePaletteColorSelected(color) {
    // update state of color selected
    const colorBlocks = colorPalette.querySelectorAll('.js-ColorPalette-color');
    colorBlocks.forEach(colorBlock => {
      if (colorBlock.dataset.color === color)
        colorBlock.classList.add('is-selected');
      else
        colorBlock.classList.remove('is-selected');
    })
  }

  function changePaletteDropdownItemSelected(selectedItemId) {
    const items = colorPaletteDropdownSelectList.querySelectorAll('.js-ColorPaletteDropdown-item');
    items.forEach(item => {
      if (item.dataset.idPalette === selectedItemId) {
        item.classList.add('is-selected');
      } else {
        item.classList.remove('is-selected');
      }
    })
  }

  function changePaletteDropdownPreview(colorsArr) {
    colorPaletteDropdownPreview.innerHTML = colorsArr.reduce((acc, color) => {
      return acc += templateColorPreview(color);
    }, '');
  }

  function changeColorpickerValue(color) {
    colorPickerInputColor.value = color;
    colorPickerInputText.value = color.toUpperCase();
    colorPickerBox.style.setProperty('background-color', color);
  }
  function changeSwitchPressBrushChecked(boolean) {
    if (switchPressBrush.checked === !boolean) switchPressBrush.checked = boolean;
  }
  function changeSwitchPressEraserChecked(boolean) {
    if (switchPressEraser.checked === !boolean) switchPressEraser.checked = boolean;
  }

  function toggleDisplaySettingsBar(isEnable) {
    // UI.toggleEnableElement(settingsBar, isEnable);
    if (isEnable) {
      settingsBar.classList.remove('u-display-none');
    } else {
      settingsBar.classList.add('u-display-none');
    }
  }

  return {
    toggleDisplaySettingsBar,
    renderColorPalette,
    renderColorPaletteItems,
    changePaletteDropdownPreview,
    changeSwitchPressBrushChecked,
    changeSwitchPressEraserChecked,
    selectBrushToolButton,
    selectEraserToolButton,
  }
}

function templatePaletteColor(color, asElement = false) {
  if (asElement) {
    const element = createElement('div', {
      className: 'ColorPalette-color js-ColorPalette-color',
      dataset: { color },
      style: `background-color: ${color}; fill:${color}`,
    })
    element.innerHTML = `<svg class="ColorPalette-icon"><use xlink:href="./App/assets/icons/check-icon.svg#icon"></use></svg>`
    return element;
  } else {
    return `
    <div class="ColorPalette-color js-ColorPalette-color" data-color="${color}" style="background-color: ${color}; fill:${color}">
      <svg class="ColorPalette-icon"><use xlink:href="./App/assets/icons/check-icon.svg#icon"></use></svg>
    </div>`;
  }
}

function templateColorPaletteDropdownItem(namePalette, idPalette, colorsArr, isSelected = false) {
  const colorBlock = (color) =>
    `<div class="ColorPaletteDropdown-itemColor" style="background-color: ${color};"></div>`;

  const htmlColorsItems = colorsArr.reduce((acc, color) => acc += colorBlock(color), '');
  return `
  <li
    class="ColorPaletteDropdown-item ${isSelected ? 'is-selected' : ''} js-ColorPaletteDropdown-item"
    data-id-palette="${idPalette}"
  >
    <span class="ColorPaletteDropdown-itemName">${namePalette}</span>
    <div class="ColorPaletteDropdown-itemColors">
      ${htmlColorsItems}
    </div>
  </li>`;
}

function templateColorPreview(color) {
  return `
  <div class="ColorPaletteDropdown-previewColor" style="background-color: ${color};"></div>`;
}

function getColorPaletteObjectById(id) {
  const foundPalette = NATIVE_COLOR_PALETTES.find(palette => palette.id === id);
  return foundPalette;
}