import React from "react";
import { toast } from 'react-toastify';
import {
  TablePagination,
  Box,
  TableHead,
  Table,
  TableBody,
  TableContainer,
  Stack,
  TextField,
  Icon,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import { Colors } from "../../../../utils/colors";
import { isMobile } from "react-device-detect";
import { HTTPGetProducts, HTTPGetProductsQty } from "../../../../apis/User/dataProducts/dataProducts";
import secureLocalStorage from "react-secure-storage";
import moment from "moment";
import { CENTER } from "../../../../utils/stylesheet";

const columns = [
  { id: "date", label: "Tanggal" },
  { id: "id", label: "ID Barang" },
  { id: "brand", label: "Nama Brand" },
  { id: "category", label: "Kategori" },
  { id: "type", label: "Jenis Barang" },
  { id: "unit", label: "Satuan" },
  { id: "status", label: "Status" },
  { id: "quantity", label: "Qty" },
  { id: "source", label: "Sumber" },
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

const DataProdukTable = (props: any) => {
  const token = secureLocalStorage.getItem('USER_SESSION') as string
  const [page, setPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(10);
  const [init, setInit] = React.useState(false);
  const [DataProducts, setDataProducts] = React.useState([]);
  const [pagination, setPagination] = React.useState<any>({})
  const [search, setSearch] = React.useState('')
  const [loader, setLoader] = React.useState(true)
  const [currentQty, setCurrentQty] = React.useState<any>({
    qty: 0,
    totalQty: 0
  })

  const onSearch = (param: any) => {
    setSearch(param.target.value)
    setInit(!init)
  }

  const GetProductsTable = async () => {
    try {
      setLoader(true)
      const response = await HTTPGetProducts({
        token: token,
        limit: itemsPerPage.toString(),
        page: page.toString(),
        q: search.length === 0 ? undefined : search,
      });
      setDataProducts(response.data.data);
      setPagination(response.data.pagination);
      await GetProductQty(response.data.pagination.currentPage)
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

  const GetProductQty = async (page: any) => {
    try {
      const resp = await HTTPGetProductsQty({
        page: page,
        token: token
      })
      setCurrentQty(resp.data.data)
    } catch (error: any) {
      if (error.status === 500) {
        toast.error('Server sedang mengalami gangguan!')
      } else {
        toast.error('Terjadi Kesalahan!')
      };
    }
  }

  React.useEffect(() => {
    GetProductsTable();
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
          <p style={{ color: "#fff", fontWeight: 500, margin: 0 }}>
            Daftar Barang Masuk
          </p>
        </Stack>
        <TextField
          type="search"
          size="small"
          placeholder="Cari..."
          value={search}
          onChange={onSearch}
          sx={{
            bgcolor: "white",
            borderRadius: 1,
            width: isMobile ? "90%" : "20vw",
          }}
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
        <Box>
          {
            loader ?
              <div style={{ ...CENTER, backgroundColor: '#fff', padding: 20 }}>
                <CircularProgress size={40} color={'error'} />
              </div>
              :
              <>
                {
                  DataProducts.length === 0 ?
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
                          {DataProducts.map((item: any, index: number) => {
                            return (
                              <TableRow
                                role="checkbox"
                                tabIndex={-1}
                                key={index}
                                sx={{ "&:hover": { bgcolor: Colors.inherit } }}
                              >
                                <StyledTableCell align="center">
                                  {moment(item.createdAt).format('YYYY/MM/DD')}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  {item.productUnitGenId}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  {item.productBrandName}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  {item.productCategoryName}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  {item.productTypeName}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  {item.productUnitType}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  {item.productStatus.replace(/_/g, ' ')}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  {item.qty}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  <span style={{ fontWeight: '700' }}>{item.source}</span>
                                </StyledTableCell>
                              </TableRow>
                            );
                          })
                          }
                        </TableBody>
                      </Table>
                    </TableContainer>
                }
              </>
          }
        </Box>
        <Stack
          direction={"column"}
          gap={1}
          sx={{ backgroundColor: "#f8f8f8", border: "1px solid #909090" }}
          padding={3}
        >
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            gap={1}
            sx={{ backgroundColor: "#f8f8f8" }}
          >
            <span>
              <b>Sub Total Barang Masuk</b>
            </span>
            <span>
              <b>{currentQty.qty}</b>
            </span>
          </Stack>
          <div
            style={{ width: "100%", backgroundColor: "#000", height: 1 }}
          ></div>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            gap={1}
            sx={{ backgroundColor: "#f8f8f8" }}
          >
            <span>
              <b>Total Barang Masuk</b>
            </span>
            <span>
              <b>{currentQty.totalQty}</b>
            </span>
          </Stack>
        </Stack>
        {DataProducts !== undefined && (
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
};

export default DataProdukTable;
