import { Box, Stack, Toolbar, InputAdornment, TextField, Icon } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import NavigationBarUser from '../../../../components/appBarUser';
import { Colors } from '../../../../utils/colors';
import { isMobile } from 'react-device-detect';
import './styles.css'

const user = ['Admin', 'Staff Keuangan', 'Staff Gudang', 'Staff Penjualan', 'Staff Pembelian']
const SetPeran = () => {
    const navigate = useNavigate()

    const SettingPage = () => navigate('/settings/peran/set-peran')
    return (
        <div style={{ display: 'flex' }}>
            <NavigationBarUser title={'Pengaturan'} isChild={false} name={'Peran'} idPanel={9}></NavigationBarUser>
            <Box component="main" sx={{ bgcolor: '#f4f5ff', p: isMobile ? 2 : 5, width: '100vw', minHeight: '100vh' }}>
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
                        placeholder="Cari..."
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

export default SetPeran;