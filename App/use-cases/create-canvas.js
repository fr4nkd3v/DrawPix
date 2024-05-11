import { LocalStorageCanvasRepository } from '../repositories/local-storage-canvas.js';

export function caseCreateCanvas({ name = 'Untitled', width = 10, height = 10, html = template10x10}) {
  const repository = LocalStorageCanvasRepository();
  const id = generateId();
  repository.saveCanvas({
    id, name, width, height, html
  });
  return id;
}

function generateId() {
  return crypto.randomUUID();
}

const template10x10 = `
  <div class="CanvasEditor-wrapper" style="width: auto; height: auto; grid-template-columns: repeat(10, 44.8px); grid-template-rows: repeat(10, 44.8px);">
    <div id="block-0-0" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-0-1" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-0-2" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-0-3" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-0-4" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-0-5" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-0-6" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-0-7" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-0-8" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-0-9" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-1-0" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-1-1" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-1-2" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-1-3" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-1-4" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-1-5" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-1-6" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-1-7" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-1-8" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-1-9" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-2-0" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-2-1" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-2-2" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-2-3" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-2-4" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-2-5" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-2-6" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-2-7" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-2-8" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-2-9" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-3-0" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-3-1" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-3-2" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-3-3" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-3-4" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-3-5" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-3-6" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-3-7" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-3-8" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-3-9" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-4-0" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-4-1" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-4-2" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-4-3" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-4-4" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-4-5" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-4-6" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-4-7" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-4-8" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-4-9" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-5-0" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-5-1" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-5-2" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-5-3" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-5-4" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-5-5" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-5-6" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-5-7" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-5-8" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-5-9" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-6-0" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-6-1" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-6-2" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-6-3" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-6-4" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-6-5" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-6-6" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-6-7" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-6-8" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-6-9" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-7-0" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-7-1" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-7-2" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-7-3" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-7-4" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-7-5" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-7-6" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-7-7" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-7-8" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-7-9" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-8-0" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-8-1" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-8-2" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-8-3" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-8-4" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-8-5" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-8-6" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-8-7" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-8-8" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-8-9" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-9-0" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-9-1" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-9-2" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-9-3" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-9-4" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-9-5" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-9-6" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-9-7" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-9-8" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div><div id="block-9-9" class="js-CanvasEditor-pixel CanvasEditor-pixel"></div>
  </div>
`;