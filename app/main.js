import { CanvasController } from './presentation/controllers/canvas-controller.js';
import UI from './presentation/ui.js';
import { calculateElementsWidth } from './utils/index.js';

const canvasController = CanvasController();

document.addEventListener('DOMContentLoaded', () => {
  canvasController.initApp();
  calculateElementsWidth();
})

document.addEventListener('keydown', canvasController.handleDocumentKeydown)

document.addEventListener('keyup', canvasController.handleDocumentKeyup)
