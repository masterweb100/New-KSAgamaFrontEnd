import { Box, Toolbar, styled, Tabs, Tab } from '@mui/material';
import { Colors } from '../../../utils/colors';
import React from 'react'
import NavigationBarUser from '../../../components/appBarUser';
import AkunTable from './akunTable';
import { akunData } from './dummy';
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


const Akun = () => {
    const [value, setValue] = React.useState('semua');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        event.preventDefault()
        setValue(newValue);
    };

    return (
        <div style={{ display: 'flex' }}>
            <NavigationBarUser title={'Akun'} isChild={false} name={'Akun'} idPanel={5}></NavigationBarUser>
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
                            variant={isMobile ? 'scrollable' : 'standard'}
                            scrollButtons={isMobile ? true : false}
                            allowScrollButtonsMobile={isMobile ? true : false}
                        >
                            <CustomTab value="semua" label="Semua" />
                            <CustomTab value="kas" label="Kas & Bank" />
                            <CustomTab value="income" label="Pendapatan" />
                            <CustomTab value="hargapokok" label="Harga Pokok Penjualan" />
                        </CustomTabs>
                    </Box>
                    <div style={{ marginTop: 20 }}>
                        <AkunTable data={akunData}></AkunTable>
                    </div>
                </div>
            </Box>
        </div>
    )
}

export default Akun;