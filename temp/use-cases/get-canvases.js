import { Canvas } from '../entities/canvas.js';
import { LocalStorageCanvasRepository } from '../repositories/local-storage-canvas.js';

export function caseGetCanvases() {
  const repository = LocalStorageCanvasRepository();
  const canvasData = repository.getCanvases();

  const canvases = canvasData.map(data => {
    const { id, name, width, height, html } = data;
    return Canvas(id, name, width, height, html);
  });

  return canvases;
}
