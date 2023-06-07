import React, { useState } from "react";
import {
  TablePagination,
  Box,
  TableSortLabel,
  TableHead,
  Table,
  TableBody,
  TableContainer,
  Stack,
  TextField,
  Icon,
  InputAdornment,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import { FilterList } from "@mui/icons-material";
import { Colors } from "../../../../utils/colors";
import { isMobile } from "react-device-detect";

const columns = [
  { id: "kode", label: "Kode Akun" },
  { id: "nama", label: "Nama Akun" },
  { id: "kategori", label: "Kategori" },
  { id: "saldo", label: "Saldo" },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    textAlign: "center",
    fontWeight: "700",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const BankTable = (props: any) => {
  const [page, setPage] = React.useState(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(10);

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
            {"Daftar Akun Kas & Bank"}
          </p>
        </Stack>
        <TextField
          type="search"
          size="small"
          placeholder="Pencarian by Nama"
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
                      sx={{ "&:hover": { bgcolor: Colors.inherit } }}
                    >
                      <StyledTableCell align="center">
                        1-00{index}
                      </StyledTableCell>
                      <StyledTableCell align="center" sx={{ color: "#0a00ff" }}>
                        Rekening Bank
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {"Kas & Bank"}
                      </StyledTableCell>
                      <StyledTableCell align="center" sx={{ color: "#0a00ff" }}>
                        {54000 * (index + 1)}
                      </StyledTableCell>
                    </TableRow>
                  );
                })}
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
};

export default BankTable;
