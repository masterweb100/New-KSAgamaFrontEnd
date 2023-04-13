import React from 'react';
import { Box, Stack, Toolbar, InputAdornment, TextField, Icon } from '@mui/material';
import NavigationBar from '../../../components/appBar';
import { useNavigate } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import './styles.css'
import { Colors } from '../../../utils/colors';

const user = ['Admin', 'Staff Keuangan', 'Staff Gudang', 'Staff Penjualan', 'Staff Pembelian']
const AccessUser = () => {
    const navigate = useNavigate()

    const SettingPage = () => navigate('/user-access/settings')
    return (
        <div style={{ display: 'flex' }}>
            <NavigationBar title={'Role Pengguna'} indexNav={4} isChild={false}></NavigationBar>
            <Box
                component="main"
                sx={{ bgcolor: '#f4f5ff', p: isMobile ? 2 : 5, width: '100vw', minHeight: '100vh' }}
            >
                <Toolbar />
                <Stack
                    direction={isMobile ? "column" : "row"}
                    alignItems={"center"}
                    gap={3}
                    justifyContent={isMobile ? "center" : "space-between"}
                    sx={{
                        marginTop: 3,
                        paddingX: 4,
                        paddingY: 2,
                        backgroundColor: Colors.primary,
                        borderRadius: "10px 10px 0px 0px",
                    }}
                >
                    <Stack alignItems={"center"} gap={2} direction={"row"}>
                        <Icon sx={{ fontSize: 27, color: "#fff" }}>view_list</Icon>
                        <p style={{ color: "#fff", fontWeight: 500, margin: 0 }}>Peran</p>
                    </Stack>
                    <TextField
                        type="search"
                        size="small"
                        placeholder="Pencarian by Name"
                        sx={{ bgcolor: "white", borderRadius: 1, width: isMobile ? '90%' : '20vw' }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Icon>search</Icon>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Stack>
                <Stack direction={'column'} gap={0}>
                    {
                        user.map((item, index) => (
                            <div onClick={SettingPage} key={index} className={'list'}>
                                <span>{item}</span>
                            </div>
                        ))
                    }
                </Stack>
            </Box>
        </div>
    )
}

export default AccessUser;