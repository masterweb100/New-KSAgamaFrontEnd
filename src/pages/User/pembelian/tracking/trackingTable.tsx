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
    Stack,
    Icon,
    TextField,
    InputAdornment,
    CircularProgress,
    Dialog,
    DialogContent
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import { Colors } from "../../../../utils/colors";
import { isMobile } from 'react-device-detect';
import moment from "moment";
import { CENTER } from "../../../../utils/stylesheet";
import TrackingDialog from "./trackingDialog";
import { HTTPPatchTracking } from "../../../../apis/User/purchase/tracking";
import secureLocalStorage from "react-secure-storage";

const columns = [
    { id: "tanggal", label: "Tanggal" },
    { id: "id", label: "ID SKU" },
    { id: "brand", label: "Nama Brand" },
    { id: "kategori", label: "Nama Kategori" },
    { id: "price", label: "Total Price" },
    { id: "qty", label: "Qty" },
    { id: "status", label: "Status" },
    { id: "updatedBy", label: "Updated By" },
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

const TrackingTable = (props: any) => {
    const [page, setPage] = React.useState(1);
    const token = secureLocalStorage.getItem('USER_SESSION')
    const [itemsPerPage, setItemsPerPage] = React.useState(10);
    const [isApprove, setApprove] = React.useState(false)
    const [isApprovedModal, setApprovedModal] = React.useState(false)
    const [ItemSelected, setItemSelected] = React.useState<any>({})

    const handleChangePage = (event: any, newPage: any) => {
        setPage(newPage + 1);
        props.changePage(newPage + 1)
    };

    const handleChangeRowsPerPage = (event: any) => {
        setItemsPerPage(parseInt(event.target.value, 10));
        props.itemsPerPage(parseInt(event.target.value, 10))
        setPage(1);
    };

    const ApproveDialog = React.useCallback((item: any) => {
        setItemSelected(item)
        if (item.status === "WAITING_TO_BE_RECEIVED") {
            setApprovedModal(true)
        } 
        // else {
        //     setApprove(true)
        // }
    }, [])

    const ApprovedResult = async () => {
        try {
            const resp = await HTTPPatchTracking({
                purchasingProductId: ItemSelected.id,
                status: 'RECEIVED',
                token: token as string
            })
            setApprovedModal(false);
            toast.success('Tracking berhasil di perbarui!')
            await props.getData()
        } catch (error: any) {
            if (error.status === 500) {
                toast.error('Server sedang mengalami gangguan!')
            } else {
                toast.error('Terjadi Kesalahan!')
            }
        }
    }

    return (
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
                    <p style={{ color: "#fff", fontWeight: 500, margin: 0 }}>Daftar Data Tracking Pembelian</p>
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
                                                                <div style={{ width: 100 }}>
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
                                                                <StyledTableCell align="center">{moment(item.createdAt).format('YYYY/MM/DD')}</StyledTableCell>
                                                                <StyledTableCell align="center">{item.purchasingGenId}</StyledTableCell>
                                                                <StyledTableCell align="center">{item.productBrandName}</StyledTableCell>
                                                                <StyledTableCell align="center">{item.productCategoryName}</StyledTableCell>
                                                                <StyledTableCell align="center">{item.totalPrice}</StyledTableCell>
                                                                <StyledTableCell align="center">{item.qty}</StyledTableCell>
                                                                <StyledTableCell align="center"
                                                                    sx={{
                                                                        fontWeight: '700',
                                                                        color: item.status === 'WAITING_TO_BE_RECEIVED' ? Colors.info :
                                                                            item.status === 'RETURN' ? Colors.error : Colors.success

                                                                    }}
                                                                >
                                                                    {
                                                                        item.status === 'WAITING_TO_BE_RECEIVED' ? 'MENUNGGU DITERIMA' :
                                                                            item.status === 'RETURN' ? "DI KEMBALIKAN" : "SELESAI"
                                                                    }
                                                                </StyledTableCell>
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
                        count={props.pagination.totalItem === undefined ? 0 : props.pagination.totalItem}
                        rowsPerPage={itemsPerPage}
                        page={page - 1}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                )}
            </Box>
            <Dialog open={isApprovedModal} onClose={() => setApprovedModal(false)}>
                <DialogContent>
                    <Icon
                        style={{
                            color: Colors.error,
                            fontSize: 25,
                            position: "absolute",
                            top: 10,
                            right: 10,
                        }}
                    >error</Icon>
                    <Stack direction={"column"} gap={2} alignItems={"center"}>
                        <Stack
                            direction={"column"}
                            alignItems={"center"}
                            justifyContent={"center"}
                            width={"90%"}
                            textAlign={"center"}
                        >
                            <h3 style={{ color: "#686868" }}>Setujui Produk</h3>
                            <span style={{ color: "#686868" }}>Terima Produk dengan ID {ItemSelected.purchasingGenId}?</span>
                        </Stack>
                        <Stack
                            direction={"row"}
                            alignItems={"center"}
                            justifyContent={"center"}
                            gap={2}
                            marginTop={5}
                        >
                            <div
                                onClick={() => setApprovedModal(false)}
                                style={{
                                    ...CENTER,
                                    borderRadius: 10,
                                    border: `1px solid ${Colors.error}`,
                                    padding: "10px 30px",
                                    cursor: "pointer",
                                }}
                            >
                                <span style={{ fontSize: 13, color: Colors.error }}>BATAL</span>
                            </div>
                            <div
                                onClick={ApprovedResult}
                                style={{
                                    ...CENTER,
                                    borderRadius: 10,
                                    backgroundColor: Colors.error,
                                    padding: "10px 30px",
                                    cursor: "pointer",
                                }}
                            >
                                <span style={{ fontSize: 13, color: "#fff" }}>SETUJUI</span>
                            </div>
                        </Stack>
                    </Stack>
                </DialogContent>
            </Dialog>
            <TrackingDialog
                isOpen={isApprove}
                setOpen={() => setApprove(false)}
                item={ItemSelected}
                getData={() => props.getData()}
            ></TrackingDialog>
        </div>
    );
}

export default TrackingTable;