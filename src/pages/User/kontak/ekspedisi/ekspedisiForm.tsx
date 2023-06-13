import React from 'react';
import { Box, CircularProgress, Icon, IconButton, InputAdornment, Stack, TextField, Toolbar, Tooltip } from '@mui/material';
import NavigationBarUser from '../../../../components/appBarUser';
import { CENTER } from '../../../../utils/stylesheet';
import { Colors } from '../../../../utils/colors';
import { useNavigate } from "react-router-dom";
import { isMobile } from 'react-device-detect';
import { useFormik } from 'formik';
import secureLocalStorage from 'react-secure-storage';
import { HTTPAddExpedition, HTTPGenerateExpeditionID } from '../../../../apis/User/contact/expedition';

const EkspedisiForm = () => {
    const navigate = useNavigate()
    const [init, setInit] = React.useState(false)
    const [onSend, setSend] = React.useState(false)
    const [genId, setGenId] = React.useState('')
    const token = secureLocalStorage.getItem("TOKEN") as string

    const GoBack = () => {
        navigate(-1)
    }

    const Formik = useFormik({
        initialValues: {
            nameExpedition: '',
            phone: '',
            address: '',
            shippingCostPerKg: '',
        },
        onSubmit: async (values) => {
            setSend(true)
            try {
                const resp = await HTTPAddExpedition({
                    address: values.address,
                    genId: genId,
                    nameExpedition: values.nameExpedition,
                    phone: parseInt(values.phone),
                    shippingCostPerKg: parseInt(values.shippingCostPerKg),
                    token: token
                })
                console.log(resp)
                setSend(false)
                navigate(-1)
            } catch (error) {
                setSend(false)
                console.log(error)
            }
        }
    })

    const GenerateId = async () => {
        try {
            const resp = await HTTPGenerateExpeditionID()
            setGenId(resp.data.data.genId)
        } catch (error) {
            console.log(error)
        }
    }

    React.useEffect(() => {
        GenerateId()
    }, [init])

    return (
        <form onSubmit={Formik.handleSubmit}>
            <div style={{ display: 'flex' }}>
                <NavigationBarUser title={'Form Tambah Data Ekspedisi'} isChild={true} name={'Ekspedisi'} idPanel={7}></NavigationBarUser>
                <Box
                    component="main"
                    sx={{ bgcolor: '#f4f5ff', p: isMobile ? 2 : 5, width: '100vw', minHeight: '100vh' }}
                >
                    <Toolbar />
                    <div style={{ flex: 1, ...CENTER }}>
                        <Stack direction={'column'} gap={3} sx={{ backgroundColor: '#fff', borderRadius: 2, border: '1px solid #cccccc', padding: '4% 3%' }}>
                            <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                                <h2 style={{ color: '#000' }}>Form Tambah Data Ekspedisi</h2>
                            </Stack>
                            <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-start'} gap={isMobile ? 2 : 3}>
                                <Stack direction={'column'} gap={1}>
                                    <span>*Tipe Kontak</span>
                                    <TextField
                                        type="text"
                                        size="small"
                                        disabled
                                        defaultValue={'Ekspedisi'}
                                        sx={{ bgcolor: "#f4f4f4", width: isMobile ? '40vw' : '25vw' }}
                                    />
                                </Stack>
                                <Stack direction={'column'} gap={1}>
                                    <span>*ID Ekspedisi</span>
                                    <TextField
                                        type="text"
                                        size="small"
                                        disabled
                                        value={genId}
                                        sx={{ bgcolor: "#f4f4f4", width: isMobile ? '40vw' : '25vw' }}
                                        InputProps={{
                                            endAdornment: (
                                                <Tooltip title="Regenerate ID">
                                                    <IconButton onClick={GenerateId}>
                                                        <Icon sx={{ fontSize: 25, color: Colors.primary }}>refresh</Icon>
                                                    </IconButton>
                                                </Tooltip>
                                            )
                                        }}
                                    />
                                </Stack>
                            </Stack>
                            <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-start'} gap={isMobile ? 2 : 3}>
                                <Stack direction={'column'} gap={1}>
                                    <span>Nama Ekspedisi</span>
                                    <TextField
                                        type="text"
                                        size="small"
                                        placeholder='Nama Ekspedisi'
                                        name="nameExpedition"
                                        value={Formik.values.nameExpedition}
                                        onChange={Formik.handleChange}
                                        sx={{ bgcolor: "#fff", width: isMobile ? '40vw' : '25vw' }}
                                    />
                                </Stack>
                                <Stack direction={'column'} gap={1}>
                                    <span>Nomor Telepon</span>
                                    <TextField
                                        type="text"
                                        size="small"
                                        placeholder='No Telp'
                                        name="phone"
                                        value={Formik.values.phone}
                                        onChange={Formik.handleChange}
                                        sx={{ bgcolor: "#fff", width: isMobile ? '40vw' : '25vw' }}
                                    />
                                </Stack>
                            </Stack>
                            <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-start'} gap={isMobile ? 2 : 3}>
                                <Stack direction={'column'} gap={1}>
                                    <span>Alamat Ekspedisi</span>
                                    <TextField
                                        type="text"
                                        size="small"
                                        placeholder={'Alamat Ekspedisi'}
                                        name="address"
                                        value={Formik.values.address}
                                        onChange={Formik.handleChange}
                                        sx={{ bgcolor: "#fff", width: isMobile ? '40vw' : '25vw' }}
                                    />
                                </Stack>
                                <Stack direction={'column'} gap={1}>
                                    <span>Harga Ongkir</span>
                                    <TextField
                                        type="text"
                                        size="small"
                                        placeholder='19.000'
                                        name="shippingCostPerKg"
                                        value={Formik.values.shippingCostPerKg}
                                        onChange={Formik.handleChange}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position={'end'}>
                                                    <span>/ Kg</span>
                                                </InputAdornment>
                                            )
                                        }}
                                        sx={{ bgcolor: "#fff", width: isMobile ? '40vw' : '25vw' }}
                                    />
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
            </div>
        </form>
    )
}

export default EkspedisiForm;