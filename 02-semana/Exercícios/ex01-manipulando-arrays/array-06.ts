const usuarios = [
  { nome: "Diego", idade: 23, ativo: true },
  { nome: "Gabriel", idade: 15, ativo: false },
  { nome: "Lucas", idade: 30, ativo: false },
];

const usuariosAtivos = usuarios.filter(usuario => usuario.ativo);
const usuariosInativos = usuarios.filter(usuario => !usuario.ativo);

console.log(usuariosAtivos);
console.log(usuariosInativos);