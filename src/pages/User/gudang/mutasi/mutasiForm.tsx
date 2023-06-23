import React from 'react';
import { toast } from 'react-toastify';
import { Box, Stack, TextField, Toolbar, Select, MenuItem, SelectChangeEvent, CircularProgress } from '@mui/material';
import NavigationBarUser from '../../../../components/appBarUser';
import { CENTER } from '../../../../utils/stylesheet';
import { Colors } from '../../../../utils/colors';
import { useNavigate } from "react-router-dom";
import { isMobile } from 'react-device-detect';
import { useFormik } from 'formik';
import secureLocalStorage from 'react-secure-storage';
import { HTTPAddMutation, HTTPGenerateMutationID } from '../../../../apis/User/mutationReturn/mutations';
import moment from 'moment';
import { HTTPGetTypes } from '../../../../apis/User/product/types';
import { HTTPGetStoreID, HTTPGetStores } from '../../../../apis/SuperAdmin/store';

const MutasiForm = () => {
    const navigate = useNavigate()
    const token = secureLocalStorage.getItem('USER_SESSION') as string
    const user = secureLocalStorage.getItem('USER_DATA') as string
    const [genId, setGenId] = React.useState('')
    const [init, setInit] = React.useState(false)
    const [TypesData, setTypesData] = React.useState([])
    const [StoresData, setStoresData] = React.useState([])
    const [MyStoreData, setMyStoreData] = React.useState<any>({})
    const [loader, setLoader] = React.useState(false)

    const GoBack = () => {
        navigate(-1)
    }

    const Formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            date: moment().format('YYYY-MM-DD'),
            productUnitId: '',
            qty: '',
            storeDestinationId: ''
        },
        onSubmit: async (values) => {
            setLoader(true)
            try {
                const resp = await HTTPAddMutation({
                    date: values.date,
                    genId: genId,
                    productUnitId: parseInt(values.productUnitId),
                    qty: parseInt(values.qty),
                    storeDestinationId: parseInt(values.storeDestinationId),
                    token: token
                })
                setLoader(false)
                GoBack()
            } catch (error: any) {
                setLoader(false)
                console.log(error)
if (error.status === 500) {
                toast.error('Server sedang mengalami gangguan!')
            } else {
                toast.error('Terjadi Kesalahan!')
            }
            }
        }
    })

    const generateId = async () => {
        try {
            const resp = await HTTPGenerateMutationID()
            setGenId(resp.data.data.genId)
        } catch (error: any) {
            console.log(error)
if (error.status === 500) {
                toast.error('Server sedang mengalami gangguan!')
            } else {
                toast.error('Terjadi Kesalahan!')
            }
        }
    }

    const getTypes = async () => {
        try {
            const resp = await HTTPGetTypes({ limit: '50', page: '1', q: undefined, token: token })
            setTypesData(resp.data.data)
        } catch (error: any) {
            console.log(error)
if (error.status === 500) {
                toast.error('Server sedang mengalami gangguan!')
            } else {
                toast.error('Terjadi Kesalahan!')
            }
        }
    }

    const getStores = async () => {
        try {
            const resp = await HTTPGetStores({ limit: '50', page: '1', q: '' })
            setStoresData(resp.data.data)
        } catch (error: any) {
            console.log(error)
if (error.status === 500) {
                toast.error('Server sedang mengalami gangguan!')
            } else {
                toast.error('Terjadi Kesalahan!')
            }
        }
    }

    const getMyStore = async () => {
        try {
            const resp = await HTTPGetStoreID({ id: JSON.parse(user).storeId, token: token })
            setMyStoreData(resp.data.data)
        } catch (error: any) {
            console.log(error)
if (error.status === 500) {
                toast.error('Server sedang mengalami gangguan!')
            } else {
                toast.error('Terjadi Kesalahan!')
            }
        }
    }

    const Initial = async () => {
        try {
            await generateId()
            await getTypes()
            await getStores()
            await getMyStore()
        } catch (error: any) {
            console.log(error)
if (error.status === 500) {
                toast.error('Server sedang mengalami gangguan!')
            } else {
                toast.error('Terjadi Kesalahan!')
            }
        }
    }

    React.useEffect(() => { Initial() }, [init])

    const renderStore = (values: any) => {
        if (values.length === 0) {
            return <span style={{ color: '#a7a5a6' }}>Pilih Tujuan</span>;
        } else {
            const result: any = StoresData.filter((value: any) => value.id === Formik.values.storeDestinationId)
            return <span style={{ color: '#000' }}>{result[0].storeName}</span>;
        }
    }

    const renderType = (values: any) => {
        if (values.length === 0) {
            return <span style={{ color: '#a7a5a6' }}>Pilih Jenis Barang</span>;
        } else {
            const result: any = TypesData.filter((value: any) => value.id === Formik.values.productUnitId)
            return <span style={{ color: '#000' }}>{result[0].typeName}</span>;
        }
    }

    return (
        <form onSubmit={Formik.handleSubmit}>
            <div style={{ display: 'flex' }}>
                <NavigationBarUser title={'Form Tambah Mutasi'} isChild={true} name={'Mutasi & Return'} idPanel={2}></NavigationBarUser>
                <Box
                    component="main"
                    sx={{ bgcolor: '#f4f5ff', p: isMobile ? 2 : 5, width: '100vw', minHeight: '100vh' }}
                >
                    <Toolbar />
                    <div style={{ flex: 1, ...CENTER }}>
                        <Stack direction={'column'} gap={3} sx={{ backgroundColor: '#fff', borderRadius: 2, border: '1px solid #cccccc', padding: '4% 3%' }}>
                            <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                                <h2 style={{ color: '#000' }}>Form Tambah Mutasi</h2>
                            </Stack>
                            <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-start'} gap={isMobile ? 2 : 3}>
                                <Stack direction={'column'} gap={1}>
                                    <span>Tanggal</span>
                                    <TextField
                                        type="text"
                                        disabled
                                        name='date'
                                        value={Formik.values.date}
                                        size="small"
                                        sx={{ bgcolor: "#f4f4f4", width: isMobile ? '40vw' : '25vw' }}
                                    />
                                </Stack>
                                <Stack direction={'column'} gap={1}>
                                    <span>Nomor Mutasi</span>
                                    <TextField
                                        type="text"
                                        disabled
                                        size="small"
                                        value={genId}
                                        sx={{ bgcolor: "#f4f4f4", width: isMobile ? '40vw' : '25vw' }}
                                    />
                                </Stack>
                            </Stack>
                            <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-start'} gap={isMobile ? 2 : 3}>
                                <Stack direction={'column'} gap={1}>
                                    <span>Jenis Barang</span>
                                    <Select
                                        size="small"
                                        displayEmpty
                                        sx={{ bgcolor: "white", width: isMobile ? '40vw' : '25vw', color: '#000' }}
                                        name={'productUnitId'}
                                        value={Formik.values.productUnitId}
                                        onChange={Formik.handleChange}
                                        renderValue={renderType}
                                    >
                                        {
                                            TypesData.map((item: any, index: number) => (
                                                <MenuItem key={index} value={item.id}>{item.typeName}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                </Stack>
                                <Stack direction={'column'} gap={1}>
                                    <span>Jumlah Barang</span>
                                    <TextField
                                        type="text"
                                        size="small"
                                        name="qty"
                                        placeholder='Qty'
                                        value={Formik.values.qty}
                                        onChange={Formik.handleChange}
                                        sx={{ bgcolor: "#fff", width: isMobile ? '40vw' : '25vw' }}
                                    />
                                </Stack>
                            </Stack>
                            <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-start'} gap={isMobile ? 2 : 3}>
                                <Stack direction={'column'} gap={1}>
                                    <span>Gudang Asal</span>
                                    <TextField
                                        type="text"
                                        size="small"
                                        disabled
                                        value={MyStoreData.storeName}
                                        placeholder="Gudang"
                                        sx={{ bgcolor: "#f4f4f4", width: isMobile ? '40vw' : '25vw' }}
                                    />
                                </Stack>
                                <Stack direction={'column'} gap={1}>
                                    <span>Gudang Tujuan</span>
                                    <Select
                                        size="small"
                                        displayEmpty
                                        sx={{ bgcolor: "white", width: isMobile ? '40vw' : '25vw', color: '#000' }}
                                        name="storeDestinationId"
                                        value={Formik.values.storeDestinationId}
                                        onChange={Formik.handleChange}
                                        renderValue={renderStore}
                                    >
                                        {
                                            StoresData.map((item: any, index: number) => (
                                                <MenuItem key={index} value={item.id}>{item.storeName}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                </Stack>
                            </Stack>
                            <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} gap={2} marginTop={5}>
                                <div onClick={GoBack} style={{ ...CENTER, borderRadius: 10, border: `1px solid ${Colors.primary}`, padding: '10px 30px', cursor: 'pointer' }}>
                                    <span style={{ fontSize: 13, color: Colors.primary }}>BATAL</span>
                                </div>
                                <button type={'submit'} style={{ ...CENTER, borderRadius: 10, backgroundColor: Colors.primary, padding: '10px 30px', cursor: 'pointer', color: '#fff' }}>
                                    {
                                        loader === true ?
                                            <CircularProgress size={20} color={'inherit'} />
                                            :
                                            <span style={{ fontSize: 13, color: '#fff' }}>SIMPAN</span>
                                    }
                                </button>
                            </Stack>
                        </Stack>
                    </div>
                </Box>
            </div >
        </form>
    )
}

export default MutasiForm;