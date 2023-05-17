describe('template spec', () => {
  before('seed-test-user', () => {
    cy.task('db:reset-user')
    cy.task('db:seed-user')
  })
  it('can access home', () => {
    cy.googleLogin().then(() => cy.visit('home'))
  })

  it('new user should have 0 task on tasklist', () => {
    cy.visit('/')
    cy.googleLogin().then(() => cy.visit('home'))
    cy.dataCy('logo').should('be.visible')
    cy.dataCy('taskCard').should('have.length', 0)
  })
})
