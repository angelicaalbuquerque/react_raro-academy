const meses = ["jan", "mar", "mar", "abr", "jun", "jul", "set", "out", "dez"];

meses.splice(1, 1);
meses.splice(1, 0, "fev");
meses.splice(4, 0, "mai");
meses.splice(7, 0, "ago");
meses.splice(10, 0, "nov");

console.log(meses);