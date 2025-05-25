describe('[Modal]', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('[data-cy=add]').click()
  })

  it('Verify if component is visible', () => {
    cy.get('[data-cy=modal]').should('be.visible')
  })

  it('Close modal', () => {
    cy.get('[data-cy=modal-close]').click()
    cy.get('[data-cy=modal-title]').should('not.be.visible')
  })

  it('Try to add task with no title', () => {
    cy.get('[data-cy=modal-description]').type('Description')
    cy.get('[data-cy=modal-date]').type('2025-05-01')
    cy.get('[data-cy=modal-priority]').select('1')
    cy.get('[data-cy=modal-submit]').should('be.disabled')
  })

  it('Try to add task with no description', () => {
    cy.get('[data-cy=modal-input]').type('Title')
    cy.get('[data-cy=modal-date]').type('2025-05-01')
    cy.get('[data-cy=modal-priority]').select('1')
    cy.get('[data-cy=modal-submit]').should('be.disabled')
  })

  it('Try to add task with invalid date', () => {
    cy.get('[data-cy=modal-input]').type('Title')
    cy.get('[data-cy=modal-description]').type('Description')
    cy.get('[data-cy=modal-date]').type('2025-05-01')
    cy.get('[data-cy=modal-priority]').select('1')
    cy.get('[data-cy=modal-submit]').click()
    cy.get('[data-cy=modal-title]').should('be.visible')
  })

  it('Create a new task', () => {
    cy.get('[data-cy=modal-input]').type('New task')
    cy.get('[data-cy=modal-description]').type('Description')
    cy.get('[data-cy=modal-date]').type('2035-05-01')
    cy.get('[data-cy=modal-priority]').select('1')
    cy.get('[data-cy=modal-submit]').click()
    cy.contains('New task').should('be.visible')
  })

  it('Show add title', () => {
    cy.get('[data-cy=modal-title]').should('have.text', 'Agregar tarea')
  })

  it('Shows edit title', () => {
    cy.get('[data-cy=modal-input]').type('Update task')
    cy.get('[data-cy=modal-description]').type('Description')
    cy.get('[data-cy=modal-date]').type('2035-05-01')
    cy.get('[data-cy=modal-priority]').select('1')
    cy.get('[data-cy=modal-submit]').click()
    cy.get('[data-cy=task-edit]').last().click()
    cy.get('[data-cy=modal-title]').should('have.text', 'Editar tarea')
  })
})
