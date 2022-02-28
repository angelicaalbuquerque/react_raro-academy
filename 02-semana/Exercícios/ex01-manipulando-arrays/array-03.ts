const alunos = [
  { nome: "João", nota: 7.3, bolsista: false },
  { nome: "Maria", nota: 9.2, bolsista: true },
  { nome: "Pedro", nota: 9.8, bolsista: false },
  { nome: "Ana", nota: 8.7, bolsista: true },
];

function pick<T>(array: T[], list: (keyof T)[]): Array<Partial<T>> {
  const arrayResult = array.map(item => {
    let obj: Partial<T> = {};
    list.forEach(key => obj[key] = item[key]);

    return obj;
  })

  return arrayResult;
}

const resultPick = pick(alunos, ["nome", "nota"]);
console.log(alunos)
console.log(resultPick);