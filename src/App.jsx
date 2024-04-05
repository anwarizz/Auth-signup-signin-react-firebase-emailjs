import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import './App.css'
import Landing from './pages/Landing'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'


function App() {
  const route = createBrowserRouter([
    {
      path: '/',
      element: <Landing />
    },
    {
      path: '/home',
      element: <Home />
    },
    {
      path: '/signup',
      element: <Register />
    },
    {
      path: '/login',
      element: <Login />
    }
  ])

  return (
    <RouterProvider router={route} />
  )
}

export default App
