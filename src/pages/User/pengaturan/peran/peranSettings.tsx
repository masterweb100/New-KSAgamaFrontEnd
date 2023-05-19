import { Box, Stack, Toolbar, InputAdornment, TextField, Icon, FormControlLabel, Checkbox, AccordionDetails, AccordionSummary, Accordion } from '@mui/material';
import React from 'react'
import NavigationBarUser from '../../../../components/appBarUser';
import { Colors } from '../../../../utils/colors';
import { GudangList, PenjualanList, PembelianList, LaporanList, KontakList, PengaturanList } from '../dummy';
import { isMobile } from 'react-device-detect';
import { CENTER } from '../../../../utils/stylesheet';
import { useNavigate } from 'react-router-dom';

const PeranSettings = () => {
    const [expanded, setExpanded] = React.useState<string | false>(false);
    const navigate = useNavigate()

    const GoBack = () => {
        navigate(-1)
    }
    
    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    const [gudang, setGudang] = React.useState<any>({ produk: false, mutasi: false, list: false });
    const [penjualan, setPenjualan] = React.useState<any>({ penjualan: false, return: false });
    const [pembelian, setPembelian] = React.useState<any>({ pembelian: false, tracking: false });
    const [laporan, setLaporan] = React.useState<any>({ keuangan: false, transaksi: false });
    const [kontak, setKontak] = React.useState<any>({ pelanggan: false, supplier: false, ekspedisi: false });
    const [pengaturan, setPengaturan] = React.useState<any>({ toko: false, penomoran: false, peran: false });

    const handleGudangAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGudang({ produk: event.target.checked, mutasi: event.target.checked, list: event.target.checked })
    };
    const handleGudang = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGudang({ ...gudang, [event.target.name]: event.target.checked })
    };

    const handlePenjualanAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPenjualan({ penjualan: event.target.checked, return: event.target.checked })
    };
    const handlePenjualan = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPenjualan({ ...penjualan, [event.target.name]: event.target.checked })
    };

    const handlePembelianAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPembelian({ pembelian: event.target.checked, tracking: event.target.checked })
    };
    const handlePembelian = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPembelian({ ...pembelian, [event.target.name]: event.target.checked })
    };

    const handleLaporanAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLaporan({ keuangan: event.target.checked, transaksi: event.target.checked })
    };
    const handleLaporan = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLaporan({ ...laporan, [event.target.name]: event.target.checked })
    };

    const handleKontakAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        setKontak({ pelanggan: event.target.checked, supplier: event.target.checked, ekspedisi: event.target.checked })
    };
    const handleKontak = (event: React.ChangeEvent<HTMLInputElement>) => {
        setKontak({ ...kontak, [event.target.name]: event.target.checked })
    };

    const handlePengaturanAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPengaturan({ toko: event.target.checked, penomoran: event.target.checked, peran: event.target.checked })
    };

    const handlePengaturan = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPengaturan({ ...pengaturan, [event.target.name]: event.target.checked })
    };

    return (
        <div style={{ display: 'flex' }}>
            <NavigationBarUser title={'Pengaturan Peran'} isChild={true} name={'Peran'} idPanel={9}></NavigationBarUser>
            <Box component="main" sx={{ bgcolor: '#f4f5ff', p: isMobile ? 2 : 5, width: '100vw', minHeight: '100vh' }}>
                <Toolbar />
                <Stack
                    direction={isMobile ? "column" : "row"}
                    alignItems={"center"}
                    gap={3}
                    justifyContent={isMobile ? "center" : "space-between"}
                    sx={{
                        marginTop: 3,
                        paddingX: 4,
                        paddingY: 2,
                        backgroundColor: Colors.primary,
                        borderRadius: "10px 10px 0px 0px",
                    }}
                >
                    <Stack alignItems={"center"} gap={2} direction={"row"}>
                        <Icon sx={{ fontSize: 27, color: "#fff" }}>view_list</Icon>
                        <p style={{ color: "#fff", fontWeight: 500, margin: 0 }}>Admin</p>
                    </Stack>
                    <TextField
                        type="search"
                        size="small"
                        placeholder="Pencarian by Name"
                        sx={{ bgcolor: "white", borderRadius: 1, width: 300 }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Icon>search</Icon>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Stack>
                <div style={{ width: '100%', backgroundColor: '#fff', }}>
                    {/* GUDANG */}
                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                        <AccordionSummary expandIcon={<Icon>expand_more</Icon>}>
                            <FormControlLabel
                                label="Gudang"
                                control={
                                    <Checkbox
                                        sx={{ '&.Mui-checked': { color: Colors.primary } }}
                                        checked={gudang.produk && gudang.mutasi && gudang.list}
                                        onChange={handleGudangAll}
                                    />
                                }
                            />
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
                                {
                                    GudangList.map((item, index) => (
                                        <FormControlLabel
                                            key={index}
                                            label={item.label}
                                            control={
                                                <Checkbox
                                                    name={item.name}
                                                    checked={gudang[item.name]}
                                                    onChange={handleGudang}
                                                    sx={{ '&.Mui-checked': { color: Colors.primary } }}
                                                />
                                            }
                                        />
                                    ))
                                }
                            </Box>
                        </AccordionDetails>
                    </Accordion>

                    {/* PENJUALAN */}
                    <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                        <AccordionSummary expandIcon={<Icon>expand_more</Icon>}>
                            <FormControlLabel
                                label="Penjualan"
                                control={
                                    <Checkbox
                                        sx={{ '&.Mui-checked': { color: Colors.primary } }}
                                        checked={penjualan.penjualan && penjualan.return}
                                        onChange={handlePenjualanAll}
                                    />
                                }
                            />
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
                                {
                                    PenjualanList.map((item, index) => (
                                        <FormControlLabel
                                            key={index}
                                            label={item.label}
                                            control={
                                                <Checkbox
                                                    name={item.name}
                                                    checked={penjualan[item.name]}
                                                    onChange={handlePenjualan}
                                                    sx={{ '&.Mui-checked': { color: Colors.primary } }}
                                                />
                                            }
                                        />
                                    ))
                                }
                            </Box>
                        </AccordionDetails>
                    </Accordion>

                    {/* PEMBELIAN */}
                    <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                        <AccordionSummary expandIcon={<Icon>expand_more</Icon>}>
                            <FormControlLabel
                                label="Pembelian"
                                control={
                                    <Checkbox
                                        sx={{ '&.Mui-checked': { color: Colors.primary } }}
                                        checked={pembelian.pembelian && pembelian.tracking}
                                        onChange={handlePembelianAll}
                                    />
                                }
                            />
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
                                {
                                    PembelianList.map((item, index) => (
                                        <FormControlLabel
                                            key={index}
                                            label={item.label}
                                            control={
                                                <Checkbox
                                                    name={item.name}
                                                    checked={pembelian[item.name]}
                                                    onChange={handlePembelian}
                                                    sx={{ '&.Mui-checked': { color: Colors.primary } }}
                                                />
                                            }
                                        />
                                    ))
                                }
                            </Box>
                        </AccordionDetails>
                    </Accordion>

                    {/* LAPORAN */}
                    <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                        <AccordionSummary expandIcon={<Icon>expand_more</Icon>}>
                            <FormControlLabel
                                label="Laporan"
                                control={
                                    <Checkbox
                                        sx={{ '&.Mui-checked': { color: Colors.primary } }}
                                        checked={laporan.keuangan && laporan.transaksi}
                                        onChange={handleLaporanAll}
                                    />
                                }
                            />
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
                                {
                                    LaporanList.map((item, index) => (
                                        <FormControlLabel
                                            key={index}
                                            label={item.label}
                                            control={
                                                <Checkbox
                                                    name={item.name}
                                                    checked={laporan[item.name]}
                                                    onChange={handleLaporan}
                                                    sx={{ '&.Mui-checked': { color: Colors.primary } }}
                                                />
                                            }
                                        />
                                    ))
                                }
                            </Box>
                        </AccordionDetails>
                    </Accordion>

                    {/* KONTAK */}
                    <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                        <AccordionSummary expandIcon={<Icon>expand_more</Icon>}>
                            <FormControlLabel
                                label="Kontak"
                                control={
                                    <Checkbox
                                        sx={{ '&.Mui-checked': { color: Colors.primary } }}
                                        checked={kontak.pelanggan && kontak.supplier && kontak.ekspedisi}
                                        onChange={handleKontakAll}
                                    />
                                }
                            />
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
                                {
                                    KontakList.map((item, index) => (
                                        <FormControlLabel
                                            key={index}
                                            label={item.label}
                                            control={
                                                <Checkbox
                                                    name={item.name}
                                                    checked={kontak[item.name]}
                                                    onChange={handleKontak}
                                                    sx={{ '&.Mui-checked': { color: Colors.primary } }}
                                                />
                                            }
                                        />
                                    ))
                                }
                            </Box>
                        </AccordionDetails>
                    </Accordion>

                    {/* PENGATURAN */}
                    <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
                        <AccordionSummary expandIcon={<Icon>expand_more</Icon>}>
                            <FormControlLabel
                                label="Pengaturan"
                                control={
                                    <Checkbox
                                        sx={{ '&.Mui-checked': { color: Colors.primary } }}
                                        checked={pengaturan.toko && pengaturan.penomoran && pengaturan.peran}
                                        onChange={handlePengaturanAll}
                                    />
                                }
                            />
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
                                {
                                    PengaturanList.map((item, index) => (
                                        <FormControlLabel
                                            key={index}
                                            label={item.label}
                                            control={
                                                <Checkbox
                                                    name={item.name}
                                                    checked={pengaturan[item.name]}
                                                    onChange={handlePengaturan}
                                                    sx={{ '&.Mui-checked': { color: Colors.primary } }}
                                                />
                                            }
                                        />
                                    ))
                                }
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                    <Stack direction={'row'} alignItems={'center'} gap={2} padding={'20px'}>
                        <div onClick={GoBack} style={{ ...CENTER, borderRadius: 10, border: `1px solid ${Colors.primary}`, padding: '10px 30px', cursor: 'pointer' }}>
                            <span style={{ fontSize: 13, color: Colors.primary }}>BATAL</span>
                        </div>
                        <div style={{ ...CENTER, borderRadius: 10, backgroundColor: Colors.primary, padding: '10px 30px', cursor: 'pointer' }}>
                            <span style={{ fontSize: 13, color: '#fff' }}>SIMPAN</span>
                        </div>
                    </Stack>
                </div>
            </Box>
        </div>
    )
}

export default PeranSettings;