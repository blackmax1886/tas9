import { session2 } from '../fixtures/otherSessions.json'
import session from '../fixtures/session.json'
import { generalTask } from '../fixtures/tasks.json'
import { convertHTMLtoString } from '../utils/content-editable-test-utils'
import { aliasQuery, hasOperationName } from '../utils/graphql-test-utils'

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

  //   it('shows nothing when task is not selected', () => {
  //     // do something
  //   })

  it('shows selected task title on h1', () => {
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

  it('task should not be fetched by anyone but the owner', () => {
    cy.task('db:seed-task', {
      userId: session2.user.id,
      title: 'task of another user',
    })
      .its('id')
      .as('taskId')
    cy.get('@taskId').then((taskId) => {
      cy.intercept('POST', '/api/graphql', (req) => {
        aliasQuery(req, 'getTask')
        // get a task that does not belong to current user
        if (hasOperationName(req, 'getTask')) {
          req.body.variables.taskId = taskId
        }
      })
    })
    cy.dataCy('taskCard').click()
    cy.get('@gqlgetTaskQuery')
      .its('response')
      .its('statusCode')
      .should('eq', 200)
    cy.get('@gqlgetTaskQuery')
      .its('response')
      .its('body')
      .its('data')
      .its('task')
      .should('be.null')

    cy.get('@gqlgetTaskQuery')
      .its('response')
      .its('body')
      .its('errors')
      .should('be.a', 'array')
      .its(0)
      .its('message')
      .should('eq', 'You are not the owner of this task.')
  })
})
