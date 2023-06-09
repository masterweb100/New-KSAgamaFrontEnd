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
    InputAdornment
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import { FilterList } from "@mui/icons-material";
import { Colors } from "../../../utils/colors";
import { isMobile } from 'react-device-detect';

const columns = [
    { id: "tanggal", label: "Tanggal" },
    { id: "id", label: "ID Invoice" },
    { id: "nama", label: "Nama Pelanggan" },
    { id: "referensi", label: "Refensi" },
    { id: "debit", label: "Debit" },
    { id: "kredit", label: "Kredit" },
    { id: "saldo", label: "Saldo Berjalan" },
];

const StyledTableCell = styled(TableCell)(() => ({
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

const DetailAkunTable = (props: any) => {
    const [selected, setSelected] = useState<readonly string[]>([])
    const [page, setPage] = React.useState(0);
    const [itemsPerPage, setItemsPerPage] = React.useState(10);

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
            const newSelected = props.data.map((n: any, index: number) => index.toString());
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const isSelected = (name: any) => selected.indexOf(name) !== -1;

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
                    <p style={{ color: "#fff", fontWeight: 500, margin: 0 }}>Daftar Data Akun</p>
                </Stack>
                <TextField
                    type="search"
                    size="small"
                    placeholder="Cari..."
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
                                <TableRow
                                    tabIndex={-1}
                                    sx={{ backgroundColor: '#f8f8f8', border: '1px solid #909090' }}
                                >
                                    <StyledTableCell align="center" padding="checkbox"></StyledTableCell>
                                    <StyledTableCell align="center"><span><b>Saldo Awal</b></span></StyledTableCell>
                                    <StyledTableCell align="center"></StyledTableCell>
                                    <StyledTableCell align="center"></StyledTableCell>
                                    <StyledTableCell align="center"></StyledTableCell>
                                    <StyledTableCell align="center"><span><b>10.960.000</b></span></StyledTableCell>
                                    <StyledTableCell align="center"><span><b>0</b></span></StyledTableCell>
                                    <StyledTableCell align="center"><span><b>10.960.000</b></span></StyledTableCell>
                                </TableRow>
                                {props.data !== undefined
                                    ? sortedRowInformation(props.data,
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
                                                    <StyledTableCell align="center">{item.id + (index + 1)}</StyledTableCell>
                                                    <StyledTableCell align="center">{item.nama}</StyledTableCell>
                                                    <StyledTableCell align="center">{item.referensi}</StyledTableCell>
                                                    <StyledTableCell align="center">{item.debit}</StyledTableCell>
                                                    <StyledTableCell align="center">{item.kredit}</StyledTableCell>
                                                    <StyledTableCell align="center">{item.saldo}</StyledTableCell>
                                                </TableRow>
                                            )
                                        })
                                    : null}
                                <TableRow
                                    tabIndex={-1}
                                    sx={{ backgroundColor: '#f8f8f8', border: '1px solid #909090' }}
                                >
                                    <StyledTableCell align="center" padding="checkbox"></StyledTableCell>
                                    <StyledTableCell align="center"><span><b>Saldo Akhir</b></span></StyledTableCell>
                                    <StyledTableCell align="center"></StyledTableCell>
                                    <StyledTableCell align="center"></StyledTableCell>
                                    <StyledTableCell align="center"></StyledTableCell>
                                    <StyledTableCell align="center"><span><b>10.960.000</b></span></StyledTableCell>
                                    <StyledTableCell align="center"><span><b>0</b></span></StyledTableCell>
                                    <StyledTableCell align="center"><span><b>10.960.000</b></span></StyledTableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
                {props.data !== undefined && (
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25, 100]}
                        component="div"
                        count={props.data.length}
                        rowsPerPage={itemsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                )}
            </Box>
        </div>
    );
}

export default DetailAkunTable;