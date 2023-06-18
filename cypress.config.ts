import { defineConfig } from 'cypress'

import session from './cypress/fixtures/session.json'

import { prisma } from '@/prisma/client'


export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    viewportHeight: 1080,
    viewportWidth: 1920,
    setupNodeEvents(on) {
      on('task', {
        async 'db:seed-user'() {
          // seed test user data
          const result = await prisma.user.create({
            data: session.user,
          })
          return result
        },
        async 'db:seed-session'() {
          // seed test user's session data
          const result = await prisma.session.create({
            data: {
              sessionToken: 'Test Session',
              userId: session.user.id,
              expires: new Date(session.expires)
            },
          })
          return result
        },
        async 'db:reset-user'() {
          // delete test user data
          const result = await prisma.user.deleteMany({
            where: {
              OR: [
                {
                  id: session.user.id,
                },
                {
                  email: session.user.email,
                }
              ]
            },
          })
          return result
        },
        async 'db:reset-task'() {
          // delete test user's tasks
          const result = await prisma.task.deleteMany({
            where: {
              userId: session.user.id,
            },
          })
          return result
        },
        async 'db:seed-task'(input) {
          const result = await prisma.task.create({
            data: {
              userId: input.userId,
              title: input.title,
              content: input.content,
              done: input.done || false,
              due: input.due,
              start: input.start,
              end: input.end,
              group: input.group,
              type: input.type,
              priority: input.priority,
              archived: input.archived || false,
              createdAt: new Date(),
            },
          })
          return result
        },
      })
    },
  },
})
