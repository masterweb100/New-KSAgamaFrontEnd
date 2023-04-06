import React from 'react';
import { Box, Stack, TextField, Toolbar, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import NavigationBarUser from '../../../../components/appBarUser';
import { CENTER } from '../../../../utils/stylesheet';
import { Colors } from '../../../../utils/colors';
import { useNavigate } from "react-router-dom";

const BrandForm = () => {
    const navigate = useNavigate()
    const [kategori, setKategori] = React.useState('');

    const handleChangeKategori = (event: SelectChangeEvent) => {
        setKategori(event.target.value as string);
    };

    const GoBack = () => {
        navigate(-1)
    }

    return (
        <div style={{ display: 'flex' }}>
            <NavigationBarUser title={'Form Data Brand'} isChild={true} name={'List Produk'} idPanel={2}></NavigationBarUser>
            <Box
                component="main"
                sx={{ bgcolor: '#f4f5ff', p: 5, width: '100vw', minHeight: '100vh' }}
            >
                <Toolbar />
                <div style={{ flex: 1, ...CENTER }}>
                    <Stack direction={'column'} gap={3} sx={{ backgroundColor: '#fff', borderRadius: 2, border: '1px solid #cccccc', padding: '4% 3%' }}>
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                            <h2 style={{ color: '#000' }}>Form Data Brand</h2>
                        </Stack>
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-start'} gap={3}>
                            <Stack direction={'column'} gap={1}>
                                <span>ID SKU</span>
                                <TextField
                                    type="text"
                                    disabled
                                    defaultValue={'A09023'}
                                    size="small"
                                    sx={{ bgcolor: "#f4f4f4", width: '25vw' }}
                                />
                            </Stack>
                            <Stack direction={'column'} gap={1}>
                                <span>Nama Brand</span>
                                <TextField
                                    type="text"
                                    size="small"
                                    defaultValue={'Kaki Tiga'}
                                    sx={{ bgcolor: "#fff", width: '25vw' }}
                                />
                            </Stack>
                        </Stack>
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-start'} gap={3}>
                            <Stack direction={'column'} gap={1}>
                                <span>Kategori</span>
                                <Select
                                    size="small"
                                    value={kategori}
                                    displayEmpty
                                    sx={{ bgcolor: "white", width: '25vw', color: '#000' }}
                                    onChange={handleChangeKategori}
                                    renderValue={(selected: any) => {
                                        if (selected.length === 0) {
                                            return <span style={{ color: '#a7a5a6' }}>Kategori</span>;
                                        }
                                        return selected
                                    }}
                                >
                                    {
                                        [1, 1, 1, 1, 1].map((item, index) => (
                                            <MenuItem key={index} value={'Kategori ' + (index + 1)}>{'Kategori ' + (index + 1)}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </Stack>
                            <Stack direction={'column'} gap={1}>
                                <span>Min. Stok</span>
                                <TextField
                                    type="text"
                                    size="small"
                                    defaultValue={'20'}
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

export default BrandForm;