import React from 'react';
import { Box, Stack, TextField, Toolbar, Select, MenuItem, SelectChangeEvent, InputAdornment, Icon } from '@mui/material';
import NavigationBar from '../../../components/appBar';
import { CENTER } from '../../../utils/stylesheet';
import { Colors } from '../../../utils/colors';
import './styles.css'
import { useNavigate } from "react-router-dom";
import { BorderColor } from '@mui/icons-material';
import { isMobile } from 'react-device-detect';
import { useParams } from 'react-router-dom';

const UserForm = () => {
    const [role, setRole] = React.useState('');
    const [status, setStatus] = React.useState('');
    const [newPassShow, setNewPassShow] = React.useState(false)
    const [confirmPassShow, setConfirmPassShow] = React.useState(false)
    const { action }: any = useParams()
    const navigate = useNavigate()

    const toggleNewPass = () => setNewPassShow(!newPassShow)
    const toggleConfirmPass = () => setConfirmPassShow(!confirmPassShow)

    const handleChangeRole = (event: SelectChangeEvent) => {
        setRole(event.target.value as string);
    };
    const handleChangeStatus = (event: SelectChangeEvent) => {
        setStatus(event.target.value as string);
    };

    const GoBack = () => {
        navigate(-1)
    }

    return (
        <div style={{ display: 'flex' }}>
            <NavigationBar title={'Form Tambah Data Pengguna'} indexNav={1} isChild={true}></NavigationBar>
            <Box
                component="main"
                sx={{ bgcolor: '#f4f5ff', p: isMobile ? 2 : 5, width: '100vw', minHeight: '100vh' }}
            >
                <Toolbar />
                <div style={{ flex: 1, ...CENTER }}>
                    <Stack direction={'column'} gap={3} sx={{ backgroundColor: '#fff', borderRadius: 2, border: '1px solid #cccccc', padding: '4% 3%' }}>
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                            {
                                isMobile ?
                                    <h3 style={{ color: '#000' }}>Form Tambah Data Pengguna</h3>
                                    :
                                    <h2 style={{ color: '#000' }}>Form Tambah Data Pengguna</h2>
                            }
                            {
                                action === 'update' ?
                                    <div style={{ backgroundColor: Colors.warning, height: 40, width: 40, ...CENTER, borderRadius: 10 }}>
                                        <BorderColor style={{ color: '#fff', fontSize: 20 }}></BorderColor>
                                    </div>
                                    :
                                    null
                            }
                        </Stack>
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-start'} gap={isMobile ? 2 : 3}>
                            <Stack direction={'column'} gap={1}>
                                <span>ID Pengguna</span>
                                <TextField
                                    type="text"
                                    disabled
                                    defaultValue={'8OI843SDKJ'}
                                    size="small"
                                    placeholder="ID"
                                    sx={{ bgcolor: "#f4f4f4", width: isMobile ? '40vw' : '25vw' }}
                                />
                            </Stack>
                            <Stack direction={'column'} gap={1}>
                                <span>Nama Pengguna</span>
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
                                <span>Username</span>
                                <TextField
                                    type="text"
                                    size="small"
                                    placeholder="Username"
                                    sx={{ bgcolor: "white", width: isMobile ? '40vw' : '25vw' }}
                                />
                            </Stack>
                            <Stack direction={'column'} gap={1}>
                                <span>Email</span>
                                <TextField
                                    type="text"
                                    size="small"
                                    placeholder="email@gmail.com"
                                    sx={{ bgcolor: "white", width: isMobile ? '40vw' : '25vw' }}
                                />
                            </Stack>
                        </Stack>
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-start'} gap={isMobile ? 2 : 3}>
                            <Stack direction={"column"} gap={1}>
                                <span>Password</span>
                                <TextField
                                    type={newPassShow ? "text" : "password"}
                                    size="small"
                                    placeholder="Password Lama"
                                    sx={{ bgcolor: "white", width: isMobile ? "60vw" : "25vw" }}
                                    InputProps={{
                                        endAdornment:
                                            <InputAdornment position='end'>
                                                <Icon style={{ color: "#909090", fontSize: 25, cursor: 'pointer' }} onClick={toggleNewPass}>
                                                    {!newPassShow ? 'visibility' : 'visibility_off'}
                                                </Icon>
                                            </InputAdornment>
                                    }}
                                />
                            </Stack>
                            <Stack direction={"column"} gap={1}>
                                <span>Konfirmasi Password</span>
                                <TextField
                                    type={confirmPassShow ? "text" : "password"}
                                    size="small"
                                    placeholder="Password Lama"
                                    sx={{ bgcolor: "white", width: isMobile ? "60vw" : "25vw" }}
                                    InputProps={{
                                        endAdornment:
                                            <InputAdornment position='end'>
                                                <Icon style={{ color: "#909090", fontSize: 25, cursor: 'pointer' }} onClick={toggleConfirmPass}>
                                                    {!confirmPassShow ? 'visibility' : 'visibility_off'}
                                                </Icon>
                                            </InputAdornment>
                                    }}
                                />
                            </Stack>
                        </Stack>
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-start'} gap={isMobile ? 2 : 3}>
                            <Stack direction={'column'} gap={1}>
                                <span>Role Pengguna</span>
                                <Select
                                    size="small"
                                    value={role}
                                    displayEmpty
                                    sx={{ bgcolor: "white", width: isMobile ? '40vw' : '25vw', color: '#000' }}
                                    onChange={handleChangeRole}
                                    renderValue={(selected: any) => {
                                        if (selected.length === 0) {
                                            return <span style={{ color: '#a7a5a6' }}>Role</span>;
                                        }
                                        return selected
                                    }}
                                >
                                    {
                                        ['Admin', 'User'].map((item, index) => (
                                            <MenuItem value={item} key={index}>{item}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </Stack>
                            <Stack direction={'column'} gap={1}>
                                <span>Status</span>
                                <Select
                                    size="small"
                                    value={status}
                                    displayEmpty
                                    sx={{ bgcolor: "white", width: isMobile ? '40vw' : '25vw', color: '#000' }}
                                    onChange={handleChangeStatus}
                                    renderValue={(selected: any) => {
                                        if (selected.length === 0) {
                                            return <span style={{ color: '#a7a5a6' }}>Status</span>;
                                        }
                                        return selected
                                    }}
                                >
                                    {
                                        ['Active', 'Deactive'].map((item, index) => (
                                            <MenuItem value={item} key={index}>{item}</MenuItem>
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

export default UserForm;