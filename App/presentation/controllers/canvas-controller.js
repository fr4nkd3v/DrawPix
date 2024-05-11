import { caseGetCanvases } from '../../use-cases/get-canvases.js';
import { caseCreateCanvas } from '../../use-cases/create-canvas.js';
import { caseGetCanvas } from '../../use-cases/get-canvas.js';
import { caseRenameCanvas } from '../../use-cases/rename-canvas.js';
import { caseDeleteCanvas } from '../../use-cases/delete-canvas.js';
import { caseUpdateCanvasHtml } from '../../use-cases/update-canvas-html.js';
import { caseGetCustomCanvasTemplates } from '../../use-cases/get-custom-canvas-templates.js';
import { caseCreateCustomCanvasTemplate } from '../../use-cases/create-custom-canvas-template.js';

import { CanvasBarView } from '../components/canvas-bar.js';
import { WelcomePanelView } from '../components/welcome-panel.js';
import { CanvasEditorView } from '../components/canvas-editor.js';
import { HeaderView } from '../components/header.js';
import { SettingsBarView } from '../components/settings-bar.js';

import { DEFAULT_COLOR_PALETTE } from '../../constants/index.js';

export function CanvasController() {
  let selectedCanvasId = null;
  let selectedColor = null;
  let selectedTool = 'brush'; // support: 'brush' | 'eraser'
  let selectedPressedTool = null; // support: null | 'brush' | 'eraser'

  const canvasBarView = CanvasBarView({
    handleNewCanvasClick,
    handleCanvasSelection,
    handleRenameCanvas,
    handleDeleteCanvas,
  });
  const welcomePanelView = WelcomePanelView({
    handleCanvasByWidthAndHeightClick,
    listCustomCanvasTemplates,
    createCustomTemplate,
  });
  const settingsBarView = SettingsBarView({
    setSelectedColor,
    selectBrushTool,
    selectEraserTool,
    setBrushPressed,
    setEraserPressed,
    unsetToolPressed,
    handleEraseAllPixels,
    handleUpdateCanvasHtml,
  });
  const canvasEditorView = CanvasEditorView({
    getSelectedColor,
    isBrushToolPressed,
    isEraserToolPressed,
    isBrushToolSelected,
    isEraserToolSelected,
    toggleSavedCanvasItem: canvasBarView.toggleSavedCanvasItem,
  });
  const headerView = HeaderView(canvasBarView.toggleCollapseCanvasBar);

  function initApp() {
    listCanvases();
    welcomePanelView.showWelcomePanel();
    canvasBarView.toggleDisplayNewCanvasButtonGroup(false);
    settingsBarView.renderColorPalette(DEFAULT_COLOR_PALETTE.colorPalette, DEFAULT_COLOR_PALETTE.id);
    settingsBarView.changePaletteDropdownPreview(DEFAULT_COLOR_PALETTE.colorPalette);
    settingsBarView.renderColorPaletteItems();
    settingsBarView.toggleDisplaySettingsBar(false);
  }

  const setSelectedCanvasId = id => selectedCanvasId = id;
  const getSelectedCanvasId = () => selectedCanvasId;

  // Canvas Bar
  function listCanvases() {
    const canvases = caseGetCanvases();
    canvasBarView.renderCanvases(canvases);
  }

  function handleCanvasSelection(canvasId) {
    setSelectedCanvasId(canvasId);
    const foundCanvas = caseGetCanvas(canvasId);
    if (foundCanvas) loadCanvasInEditor(foundCanvas);
  }

  function handleNewCanvasClick() {
    // caseCreateCanvas({...canvas});
    // listCanvases();
    welcomePanelView.showWelcomePanelAsModal();
  }

  function handleRenameCanvas(id, name) {
    caseRenameCanvas(id, name);
  }

  function handleDeleteCanvas(id) {
    caseDeleteCanvas(id);
    canvasEditorView.clearCanvas();
    welcomePanelView.showWelcomePanel();
    canvasBarView.toggleDisplayNewCanvasButtonGroup(false);
    listCanvases();
  }

  // Welcome Panel
  function handleCanvasByWidthAndHeightClick({ width, height }) {
    const canvasHtml = generateCanvasHtml({width, height});
    const generatedId = caseCreateCanvas({width, height, html: canvasHtml});
    listCanvases();
    setSelectedCanvasId(generatedId);
    canvasBarView.changeCanvasItemSelectedById(generatedId);
  }

  function listCustomCanvasTemplates() {
    return caseGetCustomCanvasTemplates();
  }

  function createCustomTemplate({ width, height }) {
    caseCreateCustomCanvasTemplate({ width, height });
  }


  // Canvas Editor
  function generateCanvasHtml(canvas) {
    const { width, height } = canvas;
    const generatedHtml = canvasEditorView.generateCanvasHtml(width, height);
    settingsBarView.toggleDisplaySettingsBar(true);
    canvasBarView.toggleDisplayNewCanvasButtonGroup(true);
    return generatedHtml;
  }

  function loadCanvasInEditor(canvas) {
    const { html } = canvas;
    canvasEditorView.loadCanvas(html);
    settingsBarView.toggleDisplaySettingsBar(true);
    canvasBarView.toggleDisplayNewCanvasButtonGroup(true);
  }

  // Settings Bar
  function handleEraseAllPixels() {
    canvasEditorView.eraseAllPixels();
  }

  function handleUpdateCanvasHtml() {
    const canvasId = getSelectedCanvasId();
    const html = canvasEditorView.getCanvasHtml();
    caseUpdateCanvasHtml({canvasId, html});
    canvasBarView.toggleSavedCanvasItem(true);
  }

  // General
  function setSelectedTool(toolName) {
    selectedTool = toolName;
  }
  function selectBrushTool() {
    setSelectedTool('brush');
    canvasEditorView.changeCanvasEditorIfBrushPressed();
    settingsBarView.selectBrushToolButton();
    if (isEraserToolPressed()) unsetToolPressed();
  }
  function selectEraserTool() {
    setSelectedTool('eraser');
    canvasEditorView.changeCanvasEditorIfEraserPressed();
    settingsBarView.selectEraserToolButton();
    if (isBrushToolPressed()) unsetToolPressed();
  }

  function getSelectedTool() {
    return selectedTool;
  }
  function isBrushToolSelected() { return getSelectedTool() === 'brush'; }
  function isEraserToolSelected() { return getSelectedTool() === 'eraser'; }

  function setSelectedColor(color) {
    selectedColor = color;
  }
  function getSelectedColor() {
    return selectedColor;
  }

  function setBrushPressed() {
    selectedPressedTool = 'brush';
    settingsBarView.changeSwitchPressBrushChecked(true);
    settingsBarView.changeSwitchPressEraserChecked(false);
    selectBrushTool();
  }
  function isBrushToolPressed() {
    return selectedPressedTool === 'brush';
  }

  function setEraserPressed() {
    selectedPressedTool = 'eraser';
    settingsBarView.changeSwitchPressEraserChecked(true);
    settingsBarView.changeSwitchPressBrushChecked(false);
    selectEraserTool();
  }
  function isEraserToolPressed() {
    return selectedPressedTool === 'eraser';
  }

  function unsetToolPressed() {
    selectedPressedTool = null;
    settingsBarView.changeSwitchPressBrushChecked(false);
    settingsBarView.changeSwitchPressEraserChecked(false);
  }

  function handleDocumentKeydown(event) {
    if (event.key === 'Control') setBrushPressed();
    else if (event.key === 'Shift') setEraserPressed();
  }
  function handleDocumentKeyup(event) {
    if (event.key === 'Control') unsetToolPressed();
    else if (event.key === 'Shift') unsetToolPressed();
  }

  return {
    initApp,
    handleDocumentKeydown,
    handleDocumentKeyup,
  };
}