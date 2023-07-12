import React from "react";
import { toast } from "react-toastify";
import {
  Box,
  Stack,
  TextField,
  Toolbar,
  Icon,
  Tooltip,
  IconButton,
  CircularProgress,
} from "@mui/material";
import NavigationBarUser from "../../../../components/appBarUser";
import { CENTER } from "../../../../utils/stylesheet";
import { Colors } from "../../../../utils/colors";
import { useNavigate, useParams } from "react-router-dom";
import { isMobile } from "react-device-detect";
import secureLocalStorage from "react-secure-storage";
import {
  HTTPAddCategory,
  HTTPGenerateCategoryID,
} from "../../../../apis/User/product/category";

const KategoriForm = () => {
  const navigate = useNavigate();
  const { action }: any = useParams();
  const [init, setInit] = React.useState(false);
  const [genId, setGenId] = React.useState("");
  const [name, setName] = React.useState("");
  const [onSend, setSend] = React.useState(false);
  const [nameErr, setNameErr] = React.useState(false);
  const [nameErrText, setNameErrText] = React.useState("");

  const AddCategory = async () => {
    const token = secureLocalStorage.getItem("USER_SESSION") as string;
    setNameErr(false);
    setNameErrText("");
    setSend(true);
    try {
      if (name.length === 0) {
        setNameErr(true);
        setNameErrText("Pastikan Nama Telah Terisi");
        setSend(false);
      } else {
        const resp = await HTTPAddCategory({
          categoryName: name,
          genId: genId,
          token: token,
        });
        setSend(false);
        navigate("/gudang/list-produk");
      }
    } catch (error: any) {
      console.log(error);
      if (error.status === 500) {
        toast.error("Server sedang mengalami gangguan!");
      } else {
        toast.error("Terjadi Kesalahan!");
      }
      setNameErr(true);
      setNameErrText("Nama Role sudah tersedia");
      setSend(false);
      GetID();
    }
  };

  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSubmit = (event: any) => {
    if (event.key === "Enter") {
      AddCategory();
    }
  };

  const GoBack = () => {
    navigate(-1);
  };

  const GetID = async () => {
    try {
      const resp = await HTTPGenerateCategoryID();
      setGenId(resp.data.data.genId);
    } catch (error: any) {
      console.log(error);
      if (error.status === 500) {
        toast.error("Server sedang mengalami gangguan!");
      } else {
        toast.error("Terjadi Kesalahan!");
      }
    }
  };

  React.useEffect(() => {
    GetID();
  }, [init]);

  return (
    <div style={{ display: "flex" }}>
      <NavigationBarUser
        title={"Form Data Kategori"}
        isChild={true}
        name={"List Produk"}
        idPanel={2}
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
              <h2 style={{ color: "#000" }}>Form Data Kategori</h2>
              {action === "update" ? (
                <div
                  style={{
                    backgroundColor: Colors.warning,
                    height: 40,
                    width: 40,
                    ...CENTER,
                    borderRadius: 10,
                  }}
                >
                  <Icon style={{ color: "#fff", fontSize: 20 }}>
                    border_color
                  </Icon>
                </div>
              ) : null}
            </Stack>
            <Stack
              direction={"row"}
              justifyContent={"flex-start"}
              gap={isMobile ? 2 : 3}
            >
              <Stack direction={"column"} gap={1}>
                <span>ID Kategori</span>
                <TextField
                  type="text"
                  disabled
                  value={genId}
                  size="small"
                  sx={{ bgcolor: "#f4f4f4", width: isMobile ? "40vw" : "25vw" }}
                  InputProps={{
                    endAdornment:
                      action === "update" ? null : (
                        <Tooltip title="Regenerate ID">
                          <IconButton onClick={GetID}>
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
                  size="small"
                  value={name}
                  required
                  onKeyDown={handleSubmit}
                  onChange={handleName}
                  placeholder={"Nama Kategori"}
                  sx={{ bgcolor: "#fff", width: isMobile ? "40vw" : "25vw" }}
                />
                {nameErr === true ? (
                  <small
                    style={{
                      fontWeight: 400,
                      margin: 0,
                      color: Colors.primary,
                    }}
                  >
                    {nameErrText}
                  </small>
                ) : (
                  <small style={{ margin: 0 }}></small>
                )}
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
