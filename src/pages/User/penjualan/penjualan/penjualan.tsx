import { Box, Toolbar } from '@mui/material';
import React from 'react'
import NavigationBarUser from '../../../../components/appBarUser';
import { penjualanData } from '../dummy';
import PenjualanTable from './penjualanTable';

const Penjualan = () => {
    return (
        <div style={{ display: 'flex' }}>
            <NavigationBarUser title={'Penjualan'} isChild={false} name={'Penjualan'} idPanel={3}></NavigationBarUser>
            <Box component="main" sx={{ bgcolor: '#f4f5ff', py: 5, px: 5, width: '100vw', minHeight: '100vh' }}>
                <Toolbar />
                <div>
                    <PenjualanTable data={penjualanData}></PenjualanTable>
                </div>
            </Box>
        </div>
    )
}

export default Penjualan;