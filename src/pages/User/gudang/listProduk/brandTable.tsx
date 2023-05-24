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
  InputAdornment,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { FilterList } from "@mui/icons-material";
import { Colors } from "../../../../utils/colors";
import { CENTER } from "../../../../utils/stylesheet";
import { isMobile } from "react-device-detect";
import { HTTPGetCategories } from "../../../../apis/User/product/category";
import secureLocalStorage from "react-secure-storage";
import { HTTPGetBrands } from "../../../../apis/User/product/brand";
import moment from "moment";

const columns = [
  { id: "id", label: "ID Jenis Produk" },
  { id: "brand", label: "Nama Brand" },
  { id: "jenis", label: "Nama Kategori" },
  // { id: "minstok", label: "Min. Stok" },
  { id: "updatedBy", label: "Updated By" },
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

const BrandTable = () => {
  const navigate = useNavigate();
  const token = secureLocalStorage.getItem("TOKEN") as string
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [itemsPerPage, setItemsPerPage] = React.useState(10);
  const [BrandData, setBrandData] = React.useState([]);
  const [init, setInit] = React.useState(false)
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1);
  const [pagination, setPagination] = React.useState<any>({});
  const [search, setSearch] = React.useState('');

  const GetBrand = async () => {
    try {
      const resp = await HTTPGetBrands({
        limit: limit.toString(),
        page: page.toString(),
        q: search,
        token: token
      })
      console.log(resp)
      setBrandData(resp.data.data)
      setPagination(resp.data.pagination)
    } catch (error) {
      console.log(error)
    }
  }

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage + 1);
    setInit(!init)
  };

  const handleChangeRowsPerPage = (event: any) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    setLimit(parseInt(event.target.value, 10))
    setPage(1);
    setInit(!init)
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
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = BrandData.map((n: any, index: number) =>
        index.toString()
      );
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const isSelected = (name: any) => selected.indexOf(name) !== -1;
  const FormAddBrand = () => navigate("/gudang/list-produk/form-brand/add");

  const FormUpdateBrand = () => {
    if (selected.length > 0) {
      navigate("/gudang/list-produk/form-brand/update");
    }
  };

  React.useEffect(() => {
    GetBrand()
  }, [init])

  return (
    <div>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <div
          onClick={FormAddBrand}
          style={{
            ...CENTER,
            backgroundColor: Colors.primary,
            borderRadius: 5,
            cursor: "pointer",
            padding: isMobile ? "12px 15px" : "10px 30px",
            alignSelf: "flex-start",
          }}
        >
          <Stack alignItems={"center"} direction={"row"} gap={1}>
            <Icon style={{ color: "#fff", fontSize: 17 }}>add</Icon>
            <p
              style={{
                margin: 0,
                fontWeight: 500,
                fontSize: isMobile ? 13 : 15,
                color: "#fff",
              }}
            >
              Tambah Data Brand
            </p>
          </Stack>
        </div>
        <Stack direction={"row"} alignItems={"center"} gap={isMobile ? 1 : 2}>
          <div
            onClick={FormUpdateBrand}
            style={{
              ...CENTER,
              backgroundColor:
                selected.length === 0 ? Colors.secondary : Colors.warning,
              borderRadius: 5,
              cursor: "pointer",
              padding: 10,
            }}
          >
            <Icon style={{ color: "#fff", fontSize: isMobile ? 20 : 25 }}>
              border_color
            </Icon>
          </div>
          <div
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
          <p style={{ color: "#fff", fontWeight: 500, margin: 0 }}>
            Daftar Data Brand
          </p>
        </Stack>
        <TextField
          type="search"
          size="small"
          placeholder="Pencarian by ID"
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
        <Box sx={{ border: 1, borderColor: Colors.secondary }}>
          {
            BrandData.length === 0 ?
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
                          indeterminate={
                            selected.length > 0 &&
                            selected.length < BrandData.length
                          }
                          checked={
                            BrandData.length > 0 &&
                            selected.length === BrandData.length
                          }
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
                    {BrandData.map((item: any, index: number) => {
                      const isItemSelected = isSelected(index.toString());
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          role="checkbox"
                          tabIndex={-1}
                          key={index}
                          sx={{
                            "&:hover": { bgcolor: Colors.inherit },
                            cursor: "pointer",
                          }}
                        >
                          <StyledTableCell
                            onClick={(e) => handleClick(e, index.toString())}
                            align="center"
                            padding="checkbox"
                          >
                            <Checkbox
                              color="primary"
                              checked={isItemSelected}
                              inputProps={{
                                "aria-labelledby": labelId,
                              }}
                            />
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {item.id}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {item.brandName}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {item.productCategoryId}
                          </StyledTableCell>
                          {/* <StyledTableCell align="center">
                            590
                          </StyledTableCell> */}
                          <StyledTableCell align="center">
                            {item.updatedAt === null ? moment(item.createdAt).format('DD MMMM YYYY, hh:mm') : item.updatedAt}
                          </StyledTableCell>
                        </TableRow>
                      );
                    })
                    }
                  </TableBody>
                </Table>
              </TableContainer>
          }
        </Box>
        {BrandData !== undefined && (
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

export default BrandTable;
