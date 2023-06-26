describe('template spec', () => {
  before('seed-test-user', () => {
    cy.task('db:reset-user')
    cy.task('db:seed-user')
    cy.task('db:seed-session')
  })

  beforeEach('import session data', () => {
    cy.fixture('session').as('defaultSession')
  })

  it('can access home', () => {
    cy.googleLogin()
      .then(() => cy.visit('home'))
      .url()
      .should('contain', 'home')
  })

  it('new user should have 0 task on tasklist', () => {
    cy.googleLogin().then(() => cy.visit('home'))
    cy.dataCy('logo').should('be.visible')
    cy.dataCy('taskCard').should('have.length', 0)
  })

  it('should display a task for a user that has a task', function () {
    cy.task('db:reset-task')
    cy.task('db:seed-task', {
      userId: this.defaultSession.user.id,
      title: 'test1',
    })
    cy.visit('/')
    cy.googleLogin().then(() => {
      cy.visit('home')
    })
    cy.dataCy('logo').should('be.visible')
    cy.dataCy('taskCard').should('have.length', 1)
  })
})
