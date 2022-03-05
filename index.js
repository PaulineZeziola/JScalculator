
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
  const result = additionCalculator(value);
  console.log(result);
}

/* ================= CALCULATOR ============== */

// split the input value in terms of parenthesis and operator
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
  return result;
}

// split input value by "*"
const multiplicationCalculator = function (value) {
  const initialValue=1;
  const valueArray = split(value, '*');
  const valueNumber = valueArray.map(x => {
    console.log(x);
    if (x[0] == '(') {
      const newValue = x.substr(1, x.length-3);
      return additionCalculator(newValue);
    }
    if (x[0] == ' ') {
      const newValue = x.substr(1, x.length-1);
      return additionCalculator(newValue);
    }
    return divisionCalculator(x);
  });
  const result = valueNumber.reduce((x,y) => x*y, initialValue)
  return result;
}

// split input value by "/"
const divisionCalculator = function (value) {
  const valueArray = split(value, '/');
  const valueNumber = valueArray.map(x => {
    if (x[0] == '(') {
      const newValue = x.substr(1, x.length-3);
      return additionCalculator(newValue);
    }
    if (x[0] == ' ') {
      const newValue = x.substr(1, x.length-1);
      return additionCalculator(newValue);
    }
    return +x;
  });
  const result = valueNumber.reduce((x,y) => x/y)
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