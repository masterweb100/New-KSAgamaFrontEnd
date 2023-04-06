import { Box, Icon, Stack, Toolbar } from '@mui/material';
import React from 'react'
import NavigationBarUser from '../../../../components/appBarUser';
import { Colors } from '../../../../utils/colors';
import { kontakData } from '../dummy';
import PelangganTable from './pelangganTable';

const Pelanggan = () => {
    return (
        <div style={{ display: 'flex' }}>
            <NavigationBarUser title={'Kontak'} isChild={false} name={'Pelanggan'} idPanel={7}></NavigationBarUser>
            <Box component="main" sx={{ bgcolor: '#f4f5ff', p: 5, width: '100vw', minHeight: '100vh' }}>
                <Toolbar />
                <div>
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-end'} gap={2}>
                        <div style={{ backgroundColor: '#fff', padding: '7px 15px', borderRadius: 5, border: `1px solid ${Colors.primary}` }}>
                            <Stack direction={'row'} alignItems={'center'} gap={1}>
                                <Icon sx={{ color: Colors.primary, fontSize: 20 }}>file_upload</Icon>
                                <span style={{ fontSize: 13, color: Colors.primary }}>Import Data Kontak</span>
                            </Stack>
                        </div>
                        <div style={{ backgroundColor: '#fff', padding: '7px 15px', borderRadius: 5, border: `1px solid ${Colors.error}` }}>
                            <Stack direction={'row'} alignItems={'center'} gap={1}>
                                <Icon sx={{ color: Colors.error, fontSize: 20 }}>file_download</Icon>
                                <span style={{ fontSize: 13, color: Colors.error }}>PDF</span>
                            </Stack>
                        </div>
                        <div style={{ backgroundColor: '#fff', padding: '7px 15px', borderRadius: 5, border: `1px solid ${Colors.success}` }}>
                            <Stack direction={'row'} alignItems={'center'} gap={1}>
                                <Icon sx={{ color: Colors.success, fontSize: 20 }}>file_download</Icon>
                                <span style={{ fontSize: 13, color: Colors.success }}>Excel</span>
                            </Stack>
                        </div>
                    </Stack>
                    <div style={{ marginTop: 20 }}>
                        <PelangganTable data={kontakData}></PelangganTable>
                    </div>
                </div>
            </Box>
        </div>
    )
}

export default Pelanggan;