import { LocalStorageCanvasRepository } from '../repositories/local-storage-canvas.js';

export function caseDeleteCanvas(id) {
  const repository = LocalStorageCanvasRepository();
  repository.deleteCanvas(id);
}
