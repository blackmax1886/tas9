import { session2 } from '../fixtures/otherSessions.json'
import session from '../fixtures/session.json'
import { aliasMutation, hasOperationName } from '../utils/graphql-test-utils'

describe('Task management with quick-add', () => {
  // Seed test user data before running the tests
  before('seed-test-user', () => {
    cy.task('db:reset-user')
    cy.task('db:seed-user')
    cy.task('db:seed-session')
  })

  // Reset tasks and login before each test
  beforeEach('reset tasks', () => {
    cy.task('db:reset-task')
    cy.googleLogin(session)
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

  it('login user can create only own tasks', function () {
    cy.intercept('POST', '/api/graphql', (req) => {
      aliasMutation(req, 'createTask')
      if (hasOperationName(req, 'createTask')) {
        req.body.variables.task.userId = session2.user.id
      }
    })
    Cypress.on('uncaught:exception', (err) => {
      expect(err.message).to.include(
        'You are not the owner of task you create.'
      )
      return false
    })
    cy.dataCy('quickAdd').type('test1{enter}')
    cy.wait('@gqlcreateTaskMutation').then(() => {
      cy.task('db:find-tasks', session.user.id).should('be.empty')
      cy.task('db:find-tasks', session2.user.id).should('be.empty')
    })
  })
})
