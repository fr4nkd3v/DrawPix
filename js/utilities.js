
// FUNCIONES DE TIPO "UTILIDADES" QUE RECIBEN Y RETORNAN VALORES
// Similares a las funciones puras, son atilidades para las funciones principales


// A (String) Devuelve el background-color de un elemento
//   Recibe un elemento del DOM
//   Retorna un String que representa un Color
const getColor = element => {
  let color = window.getComputedStyle(element, null)
    .getPropertyValue("background-color");
  return color;
}

// B (Boolean) Valida si un dato ingresado es un número
//   Recibe un número (o debería)
//   Retorna true o false
const isValidNumber = value => Number.isInteger(value)

// C (Boolean) Verifica si un nombre es válido
//   Recibe un String
//   Retorna true o false
const isValidName = str => (str.trim().length > 0)