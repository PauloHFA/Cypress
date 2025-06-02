export function selecionarValorPopLOV(selector, valor) {
  cy.get(`#${selector}`).should('be.visible').click();
  cy.get('div.ui-dialog--popup', { timeout: 10000 }).should('exist');
  cy.get('.a-IconList', { timeout: 10000 }).should('be.visible');
  cy.get('.a-IconList').contains(valor).click();
}