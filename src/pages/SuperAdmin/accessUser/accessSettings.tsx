import { Box, Stack, Toolbar, InputAdornment, TextField, Icon, FormControlLabel, Checkbox, AccordionDetails, AccordionSummary, Accordion, CircularProgress } from '@mui/material';
import React from 'react'
import NavigationBar from '../../../components/appBar';
import { Colors } from '../../../utils/colors';
import { GudangList, PenjualanList, PembelianList, LaporanList, KontakList, PengaturanList, ApprovalList } from '../../User/pengaturan/dummy';
import { isMobile } from 'react-device-detect';
import { useNavigate } from 'react-router-dom';
import { CENTER } from '../../../utils/stylesheet';
import { useSelector } from 'react-redux';
import { RootState } from '../../../stores/rootReducer';
import { HTTPRolePermissions } from '../../../apis/SuperAdmin/permissions';
import secureLocalStorage from 'react-secure-storage';
import { HTTPGetRoleID } from '../../../apis/SuperAdmin/role';

const AccessSettings = () => {
    const navigate = useNavigate()
    const RoleData = useSelector((state: RootState) => state.roleData.data)
    const [expanded, setExpanded] = React.useState<string | false>(false);
    const [onSend, setSend] = React.useState(false)
    const [init, setInit] = React.useState(false)

    const GoBack = () => {
        navigate(-1)
    }

    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    const [gudang, setGudang] = React.useState<any>({ DATA_PRODUK: false, MUTASI: false, LIST_PRODUK: false });
    const [penjualan, setPenjualan] = React.useState<any>({ PENJUALAN: false, RETURN: false });
    const [pembelian, setPembelian] = React.useState<any>({ PEMBELIAN: false, TRACKING: false });
    const [akun, setAkun] = React.useState<any>({ AKUN: false });
    const [laporan, setLaporan] = React.useState<any>({ LAP_KEUANGAN: false, LAP_PENJUALAN: false });
    const [approval, setApproval] = React.useState<any>({ APV_GUDANG: false, APV_PENJUALAN: false, APV_PEMBELIAN: false });
    const [kontak, setKontak] = React.useState<any>({ PELANGGAN: false, SUPPLIER: false, EKSPEDISI: false });
    const [pengaturan, setPengaturan] = React.useState<any>({ DATA_TOKO: false, PENOMORAN: false, PERAN: false });

    const handleGudangAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGudang({ DATA_PRODUK: event.target.checked, MUTASI: event.target.checked, LIST_PRODUK: event.target.checked })
    };
    const handleGudang = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGudang({ ...gudang, [event.target.name]: event.target.checked })
    };

    const handlePenjualanAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPenjualan({ PENJUALAN: event.target.checked, RETURN: event.target.checked })
    };
    const handlePenjualan = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPenjualan({ ...penjualan, [event.target.name]: event.target.checked })
    };

    const handlePembelianAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPembelian({ PEMBELIAN: event.target.checked, TRACKING: event.target.checked })
    };
    const handlePembelian = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPembelian({ ...pembelian, [event.target.name]: event.target.checked })
    };

    const handleAkunAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAkun({ AKUN: event.target.checked })
    };

    const handleLaporanAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLaporan({ LAP_KEUANGAN: event.target.checked, LAP_PENJUALAN: event.target.checked })
    };
    const handleLaporan = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLaporan({ ...laporan, [event.target.name]: event.target.checked })
    };

    const handleApprovalAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        setApproval({ APV_GUDANG: event.target.checked, APV_PENJUALAN: event.target.checked, APV_PEMBELIAN: event.target.checked })
    };
    const handleApproval = (event: React.ChangeEvent<HTMLInputElement>) => {
        setApproval({ ...approval, [event.target.name]: event.target.checked })
    };

    const handleKontakAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        setKontak({ PELANGGAN: event.target.checked, SUPPLIER: event.target.checked, EKSPEDISI: event.target.checked })
    };
    const handleKontak = (event: React.ChangeEvent<HTMLInputElement>) => {
        setKontak({ ...kontak, [event.target.name]: event.target.checked })
    };

    const handlePengaturanAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPengaturan({ DATA_TOKO: event.target.checked, PENOMORAN: event.target.checked, PERAN: event.target.checked })
    };
    const handlePengaturan = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPengaturan({ ...pengaturan, [event.target.name]: event.target.checked })
    };

    const Submit = async () => {
        setSend(true)
        try {
            const token = secureLocalStorage.getItem("TOKEN") as string
            const newObject = Object.assign(gudang, penjualan, pembelian, laporan, approval, kontak, pengaturan, akun)
            const objectKeys = Object.keys(newObject)
            const filtered = objectKeys.filter((key: any) => {
                return newObject[key]
            });
            console.log(filtered)
            const resp = await HTTPRolePermissions({
                permissions: filtered,
                roleId: RoleData.id,
                token: token
            })
            console.log(resp)
            setSend(false)
            navigate('/user-access')
        } catch (error) {
            setSend(false)
            console.log(error)
        }
    }

    const GetRoles = async () => {
        try {
            const resp = await HTTPGetRoleID({
                id: RoleData.id
            })
            if (resp.status === 200) {
                let objGudang: any = {}
                let objPenjualan: any = {}
                let objPembelian: any = {}
                let objAkun: any = {}
                let objLaporan: any = {}
                let objApproval: any = {}
                let objKontak: any = {}
                let objPengaturan: any = {}
                for (let i = 0; i < resp.data.data.permissions.length; i++) {
                    const item = resp.data.data.permissions[i].permissionName;
                    if (item === 'DATA_PRODUK' || item === 'MUTASI' || item === 'LIST_PRODUK') {
                        objGudang = Object.assign(objGudang, { [item]: true })
                    } else if (item === 'PENJUALAN' || item === 'RETURN') {
                        objPenjualan = Object.assign(objPenjualan, { [item]: true })
                    } else if (item === 'PEMBELIAN' || item === 'TRACKING') {
                        objPembelian = Object.assign(objPembelian, { [item]: true })
                    } else if (item === 'AKUN') {
                        objAkun = Object.assign(objAkun, { [item]: true })
                    } else if (item === 'LAP_KEUANGAN' || item === 'LAP_PENJUALAN') {
                        objLaporan = Object.assign(objLaporan, { [item]: true })
                    } else if (item === 'PELANGGAN' || item === 'SUPPLIER' || item === 'EKSPEDISI') {
                        objKontak = Object.assign(objKontak, { [item]: true })
                    } else if (item === 'APV_GUDANG' || item === 'APV_PENJUALAN' || item === 'APV_PEMBELIAN') {
                        objApproval = Object.assign(objApproval, { [item]: true })
                    } else if (item === 'DATA_TOKO' || item === 'PENOMORAN' || item === 'PERAN') {
                        objPengaturan = Object.assign(objPengaturan, { [item]: true })
                    } else {
                        console.log('Ga ada')
                    }
                }
                setGudang(objGudang)
                setPenjualan(objPenjualan)
                setPembelian(objPembelian)
                setAkun(objAkun)
                setLaporan(objLaporan)
                setApproval(objApproval)
                setKontak(objKontak)
                setPengaturan(objPengaturan)
            }
        } catch (error) {
            console.log(error)
        }
    }

    React.useEffect(() => { GetRoles() }, [init])

    return (
        <div style={{ display: 'flex' }}>
            <NavigationBar title={'Pengaturan'} indexNav={4} isChild={true}></NavigationBar>
            <Box component="main" sx={{ bgcolor: '#f4f5ff', p: isMobile ? 2 : 5, width: '100vw', minHeight: '100vh' }}>
                <Toolbar />
                <Stack
                    direction={isMobile ? "column" : "row"}
                    alignItems={"center"}
                    gap={3}
                    justifyContent={"space-between"}
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
                        <p style={{ color: "#fff", fontWeight: 500, margin: 0 }}>{RoleData.roleName}</p>
                    </Stack>
                </Stack>
                <div style={{ width: '100%', backgroundColor: '#fff', }}>
                    {/* GUDANG */}
                    <Accordion expanded={true} elevation={0}>
                        <AccordionSummary>
                            <FormControlLabel
                                label="Gudang"
                                control={
                                    <Checkbox
                                        sx={{ '&.Mui-checked': { color: Colors.primary } }}
                                        checked={gudang.DATA_PRODUK && gudang.MUTASI && gudang.LIST_PRODUK}
                                        onChange={handleGudangAll}
                                    />
                                }
                            />
                        </AccordionSummary>
                        <AccordionDetails sx={{ padding: 0 }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', ml: 5 }}>
                                {
                                    GudangList.map((item, index) => (
                                        <FormControlLabel
                                            key={index}
                                            label={item.label}
                                            control={
                                                <Checkbox
                                                    name={item.value}
                                                    checked={gudang[item.value]}
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
                    <Accordion expanded={true} elevation={0}>
                        <AccordionSummary>
                            <FormControlLabel
                                label="Penjualan"
                                control={
                                    <Checkbox
                                        sx={{ '&.Mui-checked': { color: Colors.primary } }}
                                        checked={penjualan.PENJUALAN && penjualan.RETURN}
                                        onChange={handlePenjualanAll}
                                    />
                                }
                            />
                        </AccordionSummary>
                        <AccordionDetails sx={{ padding: 0 }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', ml: 5 }}>
                                {
                                    PenjualanList.map((item, index) => (
                                        <FormControlLabel
                                            key={index}
                                            label={item.label}
                                            control={
                                                <Checkbox
                                                    name={item.value}
                                                    checked={penjualan[item.value]}
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
                    <Accordion expanded={true} elevation={0}>
                        <AccordionSummary>
                            <FormControlLabel
                                label="Pembelian"
                                control={
                                    <Checkbox
                                        sx={{ '&.Mui-checked': { color: Colors.primary } }}
                                        checked={pembelian.PEMBELIAN && pembelian.TRACKING}
                                        onChange={handlePembelianAll}
                                    />
                                }
                            />
                        </AccordionSummary>
                        <AccordionDetails sx={{ padding: 0 }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', ml: 5 }}>
                                {
                                    PembelianList.map((item, index) => (
                                        <FormControlLabel
                                            key={index}
                                            label={item.label}
                                            control={
                                                <Checkbox
                                                    name={item.value}
                                                    checked={pembelian[item.value]}
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

                    {/* AKUN */}
                    <div style={{ padding: 15 }}>
                        <FormControlLabel
                            label="Akun"
                            control={
                                <Checkbox
                                    sx={{ '&.Mui-checked': { color: Colors.primary } }}
                                    checked={akun.AKUN}
                                    onChange={handleAkunAll}
                                />
                            }
                        />
                    </div>

                    {/* LAPORAN */}
                    <Accordion expanded={true} elevation={0}>
                        <AccordionSummary>
                            <FormControlLabel
                                label="Laporan"
                                control={
                                    <Checkbox
                                        sx={{ '&.Mui-checked': { color: Colors.primary } }}
                                        checked={laporan.LAP_KEUANGAN && laporan.LAP_PENJUALAN}
                                        onChange={handleLaporanAll}
                                    />
                                }
                            />
                        </AccordionSummary>
                        <AccordionDetails sx={{ padding: 0 }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', ml: 5 }}>
                                {
                                    LaporanList.map((item, index) => (
                                        <FormControlLabel
                                            key={index}
                                            label={item.label}
                                            control={
                                                <Checkbox
                                                    name={item.value}
                                                    checked={laporan[item.value]}
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

                    {/* APPROVAL */}
                    <Accordion expanded={true} elevation={0}>
                        <AccordionSummary>
                            <FormControlLabel
                                label="Approval"
                                control={
                                    <Checkbox
                                        sx={{ '&.Mui-checked': { color: Colors.primary } }}
                                        checked={approval.APV_GUDANG && approval.APV_PENJUALAN && approval.APV_PEMBELIAN}
                                        onChange={handleApprovalAll}
                                    />
                                }
                            />
                        </AccordionSummary>
                        <AccordionDetails sx={{ padding: 0 }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', ml: 5 }}>
                                {
                                    ApprovalList.map((item, index) => (
                                        <FormControlLabel
                                            key={index}
                                            label={item.label}
                                            control={
                                                <Checkbox
                                                    name={item.value}
                                                    checked={approval[item.value]}
                                                    onChange={handleApproval}
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
                    <Accordion expanded={true} elevation={0}>
                        <AccordionSummary>
                            <FormControlLabel
                                label="Kontak"
                                control={
                                    <Checkbox
                                        sx={{ '&.Mui-checked': { color: Colors.primary } }}
                                        checked={kontak.PELANGGAN && kontak.SUPPLIER && kontak.EKSPEDISI}
                                        onChange={handleKontakAll}
                                    />
                                }
                            />
                        </AccordionSummary>
                        <AccordionDetails sx={{ padding: 0 }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', ml: 5 }}>
                                {
                                    KontakList.map((item, index) => (
                                        <FormControlLabel
                                            key={index}
                                            label={item.label}
                                            control={
                                                <Checkbox
                                                    name={item.value}
                                                    checked={kontak[item.value]}
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
                    <Accordion expanded={true} elevation={0}>
                        <AccordionSummary>
                            <FormControlLabel
                                label="Pengaturan"
                                control={
                                    <Checkbox
                                        sx={{ '&.Mui-checked': { color: Colors.primary } }}
                                        checked={pengaturan.DATA_TOKO && pengaturan.PENOMORAN && pengaturan.PERAN}
                                        onChange={handlePengaturanAll}
                                    />
                                }
                            />
                        </AccordionSummary>
                        <AccordionDetails sx={{ padding: 0 }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', ml: 5 }}>
                                {
                                    PengaturanList.map((item, index) => (
                                        <FormControlLabel
                                            key={index}
                                            label={item.label}
                                            control={
                                                <Checkbox
                                                    name={item.value}
                                                    checked={pengaturan[item.value]}
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
                        <div onClick={Submit} style={{ ...CENTER, borderRadius: 10, backgroundColor: Colors.primary, padding: '10px 30px', cursor: 'pointer' }}>
                            {
                                onSend === true ?
                                    <CircularProgress size={20} color={'inherit'} />
                                    :
                                    <span style={{ fontSize: 13, color: '#fff' }}>SIMPAN</span>
                            }
                        </div>
                    </Stack>
                </div>
            </Box>
        </div>
    )
}

export default AccessSettings;