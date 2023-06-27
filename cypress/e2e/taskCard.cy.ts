import { session2 } from '../fixtures/otherSessions.json'
import session from '../fixtures/session.json'
import { aliasQuery, hasOperationName } from '../utils/graphql-test-utils'

describe('Task card operations', () => {
  // Seed test user data before running the tests
  before('seed-test-user', () => {
    cy.task('db:reset-user')
    cy.task('db:seed-user')
    cy.task('db:seed-session')
  })

  // Reset tasks and login before each test
  beforeEach('reset & seed tasks', () => {
    cy.task('db:reset-task')
    cy.task('db:seed-task', {
      userId: session.user.id,
      title: 'test1',
    }).then(() => {
      cy.googleLogin(session)
      cy.visit('/home')
    })
  })

  it('should display the correct number of task cards with the correct title', () => {
    cy.dataCy('taskCard').should('have.length', 1)
    cy.dataCy('taskCardTitle').invoke('text').should('equal', 'test1')
  })

  it('should delete the task and verify it is removed from the All tab', () => {
    cy.dataCy('deleteTaskButon')
      .click()
      .then(() => {
        cy.dataCy('taskCard').should('have.length', 0)
      })
    cy.dataCy('allTab')
      .click()
      .then(() => {
        cy.dataCy('taskCard').should('have.length', 0)
      })
  })

  it('should mark the task as done and verify it is present in the Done tab', () => {
    cy.dataCy('doneTaskLabel')
      .click()
      .then(() => {
        cy.dataCy('taskCard').should('have.length', 0)
      })
    cy.dataCy('doneTab')
      .click()
      .then(() => {
        cy.dataCy('taskCard').should('have.length', 1)
        cy.dataCy('taskCardTitle').invoke('text').should('equal', 'test1')
      })
  })

  it('should add a new task and verify the tasks are ordered in descending order', () => {
    cy.task('db:seed-task', {
      userId: 'user1',
      title: 'test2',
    }).then(() => {
      cy.dataCy('taskCard').should('have.length', 2)
      cy.dataCy('taskCardTitle').first().invoke('text').should('equal', 'test2')
      cy.dataCy('taskCardTitle').eq(1).invoke('text').should('equal', 'test1')
    })
  })

  it('login user can get only own tasks', function () {
    cy.intercept('POST', '/api/graphql', (req) => {
      aliasQuery(req, 'getTasks')
      if (hasOperationName(req, 'getTasks')) {
        req.body.variables.userId = session2.user.id
      }
    })
    cy.visit('/home').wait('@gqlgetTasksQuery')
    cy.get('@gqlgetTasksQuery')
      .its('response')
      .its('statusCode')
      .should('eq', 200)
    cy.get('@gqlgetTasksQuery')
      .its('response')
      .its('body')
      .its('data')
      .should('be.null')
    cy.get('@gqlgetTasksQuery')
      .its('response')
      .its('body')
      .its('errors')
      .should('be.a', 'array')
      .its(0)
      .its('message')
      .should('eq', 'You are not the owner.')
    cy.dataCy('taskCard').should('have.length', 0)
  })
})
