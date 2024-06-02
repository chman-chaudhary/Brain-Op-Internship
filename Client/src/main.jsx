import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie';
import Home from './Components/Home.jsx'
import Login from "./Components/Login.jsx"
import Signup from "./Components/Signup.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/home",
    element: <Home />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <CookiesProvider>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </CookiesProvider>
)
