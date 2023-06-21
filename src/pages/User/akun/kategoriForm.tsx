import React from "react";
import {
  Box,
  CircularProgress,
  Icon,
  IconButton,
  Stack,
  TextField,
  Toolbar,
  Tooltip,
} from "@mui/material";
import NavigationBarUser from "../../../components/appBarUser";
import { CENTER } from "../../../utils/stylesheet";
import { Colors } from "../../../utils/colors";
import { useNavigate } from "react-router-dom";
import { isMobile } from "react-device-detect";
import secureLocalStorage from "react-secure-storage";
import {
  HTTPAddAccountCategory,
  HTTPGenerateAccountsID,
} from "../../../apis/User/account/accountCategory";
import { toast } from "react-toastify";

const KategoriForm = () => {
  const navigate = useNavigate();
  const token = secureLocalStorage.getItem("TOKEN") as string;
  const [idCategory, setIdCategory] = React.useState("");
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
      setSend(false);
      navigate(-1);
    } catch (error: any) {
      setSend(false);
      console.log(error)
      if (error.status === 500) {
        toast.error('Server sedang mengalami gangguan!')
      } else {
        toast.error('Terjadi Kesalahan!')
      };
    }
  };

  const GenId = async () => {
    try {
      const resp = await HTTPGenerateAccountsID();
      setIdCategory(resp.data.data.genId);
    } catch (error: any) {
      console.log(error)
      if (error.status === 500) {
        toast.error('Server sedang mengalami gangguan!')
      } else {
        toast.error('Terjadi Kesalahan!')
      };
    }
  };

  const [init, setInit] = React.useState(false);
  React.useEffect(() => {
    GenId();
  }, [init]);

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
                  id="id"
                  name="id"
                  value={idCategory}
                  disabled
                  size="small"
                  placeholder="ID"
                  sx={{ bgcolor: "#f4f4f4", width: isMobile ? "40vw" : "25vw" }}
                  InputProps={{
                    endAdornment: (
                      <Tooltip title="Regenerate ID">
                        <IconButton onClick={GenId}>
                          <Icon sx={{ fontSize: 25, color: Colors.primary }}>
                            refresh
                          </Icon>
                        </IconButton>
                      </Tooltip>
                    ),
                  }}
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
