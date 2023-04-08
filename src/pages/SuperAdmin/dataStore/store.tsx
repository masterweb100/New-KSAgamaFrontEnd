import React from 'react';
import { Box, Stack, TextField, Toolbar, InputAdornment } from '@mui/material';
import NavigationBar from '../../../components/appBar';
import { CENTER } from '../../../utils/stylesheet';
import { Colors } from '../../../utils/colors';
import { Add, ViewList, Search, DeleteOutline } from '@mui/icons-material';
import StoreTable from './storeTable';
import { useNavigate } from "react-router-dom";
import DeleteModal from '../../../components/deleteModal';
import { isMobile } from 'react-device-detect';

const dummyTable = {
    content: [
        {
            id: 1,
            store: "Warteg Woro Kangen",
            address: "Jl. Tendean No. 11, Jakarta Selatan",
            admin: "Admin",
        },
        {
            id: 2,
            store: "Warteg Woro Kangen",
            address: "Jl. Tendean No. 11, Jakarta Selatan",
            admin: "Admin",
        },
        {
            id: 3,
            store: "Warteg Woro Kangen",
            address: "Jl. Tendean No. 11, Jakarta Selatan",
            admin: "Admin",
        },
        {
            id: 4,
            store: "Warteg Woro Kangen",
            address: "Jl. Tendean No. 11, Jakarta Selatan",
            admin: "Admin",
        },
        {
            id: 5,
            store: "Warteg Woro Kangen",
            address: "Jl. Tendean No. 11, Jakarta Selatan",
            admin: "Admin",
        },
        {
            id: 6,
            store: "Warteg Woro Kangen",
            address: "Jl. Tendean No. 11, Jakarta Selatan",
            admin: "Admin",
        },
        {
            id: 7,
            store: "Warteg Woro Kangen",
            address: "Jl. Tendean No. 11, Jakarta Selatan",
            admin: "Admin",
        },
        {
            id: 8,
            store: "Warteg Woro Kangen",
            address: "Jl. Tendean No. 11, Jakarta Selatan",
            admin: "Admin",
        },
    ],
    totalElements: 10,
    number: 0,
    size: 5,
};

const DataStore = () => {
    const navigate = useNavigate()
    const [isDeleteModal, setDeleteModal] = React.useState(false);

    const handleDelete = () => {
        setDeleteModal(!isDeleteModal);
    };

    const FormStore = () => navigate('/store-data/form-store')

    return (
        <div style={{ display: 'flex' }}>
            <NavigationBar title={'Data Toko'} indexNav={2} isChild={false}></NavigationBar>
            <Box
                component="main"
                sx={{ bgcolor: '#f4f5ff', p: isMobile ? 3 : 5, width: '100vw', minHeight: '100vh' }}
            >
                <Toolbar />
                <div>
                    <Stack direction={'row'} justifyContent={'space-between'}>
                        <div onClick={FormStore} style={{ ...CENTER, backgroundColor: Colors.primary, borderRadius: 5, cursor: 'pointer', padding: isMobile ? '12px 15px' : '10px 30px', alignSelf: 'flex-start' }}>
                            <Stack alignItems={'center'} direction={'row'} gap={1}>
                                <Add style={{ color: '#fff', fontSize: 17 }}></Add>
                                <p style={{ margin: 0, fontWeight: 500, fontSize: isMobile ? 13 : 15, color: '#ffff' }}>Tambah Data Toko</p>
                            </Stack>
                        </div>
                        <div onClick={handleDelete} style={{ ...CENTER, backgroundColor: Colors.error, borderRadius: 5, cursor: 'pointer', padding: 10 }}>
                            <DeleteOutline style={{ color: '#fff', fontSize: isMobile ? 20 : 25 }}></DeleteOutline>
                        </div>
                    </Stack>
                    <div style={{ marginTop: 10 }}>
                        <Stack
                            direction={isMobile ? "column" : "row"}
                            alignItems={"center"}
                            gap={3}
                            justifyContent={isMobile ? "center" : "space-between"}
                            sx={{
                                paddingX: 4,
                                paddingY: 2,
                                backgroundColor: Colors.primary,
                                borderRadius: "10px 10px 0px 0px",
                            }}
                        >
                            <Stack alignItems={"center"} gap={2} direction={"row"}>
                                <ViewList sx={{ fontSize: 27, color: "#fff" }}></ViewList>
                                <p style={{ color: "#fff", fontWeight: 500, margin: 0 }}>Daftar Data Toko</p>
                            </Stack>
                            <TextField
                                type="search"
                                size="small"
                                placeholder="Pencarian by ID"
                                sx={{ bgcolor: "white", borderRadius: 1, width: isMobile ? '90%' : '20vw' }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Search />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Stack>
                        <StoreTable data={dummyTable} />
                    </div>
                </div>
                <DeleteModal isOpen={isDeleteModal} setOpen={handleDelete} />
            </Box>
        </div >
    )
}

export default DataStore;