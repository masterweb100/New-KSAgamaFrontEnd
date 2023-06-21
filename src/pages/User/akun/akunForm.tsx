import React from "react";
import {
  Box,
  Stack,
  TextField,
  Toolbar,
  Select,
  MenuItem,
  SelectChangeEvent,
  CircularProgress,
} from "@mui/material";
import NavigationBarUser from "../../../components/appBarUser";
import { CENTER } from "../../../utils/stylesheet";
import { Colors } from "../../../utils/colors";
import { useNavigate } from "react-router-dom";
import { isMobile } from "react-device-detect";
import secureLocalStorage from "react-secure-storage";
import { HTTPGetAccountCategory } from "../../../apis/User/account/accountCategory";
import { useFormik } from "formik";
import { HTTPAddAccounts } from "../../../apis/User/account/account";

const AkunForm = () => {
  const navigate = useNavigate();
  const [DataCategory, setDataCategory] = React.useState([]);
  const token = secureLocalStorage.getItem("TOKEN") as string;
  const [init, setInit] = React.useState(false);
  const [onSend, setSend] = React.useState(false);

  const AddAccounts = async (values: any) => {
    setSend(true);
    try {
      const resp = await HTTPAddAccounts({
        accountCategoryId: parseInt(values.category),
        accountCode: values.code.toUpperCase(),
        accountName: values.name,
        token: token,
      });
      navigate("/akun");
      setSend(false);
    } catch (error) {
      setSend(false);
      console.log(error);
    }
  };

  const Formik = useFormik({
    initialValues: {
      name: "",
      category: "",
      code: "",
    },
    onSubmit: AddAccounts,
  });

  const GoBack = () => {
    navigate(-1);
  };

  const getCategory = (values: any) => {
    if (values.length === 0) {
      return <span style={{ color: "#a7a5a6" }}>Pilih Kategori</span>;
    } else {
      const result: any = DataCategory.filter(
        (value: any) => value.id === Formik.values.category
      );
      return <span style={{ color: "#000" }}>{result[0].categoryName}</span>;
    }
  };

  const GetCategoryTable = async () => {
    try {
      const response = await HTTPGetAccountCategory({
        limit: "50",
        page: "",
        q: "",
        token: token,
      });
      setDataCategory(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    GetCategoryTable();
  }, [init]);

  return (
    <form onSubmit={Formik.handleSubmit}>
      <div style={{ display: "flex" }}>
        <NavigationBarUser
          title={"Form Tambah Data Akun"}
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
                <h2 style={{ color: "#000" }}>Form Tambah Data Akun</h2>
              </Stack>
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"flex-start"}
                gap={isMobile ? 2 : 3}
              >
                <Stack direction={"column"} gap={1}>
                  <span>*Nama Akun</span>
                  <TextField
                    type="text"
                    size="small"
                    placeholder="Nama Akun"
                    name="name"
                    value={Formik.values.name}
                    onChange={Formik.handleChange}
                    sx={{ bgcolor: "#fff", width: isMobile ? "40vw" : "25vw" }}
                  />
                </Stack>
                <Stack direction={"column"} gap={1}>
                  <span>Kategori</span>
                  <Select
                    displayEmpty
                    sx={{
                      bgcolor: "white",
                      width: isMobile ? "40vw" : "25vw",
                      color: "#000",
                    }}
                    size="small"
                    name="category"
                    value={Formik.values.category}
                    onChange={Formik.handleChange}
                    renderValue={(selected: any) => getCategory(selected)}
                  >
                    {DataCategory.map((item: any, index: number) => (
                      <MenuItem key={index} value={item.id}>
                        {item.categoryName}
                      </MenuItem>
                    ))}
                  </Select>
                </Stack>
              </Stack>
              <Stack direction={"column"} gap={1}>
                <span>Kode Akun</span>
                <TextField
                  type="text"
                  name="code"
                  placeholder="Kode Akun"
                  value={Formik.values.code}
                  onChange={Formik.handleChange}
                  size="small"
                  sx={{ bgcolor: "#fff", width: isMobile ? "40vw" : "25vw" }}
                />
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
                <button type="submit" style={{ all: "unset" }}>
                  <div
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
                      <span style={{ fontSize: 13, color: "#fff" }}>
                        SIMPAN
                      </span>
                    )}
                  </div>
                </button>
              </Stack>
            </Stack>
          </div>
        </Box>
      </div>
    </form>
  );
};

export default AkunForm;
