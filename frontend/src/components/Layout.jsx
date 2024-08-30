// src/components/Layout.js
import React from 'react';
import TabMenu from './tab/Tab';
import { Button } from 'primereact/button';

const Layout = ({ children, onLogout }) => {
    return (
        <div>
                <TabMenu onLogout={onLogout} />
            <div className="content">
                {children}
            </div>
        </div>
    );
};

export default Layout;
