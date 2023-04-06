import { Box, Toolbar } from '@mui/material';
import React from 'react'
import NavigationBarUser from '../../../components/appBarUser';
import { kategoriData } from './dummy';
import KategoriTable from './kategoriTable';

const KategoriAkun = () => {
    return (
        <div style={{ display: 'flex' }}>
            <NavigationBarUser title={'List Kategori Akun'} isChild={true} name={'Akun'} idPanel={5}></NavigationBarUser>
            <Box
                component="main"
                sx={{ bgcolor: '#f4f5ff', p: 5, width: '100vw', minHeight: '100vh' }}
            >
                <Toolbar />
                <div>
                    <KategoriTable data={kategoriData}></KategoriTable>
                </div>
            </Box>
        </div>
    )
}

export default KategoriAkun;