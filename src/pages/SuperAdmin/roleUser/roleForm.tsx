import React from 'react';
import { toast } from 'react-toastify';
import { Box, CircularProgress, Icon, IconButton, Stack, TextField, Toolbar, Tooltip } from '@mui/material';
import NavigationBar from '../../../components/appBar';
import { CENTER } from '../../../utils/stylesheet';
import { Colors } from '../../../utils/colors';
import './styles.css'
import { useNavigate, useParams } from "react-router-dom";
import { isMobile } from 'react-device-detect';
import { HTTPAddRole, HTTPGenerateRoleID, HTTPUpdateRole } from '../../../apis/SuperAdmin/role';
import secureLocalStorage from 'react-secure-storage';
import { BorderColor } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { RootState } from '../../../stores/rootReducer';

const RoleForm = () => {
    const navigate = useNavigate()
    const { action }: any = useParams()
    const RoleData = useSelector((state: RootState) => state.roleData.data)
    const [id, setId] = React.useState('')
    const [name, setName] = React.useState('')
    const [init, setInit] = React.useState(false)
    const [onSend, setSend] = React.useState(false)
    const [nameErr, setNameErr] = React.useState(false)
    const [nameErrText, setNameErrText] = React.useState('')

    const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
    }

    const AddRole = async () => {
        const token = secureLocalStorage.getItem("USER_SESSION") as string
        setNameErr(false)
        setNameErrText('')
        setSend(true)
        try {
            if (name.length === 0) {
                setNameErr(true)
                setNameErrText('Pastikan Nama Telah Terisi')
                setSend(false)
            } else {
                if (action === 'update') {
                    const resp = await HTTPUpdateRole({
                        id: RoleData.id,
                        roleName: name,
                        token: token
                    })
                } else {
                    await HTTPAddRole({
                        genId: id,
                        roleName: name,
                        token: token
                    })
                }
                setSend(false)
                navigate('/user-role')
            }
        } catch (error: any) {
            console.log('ERR', error)
            setNameErr(true)
            setNameErrText('Nama Role sudah tersedia')
            setSend(false)
        }
    }

    const getId = async () => {
        try {
            if (action === 'update') {
                setName(RoleData.roleName)
            } else {
                const resp = await HTTPGenerateRoleID()
                setId(resp.data.data.genId)
            }
        } catch (error: any) {
            console.log(error)
if (error.status === 500) {
                toast.error('Server sedang mengalami gangguan!')
            } else {
                toast.error('Terjadi Kesalahan!')
            }
        }
    }

    React.useEffect(() => { getId() }, [init])

    const GoBack = () => {
        navigate(-1)
    }

    const handleSubmit = (event: any) => {
        if (event.key === 'Enter') {
            AddRole()
        }
    }

    return (
        <div style={{ display: 'flex' }}>
            <NavigationBar title={'Form Tambah Data Role'} indexNav={3} isChild={true}></NavigationBar>
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
                                    <h3 style={{ color: '#000' }}>Form Tambah Data Role</h3>
                                    :
                                    <h2 style={{ color: '#000' }}>Form Tambah Data Role</h2>
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

                        <Stack direction={'row'} alignItems={'flex-start'} justifyContent={'flex-start'} gap={isMobile ? 2 : 3}>
                            <Stack direction={'column'} gap={1}>
                                <span>ID Role</span>
                                <TextField
                                    type="text"
                                    disabled
                                    value={action === 'update' ? RoleData.genId : id}
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
                                <span>Nama Role</span>
                                <Stack direction={'column'}>
                                    <TextField
                                        type="text"
                                        size="small"
                                        placeholder="Nama"
                                        value={name}
                                        onKeyDown={handleSubmit}
                                        onChange={handleName}
                                        sx={{ bgcolor: "white", width: isMobile ? '40vw' : '25vw' }}
                                    />
                                    {
                                        nameErr === true ?
                                            <small style={{ fontWeight: 400, margin: 0, color: Colors.primary }}>{nameErrText}</small>
                                            :
                                            <small style={{ margin: 0 }}></small>
                                    }
                                </Stack>
                            </Stack>
                        </Stack>
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} gap={2} marginTop={5}>
                            <div onClick={GoBack} style={{ ...CENTER, borderRadius: 10, border: `1px solid ${Colors.primary}`, padding: '10px 30px', cursor: 'pointer' }}>
                                <span style={{ fontSize: 13, color: Colors.primary }}>BATAL</span>
                            </div>
                            <div onClick={AddRole} style={{ ...CENTER, borderRadius: 10, backgroundColor: Colors.primary, padding: '10px 30px', cursor: 'pointer', color: '#fff' }}>
                                {
                                    onSend === true ?
                                        <CircularProgress size={20} color={'inherit'} />
                                        :
                                        <span style={{ fontSize: 13, color: '#fff' }}>SIMPAN</span>
                                }
                            </div>
                        </Stack>
                    </Stack>
                </div>
            </Box>
        </div >
    )
}

export default RoleForm;