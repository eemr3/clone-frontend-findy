import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/auth.jsx';
import { RegisterProvider } from './context/newRegister';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RegisterProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </RegisterProvider>,
);
