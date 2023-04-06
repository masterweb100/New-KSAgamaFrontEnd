import React from 'react';
import { Box, Stack, TextField, Toolbar, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import NavigationBarUser from '../../../components/appBarUser';
import { CENTER } from '../../../utils/stylesheet';
import { Colors } from '../../../utils/colors';
import { useNavigate } from "react-router-dom";

const KategoriForm = () => {
    const navigate = useNavigate()
    const [kategori, setKategori] = React.useState('');
    const [status, setStatus] = React.useState('');

    const handleChangeKategori = (event: SelectChangeEvent) => {
        setKategori(event.target.value as string);
    };

    const handleChangeStatus = (event: SelectChangeEvent) => {
        setStatus(event.target.value as string);
    };

    const GoBack = () => {
        navigate(-1)
    }

    return (
        <div style={{ display: 'flex' }}>
            <NavigationBarUser title={'Form Tambah Kategori Akun'} isChild={true} name={'Akun'} idPanel={5}></NavigationBarUser>
            <Box
                component="main"
                sx={{ bgcolor: '#f4f5ff', p: 5, width: '100vw', minHeight: '100vh' }}
            >
                <Toolbar />
                <div style={{ flex: 1, ...CENTER }}>
                    <Stack direction={'column'} gap={3} sx={{ backgroundColor: '#fff', borderRadius: 2, border: '1px solid #cccccc', padding: '4% 3%' }}>
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                            <h2 style={{ color: '#000' }}>Form Tambah Kategori Akun</h2>
                        </Stack>
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-start'} gap={3}>
                            <Stack direction={'column'} gap={1}>
                                <span>*Nama Akun</span>
                                <TextField
                                    type="text"
                                    size="small"
                                    disabled
                                    defaultValue={'Sucipto'}
                                    sx={{ bgcolor: "#f4f4f4", width: '25vw' }}
                                />
                            </Stack>
                            <Stack direction={'column'} gap={1}>
                                <span>Nama Kategori</span>
                                <TextField
                                    type="text"
                                    defaultValue={'A09023'}
                                    size="small"
                                    sx={{ bgcolor: "#fff", width: '25vw' }}
                                />
                            </Stack>
                        </Stack>
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} gap={2} marginTop={5}>
                            <div onClick={GoBack} style={{ ...CENTER, borderRadius: 10, border: `1px solid ${Colors.primary}`, padding: '10px 30px', cursor: 'pointer' }}>
                                <span style={{ fontSize: 13, color: Colors.primary }}>BATAL</span>
                            </div>
                            <div style={{ ...CENTER, borderRadius: 10, backgroundColor: Colors.primary, padding: '10px 30px', cursor: 'pointer' }}>
                                <span style={{ fontSize: 13, color: '#fff' }}>SIMPAN</span>
                            </div>
                        </Stack>
                    </Stack>
                </div>
            </Box>
        </div >
    )
}

export default KategoriForm;