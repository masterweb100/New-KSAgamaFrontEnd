import React from 'react';
import { Stack, TextField, Select, MenuItem, SelectChangeEvent, InputAdornment, CircularProgress } from '@mui/material';
import { CENTER } from '../../../../utils/stylesheet';
import { Colors } from '../../../../utils/colors';
import { isMobile } from 'react-device-detect';
import moment from 'moment';
import secureLocalStorage from 'react-secure-storage';
import { useNavigate } from 'react-router-dom';
import { HTTPAddSales } from '../../../../apis/User/sales/sales';

const ProdukList = (data: any) => {
    const navigate = useNavigate()
    const token = secureLocalStorage.getItem('TOKEN')
    const [latestProduct, setLatestChange] = React.useState<any>({})
    const [notes, setNotes] = React.useState('')
    const [loader, setLoader] = React.useState(false)
    const [productList, setProductList] = React.useState([{
        id: '1186457694123',
        productUnitId: '',
        productUnitType: '',
        qty: '',
        isPPN: '',
        discount1: '',
        discount2: '',
        discount3: '',
        discount4: '',
        price: '0'
    }])

    const GoBack = () => {
        navigate(-1)
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
                { ...productList[index], [type]: value, price: currentPrice.toString(), },
                ...productList.slice(index + 1)
            ])
        } else {
            setProductList([
                ...productList.slice(0, index),
                { ...productList[index], [type]: value },
                ...productList.slice(index + 1)
            ])
        }
    };

    const handlePrice = (index: number) => {
        const item = productList[index]
        let Price = parseInt(item.price) * parseInt(item.qty)
        let isPPN = item.isPPN === 'Ya' ? Price + ((Price / 100) * 11) : Price
        let Discount1 = (isPPN / 100) * parseInt(item.discount1.length === 0 ? '0' : item.discount1)
        let Discount2 = (Discount1 / 100) * parseInt(item.discount2.length === 0 ? '0' : item.discount2)
        let Discount3 = (Discount2 / 100) * parseInt(item.discount3.length === 0 ? '0' : item.discount3)
        let Discount4 = (Discount3 / 100) * parseInt(item.discount4.length === 0 ? '0' : item.discount4)
        Price = isPPN - Discount1 - Discount2 - Discount3 - Discount4

        return isNaN(Price) ? 'Rp 0,00' : (Math.round(Price)).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
    }

    const AddProduct = (id: any) => {
        const last = {
            id: id.toUpperCase(),
            productUnitId: '',
            productUnitType: '',
            qty: '',
            isPPN: '',
            discount1: '',
            discount2: '',
            discount3: '',
            discount4: '',
            price: '0'
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

    const handleSubmit = async () => {
        setLoader(true)
        try {
            const cleanProduct = productList.map((item: any) => {
                delete item.id
                delete item.price
                return item
            })
            await HTTPAddSales({
                token: token as string,
                customerId: data.data.customerId,
                invoice: data.data.invoice,
                transactionDate: moment(data.data.transactionDate).format('YYYY-MM-DD'),
                dueDate: moment(data.data.dueDate).format('YYYY-MM-DD'),
                reference: data.data.reference,
                shippingDate: moment(data.data.shippingDate).format('YYYY-MM-DD'),
                salesType: data.data.salesType.toUpperCase(),
                expeditionId: data.data.expeditionId,
                shippingCostPerKg: data.data.shippingCostPerKg,
                receipt: data.data.receipt,
                notes: notes,
                saleProducts: cleanProduct,
            })
            setLoader(false)
            navigate(-1)
        } catch (error) {
            setLoader(false)
            console.log(error)
        }
    }

    const renderProduct = (values: any, index: number) => {
        if (values.length === 0) {
            return <span style={{ color: '#a7a5a6' }}>Pilih Produk</span>;
        } else {
            const result = data.products.filter((value: any) => value.id === productList[index].productUnitId)
            return <span style={{ color: '#000' }}>{result[0].productTypeName}</span>;
        }
    }

    const TotalQty = () => {
        let total = 0
        for (let i = 0; i < productList.length; i++) {
            const item = isNaN(parseInt(productList[i].qty)) ? 0 : parseInt(productList[i].qty);
            total = total + item
        }
        return total
    }

    const TotalPrice = () => {
        let total = 0
        for (let i = 0; i < productList.length; i++) {
            const item = productList[i];
            let Price = parseInt(item.price) * parseInt(item.qty)
            let isPPN = item.isPPN === 'Ya' ? Price + ((Price / 100) * 11) : Price
            let Discount1 = (isPPN / 100) * parseInt(item.discount1.length === 0 ? '0' : item.discount1)
            let Discount2 = (Discount1 / 100) * parseInt(item.discount2.length === 0 ? '0' : item.discount2)
            let Discount3 = (Discount2 / 100) * parseInt(item.discount3.length === 0 ? '0' : item.discount3)
            let Discount4 = (Discount3 / 100) * parseInt(item.discount4.length === 0 ? '0' : item.discount4)
            Price = isPPN - Discount1 - Discount2 - Discount3 - Discount4
            total = total + (isNaN(Price) ? 0 : Price)
        }
        return (Math.round(total)).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })
    }

    return (
        <div>
            {
                productList.map((item, index) => (
                    <React.Fragment key={item.id}>
                        <h3 style={{ color: '#000' }}>Produk {index + 1}</h3>
                        <Stack direction={'column'} gap={3}>
                            <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} gap={isMobile ? 2 : 3}>
                                <Stack direction={'column'} gap={1}>
                                    <span>Produk</span>
                                    <Select
                                        size="medium"
                                        value={item.productUnitId}
                                        displayEmpty
                                        sx={{ bgcolor: "white", width: isMobile ? '40vw' : '25vw', color: '#000' }}
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
                                        value={item.productUnitType}
                                        displayEmpty
                                        disabled={productList[index].productUnitId.length === 0}
                                        sx={{ bgcolor: "white", width: isMobile ? '40vw' : '25vw', color: '#000' }}
                                        onChange={(e) => handleInput(e, index, 'productUnitType')}
                                        renderValue={(value: any) => {
                                            if (value.length === 0) {
                                                return <span style={{ color: '#a7a5a6' }}>PCs / Lusin / Box</span>;
                                            }
                                            return value === 'DOZEN' ? 'LUSIN' : value
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
                            <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} gap={isMobile ? 2 : 3}>
                                <Stack direction={'column'} gap={1}>
                                    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                                        <span>Qty / Jumlah</span>
                                        <div style={{ ...CENTER, borderRadius: 5, backgroundColor: Colors.success, padding: '5px 10px' }}>
                                            <p style={{ margin: 0, color: '#fff' }}>45</p>
                                        </div>
                                    </Stack>
                                    <TextField
                                        type="text"
                                        size="medium"
                                        placeholder='Jumlah Produk'
                                        value={item.qty}
                                        onChange={(e) => handleInput(e, index, 'qty')}
                                        sx={{ bgcolor: "#fff", width: isMobile ? '40vw' : '25vw' }}
                                    />
                                </Stack>
                                <Stack direction={'column'} gap={1}>
                                    <span>PPN</span>
                                    <Select
                                        size="medium"
                                        value={item.isPPN}
                                        displayEmpty
                                        sx={{ bgcolor: "white", width: isMobile ? '40vw' : '25vw', color: '#000' }}
                                        onChange={(e) => handleInput(e, index, 'isPPN')}
                                        renderValue={(selected: any) => {
                                            if (selected.length === 0) {
                                                return <span style={{ color: '#a7a5a6' }}>Ya / Tidak</span>;
                                            }
                                            return selected
                                        }}
                                    >
                                        {
                                            ['Ya', 'Tidak'].map((item, index) => (
                                                <MenuItem key={index} value={item}>{item}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                </Stack>
                            </Stack>
                            <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} gap={isMobile ? 2 : 3} flexWrap={'wrap'}>
                                <Stack direction={'column'} gap={1}>
                                    <span>Diskon 1</span>
                                    <TextField
                                        type="text"
                                        size="medium"
                                        placeholder='0'
                                        value={item.discount1}
                                        onChange={(e) => handleInput(e, index, 'discount1')}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position='end'>
                                                    <span>%</span>
                                                </InputAdornment>
                                            )
                                        }}
                                        sx={{ bgcolor: "#fff", width: isMobile ? '40vw' : '25vw' }}
                                    />
                                </Stack>
                                <Stack direction={'column'} gap={1}>
                                    <span>Diskon 2</span>
                                    <TextField
                                        type="text"
                                        size="medium"
                                        placeholder='0'
                                        value={item.discount2}
                                        onChange={(e) => handleInput(e, index, 'discount2')}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position='end'>
                                                    <span>%</span>
                                                </InputAdornment>
                                            )
                                        }}
                                        sx={{ bgcolor: "#fff", width: isMobile ? '40vw' : '25vw' }}
                                    />
                                </Stack>
                                <Stack direction={'column'} gap={1}>
                                    <span>Diskon 3</span>
                                    <TextField
                                        type="text"
                                        size="medium"
                                        placeholder='0'
                                        value={item.discount3}
                                        onChange={(e) => handleInput(e, index, 'discount3')}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position='end'>
                                                    <span>%</span>
                                                </InputAdornment>
                                            )
                                        }}
                                        sx={{ bgcolor: "#fff", width: isMobile ? '40vw' : '25vw' }}
                                    />
                                </Stack>
                                <Stack direction={'column'} gap={1}>
                                    <span>Diskon 4</span>
                                    <TextField
                                        type="text"
                                        size="medium"
                                        placeholder='0'
                                        value={item.discount4}
                                        onChange={(e) => handleInput(e, index, 'discount4')}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position='end'>
                                                    <span>%</span>
                                                </InputAdornment>
                                            )
                                        }}
                                        sx={{ bgcolor: "#fff", width: isMobile ? '40vw' : '25vw' }}
                                    />
                                </Stack>
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
                                    InputProps={{ style: { fontSize: 20, color: '#000' } }}
                                />
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
                    <Stack direction={'row'} alignItems={'center'} justifyContent={isMobile ? 'space-around' : 'flex-start'} gap={2} marginTop={3}>
                        <div onClick={() => AddProduct(moment().format('x'))} style={{ ...CENTER, borderRadius: 10, backgroundColor: Colors.success, padding: '10px 30px', cursor: 'pointer', userSelect: 'none' }}>
                            <span style={{ fontSize: 13, color: '#fff' }}>Tambah Barang</span>
                        </div>
                    </Stack>
            }
            <Stack direction={isMobile ? 'column' : 'row'} alignItems={'flex-end'} justifyContent={isMobile ? 'center' : 'flex-start'} gap={isMobile ? 4 : 3} marginTop={5}>
                <Stack direction={'column'} gap={1}>
                    <span>{'Note (Opsional)'}</span>
                    <TextField
                        type="text"
                        size="medium"
                        placeholder={'Tambahkan Catatan'}
                        sx={{ bgcolor: "#fff", width: isMobile ? '80vw' : '25vw' }}
                        multiline
                        rows={5}
                        value={notes}
                        onChange={(e => setNotes(e.target.value))}
                    />
                </Stack>
                <Stack direction={'column'} gap={1} width={'100%'}>
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
                        <span><b>PPN</b></span>
                        <span>11%</span>
                    </Stack>
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                        <span><b>Total Harga</b></span>
                        <span>{TotalPrice()}</span>
                    </Stack>
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
        </div>
    )
}

export default ProdukList;