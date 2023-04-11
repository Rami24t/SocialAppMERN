import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import ViewProfile from './pages/viewProfile/ViewProfile';
import ContextProvider from './components/context/Context';
import 'semantic-ui-css/semantic.min.css'
import Account from './pages/account/Account';
import Layout from './components/layout/Layout';

try {
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
   <ContextProvider>
        <Routes>
        <Route element={<Layout />} >
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/home' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/view-profile/:id' element={<ViewProfile />} />
          <Route path='/account' element={<Account />} />
          <Route path='*' element={<Login />} />
        </Route>
        </Routes>
    </ContextProvider>
      </BrowserRouter>  
  );
} catch (error) {
  console.log(error);
}