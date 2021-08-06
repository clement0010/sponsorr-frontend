/* Important: define the env variables before running the test, or else it will not work. */
/*  
1. Create a cypress.env.json file at the root of the project folder.    
2. Structure the json in this format:
    {
      "host": "http://localhost:8080/",
      "user1": {
        "email": // any registered email ,
        "password": // the corresponding password
      }
    }
3. Start the development server.
4. Proceed to run the tests.
*/

describe('Authentication', () => {
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

  it('fails when sign up with an existing email address as organiser', () => {
    cy.get('[data-cy=sign-up-navigate-button]')
      .first()
      .click();
    cy.get('[data-cy=sign-up-organiser]').click();
    cy.url().should('include', '/event-organiser/signup');
    cy.get('[data-cy=sign-up-name]').type('DUMMY');
    cy.get('[data-cy=sign-up-email]').type(Cypress.env('user1').email);
    cy.get('[data-cy=sign-up-phone]').type('12345678');
    cy.get('[data-cy=sign-up-password]').type(Cypress.env('user1').password);
    cy.get('[data-cy=sign-up-confirm-password]').type(Cypress.env('user1').password);
    cy.get('[data-cy=sign-up-button]').click();
    cy.contains(
      'Sign up failed! Error: The email address is already in use by another account.',
    ).should('exist');
    cy.url().should('include', '/event-organiser/signup');
    cy.get('[data-cy=navigate-home]').click();
    cy.url().should('include', Cypress.env('host'));
  });

  it('fails when sign up with an existing email address as sponsor', () => {
    cy.get('[data-cy=sign-up-navigate-button]')
      .first()
      .click();
    cy.get('[data-cy=sign-up-sponsor]').click();
    cy.url().should('include', '/sponsor/signup');
    cy.get('[data-cy=sign-up-name]').type('DUMMY');
    cy.get('[data-cy=sign-up-email]').type(Cypress.env('user1').email);
    cy.get('[data-cy=sign-up-phone]').type('12345678');
    cy.get('[data-cy=sign-up-password]').type(Cypress.env('user1').password);
    cy.get('[data-cy=sign-up-confirm-password]').type(Cypress.env('user1').password);
    cy.get('[data-cy=sign-up-button]').click();
    cy.contains(
      'Sign up failed! Error: The email address is already in use by another account.',
    ).should('exist');
    cy.url().should('include', '/sponsor/signup');
    cy.get('[data-cy=navigate-home]').click();
    cy.url().should('include', Cypress.env('host'));
  });

  it('navigates to login page', () => {
    cy.get('[data-cy=login-navigate-button]').click();
    cy.url().should('include', '/login');
  });

  it('fails when login with an invalid account', () => {
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
});

describe('Role guard', () => {
  it('does not allow routing to dashboard', () => {
    cy.visit(`${Cypress.env('host')}dashboard`);
    // Ignore the null error
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    cy.on('uncaught:exception', (err, runnable) => {
      if (err.message.includes(`Cannot read property 'classList' of null`)) {
        return false;
      }
    });
    cy.url().should('eq', Cypress.env('host'));
  });

  it('does not allow routing to new event', () => {
    cy.visit(`${Cypress.env('host')}new-event`);
    // Ignore the null error
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    cy.on('uncaught:exception', (err, runnable) => {
      if (err.message.includes(`Cannot read property 'classList' of null`)) {
        return false;
      }
    });
    cy.url().should('eq', Cypress.env('host'));
  });

  it('does not allow routing to event matches', () => {
    cy.visit(`${Cypress.env('host')}event-matches`);
    // Ignore the null error
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    cy.on('uncaught:exception', (err, runnable) => {
      if (err.message.includes(`Cannot read property 'classList' of null`)) {
        return false;
      }
    });
    cy.url().should('eq', Cypress.env('host'));
  });

  it('allows routing to marketplace', () => {
    cy.visit(`${Cypress.env('host')}marketplace`);
    // Ignore the null error
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    cy.on('uncaught:exception', (err, runnable) => {
      if (err.message.includes(`Cannot read property 'classList' of null`)) {
        return false;
      }
    });
    cy.url().should('eq', `${Cypress.env('host')}marketplace`);
  });

  it('allows routing to matches', () => {
    cy.visit(`${Cypress.env('host')}matches`);
    // Ignore the null error
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    cy.on('uncaught:exception', (err, runnable) => {
      if (err.message.includes(`Cannot read property 'classList' of null`)) {
        return false;
      }
    });
    cy.url().should('eq', `${Cypress.env('host')}matches`);
  });

  it('allows routing to settings', () => {
    cy.visit(`${Cypress.env('host')}settings`);
    // Ignore the null error
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    cy.on('uncaught:exception', (err, runnable) => {
      if (err.message.includes(`Cannot read property 'classList' of null`)) {
        return false;
      }
    });
    cy.url().should('eq', `${Cypress.env('host')}settings`);
  });
});

describe('Marketplace', () => {
  it('navigates to marketplace', () => {
    cy.get('[data-cy=navigate-marketplace]').click();
    cy.url().should('include', '/marketplace');
  });

  it('queries an event', () => {
    cy.get('[data-cy=search-input]').type('Rust');
  });

  it('visits an event', () => {
    cy.get('[data-cy=event-view-button]')
      .first()
      .click();
    cy.url().should('match', /(?:event\/)(?:.*)/);
  });
});

describe('Sign out', () => {
  it('signs out to the home page', () => {
    cy.get('[data-cy=logout-button]').click();
    cy.url().should('include', Cypress.env('host'));
  });
});
