import { Box, Toolbar } from '@mui/material';
import React from 'react'
import NavigationBarUser from '../../../../components/appBarUser';
import { produkData } from '../dummy';
import PembelianDetailTable from './pembelianDetailTable';
import { isMobile } from 'react-device-detect';

const PembelianDetail = () => {

    return (
        <div style={{ display: 'flex' }}>
            <NavigationBarUser title={'Detail Data SKU/0032'} isChild={true} name={'Pembelian'} idPanel={4}></NavigationBarUser>
            <Box component="main" sx={{ bgcolor: '#f4f5ff', p: isMobile ? 2 : 5, width: '100vw', minHeight: '100vh' }}>
                <Toolbar />
                <div style={{ maxWidth: isMobile ? '100vw' : '78vw' }}>
                    <PembelianDetailTable data={produkData}></PembelianDetailTable>
                </div>
            </Box>
        </div>
    )
}

export default PembelianDetail;