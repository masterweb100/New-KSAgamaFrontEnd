import React from 'react'
import NavigationBarUser from '../../../../components/appBarUser';
import { CENTER } from '../../../../utils/stylesheet';
import { Colors } from '../../../../utils/colors';
import { Box, Stack, TextField, Toolbar, Icon } from '@mui/material';
import { isMobile } from 'react-device-detect';

const SetDataToko = () => {
    return (
        <div style={{ display: 'flex' }}>
            <NavigationBarUser title={'Pengaturan'} isChild={false} name={'Data Toko'} idPanel={9}></NavigationBarUser>
            <Box component="main" sx={{ bgcolor: '#f4f5ff', p: isMobile ? 3 : 5, width: '100vw', minHeight: '100vh' }}>
                <Toolbar />
                <div style={{ flex: 1, ...CENTER }}>
                    <Stack direction={'column'} gap={3} sx={{ backgroundColor: '#fff', borderRadius: 2, border: '1px solid #cccccc', padding: '4% 3%' }}>
                        <h2 style={{ color: '#000', margin: 0 }}>Data Toko</h2>
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-start'} gap={isMobile ? 2 : 3}>
                            <Stack direction={'column'} gap={1}>
                                <span>*Nama Toko</span>
                                <TextField
                                    type="text"
                                    size="small"
                                    placeholder="Nama"
                                    sx={{ bgcolor: "white", width: isMobile ? '40vw' : '25vw' }}
                                />
                            </Stack>
                            <Stack direction={'column'} gap={1}>
                                <span>*Alamat Email</span>
                                <TextField
                                    type="text"
                                    size="small"
                                    placeholder="Nama"
                                    sx={{ bgcolor: "white", width: isMobile ? '40vw' : '25vw' }}
                                />
                            </Stack>
                        </Stack>
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-start'} gap={isMobile ? 2 : 3}>
                            <Stack direction={'column'} gap={1}>
                                <span>*No. Telepon</span>
                                <TextField
                                    type="text"
                                    size="small"
                                    placeholder="Nama"
                                    sx={{ bgcolor: "white", width: isMobile ? '40vw' : '25vw' }}
                                />
                            </Stack>
                            <Stack direction={'column'} gap={1}>
                                <span>No. NPWP</span>
                                <TextField
                                    type="text"
                                    size="small"
                                    placeholder="Nama"
                                    sx={{ bgcolor: "white", width: isMobile ? '40vw' : '25vw' }}
                                />
                            </Stack>
                        </Stack>
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-start'} gap={isMobile ? 2 : 3}>
                            <Stack direction={'column'} gap={1}>
                                <span>*Kontak Person Toko</span>
                                <TextField
                                    type="text"
                                    size="small"
                                    placeholder="Nama"
                                    sx={{ bgcolor: "white", width: isMobile ? '40vw' : '25vw' }}
                                />
                            </Stack>
                            <Stack direction={'column'} gap={1}>
                                <span>No. WhatsApp Toko</span>
                                <TextField
                                    type="text"
                                    size="small"
                                    placeholder="Nama"
                                    sx={{ bgcolor: "white", width: isMobile ? '40vw' : '25vw' }}
                                />
                            </Stack>
                        </Stack>
                        <Stack direction={'column'} gap={1}>
                            <span>Alamat Toko</span>
                            <TextField
                                type="text"
                                size="small"
                                placeholder="Alamat"
                                sx={{ bgcolor: "white", width: isMobile ? '100%' : '25vw' }}
                                multiline
                                rows={5}
                            />
                        </Stack>
                        <h2 style={{ color: '#000', margin: 0 }}>Logo Toko</h2>
                        <Stack gap={1} direction={'column'}>
                            <span>Upload Logo</span>
                            <div style={{
                                border: '1px dashed #909090',
                                borderRadius: '5px',
                                padding: '7% 0',
                                width: isMobile ? '100%' : '25vw',
                                ...CENTER
                            }}>
                                <Stack direction={'column'} alignItems={'center'} justifyContent={'center'} gap={2}>
                                    <Icon style={{ color: '#909090', fontSize: 60 }}>cloud_upload</Icon>
                                    <span style={{ color: '#909090' }}>Browse File to Upload</span>
                                </Stack>
                            </div>
                            <span style={{ color: '#909090', fontSize: 13 }}>*Ukuran File Maksimal 1 MB</span>
                        </Stack>
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} gap={2} marginTop={5}>
                            <div style={{ ...CENTER, borderRadius: 10, border: `1px solid ${Colors.primary}`, padding: '10px 30px', cursor: 'pointer' }}>
                                <span style={{ fontSize: 13, color: Colors.primary }}>BATAL</span>
                            </div>
                            <div style={{ ...CENTER, borderRadius: 10, backgroundColor: Colors.primary, padding: '10px 30px', cursor: 'pointer' }}>
                                <span style={{ fontSize: 13, color: '#fff' }}>SIMPAN</span>
                            </div>
                        </Stack>
                    </Stack>
                </div>
            </Box>
        </div>
    )
}

export default SetDataToko;