import { ReactNode, createContext, useState, useEffect, useContext } from 'react'
import { checkAuthStatus, loginUser, logoutUser, signUpUser } from '../helpers/api-connectors'

type User = {
  name: string
  email: string
}
type UserAuth = {
  isLoggedIn: boolean
  user: User | null
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, name: string) => Promise<void>
  logout: () => Promise<void>
}
const AuthContext = createContext<UserAuth | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

  useEffect(() => {
    // fetch the current user if cookies are valid then skip login
    async function checkStatus() {
      try {
        const data = await checkAuthStatus()
        if (data) {
          setUser({ email: data.email, name: data.name })
          setIsLoggedIn(true)
        }
      } catch (error) {
        console.error(error)
      }
    }
    checkStatus()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const data = await loginUser(email, password)
      if (data) {
        setUser({ email: data.email, name: data.name })
        setIsLoggedIn(true)
      }
    } catch (error) {
      console.error(error)
    }
  }
  const signup = async (name: string, email: string, password: string) => {
    const data = await signUpUser(name, email, password);
    if (data) {
      setUser({ email: data.email, name: data.name });
      setIsLoggedIn(true);
    }
  };
  const logout = async () => {
    await logoutUser();
    setIsLoggedIn(false)
    setUser(null)
    window.location.reload()
  }

  const value = {
    user,
    isLoggedIn,
    login,
    signup,
    logout,
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext)