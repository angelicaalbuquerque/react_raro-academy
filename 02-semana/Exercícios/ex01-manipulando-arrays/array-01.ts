const ingredientes = [
  "2 hambúrgueres",
  "alface",
  "queijo",
  "molho especial",
  "cebola",
  "picles",
  "pão com gergelim",
];

const fazUmBigMac = (ingredientes: string[]): string => {
  return ingredientes.reduce(
    (acumulador, valorAtual) => acumulador + " " + valorAtual,
  );
};

fazUmBigMac(ingredientes);

console.log(fazUmBigMac(ingredientes));
