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
    Stack,
    Icon,
    TextField,
    InputAdornment,
    CircularProgress
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { FilterList } from "@mui/icons-material";
import { Colors } from "../../../../utils/colors";
import { CENTER } from "../../../../utils/stylesheet";
import PelunasanDialog from "../../../../components/pelunasanDialog";
import { isMobile } from 'react-device-detect';
import DeleteModal from "../../../../components/deleteModal";
import moment from "moment";
import { HTTPDeleteSales } from "../../../../apis/User/sales/sales";
import secureLocalStorage from "react-secure-storage";

const columns = [
    { id: "tanggal", label: "Tanggal" },
    { id: "id", label: "ID INVOICE" },
    { id: "nama", label: "Nama Pelanggan" },
    { id: "jenis", label: "Jenis Penjualan" },
    { id: "tempo", label: "Jatuh Tempo" },
    { id: "status", label: "Status" },
    { id: "pembayaran", label: "Pembayaran" },
    { id: "sisa", label: "Sisa Tagihan" },
    { id: "total", label: "Total" },
    { id: "updatedBy", label: "Updated By" },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        textAlign: "center",
        fontWeight: '700',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const PenjualanTable = (props: any) => {
    const navigate = useNavigate();
    const token = secureLocalStorage.getItem('TOKEN')
    const [selected, setSelected] = useState<any[]>([])
    const [page, setPage] = React.useState(1);
    const [itemsPerPage, setItemsPerPage] = React.useState(10);
    const [isLunasOpen, setLunasOpen] = React.useState(false)
    const [isDeleteModal, setDeleteModal] = React.useState(false);
    const [ItemSelected, setItemSelected] = React.useState({})

    const handleDelete = async (param: string) => {
        if (selected.length > 0) {
            if (param === 'yes') {
                await HTTPDeleteSales({
                    ids: selected,
                    token: token as string
                })
                setDeleteModal(!isDeleteModal);
                props.getData()
                setSelected([])
            } else {
                setDeleteModal(!isDeleteModal);
            }
        }
    };

    const handleChangePage = (event: any, newPage: any) => {
        setPage(newPage + 1);
        props.changePage(newPage + 1)
    };

    const handleChangeRowsPerPage = (event: any) => {
        setItemsPerPage(parseInt(event.target.value, 10));
        props.itemsPerPage(parseInt(event.target.value, 10))
        setPage(1);
    };

    const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected: any[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = props.data.map((item: any, index: number) => item.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const isSelected = (name: any) => selected.indexOf(name) !== -1;
    const FormAdd = () => navigate('/penjualan/penjualan/form-penjualan/add')

    const FormLunas = (item: any) => {
        setLunasOpen(true)
        setItemSelected(item)
    }

    return (
        <div>
            <Stack direction={'row'} justifyContent={'space-between'}>
                <div onClick={FormAdd} style={{ ...CENTER, backgroundColor: Colors.primary, borderRadius: 5, cursor: 'pointer', padding: isMobile ? '10px 7px' : '10px 30px', alignSelf: 'flex-start' }}>
                    <Stack alignItems={'center'} direction={'row'} gap={1}>
                        <Icon style={{ color: '#fff', fontSize: isMobile ? 15 : 17 }}>add</Icon>
                        <p style={{ margin: 0, fontWeight: 500, fontSize: isMobile ? 12 : 15, color: '#fff' }}>Tambah Data Penjualan</p>
                    </Stack>
                </div>
                <Stack direction={'row'} alignItems={'center'} gap={isMobile ? 1 : 2}>
                    <div onClick={() => handleDelete('open')} style={{ ...CENTER, backgroundColor: selected.length === 0 ? Colors.secondary : Colors.error, borderRadius: 5, cursor: 'pointer', padding: 10 }}>
                        <Icon style={{ color: '#fff', fontSize: isMobile ? 20 : 23 }}>delete_outline</Icon>
                    </div>
                </Stack>
            </Stack>
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
                    <p style={{ color: "#fff", fontWeight: 500, margin: 0 }}>Daftar Data Penjualan</p>
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
                {/* <Box sx={{ border: 1, borderColor: Colors.secondary }}> */}
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
                                                    <StyledTableCell>
                                                        <Checkbox
                                                            color="primary"
                                                            indeterminate={selected.length > 0 && selected.length < props.data.length}
                                                            checked={props.data.length > 0 && selected.length === props.data.length}
                                                            onChange={handleSelectAllClick}
                                                        />
                                                    </StyledTableCell>
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
                                                    const isItemSelected = isSelected(item.id);
                                                    const labelId = `enhanced-table-checkbox-${index}`;

                                                    return (
                                                        <TableRow
                                                            role="checkbox"
                                                            tabIndex={-1}
                                                            key={index}
                                                            sx={{ "&:hover": { bgcolor: Colors.inherit } }}
                                                        >
                                                            <StyledTableCell onClick={(e) => handleClick(e, item.id)} align="center" padding="checkbox">
                                                                <Checkbox
                                                                    color="primary"
                                                                    checked={isItemSelected}
                                                                    inputProps={{
                                                                        'aria-labelledby': labelId,
                                                                    }}
                                                                />
                                                            </StyledTableCell>
                                                            <StyledTableCell align="center">{moment(item.shippingDate).format('YYYY-MM-DD')}</StyledTableCell>
                                                            <StyledTableCell align="center">{item.invoice}</StyledTableCell>
                                                            <StyledTableCell align="center">{item.customerName}</StyledTableCell>
                                                            <StyledTableCell align="center">{item.salesType}</StyledTableCell>
                                                            <StyledTableCell align="center">{moment(item.dueDate).format('YYYY-MM-DD')}</StyledTableCell>
                                                            <StyledTableCell align="center" sx={{ color: item.isPaidOff ? Colors.success : Colors.error }}>
                                                                {item.isPaidOff ? 'Lunas' : 'Belum Lunas'}
                                                            </StyledTableCell>
                                                            <StyledTableCell align="center">
                                                                <div onClick={() => !item.isPaidOff && FormLunas(item)} style={{ ...CENTER, backgroundColor: item.isPaidOff ? '#ababab' : Colors.success, borderRadius: 5, cursor: 'pointer', padding: isMobile ? '10px 6px' : 10 }}>
                                                                    <span style={{ color: '#fff', fontSize: 13, fontWeight: '600' }}>Set Lunas</span>
                                                                </div>
                                                            </StyledTableCell>
                                                            <StyledTableCell align="center">{(item.bill).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</StyledTableCell>
                                                            <StyledTableCell align="center">{(item.totalBill).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</StyledTableCell>
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
                {/* </Box> */}
                <Stack direction={'column'} gap={1} sx={{ backgroundColor: '#f8f8f8', border: '1px solid #909090' }} padding={3}>
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} gap={1} sx={{ backgroundColor: '#f8f8f8' }}>
                        <span><b>Sub Total Barang Masuk</b></span>
                        <span><b>8.960</b></span>
                    </Stack>
                    <div style={{ width: '100%', backgroundColor: '#000', height: 1 }}></div>
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} gap={1} sx={{ backgroundColor: '#f8f8f8' }}>
                        <span><b>Total Barang Masuk</b></span>
                        <span><b>18.960</b></span>
                    </Stack>
                </Stack>
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
            <PelunasanDialog
                type={'sales'}
                isOpen={isLunasOpen}
                setOpen={() => setLunasOpen(false)}
                item={ItemSelected}
                refresh={() => props.getData()}
            />
            <DeleteModal isOpen={isDeleteModal} setOpen={handleDelete} />
        </div>
    );
}

export default PenjualanTable;