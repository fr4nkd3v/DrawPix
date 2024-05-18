import { LocalStorageCanvasRepository } from '../repositories/local-storage-canvas.js';

export function caseRenameCanvas(id, name) {
  const repository = LocalStorageCanvasRepository();
  repository.renameCanvas({ id, name });
  return repository.getCanvas(id);
}
