import React from 'react';
import { Box, Stack, TextField, Toolbar, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import NavigationBarUser from '../../../../components/appBarUser';
import { CENTER } from '../../../../utils/stylesheet';
import { Colors } from '../../../../utils/colors';
import { useNavigate } from "react-router-dom";
import { isMobile } from 'react-device-detect';

const MutasiForm = () => {
    const navigate = useNavigate()
    const [jenis, setJenis] = React.useState('');
    const [tujuan, setTujuan] = React.useState('');

    const handleChangeJenis = (event: SelectChangeEvent) => {
        setJenis(event.target.value as string);
    };

    const handleChangeTujuan = (event: SelectChangeEvent) => {
        setTujuan(event.target.value as string);
    };

    const GoBack = () => {
        navigate(-1)
    }

    return (
        <div style={{ display: 'flex' }}>
            <NavigationBarUser title={'Form Tambah Mutasi'} isChild={true} name={'Mutasi & Return'} idPanel={2}></NavigationBarUser>
            <Box
                component="main"
                sx={{ bgcolor: '#f4f5ff', p: isMobile ? 2 : 5, width: '100vw', minHeight: '100vh' }}
            >
                <Toolbar />
                <div style={{ flex: 1, ...CENTER }}>
                    <Stack direction={'column'} gap={3} sx={{ backgroundColor: '#fff', borderRadius: 2, border: '1px solid #cccccc', padding: '4% 3%' }}>
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                            <h2 style={{ color: '#000' }}>Form Tambah Mutasi</h2>
                        </Stack>
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-start'} gap={isMobile ? 2 : 3}>
                            <Stack direction={'column'} gap={1}>
                                <span>Tanggal</span>
                                <TextField
                                    type="text"
                                    disabled
                                    defaultValue={'09/04/2023'}
                                    size="small"
                                    sx={{ bgcolor: "#f4f4f4", width: isMobile ? '40vw' : '25vw' }}
                                />
                            </Stack>
                            <Stack direction={'column'} gap={1}>
                                <span>Nomor Mutasi</span>
                                <TextField
                                    type="text"
                                    disabled
                                    size="small"
                                    defaultValue={'8OI843SDKJ'}
                                    sx={{ bgcolor: "#f4f4f4", width: isMobile ? '40vw' : '25vw' }}
                                />
                            </Stack>
                        </Stack>
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-start'} gap={isMobile ? 2 : 3}>
                            <Stack direction={'column'} gap={1}>
                                <span>Jenis Barang</span>
                                <Select
                                    size="small"
                                    value={jenis}
                                    displayEmpty
                                    sx={{ bgcolor: "white", width: isMobile ? '40vw' : '25vw', color: '#000' }}
                                    onChange={handleChangeJenis}
                                    renderValue={(selected: any) => {
                                        if (selected.length === 0) {
                                            return <span style={{ color: '#a7a5a6' }}>Jenis</span>;
                                        }
                                        return selected
                                    }}
                                >
                                    {
                                        [1, 1, 1, 1, 1].map((index) => (
                                            <MenuItem key={index} value={'Jenis' + (index + 1)}>{'Jenis' + (index + 1)}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </Stack>
                            <Stack direction={'column'} gap={1}>
                                <span>Jumlah Barang</span>
                                <TextField
                                    type="text"
                                    size="small"
                                    defaultValue={'20'}
                                    sx={{ bgcolor: "#fff", width: isMobile ? '40vw' : '25vw' }}
                                />
                            </Stack>
                        </Stack>
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-start'} gap={isMobile ? 2 : 3}>
                            <Stack direction={'column'} gap={1}>
                                <span>Gudang Asal</span>
                                <TextField
                                    type="text"
                                    size="small"
                                    disabled
                                    defaultValue={'Gudang A'}
                                    placeholder="Barang"
                                    sx={{ bgcolor: "#f4f4f4", width: isMobile ? '40vw' : '25vw' }}
                                />
                            </Stack>
                            <Stack direction={'column'} gap={1}>
                                <span>Gudang Tujuan</span>
                                <Select
                                    size="small"
                                    value={tujuan}
                                    displayEmpty
                                    sx={{ bgcolor: "white", width: isMobile ? '40vw' : '25vw', color: '#000' }}
                                    onChange={handleChangeTujuan}
                                    renderValue={(selected: any) => {
                                        if (selected.length === 0) {
                                            return <span style={{ color: '#a7a5a6' }}>Tujuan</span>;
                                        }
                                        return selected
                                    }}
                                >
                                    {
                                        ['A', 'B', 'C', 'D', 'E'].map((item, index) => (
                                            <MenuItem key={index} value={`Gudang ${item}`}>{`Gudang ${item}`}</MenuItem>
                                        ))
                                    }
                                </Select>
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

export default MutasiForm;