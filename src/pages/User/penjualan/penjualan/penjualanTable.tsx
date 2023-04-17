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
    InputAdornment
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

const columns = [
    { id: "tanggal", label: "Tanggal" },
    { id: "id", label: "ID INVOICE" },
    { id: "nama", label: "Nama Pelanggan" },
    { id: "jenis", label: "Jenis Penjualan" },
    { id: "tempo", label: "Jatuh Tempo" },
    { id: "status", label: "Status" },
    { id: "sisa", label: "Sisa Tagihan" },
    { id: "total", label: "Total" },
    { id: "updatedBy", label: "Updated By" },
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

const PenjualanTable = (props: any) => {
    const navigate = useNavigate();
    const [selected, setSelected] = useState<readonly string[]>([])
    const [page, setPage] = React.useState(0);
    const [itemsPerPage, setItemsPerPage] = React.useState(10);
    const [isLunasOpen, setLunasOpen] = React.useState(false)
    const [isDeleteModal, setDeleteModal] = React.useState(false);

    const handleDelete = () => {
        if (selected.length > 0) {
            setDeleteModal(!isDeleteModal);
        }
    }

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

    const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected: readonly string[] = [];

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
            const newSelected = props.data.content.map((n: any, index: number) => index.toString());
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const isSelected = (name: any) => selected.indexOf(name) !== -1;
    const FormAdd = () => navigate('/penjualan/penjualan/form-penjualan/add')
    const FormUpdate = () => {
        if (selected.length > 0) {
            navigate('/penjualan/penjualan/form-penjualan/update')
        }
    }
    
    const FormLunas = () => {
        if (selected.length > 0) {
            setLunasOpen(true)
        }
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
                    <div onClick={FormLunas} style={{ ...CENTER, backgroundColor: selected.length === 0 ? Colors.secondary : Colors.success, borderRadius: 5, cursor: 'pointer', padding: isMobile ? '10px 6px' : 10 }}>
                        <span style={{ color: '#fff', fontSize: 13, fontWeight: '600' }}>Set Lunas</span>
                    </div>
                    <div onClick={FormUpdate} style={{ ...CENTER, backgroundColor: selected.length === 0 ? Colors.secondary : Colors.warning, borderRadius: 5, cursor: 'pointer', padding: 10 }}>
                        <Icon style={{ color: '#fff', fontSize: isMobile ? 20 : 21 }}>border_color</Icon>
                    </div>
                    <div onClick={handleDelete} style={{ ...CENTER, backgroundColor: selected.length === 0 ? Colors.secondary : Colors.error, borderRadius: 5, cursor: 'pointer', padding: 10 }}>
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
                <Box sx={{ border: 1, borderColor: Colors.secondary }}>
                    <TableContainer>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>
                                        <Checkbox
                                            color="primary"
                                            indeterminate={selected.length > 0 && selected.length < props.data.content.length}
                                            checked={props.data.content.length > 0 && selected.length === props.data.content.length}
                                            onChange={handleSelectAllClick}
                                        />
                                    </StyledTableCell>
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
                                {props.data.content !== undefined
                                    ? sortedRowInformation(
                                        props.data.content,
                                        getComparator(orderdirection, valuetoorderby))
                                        .slice(page * itemsPerPage, page * itemsPerPage + itemsPerPage)
                                        .map((item: any, index: number) => {
                                            const isItemSelected = isSelected(index.toString());
                                            const labelId = `enhanced-table-checkbox-${index}`;

                                            return (
                                                <TableRow
                                                    role="checkbox"
                                                    tabIndex={-1}
                                                    key={index}
                                                    sx={{ "&:hover": { bgcolor: Colors.inherit }, cursor: 'pointer' }}
                                                    onClick={(e) => handleClick(e, index.toString())}
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
                                                    <StyledTableCell align="center">{item.tanggal}</StyledTableCell>
                                                    <StyledTableCell align="center">{item.id}</StyledTableCell>
                                                    <StyledTableCell align="center">{item.nama}</StyledTableCell>
                                                    <StyledTableCell align="center">{item.jenis}</StyledTableCell>
                                                    <StyledTableCell align="center">{item.tempo}</StyledTableCell>
                                                    <StyledTableCell align="center" sx={{ color: Colors.success }}>Lunas</StyledTableCell>
                                                    <StyledTableCell align="center">{item.sisa}</StyledTableCell>
                                                    <StyledTableCell align="center">{item.total}</StyledTableCell>
                                                    <StyledTableCell align="center">{item.updatedBy}</StyledTableCell>
                                                </TableRow>
                                            )
                                        })
                                    : null}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
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
                {props.data.content !== undefined && (
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25, 100]}
                        component="div"
                        count={props.data.content.length}
                        rowsPerPage={itemsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                )}
            </Box>
            <PelunasanDialog isOpen={isLunasOpen} setOpen={() => setLunasOpen(false)} />
            <DeleteModal isOpen={isDeleteModal} setOpen={handleDelete} />
        </div>
    );
}

export default PenjualanTable;