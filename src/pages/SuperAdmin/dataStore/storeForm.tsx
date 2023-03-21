import React from 'react';
import { Box, Stack, TextField, Toolbar, InputAdornment, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import NavigationBar from '../../../components/appBar';
import { CENTER } from '../../../utils/stylesheet';
import { Colors } from '../../../utils/colors';
import './styles.css'
import { useNavigate } from "react-router-dom";
import { BorderColor } from '@mui/icons-material';

const StoreForm = () => {
    const [role, setRole] = React.useState('');
    const navigate = useNavigate()

    const handleChangeRole = (event: SelectChangeEvent) => {
        setRole(event.target.value as string);
    };

    const GoBack = () => {
        navigate(-1)
    }

    return (
        <div style={{ display: 'flex' }}>
            <NavigationBar title={'Form Tambah Data Toko'} indexNav={2} isChild={true}></NavigationBar>
            <Box
                component="main"
                sx={{ bgcolor: '#f4f5ff', py: 5, px: 10, width: '100vw', minHeight: '100vh' }}
            >
                <Toolbar />
                <div style={{ flex: 1, ...CENTER }}>
                    <Stack direction={'column'} gap={3} sx={{ backgroundColor: '#fff', borderRadius: 2, border: '1px solid #cccccc', padding: '4% 3%' }}>
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                            <h2 style={{ color: '#000' }}>Form Tambah Data Toko</h2>
                            <div style={{ backgroundColor: Colors.warning, height: 40, width: 40, ...CENTER, borderRadius: 10 }}>
                                <BorderColor style={{ color: '#fff', fontSize: 20 }}></BorderColor>
                            </div>
                        </Stack>
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-start'} gap={3}>
                            <Stack direction={'column'} gap={1}>
                                <span>ID Toko</span>
                                <TextField
                                    type="text"
                                    disabled
                                    defaultValue={'8OI843SDKJ'}
                                    size="small"
                                    placeholder="ID"
                                    sx={{ bgcolor: "#f4f4f4", width: 300 }}
                                />
                            </Stack>
                            <Stack direction={'column'} gap={1}>
                                <span>Nama Toko</span>
                                <TextField
                                    type="text"
                                    size="small"
                                    placeholder="Nama"
                                    sx={{ bgcolor: "white", width: 300 }}
                                />
                            </Stack>
                        </Stack>
                        <Stack direction={'row'} alignItems={'flex-start'} justifyContent={'flex-start'} gap={3}>
                            <Stack direction={'column'} gap={1}>
                                <span>Alamat Toko</span>
                                <TextField
                                    type="text"
                                    size="small"
                                    placeholder="Alamat"
                                    sx={{ bgcolor: "white", width: 300 }}
                                    multiline
                                    rows={5}
                                />
                            </Stack>
                            <Stack direction={'column'} gap={1}>
                                <span>Admin Toko</span>
                                <Select
                                    size="small"
                                    value={role}
                                    displayEmpty
                                    sx={{ bgcolor: "white", width: 300, color: '#000' }}
                                    onChange={handleChangeRole}
                                    renderValue={(selected: any) => {
                                        if (selected.length === 0) {
                                            return <span style={{ color: '#a7a5a6' }}>Admin</span>;
                                        }
                                        return selected
                                    }}
                                >
                                    {
                                        [1, 2, 3, 4, 5, 6].map((item, index) => (
                                            <MenuItem value={'Admin ' + item} key={index}>Admin {index + 1}</MenuItem>
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

export default StoreForm;