import React, { useState } from "react";
import { TablePagination, Box, TableSortLabel, TableHead, Table, TableBody, TableContainer, IconButton, Stack, TextField, Icon, InputAdornment, Tabs, Tab } from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { FilterList } from "@mui/icons-material";
import { Colors } from "../../../../utils/colors";
import { CENTER } from "../../../../utils/stylesheet";

const columns = [
    { id: "data", label: "Tanggal" },
    { id: "id", label: "ID Barang" },
    { id: "brand", label: "Nama Brand" },
    { id: "category", label: "Jenis Barang" },
    { id: "qty", label: "Qty" },
    { id: "status", label: "Status" },
    { id: "updatedby", label: "Updated By" },
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

const DataOpnameTable = (props: any) => {
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

    const FormStore = () => navigate('/store-data/form-store')

    return (
        <div>
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
                    <p style={{ color: "#fff", fontWeight: 500, margin: 0 }}>Daftar Barang Keluar</p>
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
                                                sx={{ "&:hover": { bgcolor: Colors.inherit } }}
                                            // onClick={FormStore}
                                            >
                                                <StyledTableCell align="center">{item.date}</StyledTableCell >
                                                <StyledTableCell align="center">P/00{item.id}</StyledTableCell>
                                                <StyledTableCell align="center">{item.brand}</StyledTableCell>
                                                <StyledTableCell align="center">{item.category}</StyledTableCell>
                                                <StyledTableCell align="center">{item.qty}</StyledTableCell>
                                                <StyledTableCell align="center">
                                                    <div style={{ backgroundColor: '#2191b7', padding: '3px 10px', borderRadius: 10, width: '80%', ...CENTER }}>
                                                        <p style={{ margin: 0, color: '#fff' }}>Freeze</p>
                                                    </div>
                                                </StyledTableCell>
                                                <StyledTableCell align="center">
                                                    <Stack direction={'row'} gap={2} width={'100%'}>
                                                        <span style={{margin: 0, display: 'flex', alignSelf: 'center'}}>{item.updatedby}</span>
                                                        <IconButton style={{ width: '15%' }}>
                                                            <Icon style={{ color: Colors.primary, fontSize: 20 }}>chevron_right</Icon>
                                                        </IconButton>
                                                    </Stack>
                                                </StyledTableCell>
                                            </TableRow>
                                        )
                                    })
                                    : null}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
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

export default DataOpnameTable;