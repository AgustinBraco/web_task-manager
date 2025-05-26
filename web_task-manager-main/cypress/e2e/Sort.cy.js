describe('Ordenar tareas', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })

    it('Ordena por prioridad', () => {
        cy.get('[data-cy=sort-select]').select('Prioridad')
        cy.get('[data-cy=task]').then(tasks => {
            const prioridades = [...tasks].map(el => parseInt(el.querySelector('.priority').textContent.trim()))
            expect(prioridades).to.deep.equal([...prioridades].sort((a, b) => a - b))
        })
    })

    it('Ordena por fecha', () => {
        cy.get('[data-cy=sort-select]').select('Fecha')
        // similar al de prioridad pero comparando fechas
    })
})
