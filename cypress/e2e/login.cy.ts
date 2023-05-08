describe('template spec', () => {
  it('can access home', () => {
    cy.visit('/')
    cy.googleLogin().then(() => cy.visit('home'))
  })
})
