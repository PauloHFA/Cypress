// Importando o arquivo de configuração
import { cadastroMembroFamiliar } from "../config/cadastroMembroFamiliar";

Cypress.Commands.add('preencherMembroFamiliar', () => {
  const campos = cadastroMembroFamiliar.dadosMembro.selectors;
  const valores = cadastroMembroFamiliar.valoresMembro;

  const tempoDeCampo = 100;
  const tempoDePopUP = 500;
  const tempoDeTrocaDePagina = 1000;
  // Navega até a página com a session salva
  const sessionId = Cypress.env('apexSession');
  if (!sessionId) throw new Error("Session do APEX não encontrada. Execute cy.loginAdm() antes.");

  const urlComSession = `https://dev.joaopessoa.pb.gov.br/ords/r/master/social/social0013?session=${sessionId}`;
  cy.visit(urlComSession);
  cy.wait(1000);

  // Preenchimento dos campos
  cy.get(`#${campos.nomecompleto}`).should('be.visible').wait(tempoDeCampo).type(valores.nomecompleto);
  //cy.get(`#${campos.labeltitular}`).should('be.visible').wait(tempoDeCampo).click();
  cy.get(`#${campos.possuinomesocial}`).should('be.visible').wait(tempoDeCampo).click();

  cy.get(`#${campos.generolovbtn}`).should('be.visible').wait(tempoDeCampo).click();
  cy.wait(tempoDePopUP); 
  cy.get('.a-IconList', { timeout: 5000 }).should('be.visible');
  cy.get('.a-IconList').contains(valores.generolovbtn).click();
 
  cy.get(`#${campos.orientacaosexual}`).should('be.visible').wait(tempoDeCampo).type(valores.orientacaosexual);
  cy.get(`#${campos.datanascimento}`).should('be.visible').wait(tempoDeCampo).type(valores.datanascimento);
  cy.get(`#${campos.cpf}`).should('be.visible').wait(tempoDeCampo).type(valores.cpf);
  cy.get(`#${campos.email}`).should('be.visible').wait(tempoDeCampo).type(valores.email);
  cy.get(`#${campos.telefone}`).should('be.visible').wait(tempoDeCampo).type(valores.telefone);
  cy.get(`#${campos.nis}`).should('be.visible').wait(tempoDeCampo).type(valores.nis);
  cy.get(`#${campos.rg}`).should('be.visible').wait(tempoDeCampo).type(valores.rg);
  cy.get(`#${campos.nomepai}`).should('be.visible').wait(tempoDeCampo).type(valores.nomepai);
  cy.get(`#${campos.nomemae}`).should('be.visible').wait(tempoDeCampo).type(valores.nomemae);

  //poplov
  cy.get(`#${campos.estadocivil}`).should('be.visible').wait(tempoDeCampo).click();
  cy.wait(tempoDePopUP);
  cy.get('.a-IconList', { timeout: 5000 }).should('be.visible');
  cy.get('.a-IconList').contains(valores.estadocivil).click();

  //poplov
  cy.get(`#${campos.escolaridade}`).should('be.visible').wait(tempoDeCampo).click();
  cy.wait(tempoDePopUP);
  cy.get('.a-IconList', { timeout: 5000 }).should('be.visible');
  cy.get('.a-IconList').contains(valores.escolaridade).click();

  //poplov
  cy.get(`#${campos.nacionalidade}`).should('be.visible').wait(tempoDeCampo).click();
  cy.wait(tempoDePopUP);  
  cy.get('.a-IconList', { timeout: 5000 }).should('be.visible');
  cy.get('.a-IconList').contains(valores.nacionalidade).click();

  //poplov
  cy.get(`#${campos.naturalidade}_lov_btn`).should('be.visible').wait(tempoDeCampo).click();
  cy.get('div.ui-dialog--popup', { timeout: 10000 }).should('exist');
  cy.get('.a-IconList', { timeout: 10000 }).should('be.visible');
  cy.get('.a-IconList').contains(valores.naturalidade).click();

  //poplov
  cy.get(`#${campos.etnia}`).should('be.visible').wait(tempoDeCampo).click();
  cy.get('div.ui-dialog--popup', { timeout: 10000 }).should('exist');
  cy.get('.a-IconList', { timeout: 10000 }).should('be.visible');
  cy.get('.a-IconList').contains(valores.etnia).click();
  

  cy.get(`#${campos.demandante}`).should('be.visible').wait(tempoDeCampo).type(valores.demandante);;
  cy.get(`#${campos.numerocartaosus}`).should('be.visible').wait(tempoDeCampo).type(valores.numerocartaosus);
  cy.get(`#${campos.deficiencia}`).should('be.visible').wait(tempoDeCampo).click(); 
  cy.get(`#${campos.comorbidade}`).should('be.visible').wait(tempoDeCampo).click();
  cy.get(`#${campos.medicacao}`).should('be.visible').wait(tempoDeCampo).click();

  //poplov
  cy.get(`#${campos.orgaoorigem}`).should('be.visible').wait(tempoDeCampo).click();
  cy.get('div.ui-dialog--popup', { timeout: 10000 }).should('exist');
  cy.get('.a-IconList', { timeout: 10000 }).should('be.visible');
  cy.get('.a-IconList').contains(valores.orgaoorigem).click();

  //poplov
  cy.get(`#${campos.banco}`).should('be.visible').wait(tempoDeCampo).click();
  cy.get('div.ui-dialog--popup', { timeout: 10000 }).should('exist');
  cy.get('.a-IconList', { timeout: 10000 }).should('be.visible');
  cy.get('.a-IconList').contains(valores.banco).click();

  cy.get(`#${campos.agencia}`).should('be.visible').wait(tempoDeCampo).type(valores.agencia);
  cy.get(`#${campos.conta}`).should('be.visible').wait(tempoDeCampo).type(valores.conta);
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

  cy.get(`#${campos.situacaonomercadodetrabalho}`).should('be.visible').wait(tempoDeCampo).click();
  cy.get('div.ui-dialog--popup', { timeout: 10000 }).should('exist');
  cy.get('.a-IconList', { timeout: 10000 }).should('be.visible');
  cy.get('.a-IconList').contains(valores.situacaonomercadodetrabalho).click();
  
  cy.get(`#${campos.sine}`).should('be.visible').wait(tempoDeCampo).type(valores.sine);

  cy.get(`#${campos.ocupacao}`).should('be.visible').wait(tempoDeCampo).type(valores.ocupacao);
  cy.get(`#${campos.remuneracao}`).should('be.visible').wait(tempoDeCampo).type(valores.remuneracao);

  cy.get(`#${campos.beneficioseguro}`)
  .should('be.visible')
  .click();

  cy.get('div.ui-dialog--popup:visible')
    .should('be.visible')
    .within(() => {
    cy.get('.a-IconList')
      .should('be.visible')
      .wait(200);

      cy.contains('.a-IconList-item', valores.beneficioseguro)
      .should('be.visible')
      .click();
    });

  cy.get(`#${campos.valordobeneficio}`).should('be.visible').wait(tempoDeCampo).type(valores.valordobeneficio);
  
  cy.get(`#${campos.apoioredeprimaria}`).should('be.visible').wait(tempoDeCampo).click();
  cy.get('div.ui-dialog--popup', { timeout: 10000 }).should('exist');
  cy.get('.a-IconList', { timeout: 10000 }).should('be.visible');
  cy.get('.a-IconList').contains(valores.apoioredeprimaria).click();

  cy.get('#B13628433607665790')
    .should('be.visible')
    .wait(tempoDeCampo)
    //.click();
});