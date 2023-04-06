import { Box, Toolbar, styled, Tabs, Tab } from '@mui/material';
import React from 'react'
import NavigationBarUser from '../../../../components/appBarUser';
import { Colors } from '../../../../utils/colors';
import { pembelianData } from '../dummy';
import TrackingTable from './trackingTable';

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

const Tracking = () => {
    const [value, setValue] = React.useState('semua');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        event.preventDefault()
        setValue(newValue);
    };

    return (
        <div style={{ display: 'flex' }}>
            <NavigationBarUser title={'Tracking'} isChild={false} name={'Tracking'} idPanel={4}></NavigationBarUser>
            <Box component="main" sx={{ bgcolor: '#f4f5ff', p: 5, width: '100vw', minHeight: '100vh' }}>
                <Toolbar />
                <div>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <CustomTabs
                            value={value}
                            onChange={handleChange}
                            textColor="secondary"
                            indicatorColor="secondary"
                        >
                            <CustomTab value="semua" label="Semua" />
                            <CustomTab value="pending" label="Pending" />
                            <CustomTab value="menunggu" label="Menunggu Barang Diterima" />
                            <CustomTab value="diterima" label="Barang Diterima" />
                            <CustomTab value="selesai" label="Selesai" />
                            <CustomTab value="return" label="Return" />
                        </CustomTabs>
                    </Box>
                    <div style={{ marginTop: 20 }}>
                        <TrackingTable data={pembelianData}></TrackingTable>
                    </div>
                </div>
            </Box>
        </div>
    )
}

export default Tracking;