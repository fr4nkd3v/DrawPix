export function LocalStorageCustomCanvasTemplateRepository() {
  const customCanvasLocalStorageKey = 'custom-canvas-template';

  function getCustomCanvasTemplates() {
    const customCanvasArr = localStorage.getItem(customCanvasLocalStorageKey);
    return customCanvasArr ? JSON.parse(customCanvasArr) : [];
  }

  function saveCustomCanvasTemplate({ width, height }) {
    const rawCustomCanvasArr = localStorage.getItem(customCanvasLocalStorageKey);

    // If no exist data, save first canvas in array
    if (!rawCustomCanvasArr) {
      localStorage.setItem(customCanvasLocalStorageKey, JSON.stringify([{ width, height }]));
      return;
    }

    const customCanvasTemplatesArr = JSON.parse(rawCustomCanvasArr);

    // If exist one template with same dimensions, omit
    const hasSameTemplate = customCanvasTemplatesArr.some(template => (template.width === width && template.height === height))
    if (hasSameTemplate) return;

    // If has more than 9 templates, delete first
    if (customCanvasTemplatesArr.length >= 10) customCanvasTemplatesArr.shift();

    // Else add new template
    customCanvasTemplatesArr.push({ width, height });
    localStorage.setItem(customCanvasLocalStorageKey, JSON.stringify(customCanvasTemplatesArr));
  }

  return {
    getCustomCanvasTemplates,
    saveCustomCanvasTemplate,
  }
}