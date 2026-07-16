import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import './index.css'
import App from './App.jsx'
import {router} from './routing/AppRouting.jsx'
import AuthProvider from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <Toaster position="bottom-left" reverseOrder={false} />
      <RouterProvider router={router}>
          <App />
      </RouterProvider>
    </AuthProvider>
  </StrictMode>,
)


