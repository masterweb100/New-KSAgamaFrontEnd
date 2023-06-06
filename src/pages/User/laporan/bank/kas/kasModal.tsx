import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Icon,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material";
import React from "react";
import { CENTER } from "../../../../../utils/stylesheet";
import { Colors } from "../../../../../utils/colors";
import { isMobile } from "react-device-detect";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";

const KasModal = ({ isOpen, onClose }: any) => {
  const [date, setDate] = React.useState<any>(moment());
  const [akunFrom, setAkunFrom] = React.useState("");
  const [akunTo, setAkunTo] = React.useState("");

  const handleAkunFrom = (event: SelectChangeEvent) => {
    setAkunFrom(event.target.value as string);
  };

  const handleAkunTo = (event: SelectChangeEvent) => {
    setAkunTo(event.target.value as string);
  };

  const handleClose = () => onClose(false);

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      scroll={"body"}
      fullScreen={isMobile}
      PaperProps={{ style: { maxWidth: "100vw" } }}
    >
      <DialogTitle>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <b>Form Tambah Data Supplier</b>
          <div onClick={handleClose} style={{ cursor: "pointer" }}>
            <Icon style={{ color: Colors.secondary, fontSize: 25 }}>close</Icon>
          </div>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <Stack direction={"column"} gap={3} marginTop={5}>
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
                  width: isMobile ? "40vw" : "15vw",
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
              <span>*Dari Akun</span>
              <Select
                size="small"
                value={akunFrom}
                displayEmpty
                sx={{
                  bgcolor: "white",
                  width: isMobile ? "40vw" : "25vw",
                  color: "#000",
                }}
                onChange={handleAkunFrom}
                renderValue={(selected: any) => {
                  if (selected.length === 0) {
                    return <span style={{ color: "#a7a5a6" }}>1-10003</span>;
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
              <span>*Ke Akun</span>
              <Select
                size="small"
                value={akunTo}
                displayEmpty
                sx={{
                  bgcolor: "white",
                  width: isMobile ? "40vw" : "25vw",
                  color: "#000",
                }}
                onChange={handleAkunTo}
                renderValue={(selected: any) => {
                  if (selected.length === 0) {
                    return <span style={{ color: "#a7a5a6" }}>1-10002</span>;
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
          </Stack>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"flex-start"}
            gap={isMobile ? 2 : 3}
          >
            <Stack direction={"column"} gap={1}>
              <span>*Total Transaksi</span>
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
              <span>*Referensi</span>
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
            justifyContent={"center"}
            gap={2}
            marginTop={5}
          >
            <div
              onClick={handleClose}
              style={{
                ...CENTER,
                borderRadius: 10,
                border: `1px solid ${Colors.primary}`,
                padding: "10px 30px",
                cursor: "pointer",
              }}
            >
              <span style={{ fontSize: 13, color: Colors.primary }}>BATAL</span>
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
      </DialogContent>
    </Dialog>
  );
};

export default KasModal;
