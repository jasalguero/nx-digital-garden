describe('site', () => {
  beforeEach(() => cy.visit('/articles/dynamic_routing'));

  it('should display welcome message', () => {
    cy.get('h1').should('contain', 'Dynamic Routing and Static Generation');
  });

  it('should render the youtube component', () => {
    cy.get('iframe').should('be.visible');
  });
});
