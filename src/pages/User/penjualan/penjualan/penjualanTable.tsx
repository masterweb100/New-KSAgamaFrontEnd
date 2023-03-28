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
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [nomor, setNomor] = useState(null);
    const navigate = useNavigate();
    const [selected, setSelected] = useState<readonly string[]>([])

    const handleClickMenu = (event: any, id: any) => {
        setAnchorEl(event.currentTarget);
        setNomor(id);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setNomor(null);
    };

    const handleChangePage = (event: any, newPage: any) => {
        props.setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: any) => {
        props.setItemsPerPage(+event.target.value);
        props.setPage(0);
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

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = props.data.content.map((n: any) => n.name);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const isSelected = (name: any) => selected.indexOf(name) !== -1;

    const FormUser = () => {
        navigate('/user-data/form-user')
    }

    return (
        <div>
            <Stack direction={'row'} justifyContent={'space-between'}>
                <div style={{ ...CENTER, backgroundColor: Colors.primary, borderRadius: 5, cursor: 'pointer', padding: '10px 30px', alignSelf: 'flex-start' }}>
                    <Stack alignItems={'center'} direction={'row'} gap={1}>
                        <Icon style={{ color: '#fff', fontSize: 17 }}>add</Icon>
                        <p style={{ margin: 0, fontWeight: 500, fontSize: 15, color: '#ffff' }}>Tambah Data Penjualan</p>
                    </Stack>
                </div>
                <Stack direction={'row'} alignItems={'center'} gap={2}>
                    <div style={{ ...CENTER, backgroundColor: Colors.success, borderRadius: 5, cursor: 'pointer', padding: 10 }}>
                        <span style={{ color: '#fff' }}>Set Lunas</span>
                    </div>
                    <div style={{ ...CENTER, backgroundColor: Colors.warning, borderRadius: 5, cursor: 'pointer', padding: 10 }}>
                        <Icon style={{ color: '#fff', fontSize: 25 }}>border_color</Icon>
                    </div>
                    <div style={{ ...CENTER, backgroundColor: Colors.error, borderRadius: 5, cursor: 'pointer', padding: 10 }}>
                        <Icon style={{ color: '#fff', fontSize: 25 }}>delete_outline</Icon>
                    </div>
                </Stack>
            </Stack>
            <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
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
                    sx={{ bgcolor: "white", borderRadius: 1, width: 300 }}
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
                    <TableContainer sx={{ maxHeight: "75vh" }}>
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
                                        getComparator(orderdirection, valuetoorderby)
                                    ).map((item: any, index: number) => {
                                        const isItemSelected = isSelected(item.name);
                                        const labelId = `enhanced-table-checkbox-${index}`;

                                        return (
                                            <TableRow
                                                role="checkbox"
                                                tabIndex={-1}
                                                key={index}
                                                sx={{ "&:hover": { bgcolor: Colors.inherit }, cursor: 'pointer' }}
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
                        rowsPerPageOptions={[5, 25, 100]}
                        component="div"
                        count={props.data.totalElements}
                        rowsPerPage={props.data.size}
                        page={props.data.number}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                )}
            </Box>
        </div>
    );
}

export default PenjualanTable;