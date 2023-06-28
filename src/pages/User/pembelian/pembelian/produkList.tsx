import React from 'react';
import { Stack, TextField, Select, MenuItem, SelectChangeEvent, CircularProgress } from '@mui/material';
import { CENTER } from '../../../../utils/stylesheet';
import { Colors } from '../../../../utils/colors';
import { isMobile } from 'react-device-detect';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { HTTPAddPurchase } from '../../../../apis/User/purchase/purchase';
import secureLocalStorage from 'react-secure-storage';
import { toast } from 'react-toastify';

export const ProdukList = (data: any) => {
    const token = secureLocalStorage.getItem('USER_SESSION') as string
    const [latestChange, setLatestChange] = React.useState<any>({})
    const navigate = useNavigate()
    const [loader, setLoader] = React.useState(false)
    const [productList, setProductList] = React.useState([{
        id: '1234571234567',
        productUnitId: '',
        productUnitType: '',
        qty: 0,
        price: ''
    }])

    const AddProduct = (id: any) => {
        const last = {
            id: id.toUpperCase(),
            productUnitId: '',
            productUnitType: '',
            qty: 0,
            price: ''
        }
        let newArr = productList
        newArr.push(last)
        setProductList(newArr)
        setLatestChange(last)
    }

    const DeleteProduct = (item: any) => {
        const filtered = productList.filter((val) => val.id !== item.id)
        setProductList(filtered)
        setLatestChange({})
    }

    const handleInput = (event: any, index: number, type: any) => {
        const value = event.target.value
        if (type === 'productUnitType') {
            let currentPrice = 0
            const result = data.products.filter((value: any) => value.id === productList[index].productUnitId)
            if (value === 'DOZEN') {
                currentPrice = result[0].sellPriceInDozens
            } else if (value === 'PCS') {
                currentPrice = result[0].sellPriceInPcs
            } else {
                currentPrice = result[0].sellPriceInBox
            }
            setProductList([
                ...productList.slice(0, index),
                { ...productList[index], productUnitType: value, price: currentPrice.toString() },
                ...productList.slice(index + 1)
            ])
        } else if (type === 'qty') {
            if (!isNaN(value)) {
                setProductList([
                    ...productList.slice(0, index),
                    { ...productList[index], qty: value.length === 0 ? 0 : parseInt(value) },
                    ...productList.slice(index + 1)
                ])
            }
        } else {
            setProductList([
                ...productList.slice(0, index),
                { ...productList[index], [type]: value },
                ...productList.slice(index + 1)
            ])
        }
    };

    const renderProduct = (values: any, index: number) => {
        if (values.length === 0) {
            return <span style={{ color: '#a7a5a6' }}>Pilih Produk</span>;
        } else {
            const result = data.products.filter((value: any) => value.id === productList[index].productUnitId)
            return <span style={{ color: '#000' }}>{result[0].productTypeName}</span>;
        }
    }

    const handleSubmit = async () => {
        setLoader(true)
        try {
            const cleanProduct = productList.map((item: any) => {
                delete item.id
                delete item.price
                return item
            })
            const resp = await HTTPAddPurchase({
                genId: data.data.genId,
                dueDate: moment(data.data.dueDate).format('YYYY-MM-DD'),
                productBrandId: data.data.productBrandId,
                shippingCostPerKg: data.data.shippingCostPerKg,
                supplierId: data.data.supplierId,
                token: token,
                transactionDate: moment(data.data.transactionDate).format('YYYY-MM-DD'),
                purchasingProducts: cleanProduct,
            })
            toast.error('Berhasil menambahkan pembelian baru!')
            setLoader(false)
            navigate(-1)
        } catch (error: any) {
            setLoader(false)
            toast.error('Terjadi kesalahan')
            console.log(error)
            if (error.status === 500) {
                toast.error('Server sedang mengalami gangguan!')
            } else {
                toast.error('Terjadi Kesalahan!')
            }
        }
    }

    const handlePrice = (index: number) => {
        const item = productList[index]
        let newPrice = parseInt(item.price) * item.qty
        return isNaN(newPrice) ? 'Rp 0,00' : (Math.round(newPrice)).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
    }

    const TotalQty = () => {
        let total = 0
        for (let i = 0; i < productList.length; i++) {
            const item = isNaN(productList[i].qty) ? 0 : productList[i].qty;
            total = total + item
        }
        return total
    }

    const TotalPrice = () => {
        let total = 0
        for (let i = 0; i < productList.length; i++) {
            const item = productList[i];
            let newPrice = parseInt(item.price) * item.qty
            total = total + (isNaN(newPrice) ? 0 : newPrice) + data.data.shippingCostPerKg
        }
        return (Math.round(total)).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                {
                    productList.map((item, index) => (
                        <React.Fragment key={index}>
                            <h3 style={{ color: '#000' }}>Produk {index + 1}</h3>
                            <Stack direction={'column'} gap={3}>
                                <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-start'} gap={isMobile ? 2 : 3}>
                                    <Stack direction={'column'} gap={1}>
                                        <span>Produk</span>
                                        <Select
                                            size="medium"
                                            displayEmpty
                                            required
                                            MenuProps={{ style: { height: 300 } }}
                                            sx={{ bgcolor: "white", width: isMobile ? '40vw' : '25vw', color: '#000' }}
                                            value={item.productUnitId}
                                            onChange={(e) => handleInput(e, index, 'productUnitId')}
                                            renderValue={(value: any) => renderProduct(value, index)}
                                        >
                                            {
                                                data.products.map((item: any, index: number) => (
                                                    <MenuItem key={index} value={item.id}>{item.productTypeName}</MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </Stack>
                                    <Stack direction={'column'} gap={1}>
                                        <span>Satuan</span>
                                        <Select
                                            size="medium"
                                            displayEmpty
                                            required
                                            sx={{ bgcolor: "white", width: isMobile ? '40vw' : '25vw', color: '#000' }}
                                            value={item.productUnitType}
                                            disabled={productList[index].productUnitId.length === 0}
                                            onChange={(e) => handleInput(e, index, 'productUnitType')}
                                            renderValue={(selected: any) => {
                                                if (selected.length === 0) {
                                                    return <span style={{ color: '#a7a5a6' }}>PCS / Lusin / Box</span>;
                                                }
                                                return selected === 'DOZEN' ? 'LUSIN' : selected
                                            }}
                                        >
                                            {
                                                ['PCS', 'DOZEN', 'BOX'].map((item, index) => (
                                                    <MenuItem key={index} value={item}>{item === 'DOZEN' ? 'LUSIN' : item}</MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </Stack>
                                </Stack>
                                <Stack direction={'row'} alignItems={'flex-end'} justifyContent={'flex-start'} gap={isMobile ? 2 : 3}>
                                    <Stack direction={'column'} gap={1}>
                                        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                                            <span>Qty / Jumlah</span>
                                            {/* <div style={{ ...CENTER, borderRadius: 5, backgroundColor: Colors.success, padding: '5px 10px' }}>
                                                <p style={{ margin: 0, color: '#fff' }}>45</p>
                                            </div> */}
                                        </Stack>
                                        <TextField
                                            type="text"
                                            size="medium"
                                            required
                                            placeholder='Jumlah Produk'
                                            value={item.qty}
                                            onChange={(e) => handleInput(e, index, 'qty')}
                                            sx={{ bgcolor: "#fff", width: isMobile ? '40vw' : '25vw' }}
                                        />
                                    </Stack>
                                    <Stack direction={'column'} gap={1}>
                                        <span>Harga</span>
                                        <TextField
                                            type="text"
                                            size="medium"
                                            disabled
                                            placeholder='0'
                                            value={handlePrice(index)}
                                            sx={{ bgcolor: "#f4f4f4", width: isMobile ? '40vw' : '25vw' }}
                                        />
                                    </Stack>
                                </Stack>
                                {
                                    productList.length === 1 ?
                                        null
                                        :
                                        <div onClick={() => DeleteProduct(item)} style={{ ...CENTER, borderRadius: 10, border: `1px solid ${Colors.error}`, padding: '10px 30px', cursor: 'pointer', alignSelf: 'flex-start', userSelect: 'none' }}>
                                            <span style={{ fontSize: 13, color: Colors.primary }}>Hapus Barang</span>
                                        </div>
                                }
                            </Stack>
                        </React.Fragment>
                    ))
                }
                {
                    productList.length === 5 ?
                        null
                        :
                        <Stack marginTop={3} direction={'row'} alignItems={'center'} justifyContent={isMobile ? 'space-around' : 'flex-start'} gap={2}>
                            <div onClick={() => AddProduct(moment().format('x'))} style={{ ...CENTER, borderRadius: 10, backgroundColor: Colors.success, padding: '10px 30px', cursor: 'pointer', userSelect: 'none' }}>
                                <span style={{ fontSize: 13, color: '#fff' }}>Tambah Barang</span>
                            </div>
                        </Stack>
                }
                <Stack direction={'column'} gap={1} width={'100%'} marginTop={5}>
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                        <span><b>Total Produk</b></span>
                        <span>{productList.length}</span>
                    </Stack>
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                        <span><b>Total Qty</b></span>
                        <span>{TotalQty()}</span>
                    </Stack>
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                        <span><b>Jatuh Tempo</b></span>
                        <span>{data.data.dueDate === null ? '-' : moment(data.data.dueDate).format('DD / MM / YYYY')}</span>
                    </Stack>
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                        <span><b>Total Harga</b></span>
                        <span>{TotalPrice()}</span>
                    </Stack>
                </Stack>
                <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} gap={2} marginTop={5}>
                    <div onClick={() => navigate(-1)} style={{ ...CENTER, borderRadius: 10, border: `1px solid ${Colors.primary}`, padding: '10px 30px', cursor: 'pointer' }}>
                        <span style={{ fontSize: 13, color: Colors.primary }}>BATAL</span>
                    </div>
                    <button type="submit" style={{ ...CENTER, borderRadius: 10, backgroundColor: Colors.primary, padding: '10px 30px', cursor: 'pointer', color: '#fff' }}>
                        {
                            loader ?
                                <CircularProgress size={20} color={'inherit'}></CircularProgress>
                                :
                                <span style={{ fontSize: 13, color: '#fff' }}>SIMPAN</span>
                        }
                    </button>
                </Stack>
            </div>
        </form>
    )
}

export const PrintProdukList = (data: any) => {
    return (
        <div>
            {
                data.data.purchasingProducts === undefined || data.data.purchasingProducts === null ?
                    null
                    :
                    data.data.purchasingProducts.map((item: any, index: number) => (
                        <React.Fragment key={index}>
                            <h3 style={{ color: '#000' }}>Produk {index + 1}</h3>
                            <Stack direction={'column'} gap={3}>
                                <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-start'} gap={isMobile ? 2 : 3}>
                                    {/* <Stack direction={'column'} gap={1}>
                                        <span>Produk</span>
                                        <TextField
                                            type="text"
                                            size="medium"
                                            placeholder='Produk'
                                            value={item.productUnitType}
                                            required
                                            InputProps={{
                                                readOnly: true
                                            }}
                                            sx={{ bgcolor: "#fff", width: isMobile ? '40vw' : data.onPrint ? '45vw' : '25vw' }}
                                        />
                                    </Stack> */}
                                    <Stack direction={'column'} gap={1}>
                                        <span>Satuan</span>
                                        <TextField
                                            type="text"
                                            size="medium"
                                            placeholder='Satuan Produk'
                                            value={item.productUnitType}
                                            required
                                            InputProps={{
                                                readOnly: true
                                            }}
                                            sx={{ bgcolor: "#fff", width: isMobile ? '40vw' : data.onPrint ? '45vw' : '25vw' }}
                                        />
                                    </Stack>
                                </Stack>
                                <Stack direction={'row'} alignItems={'flex-end'} justifyContent={'flex-start'} gap={isMobile ? 2 : 3}>
                                    <Stack direction={'column'} gap={1}>
                                        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                                            <span>Qty / Jumlah</span>
                                        </Stack>
                                        <TextField
                                            type="text"
                                            size="medium"
                                            placeholder='QTY'
                                            value={item.qty}
                                            required
                                            InputProps={{
                                                readOnly: true
                                            }}
                                            sx={{ bgcolor: "#fff", width: isMobile ? '40vw' : data.onPrint ? '45vw' : '25vw' }}
                                        />
                                    </Stack>
                                    <Stack direction={'column'} gap={1}>
                                        <span>Harga</span>
                                        <TextField
                                            type="text"
                                            size="medium"
                                            placeholder='Jumlah Produk'
                                            value={(item.totalPrice === undefined ? 0 : item.totalPrice).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                                            required
                                            InputProps={{
                                                readOnly: true
                                            }}
                                            sx={{ bgcolor: "#fff", width: isMobile ? '40vw' : data.onPrint ? '45vw' : '25vw' }}
                                        />
                                    </Stack>
                                </Stack>
                            </Stack>
                        </React.Fragment>
                    ))
            }
            <Stack direction={'column'} gap={1} width={'100%'} marginTop={5}>
                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                    <span><b>Total Produk</b></span>
                    <span>{data.data.totalProduct}</span>
                </Stack>
                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                    <span><b>Total Qty</b></span>
                    <span>{data.data.totalQty}</span>
                </Stack>
                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                    <span><b>Jatuh Tempo</b></span>
                    <span>{data.data.dueDate === undefined ? '-' : moment(data.data.dueDate).format('DD / MM / YYYY')}</span>
                </Stack>
                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                    <span><b>Total Harga</b></span>
                    <span>{(data.data.totalBill === undefined ? 0 : data.data.totalBill).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</span>
                </Stack>
            </Stack>
        </div>
    )
}