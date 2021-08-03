/* Important: define the env variables before running the test, or else it will not work. */
/*  
1. Create a cypress.env.json file at the root of the project folder.    
2. Structure the json in this format:
    {
      "host": "http://localhost:8080",
      "user1": {
      "email": // any registered email ,
      "password": // the corresponding password"
    }
3. Start the development server.
4. Proceed to run the tests.
*/

describe('Login-Sign Out Flow', () => {
  before(() => {
    cy.visit(Cypress.env('host'));
    // Ignore the null error
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    cy.on('uncaught:exception', (err, runnable) => {
      if (err.message.includes(`Cannot read property 'classList' of null`)) {
        return false;
      }
    });
  });

  it('navigates to login page', () => {
    cy.get('[data-cy=login-navigate-button]').click();
    cy.url().should('include', '/login');
  });

  it('login with an invalid account', () => {
    cy.get('[data-cy=login-email-input]').type('invalidaccount@email.com');
    cy.get('[data-cy=login-password-input]').type('wrongPassword');
    cy.get('[data-cy=login-button]').click();
    cy.contains('Authentication Error: Incorrect password or email.').should('exist');
    cy.url().should('include', '/login');
  });

  it('login with a valid account', () => {
    cy.get('[data-cy=login-email-input]').type(Cypress.env('user1').email);
    cy.get('[data-cy=login-password-input]').type(Cypress.env('user1').password);
    cy.get('[data-cy=login-button]').click();
    cy.url().should('match', /(?:profile\/)(?:.*)/);
  });

  it('signs out to the home page', () => {
    cy.get('[data-cy=logout-button]').click();
    cy.url().should('include', Cypress.env('host'));
  });
});
