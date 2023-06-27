import React, { useState } from "react";
import { toast } from 'react-toastify';
import {
    TablePagination,
    Box,
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
import { Colors } from "../../../../../utils/colors";
import NavigationBarUser from '../../../../../components/appBarUser';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { isMobile } from 'react-device-detect';
import secureLocalStorage from "react-secure-storage";
import moment from "moment";
import { HTTPReportsPurchasingProduct } from "../../../../../apis/User/reports/purchase";
import { CENTER } from "../../../../../utils/stylesheet";

const columns = [
    { id: 'jenis', label: 'Jenis Produk' },
    // { id: 'id', label: 'ID SKU' },
    { id: 'harga', label: 'Harga Saat Ini' },
    { id: 'jumlah', label: 'Jumlah Dibeli' },
    { id: 'total', label: 'Total' },
    { id: 'average', label: 'Rata - Rata' },
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

const PembelianProdukTable = () => {
    const token = secureLocalStorage.getItem('USER_SESSION') as string
    const [page, setPage] = React.useState(1);
    const [itemsPerPage, setItemsPerPage] = React.useState(10);
    const [dateFrom, setDateFrom] = React.useState<any>(moment().startOf('month'));
    const [dateTo, setDateTo] = React.useState<any>(moment().endOf('month'));
    const [pagination, setPagination] = React.useState<any>({})
    const [init, setInit] = React.useState(false)
    const [ProductsData, setProductsData] = React.useState([])
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

    const GetProductsReport = async () => {
        setLoader(true)
        try {
            const resp = await HTTPReportsPurchasingProduct({
                from: moment(dateFrom).format('YYYY/MM/DD'),
                to: moment(dateTo).format('YYYY/MM/DD'),
                limit: itemsPerPage.toString(),
                page: page.toString(),
                q: search.length === 0 ? undefined : search,
                token: token
            })
            setProductsData(resp.data.data)
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

    React.useEffect(() => { GetProductsReport() }, [init])

    return (
        <div style={{ display: 'flex' }}>
            <NavigationBarUser title={'Pembelian Per Produk'} isChild={true} name={'Lap. Penjualan & Pembelian'} idPanel={6}></NavigationBarUser>
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
                        <h2 style={{ margin: 0, width: '100%' }}>Pembelian Per Produk</h2>
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
                        <p style={{ color: "#fff", fontWeight: 500, margin: 0 }}>Daftar Data Detail Pembelian Per Produk</p>
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
                                        ProductsData.length === 0 ?
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
                                                                    {column.label}
                                                                </StyledTableCell>
                                                            ))}
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {ProductsData.map((item: any, index: number) => {
                                                            return (
                                                                <TableRow
                                                                    role="checkbox"
                                                                    tabIndex={-1}
                                                                    key={index}
                                                                    sx={{ "&:hover": { bgcolor: Colors.inherit }, cursor: 'pointer' }}
                                                                >
                                                                    <StyledTableCell align="center">{item.productTypeName}</StyledTableCell>
                                                                    <StyledTableCell align="center">{(item.sellPriceInPcs).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</StyledTableCell>
                                                                    <StyledTableCell align="center">{item.totalQty}</StyledTableCell>
                                                                    <StyledTableCell align="center">{(item.totalPrice).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</StyledTableCell>
                                                                    <StyledTableCell align="center">{(item.averageTotalPrice).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</StyledTableCell>
                                                                </TableRow>
                                                            )
                                                        })
                                                        }
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                    }
                                </>
                        }
                    </Box>
                    {ProductsData !== undefined && (
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

export default PembelianProdukTable;