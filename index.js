
/**
 * OBJECTIF : obtenir le résultat d'un calcul d'entiers à partir d'une variable de type string
 * Etapes : 
 * --> analyser la variable string
 * --> récupérer les entiers 
 * --> récupérer les symboles
 * --> supprimer les espaces
 * --> gestion des priorités
 * --> réaliser le calcul
 * --> afficher le résultat
 */

/* ================ FORM ================ */

 const init = function(){
  let form = document.getElementById('calcul');
  form.addEventListener('submit', getItem);
}

// function to get the user input
const getItem = function(event){
  event.preventDefault();
  let input = document.getElementById('calcul-input');
  let value = input.value;
  additionCalculator(value);
}

/* ================= CALCULATOR ============== */

// split the input value in terms of parenthesis
const split = function (value, operator) {
	const result = [];
	let parenthesis = 0;
	let splitValue = "";
	for (let i = 0; i < value.length; ++i) {
		const partValue = value[i];
		if (partValue == '(') {
			parenthesis++;
		} else if (partValue == ')') {
			parenthesis--;
		}
		if (parenthesis == 0 && operator == partValue) {
			result.push(splitValue);
			splitValue = "";
		} else splitValue += partValue;
	}
	if (splitValue != "") {
		result.push(splitValue);
	}
	return result;
};

// split input value by "+"
const additionCalculator = function (value) {
  const initialValue=0;
  const valueArray = split(value, '+');
  const valueNumber = valueArray.map(x => substractionCalculator(x));
  const result = valueNumber.reduce((x,y) => x+y, initialValue);
  console.log(result);
  return result;
}

// split input value by "*"
const multiplicationCalculator = function (value) {
  const initialValue=1;
  const valueArray = split(value, '*');
  const valueNumber = valueArray.map(x => {
    if (x[0] == '(') {
      const expression = x.substr(1, x.length-2);
      return additionCalculator(expression);
    }
    return +x;
  });
  const result = valueNumber.reduce((x,y) => x*y, initialValue)
  return result;
}

// split input value by "/"
const divisionCalculator = function (value) {
  const initialValue=1;
  const valueArray = split(value, '/');
  const valueNumber = valueArray.map(x => {
    if (x[0] == '(') {
      const newValue = x.substr(1, x.length-2);
      return additionCalculator(newValue);
    }
    return +x;
  });
  const result = valueNumber.reduce((x,y) => x/y, initialValue)
  return result;
}

// split input value by "-"
const substractionCalculator = function (value) {
  const valueArray= split(value, '-');
  const valueNumber=valueArray.map(x => multiplicationCalculator(x));
  const initialValue = valueNumber[0];
  const result = valueNumber.slice(1).reduce((x,y) => x-y, initialValue);
  return result;
}

document.addEventListener('DOMContentLoaded', init);