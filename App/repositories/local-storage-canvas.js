export function LocalStorageCanvasRepository() {
  const canvasLocalStorageKey = 'canvases';

  const getCanvases = () => {
    const canvasData = localStorage.getItem(canvasLocalStorageKey);
    return canvasData ? JSON.parse(canvasData) : [];
  }

  const getCanvas = (id) => {
    const rawCanvasData = localStorage.getItem(canvasLocalStorageKey);
    if (!rawCanvasData) return null

    const canvasesArr = JSON.parse(rawCanvasData);
    const foundCanvas = canvasesArr.find(canvas => canvas.id === id);

    return foundCanvas ?? null;
  }

  const saveCanvas = (canvas) => {
    const rawCanvasData = localStorage.getItem(canvasLocalStorageKey);

    // If no exist data, save first canvas in array
    if (!rawCanvasData) {
      localStorage.setItem(canvasLocalStorageKey, JSON.stringify([canvas]));
      return;
    }
    const canvasData = JSON.parse(rawCanvasData);

    // If exist one canvas with same id, update canvas
    let isUpdated = false;
    const newCanvasData = canvasData.map(_canvas => {
      if (_canvas.id === canvas.id) {
        isUpdated = true;
        return canvas
      } else {
        return _canvas;
      }
    });

    // Else add new canvas to array
    if (!isUpdated) newCanvasData.push(canvas);

    localStorage.setItem(canvasLocalStorageKey, JSON.stringify(newCanvasData));
  }

  const renameCanvas = ({ id, name }) => {
    const rawCanvasData = localStorage.getItem(canvasLocalStorageKey);

    if (!rawCanvasData) { // If no exist data
      // ! HANDLE ERROR
      return;
    }

    const canvasData = JSON.parse(rawCanvasData);

    // If exist one canvas with same id, update canvas
    let isUpdated = false;
    const newCanvasData = canvasData.map(_canvas => {
      if (_canvas.id === id) {
        isUpdated = true;
        return {..._canvas, name}
      } else {
        return _canvas;
      }
    });

    if (!isUpdated) { // Else, handle error
      // ! HANDLE ERROR
      return;
    }

    localStorage.setItem(canvasLocalStorageKey, JSON.stringify(newCanvasData));
  }

  const deleteCanvas = (id) => {
    const rawCanvasData = localStorage.getItem(canvasLocalStorageKey);
    // If no exist data -> out
    if (!rawCanvasData) return;

    const canvasData = JSON.parse(rawCanvasData);
    const newCanvasData = canvasData.filter(canvas => canvas.id !== id)

    localStorage.setItem(canvasLocalStorageKey, JSON.stringify(newCanvasData));
  }

  const updateCanvasHtml = ({ canvasId, canvasHtml }) => {
    const rawCanvasData = localStorage.getItem(canvasLocalStorageKey);
    if (!rawCanvasData) return;

    const canvasArray = JSON.parse(rawCanvasData);
    const newCanvasArray = canvasArray.map(canvas => {
      if (canvas.id === canvasId) {
        return { ...canvas, html: canvasHtml}
      } else {
        return canvas;
      }
    });

    localStorage.setItem(canvasLocalStorageKey, JSON.stringify(newCanvasArray));
  }

  return {
    getCanvases,
    getCanvas,
    saveCanvas,
    renameCanvas,
    deleteCanvas,
    updateCanvasHtml,
  }
}
