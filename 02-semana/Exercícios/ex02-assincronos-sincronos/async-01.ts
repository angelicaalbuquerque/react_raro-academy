const desafio1asRosasNaoFalam = () => {
  type callbackFn = () => void;
  const geraIntervaloAleatório = (): number =>
    Math.floor(Math.random() * 3 * 1000);

  // métodos de versos. Estes métodos deverão ser modificados.
  const queixoMeAsRosas = (callbackFn: callbackFn) => {
    setTimeout(() => {
      console.log("Queixo-me às rosas");
      callbackFn();
    }, geraIntervaloAleatório());
  };

  const masQueBobagem = (callbackFn: callbackFn) => {
    return () => {
      setTimeout(() => {
        console.log("Mas que bobagem");
        callbackFn();
      }, geraIntervaloAleatório());
    }
  };

  const asRosasNaoFalam = (callbackFn: callbackFn) => {
    return () => {
      setTimeout(() => {
        console.log("As rosas não falam");
        callbackFn();
      }, geraIntervaloAleatório());
    }
  };

  const simplesmenteAsRosasExalam = (callbackFn: callbackFn) => {
    return () => {
      setTimeout(() => {
        console.log("Simplesmente as rosas exalam");
        callbackFn();
      }, geraIntervaloAleatório());
    }
  };

  const oPerfumeQueRoubamDeTi = (callbackFn: callbackFn) => {
    return () => {
      setTimeout(() => {
        console.log("O perfume que roubam de ti, ai");
        callbackFn();
      }, geraIntervaloAleatório());
    }
  };

  // Tentativa de cantar a música. Este bloco precisa ser modificado.
  queixoMeAsRosas(
    masQueBobagem(
      asRosasNaoFalam(
        simplesmenteAsRosasExalam(
          oPerfumeQueRoubamDeTi(() => {})
        )
      )
    )
  );
};

desafio1asRosasNaoFalam();