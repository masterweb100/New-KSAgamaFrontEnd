import React from 'react';
import { Box, Stack, TextField, Toolbar, Select, MenuItem, SelectChangeEvent, Tooltip, IconButton, Icon, CircularProgress } from '@mui/material';
import NavigationBar from '../../../components/appBar';
import { CENTER } from '../../../utils/stylesheet';
import { Colors } from '../../../utils/colors';
import './styles.css'
import { useNavigate, useParams } from "react-router-dom";
import { BorderColor } from '@mui/icons-material';
import { isMobile } from 'react-device-detect';
import { useFormik } from 'formik';
import { HTTPAddStore, HTTPGenerateStoreID, HTTPUpdateStore } from '../../../apis/SuperAdmin/store';
import { HTTPGetUsers, HTTPUpdateUser } from '../../../apis/SuperAdmin/user';
import secureLocalStorage from 'react-secure-storage';
import { useSelector } from 'react-redux';
import { RootState } from '../../../stores/rootReducer';

const StoreForm = () => {
    const StoreData = useSelector((state: RootState) => state.storeData.data)
    const token = secureLocalStorage.getItem("TOKEN") as string
    const { action }: any = useParams()
    const navigate = useNavigate()
    const [init, setInit] = React.useState(false)
    const [genId, setGenId] = React.useState('')
    const [usersId, setUsersId] = React.useState<any>([])
    const [onSend, setSend] = React.useState(false)
    const [userStore, setUserStore] = React.useState<any>({})

    const GoBack = () => {
        navigate(-1)
    }

    const AddStore = async (values: any) => {
        try {
            const resp = await HTTPAddStore({
                address: values.address,
                adminId: values.adminId,
                storeName: values.storeName,
                genId: genId,
                token: token
            })
            if (resp.status === 200) {
                const resp2 = await HTTPUpdateUser({
                    id: userStore.id,
                    name: userStore.name,
                    roleId: userStore.roleId,
                    status: userStore.status,
                    storeId: resp.data.data.id,
                    token: token
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    const UpdateStore = async (values: any) => {
        try {
            await HTTPUpdateStore({
                address: values.address,
                adminId: values.adminId,
                storeName: values.storeName,
                id: StoreData.id,
                token: token
            })
            await HTTPUpdateUser({
                id: userStore.id,
                name: userStore.name,
                roleId: userStore.roleId,
                status: userStore.status,
                storeId: StoreData.id,
                token: token
            })
        } catch (error) {
            console.log(error)
        }
    }

    const Formik = useFormik({
        initialValues: {
            storeName: action === 'update' ? StoreData.storeName : '',
            address: action === 'update' ? StoreData.address : '',
            adminId: action === 'update' ? StoreData.adminId : '',
        },
        onSubmit: async (values) => {
            setSend(true)
            try {
                if (action === 'update') {
                    await UpdateStore(values)
                } else {
                    await AddStore(values)
                }
                setSend(false)
                navigate('/store-data')
            } catch (error) {
                console.log(error)
                setSend(false)
            }
        }
    })

    const getId = async () => {
        try {
            const respID = await HTTPGenerateStoreID()
            setGenId(respID.data.data.genId)
        } catch (error) {
            console.log(error)
        }
    }

    const getUserName = (values: any) => {
        if (values.length === 0) {
            return <span style={{ color: '#a7a5a6' }}>Pilih Admin</span>;
        } else {
            const result = usersId.filter((value: any) => value.id === Formik.values.adminId)
            setUserStore(result[0])

            return <span style={{ color: '#000' }}>{result[0].name}</span>;
        }
    }

    const Initial = async () => {
        try {
            const respID = await HTTPGenerateStoreID()
            const respUser = await HTTPGetUsers({ limit: '50', page: '', q: '' })
            setGenId(respID.data.data.genId)
            setUsersId(respUser.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    React.useEffect(() => { Initial() }, [init])
    return (
        <form onSubmit={Formik.handleSubmit}>
            <div style={{ display: 'flex' }}>
                <NavigationBar title={'Form Tambah Data Toko'} indexNav={2} isChild={true}></NavigationBar>
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
                                        <h3 style={{ color: '#000' }}>Form Tambah Data Toko</h3>
                                        :
                                        <h2 style={{ color: '#000' }}>Form Tambah Data Toko</h2>
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
                                    <span>ID Toko</span>
                                    <TextField
                                        type="text"
                                        disabled
                                        value={action === 'update' ? StoreData.genId : genId}
                                        size="small"
                                        placeholder="ID"
                                        sx={{ bgcolor: "#f4f4f4", width: isMobile ? '40vw' : '25vw' }}
                                        InputProps={{
                                            endAdornment: (
                                                action === 'update' ?
                                                    null
                                                    :
                                                    <Tooltip title="Regenerate ID">
                                                        <IconButton onClick={getId}>
                                                            <Icon sx={{ fontSize: 25, color: Colors.primary }}>refresh</Icon>
                                                        </IconButton>
                                                    </Tooltip>
                                            )
                                        }}
                                    />
                                </Stack>
                                <Stack direction={'column'} gap={1}>
                                    <span>Nama Toko</span>
                                    <TextField
                                        type="text"
                                        size="small"
                                        id="storeName"
                                        name="storeName"
                                        value={Formik.values.storeName}
                                        onChange={Formik.handleChange}
                                        placeholder="Nama"
                                        sx={{ bgcolor: "white", width: isMobile ? '40vw' : '25vw' }}
                                    />
                                </Stack>
                            </Stack>
                            <Stack direction={'row'} alignItems={'flex-start'} justifyContent={'flex-start'} gap={isMobile ? 2 : 3}>
                                <Stack direction={'column'} gap={1}>
                                    <span>Alamat Toko</span>
                                    <TextField
                                        type="text"
                                        size="small"
                                        id="address"
                                        name="address"
                                        value={Formik.values.address}
                                        onChange={Formik.handleChange}
                                        placeholder="Alamat"
                                        sx={{ bgcolor: "white", width: isMobile ? '40vw' : '25vw' }}
                                        multiline
                                        rows={5}
                                    />
                                </Stack>
                                <Stack direction={'column'} gap={1}>
                                    <span>Admin Toko</span>
                                    {
                                        action === 'update' ?
                                            <Select
                                                size="small"
                                                displayEmpty
                                                id="adminId"
                                                name="adminId"
                                                value={Formik.values.adminId}
                                                onChange={Formik.handleChange}
                                                MenuProps={{ style: { height: 300 } }}
                                                sx={{ bgcolor: "white", width: isMobile ? '40vw' : '25vw', color: '#000' }}
                                            >
                                                {
                                                    usersId.map((item: any, index: number) => (
                                                        <MenuItem value={item.id} key={index}>{item.name}</MenuItem>
                                                    ))
                                                }
                                            </Select>
                                            :
                                            <Select
                                                size="small"
                                                displayEmpty
                                                id="adminId"
                                                name="adminId"
                                                value={Formik.values.adminId}
                                                onChange={Formik.handleChange}
                                                MenuProps={{ style: { height: 300 } }}
                                                sx={{ bgcolor: "white", width: isMobile ? '40vw' : '25vw', color: '#000' }}
                                                renderValue={(selected: any) => getUserName(selected)}
                                            >
                                                {
                                                    usersId.map((item: any, index: number) => (
                                                        <MenuItem value={item.id} key={index}>{item.name}</MenuItem>
                                                    ))
                                                }
                                            </Select>
                                    }
                                </Stack>
                            </Stack>
                            <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} gap={2} marginTop={5}>
                                <div onClick={GoBack} style={{ ...CENTER, borderRadius: 10, border: `1px solid ${Colors.primary}`, padding: '10px 30px', cursor: 'pointer' }}>
                                    <span style={{ fontSize: 13, color: Colors.primary }}>BATAL</span>
                                </div>
                                <button type="submit" style={{ all: 'unset' }}>
                                    <div style={{ ...CENTER, borderRadius: 10, backgroundColor: Colors.primary, padding: '10px 30px', cursor: 'pointer', color: '#fff' }}>
                                        {
                                            onSend === true ?
                                                <CircularProgress size={20} color={'inherit'} />
                                                :
                                                <span style={{ fontSize: 13, color: '#fff' }}>SIMPAN</span>
                                        }
                                    </div>
                                </button>
                            </Stack>
                        </Stack>
                    </div>
                </Box>
            </div >
        </form>
    )
}

export default StoreForm;