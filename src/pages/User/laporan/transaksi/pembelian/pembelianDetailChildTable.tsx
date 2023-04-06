import React, { useState } from "react";
import {
    TablePagination,
    TableSortLabel,
    TableHead,
    Table,
    TableBody,
    TableContainer,
    Stack,
    Paper
} from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { FilterList } from "@mui/icons-material";
import { Colors } from "../../../../../utils/colors";
import { childData } from "../../dummy";

const columns = [
    { id: "no", label: "No." },
    { id: "id", label: "ID SKU" },
    { id: "jenis", label: "Jenis Produk" },
    { id: "satuan", label: "Satuan" },
    { id: "qty", label: "Qty" },
    { id: "harga", label: "Harga Satuan" },
    { id: "diskon", label: "Diskon" },
    { id: "total", label: "Total" },
];

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

const PembelianDetailChildTable = () => {
    const [page, setPage] = React.useState(0);
    const [itemsPerPage, setItemsPerPage] = React.useState(5);

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
        <div>
            <TableContainer component={Paper}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column: any) => (
                                <TableCell key={column.id}>
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
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {childData !== undefined
                            ? sortedRowInformation(
                                childData,
                                getComparator(orderdirection, valuetoorderby))
                                .slice(page * itemsPerPage, page * itemsPerPage + itemsPerPage)
                                .map((item: any, index: number) => {
                                    return (
                                        <TableRow
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={index}
                                            sx={{ "&:hover": { bgcolor: Colors.inherit }, cursor: 'pointer' }}
                                        >
                                            <TableCell align="center">{index + 1}</TableCell>
                                            <TableCell align="center">{item.id}</TableCell>
                                            <TableCell align="center">{item.jenis}</TableCell>
                                            <TableCell align="center">{item.satuan}</TableCell>
                                            <TableCell align="center">{item.qty}</TableCell>
                                            <TableCell align="center">{item.harga}</TableCell>
                                            <TableCell align="center">{item.diskon}</TableCell>
                                            <TableCell align="center">{item.total}</TableCell>
                                        </TableRow>
                                    )
                                })
                            : null}
                    </TableBody>
                </Table>
            </TableContainer>
            {childData !== undefined && (
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 100]}
                    component="div"
                    count={childData.length}
                    rowsPerPage={itemsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            )}
            <Stack direction={'row'} justifyContent={'space-between'}>
                <div></div>
                <Stack direction={'row'} gap={8}>
                    <Stack direction={'column'} alignSelf={'flex-start'} gap={1}>
                        <u><h2 style={{ margin: 0, textAlign: 'left' }}>Total</h2></u>
                        <span style={{ textAlign: 'left' }}><b>Total Dibayar</b></span>
                        <span style={{ textAlign: 'left' }}><b>Sisa Tagihan</b></span>
                    </Stack>
                    <Stack direction={'column'} alignSelf={'flex-start'} gap={1}>
                        <u><h2 style={{ margin: 0, textAlign: 'left' }}>2.600.000</h2></u>
                        <span style={{ textAlign: 'left' }}><b>2.400.000</b></span>
                        <span style={{ textAlign: 'left' }}><b>100.000</b></span>
                    </Stack>
                </Stack>
            </Stack>
        </div>
    );
}

export default PembelianDetailChildTable;