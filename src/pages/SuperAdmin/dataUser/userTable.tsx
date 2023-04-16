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
    TextField,
    InputAdornment,
    Icon
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { FilterList } from "@mui/icons-material";
import { Colors } from "../../../utils/colors";
import { CENTER } from "../../../utils/stylesheet";
import DeleteModal from '../../../components/deleteModal';
import { isMobile } from 'react-device-detect';

const columns = [
    { id: "id", label: "ID Pengguna" },
    { id: "name", label: "Nama Pengguna" },
    { id: "store", label: "Nama Toko" },
    { id: "role", label: "Role Pengguna" },
    { id: "isActive", label: "Status" },
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

const UserTable = (props: any) => {
    const navigate = useNavigate();
    const [selected, setSelected] = useState<readonly string[]>([])
    const [page, setPage] = React.useState(0);
    const [itemsPerPage, setItemsPerPage] = React.useState(10);
    const [isDeleteModal, setDeleteModal] = React.useState(false);

    const handleDelete = () => {
        if (selected.length > 0) {
            setDeleteModal(!isDeleteModal);
        }
    };

    const handleChangePage = (event: any, newPage: any) => {
        setPage(newPage);
        console.log(event)
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

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = props.data.content.map((n: any) => n.id.toString());
            setSelected(newSelected);
            return;
        }
        setSelected([]);
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

    const isSelected = (name: any) => selected.indexOf(name) !== -1;

    const FormAddUser = () => {
        navigate('/user-data/form-user/add')
    }

    const FormUpdateUser = () => {
        navigate('/user-data/form-user/update')
    }

    return (
        <div>
            <div style={{ maxWidth: isMobile ? '100vw' : '78vw' }}>
                <Stack direction={'column'} gap={4}>
                    <Stack direction={'row'} gap={1}>
                        <div className='btn-active'>
                            <p style={{ margin: 0, fontWeight: 600, fontSize: 15 }}>Semua</p>
                        </div>
                        <div className='btn-inactive'>
                            <p style={{ margin: 0, fontWeight: 600, fontSize: 15 }}>Admin</p>
                        </div>
                        <div className='btn-inactive'>
                            <p style={{ margin: 0, fontWeight: 600, fontSize: 15 }}>User</p>
                        </div>
                    </Stack>
                    <Stack direction={'row'} justifyContent={'space-between'}>
                        <div onClick={FormAddUser} style={{ ...CENTER, backgroundColor: Colors.primary, borderRadius: 5, cursor: 'pointer', padding: isMobile ? '12px 15px' : '10px 30px', alignSelf: 'flex-start' }}>
                            <Stack alignItems={'center'} direction={'row'} gap={1}>
                                <Icon style={{ color: '#fff', fontSize: 17 }}>add</Icon>
                                <p style={{ margin: 0, fontWeight: 500, fontSize: isMobile ? 13 : 15, color: '#ffff' }}>Tambah Data Pengguna</p>
                            </Stack>
                        </div>
                        <div onClick={handleDelete} style={{ ...CENTER, backgroundColor: selected.length === 0 ? Colors.secondary : Colors.error, borderRadius: 5, cursor: 'pointer', padding: 10 }}>
                            <Icon style={{ color: '#fff', fontSize: isMobile ? 20 : 25 }}>delete_outline</Icon>
                        </div>
                    </Stack>
                </Stack>
                <div style={{ marginTop: 10 }}>
                    <Stack
                        direction={isMobile ? "column" : "row"}
                        alignItems={"center"}
                        gap={3}
                        justifyContent={isMobile ? "center" : "space-between"}
                        sx={{
                            paddingX: 4,
                            paddingY: 2,
                            backgroundColor: Colors.primary,
                            borderRadius: "10px 10px 0px 0px",
                        }}
                    >
                        <Stack alignItems={"center"} gap={2} direction={"row"}>
                            <Icon sx={{ fontSize: 27, color: "#fff" }}>view_list</Icon>
                            <p style={{ color: "#fff", fontWeight: 500, margin: 0 }}>Daftar Data Pengguna</p>
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
                </div>
            </div>
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
                                            const isItemSelected = isSelected(item.id.toString());
                                            const labelId = `enhanced-table-checkbox-${index}`;

                                            return (
                                                <TableRow
                                                    role="checkbox"
                                                    tabIndex={-1}
                                                    key={index}
                                                    sx={{ "&:hover": { bgcolor: Colors.inherit }, cursor: 'pointer' }}
                                                >
                                                    <StyledTableCell onClick={(e) => handleClick(e, item.id.toString())} align="center" padding="checkbox">
                                                        <Checkbox
                                                            color="primary"
                                                            checked={isItemSelected}
                                                            inputProps={{
                                                                'aria-labelledby': labelId,
                                                            }}
                                                        />
                                                    </StyledTableCell>
                                                    <StyledTableCell onClick={FormUpdateUser} align="center">{item.id}</StyledTableCell>
                                                    <StyledTableCell onClick={FormUpdateUser} align="center">{item.name}</StyledTableCell>
                                                    <StyledTableCell onClick={FormUpdateUser} align="center">{item.store}</StyledTableCell>
                                                    <StyledTableCell onClick={FormUpdateUser} align="center">{item.role}</StyledTableCell>
                                                    <StyledTableCell onClick={FormUpdateUser} align="center">
                                                        {
                                                            item.isActive ?
                                                                <div style={{ ...CENTER, backgroundColor: Colors.success, padding: '5px 10px', borderRadius: 10 }}>
                                                                    <p style={{ color: '#fff', margin: 0 }}>Active</p>
                                                                </div>
                                                                :
                                                                <div style={{ ...CENTER, backgroundColor: Colors.error, padding: '5px 10px', borderRadius: 10 }}>
                                                                    <p style={{ color: '#fff', margin: 0 }}>Deactive</p>
                                                                </div>
                                                        }
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
            <DeleteModal isOpen={isDeleteModal} setOpen={handleDelete} />
        </div>
    );
}

export default UserTable;