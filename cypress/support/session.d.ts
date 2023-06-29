type NextAuthSession = {
  user: {
    id: string
    name: string
    email: string
  }
  expires: string
  sessionToken: string
}

export default NextAuthSession
