import { Box, Toolbar, styled, Tabs, Tab } from '@mui/material';
import React from 'react'
import NavigationBarUser from '../../../../components/appBarUser';
import { Colors } from '../../../../utils/colors';
import { listProdukTable } from '../dummy';
import BrandTable from './brandTable';
import KategoriTable from './kategoriTable';
import JenisTable from './jenisTable';
import SatuanTable from './satuanTable';
import { isMobile } from 'react-device-detect';

const CustomTabs = styled(Tabs)({
    color: Colors.primary,
    '& .MuiTabs-indicator': {
        backgroundColor: Colors.primary
    }
})

const CustomTab = styled(Tab)({
    '&.Mui-selected': {
        color: Colors.primary,
    },
})

const ListProduk = () => {
    const [value, setValue] = React.useState('kategori');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <div style={{ display: 'flex' }}>
            <NavigationBarUser title={'List Produk'} isChild={false} name={'List Produk'} idPanel={2}></NavigationBarUser>
            <Box component="main" sx={{ bgcolor: '#f4f5ff', p: isMobile ? 2 : 5, width: '100vw', minHeight: '100vh' }}>
                <Toolbar />
                <div style={{ maxWidth: isMobile ? '100vw' : '78vw' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <CustomTabs
                            value={value}
                            onChange={handleChange}
                            textColor="secondary"
                            indicatorColor="secondary"
                            variant={isMobile ? 'scrollable' : 'standard'}
                            scrollButtons={isMobile ? true : false}
                            allowScrollButtonsMobile={isMobile ? true : false}
                        >
                            <CustomTab value="kategori" label="Kategori Produk" />
                            <CustomTab value="brand" label="Nama Brand" />
                            <CustomTab value="jenis" label="Jenis Produk" />
                            <CustomTab value="satuan" label="Satuan Produk" />
                        </CustomTabs>
                    </Box>
                    <div style={{ marginTop: 20 }}>
                        {
                            value === 'brand' ?
                                <BrandTable></BrandTable>
                                :
                                value === 'kategori' ?
                                    <KategoriTable></KategoriTable>
                                :
                                value === 'jenis' ?
                                    <JenisTable></JenisTable>
                                    :
                                    <SatuanTable data={listProdukTable}></SatuanTable>
                        }
                    </div>
                </div>
            </Box >
        </div >
    )
}

export default ListProduk;