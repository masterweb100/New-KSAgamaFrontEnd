import React, { useState } from "react";
import { toast } from 'react-toastify';
import {
    TablePagination,
    TableSortLabel,
    TableHead,
    Table,
    TableBody,
    TableContainer,
    Paper,
    CircularProgress
} from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { FilterList } from "@mui/icons-material";
import { Colors } from "../../../../../utils/colors";
import { childData } from "../../dummy";
import { CENTER } from "../../../../../utils/stylesheet";
import moment from "moment";

const columns = [
    { id: "id", label: "ID Invoice" },
    { id: "tanggal", label: "Tanggal" },
    // { id: "jenis", label: "Jenis Produk" },
    { id: "qty", label: "Qty" },
    { id: "harga", label: "Tagihan" },
    { id: "total", label: "Total" },
];

const PendapatanPelangganChildTable = ({ data, loader }: any) => {
    return (
        <div>
            {
                loader ?
                    <div style={{ ...CENTER, backgroundColor: '#fff', padding: 20 }}>
                        <CircularProgress size={40} color={'error'} />
                    </div>
                    :
                    <>
                        {
                            data.length === 0 ?
                                <div style={{ ...CENTER, padding: '20px 0', backgroundColor: '#fff' }}>
                                    <span>Tidak ada data</span>
                                </div>
                                :
                                <TableContainer component={Paper}>
                                    <Table stickyHeader aria-label="sticky table">
                                        <TableHead>
                                            <TableRow>
                                                {columns.map((column: any) => (
                                                    <TableCell key={column.id}>
                                                        {column.label}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {data.map((item: any, index: number) => {
                                                return (
                                                    <TableRow
                                                        role="checkbox"
                                                        tabIndex={-1}
                                                        key={index}
                                                        sx={{ "&:hover": { bgcolor: Colors.inherit }, cursor: 'pointer' }}
                                                    >
                                                        <TableCell align="center">{item.invoice}</TableCell>
                                                        <TableCell align="center">{moment(item.transactionDate).format('YYYY/MM/DD')}</TableCell>
                                                        {/* <TableCell align="center">{'Toshiba'}</TableCell> */}
                                                        <TableCell align="center">{item.totaQty}</TableCell>
                                                        <TableCell align="center">{(item.bill).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</TableCell>
                                                        <TableCell align="center">{(item.totalBill).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</TableCell>
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
        </div>
    );
}

export default PendapatanPelangganChildTable;