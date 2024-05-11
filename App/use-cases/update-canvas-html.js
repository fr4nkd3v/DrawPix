import { LocalStorageCanvasRepository } from '../repositories/local-storage-canvas.js';

export function caseUpdateCanvasHtml({ canvasId, html }) {
  const repository = LocalStorageCanvasRepository();
  repository.updateCanvasHtml({
    canvasId, canvasHtml: html
  });
}