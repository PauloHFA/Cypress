// Pagina
import '../support/preencherMembroFamiliar';

describe('cadastroMembroFamiliar', () => {
  beforeEach(() => {
    cy.loginAdm();
  });

  it('Deve preencher o cadastro de membro familiar corretamente', () => {
    cy.preencherMembroFamiliar();
  });
});