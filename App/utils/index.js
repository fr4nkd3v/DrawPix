export function selectElementText(element) {
  const range = document.createRange();
  range.selectNodeContents(element);

  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
}

export function calculateElementsWidth() {
  const elements = document.querySelectorAll('.u-calcWidth');
  elements.forEach(element => {
    const widthValue = getComputedStyle(element).getPropertyValue('width')
    element.style.setProperty('--width', widthValue);
  })
}

export function createElement(tagName, { id, className, dataset, style }) {
  const element = document.createElement(tagName);
  if (id) element.id = id;
  if (className) element.className = className;
  if (dataset) {
    for (const property in dataset) {
      element.dataset[property] = dataset[property];
    }
  }
  if (style) {
    for (const property in style) {
      element.style.setProperty(property, style[property]);
    }
  }
  return element;
}

export function parsePixelSizeToNumber(size = '0px', decimalLength = 0) {
  const formattedSize = size.slice(0, -2);
  let number = isValidNumber(formattedSize) ? Number(formattedSize) : 0;
  if (decimalLength && decimalLength > 0) {
    number = Number(number.toFixed(decimalLength))
  }
  return number;
}

// A (String) Devuelve el background-color de un elemento
//   Recibe un elemento del DOM
//   Retorna un String que representa un Color
// export const getColor = element => {
//   let color = window.getComputedStyle(element, null)
//     .getPropertyValue("background-color");
//   return color;
// }

// B (Boolean) Valida si un dato ingresado es un número
//   Recibe un número (o debería)
//   Retorna true o false
export function isValidNumber(value) {
  if (typeof value === 'string') {
    value = Number(value);
  }

  return (isFinite(value) && !isNaN(value));
}

// C (Boolean) Verifica si un nombre es válido
//   Recibe un String
//   Retorna true o false
// export const isValidName = str => (str.trim().length > 0);

export function getComputedStyleProperty (element, property) {
  const value = getComputedStyle(element).getPropertyValue(property);
  return value;
}