const desafio1asRosasNaoFalam = async () => {
  const timeout = (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
  const geraIntervaloAleatório = (): number =>
    Math.floor(Math.random() * 3 * 1000);

  const queixoMeAsRosas = async() => {
    const tempo = geraIntervaloAleatório();
    console.log("Queixo-me às rosas");
  };

  const masQueBobagem = async () => {
    const tempo = geraIntervaloAleatório();
    await timeout(tempo);
    console.log("Mas que bobagem");
  };

  const asRosasNaoFalam = async () => {
    const tempo = geraIntervaloAleatório();
    await timeout(tempo);
    console.log("As rosas não falam");
  };

  const simplesmenteAsRosasExalam = async () => {
    const tempo = geraIntervaloAleatório();
    await timeout(tempo);
    console.log("Simplesmente as rosas exalam");
  };

  const oPerfumeQueRoubamDeTi = async () => {
    const tempo = geraIntervaloAleatório();
    await timeout(tempo);
    console.log("O perfume que roubam de ti, ai");
  };

  await queixoMeAsRosas();
  await masQueBobagem();
  await asRosasNaoFalam();
  await simplesmenteAsRosasExalam();
  await oPerfumeQueRoubamDeTi();
};

desafio1asRosasNaoFalam();
