import { Box, Stack, Toolbar } from '@mui/material';
import React from 'react'
import NavigationBarUser from '../../../components/appBarUser';
import { Store } from '@mui/icons-material/';
import './style.css'

const DashboardUser = () => {
    const [storeActive, setStoreActive] = React.useState<any>(null)

    return (
        <div style={{ display: 'flex' }}>
            <NavigationBarUser title={'Dashboard User'} isChild={false} name={'Dashboard'} idPanel={1}></NavigationBarUser>
            <Box
                component="main"
                sx={{ bgcolor: '#f4f5ff', py: 5, px: 10, width: '100vw', minHeight: '100vh' }}
            >
                <Toolbar />
                <Stack direction={'column'} gap={3}>
                    {
                        [1, 1, 1, 1, 1, 1, 1, 1, 1].map((index) => (
                            <div className={'box'} onMouseEnter={() => setStoreActive(index)} key={index} onMouseLeave={() => setStoreActive(null)}>
                                <Stack direction={'row'} gap={2}>
                                    <Store sx={{ color: 'inherit', fontSize: 30, transition: 'all 0.1s' }}></Store>
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