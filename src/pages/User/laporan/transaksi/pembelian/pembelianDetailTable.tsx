import {
    Box, Toolbar, TablePagination,
    TableSortLabel, TableHead,
    Table, TableBody, TableContainer,
    Stack, Icon, TextField,
    InputAdornment
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
import PembelianDetailChildTable from './pembelianDetailChildTable';
import { isMobile } from 'react-device-detect';
import { CENTER } from '../../../../../utils/stylesheet';

const columns = [
    { id: "id", label: "ID Pembelian" },
    { id: "tanggal", label: "Tanggal" },
    { id: "nama", label: "Nama Supplier" },
    { id: "total", label: "Total" },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        textAlign: "center",
        // borderBottomWidth: 1,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

function descendingComparator(a: any, b: any, orderBy: any) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order: any, orderBy: any) {
    return order === "desc"
        ? (a: any, b: any) => descendingComparator(a, b, orderBy)
        : (a: any, b: any) => -descendingComparator(a, b, orderBy);
}

const sortedRowInformation = (rowArray: any, comparator: any) => {
    const stabilizedRowArray = rowArray.map((el: any, index: number) => [el, index]);
    stabilizedRowArray.sort((a: any, b: any) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedRowArray.map((el: any) => el[0]);
};

const PembelianDetailTable = () => {
    const [dateFrom, setDateFrom] = React.useState<any>(null);
    const [dateTo, setDateTo] = React.useState<any>(null);
    const [page, setPage] = React.useState(0);
    const [itemsPerPage, setItemsPerPage] = React.useState(10);

    const handleChangePage = (event: any, newPage: any) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: any) => {
        setItemsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const [orderdirection, setOrderDirection] = React.useState("asc");
    const [valuetoorderby, setValueToOrderBy] = React.useState("first_name");
    const createSortHandler = (property: any) => (event: any) => {
        handleRequestSort(event, property);
    };

    const handleRequestSort = (event: any, property: any) => {
        const isAscending = valuetoorderby === property && orderdirection === "asc";
        setValueToOrderBy(property);
        setOrderDirection(isAscending ? "desc" : "asc");
    };

    const [expanded, setExpanded] = React.useState<any>([null, false]);

    const handleChangePanel = (index: number) => {
        if (expanded[0] === index) {
            setExpanded([index, false]);
        } else {
            setExpanded([index, true]);
        }
    };

    return (
        <div style={{ display: 'flex' }}>
            <NavigationBarUser title={'Detail Pembelian'} isChild={true} name={'Lap. Penjualan & Pembelian'} idPanel={6}></NavigationBarUser>
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
                        <h2 style={{ margin: 0, width: '100%' }}>Detail Pembelian</h2>
                        <Stack direction={'row'} alignItems={'center'} gap={1} justifyContent={isMobile ? 'space-between' : 'flex-end'} width={'100%'}>
                            <DatePicker
                                value={dateFrom}
                                onChange={(date) => setDateFrom(date)}
                                sx={{ bgcolor: "white", borderRadius: 1, width: isMobile ? '40vw' : '15vw' }}
                            />
                            <Icon sx={{ color: Colors.secondary, fontSize: 25 }}>east</Icon>
                            <DatePicker
                                value={dateTo}
                                onChange={(date) => setDateTo(date)}
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
                            <p style={{ color: "#fff", fontWeight: 500, margin: 0 }}>Daftar Detail Pembelian</p>
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
                            <TableContainer>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell></StyledTableCell>
                                            {columns.map((column: any) => (
                                                <StyledTableCell key={column.id}>
                                                    <TableSortLabel
                                                        active={valuetoorderby === column.id}
                                                        direction={valuetoorderby === column.id ? "asc" : "desc"}
                                                        onClick={createSortHandler(column.id)}
                                                        sx={{
                                                            fontWeight: "bold",
                                                            whiteSpace: "nowrap",
                                                            "& .MuiTableSortLabel-icon": {
                                                                opacity: 1,
                                                                fontSize: 10,
                                                            },
                                                        }}
                                                        IconComponent={FilterList}
                                                    >
                                                        {column.label}
                                                    </TableSortLabel>
                                                </StyledTableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    {penjualanData !== undefined
                                        ? sortedRowInformation(
                                            penjualanData,
                                            getComparator(orderdirection, valuetoorderby))
                                            .slice(page * itemsPerPage, page * itemsPerPage + itemsPerPage)
                                            .map((item: any, index: number) => {
                                                return (
                                                    <TableBody key={index}>
                                                        <TableRow
                                                            role="checkbox"
                                                            tabIndex={-1}
                                                            sx={{ "&:hover": { bgcolor: Colors.inherit }, cursor: 'pointer', backgroundColor: expanded[0] === index && expanded[1] === true ? Colors.inherit : '#fff' }}
                                                            onClick={() => handleChangePanel(index)}
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
                                                            <StyledTableCell align="center">{item.tanggal}</StyledTableCell>
                                                            <StyledTableCell align="center">{item.id}</StyledTableCell>
                                                            <StyledTableCell align="center">PT. Sinar Maju Jaya</StyledTableCell>
                                                            <StyledTableCell align="center">{item.total}</StyledTableCell>
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
                                                                        <PembelianDetailChildTable />
                                                                    </StyledTableCell>
                                                                </TableRow>
                                                                :
                                                                null
                                                        }
                                                    </TableBody>
                                                )
                                            })
                                        : null}
                                </Table>
                            </TableContainer>
                        </Box>
                        <div style={{ backgroundColor: '#f8f8f8', padding: 20 }}>
                            <Stack direction={'row'} justifyContent={'space-between'}>
                                <div></div>
                                <Stack direction={'column'} gap={1}>
                                    <h3 style={{ margin: 0, textAlign: 'right' }}>Total Halaman Ini</h3>
                                    <Stack direction={'row'} gap={8}>
                                        <Stack direction={'column'} alignSelf={'flex-start'} gap={1}>
                                            <u><h3 style={{ margin: 0, textAlign: 'left' }}>Total</h3></u>
                                            <span style={{ textAlign: 'left' }}><b>Total Dibayar</b></span>
                                            <span style={{ textAlign: 'left' }}><b>Sisa Tagihan</b></span>
                                        </Stack>
                                        <Stack direction={'column'} alignSelf={'flex-start'} gap={1}>
                                            <u><h3 style={{ margin: 0, textAlign: 'left' }}>2.600.000</h3></u>
                                            <span style={{ textAlign: 'left' }}><b>2.400.000</b></span>
                                            <span style={{ textAlign: 'left' }}><b>100.000</b></span>
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </Stack>
                            <div style={{ width: '100%', backgroundColor: '#000', height: 1, margin: '10px 0' }}></div>
                            <Stack direction={'row'} justifyContent={'space-between'}>
                                <div></div>
                                <Stack direction={'column'} gap={1}>
                                    <h3 style={{ margin: 0, textAlign: 'right' }}>Total Semua Halaman</h3>
                                    <Stack direction={'row'} gap={8}>
                                        <Stack direction={'column'} alignSelf={'flex-start'} gap={1}>
                                            <u><h3 style={{ margin: 0, textAlign: 'left' }}>Total</h3></u>
                                            <span style={{ textAlign: 'left' }}><b>Total Dibayar</b></span>
                                            <span style={{ textAlign: 'left' }}><b>Sisa Tagihan</b></span>
                                        </Stack>
                                        <Stack direction={'column'} alignSelf={'flex-start'} gap={1}>
                                            <u><h3 style={{ margin: 0, textAlign: 'left' }}>2.600.000</h3></u>
                                            <span style={{ textAlign: 'left' }}><b>2.400.000</b></span>
                                            <span style={{ textAlign: 'left' }}><b>100.000</b></span>
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </div>
                        {penjualanData !== undefined && (
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, 100]}
                                component="div"
                                count={penjualanData.length}
                                rowsPerPage={itemsPerPage}
                                page={page}
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

export default PembelianDetailTable;