import { faker } from '@faker-js/faker';

export function gerarPessoa(cpf) {
  return {
    nome: faker.person.firstName(),
    sobrenome: faker.person.lastName(),
    cpf: cpf || gerarCPF()
  };
}

function gerarCPF() {
  let cpf = '';
  for (let i = 0; i < 11; i++) {
    cpf += Math.floor(Math.random() * 10);
  }
  return cpf;
}