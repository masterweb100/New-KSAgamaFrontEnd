import React, { useState } from "react";
import { toast } from 'react-toastify';
import {
    TablePagination,
    Box,
    TableSortLabel,
    TableHead,
    Table,
    TableBody,
    TableContainer,
    Stack,
    Icon,
    TextField,
    InputAdornment,
    Toolbar,
    CircularProgress
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import { FilterList } from "@mui/icons-material";
import { Colors } from "../../../../../utils/colors";
import NavigationBarUser from '../../../../../components/appBarUser';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { piutangData } from "../../dummy";
import { isMobile } from 'react-device-detect';
import moment from "moment";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../stores/rootReducer";
import secureLocalStorage from "react-secure-storage";
import { HTTPReportsPurchasingDebtByID } from "../../../../../apis/User/reports/purchase";
import { CENTER } from "../../../../../utils/stylesheet";

const columns = [
    { id: 'tanggal', label: 'Tanggal' },
    { id: 'jatuhtempo', label: 'Tanggal Jatuh Tempo' },
    { id: 'id', label: 'ID Pembelian' },
    { id: 'tempo', label: 'Belum Jatuh Tempo' },
    { id: 'sebulan', label: '1 Bulan' },
    { id: 'duabulan', label: '2 Bulan' },
    { id: 'tigabulan', label: '3 Bulan' },
    { id: 'empatbulan', label: '4 Bulan' },
    { id: 'tunggakan', label: 'Total Tunggakan' },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        textAlign: "center",
        fontWeight: '700'
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const UmurHutangDetailTable = () => {
    const PurchaseData = useSelector((state: RootState) => state.debtsData.data)
    const token = secureLocalStorage.getItem('USER_SESSION') as string
    const [page, setPage] = React.useState(0);
    const [itemsPerPage, setItemsPerPage] = React.useState(10);
    const [dateFrom, setDateFrom] = React.useState<any>(moment().startOf('month'));
    const [dateTo, setDateTo] = React.useState<any>(moment().endOf('month'));
    const [pagination, setPagination] = React.useState<any>({})
    const [init, setInit] = React.useState(false)
    const [DebtData, setDebtData] = React.useState<any>({})
    const [loader, setLoader] = React.useState(true)
    const [search, setSearch] = React.useState("")

    const handleSearch = (event: any) => {
        setSearch(event.target.value)
        setInit(!init)
    }

    const handleChangePage = (event: any, newPage: any) => {
        setPage(newPage);
        setInit(!init)
    };

    const handleChangeRowsPerPage = (event: any) => {
        setItemsPerPage(parseInt(event.target.value, 10));
        setPage(1);
        setInit(!init)
    };

    const GetDebtReport = async () => {
        setLoader(true)
        try {
            const resp = await HTTPReportsPurchasingDebtByID({
                from: moment(dateFrom).format('YYYY/MM/DD'),
                to: moment(dateTo).format('YYYY/MM/DD'),
                limit: itemsPerPage.toString(),
                page: page.toString(),
                q: search.length === 0 ? undefined : search,
                token: token,
                purchasingId: PurchaseData.id
            })
            setDebtData(resp.data.data)
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

    React.useEffect(() => { GetDebtReport() }, [init])

    return (
        <div style={{ display: 'flex' }}>
            <NavigationBarUser title={'Detail Umur Hutang'} isChild={true} name={'Lap. Penjualan & Pembelian'} idPanel={6}></NavigationBarUser>
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
                        <h2 style={{ margin: 0, width: '100%' }}>Umur Hutang</h2>
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
                <h3 style={{ margin: '20px 0' }}>{PurchaseData.name}</h3>
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
                        <p style={{ color: "#fff", fontWeight: 500, margin: 0 }}>Daftar Data Detail Overview Umur Hutang</p>
                    </Stack>
                    <TextField
                        type="search"
                        size="small"
                        placeholder="Cari..."
                        value={search}
                        onChange={handleSearch}
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
                <Box sx={{
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
                                        DebtData.items.length === 0 ?
                                            <div style={{ ...CENTER, padding: '20px 0' }}>
                                                <span>Tidak ada data</span>
                                            </div>
                                            :
                                            <TableContainer>
                                                <Table stickyHeader aria-label="sticky table">
                                                    <TableHead>
                                                        <TableRow>
                                                            {columns.map((column: any) => (
                                                                <StyledTableCell key={column.id}>
                                                                    <div style={{ whiteSpace: 'nowrap' }}>
                                                                        {column.label}
                                                                    </div>
                                                                </StyledTableCell>
                                                            ))}
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {DebtData.items.map((item: any, index: number) => {
                                                            return (
                                                                <TableRow
                                                                    key={index}
                                                                    sx={{ "&:hover": { bgcolor: Colors.inherit }, cursor: 'pointer' }}
                                                                >
                                                                    <StyledTableCell align="center">{moment(item.transactionDate).format('YYYY/MM/DD')}</StyledTableCell>
                                                                    <StyledTableCell align="center">{moment(item.dueDate).format('YYYY/MM/DD')}</StyledTableCell>
                                                                    <StyledTableCell align="center">{item.genId}</StyledTableCell>
                                                                    <StyledTableCell align="center">{(item.totalInDueDate).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</StyledTableCell>
                                                                    <StyledTableCell align="center">{(item.totalExceedOneMonth).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</StyledTableCell>
                                                                    <StyledTableCell align="center">{(item.totalExceedTwoMonth).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</StyledTableCell>
                                                                    <StyledTableCell align="center">{(item.totalExceedThreeMonth).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</StyledTableCell>
                                                                    <StyledTableCell align="center">{(item.totalExceedFourMonth).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</StyledTableCell>
                                                                    <StyledTableCell align="center">{(item.totalExceed).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</StyledTableCell>
                                                                </TableRow>
                                                            )
                                                        })
                                                        }
                                                        <TableRow sx={{ backgroundColor: '#f8f8f8' }}>
                                                            <StyledTableCell align="left">Total</StyledTableCell>
                                                            <StyledTableCell align="center">{' '}</StyledTableCell>
                                                            <StyledTableCell align="center">{' '}</StyledTableCell>
                                                            <StyledTableCell align="center">{(DebtData.totalInDueDate).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</StyledTableCell>
                                                            <StyledTableCell align="center">{(DebtData.totalExceedOneMonth).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</StyledTableCell>
                                                            <StyledTableCell align="center">{(DebtData.totalExceedTwoMonth).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</StyledTableCell>
                                                            <StyledTableCell align="center">{(DebtData.totalExceedThreeMonth).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</StyledTableCell>
                                                            <StyledTableCell align="center">{(DebtData.totalExceedFourMonth).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</StyledTableCell>
                                                            <StyledTableCell align="center">{(DebtData.totalExceed).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</StyledTableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                    }
                                </>
                        }
                    </Box>
                    {DebtData !== undefined && (
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
            </Box>
        </div>
    );
}

export default UmurHutangDetailTable;