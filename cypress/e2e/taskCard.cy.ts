import { session2 } from '../fixtures/otherSessions.json'
import session from '../fixtures/session.json'

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
      if (req.body.operationName === 'getTasks') {
        req.body.variables.userId = session2.user.id
      }
    }).as('GraphQL')
    cy.visit('/home')
    cy.wait('@GraphQL').then((interception) => {
      if (interception.request.body.operationName === 'getTasks') {
        expect(interception.response?.statusCode).to.equal(200)
        expect(interception.response?.body).to.have.property('data', null)
        expect(interception.response?.body).to.have.property('errors')
        const errors = interception.response?.body.errors
        expect(errors[0]).to.have.property('message', 'Not Authorised!')
      }
    })
    cy.dataCy('taskCard').should('have.length', 0)
  })
})
