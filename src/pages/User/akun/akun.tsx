import { Box, Stack, Toolbar } from '@mui/material';
import React from 'react'
import NavigationBarUser from '../../../components/appBarUser';
import { Store } from '@mui/icons-material/';

const Akun = () => {
    const [storeActive, setStoreActive] = React.useState<any>(null)

    return (
        <div style={{ display: 'flex' }}>
            <NavigationBarUser title={'Akun'} isChild={false} name={'Akun'} idPanel={5}></NavigationBarUser>
            <Box
                component="main"
                sx={{ bgcolor: '#f4f5ff', py: 5, px: 10, width: '100vw', minHeight: '100vh' }}
            >
                <Toolbar />
                <div>
                    {/* Content */}
                </div>
            </Box>
        </div>
    )
}

export default Akun;