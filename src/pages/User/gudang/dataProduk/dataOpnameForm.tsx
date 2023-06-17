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
import NavigationBarUser from "../../../../components/appBarUser";
import { CENTER } from "../../../../utils/stylesheet";
import { Colors } from "../../../../utils/colors";
import { useNavigate } from "react-router-dom";
import { isMobile } from "react-device-detect";
import { useSelector } from "react-redux";
import { RootState } from "../../../../stores/rootReducer";
import moment from "moment";
import { HTTPUpdateStatusOpnames } from "../../../../apis/User/dataProducts/dataOpnames";
import secureLocalStorage from "react-secure-storage";

const DataProdukForm = () => {
  const navigate = useNavigate();
  const OpnameRedux = useSelector((state: RootState) => state.OpnamesData.data)
  const [GoodProducts, setGoodProducts] = React.useState('')
  const [BadProducts, setBadProducts] = React.useState('')
  const token = secureLocalStorage.getItem('TOKEN')
  const [loader, setLoader] = React.useState(false)

  const GoBack = () => {
    navigate(-1);
  };

  const handleSubmit = async () => {
    setLoader(true)
    try {
      const data = {
        purchasingProductId: OpnameRedux.id,
        date: moment().format('YYYY-MM-DD'),
        goodQty: parseInt(GoodProducts),
        damagedQty: parseInt(BadProducts),
        token: token as string
      }
      await HTTPUpdateStatusOpnames(data)
      setLoader(false)
      GoBack()
    } catch (error) {
      setLoader(false)
      console.log(error)
    }
  }

  return (
    <div style={{ display: "flex" }}>
      <NavigationBarUser
        title={"Detail Data Produk"}
        name={"Data Produk"}
        idPanel={2}
        isChild={true}
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
              <h2 style={{ color: "#000" }}>Form Stok Opname</h2>
            </Stack>
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"flex-start"}
              gap={isMobile ? 2 : 3}
            >
              <Stack direction={"column"} gap={1}>
                <span>Tanggal</span>
                <TextField
                  type="text"
                  disabled
                  defaultValue={moment(OpnameRedux.createdAt).format('YYYY-MM-DD')}
                  size="small"
                  sx={{ bgcolor: "#f4f4f4", width: isMobile ? "40vw" : "25vw" }}
                />
              </Stack>
              <Stack direction={"column"} gap={1}>
                <span>ID Barang</span>
                <TextField
                  type="text"
                  disabled
                  size="small"
                  defaultValue={OpnameRedux.productUnitGenId}
                  sx={{ bgcolor: "#f4f4f4", width: isMobile ? "40vw" : "25vw" }}
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
                <span>Nama Brand</span>
                <TextField
                  type="text"
                  disabled
                  defaultValue={OpnameRedux.productBrandName}
                  size="small"
                  sx={{ bgcolor: "#f4f4f4", width: isMobile ? "40vw" : "25vw" }}
                />
              </Stack>
              <Stack direction={"column"} gap={1}>
                <span>Jenis Barang</span>
                <TextField
                  type="text"
                  size="small"
                  disabled
                  defaultValue={OpnameRedux.productTypeName}
                  sx={{ bgcolor: "#f4f4f4", width: isMobile ? "40vw" : "25vw" }}
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
                <span>Barang Bagus</span>
                <TextField
                  type="text"
                  size="small"
                  value={GoodProducts}
                  onChange={(text) => setGoodProducts(text.target.value)}
                  placeholder="Barang"
                  sx={{ bgcolor: "white", width: isMobile ? "40vw" : "25vw" }}
                />
              </Stack>
              <Stack direction={"column"} gap={1}>
                <span>Barang Rusak</span>
                <TextField
                  type="text"
                  size="small"
                  value={BadProducts}
                  onChange={(text) => setBadProducts(text.target.value)}
                  placeholder="Barang"
                  sx={{ bgcolor: "white", width: isMobile ? "40vw" : "25vw" }}
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
                <span>Total Barang</span>
                <TextField
                  type="text"
                  size="small"
                  disabled
                  defaultValue={OpnameRedux.qty}
                  placeholder="Total"
                  sx={{ bgcolor: "#f4f4f4", width: isMobile ? "40vw" : "25vw" }}
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
                onClick={handleSubmit}
                style={{
                  ...CENTER,
                  borderRadius: 10,
                  backgroundColor: Colors.primary,
                  padding: "10px 30px",
                  cursor: "pointer",
                  color: '#fff'
                }}
              >
                {
                  loader ?
                    <CircularProgress size={20} sx={{ color: 'inherit' }}></CircularProgress>
                    :
                    <span style={{ fontSize: 13, color: "#fff" }}>SIMPAN</span>
                }
              </div>
            </Stack>
          </Stack>
        </div>
      </Box>
    </div>
  );
};

export default DataProdukForm;
