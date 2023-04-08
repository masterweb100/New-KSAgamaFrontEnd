import { Box, Toolbar, styled, Tabs, Tab } from '@mui/material';
import React from 'react'
import NavigationBarUser from '../../../../components/appBarUser';
import { Colors } from '../../../../utils/colors';
import { pembelianData } from '../dummy';
import PembelianTable from './pembelianTable';
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

const Pembelian = () => {
    const [value, setValue] = React.useState('semua');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        event.preventDefault()
        setValue(newValue);
    };

    return (
        <div style={{ display: 'flex' }}>
            <NavigationBarUser title={'Pembelian'} isChild={false} name={'Pembelian'} idPanel={4}></NavigationBarUser>
            <Box component="main" sx={{ bgcolor: '#f4f5ff', p: isMobile ? 3 : 5, width: '100vw', minHeight: '100vh' }}>
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
                            <CustomTab value="pending" label="Pending" />
                            <CustomTab value="lunas" label="Lunas" />
                            <CustomTab value="belumlunas" label="Belum Lunas" />
                            <CustomTab value="tidaksetuju" label="Tidak Disetujui" />
                        </CustomTabs>
                    </Box>
                    <div style={{marginTop: 20}}>
                        <PembelianTable data={pembelianData}></PembelianTable>
                    </div>
                </div>
            </Box>
        </div>
    )
}

export default Pembelian;