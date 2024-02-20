import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Login } from '@/view/pages/login'
import { LoginLayout } from '@/view/layouts/login-layout'
import { NewRoom } from '@/view/pages/new-room'

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LoginLayout />}>
          <Route path={'/'} element={<Login />} />
          <Route path={'/room/new'} element={<NewRoom />} />
        </Route>

        <Route path={'/room/:id'} element={<h1>Room</h1>} />
        <Route path={'/room/:id/admin'} element={<h1>Admin Room</h1>} />

        <Route path={'*'} element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  )
}
