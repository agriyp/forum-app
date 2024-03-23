/**
 * - detailThread spec
 *   - should display detailThread page correctly
 */

describe('detailThread spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
    cy.get('input[placeholder="Username"]').type('asep@email.com');
    cy.get('input[placeholder="Password"]').type('asep123');
    cy.get('button')
      .contains(/^Login$/)
      .click();
    cy.get('nav')
      .contains(/^Threads$/)
      .should('be.visible');
    cy.get('.thread-item__title').contains('perkenalkan').click();
  });

  it('should display detailThread page correctly', () => {
    cy.get('h2')
      .contains(/^Detail Thread$/)
      .should('be.visible');
    cy.get('.thread-item').should('be.visible');
  });
});
