import { session2 } from '../fixtures/otherSessions.json'
import session from '../fixtures/session.json'
import { aliasMutation, hasOperationName } from '../utils/graphql-test-utils'

describe('Account Management Functionality', () => {
  beforeEach('login', () => {
    // Seed test user data before running the tests
    cy.task('db:reset-user')
    cy.task('db:seed-user')
    cy.task('db:seed-session')
    cy.session(session.user.id, () => {
      cy.googleLogin(session)
    })
    cy.visit('home')
  })

  it('should display correct user email when account menu is clicked', () => {
    cy.dataCy('accountMenu')
      .click()
      .then(() => {
        cy.dataCy('accountToggleMenu').should('be.visible')
        cy.dataCy('accountMenuHeader')
          .invoke('text')
          .should('eq', session.user.email)
      })
  })

  it('should successfully delete the user account and redirect to homepage', () => {
    cy.dataCy('accountMenu')
      .click()
      .then(() => {
        cy.dataCy('accountToggleMenu').should('be.visible')
        cy.dataCy('deleteAccount').click()
        cy.dataCy('modal').should('be.visible')
        cy.dataCy('confirmButton')
          .click()
          .url()
          .should('eq', Cypress.config().baseUrl + '/')
        cy.task('db:find-user', session.user.id).should('be.null')
      })
  })

  it('users can delete only their own account', () => {
    cy.dataCy('accountMenu')
      .click()
      .then(() => {
        cy.task('db:find-user', session.user.id).should('not.be.null')
        cy.task('db:find-user', session2.user.id).should('not.be.null')
        cy.intercept('POST', '/api/graphql', (req) => {
          aliasMutation(req, 'DeleteUser')
          if (hasOperationName(req, 'DeleteUser')) {
            req.body.variables.userId = session2.user.id
          }
        })
        cy.dataCy('accountToggleMenu').should('be.visible')
        cy.dataCy('deleteAccount').click()
        cy.dataCy('modal').should('be.visible')
        // set event listner for NextJS error not to fail test
        Cypress.on('uncaught:exception', (err) => {
          expect(err.message).to.include('You are not the current user.')
          return false
        })
        cy.dataCy('confirmButton').click()
        cy.wait('@gqlDeleteUserMutation').then(() => {
          cy.task('db:find-user', session.user.id).should('not.be.null')
          cy.task('db:find-user', session2.user.id).should('not.be.null')
        })
      })
  })
})
