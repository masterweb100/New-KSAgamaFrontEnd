import React from 'react';
import { Box, Toolbar } from '@mui/material';
import NavigationBar from '../../../components/appBar';
import RoleTable from './roleTable';
import { isMobile } from 'react-device-detect';

const dummyTable = {
    content: [
        { id: 1, role: "Admin" },
        { id: 2, role: "User" },
    ],
    totalElements: 10,
    number: 0,
    size: 5,
};

const DataRole = () => {
    return (
        <div style={{ display: 'flex' }}>
            <NavigationBar title={'Data Role'} indexNav={3} isChild={false}></NavigationBar>
            <Box
                component="main"
                sx={{ bgcolor: '#f4f5ff', p: isMobile ? 2 : 5, width: '100vw', minHeight: '100vh' }}
            >
                <Toolbar />
                <div style={{ maxWidth: isMobile ? '100vw' : '78vw' }}>
                    <RoleTable data={dummyTable} />
                </div>
            </Box>
        </div >
    )
}

export default DataRole;