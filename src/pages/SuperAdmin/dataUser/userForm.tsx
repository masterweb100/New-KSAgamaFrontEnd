import React from 'react';
import { Box, Stack, TextField, Toolbar, Select, MenuItem, SelectChangeEvent, InputAdornment, Icon, Tooltip, IconButton, CircularProgress } from '@mui/material';
import NavigationBar from '../../../components/appBar';
import { CENTER } from '../../../utils/stylesheet';
import { Colors } from '../../../utils/colors';
import './styles.css'
import { useNavigate } from "react-router-dom";
import { BorderColor } from '@mui/icons-material';
import { isMobile } from 'react-device-detect';
import { useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import { HTTPAddUser, HTTPGenerateUserID, HTTPUpdateUser } from '../../../apis/user';
import secureLocalStorage from 'react-secure-storage';
import { HTTPGetStores } from '../../../apis/store';
import { HTTPGetRoles } from '../../../apis/role';
import { useSelector } from 'react-redux';
import { RootState } from '../../../stores/rootReducer';

const StatusUser = [
    { value: '1', label: 'Active' },
    { value: '2', label: 'Deactive' }
]

const UserForm = () => {
    const UserData = useSelector((state: RootState) => state.userData.data)
    const [newPassShow, setNewPassShow] = React.useState(false)
    const [confirmPassShow, setConfirmPassShow] = React.useState(false)
    const [confirmPassErr, setConfirmPassErr] = React.useState(false)
    const [confirmPassErrText, setConfirmPassErrText] = React.useState('')
    const [onSend, setSend] = React.useState(false)
    const { action }: any = useParams()
    const navigate = useNavigate()
    const [genId, setGenId] = React.useState('')
    const [storesId, setStoresId] = React.useState<any>([])
    const [rolesId, setRolesId] = React.useState<any>([])
    const [init, setInit] = React.useState(false)

    const toggleNewPass = () => setNewPassShow(!newPassShow)
    const toggleConfirmPass = () => setConfirmPassShow(!confirmPassShow)

    const GoBack = () => {
        navigate(-1)
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: action === 'update' ? UserData.name : '',
            username: '',
            email: '',
            password: '',
            confirmPass: '',
            store: action === 'update' ? UserData.storeId : '',
            role: action === 'update' ? UserData.roleId : '',
            status: action === 'update' ? UserData.status === true ? '1' : '2' : '',
        },
        onSubmit: async (values) => {
            const token = secureLocalStorage.getItem("TOKEN") as string
            setConfirmPassErr(false)
            if (action === 'update') {
                setSend(true)
                try {
                    const resp = await HTTPUpdateUser({
                        id: UserData.id,
                        name: values.name,
                        roleId: values.role,
                        status: values.status === '1' ? true : false,
                        storeId: values.store,
                        token: token
                    })
                    setSend(false)
                    navigate('/user-data')
                } catch (error) {
                    setSend(false)
                    console.log(error)
                }
            } else {
                if (values.password !== values.confirmPass) {
                    setConfirmPassErr(true)
                    setConfirmPassErrText('Password tidak sesuai')
                } else if (values.password.length < 8) {
                    setConfirmPassErr(true)
                    setConfirmPassErrText('Panjang password minimal 8 karakter')
                } else {
                    setSend(true)
                    try {
                        const resp = await HTTPAddUser({
                            genId: genId,
                            name: values.name,
                            username: values.username,
                            email: values.email.toLowerCase(),
                            password: values.password,
                            storeId: parseInt(values.store),
                            roleId: parseInt(values.role),
                            status: values.status === '1' ? true : false,
                            token: token
                        })
                        setSend(false)
                        navigate('/user-data')
                    } catch (error) {
                        setSend(false)
                        console.log(error)
                    }
                }
            }
        },
    });

    const getId = async () => {
        try {
            const respID = await HTTPGenerateUserID()
            setGenId(respID.data.data.genId)
        } catch (error) {
            console.log(error)
        }
    }

    const getStoreName = (values: any) => {
        if (values.length === 0) {
            return <span style={{ color: '#a7a5a6' }}>Pilih Toko</span>;
        } else {
            const result = storesId.filter((value: any) => value.id === formik.values.store)
            return <span style={{ color: '#000' }}>{result[0].storeName}</span>;
        }
    }

    const getRoleName = (values: any) => {
        if (values.length === 0) {
            return <span style={{ color: '#a7a5a6' }}>Pilih Role</span>;
        }
        else {
            const result = rolesId.filter((value: any) => value.id === formik.values.role)
            return <span style={{ color: '#000' }}>{result[0].roleName}</span>;
        }
    }

    const getStatus = (values: any) => {
        if (values.length === 0) {
            return <span style={{ color: '#a7a5a6' }}>Status</span>;
        } else {
            return <span style={{ color: '#000' }}>{values === '1' ? 'Active' : 'Deactive'}</span>;
        }
    }

    const Initial = async () => {
        try {
            const respID = await HTTPGenerateUserID()
            const respStore = await HTTPGetStores({ limit: '', page: '', q: '' })
            const respRole = await HTTPGetRoles({ limit: '', page: '', q: '' })
            setGenId(respID.data.data.genId)
            setStoresId(respStore.data.data)
            setRolesId(respRole.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    React.useEffect(() => { Initial() }, [init])

    return (
        <form onSubmit={formik.handleSubmit}>
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
                                    <span>ID User</span>
                                    <TextField
                                        type="text"
                                        id="id"
                                        name="id"
                                        value={action === 'update' ? UserData.genId : genId}
                                        disabled
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
                                    <span>Nama Pengguna</span>
                                    <TextField
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        size="small"
                                        placeholder="Nama"
                                        sx={{ bgcolor: "white", width: isMobile ? '40vw' : '25vw' }}
                                    />
                                </Stack>
                            </Stack>
                            {
                                action === 'update' ?
                                    null
                                    :
                                    <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-start'} gap={isMobile ? 2 : 3}>
                                        <Stack direction={'column'} gap={1}>
                                            <span>Username</span>
                                            <TextField
                                                type="text"
                                                id="username"
                                                name="username"
                                                value={formik.values.username}
                                                onChange={formik.handleChange}
                                                size="small"
                                                placeholder="Username"
                                                sx={{ bgcolor: "white", width: isMobile ? '40vw' : '25vw' }}
                                            />
                                        </Stack>
                                        <Stack direction={'column'} gap={1}>
                                            <span>Email</span>
                                            <TextField
                                                type="text"
                                                id="email"
                                                name="email"
                                                value={formik.values.email}
                                                onChange={formik.handleChange}
                                                size="small"
                                                placeholder="email@gmail.com"
                                                sx={{ bgcolor: "white", width: isMobile ? '40vw' : '25vw' }}
                                            />
                                        </Stack>
                                    </Stack>
                            }
                            {
                                action === 'update' ?
                                    null
                                    :
                                    <Stack direction={'row'} alignItems={'flex-start'} justifyContent={'flex-start'} gap={isMobile ? 2 : 3}>
                                        <Stack direction={"column"} gap={1}>
                                            <span>Password</span>
                                            <TextField
                                                type={newPassShow ? "text" : "password"}
                                                id="password"
                                                name="password"
                                                value={formik.values.password}
                                                onChange={formik.handleChange}
                                                size="small"
                                                placeholder="Password"
                                                error={confirmPassErr}
                                                sx={{ bgcolor: "white", width: isMobile ? "40vw" : "25vw" }}
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
                                            <Stack direction={'column'}>
                                                <TextField
                                                    type={confirmPassShow ? "text" : "password"}
                                                    size="small"
                                                    id="confirmPass"
                                                    name="confirmPass"
                                                    value={formik.values.confirmPass}
                                                    onChange={formik.handleChange}
                                                    placeholder="Konfirmasi"
                                                    error={confirmPassErr}
                                                    sx={{ bgcolor: "white", width: isMobile ? "40vw" : "25vw" }}
                                                    InputProps={{
                                                        endAdornment:
                                                            <InputAdornment position='end'>
                                                                <Icon style={{ color: "#909090", fontSize: 25, cursor: 'pointer' }} onClick={toggleConfirmPass}>
                                                                    {!confirmPassShow ? 'visibility' : 'visibility_off'}
                                                                </Icon>
                                                            </InputAdornment>
                                                    }}
                                                />
                                                {
                                                    confirmPassErr === true ?
                                                        <small style={{ fontWeight: 400, margin: 0, color: Colors.primary }}>{confirmPassErrText}</small>
                                                        :
                                                        <small style={{ margin: 0 }}></small>
                                                }
                                            </Stack>
                                        </Stack>
                                    </Stack>
                            }
                            <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-start'} gap={isMobile ? 2 : 3}>
                                <Stack direction={'column'} gap={1}>
                                    <span>Status</span>
                                    {
                                        action === 'update' ?
                                            <Select
                                                size="small"
                                                id="status"
                                                name="status"
                                                value={formik.values.status}
                                                displayEmpty
                                                sx={{ bgcolor: "white", width: isMobile ? '40vw' : '25vw', color: '#000' }}
                                                onChange={formik.handleChange}
                                            >
                                                {
                                                    StatusUser.map((item, index) => (
                                                        <MenuItem value={item.value} key={index}>{item.label}</MenuItem>
                                                    ))
                                                }
                                            </Select>
                                            :
                                            <Select
                                                size="small"
                                                id="status"
                                                name="status"
                                                value={formik.values.status}
                                                displayEmpty
                                                sx={{ bgcolor: "white", width: isMobile ? '40vw' : '25vw', color: '#000' }}
                                                onChange={formik.handleChange}
                                                renderValue={(selected: any) => getStatus(selected)}
                                            >
                                                {
                                                    StatusUser.map((item, index) => (
                                                        <MenuItem value={item.value} key={index}>{item.label}</MenuItem>
                                                    ))
                                                }
                                            </Select>
                                    }
                                </Stack>
                                <Stack direction={'column'} gap={1}>
                                    <span>Role Pengguna</span>
                                    {
                                        action === 'update' ?
                                            <Select
                                                size="small"
                                                id="role"
                                                name="role"
                                                value={formik.values.role}
                                                displayEmpty
                                                sx={{ bgcolor: "white", width: isMobile ? '40vw' : '25vw', color: '#000' }}
                                                onChange={formik.handleChange}
                                            >
                                                {
                                                    rolesId.map((item: any, index: number) => (
                                                        <MenuItem value={item.id} key={index}>{item.roleName}</MenuItem>
                                                    ))
                                                }
                                            </Select>
                                            :
                                            <Select
                                                size="small"
                                                id="role"
                                                name="role"
                                                value={formik.values.role}
                                                displayEmpty
                                                sx={{ bgcolor: "white", width: isMobile ? '40vw' : '25vw', color: '#000' }}
                                                onChange={formik.handleChange}
                                                renderValue={(selected: any) => getRoleName(selected)}
                                            >
                                                {
                                                    rolesId.map((item: any, index: number) => (
                                                        <MenuItem value={item.id} key={index}>{item.roleName}</MenuItem>
                                                    ))
                                                }
                                            </Select>
                                    }
                                </Stack>
                            </Stack>
                            {
                                storesId.length === 0 ?
                                    null
                                    :
                                    <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-start'} gap={isMobile ? 2 : 3}>
                                        <Stack direction={'column'} gap={1}>
                                            <span>Toko</span>
                                            {
                                                action === 'update' ?
                                                    <Select
                                                        size="small"
                                                        id="store"
                                                        name="store"
                                                        value={formik.values.store}
                                                        displayEmpty
                                                        sx={{ bgcolor: "white", width: isMobile ? '40vw' : '25vw', color: '#000' }}
                                                        onChange={formik.handleChange}
                                                    >
                                                        {
                                                            storesId.map((item: any, index: number) => (
                                                                <MenuItem value={item.id} key={index}>{item.storeName}</MenuItem>
                                                            ))
                                                        }
                                                    </Select>
                                                    :
                                                    <Select
                                                        size="small"
                                                        id="store"
                                                        name="store"
                                                        value={formik.values.store}
                                                        displayEmpty
                                                        sx={{ bgcolor: "white", width: isMobile ? '40vw' : '25vw', color: '#000' }}
                                                        onChange={formik.handleChange}
                                                        renderValue={(selected: any) => getStoreName(selected)}
                                                    >
                                                        {
                                                            storesId.map((item: any, index: number) => (
                                                                <MenuItem value={item.id} key={index}>{item.storeName}</MenuItem>
                                                            ))
                                                        }
                                                    </Select>
                                            }
                                        </Stack>
                                    </Stack>
                            }
                            <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} gap={2} marginTop={5}>
                                <div onClick={GoBack} style={{ ...CENTER, borderRadius: 10, border: `1px solid ${Colors.primary}`, padding: '10px 30px', cursor: 'pointer' }}>
                                    <span style={{ fontSize: 13, color: Colors.primary }}>BATAL</span>
                                </div>
                                <button type="submit" style={{ all: 'unset' }}>
                                    <div style={{ ...CENTER, borderRadius: 10, backgroundColor: Colors.primary, padding: '10px 30px', cursor: 'pointer' }}>
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
            </div>
        </form >
    )
}

export default UserForm;