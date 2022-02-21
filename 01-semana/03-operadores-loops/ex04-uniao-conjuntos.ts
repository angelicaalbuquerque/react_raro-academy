// Para os exercícios 4, 5 e 6, considere os dois conjuntos abaixo:

// const a = [1, 2, 3, 4, 5, 6];
// const b = [4, 4, 5, 6, 7, 8];

// 4. Implementar a união dos grupos a e b. Os valores do objeto resultante devem ser todos únicos

function conjuntosUniao() {
  const a = [1, 2, 3, 4, 5, 6];
  const b = [4, 4, 5, 6, 7, 8];

  let numeroDuplicado = false;

  for (let indexb = 0; indexb <= b.length; indexb++) {
    for (let indexa = 0; indexa <= a.length; indexa++) {
      if (b[indexb] == a[indexa]) {
        numeroDuplicado = true;
      }
    }

    if (!numeroDuplicado) {
      a[a.length] = b[indexb];
    } else {
      numeroDuplicado = false;
    }
  }
  return a;
}

console.log(conjuntosUniao());
