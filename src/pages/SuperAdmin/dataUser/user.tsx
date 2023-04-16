import React from 'react';
import { Box, Toolbar } from '@mui/material';
import NavigationBar from '../../../components/appBar';
import './styles.css'
import UserTable from './userTable';
import { isMobile } from 'react-device-detect';

const dummyTable = {
    content: [
        {
            id: 1,
            name: "Siti",
            store: "Hanifah Barokah",
            role: "Admin",
            isActive: false,
        },
        {
            id: 2,
            name: "Siti",
            store: "Hanifah Barokah",
            role: "Admin",
            isActive: true,
        },
        {
            id: 3,
            name: "Siti",
            store: "Hanifah Barokah",
            role: "Admin",
            isActive: false,
        },
        {
            id: 4,
            name: "Siti",
            store: "Hanifah Barokah",
            role: "Admin",
            isActive: true,
        },
        {
            id: 5,
            name: "Siti",
            store: "Hanifah Barokah",
            role: "Admin",
            isActive: false,
        },
        {
            id: 6,
            name: "Siti",
            store: "Hanifah Barokah",
            role: "Admin",
            isActive: true,
        },
        {
            id: 7,
            name: "Siti",
            store: "Hanifah Barokah",
            role: "Admin",
            isActive: false,
        },
        {
            id: 8,
            name: "Siti",
            store: "Hanifah Barokah",
            role: "Admin",
            isActive: true,
        },
    ],
    totalElements: 10,
    number: 0,
    size: 5,
};

const DataUser = () => {
    return (
        <div style={{ display: 'flex' }}>
            <NavigationBar title={'Data Pengguna'} indexNav={1} isChild={false}></NavigationBar>
            <Box
                component="main"
                sx={{ bgcolor: '#f4f5ff', p: isMobile ? 2 : 5, width: '100vw', minHeight: '100vh' }}
            >
                <Toolbar />
                <div style={{ maxWidth: isMobile ? '100vw' : '78vw' }}>
                    <UserTable data={dummyTable} />
                </div>
            </Box>
        </div >
    )
}

export default DataUser;