import React, { useState } from "react";
import { toast } from 'react-toastify';
import { TablePagination, Box, TableSortLabel, TableHead, Table, TableBody, TableContainer, IconButton, Stack, TextField, Icon, InputAdornment, CircularProgress } from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { FilterList } from "@mui/icons-material";
import { Colors } from "../../../../utils/colors";
import { CENTER } from "../../../../utils/stylesheet";
import { isMobile } from 'react-device-detect';
import secureLocalStorage from "react-secure-storage";
import { HTTPGetOpnames } from "../../../../apis/User/dataProducts/dataOpnames";
import moment from "moment";
import { useDispatch } from "react-redux";
import { setOpnameData } from "../../../../stores/reduxes/opname";

const columns = [
    { id: "data", label: "Tanggal" },
    { id: "sku", label: "ID SKU" },
    { id: "id", label: "ID Barang" },
    { id: "brand", label: "Nama Brand" },
    { id: "category", label: "Jenis Barang" },
    { id: "qty", label: "Qty" },
    { id: "harga", label: "Harga" },
    { id: "totalHarga", label: "Total Harga" },
    { id: "status", label: "Status" },
    { id: "updatedby", label: "Updated By" },
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

const DataOpnameTable = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const token = secureLocalStorage.getItem('USER_SESSION') as string
    const [selected, setSelected] = useState<any[]>([]);
    const [page, setPage] = React.useState(1);
    const [itemsPerPage, setItemsPerPage] = React.useState(10);
    const [isStatus, setStatus] = React.useState(false);
    const [isDeleteModal, setDeleteModal] = React.useState(false);
    const [ItemSelected, setItemSelected] = React.useState({})
    const [init, setInit] = React.useState(false);
    const [DataOpnames, setDataOpnames] = React.useState([]);
    const [pagination, setPagination] = React.useState<any>({})
    const [search, setSearch] = React.useState('')
    const [loader, setLoader] = React.useState(true)

    const onSearch = (param: any) => {
        setSearch(param.target.value)
        setInit(!init)
    }

    const GetOpnamesTable = async () => {
        try {
            setLoader(true)
            const response = await HTTPGetOpnames({ token: token });
            setDataOpnames(response.data.data);
            setPagination(response.data.pagination);
            setLoader(false)
        } catch (error: any) {
            setLoader(false)
            console.log(error)
            if (error.status === 500) {
                toast.error('Server sedang mengalami gangguan!')
            } else {
                toast.error('Terjadi Kesalahan!')
            };
        }
    };

    const handleChangePage = (event: any, newPage: any) => {
        setPage(newPage);
        setInit(!init)
    };

    const handleChangeRowsPerPage = (event: any) => {
        setItemsPerPage(parseInt(event.target.value, 10));
        setPage(1);
        setInit(!init)
    };

    const FormPage = (item: any) => {
        dispatch(setOpnameData({ data: item }))
        navigate(`/gudang/data-produk/form-produk/`)
    }

    React.useEffect(() => {
        GetOpnamesTable();
    }, [init]);

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
                    <p style={{ color: "#fff", fontWeight: 500, margin: 0 }}>Daftar Barang Keluar</p>
                </Stack>
                <TextField
                    type="search"
                    size="small"
                    placeholder="Cari..."
                    value={search}
                    onChange={onSearch}
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
                    {
                        loader ?
                            <div style={{ ...CENTER, backgroundColor: '#fff', padding: 20 }}>
                                <CircularProgress size={40} color={'error'} />
                            </div>
                            :
                            <>
                                {
                                    DataOpnames.length === 0 ?
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
                                                                <div style={{ width: 120 }}>
                                                                    {column.label}
                                                                </div>
                                                            </StyledTableCell>
                                                        ))}
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {DataOpnames.map((item: any, index: number) => {
                                                        return (
                                                            <TableRow
                                                                role="checkbox"
                                                                tabIndex={-1}
                                                                key={index}
                                                                sx={{ "&:hover": { bgcolor: Colors.inherit, cursor: 'pointer' } }}
                                                                onClick={() => FormPage(item)}
                                                            >
                                                                <StyledTableCell align="center">{moment(item.createdAt).format('YYYY/MM/DD')}</StyledTableCell >
                                                                <StyledTableCell align="center">{item.productUnitGenId}</StyledTableCell>
                                                                <StyledTableCell align="center">{item.purchasingGenId}</StyledTableCell>
                                                                <StyledTableCell align="center">{item.productBrandName}</StyledTableCell>
                                                                <StyledTableCell align="center">{item.productCategoryName}</StyledTableCell>
                                                                <StyledTableCell align="center">{item.qty}</StyledTableCell>
                                                                <StyledTableCell align="center">{(item.price).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</StyledTableCell>
                                                                <StyledTableCell align="center">{(item.totalPrice).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</StyledTableCell>
                                                                <StyledTableCell align="center">
                                                                    <div style={{ backgroundColor: '#2191b7', padding: '3px 10px', borderRadius: 10, width: '80%', ...CENTER, alignSelf: 'center' }}>
                                                                        <p style={{ margin: 0, color: '#fff' }}>{item.status}</p>
                                                                    </div>
                                                                </StyledTableCell>
                                                                <StyledTableCell align="center">
                                                                    <Stack direction={'row'} gap={2} width={'100%'} justifyContent={'center'} alignItems={'center'}>
                                                                        <span style={{ margin: 0, display: 'flex', alignSelf: 'center' }}>{moment(item.updatedAt).format('YYYY/MM/DD')}</span>
                                                                        <IconButton style={{ width: '15%' }}>
                                                                            <Icon style={{ color: Colors.primary, fontSize: 20 }}>chevron_right</Icon>
                                                                        </IconButton>
                                                                    </Stack>
                                                                </StyledTableCell>
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
                {DataOpnames !== undefined && (
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={pagination.totalItem === undefined ? 0 : pagination.totalItem}
                        rowsPerPage={itemsPerPage}
                        page={page - 1}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                )}
            </Box>
        </div>
    );
}

export default DataOpnameTable;