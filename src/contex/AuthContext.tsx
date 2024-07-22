import { useContext, createContext, useState, ReactNode, useRef, useEffect } from "react";

// Type for authentication state
type AuthState = {
    username?: string,
    isAuth: boolean
    expirationTime?: number
}

// Type for authentication context data
type AuthContextData = {
    username : string
    isAuth: boolean
    login : (username: string) => void
    logout: () => void
}

// Expiration interval for authentication session
const EXPIRATION_INTERVAL = 10 * 60 * 1000

const AuthContext = createContext<AuthContextData | undefined>(undefined)

/**
 * AuthProvider component manages authentication state and provides login/logout functionality.
 * @param children ReactNode containing child components wrapped by AuthProvider.
 */
export const AuthProvider = (props: {children :ReactNode} ) => {
    const [authState, setAuthState] = useState<AuthState>({isAuth:false})
    const isPeding = useRef(false)
    const now = new Date().getTime()

        // Load authentication state from localStorage on component mount
    useEffect(() => {
        isPeding.current = true
        const jsonAuthState = localStorage.getItem("authUser")

        if(jsonAuthState) {
            const tmpAuthState = JSON.parse(jsonAuthState) as AuthState
            tmpAuthState.expirationTime as number > now && setAuthState(tmpAuthState)
        }
    }, [])

    // Save authentication state to localStorage on change
    useEffect(() => {
        if (isPeding.current) {
            isPeding.current = false
        } else {
            if (authState.isAuth) {
                localStorage.setItem("authUser", JSON.stringify(authState))
            } else {
                localStorage.removeItem("authUser")
            }
        }
    }, [authState])

        /**
     * Function to log in user and set authentication state.
     * @param username Username of the authenticated user.
     */
    const login = (name: string) => {
        setAuthState({
            username: name,
            isAuth: true, 
            expirationTime : now + EXPIRATION_INTERVAL})
    }

    /**
     * Function to log out user and reset authentication state.
     */
    const logout = () => {
        setAuthState({isAuth: false})
    }

       // Render AuthContext.Provider with authentication context data
    return (
        <AuthContext.Provider value={{
            username: authState.username ?? "",
            isAuth: authState.isAuth,
            login, 
            logout }}>
            {props.children}
        </AuthContext.Provider>
        
    )
}

/**
 * Custom hook to access AuthContext data.
 * @returns AuthContextData containing username, isAuth, login, and logout functions.
 * @throws Error if used outside of an AuthProvider.
 */
export const useAuthStateContext: () => AuthContextData = () => {
    const authContext = useContext(AuthContext)

    if (!authContext) {
        throw new Error("AuthContext must be used within a AuthProvider")
    }

    return authContext
} 