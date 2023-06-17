import React from 'react';
import { Box, Stack, TextField, Toolbar, Select, MenuItem, SelectChangeEvent, Icon, CircularProgress } from '@mui/material';
import NavigationBarUser from '../../../../components/appBarUser';
import { CENTER } from '../../../../utils/stylesheet';
import { Colors } from '../../../../utils/colors';
import { useNavigate, useParams } from "react-router-dom";
import { isMobile } from 'react-device-detect';
import secureLocalStorage from 'react-secure-storage';
import { HTTPGetSales } from '../../../../apis/User/sales/sales';
import { HTTPAddReturn, HTTPGetReturnBySaleID } from '../../../../apis/User/sales/return';

const ReturnPenjualanForm = () => {
    const navigate = useNavigate()
    const { action }: any = useParams()
    const token = secureLocalStorage.getItem('TOKEN') as string
    const [init, setInit] = React.useState(false)
    const [loader, setLoader] = React.useState(false)
    const [SalesData, setSalesData] = React.useState([])
    const [ProductData, setProductData] = React.useState([])
    const [SelectedId, setSelectedId] = React.useState<any>({})
    const [SelectedProduct, setSelectedProduct] = React.useState<any>({})
    const [ReturnData, setReturnData] = React.useState({
        saleId: '',
        saleProductId: '',
        qtyReturn: '',
        saleReturnStatus: ''
    })

    const GoBack = () => {
        navigate(-1)
    }

    const handleInput = async (event: any, key: any) => {
        if (key === 'saleId') {
            setProductData([])
            setSelectedProduct({})
            setReturnData({
                ...ReturnData,
                saleId: event.target.value,
                saleProductId: ''
            })
            const result: any = SalesData.filter((value: any) => value.id === event.target.value)
            setSelectedId(result[0])
            await GetProducts(event.target.value)
        } else if (key === 'saleProductId') {
            setReturnData({
                ...ReturnData,
                saleProductId: event.target.value
            })
            const result: any = ProductData.filter((value: any) => value.id === event.target.value)
            setSelectedProduct(result[0])
        } else {
            setReturnData({
                ...ReturnData,
                [key]: event.target.value
            })
        }
    }

    const GetProducts = async (id: string) => {
        try {
            const response = await HTTPGetReturnBySaleID({
                token: token,
                saleId: id
            })
            setProductData(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const GetSalesTable = async () => {
        try {
            const response = await HTTPGetSales({
                token: token,
                limit: '50',
                page: '1',
                q: undefined,
            });
            setSalesData(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    React.useEffect(() => {
        GetSalesTable();
    }, [init]);

    const renderInvoice = (values: any) => {
        if (values.length === 0) {
            return <span style={{ color: '#a7a5a6' }}>Pilih Invoice</span>;
        } else {
            const result: any = SalesData.filter((value: any) => value.id === ReturnData.saleId)
            return <span style={{ color: '#000' }}>{result[0].invoice}</span>;
        }
    }

    const renderProduct = (values: any) => {
        if (values.length === 0) {
            return <span style={{ color: '#a7a5a6' }}>Pilih Product</span>;
        } else {
            const result: any = ProductData.filter((value: any) => value.id === ReturnData.saleProductId)
            return <span style={{ color: '#000' }}>{result[0].productTypeName}</span>;
        }
    }

    const handleSubmit = async () => {
        setLoader(true)
        try {
            await HTTPAddReturn({
                qtyReturn: parseInt(ReturnData.qtyReturn),
                saleId: ReturnData.saleId,
                saleProductId: parseInt(ReturnData.saleProductId),
                saleReturnStatus: ReturnData.saleReturnStatus.toUpperCase(),
                token: token
            })
            GoBack()
            setLoader(false)
        } catch (error) {
            setLoader(false)
            console.log(error)
        }
    }

    return (
        <div style={{ display: 'flex' }}>
            <NavigationBarUser title={'Form Return Penjualan'} isChild={true} name={'Return Penjualan'} idPanel={3}></NavigationBarUser>
            <Box
                component="main"
                sx={{ bgcolor: '#f4f5ff', p: isMobile ? 2 : 5, width: '100vw', minHeight: '100vh' }}
            >
                <Toolbar />
                <div style={{ flex: 1, ...CENTER }}>
                    <Stack direction={'column'} gap={3} sx={{ backgroundColor: '#fff', borderRadius: 2, border: '1px solid #cccccc', padding: '4% 3%' }}>
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                            <h2 style={{ color: '#000' }}>Form Tambah Data Return</h2>
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
                                <span>ID Invoice</span>
                                <Select
                                    size="small"
                                    displayEmpty
                                    sx={{ bgcolor: "white", width: isMobile ? '40vw' : '25vw', color: '#000' }}
                                    value={ReturnData.saleId}
                                    onChange={(e) => handleInput(e, 'saleId')}
                                    renderValue={renderInvoice}
                                >
                                    {
                                        SalesData.map((item: any, index: number) => (
                                            <MenuItem key={index} value={item.id}>{item.invoice}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </Stack>
                            <Stack direction={'column'} gap={1}>
                                <span>Nama Pelanggan</span>
                                <TextField
                                    type="text"
                                    size="small"
                                    disabled
                                    placeholder="Nama Pelanggan"
                                    value={SelectedId.customerName === null ? '' : SelectedId.customerName}
                                    sx={{ bgcolor: "#fff", width: isMobile ? '40vw' : '25vw' }}
                                />
                            </Stack>
                        </Stack>
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-start'} gap={isMobile ? 2 : 3}>
                            <Stack direction={'column'} gap={1}>
                                <span>Nama Product</span>
                                <Select
                                    size="small"
                                    displayEmpty
                                    disabled={ReturnData.saleId.length === 0}
                                    sx={{ bgcolor: "white", width: isMobile ? '40vw' : '25vw', color: '#000' }}
                                    value={ReturnData.saleProductId}
                                    onChange={(e) => handleInput(e, 'saleProductId')}
                                    renderValue={renderProduct}
                                >
                                    {
                                        ProductData.map((item: any, index: number) => (
                                            <MenuItem key={index} value={item.id}>{item.productTypeName}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </Stack>
                            <Stack direction={'column'} gap={1}>
                                <span>Jenis Barang</span>
                                <TextField
                                    type="text"
                                    size="small"
                                    disabled
                                    placeholder='Jenis Barang'
                                    value={SelectedProduct.productTypeName === null ? '' : SelectedProduct.productTypeName}
                                    sx={{ bgcolor: "#fff", width: isMobile ? '40vw' : '25vw' }}
                                />
                            </Stack>
                        </Stack>
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-start'} gap={isMobile ? 2 : 3}>
                            <Stack direction={'column'} gap={1}>
                                <span>Jumlah Barang</span>
                                <TextField
                                    type="text"
                                    size="small"
                                    disabled
                                    placeholder='Jumlah Barang'
                                    value={SelectedProduct.qty === null ? '' : SelectedProduct.qty}
                                    sx={{ bgcolor: "#fff", width: isMobile ? '40vw' : '25vw' }}
                                />
                            </Stack>
                            <Stack direction={'column'} gap={1}>
                                <span>Jenis Penjualan</span>
                                <TextField
                                    type="text"
                                    disabled
                                    placeholder='Jenis Penjualan'
                                    value={SelectedId.salesType === null ? '' : SelectedId.salesType}
                                    size="small"
                                    sx={{ bgcolor: "#fff", width: isMobile ? '40vw' : '25vw' }}
                                />
                            </Stack>
                        </Stack>
                        <Stack direction={'row'} justifyContent={'flex-start'} gap={isMobile ? 2 : 3}>
                            <Stack direction={'column'} gap={1}>
                                <span>Jumlah Barang Return</span>
                                <TextField
                                    type="text"
                                    size="small"
                                    placeholder='Jumlah Barang return'
                                    value={ReturnData.qtyReturn}
                                    error={parseInt(ReturnData.qtyReturn) > SelectedProduct.qty}
                                    onChange={(e) => handleInput(e, 'qtyReturn')}
                                    sx={{ bgcolor: "#ffff", width: isMobile ? '40vw' : '25vw' }}
                                />
                                {
                                    parseInt(ReturnData.qtyReturn) > SelectedProduct.qty ?
                                        <span style={{ color: Colors.error, fontSize: 13 }}>Jumlah Return melebihi Jumlah Barang</span>
                                        :
                                        null
                                }
                            </Stack>
                            <Stack direction={'column'} gap={1}>
                                <span>Status</span>
                                <Select
                                    size="small"
                                    displayEmpty
                                    sx={{ bgcolor: "white", width: isMobile ? '40vw' : '25vw', color: '#000' }}
                                    value={ReturnData.saleReturnStatus}
                                    onChange={(e) => handleInput(e, 'saleReturnStatus')}
                                    renderValue={(selected: any) => {
                                        if (selected.length === 0) {
                                            return <span style={{ color: '#a7a5a6' }}>Status</span>;
                                        }
                                        return selected
                                    }}
                                >
                                    {
                                        ['Return', 'Refund', 'Discount'].map((item, index) => (
                                            <MenuItem key={index} value={item}>{item}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </Stack>
                        </Stack>
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} gap={2} marginTop={5}>
                            <div onClick={GoBack} style={{ ...CENTER, borderRadius: 10, border: `1px solid ${Colors.primary}`, padding: '10px 30px', cursor: 'pointer' }}>
                                <span style={{ fontSize: 13, color: Colors.primary }}>BATAL</span>
                            </div>
                            <div onClick={handleSubmit} style={{ ...CENTER, borderRadius: 10, backgroundColor: Colors.primary, padding: '10px 30px', cursor: 'pointer', color: '#fff' }}>
                                {
                                    loader ?
                                        <CircularProgress size={20} color={'inherit'}></CircularProgress>
                                        :
                                        <span style={{ fontSize: 13, color: '#fff' }}>SIMPAN</span>
                                }
                            </div>
                        </Stack>
                    </Stack>
                </div>
            </Box >
        </div >
    )
}

export default ReturnPenjualanForm;