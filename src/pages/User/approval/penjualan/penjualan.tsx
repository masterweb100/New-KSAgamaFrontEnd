import { Box, Stack, Toolbar, InputAdornment, TextField, Icon } from '@mui/material';
import React from 'react'
import NavigationBarUser from '../../../../components/appBarUser';
import { Colors } from '../../../../utils/colors';
import { penjualanDataTable } from '../dummy';
import PenjualanTable from './penjualanTable';

const AppPenjualan = () => {
    return (
        <div style={{ display: 'flex' }}>
            <NavigationBarUser title={'Approval Return Penjualan'} isChild={false} name={'App. Penjualan'} idPanel={8}></NavigationBarUser>
            <Box component="main" sx={{ bgcolor: '#f4f5ff', py: 5, px: 5, width: '100vw', minHeight: '100vh' }}>
                <Toolbar />
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
                        <p style={{ color: "#fff", fontWeight: 500, margin: 0 }}>Daftar Data Approval Penjualan</p>
                    </Stack>
                    <TextField
                        type="search"
                        size="small"
                        placeholder="Pencarian by ID"
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
                <PenjualanTable data={penjualanDataTable} />
            </Box>
        </div>
    )
}

export default AppPenjualan;