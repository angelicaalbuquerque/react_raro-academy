// 5. Implementar a interseção dos gupos a e b.

const a = [1, 2, 3, 4, 5, 6];
const b = [4, 4, 5, 6, 7, 8];

let conjuntosInter: number[] = [];

a.map((item) => {
  if (b.indexOf(item) !== -1) {
    conjuntosInter.push(item);
  }
});

console.log(conjuntosInter);
