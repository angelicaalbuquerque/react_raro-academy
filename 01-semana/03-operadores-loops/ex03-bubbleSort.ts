// 3. Faça um algoritmo que recebe um array de numeros, e retorne um novo array, com os objetos ordenados. Pede-se que não se utilize métodos prontos do objeto de array, como o [array.sort()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort). Espera-se que você construa o algoritmo por completo. `Dica`: boas escolhas para esta implementação: `bubble sort` ou `selection sort`.

let bubbleSort = function (array: number[]) {
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (array[i] > array[j]) {
        let aux = array[i];
        array[i] = array[j];
        array[j] = aux;
      }
    }
  }
  return array;
};

console.log(bubbleSort([9, 10, 4, 6, 1, 8, 3, 5, 2, 7]));
