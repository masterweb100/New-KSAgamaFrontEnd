import React from 'react';
import { Box, Stack, TextField, Toolbar, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import NavigationBarUser from '../../../../components/appBarUser';
import { CENTER } from '../../../../utils/stylesheet';
import { Colors } from '../../../../utils/colors';
import { useNavigate } from "react-router-dom";

const PembelianDetailForm = () => {
    const navigate = useNavigate()
    const [jenis, setJenis] = React.useState('');
    const [satuan, setSatuan] = React.useState('');

    const handleChangeJenis = (event: SelectChangeEvent) => {
        setJenis(event.target.value as string);
    };

    const handleChangeSatuan = (event: SelectChangeEvent) => {
        setSatuan(event.target.value as string);
    };

    const GoBack = () => {
        navigate(-1)
    }

    return (
        <div style={{ display: 'flex' }}>
            <NavigationBarUser title={'Form Tambah Produk SKU/0032'} isChild={true} name={'Pembelian'} idPanel={4}></NavigationBarUser>
            <Box
                component="main"
                sx={{ bgcolor: '#f4f5ff', py: 5, px: 10, width: '100vw', minHeight: '100vh' }}
            >
                <Toolbar />
                <div style={{ flex: 1, ...CENTER }}>
                    <Stack direction={'column'} gap={3} sx={{ backgroundColor: '#fff', borderRadius: 2, border: '1px solid #cccccc', padding: '4% 3%' }}>
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'center'}>
                            <h2 style={{ color: '#000' }}>Form Tambah Data Pembelian Barang</h2>
                        </Stack>
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-start'} gap={3}>
                            <Stack direction={'column'} gap={1}>
                                <span>ID Barang</span>
                                <TextField
                                    type="text"
                                    size="small"
                                    disabled
                                    defaultValue={'SKU/0032'}
                                    sx={{ bgcolor: "#f4f4f4", width: '25vw' }}
                                />
                            </Stack>
                            <Stack direction={'column'} gap={1}>
                                <span>Nama Brand</span>
                                <TextField
                                    type="text"
                                    size="small"
                                    disabled
                                    defaultValue={'Sanyo'}
                                    sx={{ bgcolor: "#f4f4f4", width: '25vw' }}
                                />
                            </Stack>
                        </Stack>
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-start'} gap={3}>
                            <Stack direction={'column'} gap={1}>
                                <span>Jenis Barang</span>
                                <Select
                                    size="small"
                                    value={jenis}
                                    displayEmpty
                                    sx={{ bgcolor: "white", width: '25vw', color: '#000' }}
                                    onChange={handleChangeJenis}
                                    renderValue={(selected: any) => {
                                        if (selected.length === 0) {
                                            return <span style={{ color: '#a7a5a6' }}>Jenis Barang</span>;
                                        }
                                        return selected
                                    }}
                                >
                                    {
                                        [...Array(10)].map((item, index) => (
                                            <MenuItem key={index} value={`Jenis ${index + 1}`}>{`Jenis ${index + 1}`}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </Stack>
                            <Stack direction={'column'} gap={1}>
                                <span>Satuan</span>
                                <Select
                                    size="small"
                                    value={satuan}
                                    displayEmpty
                                    sx={{ bgcolor: "white", width: '25vw', color: '#000' }}
                                    onChange={handleChangeSatuan}
                                    renderValue={(selected: any) => {
                                        if (selected.length === 0) {
                                            return <span style={{ color: '#a7a5a6' }}>PCs / Lusin / Box</span>;
                                        }
                                        return selected
                                    }}
                                >
                                    {
                                        ['PCs', 'Lusin', 'Box'].map((item, index) => (
                                            <MenuItem key={index} value={item}>{item}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </Stack>
                        </Stack>
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-start'} gap={3}>
                            <Stack direction={'column'} gap={1}>
                                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                                    <span>Qty / Jumlah</span>
                                    <div style={{ ...CENTER, borderRadius: 5, backgroundColor: Colors.success, padding: '5px 10px' }}>
                                        <p style={{ margin: 0, color: '#fff' }}>45</p>
                                    </div>
                                </Stack>
                                <TextField
                                    type="text"
                                    size="small"
                                    placeholder='Jumlah Produk'
                                    sx={{ bgcolor: "#fff", width: '25vw' }}
                                />
                            </Stack>
                            <Stack direction={'column'} gap={1}>
                                <span>Harga</span>
                                <TextField
                                    type="text"
                                    size="small"
                                    placeholder='Harga Produk'
                                    sx={{ bgcolor: "#fff", width: '25vw' }}
                                />
                            </Stack>
                        </Stack>
                        <Stack direction={'column'} gap={1}>
                            <span>Harga Total</span>
                            <TextField
                                type="text"
                                size="small"
                                placeholder='Harga Total'
                                sx={{ bgcolor: "#fff", width: '25vw' }}
                            />
                        </Stack>
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-start'} gap={2}>
                            <div style={{ ...CENTER, borderRadius: 10, backgroundColor: Colors.success, padding: '10px 30px', cursor: 'pointer' }}>
                                <span style={{ fontSize: 13, color: '#fff' }}>Tambah Barang</span>
                            </div>
                            <div style={{ ...CENTER, borderRadius: 10, border: `1px solid ${Colors.error}`, padding: '10px 30px', cursor: 'pointer' }}>
                                <span style={{ fontSize: 13, color: Colors.primary }}>Hapus Barang</span>
                            </div>
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
        </div>
    )
}

export default PembelianDetailForm;