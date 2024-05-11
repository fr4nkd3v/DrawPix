import { selectElementText } from '../../utils/index.js';
import UI from '../ui.js';

export function CanvasBarView({
  handleNewCanvasClick,
  handleCanvasSelection,
  handleRenameCanvas,
  handleDeleteCanvas
}) {
  const canvasBar = UI.canvasBar;
  const canvasList = UI.canvasList;
  const newCanvasButton = UI.newCanvasButton;
  const canvasItemContextMenu = UI.canvasItemContextMenu;
  const canvasBarSeparator = UI.canvasBarSeparator;

  newCanvasButton.addEventListener('click', () => {
    // handleNewCanvasClick({id: 'abc', name: 'untitled2', width: 5, height: 5})
    handleNewCanvasClick()
  })

  canvasItemContextMenu.addEventListener('blur', () => toggleShowContextMenu(false));

  function renderCanvases(canvases) {
    canvasList.innerHTML = '';

    if (!canvases || !canvases.length) {
      toggleDisplayEmptyStatePanel(true);
      return;
    }

    toggleDisplayEmptyStatePanel(false);
    canvases.forEach(canvas => {
      const canvasElement = document.createElement('div');
      canvasElement.className = 'CanvasItem js-CanvasItem';
      canvasElement.dataset.id = canvas.id;
      canvasElement.innerHTML = templateCanvasItem(canvas.name);

      canvasElement.addEventListener('click', handleCanvasItemClick);

      canvasList.appendChild(canvasElement);
    });
  }

  function toggleDisplayEmptyStatePanel(isDisplayed) {
    isDisplayed
      ? canvasBar.classList.add('has-no-designs')
      : canvasBar.classList.remove('has-no-designs');
  }

  function handleCanvasItemClick({ target, y, x }) {
    const canvasId = this.dataset.id;
    const canvasItemMenu = target.closest('.js-CanvasItem-menu');
    if (canvasItemMenu) { // Click in item menu
      toggleShowContextMenu(true, canvasId, {x, y});
    } else { // Click in item
      handleCanvasSelection(canvasId);
      changeCanvasItemSelectedByElement(this);
      toggleSavedCanvasItem(true);
    }
  }

  function changeCanvasItemSelectedByElement(canvasSelected) {
    canvasList.querySelectorAll('.js-CanvasItem').forEach(item => item.classList.remove('is-selected'));
    canvasSelected.classList.add('is-selected');
  }

  function changeCanvasItemSelectedById(id) {
    canvasList.querySelectorAll('.js-CanvasItem').forEach(item => {
      if (item.dataset.id === id) item.classList.add('is-selected');
      else item.classList.remove('is-selected');
    });
  }

  function toggleCollapseCanvasBar() {
    canvasBar.classList.toggle('is-collapsed');
  }

  function toggleShowContextMenu(isShowed, canvasId, coordinates) {
    if (isShowed) {
      canvasItemContextMenu.classList.add('is-showed');
      canvasItemContextMenu.style.left = `${coordinates.x}px`;
      canvasItemContextMenu.style.top = `${coordinates.y}px`;
      canvasItemContextMenu.dataset.id = canvasId;
      canvasItemContextMenu.focus();
      canvasItemContextMenu.onclick = handleContextMenuClick
    } else {
      canvasItemContextMenu.classList.remove('is-showed');
      canvasItemContextMenu.style.left = '0px';
      canvasItemContextMenu.style.top = '0px';
    }
  }

  function handleContextMenuClick(event) {
    const contextMenuOption = event.target.closest('.js-ContextMenu-item');
    const { id } = canvasItemContextMenu.dataset
    if (!contextMenuOption || !id) return

    if (contextMenuOption.id === 'RenameCanvasButton') {
      enableCanvasItemEditing(id);
    } else if (contextMenuOption.id === 'DeleteCanvasButton') {
      // TODO: confirm deletion
      handleDeleteCanvas(id);
    } else {
      console.log('click en otro boton');
    }
    toggleShowContextMenu(false);
  }

  function enableCanvasItemEditing(canvasId) {
    const canvasItem = canvasList.querySelector(`.js-CanvasItem[data-id="${canvasId}"]`)
    if (!canvasItem) return;

    const canvasNameLabel = canvasItem.querySelector('.js-CanvasItem-name');
    canvasNameLabel.setAttribute("contenteditable", "true");
    canvasNameLabel.focus();
    selectElementText(canvasNameLabel);

    const disableEditing = () => canvasNameLabel.removeAttribute("contenteditable");

    // When blur -> disable editing
    canvasNameLabel.onblur = disableEditing;

    canvasNameLabel.onkeydown = (event) => {
      const { keyCode } = event;
      if (keyCode === 13) { // If Press Enter -> Rename canvas
        event.preventDefault();
        disableEditing();
        handleRenameCanvas(canvasId, canvasNameLabel.textContent)
      } else if (keyCode === 27) { // Press Escape -> Disable editting
        disableEditing();
      }
    };
  }

  function toggleSavedCanvasItem(isSaved) {
    const canvasItemSelected = canvasList.querySelector('.js-CanvasItem.is-selected')
    if (!canvasItemSelected) return;

    const indicator = canvasItemSelected.querySelector('.js-CanvasItem-indicator')
    if (isSaved) indicator.classList.add('is-saved');
    else indicator.classList.remove('is-saved');
  }

  function toggleDisplayNewCanvasButtonGroup(isDisplayed) {
    if (isDisplayed) {
      canvasBarSeparator.classList.remove('u-display-none');
      newCanvasButton.classList.remove('u-display-none');
    } else {
      canvasBarSeparator.classList.add('u-display-none');
      newCanvasButton.classList.add('u-display-none');
    }
  }

  return {
    renderCanvases,
    toggleCollapseCanvasBar,
    toggleSavedCanvasItem,
    toggleDisplayNewCanvasButtonGroup,
    changeCanvasItemSelectedById,
  }
}

function templateCanvasItem(name) {
  return `
  <svg class="CanvasItem-icon">
    <use xlink:href="./App/assets/icons/canvas-icon.svg#icon" />
  </svg>
  <div class="CanvasItem-indicator js-CanvasItem-indicator"></div>
  <span class="CanvasItem-name js-CanvasItem-name">${name}</span>
  <div class="CanvasItem-menu js-CanvasItem-menu">
    <svg class="CanvasItem-menuIcon" xmlns="http://www.w3.org/2000/svg" width="15" height="5" viewBox="0 0 15 5" fill="">
      <circle cx="1.97368" cy="2.16656" r="1.97368" fill=""/>
      <circle cx="7.50005" cy="2.16656" r="1.97368" fill=""/>
      <circle cx="13.0264" cy="2.16656" r="1.97368" fill=""/>
    </svg>
  </div>`
}