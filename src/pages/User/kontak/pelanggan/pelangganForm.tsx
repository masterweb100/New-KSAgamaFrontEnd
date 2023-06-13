import React from 'react';
import { Box, Stack, TextField, Toolbar, Select, MenuItem, SelectChangeEvent, CircularProgress } from '@mui/material';
import NavigationBarUser from '../../../../components/appBarUser';
import { CENTER } from '../../../../utils/stylesheet';
import { Colors } from '../../../../utils/colors';
import { useNavigate } from "react-router-dom";
import { isMobile } from 'react-device-detect';
import { useFormik } from 'formik';
import secureLocalStorage from 'react-secure-storage';
import { HTTPAddCustomer } from '../../../../apis/User/contact/customer';
import { HTTPLocCities, HTTPLocProvinces } from '../../../../apis/User/location';

const PelangganForm = () => {
    const navigate = useNavigate()
    const token = secureLocalStorage.getItem("TOKEN") as string
    const [onSend, setSend] = React.useState(false)
    const [Provinces, setProvinces] = React.useState([]);
    const [ProvincesValue, setProvincesValue] = React.useState('');
    const [Cities, setCities] = React.useState([]);
    const [CitiesValue, setCitiesValue] = React.useState('');

    const handleChangeProvinces = (event: SelectChangeEvent) => {
        setCities([])
        setCitiesValue('')
        setProvincesValue(event.target.value as string);
        GetCities(event.target.value)
    };

    const handleChangeCities = (event: SelectChangeEvent) => {
        setCitiesValue(event.target.value as string);
    };

    const GoBack = () => {
        navigate(-1)
    }

    const Formik = useFormik({
        initialValues: {
            nameCustomer: '',
            nameCustomerOpt: '',
            nameCompany: '',
            address: '',
            country: '',
            provinceId: '',
            cityId: '',
            email: '',
            phone: '',
            identityType: '',
            identityNo: '',
            npwp: ''
        },
        onSubmit: async (values) => {
            setSend(true)
            try {
                const resp = await HTTPAddCustomer({
                    token: token,
                    nameCustomer: values.nameCustomer,
                    nameCustomerOpt: values.nameCustomerOpt,
                    nameCompany: values.nameCompany,
                    address: values.address,
                    country: values.country,
                    provinceId: parseInt(ProvincesValue),
                    cityId: parseInt(CitiesValue),
                    phone: parseInt(values.phone),
                    email: (values.email).toLowerCase(),
                    identityType: values.identityType,
                    identityNo: values.identityNo,
                    npwp: values.npwp,
                })
                setSend(false)
                console.log(resp)
                navigate(-1)
            } catch (error) {
                setSend(false)
                console.log(error)
            }
        }
    })

    const GetProvinces = async () => {
        try {
            const resp = await HTTPLocProvinces()
            console.log(resp)
            setProvinces(resp.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const GetCities = async (value: string) => {
        try {
            const resp = await HTTPLocCities({ provinceId: value })
            console.log(resp)
            setCities(resp.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const renderProvinces = (values: any) => {
        if (values.length === 0) {
            return <span style={{ color: '#a7a5a6' }}>Pilih Provinsi</span>;
        }
        else {
            const result: any = Provinces.filter((value: any) => value.provinceId === ProvincesValue)
            return <span style={{ color: '#000' }}>{result[0].provinceName}</span>;
        }
    }

    const renderCities = (values: any) => {
        if (values.length === 0) {
            return <span style={{ color: '#a7a5a6' }}>Pilih Kota</span>;
        }
        else {
            const result: any = Cities.filter((value: any) => value.cityId === CitiesValue)
            return <span style={{ color: '#000' }}>{result[0].cityName}</span>;
        }
    }

    const [init, setInit] = React.useState(false)
    React.useEffect(() => {
        GetProvinces()
    }, [init])

    return (
        <form onSubmit={Formik.handleSubmit}>
            <div style={{ display: 'flex' }}>
                <NavigationBarUser title={'Form Tambah Data Pelanggan'} isChild={true} name={'Pelanggan'} idPanel={7}></NavigationBarUser>
                <Box
                    component="main"
                    sx={{ bgcolor: '#f4f5ff', p: isMobile ? 2 : 5, width: '100vw', minHeight: '100vh' }}
                >
                    <Toolbar />
                    <div style={{ flex: 1, ...CENTER }}>
                        <Stack direction={'column'} gap={3} sx={{ backgroundColor: '#fff', borderRadius: 2, border: '1px solid #cccccc', padding: '4% 3%' }}>
                            <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                                <h2 style={{ color: '#000' }}>Form Tambah Data Pelanggan</h2>
                            </Stack>
                            <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-start'} gap={isMobile ? 2 : 3}>
                                <Stack direction={'column'} gap={1}>
                                    <span>*Tipe Kontak</span>
                                    <TextField
                                        type="text"
                                        size="small"
                                        disabled
                                        defaultValue={'Pelanggan'}
                                        sx={{ bgcolor: "#f4f4f4", width: isMobile ? '40vw' : '25vw' }}
                                    />
                                </Stack>
                                <Stack direction={'column'} gap={1}>
                                    <span>*Nama Pelanggan</span>
                                    <TextField
                                        type="text"
                                        size="small"
                                        placeholder='Nama Pelanggan'
                                        name="nameCustomer"
                                        value={Formik.values.nameCustomer}
                                        onChange={Formik.handleChange}
                                        sx={{ bgcolor: "#fff", width: isMobile ? '40vw' : '25vw' }}
                                    />
                                </Stack>
                            </Stack>
                            <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-start'} gap={isMobile ? 2 : 3}>
                                <Stack direction={'column'} gap={1}>
                                    <span>Nama Panggilan</span>
                                    <TextField
                                        type="text"
                                        size="small"
                                        placeholder='Nama Panggilan'
                                        name="nameCustomerOpt"
                                        value={Formik.values.nameCustomerOpt}
                                        onChange={Formik.handleChange}
                                        sx={{ bgcolor: "#fff", width: isMobile ? '40vw' : '25vw' }}
                                    />
                                </Stack>
                                <Stack direction={'column'} gap={1}>
                                    <span>Nama Perusahaan</span>
                                    <TextField
                                        type="text"
                                        size="small"
                                        placeholder='Nama Perusahaan'
                                        name="nameCompany"
                                        value={Formik.values.nameCompany}
                                        onChange={Formik.handleChange}
                                        sx={{ bgcolor: "#fff", width: isMobile ? '40vw' : '25vw' }}
                                    />
                                </Stack>
                            </Stack>
                            <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-start'} gap={isMobile ? 2 : 3}>
                                <Stack direction={'column'} gap={1}>
                                    <span>Alamat Pelanggan</span>
                                    <TextField
                                        type="text"
                                        size="small"
                                        placeholder='Alamat'
                                        name="address"
                                        value={Formik.values.address}
                                        onChange={Formik.handleChange}
                                        sx={{ bgcolor: "#fff", width: isMobile ? '40vw' : '25vw' }}
                                    />
                                </Stack>
                                <Stack direction={'column'} gap={1}>
                                    <span>Negara</span>
                                    <TextField
                                        type="text"
                                        size="small"
                                        placeholder='Negara'
                                        name="country"
                                        value={Formik.values.country}
                                        onChange={Formik.handleChange}
                                        sx={{ bgcolor: "#fff", width: isMobile ? '40vw' : '25vw' }}
                                    />
                                </Stack>
                            </Stack>
                            <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-start'} gap={isMobile ? 2 : 3}>
                                <Stack direction={'column'} gap={1}>
                                    <span>Provinsi</span>
                                    <Select
                                        size="small"
                                        name="provinceId"
                                        value={ProvincesValue}
                                        onChange={handleChangeProvinces}
                                        displayEmpty
                                        MenuProps={{ style: { height: 500 } }}
                                        sx={{ bgcolor: "white", width: isMobile ? '40vw' : '25vw', color: '#000' }}
                                        renderValue={renderProvinces}
                                    >
                                        {
                                            Provinces.map((item: any, index: number) => (
                                                <MenuItem key={index} value={item.provinceId}>{item.provinceName}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                </Stack>
                                <Stack direction={'column'} gap={1}>
                                    <span style={{ color: ProvincesValue.length === 0 ? '#ababab' : '#000' }}>Kota</span>
                                    <Select
                                        size="small"
                                        name="cityId"
                                        disabled={ProvincesValue.length === 0}
                                        value={CitiesValue}
                                        onChange={handleChangeCities}
                                        displayEmpty
                                        MenuProps={{ style: { height: 500 } }}
                                        sx={{ bgcolor: "white", width: isMobile ? '40vw' : '25vw', color: '#000' }}
                                        renderValue={renderCities}
                                    >
                                        {
                                            Cities.map((item: any, index: number) => (
                                                <MenuItem key={index} value={item.cityId}>{item.cityName}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                </Stack>
                            </Stack>
                            <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-start'} gap={isMobile ? 2 : 3}>
                                <Stack direction={'column'} gap={1}>
                                    <span>Email</span>
                                    <TextField
                                        type="text"
                                        size="small"
                                        placeholder={'Alamat Email'}
                                        name="email"
                                        value={Formik.values.email}
                                        onChange={Formik.handleChange}
                                        sx={{ bgcolor: "#fff", width: isMobile ? '40vw' : '25vw' }}
                                    />
                                </Stack>
                                <Stack direction={'column'} gap={1}>
                                    <span>*Nomor Telepon</span>
                                    <TextField
                                        type="text"
                                        size="small"
                                        placeholder='Nomor Telepon'
                                        name="phone"
                                        value={Formik.values.phone}
                                        onChange={Formik.handleChange}
                                        sx={{ bgcolor: "#fff", width: isMobile ? '40vw' : '25vw' }}
                                    />
                                </Stack>
                            </Stack>
                            <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-start'} gap={isMobile ? 2 : 3}>
                                <Stack direction={'column'} gap={1}>
                                    <span>Tipe Kartu Identitas {'(Opsional)'}</span>
                                    <Select
                                        size="small"
                                        name="identityType"
                                        value={Formik.values.identityType}
                                        onChange={Formik.handleChange}
                                        displayEmpty
                                        sx={{ bgcolor: "white", width: isMobile ? '40vw' : '25vw', color: '#000' }}
                                        renderValue={(selected: any) => {
                                            if (selected.length === 0) {
                                                return <span style={{ color: '#a7a5a6' }}>KTP / PASPOR / SIM</span>;
                                            }
                                            return selected
                                        }}
                                    >
                                        {
                                            ['KTP', 'PASPOR', 'SIM'].map((item, index) => (
                                                <MenuItem key={index} value={item}>{item}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                </Stack>
                                <Stack direction={'column'} gap={1}>
                                    <span style={{ color: Formik.values.identityType.length === 0 ? '#ababab' : '#000' }}>Nomor Kartu Identitas {'(Opsional)'}</span>
                                    <TextField
                                        type="text"
                                        size="small"
                                        disabled={Formik.values.identityType.length === 0}
                                        placeholder='Nomor Identitas'
                                        name="identityNo"
                                        value={Formik.values.identityNo}
                                        onChange={Formik.handleChange}
                                        sx={{ bgcolor: "#fff", width: isMobile ? '40vw' : '25vw' }}
                                    />
                                </Stack>
                            </Stack>
                            <Stack direction={'column'} gap={1}>
                                <span>NPWP {'(Opsional)'}</span>
                                <TextField
                                    type="text"
                                    placeholder='NPWP'
                                    size="small"
                                    name="npwp"
                                    value={Formik.values.npwp}
                                    onChange={Formik.handleChange}
                                    sx={{ bgcolor: "#fff", width: isMobile ? '40vw' : '25vw' }}
                                />
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

export default PelangganForm;