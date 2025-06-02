//pagina 10009
import { login } from '../config/loginAdm'

Cypress.Commands.add('loginAdm', () => {
  cy.visit(login.baseurl);
  cy.wait(1000);

  cy.url().should('include', login.login);
  cy.wait(1000);

  cy.get(login.selectors.username).should('be.visible').wait(500);
  cy.get(login.selectors.password).should('be.visible').wait(500);
  cy.get(login.selectors.loginButton).should('be.visible').wait(500);

  cy.get(login.selectors.username).type(login.valores.username).wait(1000);
  cy.get(login.selectors.password).type(login.valores.password).wait(1000);
  cy.get(login.selectors.loginButton).click().wait(1500);

  // Captura a URL após login e extrai a session
  cy.url().then((url) => {
    const sessionMatch = url.match(/session=(\d+)/);
    if (sessionMatch) {
      const sessionId = sessionMatch[1];
      Cypress.env('apexSession', sessionId); // Armazena no ambiente do Cypress
      cy.log('Session ID:', sessionId);
    }
  });
});