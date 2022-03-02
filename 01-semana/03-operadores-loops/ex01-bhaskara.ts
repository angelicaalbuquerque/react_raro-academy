// 1. Faça um algoritmo que calcule a fórmula de equação quadrática ("fórmula de bháskara"). Imagino que você fará bom uso da https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math

alert("Vamos calcular a fórmula de Bháskara?");
const valorA: number = Number(prompt("Informe o valor de A: "));
const valorB: number = Number(prompt("Agora, informe o valor de B: "));
const valorC: number = Number(prompt("Por último, informe o valor de C: "));

const delta = valorB * valorB - 4 * valorA * valorC;

const resultadoPositivo = (-valorB + Math.sqrt(delta)) / (2 * valorA);
const resultadoNegativo = (-valorB - Math.sqrt(delta)) / (2 * valorA);

if (delta < 0) {
  alert("Não pode ser aplicada a fórmula. Delta não pode ser igual a 0");
} else {
  alert(
    "x' = " + resultadoPositivo + "\n" + "x'' = " + resultadoNegativo + "\n",
  );
}
