
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { AppStyled } from './styles/appStyles'
import { useAuthStateContext } from './contex/AuthContext'
import Home from './pages/Home'
import { ConditionalRoute } from './components/ConditionalRoute'
import Login from './pages/Login'

/**
 * App component manages routing based on authentication state
 */
function App() {
  const {isAuth} = useAuthStateContext()



  return (
    <Router>
      <AppStyled>
          <Switch>
            {/* Route to Home component if authenticated, otherwise redirect to login */}
            <ConditionalRoute path='/' component={Home} condition={isAuth} redirectTo='/login' exact/>
            {/* Route to Login component if not authenticated, otherwise redirect to Home */}
            <ConditionalRoute path='/login' component={Login} condition={!isAuth} redirectTo='/' exact/>
          </Switch>
      </AppStyled>
    </Router>
  )
}

export default App
