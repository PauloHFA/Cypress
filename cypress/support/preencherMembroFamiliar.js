import { faker } from '@faker-js/faker';
import { cadastroMembroFamiliar } from "../config/cadastroMembroFamiliar";
import { selecionarValorPopLOV } from './utils/lovUtils';

Cypress.Commands.add('preencherMembroFamiliar', () => {
  const campos = cadastroMembroFamiliar.dadosMembro.selectors;
  const valores = cadastroMembroFamiliar.valores;

  const tempoDeCampo = 100;
  const tempoDePopUP = 500;
  const tempoDeTrocaDePagina = 1000;

  // Gera nome, CPF, RG, NIS e nomes dos pais fakes para o membro familiar
  const nomeFaker = faker.person.fullName();
  const cpfFaker = `${faker.number.int({min:100, max:999})}.${faker.number.int({min:100, max:999})}.${faker.number.int({min:100, max:999})}-${faker.number.int({min:10, max:99})}`;
  const rgFaker = faker.number.int({ min: 1000000, max: 99999999 }).toString();
  const nisFaker = faker.number.int({ min: 10000000000, max: 99999999999 }).toString();
  const nomePaiFaker = faker.person.fullName();
  const nomeMaeFaker = faker.person.fullName();
  const telefoneFaker = faker.phone.number('(##) 9####-####');
  const emailFaker = faker.internet.email();
  const dataNascimentoFaker = faker.date.birthdate({ min: 1, max: 90, mode: 'age' });
  const dataNascimentoFormatada = dataNascimentoFaker.toLocaleDateString('pt-BR');
   
  // Gera número de cartão SUS fake (15 dígitos)
  const cartaoSUSFaker = faker.number.int({ min: 100000000000000, max: 999999999999999 }).toString();

  const genero = ["Masculino","Feminino", "Outro"];
  const generoFaker = genero[Math.floor(Math.random() * genero.length)];
  
  const orientacaosexual = ["Heterossexual", "Homossexual", "Bissexual", "Assexual", "Outros"];
  const orientacaoSexualFaker = orientacaosexual[Math.floor(Math.random() * orientacaosexual.length)];

  const estadocivil = ["Solteiro", "Casado", "Divorciado", "Viúvo", "União Estável"];
  const estadocivilFaker = estadocivil[Math.floor(Math.random() * estadocivil.length)];
  
  //
  const escolaridade = ["Ensino Fundamental Incompleto", "Ensino Fundamental Completo", "Ensino Médio Incompleto", "Ensino Médio Completo", "Ensino Superior Incompleto", "Ensino Superior Completo","Não alfabetizado", "Doutorado", "Pós-graduação"];
  const escolaridadeFaker = escolaridade[Math.floor(Math.random() * escolaridade.length)];

  //
  const nacionalidade = ["Brasileira", "Estrangeiro"];
  const nacionalidadeFaker = nacionalidade[Math.floor(Math.random() * nacionalidade.length)];

  //
  const naturalidade = ["Alagoas", "Pará", "Mato Grosso", "Amazonas", "Acre", "Bahia", "Minas Gerais", "Paraná", "Ceará","Paraiba"];
  const naturalidadeFaker = naturalidade[Math.floor(Math.random() * naturalidade.length)];

  //
  const etnia = ["Branco", "Pardo", "Preto", "Amarelo", "Indígena"];
  const etniaFaker = etnia[Math.floor(Math.random() * etnia.length)];

  const orgaoorigem = ["CRAS PADRE ZE", "CRAS ALTO DO MATEUS", "CRAS CRISTO", "CRAS VALENTINA", "CRAS CRUZ DAS ARMAS", "CRAS JARDIM LINDO", "CRAS SANTA ROSA", "CRAS SAO JOSE"];
  const orgaoorigemFaker = orgaoorigem[Math.floor(Math.random() * orgaoorigem.length)];

  // Gera número de agência fake (4 dígitos)
  const agenciaFaker = `${faker.number.int({ min: 1000, max: 9999 })}-${faker.number.int({ min: 0, max: 9 })}`;

  // Gera número de conta fake (6 a 8 dígitos)
  const contaFaker = faker.number.int({ min: 100000, max: 99999999 }).toString();

  // Navega até a página com a session salva
  const sessionId = Cypress.env('apexSession');
  if (!sessionId) throw new Error("Session do APEX não encontrada. Execute cy.loginAdm() antes.");

  const urlComSession = `https://dev.joaopessoa.pb.gov.br/ords/r/master/social/social0013?session=${sessionId}`;
  cy.visit(urlComSession);
  cy.wait(1000);

  // Preenchimento dos campos
  cy.get(`#${campos.nomecompleto}`).should('be.visible').wait(tempoDeCampo).type(nomeFaker); // nome aleatório
  cy.get(`#${campos.possuinomesocial}`).should('be.visible').wait(tempoDeCampo).click();
  
  cy.get(`#${campos.generolovbtn}`).should('be.visible').wait(tempoDeCampo).click();
  cy.wait(tempoDePopUP); 
  cy.get('.a-IconList', { timeout: 5000 }).should('be.visible');
  cy.get('.a-IconList').contains(generoFaker).click();
 
  cy.get(`#${campos.orientacaosexual}`).should('be.visible').wait(tempoDeCampo).type(orientacaoSexualFaker);
  cy.get(`#${campos.datanascimento}`).should('be.visible').wait(tempoDeCampo).type(dataNascimentoFormatada);
  cy.get(`#${campos.cpf}`).should('be.visible').wait(tempoDeCampo).type(cpfFaker); // cpf aleatório
  cy.get(`#${campos.email}`).should('be.visible').wait(tempoDeCampo).type(emailFaker);
  cy.get(`#${campos.telefone}`).should('be.visible').wait(tempoDeCampo).type(telefoneFaker);
  cy.get(`#${campos.nis}`).should('be.visible').wait(tempoDeCampo).type(nisFaker);
  cy.get(`#${campos.rg}`).should('be.visible').wait(tempoDeCampo).type(rgFaker);
  cy.get(`#${campos.nomepai}`).should('be.visible').wait(tempoDeCampo).type(nomePaiFaker);
  cy.get(`#${campos.nomemae}`).should('be.visible').wait(tempoDeCampo).type(nomeMaeFaker);

  //poplov
  selecionarValorPopLOV(campos.estadocivil, estadocivilFaker);
  selecionarValorPopLOV(campos.escolaridade, escolaridadeFaker);
  selecionarValorPopLOV(campos.nacionalidade, nacionalidadeFaker);
  selecionarValorPopLOV(campos.naturalidade, naturalidadeFaker);
  selecionarValorPopLOV(campos.etnia, etniaFaker);

  cy.get(`#${campos.demandante}`).should('be.visible').wait(tempoDeCampo).type(valores.demandante);
  cy.get(`#${campos.numerocartaosus}`).should('be.visible').wait(tempoDeCampo).type(cartaoSUSFaker);
  cy.get(`#${campos.deficiencia}`).should('be.visible').wait(tempoDeCampo).click(); 
  cy.get(`#${campos.comorbidade}`).should('be.visible').wait(tempoDeCampo).click();
  cy.get(`#${campos.medicacao}`).should('be.visible').wait(tempoDeCampo).click();

  selecionarValorPopLOV(campos.orgaoorigem, orgaoorigemFaker);

  // Sorteia um banco aleatório
  const bancos = ["BANCO DO BRASIL", "CAIXA ECONOMICA FEDERAL", "BRADESCO"];
  const bancoFaker = bancos[Math.floor(Math.random() * bancos.length)];

  // No preenchimento do campo banco, use o valor sorteado:
  selecionarValorPopLOV(campos.banco, bancoFaker);

  cy.get(`#${campos.agencia}`).should('be.visible').wait(tempoDeCampo).type(agenciaFaker);
  cy.get(`#${campos.conta}`).should('be.visible').wait(tempoDeCampo).type(contaFaker);
  cy.get(`#${campos.operacao}`).should('be.visible').wait(tempoDeCampo).type(valores.operacao);
  cy.get(`#${campos.observacao}`).should('be.visible').wait(tempoDeCampo).type(valores.observacao);

  //ENDEREÇO
  /*
  //cy.get(`#${campos.cep}`).should('be.visible').wait(tempoDeCampo).type(valores.cep);
  //cy.wait(1000); 
  //cy.get(`#${campos.endereco}`).clear().type(valores.endereco);
  //cy.get(`#${campos.numero}`).should('be.visible').wait(tempoDeCampo).type(valores.numero);
  //cy.get(`#${campos.bairro}`).should('be.visible').wait(tempoDeCampo).type(valores.bairro);
  //cy.get(`#${campos.cidade}`).should('be.visible').wait(tempoDeCampo).type(valores.cidade);
  //cy.get(`#${campos.uf}`).should('be.visible').wait(tempoDeCampo).type(valores.uf);
  //cy.get(`#${campos.complemento}`).should('be.visible').wait(tempoDeCampo).type(valores.complemento);

  //com li.a-IconList-item
  cy.get(`#${campos.tipo_localidade}`).should('be.visible').wait(tempoDeCampo).click();
  cy.get('div.ui-dialog--popup', { timeout: 10000 }).should('exist');
  cy.get('.a-IconList', { timeout: 10000 }).should('be.visible');
  cy.get('.a-IconList').contains(valores.tipo_localidade).click();
 
  cy.get(`#${campos.tipo_construcao}`).should('be.visible').wait(tempoDeCampo).click();
  cy.get('div.ui-dialog--popup', { timeout: 10000 }).should('exist');
  cy.get('.a-IconList', { timeout: 10000 }).should('be.visible');
  cy.get('.a-IconList').contains(valores.tipo_construcao).click();

  cy.get(`#${campos.coabitacao_familiar}`).should('be.visible').wait(tempoDeCampo).click();
  cy.get('div.ui-dialog--popup', { timeout: 10000 }).should('exist');
  cy.get('.a-IconList', { timeout: 10000 }).should('be.visible');
  cy.get('.a-IconList').contains(valores.coabitacao_familiar).click();

  cy.get(`#${campos.iluminacao}`).should('be.visible').wait(tempoDeCampo).click();
  cy.get('div.ui-dialog--popup', { timeout: 10000 }).should('exist');
  cy.get('.a-IconList', { timeout: 10000 }).should('be.visible');
  cy.get('.a-IconList').contains(valores.iluminacao).click();
  
  //CHECKBOX DOMICILIO COBERTO POR
  cy.get(`#${valores.domicilio_coberto_por}`)
  .should('exist')
  .check({ force: true });

  cy.get(`#${campos.abastecimento_de_agua}`).should('be.visible').wait(tempoDeCampo).click();
  cy.get('div.ui-dialog--popup', { timeout: 10000 }).should('exist');
  cy.get('.a-IconList', { timeout: 10000 }).should('be.visible');
  cy.get('.a-IconList').contains(valores.abastecimento_de_agua).click();

  cy.get(`#${campos.esgoto_sanitario}`).should('be.visible').wait(tempoDeCampo).click();
  cy.get('div.ui-dialog--popup', { timeout: 10000 }).should('exist');
  cy.get('.a-IconList', { timeout: 10000 }).should('be.visible');
  cy.get('.a-IconList').contains(valores.esgoto_sanitario).click();
  
  cy.get(`#${campos.destino_do_lixo}`).should('be.visible').wait(tempoDeCampo).click();
  cy.get('div.ui-dialog--popup', { timeout: 10000 }).should('exist');
  cy.get('.a-IconList', { timeout: 10000 }).should('be.visible');
  cy.get('.a-IconList').contains(valores.destino_do_lixo).click();
  
  cy.get(`#${campos.condicao_da_moradia}`).should('be.visible').wait(tempoDeCampo).click();
  cy.get('div.ui-dialog--popup', { timeout: 10000 }).should('exist');
  cy.get('.a-IconList', { timeout: 10000 }).should('be.visible');
  cy.get('.a-IconList').contains(valores.condicao_da_moradia).click();
  
  cy.get(`#${campos.descricao_da_moradia}`).should('be.visible').wait(tempoDeCampo).type(valores.descricao_da_moradia);
 
  // Clica no campo para abrir o popup (não use .click() se for <select>, mas no seu caso não é)
  cy.get(`#${campos.tipo_domicilio}`)
    .should('be.visible')
    .select(valores.tipo_domicilio);
  cy.log(`Selecionado: ${valores.tipo_domicilio}`);
  */

  // Situação no mercado de trabalho fake
  const situacaoTrabalho = [
    "Empregado",
    "Desempregado",
    "Trabalho informal",
    "Subemprego",
    "Estudante",
    "Estágio remunerado",
    "Estágio não remunerado"
  ];
  const situacaoTrabalhoFaker = situacaoTrabalho[Math.floor(Math.random() * situacaoTrabalho.length)];

  cy.get(`#${campos.situacaonomercadodetrabalho}`).should('be.visible').wait(tempoDeCampo).click();
  cy.get('div.ui-dialog--popup', { timeout: 10000 }).should('exist');
  cy.get('.a-IconList', { timeout: 10000 }).should('be.visible');
  cy.get('.a-IconList').contains(situacaoTrabalhoFaker).click();
  
  const sineFaker = faker.number.int({ min: 10000000, max: 999999999 }).toString();

  cy.get(`#${campos.sine}`).should('be.visible').wait(tempoDeCampo).type(sineFaker);

  // Gera ocupação fake
  const ocupacoes = [
    "Empregado / Assalariado",
    "Autônomo / Empresário",
    "Servidor público / Militar",
    "Estudante",
    "Desempregado / Sem ocupação",
    "Aposentado / Pensionista"
  ];
  const ocupacaoFaker = ocupacoes[Math.floor(Math.random() * ocupacoes.length)];

  cy.get(`#${campos.ocupacao}`).should('be.visible').wait(tempoDeCampo).type(ocupacaoFaker);

  // Gera valor de remuneração fake (entre 1200 e 8000, com duas casas decimais)
  const remuneracaoFaker = faker.finance.amount(1200, 8000, 2, '');

  cy.get(`#${campos.remuneracao}`).should('be.visible').wait(tempoDeCampo).type(remuneracaoFaker);

  // Gera benefício ou seguro social fake
  const beneficios = [
    "Aposentadoria",
    "Bolsa Família",
    "BPC",
    "Seguro Desemprego"
  ];
  const beneficioFaker = beneficios[Math.floor(Math.random() * beneficios.length)];

  // No preenchimento do campo:
  cy.get(`#${campos.beneficioseguro}`)
    .should('be.visible')
    .click();

  cy.get('div.ui-dialog--popup:visible')
    .should('be.visible')
    .within(() => {
      cy.get('.a-IconList')
        .should('be.visible')
        .wait(200);

      cy.contains('.a-IconList-item', beneficioFaker)
        .should('be.visible')
        .click();
    });

  // Gera valor de benefício ou seguro social fake (entre 600 e 2500, com duas casas decimais)
  const valorBeneficioFaker = faker.finance.amount(600, 2500, 2, '');

  cy.get(`#${campos.valordobeneficio}`).should('be.visible').wait(tempoDeCampo).type(valorBeneficioFaker);
  
  // Gera valor fake para apoio rede primária
  const apoioRedePrimaria = ["Parentes", "Amigos", "Vizinhos", "Outro"];
  const apoioRedePrimariaFaker = apoioRedePrimaria[Math.floor(Math.random() * apoioRedePrimaria.length)];

  // ...no preenchimento do campo:
  cy.get(`#${campos.apoioredeprimaria}`).should('be.visible').wait(tempoDeCampo).click();
  cy.get('div.ui-dialog--popup', { timeout: 10000 }).should('exist');
  cy.get('.a-IconList', { timeout: 10000 }).should('be.visible');
  cy.get('.a-IconList').contains(apoioRedePrimariaFaker).click();

  cy.get('#B13628433607665790')
    .should('be.visible')
    .wait(tempoDeCampo)
    //.click();
});