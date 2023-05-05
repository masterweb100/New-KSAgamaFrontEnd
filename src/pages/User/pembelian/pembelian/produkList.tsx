import React from 'react';
import { Stack, TextField, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { CENTER } from '../../../../utils/stylesheet';
import { Colors } from '../../../../utils/colors';
import { isMobile } from 'react-device-detect';

const ProdukList = () => {
    const [produk, setProduk] = React.useState('');
    const [satuan, setSatuan] = React.useState('');
    const [productList, setProductList] = React.useState([1])
    const [latestProduct, setLatestProduct] = React.useState(0)

    const handleChangeProduk = (event: SelectChangeEvent) => {
        setProduk(event.target.value as string);
    };

    const handleChangeSatuan = (event: SelectChangeEvent) => {
        setSatuan(event.target.value as string);
    };

    const AddProduct = () => {
        const last = productList.slice(-1)[0]
        let newArr = productList
        newArr.push(last + 1)
        setProductList(newArr)
        setLatestProduct(last + 1)
    }

    const DeleteProduct = (item: number) => {
        const index = productList.indexOf(item)
        if (index > -1) {
            productList.splice(index, 1)
            setLatestProduct(index)
        }
    }

    return (
        <div>
            {
                productList.map((item, index) => (
                    <div key={index}>
                        <h3 style={{ color: '#000' }}>Produk {index + 1}</h3>
                        <Stack direction={'column'} gap={3}>
                            <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-start'} gap={isMobile ? 2 : 3}>
                                <Stack direction={'column'} gap={1}>
                                    <span>Produk</span>
                                    <Select
                                        size="medium"
                                        value={produk}
                                        displayEmpty
                                        MenuProps={{ style: { height: 300 } }}
                                        sx={{ bgcolor: "white", width: isMobile ? '40vw' : '25vw', color: '#000' }}
                                        onChange={handleChangeProduk}
                                        renderValue={(selected: any) => {
                                            if (selected.length === 0) {
                                                return <span style={{ color: '#a7a5a6' }}>Nama Produk</span>;
                                            }
                                            return selected
                                        }}
                                    >
                                        {
                                            [...Array(10)].map((item, index) => (
                                                <MenuItem key={index} value={`Produk ${index + 1}`}>{`Produk ${index + 1}`}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                </Stack>
                                <Stack direction={'column'} gap={1}>
                                    <span>Satuan</span>
                                    <Select
                                        size="medium"
                                        value={satuan}
                                        displayEmpty
                                        sx={{ bgcolor: "white", width: isMobile ? '40vw' : '25vw', color: '#000' }}
                                        onChange={handleChangeSatuan}
                                        renderValue={(selected: any) => {
                                            if (selected.length === 0) {
                                                return <span style={{ color: '#a7a5a6' }}>PCs / Lusin / Box</span>;
                                            }
                                            return selected
                                        }}
                                    >
                                        {
                                            ['PCs', 'Lusin', 'Box'].map((item, index) => (
                                                <MenuItem key={index} value={item}>{item}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                </Stack>
                            </Stack>
                            <Stack direction={'row'} alignItems={'flex-end'} justifyContent={'flex-start'} gap={isMobile ? 2 : 3}>
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
                                        sx={{ bgcolor: "#fff", width: isMobile ? '40vw' : '25vw' }}
                                    />
                                </Stack>
                                <Stack direction={'column'} gap={1}>
                                    <span>Harga</span>
                                    <TextField
                                        type="text"
                                        size="medium"
                                        placeholder='Harga Produk'
                                        sx={{ bgcolor: "#fff", width: isMobile ? '40vw' : '25vw' }}
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
                    </div>
                ))
            }
            <Stack marginTop={3} direction={'row'} alignItems={'center'} justifyContent={isMobile ? 'space-around' : 'flex-start'} gap={2}>
                <div onClick={AddProduct} style={{ ...CENTER, borderRadius: 10, backgroundColor: Colors.success, padding: '10px 30px', cursor: 'pointer', userSelect: 'none' }}>
                    <span style={{ fontSize: 13, color: '#fff' }}>Tambah Barang</span>
                </div>
            </Stack>
        </div>
    )
}

export default ProdukList;