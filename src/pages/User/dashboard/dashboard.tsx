import { Box, Stack, Toolbar } from '@mui/material';
import React from 'react'
import NavigationBarUser from '../../../components/appBarUser';
import { Store } from '@mui/icons-material/';
import './style.css'

const DashboardUser = () => {
    const [storeActive, setStoreActive] = React.useState<any>(null)

    return (
        <div style={{ display: 'flex' }}>
            <NavigationBarUser title={'Dashboard'} indexNav={0} isChild={false}></NavigationBarUser>
            <Box
                component="main"
                sx={{ bgcolor: '#f4f5ff', py: 5, px: 10 }}
            >
                <Toolbar />
                <Stack direction={'column'} gap={3}>
                    {
                        [1, 1, 1, 1, 1, 1, 1, 1, 1].map((item, index) => (
                            <div className={'box'} onMouseEnter={() => setStoreActive(index)} key={index} onMouseLeave={() => setStoreActive(null)}>
                                <Stack direction={'row'} gap={2}>
                                    <Store sx={{ color: storeActive === index ? '#673de5' : '#909090', fontSize: 30, transition: 'all 0.2s' }}></Store>
                                    <Stack direction={'column'} gap={1}>
                                        <h3 style={{ margin: 0 }}>Data Statistik Toko A</h3>
                                        <p style={{ margin: 0 }}>
                                            Nostrud cillum amet nisi anim eu quis duis anim ex enim sunt laboris commodo. Officia duis cupidatat consectetur deserunt quis proident dolor nulla ex magna. Dolor dolore ad ea magna ipsum aliqua nostrud tempor ullamco excepteur incididunt non.
                                        </p>
                                    </Stack>
                                </Stack>
                            </div>
                        ))
                    }
                </Stack>
            </Box>
        </div>
    )
}

export default DashboardUser;