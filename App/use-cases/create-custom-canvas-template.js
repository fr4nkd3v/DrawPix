import { LocalStorageCustomCanvasTemplateRepository } from '../repositories/local-storage-custom-canvas-template.js';

export function caseCreateCustomCanvasTemplate({ width, height }) {
  const repository = LocalStorageCustomCanvasTemplateRepository();
  repository.saveCustomCanvasTemplate({ width, height });
}