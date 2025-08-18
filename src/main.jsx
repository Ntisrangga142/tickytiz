import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'

import Router from './router/Router'
import { store } from './redux/store'
import {Provider} from "react-redux"
import { AuthProvider } from "./contexts/AuthContext";
import { ToastContainer } from 'react-toastify'
import { OrderProvider } from './contexts/OrderContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <OrderProvider>
        <AuthProvider>
          <Router />
          <ToastContainer position="top-right" autoClose={3000} />
        </AuthProvider>
      </OrderProvider>
    </Provider>
  </StrictMode>,
)
