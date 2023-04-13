import { Box, Toolbar } from '@mui/material';
import React from 'react'
import NavigationBarUser from '../../../components/appBarUser';
import { kategoriData } from './dummy';
import KategoriTable from './kategoriTable';
import { isMobile } from 'react-device-detect';

const KategoriAkun = () => {
    return (
        <div style={{ display: 'flex' }}>
            <NavigationBarUser title={'List Kategori Akun'} isChild={true} name={'Akun'} idPanel={5}></NavigationBarUser>
            <Box
                component="main"
                sx={{ bgcolor: '#f4f5ff', p: isMobile ? 2 : 5, width: '100vw', minHeight: '100vh' }}
            >
                <Toolbar />
                <div style={{ maxWidth: isMobile ? '100vw' : '78vw' }}>
                    <KategoriTable data={kategoriData}></KategoriTable>
                </div>
            </Box>
        </div>
    )
}

export default KategoriAkun;