describe('Task management with quick-add', () => {
  // Seed test user data before running the tests
  before('seed-test-user', () => {
    cy.task('db:reset-user')
    cy.task('db:seed-user')
  })

  // Reset tasks and login before each test
  beforeEach('reset tasks', () => {
    cy.task('db:reset-task')
    cy.googleLogin()
    cy.visit('/home')
  })

  // Test if a single task can be added using the quick-add feature
  it('can add a task by quick-add', () => {
    cy.dataCy('quickAdd').type('test{enter}')
    cy.dataCy('taskCard').should('have.length', 1)
  })

  // Test if multiple tasks can be added using the quick-add feature
  it('can add multiple tasks by quick-add', () => {
    cy.dataCy('quickAdd').type('test1{enter}')
    cy.dataCy('taskCard').should('have.length', 1)
    cy.dataCy('quickAdd').type('test2{enter}')
    cy.dataCy('taskCard').should('have.length', 2)
  })
})
