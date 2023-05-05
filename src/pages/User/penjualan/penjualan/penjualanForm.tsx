import React from 'react';
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

const PenjualanForm = () => {
    const navigate = useNavigate()
    const { action }: any = useParams()

    const [pelanggan, setPelanggan] = React.useState('');
    const [penjualan, setPenjualan] = React.useState('');
    const [ekspedisi, setEkspedisi] = React.useState('');
    const [dateTransaksi, setDateTransaksi] = React.useState<any>(null);
    const [dateTempo, setDateTempo] = React.useState<any>(null);
    const [datePengiriman, setDatePengiriman] = React.useState<any>(null);
    const [isPelangganOpen, setPelangganOpen] = React.useState(false);
    const [isEkspedisiOpen, setEkspedisiOpen] = React.useState(false);

    const handleChangePelanggan = (event: SelectChangeEvent) => {
        setPelanggan(event.target.value as string);
    };

    const handleChangePenjualan = (event: SelectChangeEvent) => {
        setPenjualan(event.target.value as string);
    };

    const handleChangeEkspedisi = (event: SelectChangeEvent) => {
        setEkspedisi(event.target.value as string);
    };

    const GoBack = () => {
        navigate(-1)
    }

    const AddPelanggan = React.useCallback(() => setPelangganOpen(true), [])
    const AddEkspedisi = React.useCallback(() => setEkspedisiOpen(true), [])

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
                                    value={pelanggan}
                                    displayEmpty
                                    sx={{ bgcolor: "white", width: isMobile ? '40vw' : '25vw', color: '#000', }}
                                    onChange={handleChangePelanggan}
                                    MenuProps={{ style: { height: 300 } }}
                                    renderValue={(selected: any) => {
                                        if (selected.length === 0) {
                                            return <span style={{ color: '#a7a5a6' }}>Pelanggan</span>;
                                        }
                                        return selected
                                    }}
                                >
                                    {
                                        [...Array(30)].map((item, index) => (
                                            <MenuItem key={index} value={index === 0 ? '' : 'Pelanggan ' + (index + 1)}>
                                                {
                                                    index === 0 ?
                                                        <div onClick={AddPelanggan} style={{ ...CENTER, padding: '7px 0px', border: `1px solid #000`, borderRadius: 5, cursor: 'pointer', alignSelf: 'flex-start', width: '100%' }}>
                                                            <span style={{ color: '#000', fontSize: 13 }}>+ Tambah Data Pelanggan</span>
                                                        </div>
                                                        :
                                                        <span>Pelanggan {index + 1}</span>
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
                                    defaultValue={'INV/0002'}
                                    sx={{ bgcolor: "#f4f4f4", width: isMobile ? '40vw' : '25vw' }}
                                />
                            </Stack>
                        </Stack>
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} gap={isMobile ? 2 : 3}>
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
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} gap={isMobile ? 2 : 3}>
                            <Stack direction={'column'} gap={1}>
                                <span>Referensi</span>
                                <TextField
                                    type="text"
                                    size="medium"
                                    defaultValue={'Nama Referensi'}
                                    sx={{ bgcolor: "#fff", width: isMobile ? '40vw' : '25vw' }}
                                />
                            </Stack>
                            <Stack direction={'column'} gap={1}>
                                <span>*Tanggal Pengiriman</span>
                                <DatePicker
                                    value={datePengiriman}
                                    onChange={(date) => setDatePengiriman(date)}
                                    sx={{ bgcolor: "white", borderRadius: 1, width: isMobile ? '40vw' : '25vw' }}
                                />
                            </Stack>
                        </Stack>
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} gap={isMobile ? 2 : 3}>
                            <Stack direction={'column'} gap={1}>
                                <span>*Jenis Penjualan</span>
                                <Select
                                    size="medium"
                                    value={penjualan}
                                    displayEmpty
                                    sx={{ bgcolor: "white", width: isMobile ? '40vw' : '25vw', color: '#000' }}
                                    onChange={handleChangePenjualan}
                                    renderValue={(selected: any) => {
                                        if (selected.length === 0) {
                                            return <span style={{ color: '#a7a5a6' }}>Retail / Besar</span>;
                                        }
                                        return selected
                                    }}
                                >
                                    {
                                        ['Retail', 'Besar'].map((item, index) => (
                                            <MenuItem key={index} value={item}>{item}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </Stack>
                            <Stack direction={'column'} gap={1}>
                                <span>Ekspedisi</span>
                                <Select
                                    size="medium"
                                    value={ekspedisi}
                                    displayEmpty
                                    sx={{ bgcolor: "white", width: isMobile ? '40vw' : '25vw', color: '#000' }}
                                    onChange={handleChangeEkspedisi}
                                    MenuProps={{ style: { height: 300 } }}
                                    renderValue={(selected: any) => {
                                        if (selected.length === 0) {
                                            return <span style={{ color: '#a7a5a6' }}>Nama Ekspedisi</span>;
                                        }
                                        return selected
                                    }}
                                >
                                    {
                                        [...Array(30)].map((item, index) => (
                                            <MenuItem key={index} value={index === 0 ? '' : 'Ekspedisi ' + (index + 1)}>
                                                {
                                                    index === 0 ?
                                                        <div onClick={AddEkspedisi} style={{ ...CENTER, padding: '7px 0px', border: `1px solid #000`, borderRadius: 5, cursor: 'pointer', alignSelf: 'flex-start', width: '100%' }}>
                                                            <span style={{ color: '#000', fontSize: 13 }}>+ Tambah Data Ekspedisi</span>
                                                        </div>
                                                        :
                                                        <span>Ekspedisi {index + 1}</span>
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
                            <Stack direction={'column'} gap={1}>
                                <span>No. Resi</span>
                                <TextField
                                    type="text"
                                    size="medium"
                                    placeholder='No. Resi diisi setelah mendapatkan Resi dari Ekspedisi'
                                    sx={{ bgcolor: "#fff", width: isMobile ? '40vw' : '25vw' }}
                                />
                            </Stack>
                        </Stack>
                        {/* ///////////////////////////////////////// */}
                        <h2 style={{ color: '#000' }}>Data Produk</h2>
                        <ProdukList />
                        <Stack direction={isMobile ? 'column' : 'row'} alignItems={'center'} justifyContent={isMobile ? 'center' : 'flex-start'} gap={isMobile ? 4 : 3}>
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
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} gap={2} marginTop={5}>
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
            <PelangganDialog isOpen={isPelangganOpen} setOpen={() => setPelangganOpen(false)} />
            <EkspedisiDialog isOpen={isEkspedisiOpen} setOpen={() => setEkspedisiOpen(false)} />
        </div>
    )
}

export default PenjualanForm;