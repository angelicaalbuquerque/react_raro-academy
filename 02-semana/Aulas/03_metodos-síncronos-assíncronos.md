# Processos síncronos e assíncronos

- O javascript surgiu em uma época em que se pensava a internet de uma forma bem mais [estática](https://datatracker.ietf.org/doc/html/rfc2616). Por isso, desde sua concepção, ele disponibiliza para o usuário da linguagem apenas uma thread de processamento. Ou seja, caso você esteja processando uma tarefa que leve muito tempo, o usuário deverá esperar até que este processamento se encerre:

```ts
console.time("tempo do loop");
for (let i = 0; i < 100000; i++) {
  console.log("bloco de loop");
}
console.timeEnd("tempo do loop");
```

- Esta mesma thread deve ser utilizada para todas as tarefas da interação do usuário com o browser:
  - renderizar a página.
  - baixar assets do servidor.
  - se comunicar com a API e retornar dados.
  - ler dados dos cookies, do localStorage, bancos locais, etc
- fazer sistemas ou sites web com maior quantidade de iterações seria impossível.
- Para resolver este problema, o javascript se utiliza do conceito de processamento assíncrono.

## Processamento síncrono

- No javascript, assim como em diversas linguagens de programação, os métodos são executados através de uma pilha de processamento, chamado de `call stack`. As call stacks definem o `contexto de execução` de determinada série de funções.
- Este processo de empilhamento e desempilhamento de tarefas é a forma que a linguagem tem de garantir que os processos serão executados na sequência que o programador esperava, no momento da construção. Esta sequência é pode ser o que entendemos como processamento síncrono, ou seja, todas as linhas são chamadas em sequência, de acordo com a finalização do processo anterior.
- Neste cenário, caso fosse necessário executar um processo que demorasse muito tempo, o usuário teria que esperar até que o processo anterior seja finalizado. Não seria possível nem mesmo interagir com um campo, formulário ou botão disponíveis na tela.

> Exemplo: 03-async/simple-sync-ui-blocking.html

```ts
// neste exemplo, estamos no ponto inicial da stack, que chamaremos de `main`.
// no momento que a `main` chama o método `run`, ele empilha este método na stack
// o método `run`, por sua vez, empilha o método de `multiplicacao`, que a cada laço do for,
// fará o empilhamento do método `soma`.
// quando chegamos no método de soma, e este **finaliza sua execução**, sua chamada será removida
// da pilha. Este processo de remoção da pilha é repetido por todos os métodos, até chegar à base
// da pilha. Somente ao fim disso, a próxima linha será chamada.

function soma(a, b) {
  return a + b;
}

function multiplicacao(a, b) {
  let acumulador = 0;
  for (i = 0; i < b; i++) {
    acumulador = soma(acumulador, a);
  }

  return acumulador;
}

function run() {
  multiplicacao(2, 3);
}

run();
run();
console.log("processamento finalizado");
```

## Processamento assíncrono

- O processamento assíncrono é a solução encontrada na linguagem para permitir que a única thread disponível para o usuário da linguagem esteja livre, enquanto processos mais pesados são executados fora de contexto da thread. Ou seja, este processo **simula**, grosso modo, o funcionamento de um sistema em multi-thread.
- A linguagem funciona através de um modelo chamado [event loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop).
  - O método assíncrono inicia o processamento e "anota uma mensagem" em uma estrutura da linguagem chamada de `fila de processamento`. Este método fica suspenso, aguardando resposta.
  - Este processo, já registrado, poderá ser executado por threads internas da linguagem, inacessíveis ao desenvolvedor, mas que devem dar continuidade ao processo.
    - Ex.: timers, acesso ao disco, acesso à rede
  - O event loop vai percorrer constantemente a `fila de processamento`, buscando por tarefas que receberam mensagem de "finalizada" das threads internas. Se encontra, este método é retirado da `fila de processamento` e colocado no topo da `call stack`.
  - em geral, uma resposta, ou `callback` está associado a este método. Quando existe um callback aguardando, este deverá ser chamado pela thread principal, "voltando ao controle do programador".
  ```ts
  // algoritmo de auto-nivel do event loop
  while (queue.waitForMessage()) {
    queue.processNextMessage();
  }
  ```

### Timers

- Os métodos mais simples do javascript que têm o comportamento assíncrono são os timers `setTimeout` e `setInterval`.

  - o `setTimeout` determina uma tarefa qualquer, denotada por um callback, que será executada após um determinado intervalo de tempo, definido em milissegundos.

  ```ts
  setTimeout(function () {
    console.log("vou ser executado dentro de 1 segundo");
  }, 1000);
  ```

  - o `setInterval` determina uma tarefa qualquer, denotada por um callback, que será repetida em determinado intervalo de tempo, definido em milissegundos.

  ```ts
  setInterval(function () {
    console.log("vou ser executado a cada 1 segundo");
  }, 1000);
  ```

- como pode-se ler nos blocos acima, as funções assíncronas em geral possuem um callaback que é chamado no momento da finalização do seu processo aguardado.

### Demonstração prática

- para estudarmos as consequências práticas de um processo síncrono "travando" a aplicação, podemos estudar o cenário de `03-async/simple-sync-ui-blocking.html`
- um cenário com uma proposta de solução para o problema do congelamento da aplicação, causado pelas ações "blocantes" podem ser vistos no `03-async/possivel-solucao.html`.

### Encadeamento de tarefas via callback

- algumas vezes, possuímos uma série de tarefas, síncronas ou assíncronas, que precisam ser executadas em determinada ordem. Dado que uma característica de métodos assíncronos é a possibilidade de durar por um intervalo que não conhecemos, precisamos de algumas estratégias de ordenação destas tarefas.
- A primeira que vamos conhecer é o encadeamento via callbacks.
- ex.: `03-async/consulta-redis`

anexos:

- [callstacks - Pagarme talks (pt-BR)](https://www.youtube.com/watch?v=va8-xdxTywU)
- [What the heck is the event loop anyway? | Philip Roberts | JSConf EU](https://www.youtube.com/watch?v=8aGhZQkoFbQ)
- http://latentflip.com/loupe, para brincar um pouco com o event loop js
