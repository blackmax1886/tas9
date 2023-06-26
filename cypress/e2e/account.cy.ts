import { session2 } from '../fixtures/otherSessions.json'
import session from '../fixtures/session.json'

describe('Account Management Functionality', () => {
  beforeEach('login', () => {
    // Seed test user data before running the tests
    cy.task('db:reset-user')
    cy.task('db:seed-user')
    cy.task('db:seed-session')
    cy.session(session.user.id, () => {
      cy.visit('/')
      cy.intercept('api/auth/session', { fixture: 'session.json' }).as(
        'session'
      )
      cy.setCookie('next-auth.session-token', session.sessionToken)
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
          if (req.body.operationName === 'DeleteUser') {
            req.body.variables.userId = session2.user.id
          }
        }).as('deleteUser')
        cy.dataCy('accountToggleMenu').should('be.visible')
        cy.dataCy('deleteAccount').click()
        cy.dataCy('modal').should('be.visible')
        cy.dataCy('confirmButton').click()
        cy.wait('@deleteUser').then(() => {
          cy.task('db:find-user', session.user.id).should('not.be.null')
          cy.task('db:find-user', session2.user.id).should('not.be.null')
        })
      })
  })
})
