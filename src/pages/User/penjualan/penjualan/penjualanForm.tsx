import React from 'react';
import { toast } from 'react-toastify';
import { Box, Stack, TextField, Toolbar, Select, MenuItem, SelectChangeEvent, InputAdornment, Icon } from '@mui/material';
import NavigationBarUser from '../../../../components/appBarUser';
import { CENTER } from '../../../../utils/stylesheet';
import { Colors } from '../../../../utils/colors';
import { useNavigate, useParams } from "react-router-dom";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import PelangganDialog from './pelangganDialog';
import EkspedisiDialog from './ekspedisiDialog';
import { isMobile } from 'react-device-detect';
import ProdukList from './productList';
import { HTTPGetCustomers } from '../../../../apis/User/contact/customer';
import secureLocalStorage from 'react-secure-storage';
import { HTTPGetExpeditions } from '../../../../apis/User/contact/expedition';
import { HTTPGetUnits } from '../../../../apis/User/product/units';

const PenjualanForm = () => {
    const { action }: any = useParams()
    const navigate = useNavigate()
    const token = secureLocalStorage.getItem('USER_SESSION') as string
    const [SalesData, setSalesData] = React.useState({
        customerId: '',
        invoice: `INV/${Math.floor(100000 + Math.random() * 900000)}`,
        transactionDate: null,
        dueDate: null,
        reference: '',
        shippingDate: null,
        salesType: '',
        expeditionId: '',
        shippingCostPerKg: 0,
        receipt: '',
    })
    const [init, setInit] = React.useState(false)
    const [Customers, setCustomers] = React.useState([])
    const [Expeditions, setExpeditions] = React.useState([])
    const [Units, setUnits] = React.useState([])

    const [isPelangganOpen, setPelangganOpen] = React.useState(false);
    const [isEkspedisiOpen, setEkspedisiOpen] = React.useState(false);

    const handleInput = (event: any, key: any) => {
        if (key === 'shippingCostPerKg') {
            if (!isNaN(event.target.value)) {
                setSalesData({
                    ...SalesData,
                    shippingCostPerKg: event.target.value.length === 0 ? 0 : parseInt(event.target.value)
                })
            }
        } else {
            setSalesData({
                ...SalesData,
                [key]: key === 'transactionDate' || key === 'dueDate' || key === 'shippingDate' ? event : event.target.value
            })
        }
    }

    const AddPelanggan = () => navigate('/kontak/pelanggan/form-pelanggan')
    const AddEkspedisi = () => navigate('/kontak/ekspedisi/form-ekspedisi')

    const getCustomer = async () => {
        try {
            const resp = await HTTPGetCustomers({ limit: '50', page: '1', q: undefined, token: token })
            let newArr = resp.data.data
            newArr.unshift({})
            setCustomers(newArr)
        } catch (error: any) {
            console.log(error)
            if (error.status === 500) {
                toast.error('Server sedang mengalami gangguan!')
            } else {
                toast.error('Terjadi Kesalahan!')
            }
        }
    }

    const getExpedition = async () => {
        try {
            const resp = await HTTPGetExpeditions({ limit: '50', page: '1', q: undefined, token: token })
            let newArr = resp.data.data
            newArr.unshift({})
            setExpeditions(newArr)
        } catch (error: any) {
            console.log(error)
            if (error.status === 500) {
                toast.error('Server sedang mengalami gangguan!')
            } else {
                toast.error('Terjadi Kesalahan!')
            }
        }
    }

    const getProducts = async () => {
        try {
            const resp = await HTTPGetUnits({ limit: '50', page: '1', q: '', token: token as string })
            setUnits(resp.data.data)
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
            await getCustomer()
            await getExpedition()
            await getProducts()
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

    const renderCustomer = (values: any) => {
        if (values.length === 0) {
            return <span style={{ color: '#a7a5a6' }}>Pilih Pelanggan</span>;
        } else {
            const result: any = Customers.filter((value: any) => value.id === SalesData.customerId)
            return <span style={{ color: '#000' }}>{result[0].nameCustomer}</span>;
        }
    }

    const renderExpedition = (values: any) => {
        if (values.length === 0) {
            return <span style={{ color: '#a7a5a6' }}>Pilih Ekspedisi</span>;
        } else {
            const result: any = Expeditions.filter((value: any) => value.id === SalesData.expeditionId)
            return <span style={{ color: '#000' }}>{result[0].nameExpedition}</span>;
        }
    }

    return (
        <div style={{ display: 'flex' }}>
            <NavigationBarUser title={'Form Tambah Data Penjualan'} isChild={true} name={'Penjualan'} idPanel={3}></NavigationBarUser>
            <Box
                component="main"
                sx={{ bgcolor: '#f4f5ff', p: isMobile ? 2 : 5, width: '100vw', minHeight: '100vh' }}
            >
                <Toolbar />
                <div style={{ flex: 1, ...CENTER }}>
                    <Stack direction={'column'} gap={3} sx={{ backgroundColor: '#fff', borderRadius: 2, border: '1px solid #cccccc', padding: '4% 3%', width: '58vw' }}>
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                            <h2 style={{ color: '#000' }}>Form Tambah Penjualan</h2>
                            {
                                action === 'update' ?
                                    <div style={{ backgroundColor: Colors.warning, height: 40, width: 40, ...CENTER, borderRadius: 10 }}>
                                        <Icon style={{ color: '#fff', fontSize: 20 }}>border_color</Icon>
                                    </div>
                                    :
                                    null
                            }
                        </Stack>
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} gap={isMobile ? 2 : 3}>
                            <Stack direction={'column'} gap={1}>
                                <span>*Pelanggan</span>
                                <Select
                                    size="medium"
                                    value={SalesData.customerId}
                                    onChange={(e) => handleInput(e, 'customerId')}
                                    displayEmpty
                                    sx={{ bgcolor: "white", width: isMobile ? '40vw' : '25vw', color: '#000', }}
                                    MenuProps={{ style: { height: 300 } }}
                                    renderValue={renderCustomer}
                                >
                                    {
                                        Customers.map((item: any, index: number) => (
                                            <MenuItem key={index} value={index === 0 ? '' : item.id}>
                                                {
                                                    index === 0 ?
                                                        <div onClick={AddPelanggan} style={{ ...CENTER, padding: '7px 0px', border: `1px solid #000`, borderRadius: 5, cursor: 'pointer', alignSelf: 'flex-start', width: '100%' }}>
                                                            <span style={{ color: '#000', fontSize: 13 }}>+ Tambah Data Pelanggan</span>
                                                        </div>
                                                        :
                                                        <span>{item.nameCustomer}</span>
                                                }
                                            </MenuItem>
                                        ))
                                    }
                                </Select>
                            </Stack>
                            <Stack direction={'column'} gap={1}>
                                <span>Nomor Invoice</span>
                                <TextField
                                    type="text"
                                    size="medium"
                                    disabled
                                    placeholder='Invoice'
                                    value={SalesData.invoice}
                                    sx={{ bgcolor: "#f4f4f4", width: isMobile ? '40vw' : '25vw' }}
                                />
                            </Stack>
                        </Stack>
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} gap={isMobile ? 2 : 3}>
                            <Stack direction={'column'} gap={1}>
                                <span>*Tanggal Transaksi</span>
                                <DatePicker
                                    value={SalesData.transactionDate}
                                    onChange={(e) => handleInput(e, 'transactionDate')}
                                    sx={{ bgcolor: "white", borderRadius: 1, width: isMobile ? '40vw' : '25vw' }}
                                />
                            </Stack>
                            <Stack direction={'column'} gap={1}>
                                <span>*Jatuh Tempo</span>
                                <DatePicker
                                    value={SalesData.dueDate}
                                    onChange={(e) => handleInput(e, 'dueDate')}
                                    sx={{ bgcolor: "white", borderRadius: 1, width: isMobile ? '40vw' : '25vw' }}
                                />
                            </Stack>
                        </Stack>
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} gap={isMobile ? 2 : 3}>
                            <Stack direction={'column'} gap={1}>
                                <span>Referensi</span>
                                <TextField
                                    type="text"
                                    size="medium"
                                    placeholder='Referensi'
                                    value={SalesData.reference}
                                    onChange={(e) => handleInput(e, 'reference')}
                                    sx={{ bgcolor: "#fff", width: isMobile ? '40vw' : '25vw' }}
                                />
                            </Stack>
                            <Stack direction={'column'} gap={1}>
                                <span>*Tanggal Pengiriman</span>
                                <DatePicker
                                    value={SalesData.shippingDate}
                                    onChange={(e) => handleInput(e, 'shippingDate')}
                                    sx={{ bgcolor: "white", borderRadius: 1, width: isMobile ? '40vw' : '25vw' }}
                                />
                            </Stack>
                        </Stack>
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} gap={isMobile ? 2 : 3}>
                            <Stack direction={'column'} gap={1}>
                                <span>*Jenis Penjualan</span>
                                <Select
                                    size="medium"
                                    value={SalesData.salesType}
                                    onChange={(e) => handleInput(e, 'salesType')}
                                    displayEmpty
                                    sx={{ bgcolor: "white", width: isMobile ? '40vw' : '25vw', color: '#000' }}
                                    renderValue={(selected: any) => {
                                        if (selected.length === 0) {
                                            return <span style={{ color: '#a7a5a6' }}>Retail / Besar</span>;
                                        }
                                        return selected === 'Large' ? 'Besar' : selected
                                    }}
                                >
                                    {
                                        ['Retail', 'Large'].map((item, index) => (
                                            <MenuItem key={index} value={item}>{item === 'Large' ? 'Besar' : item}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </Stack>
                            <Stack direction={'column'} gap={1}>
                                <span>Ekspedisi</span>
                                <Select
                                    size="medium"
                                    value={SalesData.expeditionId}
                                    onChange={(e) => handleInput(e, 'expeditionId')}
                                    displayEmpty
                                    sx={{ bgcolor: "white", width: isMobile ? '40vw' : '25vw', color: '#000' }}
                                    MenuProps={{ style: { height: 300 } }}
                                    renderValue={renderExpedition}
                                >
                                    {
                                        Expeditions.map((item: any, index: number) => (
                                            <MenuItem key={index} value={index === 0 ? '' : item.id}>
                                                {
                                                    index === 0 ?
                                                        <div onClick={AddEkspedisi} style={{ ...CENTER, padding: '7px 0px', border: `1px solid #000`, borderRadius: 5, cursor: 'pointer', alignSelf: 'flex-start', width: '100%' }}>
                                                            <span style={{ color: '#000', fontSize: 13 }}>+ Tambah Data Ekspedisi</span>
                                                        </div>
                                                        :
                                                        <span>{item.nameExpedition}</span>
                                                }
                                            </MenuItem>
                                        ))
                                    }
                                </Select>
                            </Stack>
                        </Stack>
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} gap={isMobile ? 2 : 3}>
                            <Stack direction={'column'} gap={1}>
                                <span>Harga Ongkir</span>
                                <TextField
                                    type="text"
                                    size="medium"
                                    placeholder='0'
                                    value={SalesData.shippingCostPerKg}
                                    onChange={(e) => handleInput(e, 'shippingCostPerKg')}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position='end'>
                                                <span>/ Kg</span>
                                            </InputAdornment>
                                        )
                                    }}
                                    sx={{ bgcolor: "#fff", width: isMobile ? '40vw' : '25vw' }}
                                />
                            </Stack>
                            <Stack direction={'column'} gap={1}>
                                <span>No. Resi</span>
                                <TextField
                                    type="text"
                                    size="medium"
                                    value={SalesData.receipt}
                                    onChange={(e) => handleInput(e, 'receipt')}
                                    placeholder='No. Resi diisi setelah mendapatkan Resi dari Ekspedisi'
                                    sx={{ bgcolor: "#fff", width: isMobile ? '40vw' : '25vw' }}
                                />
                            </Stack>
                        </Stack>
                        {/* ///////////////////////////////////////// */}
                        <h2 style={{ color: '#000' }}>Data Produk</h2>
                        <ProdukList data={SalesData} products={Units} />
                    </Stack>
                </div>
            </Box>
            <PelangganDialog isOpen={isPelangganOpen} setOpen={() => setPelangganOpen(false)} />
            <EkspedisiDialog isOpen={isEkspedisiOpen} setOpen={() => setEkspedisiOpen(false)} />
        </div>
    )
}

export default PenjualanForm;