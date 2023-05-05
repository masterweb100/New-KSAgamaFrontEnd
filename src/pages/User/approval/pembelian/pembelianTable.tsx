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
import { styled } from "@mui/material/styles";
import { FilterList } from "@mui/icons-material";
import { Colors } from "../../../../utils/colors";
import PembelianDialog from "./pembelianDialog";

const columns = [
    { id: "tanggal", label: "Tanggal" },
    { id: "id", label: "ID SKU" },
    { id: "brand", label: "Nama Barang" },
    { id: "kategori", label: "Kategori" },
    { id: "supplier", label: "Nama Supplier" },
    { id: "tempo", label: "Jatuh Tempo" },
    { id: "tagihan", label: "Sisa Tagihan" },
    { id: "total", label: "Total" },
    { id: "status", label: "Status" },
    { id: "updatedby", label: "Updated By" },
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

const PenjualanTable = (props: any) => {
    const [selected, setSelected] = useState<readonly string[]>([])
    const [page, setPage] = React.useState(0);
    const [itemsPerPage, setItemsPerPage] = React.useState(10);
    const [isApprove, setApprove] = React.useState(false)

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
        console.log(event)
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
    const ApproveDialog = React.useCallback(() => setApprove(true), [])

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
                                            >
                                                <StyledTableCell onClick={(e) => handleClick(e, index.toString())} align="center" padding="checkbox">
                                                    <Checkbox
                                                        color="primary"
                                                        checked={isItemSelected}
                                                        inputProps={{
                                                            'aria-labelledby': labelId,
                                                        }}
                                                    />
                                                </StyledTableCell>
                                                <StyledTableCell onClick={ApproveDialog} align="center">{item.tanggal}</StyledTableCell>
                                                <StyledTableCell onClick={ApproveDialog} align="center">{item.id}</StyledTableCell>
                                                <StyledTableCell onClick={ApproveDialog} align="center">{item.brand}</StyledTableCell>
                                                <StyledTableCell onClick={ApproveDialog} align="center">{item.kategori}</StyledTableCell>
                                                <StyledTableCell onClick={ApproveDialog} align="center">{item.supplier}</StyledTableCell>
                                                <StyledTableCell onClick={ApproveDialog} align="center">{item.tempo}</StyledTableCell>
                                                <StyledTableCell onClick={ApproveDialog} align="center">{item.tagihan}</StyledTableCell>
                                                <StyledTableCell onClick={ApproveDialog} align="center">{item.total}</StyledTableCell>
                                                <StyledTableCell onClick={ApproveDialog} align="center" style={{ color: '#d38b00' }}>{item.status}</StyledTableCell>
                                                <StyledTableCell onClick={ApproveDialog} align="center">{item.updatedby}</StyledTableCell>
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
                    rowsPerPageOptions={[5, 10, 25, 100]}
                    component="div"
                    count={props.data.content.length}
                    rowsPerPage={itemsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            )}
            <PembelianDialog isOpen={isApprove} setOpen={() => setApprove(false)}></PembelianDialog>
        </Box>
    );
}

export default PenjualanTable;