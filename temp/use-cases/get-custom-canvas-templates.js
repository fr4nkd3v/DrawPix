import { LocalStorageCustomCanvasTemplateRepository } from '../repositories/local-storage-custom-canvas-template.js';

export function caseGetCustomCanvasTemplates() {
  const repository = LocalStorageCustomCanvasTemplateRepository();
  return repository.getCustomCanvasTemplates();
}