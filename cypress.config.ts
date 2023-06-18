import { defineConfig } from 'cypress'

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
            data: {
              id: 'user1',
              name: 'Test User',
              email: 'test@example.com',
            },
          })
          return result
        },
        async 'db:seed-session'() {
          // seed test user's session data
          const result = await prisma.session.create({
            data: {
              sessionToken: 'Test Session',
              userId: 'user1',
              expires: new Date('2999-12-31')
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
                  id: 'user1',
                },
                {
                  email: 'test@example.com',
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
              userId: 'user1',
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
