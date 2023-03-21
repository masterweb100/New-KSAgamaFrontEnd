import React from 'react';
import { Box, Stack, Toolbar } from '@mui/material';
import NavigationBar from '../../../components/appBar';

const AccessUser = () => {
    return (
        <div style={{ display: 'flex' }}>
            <NavigationBar title={'Hak Akses'} indexNav={4} isChild={false}></NavigationBar>
            <Box
                component="main"
                sx={{ bgcolor: '#f4f5ff', py: 5, px: 10, width: '100vw', minHeight: '100vh' }}
            >
                <Toolbar />
            </Box>
        </div>
    )
}

export default AccessUser;