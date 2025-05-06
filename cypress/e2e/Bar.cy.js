describe('Bar', () => {
  beforeEach(() => cy.visit('/'))

  it('Verify if component is visible', () => {
    cy.get('[data-cy=bar]').should('be.visible')
  })

  it('Show all tasks by default', () => {
    cy.get('[data-cy=button-todas]').should('have.class', 'active')
  })

  it('Change to active tasks', () => {
    cy.get('[data-cy=button-activas]').click()
    cy.get('[data-cy=button-activas]').should('have.class', 'active')
  })

  it('Change to completed tasks', () => {
    cy.get('[data-cy=button-completas]').click()
    cy.get('[data-cy=button-completas]').should('have.class', 'active')
  })
})
