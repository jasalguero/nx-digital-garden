describe('shared-ui: TopicButton component', () => {
  beforeEach(() =>
    cy.visit('/iframe.html?id=topicbutton--primary&args=topicName:React')
  );

  it('should render the component', () => {
    cy.get('[data-testid=topic-name]').should('contain', 'React');
  });

  it('should react to the click', () => {
    cy.get('[data-testid=topic-button]').click();
    cy.get('[data-testid=topic-clicked]').should('contain', 'React');
  });
});
