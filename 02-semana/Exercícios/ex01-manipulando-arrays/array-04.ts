const alunos = [
  { nome: "João", nota: 7.3, bolsista: false },
  { nome: "Maria", nota: 9.2, bolsista: true },
  { nome: "Pedro", nota: 9.8, bolsista: false },
  { nome: "Ana", nota: 8.7, bolsista: true },
];

function orderBy<T>(record: T[], args: (keyof T)[]): T[] {
  const arrayResult: T[] = [...record];
  const lenArgs = args.length;
  
  arrayResult.sort((a, b) => {
    for (let i = 0; i < lenArgs; i++) {
      const curKey = args[i];
      if (a[curKey] === b[curKey]) {
        if (i === lenArgs - 1) return 0;
        continue;
      }
      return a[curKey] > b[curKey] ? 1 : -1;
    }
  });

  return arrayResult;
}

console.log(alunos);
console.log(orderBy(alunos, ["nome"]));
console.log(orderBy(alunos, ["bolsista"]));
console.log(orderBy(alunos, ["nota"]));
console.log(orderBy(alunos, ["nota", "nome"]));
console.log(alunos);
