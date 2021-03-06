// 2. Faça um algoritmo que recebe três valores numéricos, `a`, `b` e `c`. A partir dos valores recebidos, você precisa verificar se os valores forma um `triângulo equilátero`, um `triângulo isósceles` ou um triângulo escaleno.

function triangulos(a: number, b: number, c: number) {
  if (a === b && a === c) {
    return `"Esse é um triângulo EQUILÁTERO, pois os 3 lados são iguais."`;
  } else if (a === b || a === c || b === c) {
    return `"Esse é um triângulo ISÓSCELES, apenas 2 lados são iguais."`;
  } else {
    return `"Esse é um triângulo ESCALENO, todos os seus lados são diferentes."`;
  }
}

console.log(triangulos(3, 3, 3));
console.log(triangulos(3, 3, 2));
console.log(triangulos(3, 2, 1));
