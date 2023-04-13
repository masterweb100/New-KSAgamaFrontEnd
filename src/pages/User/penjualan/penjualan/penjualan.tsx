import { Box, Toolbar } from '@mui/material';
import React from 'react'
import NavigationBarUser from '../../../../components/appBarUser';
import { penjualanData } from '../dummy';
import PenjualanTable from './penjualanTable';
import { isMobile } from 'react-device-detect';

const Penjualan = () => {
    return (
        <div style={{ display: 'flex' }}>
            <NavigationBarUser title={'Penjualan'} isChild={false} name={'Penjualan'} idPanel={3}></NavigationBarUser>
            <Box component="main" sx={{ bgcolor: '#f4f5ff', p: isMobile ? 2 : 5, width: '100vw', minHeight: '100vh' }}>
                <Toolbar />
                <div style={{ maxWidth: isMobile ? '100vw' : '78vw' }}>
                    <PenjualanTable data={penjualanData}></PenjualanTable>
                </div>
            </Box>
        </div>
    )
}

export default Penjualan;