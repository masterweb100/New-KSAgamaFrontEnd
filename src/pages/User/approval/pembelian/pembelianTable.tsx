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
    Checkbox,
    CircularProgress,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import { Colors } from "../../../../utils/colors";
import PembelianDialog from "./pembelianDialog";
import moment from "moment";
import { CENTER } from "../../../../utils/stylesheet";

const columns = [
    { id: "tanggal", label: "Tanggal" },
    { id: "status", label: "Status" },
    { id: "id", label: "ID SKU" },
    { id: "brand", label: "Nama Barang" },
    { id: "kategori", label: "Kategori" },
    { id: "supplier", label: "Nama Supplier" },
    { id: "tempo", label: "Jatuh Tempo" },
    { id: "tagihan", label: "Sisa Tagihan" },
    { id: "total", label: "Total" },
    { id: "updatedby", label: "Updated By" },
];

const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
        textAlign: "center",
        fontWeight: '700'
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const PenjualanTable = (props: any) => {
    const [page, setPage] = React.useState(1);
    const [itemsPerPage, setItemsPerPage] = React.useState(10);
    const [isApprove, setApprove] = React.useState(false)
    const [ItemSelected, setItemSelected] = React.useState({})

    const handleChangePage = (event: any, newPage: any) => {
        setPage(newPage + 1);
        props.changePage(newPage + 1);
    };

    const handleChangeRowsPerPage = (event: any) => {
        setItemsPerPage(parseInt(event.target.value, 10));
        props.itemsPerPage(parseInt(event.target.value, 10));
        setPage(1);
    };

    const ApproveDialog = React.useCallback((item: any) => {
        setItemSelected(item)
        setApprove(true)
    }, [])

    return (
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
                    props.loader ?
                        <div style={{ ...CENTER, backgroundColor: '#fff', padding: 20 }}>
                            <CircularProgress size={40} color={'error'} />
                        </div>
                        :
                        <>
                            {
                                props.data.length === 0 ?
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
                                                            <div style={{ width: 120 }}>
                                                                {column.label}
                                                            </div>
                                                        </StyledTableCell>
                                                    ))}
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {props.data.map((item: any, index: number) => {
                                                    return (
                                                        <TableRow
                                                            role="checkbox"
                                                            tabIndex={-1}
                                                            key={index}
                                                            sx={{ "&:hover": { bgcolor: Colors.inherit }, cursor: 'pointer' }}
                                                            onClick={() => ApproveDialog(item)}
                                                        >
                                                            <StyledTableCell align="center">{moment(item.transactionDate).format('YYYY/MM/DD')}</StyledTableCell>
                                                            <StyledTableCell align="center" style={{ color: '#d38b00' }}>{(item.purchasingStatus).replace(/_/g, ' ')}</StyledTableCell>
                                                            <StyledTableCell align="center">{item.genId}</StyledTableCell>
                                                            <StyledTableCell align="center">{item.productBrandName}</StyledTableCell>
                                                            <StyledTableCell align="center">{item.productCategoryName}</StyledTableCell>
                                                            <StyledTableCell align="center">{item.supplierName}</StyledTableCell>
                                                            <StyledTableCell align="center">{moment(item.dueDate).format('YYYY/MM/DD')}</StyledTableCell>
                                                            <StyledTableCell align="center">{(item.bill).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</StyledTableCell>
                                                            <StyledTableCell align="center">{(item.totalBill).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</StyledTableCell>
                                                            <StyledTableCell align="center">{item.updatedBy === null ? '-' : item.updatedBy}</StyledTableCell>
                                                        </TableRow>
                                                    )
                                                })}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                            }
                        </>
                }
            </Box>
            {props.data !== undefined && (
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={
                        props.pagination.totalItem === undefined
                            ? 0
                            : props.pagination.totalItem
                    }
                    rowsPerPage={itemsPerPage}
                    page={page - 1}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            )}
            <PembelianDialog
                isOpen={isApprove}
                setOpen={() => setApprove(false)}
                item={ItemSelected}
                getData={() => props.getData()}
            ></PembelianDialog>
        </Box>
    );
}

export default PenjualanTable;