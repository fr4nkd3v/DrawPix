import { CANVAS_TEMPLATES } from '../../constants/index.js';
import UI from '../ui.js';

export function WelcomePanelView({
  handleCanvasByWidthAndHeightClick,
  listCustomCanvasTemplates,
  createCustomTemplate,
}) {
  const canvasEditorContainer = UI.canvasEditorContainer;
  const welcomePanel = UI.welcomePanel;
  const templateList = UI.templateList;
  const customCanvasList = UI.customCanvasList;
  const generateCustomCanvasButton = UI.generateCustomCanvasButton;
  const widthCustomCanvasInput = UI.widthCustomCanvasInput
  const heightCustomCanvasInput = UI.heightCustomCanvasInput;
  const groupLastest = UI.groupLastest;
  const welcomeModalCloseButton = UI.welcomeModalCloseButton;

  welcomePanel.onclick = handleWelcomePanelClick;
  generateCustomCanvasButton.onclick = handleGenerateCustomCanvasClick;
  widthCustomCanvasInput.oninput = handleInputDimensionsInput;
  heightCustomCanvasInput.oninput = handleInputDimensionsInput;
  welcomeModalCloseButton.onclick = handleCloseModalButton;

  function handleWelcomePanelClick(event) {
    const templateButton = event.target.closest('.js-TemplateButton');
    if (!templateButton) return;

    const { width, height } = templateButton.dataset;
    handleCanvasByWidthAndHeightClick({width, height});

    if (isWelcomePanelInModalMode()) {
      handleCloseModalButton();
    }
  }

  function handleGenerateCustomCanvasClick() {
    const isValidForm = validateDimensionsForm(false);
    if (!isValidForm) {
      toggleShowErrorDimensionsForm(true);
      return;
    }

    toggleShowErrorDimensionsForm(false);
    const width = widthCustomCanvasInput.value.trim();
    const height = heightCustomCanvasInput.value.trim();
    handleCanvasByWidthAndHeightClick({width, height});
    createCustomTemplate({width, height});
  }

  function handleInputDimensionsInput() {
    this.value = this.value.replaceAll('.', '');
    validateDimensionsForm(true);
  }

  function handleCloseModalButton() {
    welcomePanel.classList.remove('modal-mode');
    UI.toggleShowBackdrop(false);
  }

  function showWelcomePanel() {
    canvasEditorContainer.classList.add('no-canvas');
    generateCustomCanvasButton.classList.add('disabled');
    widthCustomCanvasInput.value = '';
    heightCustomCanvasInput.value = '';

    loadTemplates();
    loadCustomCanvasTemplates();
  }

  function showWelcomePanelAsModal() {
    welcomePanel.classList.add('modal-mode');
    generateCustomCanvasButton.classList.add('disabled');
    widthCustomCanvasInput.value = '';
    heightCustomCanvasInput.value = '';

    loadTemplates();
    loadCustomCanvasTemplates();
    UI.toggleShowBackdrop(true);
  }

  function loadTemplates() {
    const htmlTemplateList = CANVAS_TEMPLATES.reduce((acc, { width, height }) => {
      return acc += templateCanvasTemplate(width, height);
    }, '');
    templateList.innerHTML = htmlTemplateList;
  }

  function loadCustomCanvasTemplates() {
    const customCanvasTemplatesArr = listCustomCanvasTemplates()
    if (customCanvasTemplatesArr.length <= 0) {
      groupLastest.classList.add('u-display-none');
      return;
    }

    groupLastest.classList.remove('u-display-none');
    const htmlTemplateList = customCanvasTemplatesArr.reduce((acc, { width, height }) => {
      return acc += templateCanvasTemplate(width, height);
    }, '');
    customCanvasList.innerHTML = htmlTemplateList;
  }

  function validateDimensionsForm(inRealTime = false) {
    const width = widthCustomCanvasInput.value;
    const height = heightCustomCanvasInput.value;

    if (inRealTime) {
      if (width !== '' && height !== '') {
        generateCustomCanvasButton.classList.remove('disabled');
      } else {
        generateCustomCanvasButton.classList.add('disabled');
      }

      if (Number(width) <= 50 && Number(height) <= 50) {
        toggleShowErrorDimensionsForm(false);
      } else {
        toggleShowErrorDimensionsForm(true);
      }
    } else {
      return (Number(width) <= 50 && Number(height) <= 50);
    }
  }

  function toggleShowErrorDimensionsForm(showError) {
    const inputRow = widthCustomCanvasInput.closest('.js-GroupDimensions-inputRow');
    if (showError) {
      inputRow.classList.add('show-error');
      inputRow.dataset.messageError = 'The maximum size of a canvas is 50 x 50 px.'
    } else {
      inputRow.classList.remove('show-error');
    }
  }

  function isWelcomePanelInModalMode() {
    return welcomePanel.classList.contains('modal-mode');
  }

  return {
    showWelcomePanel,
    showWelcomePanelAsModal,
  };
}

function templateCanvasTemplate(width, height) {
  return `
    <div class="WelcomeContainer-template js-TemplateButton" data-width="${width}" data-height="${height}">
      <svg class="WelcomeContainer-templateIcon">
        <use xlink:href="./App/assets/icons/grid-icon.svg#icon"></use>
      </svg>
      <span class="WelcomeContainer-templateText">${width} x ${height}</span>
    </div>
  `;
}