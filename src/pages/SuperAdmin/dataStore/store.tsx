import React from 'react';
import { Box, Stack, TextField, Toolbar, InputAdornment } from '@mui/material';
import NavigationBar from '../../../components/appBar';
import { CENTER } from '../../../utils/stylesheet';
import { Colors } from '../../../utils/colors';
import { Add, ViewList, Search, DeleteOutline } from '@mui/icons-material';
import StoreTable from './storeTable';
import { useNavigate } from "react-router-dom";
import DeleteModal from '../../../components/deleteModal';
import { isMobile } from 'react-device-detect';

const dummyTable = {
    content: [
        {
            id: 1,
            store: "Warteg Woro Kangen",
            address: "Jl. Tendean No. 11, Jakarta Selatan",
            admin: "Admin",
        },
        {
            id: 2,
            store: "Warteg Woro Kangen",
            address: "Jl. Tendean No. 11, Jakarta Selatan",
            admin: "Admin",
        },
        {
            id: 3,
            store: "Warteg Woro Kangen",
            address: "Jl. Tendean No. 11, Jakarta Selatan",
            admin: "Admin",
        },
        {
            id: 4,
            store: "Warteg Woro Kangen",
            address: "Jl. Tendean No. 11, Jakarta Selatan",
            admin: "Admin",
        },
        {
            id: 5,
            store: "Warteg Woro Kangen",
            address: "Jl. Tendean No. 11, Jakarta Selatan",
            admin: "Admin",
        },
        {
            id: 6,
            store: "Warteg Woro Kangen",
            address: "Jl. Tendean No. 11, Jakarta Selatan",
            admin: "Admin",
        },
        {
            id: 7,
            store: "Warteg Woro Kangen",
            address: "Jl. Tendean No. 11, Jakarta Selatan",
            admin: "Admin",
        },
        {
            id: 8,
            store: "Warteg Woro Kangen",
            address: "Jl. Tendean No. 11, Jakarta Selatan",
            admin: "Admin",
        },
    ],
    totalElements: 10,
    number: 0,
    size: 5,
};

const DataStore = () => {
    const navigate = useNavigate()
    const [isDeleteModal, setDeleteModal] = React.useState(false);

    const handleDelete = () => {
        setDeleteModal(!isDeleteModal);
    };

    const FormStore = () => navigate('/store-data/form-store')

    return (
        <div style={{ display: 'flex' }}>
            <NavigationBar title={'Data Toko'} indexNav={2} isChild={false}></NavigationBar>
            <Box
                component="main"
                sx={{ bgcolor: '#f4f5ff', p: isMobile ? 2 : 5, width: '100vw', minHeight: '100vh' }}
            >
                <Toolbar />
                <div style={{ maxWidth: isMobile ? '100vw' : '78vw' }}>
                    <StoreTable data={dummyTable} />
                </div>
                <DeleteModal isOpen={isDeleteModal} setOpen={handleDelete} />
            </Box>
        </div >
    )
}

export default DataStore;