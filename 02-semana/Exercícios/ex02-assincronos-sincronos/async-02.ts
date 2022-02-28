const despertador = (intervaloEmSegundos: number) => {
  console.log(`passaram-se os ${intervaloEmSegundos} segundos`);
};

const relogio = () => {
  const now = new Date();
  console.log(`${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`);
};
relogio();
const segundos = 10;
const milissegundos = segundos * 1000;

setTimeout(() => despertador(segundos), milissegundos);
let clearInt = setInterval(() => relogio(), 1000);
setTimeout(() => clearInterval(clearInt), milissegundos);


// despertador(10);
// relogio();