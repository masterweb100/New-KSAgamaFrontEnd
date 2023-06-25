import {
    Box, Toolbar, TablePagination,
    TableSortLabel, TableHead,
    Table, TableBody, TableContainer,
    Stack, Icon, TextField,
    InputAdornment,
    CircularProgress
} from '@mui/material';
import React from 'react'
import NavigationBarUser from '../../../../../components/appBarUser';
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import { FilterList } from "@mui/icons-material";
import { Colors } from "../../../../../utils/colors";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { penjualanData } from '../../dummy';
import PembelianSupplierChildTable from './pembelianSupplierChildTable';
import { isMobile } from 'react-device-detect';
import { CENTER } from '../../../../../utils/stylesheet';
import secureLocalStorage from 'react-secure-storage';
import moment from 'moment';
import { HTTPReportsPurchasingSupplier, HTTPReportsPurchasingSupplierByID } from '../../../../../apis/User/reports/purchase';
import { toast } from 'react-toastify';

const columns = [
    { id: "pelanggan", label: "Nama Supplier" },
    { id: "perusahaan", label: "Perusahaan" },
    { id: "total", label: "Total Transaksi" },
    { id: "pendapatan", label: "Total" },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        textAlign: "left",
        fontWeight: '700'
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const PembelianSupplierTable = () => {
    const token = secureLocalStorage.getItem('USER_SESSION') as string
    const [dateFrom, setDateFrom] = React.useState<any>(moment().startOf('month'));
    const [dateTo, setDateTo] = React.useState<any>(moment().endOf('month'));
    const [page, setPage] = React.useState(1);
    const [itemsPerPage, setItemsPerPage] = React.useState(10);
    const [expanded, setExpanded] = React.useState<any>([null, false]);
    const [init, setInit] = React.useState(false)
    const [SupplierData, setSupplierData] = React.useState([])
    const [pagination, setPagination] = React.useState<any>({})
    const [loader, setLoader] = React.useState(true)
    const [childLoader, setChildLoader] = React.useState(true)
    const [SelectedData, setSelectedData] = React.useState([])

    const handleChangePage = (event: any, newPage: any) => {
        setPage(newPage);
        setInit(!init)
    };

    const handleChangeRowsPerPage = (event: any) => {
        setItemsPerPage(parseInt(event.target.value, 10));
        setPage(1);
        setInit(!init)
    };

    const handleChangePanel = React.useCallback((index: number, id: string) => {
        if (expanded[0] === index) {
            setExpanded([null, false]);
            setSelectedData([])
        } else {
            setExpanded([index, true]);
            GetSupplierProducts(id)
        }
    }, [expanded[0]]);

    const GetSupplierReports = async () => {
        setLoader(true)
        try {
            const resp = await HTTPReportsPurchasingSupplier({
                from: moment(dateFrom).format('YYYY/MM/DD'),
                to: moment(dateTo).format('YYYY/MM/DD'),
                limit: itemsPerPage.toString(),
                page: page.toString(),
                q: undefined,
                token: token
            })
            setSupplierData(resp.data.data)
            setPagination(resp.data.pagination)
            setLoader(false)
        } catch (error: any) {
            setLoader(false)
            if (error.status === 500) {
                toast.error('Server sedang mengalami gangguan!')
            } else {
                toast.error('Terjadi Kesalahan!')
            };
        }
    }

    React.useEffect(() => { GetSupplierReports() }, [init])

    const GetSupplierProducts = async (supplierId: string) => {
        setChildLoader(true)
        try {
            const resp = await HTTPReportsPurchasingSupplierByID({
                supplierId: supplierId,
                token: token
            })
            setSelectedData(resp.data.data)
            setChildLoader(false)
        } catch (error: any) {
            setChildLoader(false)
            if (error.status === 500) {
                toast.error('Server sedang mengalami gangguan!')
            } else {
                toast.error('Terjadi Kesalahan!')
            };
        }
    }

    return (
        <div style={{ display: 'flex' }}>
            <NavigationBarUser title={'Pembelian Per Supplier'} isChild={true} name={'Lap. Penjualan & Pembelian'} idPanel={6}></NavigationBarUser>
            <Box component="main" sx={{ bgcolor: '#f4f5ff', p: isMobile ? 2 : 5, width: '100vw', minHeight: '100vh' }}>
                <Toolbar />
                <div style={{ maxWidth: isMobile ? '100vw' : '78vw' }}>
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-end'} gap={2}>
                        <div style={{ backgroundColor: '#fff', padding: '7px 15px', borderRadius: 5, border: `1px solid ${Colors.error}` }}>
                            <Stack direction={'row'} alignItems={'center'} gap={1}>
                                <Icon sx={{ color: Colors.error, fontSize: 20 }}>file_download</Icon>
                                <span style={{ fontSize: 13, color: Colors.error }}>PDF</span>
                            </Stack>
                        </div>
                        <div style={{ backgroundColor: '#fff', padding: '7px 15px', borderRadius: 5, border: `1px solid ${Colors.success}` }}>
                            <Stack direction={'row'} alignItems={'center'} gap={1}>
                                <Icon sx={{ color: Colors.success, fontSize: 20 }}>file_download</Icon>
                                <span style={{ fontSize: 13, color: Colors.success }}>Excel</span>
                            </Stack>
                        </div>
                    </Stack>
                    <Stack direction={isMobile ? 'column' : 'row'} gap={3} alignItems={isMobile ? 'flex-start' : 'center'} justifyContent={'space-between'} sx={{ marginTop: 3 }}>
                        <h2 style={{ margin: 0, width: '100%' }}>Pembelian Per Supplier</h2>
                        <Stack direction={'row'} alignItems={'center'} gap={1} justifyContent={isMobile ? 'space-between' : 'flex-end'} width={'100%'}>
                            <DatePicker
                                value={dateFrom}
                                onChange={(date) => { setDateFrom(date); setDateTo(null) }}
                                sx={{ bgcolor: "white", borderRadius: 1, width: isMobile ? '40vw' : '15vw' }}
                            />
                            <Icon sx={{ color: Colors.secondary, fontSize: 25 }}>east</Icon>
                            <DatePicker
                                value={dateTo}
                                onChange={(date) => { setDateTo(date); setInit(!init) }}
                                sx={{ bgcolor: "white", borderRadius: 1, width: isMobile ? '40vw' : '15vw' }}
                            />
                        </Stack>
                    </Stack>
                </div>
                <div>
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
                            <p style={{ color: "#fff", fontWeight: 500, margin: 0 }}>Daftar Data Detail Pembelian Per Supplier</p>
                        </Stack>
                        <TextField
                            type="search"
                            size="small"
                            placeholder="Pencarian by ID"
                            sx={{ bgcolor: "white", borderRadius: 1, width: isMobile ? '90%' : '20vw' }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Icon>search</Icon>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Stack>
                    <Box
                        sx={{
                            overflow: "auto",
                            bgcolor: "white",
                            border: 1,
                            borderColor: Colors.secondary,
                            borderBottomLeftRadius: 5,
                            borderBottomRightRadius: 5,
                        }}
                    >
                        <Box sx={{ border: 1, borderColor: Colors.secondary }}>
                            {
                                loader ?
                                    <div style={{ ...CENTER, backgroundColor: '#fff', padding: 20 }}>
                                        <CircularProgress size={40} color={'error'} />
                                    </div>
                                    :
                                    <>
                                        {
                                            SupplierData.length === 0 ?
                                                <div style={{ ...CENTER, padding: '20px 0' }}>
                                                    <span>Tidak ada data</span>
                                                </div>
                                                :
                                                <TableContainer>
                                                    <Table stickyHeader aria-label="sticky table">
                                                        <TableHead>
                                                            <TableRow>
                                                                <StyledTableCell>
                                                                    <div style={{ width: 50 }}></div>
                                                                </StyledTableCell>
                                                                {columns.map((column: any) => (
                                                                    <StyledTableCell key={column.id}>
                                                                        <div style={{ width: 120 }}>
                                                                            {column.label}
                                                                        </div>
                                                                    </StyledTableCell>
                                                                ))}
                                                            </TableRow>
                                                        </TableHead>
                                                        {SupplierData.map((item: any, index: number) => {
                                                            return (
                                                                <TableBody key={index}>
                                                                    <TableRow
                                                                        role="checkbox"
                                                                        tabIndex={-1}
                                                                        sx={{ "&:hover": { bgcolor: Colors.inherit }, cursor: 'pointer', backgroundColor: expanded[0] === index && expanded[1] === true ? Colors.inherit : '#fff' }}
                                                                        onClick={() => handleChangePanel(index, item.id)}
                                                                    >
                                                                        <StyledTableCell align="center">
                                                                            <div style={{ width: 30, height: 30, border: '2px solid #ababab', borderRadius: 10, ...CENTER }}>
                                                                                {
                                                                                    expanded[0] === index && expanded[1] === true ?
                                                                                        <Icon sx={{ fontSize: 25, color: '#909090' }}>remove</Icon>
                                                                                        :
                                                                                        <Icon sx={{ fontSize: 25, color: '#909090' }}>add</Icon>
                                                                                }
                                                                            </div>
                                                                        </StyledTableCell>
                                                                        <StyledTableCell>{item.name}</StyledTableCell>
                                                                        <StyledTableCell>{item.company}</StyledTableCell>
                                                                        <StyledTableCell>{item.totalTransaction}</StyledTableCell>
                                                                        <StyledTableCell>{(item.revenue).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</StyledTableCell>
                                                                    </TableRow>
                                                                    {
                                                                        expanded[0] === index && expanded[1] === true ?
                                                                            <TableRow>
                                                                                <StyledTableCell
                                                                                    align="center"
                                                                                    colSpan={5}
                                                                                    sx={{
                                                                                        backgroundColor: '#f8f8f8',
                                                                                        padding: '3%',
                                                                                    }}
                                                                                >
                                                                                    <PembelianSupplierChildTable data={SelectedData} loader={childLoader} />
                                                                                </StyledTableCell>
                                                                            </TableRow>
                                                                            :
                                                                            null
                                                                    }
                                                                </TableBody>
                                                            )
                                                        })
                                                        }
                                                        <TableRow sx={{ backgroundColor: '#f8f8f8' }}>
                                                            <TableCell align="left">
                                                                <span style={{ fontWeight: '500', fontSize: '1.2em' }}>Total</span>
                                                            </TableCell>
                                                            <TableCell align="center">{' '}</TableCell>
                                                            <TableCell align="center">{' '}</TableCell>
                                                            <TableCell align="center">{' '}</TableCell>
                                                            <TableCell align="center"><b style={{ fontSize: '1.2em' }}>5.200.000</b></TableCell>
                                                        </TableRow>
                                                    </Table>
                                                </TableContainer>
                                        }
                                    </>
                            }
                        </Box>
                        {SupplierData !== undefined && (
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={pagination.totalItem === undefined ? 0 : pagination.totalItem}
                                rowsPerPage={itemsPerPage}
                                page={page - 1}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        )}
                    </Box>
                </div>
            </Box>
        </div>
    )
}

export default PembelianSupplierTable;