describe('[Task]', () => {
  beforeEach(() => cy.visit('/'))

  it('Verify if component is visible', () => {
    cy.get('[data-cy=add]').click()
    cy.get('[data-cy=modal-input]').type('New task')
    cy.get('[data-cy=modal-description]').type('Description')
    cy.get('[data-cy=modal-date]').type('2035-05-01')
    cy.get('[data-cy=modal-priority]').select('1')
    cy.get('[data-cy=modal-submit]').click()
    cy.get('[data-cy=task]').last().should('be.visible')
  })

  it('Complete task', () => {
    cy.get('[data-cy=add]').click()
    cy.get('[data-cy=modal-input]').type('Completed task')
    cy.get('[data-cy=modal-description]').type('Description')
    cy.get('[data-cy=modal-date]').type('2035-05-01')
    cy.get('[data-cy=modal-priority]').select('1')
    cy.get('[data-cy=modal-submit]').click()
    cy.get('[data-cy=task-check]').last().click()
    cy.get('[data-cy=task-check]').last().should('have.class', 'completed')
  })

  it('Edit task', () => {
    cy.get('[data-cy=add]').click()
    cy.get('[data-cy=modal-input]').type('Edit task')
    cy.get('[data-cy=modal-description]').type('Description')
    cy.get('[data-cy=modal-date]').type('2035-05-01')
    cy.get('[data-cy=modal-priority]').select('1')
    cy.get('[data-cy=modal-submit]').click()
    cy.get('[data-cy=task-edit]').last().click()
    cy.get('[data-cy=modal-input]').type('Edited task')
    cy.get('[data-cy=modal-submit]').click()
    cy.contains('Edited task').should('be.visible')
  })

  it('Delete task', () => {
    cy.get('[data-cy=add]').click()
    cy.get('[data-cy=modal-input]').type('Delete task')
    cy.get('[data-cy=modal-description]').type('Description')
    cy.get('[data-cy=modal-date]').type('2035-05-01')
    cy.get('[data-cy=modal-priority]').select('1')
    cy.get('[data-cy=modal-submit]').click()
    cy.get('[data-cy=task-delete]').last().click()
    cy.contains('Delete task').should('not.exist')
  })
})
