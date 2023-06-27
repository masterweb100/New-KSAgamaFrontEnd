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
    CircularProgress
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { FilterList } from "@mui/icons-material";
import { Colors } from "../../../../utils/colors";
import { CENTER } from "../../../../utils/stylesheet";
import PelangganDialog from "./pelangganDialog";
import { isMobile } from 'react-device-detect';
import { HTTPDeleteCustomers } from "../../../../apis/User/contact/customer";
import secureLocalStorage from "react-secure-storage";
import DeleteModal from "../../../../components/deleteModal";

const columns = [
    { id: "nama", label: "Nama Pelanggan" },
    { id: "perusahaan", label: "Perusahaan" },
    { id: "address", label: "Alamat" },
    { id: "email", label: "Email" },
    { id: "telepon", label: "Telepon" },
    { id: "hutang", label: "Hutang" },
    { id: "piutang", label: "Piutang" },
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

const PelangganTable = (props: any) => {
    const navigate = useNavigate();
    const [selected, setSelected] = useState<any[]>([]);
    const [page, setPage] = React.useState(1);
    const [itemsPerPage, setItemsPerPage] = React.useState(10);
    const [isDetailOpen, setDetailOpen] = React.useState(false);
    const [isDeleteModal, setDeleteModal] = React.useState(false);
    const token = secureLocalStorage.getItem("USER_SESSION") as string

    const handleDelete = async (param: string) => {
        if (selected.length > 0) {
            if (param === 'yes') {
                await HTTPDeleteCustomers({
                    ids: selected,
                    token: token
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
            const newSelected = props.data.map((item: any) => item.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const isSelected = (name: any) => selected.indexOf(name) !== -1;
    const FormPage = () => navigate("/kontak/pelanggan/form-pelanggan")
    const DetailData = React.useCallback(() => {
        setDetailOpen(true)
    }, [])
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.search(event.target.value)
    }

    return (
        <div>
            <Stack direction={'row'} justifyContent={'space-between'}>
                <div onClick={FormPage} style={{ ...CENTER, backgroundColor: Colors.primary, borderRadius: 5, cursor: 'pointer', padding: '10px 30px', alignSelf: 'flex-start' }}>
                    <Stack alignItems={'center'} direction={'row'} gap={1}>
                        <Icon style={{ color: '#fff', fontSize: 17 }}>add</Icon>
                        <p style={{ margin: 0, fontWeight: 500, fontSize: 15, color: '#ffff' }}>Tambah Data Pelanggan</p>
                    </Stack>
                </div>
                <div
                    onClick={() => handleDelete('open')}
                    style={{
                        ...CENTER,
                        backgroundColor:
                            selected.length === 0 ? Colors.secondary : Colors.error,
                        borderRadius: 5,
                        cursor: "pointer",
                        padding: 10,
                    }}
                >
                    <Icon style={{ color: "#fff", fontSize: isMobile ? 20 : 25 }}>
                        delete_outline
                    </Icon>
                </div>
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
                    <p style={{ color: "#fff", fontWeight: 500, margin: 0 }}>Daftar Data Pelanggan</p>
                </Stack>
                <TextField
                    type="search"
                    size="small"
                    placeholder="Cari..."
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
                                                                {column.label}
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
                                                                sx={{ "&:hover": { bgcolor: Colors.inherit }, cursor: 'pointer' }}
                                                                onClick={(e) => handleClick(e, item.id)}
                                                            >
                                                                <StyledTableCell align="center" padding="checkbox">
                                                                    <Checkbox
                                                                        color="primary"
                                                                        checked={isItemSelected}
                                                                        inputProps={{
                                                                            'aria-labelledby': labelId,
                                                                        }}
                                                                    />
                                                                </StyledTableCell>
                                                                <StyledTableCell align="center">{item.nameCustomer}</StyledTableCell>
                                                                <StyledTableCell align="center">{item.nameCompany}</StyledTableCell>
                                                                <StyledTableCell align="center">{item.address}</StyledTableCell>
                                                                <StyledTableCell align="center">{item.email}</StyledTableCell>
                                                                <StyledTableCell align="center">0{item.phone}</StyledTableCell>
                                                                <StyledTableCell align="center">-</StyledTableCell>
                                                                <StyledTableCell align="center">-</StyledTableCell>
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
            <PelangganDialog isOpen={isDetailOpen} setOpen={() => setDetailOpen(false)} />
            <DeleteModal isOpen={isDeleteModal} setOpen={handleDelete} />
        </div>
    );
}

export default PelangganTable;