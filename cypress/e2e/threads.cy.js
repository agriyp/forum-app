/**
 * - Threads spec
 *   - should display threads page correctly
 *   - should display all thread item
 */

describe('Threads spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
    cy.get('input[placeholder="Username"]').type('asep@email.com');
    cy.get('input[placeholder="Password"]').type('asep123');
    cy.get('button')
      .contains(/^Login$/)
      .click();
    cy.get('nav')
      .contains(/^Threads$/)
      .click();
  });

  it('should display threads page correctly', () => {
    cy.get('h2')
      .contains(/^Diskusi Tersedia$/)
      .should('be.visible');
  });

  it('should display all thread item', () => {
    cy.get('.thread-item').should('be.visible');
  });
});
