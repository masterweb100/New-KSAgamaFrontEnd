import { Box, Toolbar } from '@mui/material';
import React from 'react'
import NavigationBarUser from '../../../../../components/appBarUser';
import { childData } from '../../dummy';
import { isMobile } from 'react-device-detect';
import KasTable from './kasTable';

const KasBank = () => {
    return (
        <div style={{ display: 'flex' }}>
            <NavigationBarUser title={'Transaksi Kas'} isChild={true} name={'Kelola Kas & Bank'} idPanel={6}></NavigationBarUser>
            <Box
                component="main"
                sx={{ bgcolor: '#f4f5ff', p: isMobile ? 2 : 5, width: '100vw', minHeight: '100vh' }}
            >
                <Toolbar />
                <div style={{ maxWidth: isMobile ? '100vw' : '78vw' }}>
                    <div style={{ marginTop: 20 }}>
                        <KasTable data={childData} />
                    </div>
                </div>
            </Box>
        </div>
    )
}

export default KasBank;