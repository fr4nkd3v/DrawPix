import UI from '../ui.js'

export function HeaderView(onMenuClick) {
  const menu = UI.menu;

  menu.addEventListener('click', handleMenuClick);

  function handleMenuClick() {
    toggleCollapseMenu();
    onMenuClick();
  }

  function toggleCollapseMenu() {
    menu.classList.toggle('is-collapsed');
  }
}