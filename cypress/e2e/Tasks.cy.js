describe('[Tasks]', () => {
  beforeEach(() => cy.visit('/'))

  it('Verify if component is visible', () => {
    cy.get('[data-cy=tasks]').should('be.visible')
  })

  it('Create tasks', () => {
    cy.get('[data-cy=task-delete]').each($el => cy.wrap($el).click())

    cy.get('[data-cy=add]').click()
    cy.get('[data-cy=modal-input]').type('Active task')
    cy.get('[data-cy=modal-description]').type('Description')
    cy.get('[data-cy=modal-date]').type('2035-05-01')
    cy.get('[data-cy=modal-priority]').select('1')
    cy.get('[data-cy=modal-submit]').click()

    cy.get('[data-cy=add]').click()
    cy.get('[data-cy=modal-input]').type('Completed task')
    cy.get('[data-cy=modal-description]').type('Description')
    cy.get('[data-cy=modal-date]').type('2035-05-01')
    cy.get('[data-cy=modal-priority]').select('1')
    cy.get('[data-cy=modal-submit]').click()
    cy.get('[data-cy=task-check]').last().click()
  })

  it('Show all tasks', () => {
    cy.contains('Active task').should('be.visible')
    cy.contains('Completed task').should('be.visible')
  })

  it('Show active task', () => {
    cy.get('[data-cy=button-activas]').click()
    cy.contains('Active task').should('be.visible')
    cy.contains('Completed task').should('not.exist')
  })

  it('Show completed task', () => {
    cy.get('[data-cy=button-completas]').click()
    cy.contains('Active task').should('not.exist')
    cy.contains('Completed task').should('be.visible')
  })

  it('Delete all tasks', () => {
    cy.get('[data-cy=task-delete]').each($el => cy.wrap($el).click())
    cy.get('[data-cy=tasks-title]').should('be.visible')
  })
})
