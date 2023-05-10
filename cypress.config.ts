import { PrismaClient } from '@prisma/client'
import { defineConfig } from 'cypress'

const prisma = new PrismaClient()

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
              id: 'clhep0xew0000ml08ri93zfr9',
              name: 'Test User',
              email: 'test@example.com',
            },
          })
          return result
        },
        async 'db:reset-user'() {
          // delete test user data
          const result = await prisma.user.delete({
            where: {
              id: 'clhep0xew0000ml08ri93zfr9',
            },
          })
          return result
        },
        async 'db:reset-task'() {
          // delete test user's tasks
          const result = await prisma.task.deleteMany({
            where: {
              userId: 'clhep0xew0000ml08ri93zfr9',
            },
          })
          return result
        },
      })
    },
  },
})
