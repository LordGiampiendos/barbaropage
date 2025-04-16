import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Routes, useNavigate, useLocation} from "react-router-dom";
import Header from './components/header';
import Footer from './components/footer';
import Home from './pages/home';
import ProfilePage from './pages/profile';
import EditEmailPage from './pages/edit-email';
import VerifieEmailPage from './pages/verifie-email';
import EditProfilePage from './pages/edit-profile';
import SecurityPage from './pages/edit-security';
import Login from './pages/login';
import OTP from './pages/otp';
import EditPassword from './pages/edit-password';
import RecoveryPassword from './pages/recovery-password';
import ResetPassword from './pages/reset-password';
import InsertPassword from './pages/insert-password';
import Registration from './pages/registration';
import PageNotFound from './components/error';
import React from 'react';
import { useAuth } from './pages/context/AuthContext';
import { useEffect } from 'react';
import axios from 'axios';

function App() {
    const { user, login, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        axios.post('https://serverbarbaropersonal.pagekite.me/session/get-session-data', user, {
            withCredentials: true,
        })
            .then(response => {
                login(response.data);
            })
            .catch(error => {
                logout();
                if (location.pathname !== '/' && location.pathname !== '/login' && location.pathname !== '/registration' && location.pathname !== '/recovery-password' && location.pathname !== '/reset-password' && location.pathname !== '/verifie-email') {
                    navigate('/');
                }
            })
    }, []);

    return (
        <div className="App">
            <Header />
            <Routes class='main-content'>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/edit-email" element={<EditEmailPage />} />
                <Route path="/verifie-email" element={<VerifieEmailPage />} />
                <Route path="/edit-profile" element={<EditProfilePage />} />
                <Route path="/edit-security" element={<SecurityPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/OTP" element={<OTP />} />
                <Route path="/edit-password" element={<EditPassword />} />
                <Route path="/recovery-password" element={<RecoveryPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/insert-password" element={<InsertPassword />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
