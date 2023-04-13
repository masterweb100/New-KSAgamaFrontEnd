import { Box, Toolbar } from '@mui/material';
import React from 'react'
import NavigationBarUser from '../../../../components/appBarUser';
import { returnData } from '../dummy';
import ReturnPenjualanTable from './returnPenjualanTable';
import { isMobile } from 'react-device-detect';

const ReturnPenjualan = () => {    
    return (
        <div style={{ display: 'flex' }}>
            <NavigationBarUser title={'Return Penjualan'} isChild={false} name={'Return Penjualan'} idPanel={3}></NavigationBarUser>
            <Box component="main" sx={{ bgcolor: '#f4f5ff', p: isMobile ? 2 : 5, width: '100vw', minHeight: '100vh' }}>
                <Toolbar />
                <div style={{ maxWidth: isMobile ? '100vw' : '78vw' }}>
                    <ReturnPenjualanTable data={returnData}></ReturnPenjualanTable>
                </div>
            </Box>
        </div>
    )
}

export default ReturnPenjualan;