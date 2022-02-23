# Módulos

- No ambiente node, qualquer arquivo que tenha código em javascript (ou typescript), é um módulo.
- Módulos representam unidades menores do sistema.
- **Em geral**, módulos `exportam` uma ou mais variáveis ou métodos.
  - Exportar significa algo semelhante a "publicar" algum destes componentes para outros módulos.
  - Tudo aquilo que não é exportado não é visível para outros módulos.
- É muito comum utilizar em nossos módulos o código de outros. Para fazer uso destes módulos, posso `importar` um módulo.

## CommonJs

- CommonJs é o padrão de escrita de módulos do ambiente nodejs.
- para cada arquivo existente, o node registra uma função de `require` e um objeto de `module`.
- dentro `module`, existe o objeto `exports`, que armazena todos os elementos exportados do módulo.
- o método `require` é responsável por buscar os elementos exportados de um módulo para serem utilizados em um outro.
  - o método de `require` sempre busca o módulo através do [caminho relativo](https://youtu.be/B6wQDGRSQ08?t=204) preenchido como parâmetro desta função`*`.

```js
// soma.js
// arquivo que exporta uma função
function soma(a, b) {
  return a + b;
}

module.exports = soma;
```

```js
// index.js
// arquivo que importa a dependência
const soma = require("./soma");
console.log(soma(1, 2));
```

## export/import

- Padrão de escrita de módulos a partir do ES6.
- eles repetem o comportamento de `export` e `require` do CommonJs.
- Apesar de hoje ser fortemente adotado, tanto em ambientes nodejs no servidor quanto em ambientes web, sua escrita ainda não é oficial nestes dois ambientes. Seu comportamento é "simulado" por transpilers e pré-processadores. Quando utilizamos estes métodos, os pré-processadores de código vão gerar código em commonjs, para manter a operabilidade de nossos módulos.
- neste padrão, os módulos agora preveem o export e import de membros de duas formas:
  - `export default <membro>`, que pode ser utilizado uma única vez por módulo, representando o principal elemento do módulo.
  - `export <membro>`, que pode ser utilizado várias vezes por módulo, exportando aquele membro exatamente com o nome que ele foi criado.
  - a adoção de um e outro é opcional. Eu gosto muito de usar os exports nomeados, por simplificarem o autocomplete do editor.

```ts
// math.ts

// esta é uma forma válida de exportar membros nominados.
export const soma = (a: number, b: number): number => a + b;
export const subtracao = (a: number, b: number): number => a - b;

// esta é uma segunda forma possível. posso declarar livremente os membros que desejo
// exportar, e depois utilizar o comando export { }.
const multiplicacao = (a: number, b: number): number => a * b;
const divisao = (a: number, b: number): number => a / b;
export { multiplicacao, divisao };

// sintaxe para importar o membro padrão.
export default Math;
```

```ts
// index.ts
import math, { subtracao, soma, divisao, multiplicacao } from "./math";
console.log(soma(math.PI, math.E));
```

```tsx
// interruptor.tsx
import React, { useState } from "react";

const Interruptor: React.FC = () => {
  const [ligado, setLigado] = useState(false);
  return (
    <div>
      <button onClick={() => setLigado(!ligado)}>
        {ligado ? "Desligar" : "Ligar"}
      </button>
      {ligado && <p>Ligado</p>}
    </div>
  );
};
```

## package.json

- Todo projeto javascript tem um arquivo chamado `package.json` na raiz. Este arquivo define as informações relevantes daquele projeto.
- Ele declara todos os metadados importantes para identificar o projeto, como o nome, versão, autor, etc.
- Ele também declara quais são as dependências (bibliotecas terceiras) que serão utilizadas no projeto.
- outra parte importante, ele deverá declarar diversos scripts uteis para o desenvolvimento, utilização e gestão do pacote.
- sua utilização está intimamente ligada ao uso do `npm` ou qualquer outra ferramenta de gestão de pacotes.

## Dependências externas

- Assim como em diveros outros ambientes de desenvolvimento, node também permite a utilização de bibliotecas terceiras.
- As dependências de um projeto node ficam armazenadas em um repositório, que chamamos de `registry`. O registry público principal ambiente de node fica em `https://registry.npmjs.org`.
  - Os pacotes disponibilizados neste registry são todos criados e mantidos por pessoas que atuam em projetos de iniciativa [open source](https://opensource.com/). É comum que pessoas e organizações publiquem projetos desta forma, colaborando com a comunidade de desenvolvimento, e aproveitando do esforço conjunto para melhorar suas ferramentas.
    - ex.: [linux foundation](https://linuxfoundation.org/), [apache software foundation](https://www.apache.org/), facebook com o [react](https://reactjs.org/), microsoft com o typescript, dentre tantos outros...
  - É possível (e comum em projetos com alto nível de segurança) a criação de registries locais, onde somente pacotes autorizados pela equipe de segurança podem ser utilizados.
  - É comum também que se crie registries locais para armazenar pacotes que você e sua equipe não desejam publicar para outras empresas, por contar algumas vezes com questões importantes do negócio do seu time.
- As dependências, que são estas bibliotecas que utilizamos, ficam salvas em nosso arquivo de package.json, nas áreas de `dependencies` e `devDependencies`.
  - `dependencies` são todas aquelas que são relevantes para o funcionamento do nosso projeto. em produção
  - `devDependencies` são aquelas que têm seu ciclo de vida encerrado no período de desenvolvimento. Estas dependências, se utilizadas no código produtivo, podem estar ausentes do `bundle` resultante.
  - No contexto de aplicações web, como no caso do react, esta separação é de extrema importância, pois queremos sempre carregar o mínimo "peso" de arquivos quando nosso código for enviado ao browser.
- sempre que solicitamos uma biblioteca externa no nosso projeto, esta biblioteca, assim como suas dependências, são copiadas para nosso ambiente local, dentro da pasta de `node_modules`, na raiz do nosso projeto.
- os módulos terceiros são importados em nossos módulos da mesma forma que nossos módulos locais.

```tsx
// interruptor.tsx
// por que não precisa informar o caminho relativo do pacote??? 🤔
// console.log(module.paths)!!!
import React, { useState } from "react";

const Interruptor: React.FC = () => {
  /*  */
};
```

- ao utilizar bibliotecas externas, precisamos verificar a segurança e confiabilidade desta biblioteca. Como o registry é público, pessoas ou grupos mal intencionados podem criar pacotes que podem comprometer a segurança da sua aplicação. Por isso, cabe nossa atenção sempre que escolhemos usar uma biblioteca externa.
  - [faker.js](https://www.theverge.com/2022/1/9/22874949/developer-corrupts-open-source-libraries-projects-affected)
  - [babel e o leftPad](https://www.theregister.com/2016/03/23/npm_left_pad_chaos/)
