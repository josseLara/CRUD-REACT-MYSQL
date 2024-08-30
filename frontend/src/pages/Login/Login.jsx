import './Login.css';
import React, { useState, useEffect } from "react";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { useNavigate } from 'react-router-dom';
import useApi from '../../hook/useApi';

function Login({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { data, error, isLoading, fetchData } = useApi();
    const navigate = useNavigate();

    useEffect(() => {
        if (data && data.status === "success") {
            const { token } = data.data;
            localStorage.setItem('token', token);
            onLogin();
            navigate("/home"); // Navegar a /home después de iniciar sesión exitosamente
        }
    }, [data, onLogin, navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        const body = {
            email: username,
            password,
        };

        try {
            await fetchData("http://localhost:3000/api/auth/signin", "post", body);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                // setInvalidCredentials(true);
            }
        }
    };

    return (
        <div className="login">
            <Card title="Login">
                <form onSubmit={handleLogin} className="login_form">
                    <IconField iconPosition="left">
                        <InputIcon className="pi pi-user"></InputIcon>
                        <InputText value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Email" />
                    </IconField>

                    <Password promptLabel="Elije una contraseña" weakLabel="Demasiado simple" mediumLabel="Complejidad media" strongLabel="Contraseña compleja" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='contraseña' />
                    {error && <p className='alert-txt'>La contraseña o el email es incorrecto</p>}
                    <Button type="submit" label="Login" />
                </form>
            </Card>
        </div>
    );
}

export default Login;
