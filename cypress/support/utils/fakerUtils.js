import { faker } from '@faker-js/faker';

export function gerarFakesPessoa() {
  const dataNascimentoFaker = faker.date.birthdate({ min: 1, max: 90, mode: 'age' });
  return {
    nomeFaker: faker.person.fullName(),
    cpfFaker: `${faker.number.int({min:100, max:999})}.${faker.number.int({min:100, max:999})}.${faker.number.int({min:100, max:999})}-${faker.number.int({min:10, max:99})}`,
    rgFaker: faker.number.int({ min: 1000000, max: 99999999 }).toString(),
    nisFaker: faker.number.int({ min: 10000000000, max: 99999999999 }).toString(),
    nomePaiFaker: faker.person.fullName(),
    nomeMaeFaker: faker.person.fullName(),
    telefoneFaker: faker.phone.number('(##) 9####-####'),
    emailFaker: faker.internet.email(),
    dataNascimentoFaker,
    dataNascimentoFormatada: dataNascimentoFaker.toLocaleDateString('pt-BR'),
    cartaoSUSFaker: faker.number.int({ min: 100000000000000, max: 999999999999999 }).toString(),
    generoFaker: ["Masculino","Feminino", "Outro"][Math.floor(Math.random() * 3)],
    orientacaoSexualFaker: ["Heterossexual", "Homossexual", "Bissexual", "Assexual", "Outros"][Math.floor(Math.random() * 5)],
    estadocivilFaker: ["Solteiro", "Casado", "Divorciado", "Viúvo", "União Estável"][Math.floor(Math.random() * 5)],
    escolaridadeFaker: [
      "Ensino Fundamental Incompleto", "Ensino Fundamental Completo", "Ensino Médio Incompleto",
      "Ensino Médio Completo", "Ensino Superior Incompleto", "Ensino Superior Completo",
      "Não alfabetizado", "Doutorado", "Pós-graduação"
    ][Math.floor(Math.random() * 9)],
    nacionalidadeFaker: ["Brasileira", "Estrangeiro"][Math.floor(Math.random() * 2)],
    naturalidadeFaker: ["Alagoas", "Pará", "Mato Grosso", "Amazonas", "Acre", "Bahia", "Minas Gerais", "Paraná", "Ceará","Paraiba"][Math.floor(Math.random() * 10)],
    etniaFaker: ["Branco", "Pardo", "Preto", "Amarelo", "Indígena"][Math.floor(Math.random() * 5)],
    bancoFaker: ["BANCO DO BRASIL", "CAIXA ECONOMICA FEDERAL", "BRADESCO"][Math.floor(Math.random() * 3)],
    agenciaFaker: faker.number.int({ min: 1000, max: 9999 }).toString(),
    contaFaker: faker.number.int({ min: 100000, max: 99999999 }).toString(),
    // ...adicione outros fakes conforme necessário
  };
}