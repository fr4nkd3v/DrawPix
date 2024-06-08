import { LocalStorageCanvasRepository } from '../repositories/local-storage-canvas.js';

export function caseCreateCanvas({ name = 'Untitled', width = 10, height = 10, html }) {
  const repository = LocalStorageCanvasRepository();
  const id = generateId();
  repository.saveCanvas({
    id, name, width, height, html
  });
  return { id, name, width, height, html };
}

function generateId() {
  return crypto.randomUUID();
}