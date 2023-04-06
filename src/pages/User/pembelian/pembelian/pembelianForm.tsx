import React from 'react';
import { Box, Stack, TextField, Toolbar, Select, MenuItem, SelectChangeEvent, InputAdornment } from '@mui/material';
import NavigationBarUser from '../../../../components/appBarUser';
import { CENTER } from '../../../../utils/stylesheet';
import { Colors } from '../../../../utils/colors';
import { useNavigate } from "react-router-dom";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import SupplierDialog from './supplierDialog';

const PembelianForm = () => {
    const navigate = useNavigate()
    const [supplier, setSupplier] = React.useState('');
    const [brand, setBrand] = React.useState('');
    const [kategori, setKategori] = React.useState('');
    const [dateTransaksi, setDateTransaksi] = React.useState<any>(null);
    const [dateTempo, setDateTempo] = React.useState<any>(null);
    const [isSupplierOpen, setSupplierOpen] = React.useState(false);

    const handleChangeSupplier = (event: SelectChangeEvent) => {
        setSupplier(event.target.value as string);
    };

    const handleChangeBrand = (event: SelectChangeEvent) => {
        setBrand(event.target.value as string);
    };

    const handleChangeKategori = (event: SelectChangeEvent) => {
        setKategori(event.target.value as string);
    };

    const [produk, setProduk] = React.useState('');
    const [satuan, setSatuan] = React.useState('');

    const handleChangeProduk = (event: SelectChangeEvent) => {
        setProduk(event.target.value as string);
    };

    const handleChangeSatuan = (event: SelectChangeEvent) => {
        setSatuan(event.target.value as string);
    };

    const GoBack = () => {
        navigate(-1)
    }

    const AddSupplier = React.useCallback(() => setSupplierOpen(true), [])

    return (
        <div style={{ display: 'flex' }}>
            <NavigationBarUser title={'Form SKU Pembelian'} isChild={true} name={'Pembelian'} idPanel={4}></NavigationBarUser>
            <Box
                component="main"
                sx={{ bgcolor: '#f4f5ff', p: 5, width: '100vw', minHeight: '100vh' }}
            >
                <Toolbar />
                <div style={{ flex: 1, ...CENTER }}>
                    <Stack direction={'column'} gap={3} sx={{ backgroundColor: '#fff', borderRadius: 2, border: '1px solid #cccccc', padding: '4% 3%' }}>
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'center'}>
                            <h2 style={{ color: '#000' }}>Form Tambah Tagihan</h2>
                        </Stack>
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-start'} gap={3}>
                            <Stack direction={'column'} gap={1}>
                                <span>*Supplier</span>
                                <Select
                                    size="small"
                                    value={supplier}
                                    displayEmpty
                                    sx={{ bgcolor: "white", width: '25vw', color: '#000', }}
                                    onChange={handleChangeSupplier}
                                    MenuProps={{ style: { height: 300 } }}
                                    renderValue={(selected: any) => {
                                        if (selected.length === 0) {
                                            return <span style={{ color: '#a7a5a6' }}>Supplier</span>;
                                        }
                                        return selected
                                    }}
                                >
                                    {
                                        [...Array(30)].map((item, index) => (
                                            <MenuItem key={index} value={index === 0 ? '' : 'Supplier ' + (index + 1)}>
                                                {
                                                    index === 0 ?
                                                        <div onClick={AddSupplier} style={{ ...CENTER, padding: '7px 0px', border: `1px solid #000`, borderRadius: 5, cursor: 'pointer', alignSelf: 'flex-start', width: '100%' }}>
                                                            <span style={{ color: '#000', fontSize: 13 }}>+ Tambah Data Supplier</span>
                                                        </div>
                                                        :
                                                        <span>Supplier {index + 1}</span>
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
                                    size="small"
                                    disabled
                                    defaultValue={'INV/0002'}
                                    sx={{ bgcolor: "#f4f4f4", width: '25vw' }}
                                />
                            </Stack>
                        </Stack>
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-start'} gap={3}>
                            <Stack direction={'column'} gap={1}>
                                <span>*Nama Brand</span>
                                <Select
                                    size="small"
                                    value={brand}
                                    displayEmpty
                                    sx={{ bgcolor: "white", width: '25vw', color: '#000' }}
                                    onChange={handleChangeBrand}
                                    MenuProps={{ style: { height: 300 } }}
                                    renderValue={(selected: any) => {
                                        if (selected.length === 0) {
                                            return <span style={{ color: '#a7a5a6' }}>Brand</span>;
                                        }
                                        return selected
                                    }}
                                >
                                    {
                                        [...Array(10)].map((item, index) => (
                                            <MenuItem key={index} value={`Brand ${index + 1}`}>{`Brand ${index + 1}`}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </Stack>
                            <Stack direction={'column'} gap={1}>
                                <span>Kategori</span>
                                <Select
                                    size="small"
                                    value={kategori}
                                    displayEmpty
                                    sx={{ bgcolor: "white", width: '25vw', color: '#000' }}
                                    onChange={handleChangeKategori}
                                    MenuProps={{ style: { height: 300 } }}
                                    renderValue={(selected: any) => {
                                        if (selected.length === 0) {
                                            return <span style={{ color: '#a7a5a6' }}>Nama Kategori</span>;
                                        }
                                        return selected
                                    }}
                                >
                                    {
                                        [...Array(10)].map((item, index) => (
                                            <MenuItem key={index} value={'Kategori ' + (index + 1)}> Kategori {index + 1} </MenuItem>
                                        ))
                                    }
                                </Select>
                            </Stack>
                        </Stack>
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-start'} gap={3}>
                            <Stack direction={'column'} gap={1}>
                                <span>*Tanggal Transaksi</span>
                                <DatePicker
                                    value={dateTransaksi}
                                    onChange={(date) => setDateTransaksi(date)}
                                    sx={{ bgcolor: "white", borderRadius: 1, width: '25vw' }}
                                />
                            </Stack>
                            <Stack direction={'column'} gap={1}>
                                <span>*Tanggal Jatuh Tempo</span>
                                <DatePicker
                                    value={dateTempo}
                                    onChange={(date) => setDateTempo(date)}
                                    sx={{ bgcolor: "white", borderRadius: 1, width: '25vw' }}
                                />
                            </Stack>
                        </Stack>
                        <Stack direction={'column'} gap={1}>
                            <span>Harga Ongkir</span>
                            <TextField
                                type="text"
                                size="small"
                                defaultValue={'15.000'}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            <span>/ Kg</span>
                                        </InputAdornment>
                                    )
                                }}
                                sx={{ bgcolor: "#fff", width: '25vw' }}
                            />
                        </Stack>
                        {/* ///////////////////////////////////////// */}
                        <h2 style={{ color: '#000' }}>Data Produk</h2>
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-start'} gap={3}>
                            <Stack direction={'column'} gap={1}>
                                <span>Produk</span>
                                <Select
                                    size="small"
                                    value={produk}
                                    displayEmpty
                                    sx={{ bgcolor: "white", width: '25vw', color: '#000' }}
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
                                    size="small"
                                    value={satuan}
                                    displayEmpty
                                    sx={{ bgcolor: "white", width: '25vw', color: '#000' }}
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
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-start'} gap={3}>
                            <Stack direction={'column'} gap={1}>
                                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                                    <span>Qty / Jumlah</span>
                                    <div style={{ ...CENTER, borderRadius: 5, backgroundColor: Colors.success, padding: '5px 10px' }}>
                                        <p style={{ margin: 0, color: '#fff' }}>45</p>
                                    </div>
                                </Stack>
                                <TextField
                                    type="text"
                                    size="small"
                                    placeholder='Jumlah Produk'
                                    sx={{ bgcolor: "#fff", width: '25vw' }}
                                />
                            </Stack>
                            <Stack direction={'column'} gap={1}>
                                <span>Harga</span>
                                <TextField
                                    type="text"
                                    size="small"
                                    placeholder='Harga Produk'
                                    sx={{ bgcolor: "#fff", width: '25vw' }}
                                />
                            </Stack>
                        </Stack>
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-start'} gap={2}>
                            <div style={{ ...CENTER, borderRadius: 10, backgroundColor: Colors.success, padding: '10px 30px', cursor: 'pointer' }}>
                                <span style={{ fontSize: 13, color: '#fff' }}>Tambah Barang</span>
                            </div>
                            <div style={{ ...CENTER, borderRadius: 10, border: `1px solid ${Colors.error}`, padding: '10px 30px', cursor: 'pointer' }}>
                                <span style={{ fontSize: 13, color: Colors.primary }}>Hapus Barang</span>
                            </div>
                        </Stack>
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-start'} gap={3}>
                            <Stack direction={'column'} gap={1}>
                                <span>{'Note (Opsional)'}</span>
                                <TextField
                                    type="text"
                                    size="small"
                                    placeholder={'Tambahkan Catatan'}
                                    sx={{ bgcolor: "#fff", width: '25vw' }}
                                    multiline
                                    rows={5}
                                />
                            </Stack>
                            <Stack direction={'column'} gap={1} width={'100%'}>
                                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                                    <span><b>Total Produk</b></span>
                                    <span>21</span>
                                </Stack>
                                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                                    <span><b>Total Qty</b></span>
                                    <span>25</span>
                                </Stack>
                                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                                    <span><b>Jatuh Tempo</b></span>
                                    <span>23/10/2023</span>
                                </Stack>
                                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                                    <span><b>PPN</b></span>
                                    <span>0</span>
                                </Stack>
                                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                                    <span><b>Total Harga</b></span>
                                    <span>Rp 200.000</span>
                                </Stack>
                            </Stack>
                        </Stack>
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} gap={2} marginTop={5}>
                            <div onClick={GoBack} style={{ ...CENTER, borderRadius: 10, border: `1px solid ${Colors.primary}`, padding: '10px 30px', cursor: 'pointer' }}>
                                <span style={{ fontSize: 13, color: Colors.primary }}>BATAL</span>
                            </div>
                            <div style={{ ...CENTER, borderRadius: 10, backgroundColor: Colors.primary, padding: '10px 30px', cursor: 'pointer' }}>
                                <span style={{ fontSize: 13, color: '#fff' }}>SIMPAN</span>
                            </div>
                        </Stack>
                    </Stack>
                </div>
            </Box>
            <SupplierDialog isOpen={isSupplierOpen} setOpen={() => setSupplierOpen(false)} />
        </div>
    )
}

export default PembelianForm;