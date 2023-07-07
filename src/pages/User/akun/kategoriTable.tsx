import React, { useState } from "react";
import { toast } from "react-toastify";
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
  CircularProgress,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { FilterList } from "@mui/icons-material";
import { Colors } from "../../../utils/colors";
import { CENTER } from "../../../utils/stylesheet";
import { isMobile } from "react-device-detect";

const columns = [
  { id: "id", label: "ID Kategori" },
  { id: "nama", label: "Nama Kategori" },
];

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    textAlign: "center",
    fontWeight: "700",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const KategoriTable = (props: any) => {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(10);
  const [search, setSearch] = React.useState("");
  const [selected, setSelected] = useState<any[]>([]);

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage + 1);
    props.changePage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    props.itemsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const handleSearch = (event: any) => {
    setSearch(event.target.value);
    props.search(event.target.value);
  };

  const FormPage = () => navigate("/akun/form-kategori");

  return (
    <div>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Stack
          direction={"row"}
          justifyContent={"flex-start"}
          alignItems={"center"}
          gap={2}
        >
          <div
            onClick={FormPage}
            style={{
              ...CENTER,
              backgroundColor: Colors.primary,
              borderRadius: 5,
              cursor: "pointer",
              padding: isMobile ? "12px 10px" : "10px 30px",
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
                Tambah Data Kategori Akun
              </p>
            </Stack>
          </div>
        </Stack>
        <div
          // onClick={() => handleDelete("open")}
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
            Daftar Data Akun
          </p>
        </Stack>
        <TextField
          type="search"
          size="small"
          placeholder="Cari..."
          value={search}
          onChange={handleSearch}
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
          {props.loader ? (
            <div style={{ ...CENTER, backgroundColor: "#fff", padding: 20 }}>
              <CircularProgress size={40} color={"error"} />
            </div>
          ) : (
            <>
              {props.data.length === 0 ? (
                <div style={{ ...CENTER, padding: "20px 0" }}>
                  <span>Tidak ada data</span>
                </div>
              ) : (
                <TableContainer>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        {columns.map((column: any) => (
                          <StyledTableCell key={column.id}>
                            {column.label}
                          </StyledTableCell>
                        ))}
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {props.data.map((item: any, index: number) => {
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
                            <StyledTableCell align="center">
                              {item.genId}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {item.categoryName}
                            </StyledTableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </>
          )}
        </Box>
        {props.data !== undefined && (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={
              props.pagination.totalItem === undefined
                ? 0
                : props.pagination.totalItem
            }
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

export default KategoriTable;
