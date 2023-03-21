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
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { FilterList } from "@mui/icons-material";
import { Colors } from "../../../utils/colors";
import { CENTER } from "../../../utils/stylesheet";

const columns = [
    { id: "id", label: "ID Role" },
    { id: "role", label: "Nama Role" },
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

const RoleTable = (props: any) => {
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
                                            sx={{ "&:hover": { bgcolor: Colors.inherit } }}
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
                                            <StyledTableCell align="center">{item.id}</StyledTableCell>
                                            <StyledTableCell align="center">{item.role}</StyledTableCell>
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
    );
}

export default RoleTable;