import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login/Login';
import Rol from '../pages/Rol/Rol';
import UsuarioRol from '../pages/UsuarioRol/UsuarioRol';
import Layout from '../components/Layout';

function RoutesApp() {
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLogin(true);
        }
    }, []);

    const handleLogin = () => {
        setIsLogin(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLogin(false);
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={isLogin ? <Navigate to="/home" /> : <Login onLogin={handleLogin} />} />
                <Route path="/home" element={isLogin ? <Layout onLogout={handleLogout}><Rol /></Layout> : <Navigate to="/" />} />
                <Route path="/usuarioRol" element={isLogin ? <Layout onLogout={handleLogout}><UsuarioRol /></Layout> : <Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

export default RoutesApp;
