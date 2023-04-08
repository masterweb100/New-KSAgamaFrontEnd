import React, { useState } from "react";
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
    Toolbar
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

const columns = [
    { id: 'tanggal', label: 'Tanggal' },
    { id: 'jatuhtempo', label: 'Tanggal Jatuh Tempo' },
    { id: 'id', label: 'ID Pembelian' },
    { id: 'less1bulan', label: '< 1 Bulan' },
    { id: 'sebulan', label: '1 Bulan' },
    { id: 'duabulan', label: '2 Bulan' },
    { id: 'tigabulan', label: '3 Bulan' },
    { id: 'more3bulan', label: '> 3 Bulan' },
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

const UmurHutangDetailTable = (props: any) => {
    const [page, setPage] = React.useState(0);
    const [itemsPerPage, setItemsPerPage] = React.useState(5);
    const [dateFrom, setDateFrom] = React.useState<any>(null);
    const [dateTo, setDateTo] = React.useState<any>(null);

    const handleChangePage = (event: any, newPage: any) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: any) => {
        setItemsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const [orderdirection, setOrderDirection] = useState("asc");
    const [valuetoorderby, setValueToOrderBy] = useState("first_name");
    const createSortHandler = (property: any) => (event: any) => {
        handleRequestSort(event, property);
    };

    const handleRequestSort = (event: any, property: any) => {
        const isAscending = valuetoorderby === property && orderdirection === "asc";
        setValueToOrderBy(property);
        setOrderDirection(isAscending ? "desc" : "asc");
    };

    return (
        <div style={{ display: 'flex' }}>
            <NavigationBarUser title={'Detail Umur Hutang'} isChild={true} name={'Lap. Penjualan & Pembelian'} idPanel={6}></NavigationBarUser>
            <Box component="main" sx={{ bgcolor: '#f4f5ff', p: isMobile ? 3 : 5, width: '100vw', minHeight: '100vh' }}>
                <Toolbar />
                <div>
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
                <h3 style={{ margin: '20px 0' }}>PT. Sinar Maju Jaya</h3>
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
                        <TableContainer>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
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

                                <TableBody>
                                    {piutangData !== undefined
                                        ? sortedRowInformation(piutangData,
                                            getComparator(orderdirection, valuetoorderby))
                                            .slice(page * itemsPerPage, page * itemsPerPage + itemsPerPage)
                                            .map((item: any, index: number) => {
                                                return (
                                                    <TableRow
                                                        key={index}
                                                        sx={{ "&:hover": { bgcolor: Colors.inherit }, cursor: 'pointer' }}
                                                    >
                                                        <StyledTableCell align="center">22/03/2021</StyledTableCell>
                                                        <StyledTableCell align="center">31/03/2022</StyledTableCell>
                                                        <StyledTableCell align="center">INV/00{index + 1}</StyledTableCell>
                                                        <StyledTableCell align="center">{item.less1bulan}</StyledTableCell>
                                                        <StyledTableCell align="center">{item.sebulan}</StyledTableCell>
                                                        <StyledTableCell align="center">{item.duabulan}</StyledTableCell>
                                                        <StyledTableCell align="center">{item.tigabulan}</StyledTableCell>
                                                        <StyledTableCell align="center">{item.more3bulan}</StyledTableCell>
                                                    </TableRow>
                                                )
                                            })
                                        : null}
                                    <TableRow sx={{ backgroundColor: '#f8f8f8' }}>
                                        <StyledTableCell align="left">Total</StyledTableCell>
                                        <StyledTableCell align="center">{' '}</StyledTableCell>
                                        <StyledTableCell align="center">{' '}</StyledTableCell>
                                        <StyledTableCell align="center">3.200.000</StyledTableCell>
                                        <StyledTableCell align="center">1.500.000</StyledTableCell>
                                        <StyledTableCell align="center">800.000</StyledTableCell>
                                        <StyledTableCell align="center">200.000</StyledTableCell>
                                        <StyledTableCell align="center">0</StyledTableCell>
                                        <StyledTableCell align="center">0</StyledTableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                    {piutangData !== undefined && (
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, 100]}
                            component="div"
                            count={piutangData.length}
                            rowsPerPage={itemsPerPage}
                            page={page}
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