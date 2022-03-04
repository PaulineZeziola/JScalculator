
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

// function to listen submit event on form
 const init = function(){
  let form = document.getElementById('calcul');
  form.addEventListener('submit', getItem);
}

// function to get the user input
const getItem = function(event){
  event.preventDefault();
  let input = document.getElementById('calcul-input');
  let value = input.value;
  cleanInput();
  calculator(value);
}

const cleanInput = function(){
  let input = document.getElementById('calcul-input');
  input.value = "";
}

const calculator = function (value) {
  console.log(value);
}
document.addEventListener('DOMContentLoaded', init);