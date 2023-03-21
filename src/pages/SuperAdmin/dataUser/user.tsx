import React from 'react';
import { Box, Stack, TextField, Toolbar, InputAdornment, Slide } from '@mui/material';
import NavigationBar from '../../../components/appBar';
import { CENTER } from '../../../utils/stylesheet';
import { Colors } from '../../../utils/colors';
import { Add, ViewList, Search, DeleteOutline } from '@mui/icons-material';
import './styles.css'
import UserTable from './userTable';
import { TransitionProps } from '@mui/material/transitions';
import DeleteModal from '../../../components/deleteModal';
import { useNavigate } from "react-router-dom";

const dummyTable = {
    content: [
        {
            id: 1,
            name: "Siti",
            store: "Hanifah Barokah",
            role: "Admin",
            isActive: false,
        },
        {
            id: 2,
            name: "Siti",
            store: "Hanifah Barokah",
            role: "Admin",
            isActive: true,
        },
        {
            id: 3,
            name: "Siti",
            store: "Hanifah Barokah",
            role: "Admin",
            isActive: false,
        },
        {
            id: 4,
            name: "Siti",
            store: "Hanifah Barokah",
            role: "Admin",
            isActive: true,
        },
        {
            id: 5,
            name: "Siti",
            store: "Hanifah Barokah",
            role: "Admin",
            isActive: false,
        },
        {
            id: 6,
            name: "Siti",
            store: "Hanifah Barokah",
            role: "Admin",
            isActive: true,
        },
        {
            id: 7,
            name: "Siti",
            store: "Hanifah Barokah",
            role: "Admin",
            isActive: false,
        },
        {
            id: 8,
            name: "Siti",
            store: "Hanifah Barokah",
            role: "Admin",
            isActive: true,
        },
    ],
    totalElements: 10,
    number: 0,
    size: 5,
};

const DataUser = () => {
    const [page, setPage] = React.useState(0);
    const [itemsPerPage, setItemsPerPage] = React.useState(5);
    const [isDeleteModal, setDeleteModal] = React.useState(false);
    const navigate = useNavigate()

    const handleDelete = () => {
        setDeleteModal(!isDeleteModal);
    };

    const FormUser = () => navigate('/user-data/form-user')

    return (
        <div style={{ display: 'flex' }}>
            <NavigationBar title={'Data Pengguna'} indexNav={1} isChild={false}></NavigationBar>
            <Box
                component="main"
                sx={{ bgcolor: '#f4f5ff', py: 5, px: 10, width: '100vw', minHeight: '100vh' }}
            >
                <Toolbar />
                <div>
                    <Stack direction={'column'} gap={4}>
                        <Stack direction={'row'} gap={1}>
                            <div className='btn-active'>
                                <p style={{ margin: 0, fontWeight: 600, fontSize: 15 }}>Semua</p>
                            </div>
                            <div className='btn-inactive'>
                                <p style={{ margin: 0, fontWeight: 600, fontSize: 15 }}>Admin</p>
                            </div>
                            <div className='btn-inactive'>
                                <p style={{ margin: 0, fontWeight: 600, fontSize: 15 }}>User</p>
                            </div>
                        </Stack>
                        <Stack direction={'row'} justifyContent={'space-between'}>
                            <div onClick={FormUser} style={{ ...CENTER, backgroundColor: Colors.primary, borderRadius: 5, cursor: 'pointer', padding: '10px 30px', alignSelf: 'flex-start' }}>
                                <Stack alignItems={'center'} direction={'row'} gap={1}>
                                    <Add style={{ color: '#fff', fontSize: 17 }}></Add>
                                    <p style={{ margin: 0, fontWeight: 500, fontSize: 15, color: '#ffff' }}>Tambah Data Pengguna</p>
                                </Stack>
                            </div>
                            <div onClick={handleDelete} style={{ ...CENTER, backgroundColor: Colors.error, borderRadius: 5, cursor: 'pointer', padding: 10 }}>
                                <DeleteOutline style={{ color: '#fff', fontSize: 25 }}></DeleteOutline>
                            </div>
                        </Stack>
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
                                <p style={{ color: "#fff", fontWeight: 500, margin: 0 }}>Daftar Data Pengguna</p>
                            </Stack>
                            <TextField
                                type="search"
                                size="small"
                                placeholder="Pencarian by ID"
                                sx={{ bgcolor: "white", borderRadius: 1, width: 300 }}
                                // onChange={(e) => {
                                //     console.log(e.target.value);
                                // }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Search />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Stack>
                        <UserTable
                            data={dummyTable}
                            setPage={setPage}
                            setItemsPerPage={setItemsPerPage}
                        />
                    </div>
                </div>
                <DeleteModal isOpen={isDeleteModal} setOpen={handleDelete} />
            </Box>
        </div >
    )
}

export default DataUser;