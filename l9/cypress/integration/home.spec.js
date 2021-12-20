describe('Home Tests', () => {
  it('open the home page and verify the url and the title', () => {
    cy.visit('https://practice.automationbro.com');
    cy.url().should('include', 'automationbro');
    cy.title().should('eq', 'Practice E-Commerce Site – Automation Bro');
  });
  it('clicks the Get started button and asserts the url', () => {
    cy.get('#get-started').click();
    cy.url().should('include', '#get-started');
  });
  it('gets text of the heading and assert the value', () => {
    cy.get('h1.elementor-heading-title').should(e => {
      expect(e.text()).to.eq('Think different. Make different.');
    });
    // or
    cy.get('h1.elementor-heading-title').should('have.text', 'Think different. Make different.');
  });
  it('verifies the text of the first menu link item', () => {
    cy.get('#primary-menu').find('li').first().should('have.text', 'Home');
  });
});