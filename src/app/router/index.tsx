import { Route, Routes } from 'react-router-dom'

import { Login } from '@/view/pages/login'
import { LoginLayout } from '@/view/layouts/login-layout'
import { NewRoom } from '@/view/pages/new-room'
import { HomeRoom } from '@/view/pages/home-room'
import { AdminRoom } from '@/view/pages/admin-room'

export function Router() {
  return (
    <Routes>
      <Route element={<LoginLayout />}>
        <Route path={'/'} element={<Login />} />
        <Route path={'/room/new'} element={<NewRoom />} />
      </Route>

      <Route path={'/room/:id'} element={<HomeRoom />} />
      <Route path={'/room/:id/admin'} element={<AdminRoom />} />

      <Route path={'*'} element={<h1>Not Found</h1>} />
    </Routes>
  )
}
