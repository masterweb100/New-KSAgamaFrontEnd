import React from 'react';
import { Box, Stack, TextField, Icon, Toolbar, Select, MenuItem, SelectChangeEvent, InputAdornment, Tooltip, IconButton } from '@mui/material';
import NavigationBarUser from '../../../../components/appBarUser';
import { CENTER } from '../../../../utils/stylesheet';
import { Colors } from '../../../../utils/colors';
import { useNavigate, useParams } from "react-router-dom";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import SupplierDialog from './supplierDialog';
import { isMobile } from 'react-device-detect';
import ProdukList from './produkList';
import { HTTPGeneratePurchaseID } from '../../../../apis/User/purchase/purchase';
import { HTTPGetSuppliers } from '../../../../apis/User/contact/supplier';
import secureLocalStorage from 'react-secure-storage';
import { HTTPGetExpeditions } from '../../../../apis/User/contact/expedition';
import { HTTPGetUnits } from '../../../../apis/User/product/units';
import { HTTPGetBrands } from '../../../../apis/User/product/brand';

const PembelianForm = () => {
    const navigate = useNavigate()
    const token = secureLocalStorage.getItem('TOKEN') as string
    const { action }: any = useParams()
    const [isSupplierOpen, setSupplierOpen] = React.useState(false);
    const [CategoryName, setCategoryName] = React.useState('')
    const [PurchaseData, setPurchaseData] = React.useState({
        genId: `SKU/${Math.floor(100000 + Math.random() * 900000)}`,
        supplierId: '',
        productBrandId: '',
        transactionDate: null,
        dueDate: null,
        shippingCostPerKg: '',
    })
    const [init, setInit] = React.useState(false)
    const [Suppliers, setSuppliers] = React.useState([])
    const [Brands, setBrands] = React.useState([])
    const [Units, setUnits] = React.useState([])

    const GoBack = () => {
        navigate(-1)
    }

    const AddSupplier = () => navigate('/kontak/supplier/form-supplier')
    const GenId = async () => {
        try {
            const resp = await HTTPGeneratePurchaseID()
            setPurchaseData({ ...PurchaseData, genId: resp.data.data.genId })
        } catch (error) {
            console.log(error)
        }
    }

    const handleInput = (event: any, key: any) => {
        setPurchaseData({
            ...PurchaseData,
            [key]: key === 'transactionDate' || key === 'dueDate' ? event : event.target.value
        })
    }

    const handleBrand = (event: any) => {
        setPurchaseData({ ...PurchaseData, productBrandId: event.target.value })
        const result: any = Brands.filter((value: any) => value.id === event.target.value)
        setCategoryName(result[0].productCategoryName)
    }

    const getSupplier = async () => {
        try {
            const resp = await HTTPGetSuppliers({ limit: '50', page: '1', q: undefined, token: token })
            let newArr = resp.data.data
            newArr.unshift({})
            setSuppliers(newArr)
        } catch (error) {
            console.log(error)
        }
    }

    const getBrand = async () => {
        try {
            const resp = await HTTPGetBrands({ limit: '50', page: '1', q: undefined, token: token })
            setBrands(resp.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const getProducts = async () => {
        try {
            const resp = await HTTPGetUnits({ limit: '50', page: '1', q: '', token: token as string })
            setUnits(resp.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const Initial = async () => {
        try {
            // await GenId()
            await getSupplier()
            await getBrand()
            await getProducts()
        } catch (error) {
            console.log(error)
        }
    }

    React.useEffect(() => { Initial() }, [init])

    const renderSupplier = (values: any) => {
        if (values.length === 0) {
            return <span style={{ color: '#a7a5a6' }}>Pilih Supplier</span>;
        } else {
            const result: any = Suppliers.filter((value: any) => value.id === PurchaseData.supplierId)
            return <span style={{ color: '#000' }}>{result[0].nameSupplier}</span>;
        }
    }

    const renderBrand = (values: any) => {
        if (values.length === 0) {
            return <span style={{ color: '#a7a5a6' }}>Pilih Brand</span>;
        } else {
            const result: any = Brands.filter((value: any) => value.id === PurchaseData.productBrandId)
            return <span style={{ color: '#000' }}>{result[0].brandName}</span>;
        }
    }

    return (
        <div style={{ display: 'flex' }}>
            <NavigationBarUser title={'Form SKU Pembelian'} isChild={true} name={'Pembelian'} idPanel={4}></NavigationBarUser>
            <Box
                component="main"
                sx={{ bgcolor: '#f4f5ff', p: isMobile ? 2 : 5, width: '100vw', minHeight: '100vh' }}
            >
                <Toolbar />
                <div style={{ flex: 1, ...CENTER }}>
                    <Stack direction={'column'} gap={3} sx={{ backgroundColor: '#fff', borderRadius: 2, border: '1px solid #cccccc', padding: '4% 3%' }}>
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                            <h2 style={{ color: '#000' }}>Form Tambah Tagihan</h2>
                            {
                                action === 'update' ?
                                    <div style={{ backgroundColor: Colors.warning, height: 40, width: 40, ...CENTER, borderRadius: 10 }}>
                                        <Icon style={{ color: '#fff', fontSize: 20 }}>border_color</Icon>
                                    </div>
                                    :
                                    null
                            }
                        </Stack>
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-start'} gap={isMobile ? 2 : 3}>
                            <Stack direction={'column'} gap={1}>
                                <span>*Supplier</span>
                                <Select
                                    size="medium"
                                    displayEmpty
                                    sx={{ bgcolor: "white", width: isMobile ? '40vw' : '25vw', color: '#000', }}
                                    value={PurchaseData.supplierId}
                                    onChange={(e) => handleInput(e, 'supplierId')}
                                    MenuProps={{ style: { height: 300 } }}
                                    renderValue={renderSupplier}
                                >
                                    {
                                        Suppliers.map((item: any, index: number) => (
                                            <MenuItem key={index} value={index === 0 ? '' : item.id}>
                                                {
                                                    index === 0 ?
                                                        <div onClick={AddSupplier} style={{ ...CENTER, padding: '7px 0px', border: `1px solid #000`, borderRadius: 5, cursor: 'pointer', alignSelf: 'flex-start', width: '100%' }}>
                                                            <span style={{ color: '#000', fontSize: 13 }}>+ Tambah Data Supplier</span>
                                                        </div>
                                                        :
                                                        <span>{item.nameSupplier}</span>
                                                }
                                            </MenuItem>
                                        ))
                                    }
                                </Select>
                            </Stack>
                            <Stack direction={'column'} gap={1}>
                                <span>ID SKU Pembelian</span>
                                <TextField
                                    type="text"
                                    size="medium"
                                    disabled
                                    value={PurchaseData.genId}
                                    sx={{ bgcolor: "#f4f4f4", width: isMobile ? '40vw' : '25vw' }}
                                    InputProps={{
                                        endAdornment: (
                                            action === 'update' ?
                                                null
                                                :
                                                <Tooltip title="Regenerate ID">
                                                    <IconButton onClick={GenId}>
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
                                <span>*Nama Brand</span>
                                <Select
                                    size="medium"
                                    value={PurchaseData.productBrandId}
                                    onChange={handleBrand}
                                    displayEmpty
                                    sx={{ bgcolor: "white", width: isMobile ? '40vw' : '25vw', color: '#000' }}
                                    MenuProps={{ style: { height: 300 } }}
                                    renderValue={renderBrand}
                                >
                                    {
                                        Brands.map((item: any, index: number) => (
                                            <MenuItem key={index} value={item.id}>{item.brandName}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </Stack>
                            <Stack direction={'column'} gap={1}>
                                <span>Kategori</span>
                                <TextField
                                    type="text"
                                    size="medium"
                                    disabled
                                    placeholder='Kategori'
                                    value={CategoryName}
                                    sx={{ bgcolor: "#f4f4f4", width: isMobile ? '40vw' : '25vw' }}
                                />
                            </Stack>
                        </Stack>
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-start'} gap={isMobile ? 2 : 3}>
                            <Stack direction={'column'} gap={1}>
                                <span>*Tanggal Transaksi</span>
                                <DatePicker
                                    value={PurchaseData.transactionDate}
                                    onChange={(e) => handleInput(e, 'transactionDate')}
                                    sx={{ bgcolor: "white", borderRadius: 1, width: isMobile ? '40vw' : '25vw' }}
                                />
                            </Stack>
                            <Stack direction={'column'} gap={1}>
                                <span>*Jatuh Tempo</span>
                                <DatePicker
                                    value={PurchaseData.dueDate}
                                    onChange={(e) => handleInput(e, 'dueDate')}
                                    sx={{ bgcolor: "white", borderRadius: 1, width: isMobile ? '40vw' : '25vw' }}
                                />
                            </Stack>
                        </Stack>
                        <Stack direction={'column'} gap={1}>
                            <span>Harga Ongkir</span>
                            <TextField
                                type="text"
                                size="medium"
                                placeholder='0'
                                value={PurchaseData.shippingCostPerKg}
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
                        {/* ///////////////////////////////////////// */}
                        <h2 style={{ color: '#000', margin: 0 }}>Data Produk</h2>
                        <ProdukList data={PurchaseData} products={Units} />
                    </Stack>
                </div>
            </Box>
            <SupplierDialog isOpen={isSupplierOpen} setOpen={() => setSupplierOpen(false)} />
        </div>
    )
}

export default PembelianForm;