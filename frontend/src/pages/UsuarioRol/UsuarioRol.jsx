import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import useApi from '../../hook/useApi';

export default function UsuarioRol() {
    const [roles, setRoles] = useState([]);
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [roleDialog, setRoleDialog] = useState(false);
    const [deleteRoleDialog, setDeleteRoleDialog] = useState(false);
    const [currentRole, setCurrentRole] = useState({ id: null, nombre: '', apellido: '', telefono: '', rol: '' });
    const { data, error, isLoading, fetchData, setData } = useApi();
    const dt = useRef(null);

    useEffect(() => {
        fetchData('http://localhost:3000/api/userRoles');
    }, []);

    useEffect(() => {
        if (Array.isArray(data)) {
            setRoles(data);
        }
    }, [data]);

    const openNew = () => {
        setCurrentRole({ id: null, nombre: '', apellido: '', telefono: '', rol: '' });
        setRoleDialog(true);
    };

    const hideDialog = () => {
        setRoleDialog(false);
    };

    const hideDeleteRoleDialog = () => {
        setDeleteRoleDialog(false);
    };

    const saveRole = () => {
        if (currentRole.id) {
            // Update role
            fetchData(`http://localhost:3000/api/userRoles/${currentRole.id}`, 'put', currentRole).then(() => {
                fetchData('http://localhost:3000/api/userRoles'); // Refresh data after update
            });
        } else {
            // Create new role
            fetchData('http://localhost:3000/api/userRoles', 'post', currentRole).then(() => {
                fetchData('http://localhost:3000/api/userRoles'); // Refresh data after create
            });
        }
        setRoleDialog(false);
    };

    const editRole = (role) => {
        setCurrentRole({ ...role });
        setRoleDialog(true);
    };

    const confirmDeleteRole = (role) => {
        setCurrentRole(role);
        setDeleteRoleDialog(true);
    };

    const deleteRole = () => {
        fetchData(`http://localhost:3000/api/userRoles/${currentRole.id}`, 'delete').then(() => {
            fetchData('http://localhost:3000/api/userRoles'); // Refresh data after delete
        });
        setDeleteRoleDialog(false);
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="Agregar" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />
                {/* <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={() => setDeleteRoleDialog(true)} disabled={!selectedRoles.length} /> */}
            </React.Fragment>
        );
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editRole(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteRole(rowData)} />
            </React.Fragment>
        );
    };

    const header = (
        <div className="table-header">
            <h5 className="mx-0 my-1">Usuario rol</h5>
            <IconField iconPosition="left">
                <InputIcon className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </IconField>
        </div>
    );

    const roleDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveRole} />
        </React.Fragment>
    );

    const deleteRoleDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteRoleDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteRole} />
        </React.Fragment>
    );

    return (
        <div className="rol">
            <h1>Usuario rol</h1>
            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>
                <DataTable ref={dt} value={roles} selection={selectedRoles} onSelectionChange={(e) => setSelectedRoles(e.value)}
                    dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} roles" globalFilter={globalFilter} header={header}>
                    <Column selectionMode="multiple" exportable={false}></Column>
                    <Column field="id" header="ID"></Column>
                    <Column field="nombre" header="Nombre"></Column>
                    <Column field="apellido" header="Apellido"></Column>
                    <Column field="telefono" header="telefono"></Column>
                    <Column field="rol" header="rol"></Column>
                    <Column body={actionBodyTemplate} exportable={false}></Column>
                </DataTable>

                <Dialog visible={roleDialog} style={{ width: '450px' }} header="Role Details" modal className="p-fluid" footer={roleDialogFooter} onHide={hideDialog}>
                    <div className="field">
                        <label htmlFor="nombre">Nombre</label>
                        <InputText id="nombre" value={currentRole.nombre} onChange={(e) => setCurrentRole({ ...currentRole, nombre: e.target.value })} required autoFocus />
                    </div>
                    <div className="field">
                        <label htmlFor="apellido">Apellido</label>
                        <InputText id="apellido" value={currentRole.apellido} onChange={(e) => setCurrentRole({ ...currentRole, apellido: e.target.value })} required />
                    </div>
                    <div className="field">
                        <label htmlFor="telefono">Telefono</label>
                        <InputText id="telefono" value={currentRole.telefono} onChange={(e) => setCurrentRole({ ...currentRole, telefono: e.target.value })} required />
                    </div>
                    <div className="field">
                        <label htmlFor="rol">Rol</label>
                        <InputText id="rol" value={currentRole.rol} onChange={(e) => setCurrentRole({ ...currentRole, rol: e.target.value })} required />
                    </div>
                </Dialog>

                <Dialog visible={deleteRoleDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteRoleDialogFooter} onHide={hideDeleteRoleDialog}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle mr-3" />
                        {currentRole && <span>Are you sure you want to delete <b>{currentRole.nombre}</b>?</span>}
                    </div>
                </Dialog>
            </div>
        </div>
    );
}
