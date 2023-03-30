import React from 'react';
import { Box, Stack, TextField, Toolbar, InputAdornment } from '@mui/material';
import NavigationBar from '../../../components/appBar';
import { CENTER } from '../../../utils/stylesheet';
import { Colors } from '../../../utils/colors';
import { Add, ViewList, Search, DeleteOutline } from '@mui/icons-material';
import RoleTable from './roleTable';
import DeleteModal from '../../../components/deleteModal';
import { useNavigate } from "react-router-dom";

const dummyTable = {
    content: [
        { id: 1, role: "Admin" },
        { id: 2, role: "User" },
    ],
    totalElements: 10,
    number: 0,
    size: 5,
};

const DataRole = () => {
    const [isDeleteModal, setDeleteModal] = React.useState(false);
    const navigate = useNavigate()

    const handleDelete = () => {
        setDeleteModal(!isDeleteModal);
    };

    const FormRole = () => {
        navigate('/user-role/form-role')
    }

    return (
        <div style={{ display: 'flex' }}>
            <NavigationBar title={'Data Role'} indexNav={3} isChild={false}></NavigationBar>
            <Box
                component="main"
                sx={{ bgcolor: '#f4f5ff', py: 5, px: 10, width: '100vw', minHeight: '100vh' }}
            >
                <Toolbar />
                <div>
                    <Stack direction={'row'} justifyContent={'space-between'}>
                        <div onClick={FormRole} style={{ ...CENTER, backgroundColor: Colors.primary, borderRadius: 5, cursor: 'pointer', padding: '10px 30px', alignSelf: 'flex-start' }}>
                            <Stack alignItems={'center'} direction={'row'} gap={1}>
                                <Add style={{ color: '#fff', fontSize: 17 }}></Add>
                                <p style={{ margin: 0, fontWeight: 500, fontSize: 15, color: '#ffff' }}>Tambah Data Role</p>
                            </Stack>
                        </div>
                        <div onClick={handleDelete} style={{ ...CENTER, backgroundColor: Colors.error, borderRadius: 5, cursor: 'pointer', padding: 10 }}>
                            <DeleteOutline style={{ color: '#fff', fontSize: 25 }}></DeleteOutline>
                        </div>
                    </Stack>
                    <div style={{ marginTop: 10 }}>
                        <Stack
                            direction={"row"}
                            alignItems={"center"}
                            justifyContent={"space-between"}
                            sx={{
                                paddingX: 4,
                                paddingY: 2,
                                backgroundColor: Colors.primary,
                                borderRadius: "10px 10px 0px 0px",
                            }}
                        >
                            <Stack alignItems={"center"} gap={2} direction={"row"}>
                                <ViewList sx={{ fontSize: 27, color: "#fff" }}></ViewList>
                                <p style={{ color: "#fff", fontWeight: 500, margin: 0 }}>Daftar Data Role</p>
                            </Stack>
                            <TextField
                                type="search"
                                size="small"
                                placeholder="Pencarian by ID"
                                sx={{ bgcolor: "white", borderRadius: 1, width: 300 }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Search />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Stack>
                        <RoleTable data={dummyTable} />
                    </div>
                </div>
                <DeleteModal isOpen={isDeleteModal} setOpen={handleDelete} />
            </Box>
        </div >
    )
}

export default DataRole;