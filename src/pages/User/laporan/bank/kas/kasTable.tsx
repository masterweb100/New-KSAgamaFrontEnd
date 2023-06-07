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
  Checkbox,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import { FilterList } from "@mui/icons-material";
import { Colors } from "../../../../../utils/colors";
import { isMobile } from "react-device-detect";
import moment from "moment";
import { CENTER } from "../../../../../utils/stylesheet";
import KasModal from "./kasModal";
import { useNavigate } from "react-router-dom";

const columns = [
  { id: "tanggal", label: "Tanggal" },
  { id: "deskripsi", label: "Deskripsi" },
  { id: "referensi", label: "Referensi" },
  { id: "terima", label: "Terima" },
  { id: "kirim", label: "Kirim" },
  { id: "saldo", label: "Saldo" },
  { id: "updated", label: "Updated By" },
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

const KasTable = (props: any) => {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(10);
  const [transferModal, setTransferModal] = React.useState(false);

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const ButtonStack = {
    ...CENTER,
    padding: "6px 15px",
    borderRadius: 2,
    border: "2px solid #ababab",
    color: "#ababab",
    transition: "all 0.3s",
    "&:hover": {
      border: `2px solid ${Colors.primary}`,
      color: Colors.primary,
      cursor: "pointer",
      transition: "all 0.3s",
      transform: "scale(1.05)",
    },
  };

  return (
    <div>
      <Stack direction={"row"} gap={2} alignItems={"center"}>
        <div onClick={() => setTransferModal(true)}>
          <Box sx={{ ...ButtonStack }}>
            <Stack direction={"row"} gap={1} alignItems={"center"}>
              <Icon sx={{ color: "inherit", fontSize: 25 }}>
                compare_arrows
              </Icon>
              <span style={{ color: "inherit", fontWeight: 500 }}>
                Transfer Data
              </span>
            </Stack>
          </Box>
        </div>
        <div onClick={() => navigate("/laporan/bank/kas/deposit")}>
          <Box sx={{ ...ButtonStack }}>
            <Stack direction={"row"} gap={1} alignItems={"center"}>
              <Icon sx={{ color: "inherit", fontSize: 25 }}>send</Icon>
              <span style={{ color: "inherit", fontWeight: 500 }}>
                Kirim Dana
              </span>
            </Stack>
          </Box>
        </div>
        <div onClick={() => navigate("/laporan/bank/kas/withdraw")}>
          <Box sx={{ ...ButtonStack }}>
            <Stack direction={"row"} gap={1} alignItems={"center"}>
              <Icon sx={{ color: "inherit", fontSize: 25 }}>
                account_balance_wallet
              </Icon>
              <span style={{ color: "inherit", fontWeight: 500 }}>
                Terima Dana
              </span>
            </Stack>
          </Box>
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
                        {moment().format("DD/MM/YYYY")}
                      </StyledTableCell>
                      <StyledTableCell align="center" sx={{ color: "#0a00ff" }}>
                        Kirim dana ke toko B keperluan produk
                      </StyledTableCell>
                      <StyledTableCell align="center">-</StyledTableCell>
                      <StyledTableCell align="center">-</StyledTableCell>
                      <StyledTableCell align="center">
                        15.000.000
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        30.000.000
                      </StyledTableCell>
                      <StyledTableCell align="center">Admin B</StyledTableCell>
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
      <KasModal
        isOpen={transferModal}
        onClose={() => setTransferModal(false)}
      ></KasModal>
    </div>
  );
};

export default KasTable;
