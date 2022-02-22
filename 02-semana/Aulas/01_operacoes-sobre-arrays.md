# Operações sobre arrays

- Arrays são estruturas muito extremamente úteis na construção de aplicações, e por isso, saber manipular estes objetos é importante.
- O [prototype](https://www.tutorialsteacher.com/javascript/prototype-in-javascript) de arrays em javascript nos fornece diversas funções para manipulação destes. Uma lista enorme de operações estão presentes [aqui](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array).
- Abaixo, vamos estudar alguns dos mais úteis para nosso uso diário.

## adicionando/removendo itens do array

- os principais métodos para adicionar/remover itens nos arrays são os métodos de `push`, `pop`

```ts
// declaração do array.
const numeros = [];
// adicionando um valor qualquer
numeros.push(1);
console.log(numeros.length, numeros);

// repare que o método de push adiciona um novo elemento ao fim do seu array.
numeros.push(2);
console.log(numeros.length, numeros);

// o pop retira o elemento da última posição do array, e retorna este valor.
const numero = numeros.pop();
console.log("numero retirado do array", numero);
console.log(numeros.length, numeros);
```

- Os métodos de `unshift`/`shift` fazem o mesmo que o par push/pop. Porém, operam no início do array.

```ts
const numeros = [];
numeros.unshift(1);
console.log(numeros.length, numeros);

numeros.unshift(2);
console.log(numeros.length, numeros);

const numero = numeros.shift();
console.log("numero retirado do array", numero);
console.log(numeros.length, numeros);
```

- Repare que em ambos os casos, as operações modificam nosso array original. Se eu quisesse fazer estas operações de forma imutável, ou seja, se eu quisesse que meu array original não fosse modificado, seria necessário sempre produzir uma nova cópia do objeto. Uma forma viável de fazer estas operações em um paradigma "funcional" seria conforme abaixo:

```ts
const push = (numeros: number[], numero: number) => [...numeros, numero];
const pop = (numeros: number[]) => numeros.slice(-1)[0];
const unshift = (numeros: number[], numero: number) => [numero, ...numeros];
const shift = (numeros: number[]) => numeros.slice(0, 1)[0];

const numeros = [1, 2, 3, 4];
push(numeros, 5); // [1, 2, 3, 4, 5]
pop(numeros); // 4
unshift(numeros, 0); // [0, 1, 2, 3, 4]
shift(numeros); // 1
```

- existe ainda a possibilidade de acessar as posições do array diretamente, através da chamado ao índice deste array entre colchetes. Apesar do uso desta modalidade para **acessar** os objetos ser comum, **modificar** uma posição através do índice é um pouco menos utilizado

```ts
function intersecao(conjuntoA, conjuntoB) {
  const resultante = [];
  for (let i = 0; i < conjuntoA.length; i++) {
    for (let j = 0; j < conjuntoB.length; j++) {
      if (conjuntoA[i] === conjuntoB[j]) {
        // por que não simplesmente um resultante.push?
        resultante[resultante.length] = conjuntoA[i];
        break;
      }
    }
  }

  return resultante;
}

const a = [1, 2, 3, 4, 5, 6];
const b = [3, 4, 5, 6, 6, 7];
intersecao(a, b);
```

## slice e splice

### slice

- são métodos de manipular subarrays dentro do conjunto original
- o método de slice permite retornar subpartes do array, sem modificar o conjunto original.

```ts
function paginacao(items: unknown[], pagina: number, itensPorPagina: number) {
  const inicio = (pagina - 1) * itensPorPagina;
  const fim = pagina * itensPorPagina;
  return items.slice(inicio, fim);
}

const animais = ["gato", "cachorro", "elefante", "leão", "arara"];
paginacao(animais, 1, 2); // ["gato", "cachorro"]
paginacao(animais, 2, 2); // ["elefante", "leão"]
paginacao(animais, 3, 2); // ["arara"]
console.log(animais); // ['gato', 'cachorro', 'elefante', 'leão', 'arara']
```

- o slice recebe parâmetros de início e fim, sendo o fim exclusivo (a posição do array definida no fim não pertence a resultante)

```ts
const numeros = [1, 2, 3, 4, 5, 6];
numeros.slice(1, 2); // [2, 3, 4]
numeros.slice(3); // [4, 5, 6]
numeros.slice(-2); // [5, 6]
```

### splice

- o splice tem o comportamento semelhante ao `slice`, porém altera o array original, retirando o subarray resultante da operação.
- importante notar que o `slice` utiliza os argumentos como as posições de `inicio` e `fim` do subarray. O `splice` entende os valores como `inicio` e `quantidadeDeItens`. Caso `quantidadeDeItens` não é informado, o splice consome todo o restante do array.

```ts
const numeros = [1, 2, 3, 4, 5, 6];
const subArray = numeros.splice(4, 2);
console.log(subArray); // [5, 6]
console.log(numeros); // [1, 2, 3, 4]
```

- o splice permite ainda adicionar itens no array, em uma posição qualquer.

```ts
const comidasQueGosto = ["arroz", "feijao", "batatas", "macarrão"];
// este método retira o valor "batatas" e adiciona dois novos valores,
// "carne" e "salada". Se eu não quiser remover "batatas", basta
// substituir o valor de fim do sub array por 0.
comidasQueGosto.splice(2, 1, "carne", "salada");
console.log(comidasQueGosto);
```

## iteradores

- estes métodos são utilitários que executam loops nos itens dos arrays e executam alguma operação, a ser definida pelo usuário do método, através de um `callback`.
- é muito comum que se utilizem estes métodos iteradores para operar sobre os arrays. Eu prefiro o uso destes métodos aos loops normais da linguagem (por hábito ou estilo, principalmente).
- são diversos os métodos, cada um com uma proposta e resultando em situações diferentes. Estas serão demonstradas a seguir

### forEach

- método utilizado para iterar por todo o array.
- não retorna nenhum valor nem modifica o array\*
- útil para operações que precisam iterar todo o array: não há meios de interromper a execução do loop antes do fim do array.
- pode ser utilizado para modificar objetos não-primitivos de uma coleção de elementos.

```ts
const numeros = [1, 2, 3, 4, 5, 6];
numeros.forEach((numero) => {
  numero *= 2;
  console.log(numero);
});

// apesar do forEach tentar modificar os itens do array,
// estes não seriam modificados.
console.log(numeros);
```

```ts
type Personagem = {
  descricao: string;
  level: number;
  progresso: number;
};
const personagem: Personagem[] = [
  { descricao: "elfo", level: 1, progresso: 50 },
  { descricao: "hobbit", level: 1, progresso: 100 },
  { descricao: "anão", level: 1, progresso: 99 },
];

console.log("antes da missão", personagem);
personagem.forEach((personagem) => {
  if (personagem.progresso === 100) {
    personagem.level++;
    console.log(personagem.descricao, "subiu de nível");
  }
});

console.log("depois da missão", personagem);
```

```ts
// existe uma possibilidade de alterar os valores do array, por mais que sejam
// valores primitivos. Mas não recomendo este uso (apesar do acesso ao índice
// como segundo argumento ser algo bem útil).
const numeros = [1, 2, 3, 4, 5, 6];
numeros.forEach((value, index, arr) => {
  arr[index] = value * 2;
});

console.log(numeros);
```

### map

- Este método também itera sobre todos os objetos do array
- Produz como retorno um novo array, com o mesmo tamanho do original, modificado de acordo com a função de `callback`, porém sem modificar o array original\*
  - assim como o forEach, há meios de alterar os elementos originais. Porém, não se recomenda que o faça, já que o propósito de um loop de map não é este.
- excelente para operações que precisam de toda a lista de itens do array modificados por determinada regra de negócio.
- considerado um `anti-pattern` caso o valor de retorno dele não seja necessário.

```ts
// método muito útil para produzir um conjunto modificado de elementos, sem alterar
// o original
const numeros = [1, 2, 3];
const dobros = numeros.map((n) => n * 2);
const triplos = numeros.map((n) => n * 3);

// forma elegante de fazer parse de um conjunto de valores
["1", "2", "3"].map(parseInt);

// outro exemplo do uso de funções pre-existentes no map.
function getItensAleatorios(quantidade: number) {
  return Array.from(new Array(quantidade)).map(Math.random);
}

console.log(getItensAleatorios(10));
```

```ts
const personagem = [
  { descricao: "elfo", level: 1, progresso: 50 },
  { descricao: "hobbit", level: 1, progresso: 100 },
  { descricao: "anão", level: 1, progresso: 99 },
];

const descricoes = personagem.map((personagem) => personagem.descricao);
// caso eu queira retornar uma quantidade limitada de propriedades de um objeto
const descricoes = personagem.map(({ descricao, ..._ }) => ({ descricao }));
console.log(descricoes);
```

### filter

- este método passa por todos os itens do array, e retorna um novo array com os itens que passaram pela condição definida pelo `callback`.
- o callback deve retornar um valor `truthy` para os itens que devem ser retornados.

```ts
const jogadores = [
  { nome: "Cristiano Ronaldo", pais: "Portugal " },
  { nome: "Johan Cruijff", pais: "Países Baixos" },
  { nome: "Lionel Messi", pais: "Argentina" },
  { nome: "Marco van Basten", pais: "Países Baixos" },
  { nome: "Ronaldo", pais: "Brasil" },
  { nome: "Michel Platini", pais: "França" },
  { nome: "Kaká", pais: "Brasil" },
];

const jogadoresDoBrasil = jogadores.filter(
  (jogador) => jogador.pais === "Brasil",
);
// resultado:
// [
//   { nome: 'Ronaldo', pais: 'Brasil' },
//   { nome: 'Kaká', pais: 'Brasil' }
// ]
```

### find

- muito semelhante ao filter, porém retorna o primeiro registro da coleção que passou pela condição definida pelo `callback`;
- importante notar a diferença: o filter encontra todas as ocorrências que batem com a consulta, em formato de array. O find retorna apenas o primeiro registro da coleção que atende a condição.
- ao encontrar o valor desejado, o loop é interrompido e o valor é retornado.

```ts
const jogadores = [
  { nome: "Cristiano Ronaldo", pais: "Portugal " },
  { nome: "Johan Cruijff", pais: "Países Baixos" },
  { nome: "Lionel Messi", pais: "Argentina" },
  { nome: "Marco van Basten", pais: "Países Baixos" },
  { nome: "Ronaldo", pais: "Brasil" },
  { nome: "Michel Platini", pais: "França" },
  { nome: "Kaká", pais: "Brasil" },
];

const jogadorDoBrasil = jogadores.find((jogador) => jogador.pais === "Brasil");
// resultado: { nome: 'Ronaldo', pais: 'Brasil' }
```

### some/every

- Funções também semelhantes ao método de find, porém, o resultado de ambas será boolean.
- para a função `some`, se houver ao menos um registro que atenda a condição, o resultado será `true`.
- para a função `every`, todos os registros devem atender a condição para o resultado ser `true`.
- utilizo bastante estas duas funções para validar regras de negócios que devem ser aplicadas a todos os registros de um conjunto de dados.

```ts
const numeros = [1, 2, 3, 4, 5, 6];
const temPar = numeros.some((n) => n % 2 === 0); // true
const todosPares = numeros.every((n) => n % 2 === 0); // false
```

### reduce

- Este método itera sobre todos os objetos do array, e retorna um valor único, que é o resultado da operação de acumulação.
- O valor acumulado pode ser de tipos diversos, sendo strings, numeros, objetos, e até outros arrays. Tudo depende da implementação do callback.
- a sintaxe do reducer é:

```ts
array.reduce(reducerCallback, valorInicial);
```

- O reducer callback tem dois argumentos, principais: o valor acumulado e o valor atual.
- O valor inicial é opcional, e se não for definido, o primeiro valor do array será utilizado como valor inicial.
- os valores do array original não são alterados, a menos que sejam manipudos, conforme a regra já explicada acima.

```ts
const numeros = [1, 2, 3, 4, 5, 6];
// neste exemplo, como não temos um valor inicial definido, o primeiro parâmetro do reducer será o primeiro item do array.
// o segundo, por sua vez, será o segundo item do array. Na "volta" seguinte, o primeiro parâmetro volta se comportar
// como acumulador, enquanto o segundo parâmetro será o próximo item (3o) do array.
numeros.reduce((acumulador, valorAtual) => acumulador + valorAtual);
// resultado: 21

// no exemplo abaixo, o valor inicial foi definido. Logo, o primeiro parâmetro já se inicia com o valor inicial. O segundo
// assume, no primeiro loop, o valor o primeiro item do array.
numeros.reduce((acumulador, valorAtual) => acumulador + valorAtual, 10);
// resultado: 31
```

```ts
// o exemplo abaixo demonstra uma forma de transformar um objeto de um tipo (array) em outro tipo (objeto).
// o reducer é util para fazer este tipo de transformação.

function toRecord(chavesEValores: string[][]): Record<string, string> {
  return chavesEValores.reduce((objeto, chaveEValor) => {
    objeto[chaveEValor[0]] = chaveEValor[1];
    return objeto;
  }, {});
}

const chavesEValores = [
  ["nome", "Cristiano Ronaldo"],
  ["pais", "Portugal"],
  ["idade", "32"],
];
toRecord(chavesEValores);
// resultado: { nome: 'Cristiano Ronaldo', pais: 'Portugal', idade: '32' }
```

### sort

- Método util para ordenar registros de um array.
- O método recebe um callback, onde a cada loop, dois registros distintos, `a` e `b` são passados como parâmetros.
- cada loop deve retornar um valor numérico, com o seguinte padrão.:
  - `retorno > 0`: o objeto `b` é ordenado antes de `a`
  - `retorno < 0`: o objeto `a` é ordenado antes de `b`
  - `retorno === 0`: não altera a ordem dos objetos (`a` é ordenado antes de `b`)
- O método de `sort` altera o array original. Caso seja necessário manter a estrutura inicial, sugiro a ordenação de uma cópia do array. Uma forma pode ser `[...array].sort(/*...*/)`

```ts
// o método padrão de ordenação (caso um callback não seja informado), compara todos os elmentos
// como se fossem strings. Desta forma, o array abaixo será ordenado de forma diferente do que se
// espera:
const numeros = [9, 80, 700, 10];
numeros.sort(); // ???

// para a ordenação deste array, a forma correta é:
// repare que este método ordena os números de forma ascendente, pois:
//   - se `a` é maior que `b`, o valor retornado será maior que zero.
//     Logo, `b` será ordenado antes de `a`.
//   - se `b` é maior que `a`, o valor retornado será menor que zero.
//     Logo, `a` será mantido à frente de `b`
//   - caso sejam iguais, o valor retornado será zero. A ordem também não se altera.
numeros.sort((a, b) => a - b);

// abaixo, segue o método de ordenação descendente:
numeros.sort((a, b) => b - a);
```

```ts
// Para ordenar strings, utilizo o método `localeCompare`. Ele retorna um valor numérico,
// conforme o padrão utilizado pelo `sort`.
const nomes = ["João", "Maria", "Pedro"];
nomes.sort((a, b) => a.localeCompare(b));

// da mesma forma, para ordenar na ordem descendente, basta inverter a e b:
nomes.sort((a, b) => b.localeCompare(a));

// lembrando: dado que o tipo deste array é string[] (todos seus elementos são strings),
// podemos também utilizar o método de `sort` com sua ordenação padrão.
nomes.sort();
```

```ts
// A ordenação de objetos de tipo mais complexto (objects), podemos acessar diretamente
// um atributo do objeto, e fazer a ordenação conforme apresentado anteriormente.
const pessoas = [
  { nome: "Paulo", idade: 20 },
  { nome: "João", idade: 20 },
  { nome: "Maria", idade: 25 },
  { nome: "Pedro", idade: 15 },
  { nome: "Ana", idade: 10 },
];
pessoas.sort((a, b) => a.idade - b.idade);

// para ordenar por dois campos distintos, uma forma possível seria:
pessoas.sort((a, b) => a.idade - b.idade || a.nome.localeCompare(b.nome));

// inclusive por direções opostas:
pessoas.sort((a, b) => b.idade - a.idade || a.nome.localeCompare(b.nome));
```
