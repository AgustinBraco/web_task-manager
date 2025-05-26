describe('[Add]', () => {
  beforeEach(() => cy.visit('/'))

  it('Verify if component is visible', () => {
    cy.get('[data-cy=add]').should('be.visible')
  })

  it('Click and open modal', () => {
    cy.get('[data-cy=add]').click()
    cy.get('[data-cy=modal-title]').should('have.text', 'Agregar tarea')
  })
})
