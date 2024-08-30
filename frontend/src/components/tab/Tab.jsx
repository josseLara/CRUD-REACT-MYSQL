import './Tab.css'
import React, { useState } from 'react';
import { TabMenu } from 'primereact/tabmenu';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';

const CustomTabMenu = ({onLogout}) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const navigate = useNavigate();

    const items = [
        { label: 'Rol', icon: 'pi pi-home', command: () => navigate('/home') },
        { label: 'UsuarioRol', icon: 'pi pi-chart-line', command: () => navigate('/usuarioRol') },
    ];

    return (
        <div className="card tab">
            <TabMenu model={items} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} />
            <Button label="Logout" icon="pi pi-sign-in" onClick={onLogout} />

        </div>
    );
};

export default CustomTabMenu;
