describe('Buscar tareas', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })

    it('Filtra tareas por texto', () => {
        cy.get('[data-cy=search-input]').type('react')
        cy.get('[data-cy=task]').each(($el) => {
            cy.wrap($el).should('contain.text', 'react')
        })
    })

    it('Muestra mensaje cuando no hay coincidencias', () => {
        cy.get('[data-cy=search-input]').type('no-coincide')
        cy.get('[data-cy=tasks-title]').should('contain.text', 'No hay tareas')
    })
})
