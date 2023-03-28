import { Box, Stack, Toolbar } from '@mui/material';
import React from 'react'
import NavigationBarUser from '../../../../components/appBarUser';

const LapKeuangan = () => {
    return (
        <div style={{ display: 'flex' }}>
            <NavigationBarUser title={'Keuangan'} isChild={false} name={'Lap. Keuangan'} idPanel={6}></NavigationBarUser>
            <Box component="main" sx={{ bgcolor: '#f4f5ff', py: 5, px: 10, width: '100vw', minHeight: '100vh' }}>
                <Toolbar />
                <div>
                    {/* Content */}
                </div>
            </Box>
        </div>
    )
}

export default LapKeuangan;