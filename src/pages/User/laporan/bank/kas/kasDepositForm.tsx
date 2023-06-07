import {
  Box,
  CircularProgress,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Toolbar,
} from "@mui/material";
import React from "react";
import NavigationBarUser from "../../../../../components/appBarUser";
import { childData } from "../../dummy";
import { isMobile } from "react-device-detect";
import KasTable from "./kasTable";
import { CENTER } from "../../../../../utils/stylesheet";
import { Colors } from "../../../../../utils/colors";
import moment from "moment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useNavigate } from "react-router-dom";

const KasDepositForm = () => {
  const navigate = useNavigate();
  const [date, setDate] = React.useState<any>(moment());
  const [akunKontak, setAkunKontak] = React.useState("");
  const [akunDetail, setAkunDetail] = React.useState("");
  const [tax, setTax] = React.useState("");

  const handleAkunKontak = (event: SelectChangeEvent) => {
    setAkunKontak(event.target.value as string);
  };

  const handleAkunDetail = (event: SelectChangeEvent) => {
    setAkunDetail(event.target.value as string);
  };

  const handleTax = (event: SelectChangeEvent) => {
    setTax(event.target.value as string);
  };

  const GoBack = () => navigate(-1);

  return (
    <div style={{ display: "flex" }}>
      <NavigationBarUser
        title={"Form Kirim Dana"}
        isChild={true}
        name={"Kelola Kas & Bank"}
        idPanel={6}
      ></NavigationBarUser>
      <Box
        component="main"
        sx={{
          bgcolor: "#f4f5ff",
          p: isMobile ? 2 : 5,
          width: "100vw",
          minHeight: "100vh",
        }}
      >
        <Toolbar />
        <div style={{ flex: 1, ...CENTER }}>
          <Stack
            direction={"column"}
            gap={3}
            sx={{
              backgroundColor: "#fff",
              borderRadius: 2,
              border: "1px solid #cccccc",
              padding: "4% 3%",
            }}
          >
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <h2 style={{ color: "#000" }}>Kirim Dana</h2>
              <h2 style={{ color: "#000" }}>{"Kas (1-21020)"}</h2>
            </Stack>
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"flex-start"}
              gap={isMobile ? 2 : 3}
            >
              <Stack direction={"column"} gap={1}>
                <span>*ID Transaksi</span>
                <TextField
                  type="text"
                  size="small"
                  disabled
                  defaultValue={"I22WE90"}
                  sx={{ bgcolor: "#f4f4f4", width: isMobile ? "40vw" : "25vw" }}
                />
              </Stack>
              <Stack direction={"column"} gap={1}>
                <span>*Tanggal Transaksi</span>
                <DatePicker
                  value={date}
                  onChange={(date) => setDate(date)}
                  sx={{
                    bgcolor: "white",
                    borderRadius: 1,
                    width: isMobile ? "40vw" : "25vw",
                  }}
                />
              </Stack>
            </Stack>
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"flex-start"}
              gap={isMobile ? 2 : 3}
            >
              <Stack direction={"column"} gap={1}>
                <span>*Ke Kontak</span>
                <Select
                  size="small"
                  value={akunKontak}
                  displayEmpty
                  sx={{
                    bgcolor: "white",
                    width: isMobile ? "40vw" : "25vw",
                    color: "#000",
                  }}
                  onChange={handleAkunKontak}
                  renderValue={(selected: any) => {
                    if (selected.length === 0) {
                      return (
                        <span style={{ color: "#a7a5a6" }}>Pilih Akun</span>
                      );
                    }
                    return selected;
                  }}
                >
                  {["A", "B", "C", "D", "E"].map((item, index) => (
                    <MenuItem
                      key={index}
                      value={`Akun ${item}`}
                    >{`Akun ${item}`}</MenuItem>
                  ))}
                </Select>
              </Stack>
              <Stack direction={"column"} gap={1}>
                <span>Referensi</span>
                <TextField
                  type="text"
                  size="small"
                  placeholder="Referensi"
                  sx={{ bgcolor: "#fff", width: isMobile ? "40vw" : "25vw" }}
                />
              </Stack>
            </Stack>
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <h2 style={{ color: "#000" }}>Detail</h2>
            </Stack>
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"flex-start"}
              gap={isMobile ? 2 : 3}
            >
              <Stack direction={"column"} gap={1}>
                <span>Pilih Akun</span>
                <Select
                  size="small"
                  value={akunDetail}
                  displayEmpty
                  sx={{
                    bgcolor: "white",
                    width: isMobile ? "40vw" : "25vw",
                    color: "#000",
                  }}
                  onChange={handleAkunDetail}
                  renderValue={(selected: any) => {
                    if (selected.length === 0) {
                      return (
                        <span style={{ color: "#a7a5a6" }}>Pilih Akun</span>
                      );
                    }
                    return selected;
                  }}
                >
                  {["A", "B", "C", "D", "E"].map((item, index) => (
                    <MenuItem
                      key={index}
                      value={`Akun ${item}`}
                    >{`Akun ${item}`}</MenuItem>
                  ))}
                </Select>
              </Stack>
              <Stack direction={"column"} gap={1}>
                <span>Pajak</span>
                <Select
                  size="small"
                  value={tax}
                  displayEmpty
                  sx={{
                    bgcolor: "white",
                    width: isMobile ? "40vw" : "25vw",
                    color: "#000",
                  }}
                  onChange={handleTax}
                  renderValue={(selected: any) => {
                    if (selected.length === 0) {
                      return (
                        <span style={{ color: "#a7a5a6" }}>PPN / PPH</span>
                      );
                    }
                    return selected;
                  }}
                >
                  {["PPN", "PPH"].map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </Stack>
            </Stack>
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"flex-start"}
              gap={isMobile ? 2 : 3}
            >
              <Stack direction={"column"} gap={1}>
                <span>Total Transaksi</span>
                <TextField
                  type="text"
                  size="small"
                  placeholder="0"
                  sx={{
                    bgcolor: "#fff",
                    width: isMobile ? "40vw" : "25vw",
                  }}
                />
              </Stack>
              <Stack direction={"column"} gap={1}>
                <span>Deskripsi</span>
                <TextField
                  type="text"
                  size="small"
                  placeholder="Deskripsi"
                  sx={{ bgcolor: "#fff", width: isMobile ? "40vw" : "25vw" }}
                />
              </Stack>
            </Stack>
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"flex-start"}
              gap={isMobile ? 2 : 3}
            >
              <div style={{ width: isMobile ? "40vw" : "25vw" }}></div>
              <Stack
                direction={"column"}
                spacing={1}
                style={{ width: isMobile ? "40vw" : "25vw" }}
              >
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <b>
                    <span style={{ color: "#000" }}>Sub Total</span>
                  </b>
                  <span style={{ color: Colors.secondary }}>3</span>
                </Stack>
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <b>
                    <span style={{ color: "#000" }}>Pajak</span>
                  </b>
                  <span style={{ color: Colors.secondary }}>Rp. 300</span>
                </Stack>
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <b>
                    <span style={{ color: "#000" }}>Total Harga</span>
                  </b>
                  <span style={{ color: Colors.secondary }}>Rp. 90.000</span>
                </Stack>
              </Stack>
            </Stack>
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"center"}
              gap={2}
              marginTop={5}
            >
              <div
                onClick={GoBack}
                style={{
                  ...CENTER,
                  borderRadius: 10,
                  border: `1px solid ${Colors.primary}`,
                  padding: "10px 30px",
                  cursor: "pointer",
                }}
              >
                <span style={{ fontSize: 13, color: Colors.primary }}>
                  BATAL
                </span>
              </div>
              <div
                style={{
                  ...CENTER,
                  borderRadius: 10,
                  backgroundColor: Colors.primary,
                  padding: "10px 30px",
                  cursor: "pointer",
                }}
              >
                <span style={{ fontSize: 13, color: "#fff" }}>SIMPAN</span>
              </div>
            </Stack>
          </Stack>
        </div>
      </Box>
    </div>
  );
};

export default KasDepositForm;
