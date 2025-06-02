describe("Google Search", () => {
  it("Deve realizar uma pesquisa com sucesso", () => {
    cy.googleSearch(); 
  });

  it("Deve pesquisar por outro termo", () => {
    cy.googleSearch("Test Automation Tools");
  });
});
