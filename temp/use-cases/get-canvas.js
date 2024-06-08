import { Canvas } from '../entities/canvas.js';
import { LocalStorageCanvasRepository } from '../repositories/local-storage-canvas.js';

export function caseGetCanvas(id) {
  const repository = LocalStorageCanvasRepository();
  const foundCanvas = repository.getCanvas(id);

  if (foundCanvas) {
    const { id, name, width, height, html } = foundCanvas;
    return Canvas(id, name, width, height, html);
  } else {
    return null;
  }
}
