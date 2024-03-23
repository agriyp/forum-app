/**
 * - inputThread spec
 *   - should display inputThread page correctly
 *   - should display alert when title is empty
 *   - should display alert when body is empty
 *   - should display threads page when title and body are correct
 *   - should display threads page when title, category and body are correct
 */

describe('InputThread spec', () => {
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
    cy.get('.btn__add-thread').click();
  });

  it('should display inputThread page correctly', () => {
    cy.get('input[placeholder="Isikan judul..."]').should('be.visible');
    cy.get('input[placeholder="Isikan kategori..."]').should('be.visible');
    cy.get('textarea[placeholder="Isikan apa yang kamu pikirkan..."]').should('be.visible');
    cy.get('button')
      .contains(/^Tambah$/)
      .should('be.visible');
  });

  it('should display alert when title is empty', () => {
    cy.get('button')
      .contains(/^Tambah$/)
      .click();
    cy.get('input[placeholder="Isikan judul..."]:invalid')
      .invoke('prop', 'validationMessage')
      .should('equal', 'Please fill out this field.');
  });

  it('should display alert when body is empty', () => {
    cy.get('input[placeholder="Isikan judul..."]').type('ini judul pertama');
    cy.get('button')
      .contains(/^Tambah$/)
      .click();
    cy.get('textarea[placeholder="Isikan apa yang kamu pikirkan..."]:invalid')
      .invoke('prop', 'validationMessage')
      .should('equal', 'Please fill out this field.');
  });

  it('should display threads page when title and body are correct', () => {
    cy.get('input[placeholder="Isikan judul..."]').type('judul dan body saja');
    cy.get('textarea[placeholder="Isikan apa yang kamu pikirkan..."]').type('ini body lorem ipsum');
    cy.get('button')
      .contains(/^Tambah$/)
      .click();
    cy.get('nav')
      .contains(/^Threads$/)
      .should('be.visible');
  });

  it('should display threads page when title, category and body are correct', () => {
    cy.get('input[placeholder="Isikan judul..."]').type('judul, category, dan body');
    cy.get('input[placeholder="Isikan kategori..."]').type('ini kategori lorem ipsum');
    cy.get('textarea[placeholder="Isikan apa yang kamu pikirkan..."]').type('ini body lorem ipsum');
    cy.get('button')
      .contains(/^Tambah$/)
      .click();
    cy.get('nav')
      .contains(/^Threads$/)
      .should('be.visible');
  });
});
