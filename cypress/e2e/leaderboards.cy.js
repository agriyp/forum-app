/**
 * - Leaderboards spec
 *   - should display leaderboards page correctly
 *   - should display username and score
 */

describe('Leaderboards spec', () => {
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
    cy.get('nav')
      .contains(/^Leaderboard$/)
      .click();
  });

  it('should display leaderboards page correctly', () => {
    cy.get('h2')
      .contains(/^Klasemen Pengguna Aktif$/)
      .should('be.visible');
  });

  it('should display username and score', () => {
    cy.get('.user-info p').should('be.visible');
    cy.get('.user-item__score').should('be.visible');
  });
});
