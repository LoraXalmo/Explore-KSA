import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import DataContextFunction from './context/context';
import Layout from './components/layout/Layout.jsx';
import Login from './components/Login/Login.jsx';
import Signup from './components/Signup/Signup.jsx';
import WelcomePage from './components/WelcomePage/WelcomePage.jsx';
import { ToastContainer } from 'react-toastify';
import ForgetPassword from './components/ForgetPassword/ForgetPassword.jsx';
import RedirectIfAuthenticated from './components/RedirectIfAuthenticated/RedirectIfAuthenticated.jsx';
import Profile from './components/Profile/Profile.jsx';
import Notfoundpage from './components/Notfoundpage/Notfoundpage.jsx';
import HomePage from './components/HomePage/HomePage.jsx';
import Protected from './components/Protucted/Protucted.jsx';

export default function App() {
  // Set up the router
  let router = createBrowserRouter([
    {
      path: '',
      element: <Layout />,
      children: [
        { index: true, element: <WelcomePage /> },
        { path: '/HomePage', element: <Protected><HomePage /></Protected> },

        { 
          path: '/login', 
          element: <RedirectIfAuthenticated><Login /></RedirectIfAuthenticated> 
        },  
        { 
          path: '/signup', 
          element: <RedirectIfAuthenticated><Signup /></RedirectIfAuthenticated> 
        },
        { path: '/forgot-password', element: <ForgetPassword /> },
      
        {
          path: '/profile', element: <Protected><Profile /></Protected>
        },
        {path:"*",element:<Notfoundpage/>}
        
      ]
    }
  ]);

  return (
    <DataContextFunction>
      <RouterProvider router={router} />
      
    </DataContextFunction>
  );
}
