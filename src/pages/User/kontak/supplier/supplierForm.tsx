import React from 'react';
import { Box, Stack, TextField, Toolbar, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import NavigationBarUser from '../../../../components/appBarUser';
import { CENTER } from '../../../../utils/stylesheet';
import { Colors } from '../../../../utils/colors';
import { useNavigate } from "react-router-dom";
import { isMobile } from 'react-device-detect';

const SupplierForm = () => {
    const navigate = useNavigate()
    const [provinsi, setProvinsi] = React.useState('');
    const [kota, setKota] = React.useState('');
    const [idCard, setIdCard] = React.useState('');

    const handleChangeProvinsi = (event: SelectChangeEvent) => {
        setProvinsi(event.target.value as string);
    };

    const handleChangeKota = (event: SelectChangeEvent) => {
        setKota(event.target.value as string);
    };

    const handleChangeIdCard = (event: SelectChangeEvent) => {
        setIdCard(event.target.value as string);
    };

    const GoBack = () => {
        navigate(-1)
    }

    return (
        <div style={{ display: 'flex' }}>
            <NavigationBarUser title={'Form Tambah Data Supplier'} isChild={true} name={'Supplier'} idPanel={7}></NavigationBarUser>
            <Box
                component="main"
                sx={{ bgcolor: '#f4f5ff', p: isMobile ? 2 : 5, width: '100vw', minHeight: '100vh' }}
            >
                <Toolbar />
                <div style={{ flex: 1, ...CENTER }}>
                    <Stack direction={'column'} gap={3} sx={{ backgroundColor: '#fff', borderRadius: 2, border: '1px solid #cccccc', padding: '4% 3%' }}>
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                            <h2 style={{ color: '#000' }}>Form Tambah Data Supplier</h2>
                        </Stack>
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-start'} gap={isMobile ? 2 : 3}>
                            <Stack direction={'column'} gap={1}>
                                <span>*Tipe Kontak</span>
                                <TextField
                                    type="text"
                                    size="small"
                                    disabled
                                    defaultValue={'Supplier'}
                                    sx={{ bgcolor: "#f4f4f4", width: isMobile ? '40vw' : '25vw' }}
                                />
                            </Stack>
                            <Stack direction={'column'} gap={1}>
                                <span>*Nama Supplier</span>
                                <TextField
                                    type="text"
                                    size="small"
                                    defaultValue={'Sucipto'}
                                    sx={{ bgcolor: "#fff", width: isMobile ? '40vw' : '25vw' }}
                                />
                            </Stack>
                        </Stack>
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-start'} gap={isMobile ? 2 : 3}>
                            <Stack direction={'column'} gap={1}>
                                <span>*Nama Perusahaan</span>
                                <TextField
                                    type="text"
                                    size="small"
                                    placeholder='Nama Perusahaan'
                                    sx={{ bgcolor: "#fff", width: isMobile ? '40vw' : '25vw' }}
                                />
                            </Stack>
                            <Stack direction={'column'} gap={1}>
                                <span>Alamat Supplier</span>
                                <TextField
                                    type="text"
                                    size="small"
                                    placeholder='Alamat'
                                    sx={{ bgcolor: "#fff", width: isMobile ? '40vw' : '25vw' }}
                                />
                            </Stack>
                        </Stack>
                        <Stack direction={'column'} gap={1}>
                            <span>Negara</span>
                            <TextField
                                type="text"
                                size="small"
                                defaultValue={'Indonesia'}
                                sx={{ bgcolor: "#fff", width: isMobile ? '40vw' : '25vw' }}
                            />
                        </Stack>
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-start'} gap={isMobile ? 2 : 3}>
                            <Stack direction={'column'} gap={1}>
                                <span>Provinsi</span>
                                <Select
                                    size="small"
                                    value={provinsi}
                                    displayEmpty
                                    sx={{ bgcolor: "white", width: isMobile ? '40vw' : '25vw', color: '#000' }}
                                    onChange={handleChangeProvinsi}
                                    renderValue={(selected: any) => {
                                        if (selected.length === 0) {
                                            return <span style={{ color: '#a7a5a6' }}>Nama Provinsi</span>;
                                        }
                                        return selected
                                    }}
                                >
                                    {
                                        [1, 1, 1, 1, 1].map((item, index) => (
                                            <MenuItem key={index} value={'Provinsi ' + (index + 1)}>{'Provinsi ' + (index + 1)}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </Stack>
                            <Stack direction={'column'} gap={1}>
                                <span>Kota</span>
                                <Select
                                    size="small"
                                    value={kota}
                                    displayEmpty
                                    sx={{ bgcolor: "white", width: isMobile ? '40vw' : '25vw', color: '#000' }}
                                    onChange={handleChangeKota}
                                    renderValue={(selected: any) => {
                                        if (selected.length === 0) {
                                            return <span style={{ color: '#a7a5a6' }}>Nama Kota</span>;
                                        }
                                        return selected
                                    }}
                                >
                                    {
                                        [1, 1, 1, 1, 1].map((item, index) => (
                                            <MenuItem key={index} value={'Kota ' + (index + 1)}>{'Kota ' + (index + 1)}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </Stack>
                        </Stack>
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-start'} gap={isMobile ? 2 : 3}>
                            <Stack direction={'column'} gap={1}>
                                <span>Email</span>
                                <TextField
                                    type="text"
                                    size="small"
                                    placeholder={'Alamat Email'}
                                    sx={{ bgcolor: "#fff", width: isMobile ? '40vw' : '25vw' }}
                                />
                            </Stack>
                            <Stack direction={'column'} gap={1}>
                                <span>*Nomor Telepon</span>
                                <TextField
                                    type="text"
                                    size="small"
                                    defaultValue={'0893409329'}
                                    sx={{ bgcolor: "#fff", width: isMobile ? '40vw' : '25vw' }}
                                />
                            </Stack>
                        </Stack>
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-start'} gap={isMobile ? 2 : 3}>
                            <Stack direction={'column'} gap={1}>
                                <span>Tipe Kartu Identitas {'(Opsional)'}</span>
                                <Select
                                    size="small"
                                    value={idCard}
                                    displayEmpty
                                    sx={{ bgcolor: "white", width: isMobile ? '40vw' : '25vw', color: '#000' }}
                                    onChange={handleChangeIdCard}
                                    renderValue={(selected: any) => {
                                        if (selected.length === 0) {
                                            return <span style={{ color: '#a7a5a6' }}>KTP / Passport / Lainnya</span>;
                                        }
                                        return selected
                                    }}
                                >
                                    {
                                        [1, 1, 1, 1, 1].map((item, index) => (
                                            <MenuItem key={index} value={'KTP ' + (index + 1)}>{'KTP ' + (index + 1)}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </Stack>
                            <Stack direction={'column'} gap={1}>
                                <span>Nomor Kartu Identitas {'(Opsional)'}</span>
                                <TextField
                                    type="text"
                                    size="small"
                                    defaultValue={'Sucipto'}
                                    sx={{ bgcolor: "#fff", width: isMobile ? '40vw' : '25vw' }}
                                />
                            </Stack>
                        </Stack>
                        <Stack direction={'column'} gap={1}>
                            <span>NPWP {'Opsional'}</span>
                            <TextField
                                type="text"
                                placeholder='NPWP'
                                size="small"
                                sx={{ bgcolor: "#fff", width: isMobile ? '40vw' : '25vw' }}
                            />
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

export default SupplierForm;