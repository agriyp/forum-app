/**
 * - inputComment spec
 *   - should display inputComment page correctly
 *   - should display alert when content is empty
 *   - should display comment on detailPage when content are correct
 */

describe('InputComment spec', () => {
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
    cy.get('.thread-item__title').last().click();
    // thread-91KocEqYPRz68MhD
  });

  it('should display inputComment page correctly', () => {
    cy.get('textarea[placeholder="Isikan komentar..."]').should('be.visible');
    cy.get('button')
      .contains(/^Tambah$/)
      .should('be.visible');
  });

  it('should display alert when content is empty', () => {
    cy.get('button')
      .contains(/^Tambah$/)
      .click();
    cy.get('textarea[placeholder="Isikan komentar..."]:invalid')
      .invoke('prop', 'validationMessage')
      .should('equal', 'Please fill out this field.');
  });

  it('should display comment on detailPage when content are correct', () => {
    cy.get('textarea[placeholder="Isikan komentar..."]').type('test komentar');
    cy.get('button')
      .contains(/^Tambah$/)
      .click();
    cy.get('.comment__body').first().should('contain', 'test komentar');
  });
});
