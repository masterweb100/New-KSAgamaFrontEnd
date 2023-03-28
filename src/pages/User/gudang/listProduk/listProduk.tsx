import { Box, Toolbar, styled, Tabs, Tab } from '@mui/material';
import React from 'react'
import NavigationBarUser from '../../../../components/appBarUser';
import { Colors } from '../../../../utils/colors';
import { listProdukTable } from '../dummy';
import BrandTable from './brandTable';
import KategoriTable from './kategoriTable';
import JenisTable from './jenisTable';
import SatuanTable from './satuanTable';

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
    const [page, setPage] = React.useState(0);
    const [itemsPerPage, setItemsPerPage] = React.useState(5);
    const [value, setValue] = React.useState('brand');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <div style={{ display: 'flex' }}>
            <NavigationBarUser title={'List Produk'} isChild={false} name={'List Produk'} idPanel={2}></NavigationBarUser>
            <Box component="main" sx={{ bgcolor: '#f4f5ff', py: 5, px: 5, width: '100vw', minHeight: '100vh' }}>
                <Toolbar />
                <div>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <CustomTabs
                            value={value}
                            onChange={handleChange}
                            textColor="secondary"
                            indicatorColor="secondary"
                        >
                            <CustomTab value="brand" label="Nama Brand" />
                            <CustomTab value="kategori" label="Kategori Produk" />
                            <CustomTab value="jenis" label="Jenis Produk" />
                            <CustomTab value="satuan" label="Satuan Produk" />
                        </CustomTabs>
                    </Box>
                    <div style={{ marginTop: 20 }}>
                        {
                            value === 'brand' ?
                                <BrandTable data={listProdukTable}></BrandTable>
                                :
                                value === 'kategori' ?
                                    <KategoriTable
                                        data={listProdukTable}
                                        setPage={setPage}
                                        setItemsPerPage={setItemsPerPage}
                                    ></KategoriTable>
                                :
                                value === 'jenis' ?
                                    <JenisTable
                                        data={listProdukTable}
                                        setPage={setPage}
                                        setItemsPerPage={setItemsPerPage}
                                    ></JenisTable>
                                    :
                                    <SatuanTable
                                        data={listProdukTable}
                                        setPage={setPage}
                                        setItemsPerPage={setItemsPerPage}
                                    ></SatuanTable>
                        }
                    </div>
                </div>
            </Box >
        </div >
    )
}

export default ListProduk;