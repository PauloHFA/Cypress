// Pagina
import '../support/preencherCadastroPessoa';

describe('preencherCadastroPessoa', () => {
  beforeEach(() => {
    cy.loginAdm();
  });

  it('Deve preencher o cadastro de pessoa corretamente', () => {
    cy.preencherCadastroPessoa();
  });
});