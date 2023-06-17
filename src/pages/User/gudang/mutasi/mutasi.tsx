import { Box, Toolbar, styled, Tabs, Tab } from '@mui/material';
import React from 'react'
import NavigationBarUser from '../../../../components/appBarUser';
import { Colors } from '../../../../utils/colors';
import { mutasiTable, returnTable } from '../dummy';
import MutasiTable from './mutasiTable';
import ReturnTable from './returnTable';
import { isMobile } from 'react-device-detect';
import secureLocalStorage from 'react-secure-storage';
import { HTTPGetMutations } from '../../../../apis/User/mutationReturn/mutations';

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

const Mutasi = () => {
    const [value, setValue] = React.useState('mutasi');
    
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        event.preventDefault()
        setValue(newValue);
    };

    return (
        <div style={{ display: 'flex' }}>
            <NavigationBarUser title={'Mutasi & Return'} isChild={false} name={'Mutasi & Return'} idPanel={2}></NavigationBarUser>
            <Box component="main" sx={{ bgcolor: '#f4f5ff', p: isMobile ? 2 : 5, width: '100vw', minHeight: '100vh' }}>
                <Toolbar />
                <div style={{ maxWidth: isMobile ? '100vw' : '78vw' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <CustomTabs
                            value={value}
                            onChange={handleChange}
                            textColor="secondary"
                            indicatorColor="secondary"
                        >
                            <CustomTab value="mutasi" label="List Mutasi" />
                            <CustomTab value="return" label="List Return" />
                        </CustomTabs>
                    </Box>
                    <div style={{ marginTop: 20 }}>
                        {
                            value === 'mutasi' ?
                                <MutasiTable></MutasiTable>
                                :
                                <ReturnTable data={returnTable}></ReturnTable>
                        }
                    </div>
                </div>
            </Box>
        </div>
    )
}

export default Mutasi;