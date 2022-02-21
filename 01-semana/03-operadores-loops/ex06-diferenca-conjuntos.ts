// 6. Implementar a diferença de a e b

const a = [1, 2, 3, 4, 5, 6];
const b = [4, 4, 5, 6, 7, 8];

const conjuntoDifTemB: any = [];
const conjuntoDifTemA: any = [];

a.map((item) => {
  if (b.indexOf(item) == -1) {
    conjuntoDifTemA.push(item);
  }
});

b.map((item) => {
  if (a.indexOf(item) == -1) {
    conjuntoDifTemB.push(item);
  }
});

conjuntoDifTemA.sort((a: number, b: number) => b - a);
conjuntoDifTemB.sort((a: number, b: number) => a - b);

console.log(`Os números que tem em A e não tem em B são: ${conjuntoDifTemA}`);
console.log(`Os números que tem em B e não tem em A são: ${conjuntoDifTemB}`);
