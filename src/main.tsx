import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { GlobalStyle } from './styles/globalStyles.ts'
import { AuthProvider } from './contex/AuthContext.tsx'

// Render the application into the root element
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* Apply global styles */}
    <GlobalStyle/>
    
    {/* Provide authentication context to the entire app */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
)
