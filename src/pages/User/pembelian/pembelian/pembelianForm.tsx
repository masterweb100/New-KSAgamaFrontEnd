import React from 'react';
import { Box, Stack, TextField, Icon, Toolbar, Select, MenuItem, SelectChangeEvent, InputAdornment } from '@mui/material';
import NavigationBarUser from '../../../../components/appBarUser';
import { CENTER } from '../../../../utils/stylesheet';
import { Colors } from '../../../../utils/colors';
import { useNavigate, useParams } from "react-router-dom";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import SupplierDialog from './supplierDialog';
import { isMobile } from 'react-device-detect';
import ProdukList from './produkList';

const PembelianForm = () => {
    const navigate = useNavigate()
    const { action }: any = useParams()
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

    const GoBack = () => {
        navigate(-1)
    }

    const AddSupplier = React.useCallback(() => setSupplierOpen(true), [])

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
                                    value={supplier}
                                    displayEmpty
                                    sx={{ bgcolor: "white", width: isMobile ? '40vw' : '25vw', color: '#000', }}
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
                                    size="medium"
                                    disabled
                                    defaultValue={'INV/0002'}
                                    sx={{ bgcolor: "#f4f4f4", width: isMobile ? '40vw' : '25vw' }}
                                />
                            </Stack>
                        </Stack>
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-start'} gap={isMobile ? 2 : 3}>
                            <Stack direction={'column'} gap={1}>
                                <span>*Nama Brand</span>
                                <Select
                                    size="medium"
                                    value={brand}
                                    displayEmpty
                                    sx={{ bgcolor: "white", width: isMobile ? '40vw' : '25vw', color: '#000' }}
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
                                    size="medium"
                                    value={kategori}
                                    displayEmpty
                                    sx={{ bgcolor: "white", width: isMobile ? '40vw' : '25vw', color: '#000' }}
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
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-start'} gap={isMobile ? 2 : 3}>
                            <Stack direction={'column'} gap={1}>
                                <span>*Tanggal Transaksi</span>
                                <DatePicker
                                    value={dateTransaksi}
                                    onChange={(date) => setDateTransaksi(date)}
                                    sx={{ bgcolor: "white", borderRadius: 1, width: isMobile ? '40vw' : '25vw' }}
                                />
                            </Stack>
                            <Stack direction={'column'} gap={1}>
                                <span>*Jatuh Tempo</span>
                                <DatePicker
                                    value={dateTempo}
                                    onChange={(date) => setDateTempo(date)}
                                    sx={{ bgcolor: "white", borderRadius: 1, width: isMobile ? '40vw' : '25vw' }}
                                />
                            </Stack>
                        </Stack>
                        <Stack direction={'column'} gap={1}>
                            <span>Harga Ongkir</span>
                            <TextField
                                type="text"
                                size="medium"
                                defaultValue={'15.000'}
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
                        <ProdukList />
                        <Stack direction={isMobile ? 'column' : 'row'} alignItems={'center'} justifyContent={isMobile ? 'center' : 'flex-start'} gap={isMobile ? 5 : 3}>
                            <Stack direction={'column'} gap={1}>
                                <span>{'Note (Opsional)'}</span>
                                <TextField
                                    type="text"
                                    size="medium"
                                    placeholder={'Tambahkan Catatan'}
                                    sx={{ bgcolor: "#fff", width: isMobile ? '80vw' : '25vw' }}
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