import React, { useState } from "react";
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
import { FilterList } from "@mui/icons-material";
import { Colors } from "../../../../utils/colors";
import { CENTER } from "../../../../utils/stylesheet";
import GudangDialog from "./gudangDialog";
import moment from "moment";

const columns = [
    { id: "tanggal", label: "Tanggal" },
    { id: "no", label: "Nomor Mutasi" },
    { id: "status", label: "Status" },
    { id: "jenisBarang", label: "Jenis Barang" },
    { id: "jumlah", label: "Jumlah Barang" },
    { id: "asal", label: "Gudang Asal" },
    { id: "tujuan", label: "Gudang Tujuan" },
    { id: "updatedBy", label: "Updated By" },
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

const GudangTable = (props: any) => {
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
                                                            <StyledTableCell align="center">{moment(item.date).format('YYYY/MM/DD')}</StyledTableCell>
                                                            <StyledTableCell align="center">{item.genId}</StyledTableCell>
                                                            <StyledTableCell align="center">
                                                                <div style={{ ...CENTER, backgroundColor: '#d38b00', padding: '5px 10px', borderRadius: 10 }}>
                                                                    <p style={{ color: '#fff', margin: 0 }}>{item.status.replace(/_/g, ' ')}</p>
                                                                </div>
                                                            </StyledTableCell>
                                                            <StyledTableCell align="center">{item.productUnitTypeName}</StyledTableCell>
                                                            <StyledTableCell align="center">{item.qty}</StyledTableCell>
                                                            <StyledTableCell align="center">{item.storeOriginName}</StyledTableCell>
                                                            <StyledTableCell align="center">{item.storeDestinationName}</StyledTableCell>
                                                            <StyledTableCell align="center">{item.updatedBy === null ? '-' : item.updatedBy}</StyledTableCell>
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
            <GudangDialog
                isOpen={isApprove}
                setOpen={() => setApprove(false)}
                item={ItemSelected}
                getData={() => props.getData()}
            ></GudangDialog>
        </Box>
    );
}

export default GudangTable;