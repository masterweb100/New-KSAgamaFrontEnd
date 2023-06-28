import React from 'react';
import { toast } from 'react-toastify';
import { Box, Stack, TextField, Icon, Toolbar, Select, MenuItem, SelectChangeEvent, InputAdornment, Tooltip, IconButton, CircularProgress } from '@mui/material';
import NavigationBarUser from '../../../../components/appBarUser';
import { CENTER } from '../../../../utils/stylesheet';
import { Colors } from '../../../../utils/colors';
import { useNavigate, useParams } from "react-router-dom";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import SupplierDialog from './supplierDialog';
import { isMobile } from 'react-device-detect';
import { ProdukList, PrintProdukList } from './produkList';
import { HTTPGeneratePurchaseID, HTTPGetPurchasesByID } from '../../../../apis/User/purchase/purchase';
import { HTTPGetSuppliers } from '../../../../apis/User/contact/supplier';
import secureLocalStorage from 'react-secure-storage';
import { HTTPGetExpeditions } from '../../../../apis/User/contact/expedition';
import { HTTPGetUnits, HTTPGetUnitsByParent } from '../../../../apis/User/product/units';
import { HTTPGetBrands } from '../../../../apis/User/product/brand';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../stores/rootReducer';
import moment from 'moment';
import ReactToPrint from 'react-to-print';

const PembelianForm = () => {
    const navigate = useNavigate()
    const PurchaseRedux = useSelector((state: RootState) => state.purchasesData.data)
    const token = secureLocalStorage.getItem('USER_SESSION') as string
    const { action }: any = useParams()
    const [isSupplierOpen, setSupplierOpen] = React.useState(false);
    const [CategoryName, setCategoryName] = React.useState('')
    const [PurchaseData, setPurchaseData] = React.useState({
        genId: `SKU/${Math.floor(100000 + Math.random() * 900000)}`,
        supplierId: '',
        productBrandId: '',
        transactionDate: null,
        dueDate: null,
        shippingCostPerKg: 0,
    })
    const [init, setInit] = React.useState(false)
    const [Suppliers, setSuppliers] = React.useState([])
    const [Brands, setBrands] = React.useState([])
    const [Units, setUnits] = React.useState([])
    const [loader, setLoader] = React.useState(false)

    const GoBack = () => {
        navigate(-1)
    }

    const AddSupplier = () => navigate('/kontak/supplier/form-supplier')
    const GenId = async () => {
        try {
            const resp = await HTTPGeneratePurchaseID()
            setPurchaseData({ ...PurchaseData, genId: resp.data.data.genId })
        } catch (error: any) {
            console.log(error)
            if (error.status === 500) {
                toast.error('Server sedang mengalami gangguan!')
            } else {
                toast.error('Terjadi Kesalahan!')
            }
        }
    }

    const handleInput = (event: any, key: any) => {
        if (key === 'shippingCostPerKg') {
            if (!isNaN(event.target.value)) {
                setPurchaseData({
                    ...PurchaseData,
                    shippingCostPerKg: event.target.value.length === 0 ? 0 : parseInt(event.target.value)
                })
            }
        } else {
            setPurchaseData({
                ...PurchaseData,
                [key]: key === 'transactionDate' || key === 'dueDate' ? event : event.target.value
            })
        }
    }

    const handleBrand = (event: any) => {
        setPurchaseData({ ...PurchaseData, productBrandId: event.target.value })
        const result: any = Brands.filter((value: any) => value.id === event.target.value)
        setCategoryName(result[0].productCategoryName)
        getProducts(result[0].productCategoryId)
    }

    const getSupplier = async () => {
        try {
            const resp = await HTTPGetSuppliers({ limit: '50', page: '1', q: undefined, token: token })
            let newArr = resp.data.data
            newArr.unshift({})
            setSuppliers(newArr)
        } catch (error: any) {
            console.log(error)
            if (error.status === 500) {
                toast.error('Server sedang mengalami gangguan!')
            } else {
                toast.error('Terjadi Kesalahan!')
            }
        }
    }

    const getBrand = async () => {
        try {
            const resp = await HTTPGetBrands({ limit: '50', page: '1', q: undefined, token: token })
            setBrands(resp.data.data)
        } catch (error: any) {
            console.log(error)
            if (error.status === 500) {
                toast.error('Server sedang mengalami gangguan!')
            } else {
                toast.error('Terjadi Kesalahan!')
            }
        }
    }

    const getProducts = async (id: any) => {
        try {
            const resp = await HTTPGetUnitsByParent({ id: id, token: token as string })
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
        setLoader(true)
        try {
            await getSupplier()
            await getBrand()
            if (action === 'print') {
                await InitPrint()
            }
            setLoader(false)
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

    const InitPrint = async () => {
        try {
            const resp = await HTTPGetPurchasesByID({
                token: token,
                id: PurchaseRedux.id
            })
            setPurchaseData(resp.data.data)
        } catch (error: any) {
            if (error.status === 500) {
                toast.error('Server sedang mengalami gangguan!')
            } else {
                toast.error('Terjadi Kesalahan!')
            }
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

    const componentRef: any = React.useRef(null);
    const onBeforeGetContentResolve: any = React.useRef(null);
    const [loading, setLoading] = React.useState(false);
    const [onPrint, setPrint] = React.useState(false)

    const reactToPrintContent = React.useCallback(() => {
        return componentRef.current;
    }, [componentRef.current]);

    const handleAfterPrint = React.useCallback(() => {
        setPrint(false)
    }, []);

    const handleBeforePrint = React.useCallback(() => {
        setPrint(true)
    }, []);

    const handleOnBeforeGetContent = React.useCallback(() => {
        setPrint(true)
        setLoading(true);
        return new Promise<void>((resolve) => {
            onBeforeGetContentResolve.current = resolve;
            setTimeout(() => {
                setLoading(false);
                resolve();
            }, 2000);
        });
    }, [setLoading]);

    React.useEffect(() => {
        if (typeof onBeforeGetContentResolve.current === "function") {
            onBeforeGetContentResolve.current();
        }
    }, [onBeforeGetContentResolve.current]);

    const PrintButton = React.useCallback(() => {
        return (
            <div style={{ ...CENTER, backgroundColor: Colors.error, borderRadius: 5, cursor: 'pointer', padding: isMobile ? '10px 6px' : 10, color: '#fff' }}>
                <Stack direction={'row'} spacing={1} alignItems={'center'}>
                    <Icon sx={{ color: '#fff' }} fontSize="small">file_download</Icon>
                    <span style={{ color: '#fff', fontSize: 13, fontWeight: '600' }}>Export</span>
                </Stack>
            </div>
        )
    }, [])

    return (
        <div style={{ display: 'flex' }}>
            <NavigationBarUser title={'Form SKU Pembelian'} isChild={true} name={'Pembelian'} idPanel={4}></NavigationBarUser>
            <Box
                component="main"
                sx={{ bgcolor: '#f4f5ff', p: isMobile ? 2 : 5, width: '100vw', minHeight: '100vh' }}
            >
                <Toolbar />
                <div ref={componentRef} style={{ flex: 1, ...CENTER }}>
                    <Stack direction={'column'} gap={3} sx={{ backgroundColor: '#fff', borderRadius: 2, border: '1px solid #cccccc', padding: '4% 3%' }}>
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                            <Stack direction={'row'} alignItems={'center'} spacing={2}>
                                <h2 style={{ color: '#000' }}>Form Tambah Pembelian</h2>
                                {
                                    loader ?
                                        <Stack direction={'row'} alignItems={'center'} spacing={1}>
                                            <CircularProgress size={20}></CircularProgress>
                                            <h5 style={{ color: '#000' }}>Loading</h5>
                                        </Stack>
                                        :
                                        null
                                }
                            </Stack>
                            {
                                action === 'print' && !onPrint ?
                                    <ReactToPrint
                                        content={reactToPrintContent}
                                        documentTitle={PurchaseRedux.genId + '_' + moment().format('YYYY-MM-DD')}
                                        onAfterPrint={handleAfterPrint}
                                        onBeforeGetContent={handleOnBeforeGetContent}
                                        onBeforePrint={handleBeforePrint}
                                        removeAfterPrint
                                        trigger={PrintButton}
                                    />
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
                                    inputProps={{
                                        readOnly: action === 'print',
                                    }}
                                    sx={{ bgcolor: "white", width: isMobile ? '40vw' : onPrint ? '45vw' : '25vw', color: '#000', }}
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
                                    sx={{ bgcolor: "#f4f4f4", width: isMobile ? '40vw' : onPrint ? '45vw' : '25vw' }}
                                    InputProps={{
                                        readOnly: action === 'print',
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
                                    inputProps={{
                                        readOnly: action === 'print',
                                    }}
                                    value={PurchaseData.productBrandId}
                                    onChange={handleBrand}
                                    displayEmpty
                                    sx={{ bgcolor: "white", width: isMobile ? '40vw' : onPrint ? '45vw' : '25vw', color: '#000' }}
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
                                    disabled={action !== 'print'}
                                    placeholder='Kategori'
                                    value={CategoryName}
                                    sx={{ bgcolor: action === 'print' ? '#fff' : "#f4f4f4", width: isMobile ? '40vw' : onPrint ? '45vw' : '25vw' }}
                                />
                            </Stack>
                        </Stack>
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-start'} gap={isMobile ? 2 : 3}>
                            <Stack direction={'column'} gap={1}>
                                <span>*Tanggal Transaksi</span>
                                {
                                    action === 'print' ?
                                        <TextField
                                            type="text"
                                            size="medium"
                                            disabled={action !== 'print'}
                                            placeholder='YYYY/MM/DD'
                                            InputProps={{
                                                readOnly: action === 'print',
                                            }}
                                            value={moment(PurchaseData.transactionDate).format('YYYY/MM/DD')}
                                            sx={{ bgcolor: action === 'print' ? '#fff' : "#f4f4f4", width: isMobile ? '40vw' : onPrint ? '45vw' : '25vw' }}
                                        />
                                        :
                                        <DatePicker
                                            value={PurchaseData.transactionDate}
                                            onChange={(e) => handleInput(e, 'transactionDate')}
                                            sx={{ bgcolor: "white", borderRadius: 1, width: isMobile ? '40vw' : onPrint ? '45vw' : '25vw' }}
                                        />
                                }
                            </Stack>
                            <Stack direction={'column'} gap={1}>
                                <span>*Jatuh Tempo</span>
                                {
                                    action === 'print' ?
                                        <TextField
                                            type="text"
                                            size="medium"
                                            disabled={action !== 'print'}
                                            placeholder='YYYY/MM/DD'
                                            InputProps={{
                                                readOnly: action === 'print',
                                            }}
                                            value={moment(PurchaseData.dueDate).format('YYYY/MM/DD')}
                                            sx={{ bgcolor: action === 'print' ? '#fff' : "#f4f4f4", width: isMobile ? '40vw' : onPrint ? '45vw' : '25vw' }}
                                        />
                                        :
                                        <DatePicker
                                            value={PurchaseData.dueDate}
                                            onChange={(e) => handleInput(e, 'dueDate')}
                                            sx={{ bgcolor: "white", borderRadius: 1, width: isMobile ? '40vw' : onPrint ? '45vw' : '25vw' }}
                                        />
                                }
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
                                    readOnly: action === 'print',
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            <span>/ Kg</span>
                                        </InputAdornment>
                                    )
                                }}
                                sx={{ bgcolor: "#fff", width: isMobile ? '40vw' : onPrint ? '45vw' : '25vw' }}
                            />
                        </Stack>
                        {/* ///////////////////////////////////////// */}
                        <h2 style={{ color: '#000', margin: 0 }}>Data Produk</h2>
                        {
                            action === 'print' ?
                                <PrintProdukList data={PurchaseData} onPrint={onPrint}></PrintProdukList>
                                :
                                <ProdukList data={PurchaseData} products={Units} />
                        }
                    </Stack>
                </div>
            </Box>
            <SupplierDialog isOpen={isSupplierOpen} setOpen={() => setSupplierOpen(false)} />
        </div>
    )
}

export default PembelianForm;