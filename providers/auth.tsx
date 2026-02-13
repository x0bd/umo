import { auth } from '@/lib/neon'
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from 'react'

// ============================================
// TYPES
// ============================================
interface User {
  id: string
  email: string
  name: string
  image?: string | null
}

interface Session {
  token: string
  user: User
}

interface AuthContextValue {
  user: User | null
  session: Session | null
  isLoading: boolean
  isAuthenticated: boolean
  signOut: () => Promise<void>
  refreshSession: () => Promise<void>
}

// ============================================
// CONTEXT
// ============================================
const AuthContext = createContext<AuthContextValue>({
  user: null,
  session: null,
  isLoading: true,
  isAuthenticated: false,
  signOut: async () => {},
  refreshSession: async () => {},
})

export function useAuth() {
  return useContext(AuthContext)
}

// ============================================
// PROVIDER
// ============================================
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const refreshSession = useCallback(async () => {
    try {
      const { data, error } = await auth.getSession()

      if (error || !data?.session) {
        setUser(null)
        setSession(null)
        return
      }

      const sessionUser: User = {
        id: data.session.user.id,
        email: data.session.user.email,
        name: data.session.user.name,
        image: data.session.user.image,
      }

      setUser(sessionUser)
      setSession({
        token: data.session.token,
        user: sessionUser,
      })
    } catch (err) {
      console.warn('[auth] Session check failed:', err)
      setUser(null)
      setSession(null)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleSignOut = useCallback(async () => {
    try {
      await auth.signOut()
    } catch (err) {
      console.warn('[auth] Sign out error:', err)
    } finally {
      setUser(null)
      setSession(null)
    }
  }, [])

  useEffect(() => {
    refreshSession()
  }, [refreshSession])

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        isAuthenticated: !!user,
        signOut: handleSignOut,
        refreshSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
