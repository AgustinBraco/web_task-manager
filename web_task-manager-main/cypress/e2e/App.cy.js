describe('[App]', () => {
  beforeEach(() => cy.visit('/'))

  it('App started correctly', () =>
    cy.get('[data-cy=app-title]').should('be.visible'))

  it('All components are visible', () => {
    cy.get('[data-cy=app-title]').should('be.visible')
    cy.get('[data-cy=bar]').should('be.visible')
    cy.get('[data-cy=tasks-title]').should('be.visible')
    cy.get('[data-cy=add]').should('be.visible')
  })
})
