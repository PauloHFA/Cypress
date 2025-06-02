Cypress.Commands.add('visitarComSession', (paginaApex) => {
  const sessionId = Cypress.env('apexSession');

  if (!sessionId) {
    throw new Error('A session ainda não foi capturada. Faça login primeiro.');
  }

  const urlComSession = `${login.baseurl}/${paginaApex}?session=${sessionId}`;
  cy.visit(urlComSession);
});