describe('Sponsorr!', () => {
  it('visits Sponsorr!', () => {
    cy.visit('http://localhost:8080');
    // Ignore the null error
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    cy.on('uncaught:exception', (err, runnable) => {
      if (err.message.includes(`Cannot read property 'classList' of null`)) {
        return false;
      }
    });
    // Login procedure
    cy.contains('Login').click();
    cy.url().should('include', '/login');
  });
});
