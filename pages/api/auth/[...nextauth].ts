import NextAuth, { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],

  // secret: process.env.SECRET,

  session: {
    strategy: 'database',
    maxAge: 60 * 60 * 24 * 30, // 30 days
    updateAge: 60 * 60 * 24, // 24 hours
  },

  useSecureCookies: process.env.NODE_ENV === 'production',

  callbacks: {
    async session({ session, user }) {
      if (session?.user) session.user.id = user.id
      return session
    },
  },
}

export default NextAuth(authOptions)
