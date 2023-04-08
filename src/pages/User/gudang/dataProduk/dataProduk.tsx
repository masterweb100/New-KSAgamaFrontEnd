import { Box, Toolbar, Tabs, Tab, styled } from '@mui/material';
import React from 'react'
import NavigationBarUser from '../../../../components/appBarUser';
import { Colors } from '../../../../utils/colors';
import DataProdukTable from './dataProdukTable';
import DataOpnameTabs from './dataOpnameTabs';
import { produkTable } from '../dummy';
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

const DataProduk = () => {
    const [value, setValue] = React.useState('barang');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <div style={{ display: 'flex' }}>
            <NavigationBarUser title={'Detail Data Produk'} isChild={false} name={'Data Produk'} idPanel={2}></NavigationBarUser>
            <Box
                component="main"
                sx={{ bgcolor: '#f4f5ff', p: isMobile ? 3 : 5, width: '100vw', minHeight: '100vh' }}
            >
                <Toolbar />
                <div>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <CustomTabs
                            value={value}
                            onChange={handleChange}
                            textColor="secondary"
                            indicatorColor="secondary"
                        >
                            <CustomTab value="barang" label="Stok Barang" />
                            <CustomTab value="opname" label="Stok Opname" />
                        </CustomTabs>
                    </Box>
                    <div style={{ marginTop: 20 }}>
                        {
                            value === 'barang' ?
                                <DataProdukTable data={produkTable} />
                                :
                                <DataOpnameTabs></DataOpnameTabs>
                        }
                    </div>
                </div>
            </Box>
        </div>
    )
}

export default DataProduk;