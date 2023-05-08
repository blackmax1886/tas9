describe('template spec', () => {
  before('seed-test-user', () => {
    cy.task('db:reset-user')
    cy.task('db:seed-user')
  })
  it('can access home', () => {
    cy.visit('/')
    cy.googleLogin().then(() => cy.visit('home'))
  })
})
