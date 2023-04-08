import { Box, Stack, Toolbar, InputAdornment, TextField, Icon } from '@mui/material';
import React from 'react'
import NavigationBarUser from '../../../../components/appBarUser';
import { Colors } from '../../../../utils/colors';
import { approvalTable } from '../dummy';
import GudangTable from './gudangTable';
import { isMobile } from 'react-device-detect';

const AppGudang = () => {
    return (
        <div style={{ display: 'flex' }}>
            <NavigationBarUser title={'Approval Mutasi Gudang'} isChild={false} name={'App. Gudang'} idPanel={8}></NavigationBarUser>
            <Box component="main" sx={{ bgcolor: '#f4f5ff', p: isMobile ? 3 : 5, width: '100vw', minHeight: '100vh' }}>
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
                        <p style={{ color: "#fff", fontWeight: 500, margin: 0 }}>Daftar Approval Mutasi Gudang</p>
                    </Stack>
                    <TextField
                        type="search"
                        size="small"
                        placeholder="Pencarian by ID"
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
                <GudangTable data={approvalTable} />
            </Box>
        </div>
    )
}

export default AppGudang;