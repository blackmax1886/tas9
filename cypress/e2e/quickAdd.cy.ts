describe('Task management with quick-add', () => {
  before('seed-test-user', () => {
    cy.task('db:reset-user')
    cy.task('db:seed-user')
  })
  beforeEach('reset tasks', () => {
    cy.task('db:reset-task')
    cy.googleLogin()
    cy.visit('/home')
  })
  it('can add a task by quick-add', () => {
    cy.dataCy('quickAdd').type('test{enter}')
    cy.dataCy('taskCard').should('have.length', 1)
  })
  it('can add multiple tasks by quick-add', () => {
    cy.dataCy('quickAdd').type('test1{enter}')
    cy.dataCy('taskCard').should('have.length', 1)
    cy.dataCy('quickAdd').type('test2{enter}')
    cy.dataCy('taskCard').should('have.length', 2)
  })
})
