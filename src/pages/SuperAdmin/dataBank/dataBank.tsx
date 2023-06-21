import React from 'react';
import { toast } from 'react-toastify';
import { Box, Toolbar } from '@mui/material';
import NavigationBar from '../../../components/appBar';

const DataBank = () => {
    return (
        <div style={{ display: 'flex' }}>
            <NavigationBar title={'Data Bankir'} indexNav={5} isChild={false}></NavigationBar>
            <Box
                component="main"
                sx={{ bgcolor: '#f4f5ff', p: 5, width: '100vw', minHeight: '100vh' }}
            >
                <Toolbar />
            </Box>
        </div>
    )
}

export default DataBank;