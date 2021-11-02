import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { AuthContextProvider } from './contexts/AuthContext'

import { AdminRoom } from './pages/AdminRoom'
import { NewRoom } from "./pages/NewRoom"
import { Home } from "./pages/Home"
import { Room } from './pages/Room'

export const App = () => {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path="/" component={Home} exact/>
          <Route path="/rooms/new" component={NewRoom} exact />
          <Route path="/rooms/:id" component={Room} />
          <Route path="/admin/rooms/:id" component={AdminRoom} />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  )
}