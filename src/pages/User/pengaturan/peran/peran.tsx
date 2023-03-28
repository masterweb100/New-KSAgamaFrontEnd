import { Box, Stack, Toolbar, InputAdornment, TextField, Icon } from '@mui/material';
import React from 'react'
import NavigationBarUser from '../../../../components/appBarUser';
import { Colors } from '../../../../utils/colors';
import { CENTER } from '../../../../utils/stylesheet';
import './styles.css'

const user = ['Admin', 'Staff Keuangan', 'Staff Gudang', 'Staff Penjualan', 'Staff Pembelian']
const SetPeran = () => {
    return (
        <div style={{ display: 'flex' }}>
            <NavigationBarUser title={'Pengaturan'} isChild={false} name={'Peran'} idPanel={9}></NavigationBarUser>
            <Box component="main" sx={{ bgcolor: '#f4f5ff', py: 5, px: 10, width: '100vw', minHeight: '100vh' }}>
                <Toolbar />
                <Stack direction={'row'} justifyContent={'space-between'}>
                    <div style={{ ...CENTER, backgroundColor: Colors.primary, borderRadius: 5, cursor: 'pointer', padding: '10px 30px', alignSelf: 'flex-start' }}>
                        <Stack alignItems={'center'} direction={'row'} gap={1}>
                            <Icon style={{ color: '#fff', fontSize: 17 }}>add</Icon>
                            <p style={{ margin: 0, fontWeight: 500, fontSize: 15, color: '#ffff' }}>Tambah Data Pengguna</p>
                        </Stack>
                    </div>
                </Stack>
                <Stack
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
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
                        sx={{ bgcolor: "white", borderRadius: 1, width: 300 }}
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
                            <div key={index} className={'list'}>
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