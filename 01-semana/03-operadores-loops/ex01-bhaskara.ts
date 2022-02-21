// 1. Faça um algoritmo que calcule a fórmula de equação quadrática ("fórmula de bháskara"). Imagino que você fará bom uso da https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math

alert("Vamos calcular a fórmula de Bháskara?");
let valorA: number = Number(prompt("Informe o valor de A: "));
let valorB: number = Number(prompt("Agora, informe o valor de B: "));
let valorC: number = Number(prompt("Por último, informe o valor de C: "));

let delta = valorB * valorB - 4 * valorA * valorC;

let resultadoPositivo = (-valorB + Math.sqrt(delta)) / (2 * valorA);
let resultadoNegativo = (-valorB - Math.sqrt(delta)) / (2 * valorA);

if (delta < 0) {
  alert("Não pode ser aplicada a fórmula. Delta não pode ser igual a 0");
} else {
  alert(
    "x' = " + resultadoPositivo + "\n" + "x'' = " + resultadoNegativo + "\n",
  );
}
