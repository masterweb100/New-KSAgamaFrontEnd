import React, { useState } from "react";
import { toast } from 'react-toastify';
import {
    TablePagination,
    TableSortLabel,
    TableHead,
    Table,
    TableBody,
    TableContainer,
    Stack,
    Paper,
    CircularProgress
} from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { FilterList } from "@mui/icons-material";
import { Colors } from "../../../../../utils/colors";
import { childData } from "../../dummy";
import { CENTER } from "../../../../../utils/stylesheet";

const columns = [
    { id: "no", label: "No." },
    // { id: "id", label: "ID SKU" },
    // { id: "jenis", label: "Jenis Produk" },
    { id: "satuan", label: "Satuan" },
    { id: "qty", label: "Qty" },
    { id: "diskon", label: "Diskon" },
    { id: "total", label: "Total" },
];

const PenjualanDetailChildTable = ({ data, loader }: any) => {
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
                                                    <TableCell key={column.id} align="center" sx={{ fontWeight: '700' }}>
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
                                                        <TableCell align="center">{index + 1}</TableCell>
                                                        {/* <TableCell align="center">{'INV/12093'}</TableCell>
                                                        <TableCell align="center">{'Toshiba'}</TableCell> */}
                                                        <TableCell align="center">{item.productUnitType}</TableCell>
                                                        <TableCell align="center">{item.qty}</TableCell>
                                                        <TableCell align="center">{item.discount1 + '%'}</TableCell>
                                                        <TableCell align="center">{item.totalPrice}</TableCell>
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

export default PenjualanDetailChildTable;