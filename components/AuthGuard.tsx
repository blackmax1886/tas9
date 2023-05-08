import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { ReactNode } from 'react'

const AuthGuard = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (!session) {
    router.push('/')
    return null
  }

  return <>{children}</>
}

export default AuthGuard
