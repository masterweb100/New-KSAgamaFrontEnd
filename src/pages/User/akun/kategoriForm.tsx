import React from "react";
import {
  Box,
  CircularProgress,
  Stack,
  TextField,
  Toolbar,
} from "@mui/material";
import NavigationBarUser from "../../../components/appBarUser";
import { CENTER } from "../../../utils/stylesheet";
import { Colors } from "../../../utils/colors";
import { useNavigate } from "react-router-dom";
import { isMobile } from "react-device-detect";
import secureLocalStorage from "react-secure-storage";
import { HTTPAddAccountCategory } from "../../../apis/User/account/accountCategory";

const KategoriForm = () => {
  const navigate = useNavigate();
  const token = secureLocalStorage.getItem("TOKEN") as string;
  const [idCategory, setCategory] = React.useState(
    (Math.random() + 1).toString(36).substring(7).toUpperCase()
  );
  const [categoryName, setCategoryName] = React.useState("");
  const [onSend, setSend] = React.useState(false);

  const GoBack = () => {
    navigate(-1);
  };

  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(event.target.value);
  };

  const AddCategory = async () => {
    setSend(true);
    try {
      const resp = await HTTPAddAccountCategory({
        categoryName: categoryName,
        token: token,
        genId: idCategory,
      });
      console.log(resp);
      setSend(false);
      navigate("/akun/kategori-akun");
    } catch (error) {
      setSend(false);
      console.log(error);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <NavigationBarUser
        title={"Form Tambah Kategori Akun"}
        isChild={true}
        name={"Akun"}
        idPanel={5}
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
              <h2 style={{ color: "#000" }}>Form Tambah Kategori Akun</h2>
            </Stack>
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"flex-start"}
              gap={isMobile ? 2 : 3}
            >
              <Stack direction={"column"} gap={1}>
                <span>ID Kategori</span>
                <TextField
                  type="text"
                  size="small"
                  value={idCategory}
                  disabled
                  sx={{ bgcolor: "#f4f4f4", width: isMobile ? "40vw" : "25vw" }}
                />
              </Stack>
              <Stack direction={"column"} gap={1}>
                <span>Nama Kategori</span>
                <TextField
                  type="text"
                  value={categoryName}
                  onChange={handleName}
                  placeholder="Nama Kategori"
                  size="small"
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
                onClick={AddCategory}
                style={{
                  ...CENTER,
                  borderRadius: 10,
                  backgroundColor: Colors.primary,
                  padding: "10px 30px",
                  cursor: "pointer",
                  color: "#fff",
                }}
              >
                {onSend === true ? (
                  <CircularProgress size={20} color={"inherit"} />
                ) : (
                  <span style={{ fontSize: 13, color: "#fff" }}>SIMPAN</span>
                )}
              </div>
            </Stack>
          </Stack>
        </div>
      </Box>
    </div>
  );
};

export default KategoriForm;
