import { session2 } from '../fixtures/otherSessions.json'
import session from '../fixtures/session.json'
import { generalTask } from '../fixtures/tasks.json'
import { convertHTMLtoString } from '../utils/content-editable-test-utils'
import {
  aliasMutation,
  aliasQuery,
  hasOperationName,
} from '../utils/graphql-test-utils'

import { dayjs, formatString } from '@/lib/day'

describe('taskDetail shows properties of task & edit them', () => {
  before('seed-test-user', () => {
    cy.task('db:reset-user')
    cy.task('db:seed-user')
    cy.task('db:seed-session')
  })

  beforeEach('reset & seed tasks', () => {
    cy.task('db:reset-task')
    cy.task('db:seed-task', {
      userId: session.user.id,
      ...generalTask,
    }).then(() => {
      cy.googleLogin(session)
      cy.visit('/home')
    })
  })

  it('does not show TaskDetail when task is not selected', () => {
    cy.dataCy('taskCard').should('have.length', 1)
    cy.dataCy('taskDetail').should('not.exist')
  })

  it('shows selected task detail', () => {
    cy.dataCy('taskCard').should('have.length', 1)
    cy.dataCy('taskCardTitle').invoke('text').should('equal', generalTask.title)
    cy.dataCy('taskCard').click()
    cy.dataCy('taskDetailTitle')
      .should('be.visible')
      .invoke('text')
      .should('eq', generalTask.title)
    cy.dataCy('taskDetailStart')
      .invoke('text')
      .then((start) => {
        const expectedStart = dayjs(generalTask.start).format(formatString)
        expect(start).to.include(expectedStart)
      })
    cy.dataCy('taskDetailEnd')
      .invoke('text')
      .then((end) => {
        const expectedEnd = dayjs(generalTask.end).format(formatString)
        expect(end).to.include(expectedEnd)
      })
    cy.dataCy('taskDetailContent')
      .invoke('text')
      .should('eq', convertHTMLtoString(generalTask.content))
  })

  describe('edit task detail', () => {
    it('should focus task content when press enter key on task title', () => {
      cy.dataCy('taskCard').should('have.length', 1)
      cy.dataCy('taskCard').click()
      cy.dataCy('editableTaskDetailTitle').focus().type('{moveToEnd}a{enter}')
      cy.dataCy('editableTaskDetailContent').should('have.focus')
    })
    it('should save task title when changed', () => {
      cy.intercept('POST', '/api/graphql', (req) => {
        aliasMutation(req, 'UpdateTaskTitle')
      })
      cy.dataCy('taskCard').should('have.length', 1)
      cy.dataCy('taskCard').click()
      cy.dataCy('editableTaskDetailTitle').focus().type('{moveToEnd}a')
      // Wait for UpdateTaskTitle to be saved with a delay after it is entered.
      cy.wait('@gqlUpdateTaskTitleMutation')
      cy.get('@gqlUpdateTaskTitleMutation')
        .its('request')
        .its('body')
        .its('variables')
        .its('title')
        .should('eq', generalTask.title + 'a')
      cy.dataCy('taskDetailTitle')
        .invoke('text')
        .should('eq', generalTask.title + 'a')
      cy.dataCy('taskCardTitle')
        .invoke('text')
        .should('eq', generalTask.title + 'a')
    })
    it('should save task content when changed', () => {
      cy.intercept('POST', '/api/graphql', (req) => {
        aliasMutation(req, 'UpdateTaskContent')
      })
      cy.dataCy('taskCard').should('have.length', 1)
      cy.dataCy('taskCard').click()
      cy.dataCy('editableTaskDetailContent')
        .focus()
        .type('{moveToEnd}{enter}te{enter}st')
      // Wait for UpdateTaskContent to be saved with a delay after it is entered.
      cy.wait('@gqlUpdateTaskContentMutation')
      cy.dataCy('editableTaskDetailContent')
        .invoke('html')
        .then((innerHTML) => {
          const expectedHTML =
            generalTask.content + '<div>te</div><div>st</div>'
          expect(innerHTML).to.equal(expectedHTML)
          cy.get('@gqlUpdateTaskContentMutation')
            .its('request')
            .its('body')
            .its('variables')
            .its('content')
            .should('eq', expectedHTML)
        })
    })
  })

  describe('GraphQL should be protected by authorization shield', () => {
    it('task should not be fetched by anyone but the owner', () => {
      cy.task('db:seed-task', {
        userId: session2.user.id,
        title: 'task of another user',
      })
        .its('id')
        .as('taskId')
      cy.get('@taskId').then((taskId) => {
        cy.intercept('POST', '/api/graphql', (req) => {
          aliasQuery(req, 'GetTask')
          // get a task that does not belong to current user
          if (hasOperationName(req, 'GetTask')) {
            req.body.variables.taskId = taskId
          }
        })
      })
      cy.dataCy('taskCard').click()
      cy.get('@gqlGetTaskQuery')
        .its('response')
        .its('statusCode')
        .should('eq', 200)
      cy.get('@gqlGetTaskQuery')
        .its('response')
        .its('body')
        .its('data')
        .its('task')
        .should('be.null')

      cy.get('@gqlGetTaskQuery')
        .its('response')
        .its('body')
        .its('errors')
        .should('be.a', 'array')
        .its(0)
        .its('message')
        .should('eq', 'You are not the owner of this task.')
    })
  })
})
