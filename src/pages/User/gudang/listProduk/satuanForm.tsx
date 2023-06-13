import React from "react";
import {
  Box,
  Stack,
  TextField,
  Toolbar,
  Select,
  MenuItem,
  SelectChangeEvent,
  Icon,
  Tooltip,
  IconButton,
  CircularProgress
} from "@mui/material";
import NavigationBarUser from "../../../../components/appBarUser";
import { CENTER } from "../../../../utils/stylesheet";
import { Colors } from "../../../../utils/colors";
import { useNavigate, useParams } from "react-router-dom";
import { isMobile } from "react-device-detect";
import { useFormik } from "formik";
import { HTTPAddUnits, HTTPGenerateUnitsID } from "../../../../apis/User/product/units";
import { HTTPGetBrands } from "../../../../apis/User/product/brand";
import secureLocalStorage from "react-secure-storage";
import { HTTPGetTypes } from "../../../../apis/User/product/types";
import { HTTPGetSuppliers } from "../../../../apis/User/contact/supplier";
import { HTTPGetAccounts } from "../../../../apis/User/account/account";

const SatuanForm = () => {
  const navigate = useNavigate();
  const token = secureLocalStorage.getItem('TOKEN') as string
  const { action }: any = useParams()
  const [init, setInit] = React.useState(false)
  const [genId, setGenId] = React.useState('')
  const [Brand, setBrand] = React.useState([])
  const [Types, setTypes] = React.useState([])
  const [Supplier, setSupplier] = React.useState([])
  const [Account, setAccount] = React.useState([])
  const [loader, setLoader] = React.useState(false)

  const GoBack = () => {
    navigate(-1);
  };

  const Formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      brand: '',
      jenis: '',
      supplier: '',
      hargaBeli: '',
      hargaJual: '',
      hargaBeliLusin: '',
      hargaJualLusin: '',
      hargaBeliBox: '',
      hargaJualBox: '',
      akunBeli: '',
      akunJual: '',
    },
    onSubmit: async (values) => {
      setLoader(true)
      try {
        const resp = await HTTPAddUnits({
          token: token,
          genId: genId,
          supplierId: values.supplier,
          productBrandId: parseInt(values.brand),
          productTypeId: parseInt(values.jenis),
          buyPriceInPcs: parseInt(values.hargaBeli),
          sellPriceInPcs: parseInt(values.hargaJual),
          buyPriceInDozens: parseInt(values.hargaBeliLusin),
          sellPriceInDozens: parseInt(values.hargaJualLusin),
          buyPriceInBox: parseInt(values.hargaBeliBox),
          sellPriceInBox: parseInt(values.hargaJualBox),
          accountIdForBuying: parseInt(values.akunBeli),
          accountIdForSelling: parseInt(values.akunJual),
        })
        setLoader(false)
        navigate(-1)
      } catch (error) {
        setLoader(false)
        console.log(error)
      }
    }
  })

  const generateId = async () => {
    try {
      const resp = await HTTPGenerateUnitsID()
      setGenId(resp.data.data.genId)
    } catch (error) {
      console.log(error)
    }
  }

  const getBrand = async () => {
    try {
      const resp = await HTTPGetBrands({ limit: '50', page: '1', q: undefined, token: token })
      setBrand(resp.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getTypes = async () => {
    try {
      const resp = await HTTPGetTypes({ limit: '50', page: '1', q: undefined, token: token })
      setTypes(resp.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getSupplier = async () => {
    try {
      const resp = await HTTPGetSuppliers({ limit: '50', page: '1', q: undefined, token: token })
      setSupplier(resp.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getAccount = async () => {
    try {
      const resp = await HTTPGetAccounts({ limit: '50', page: '1', q: undefined, token: token })
      setAccount(resp.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const Initial = async () => {
    try {
      await generateId()
      await getBrand()
      await getTypes()
      await getSupplier()
      await getAccount()
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => { Initial() }, [init])

  const renderBrand = (values: any) => {
    if (values.length === 0) {
      return <span style={{ color: "#a7a5a6" }}>Pilih Brand</span>;
    } else {
      const result: any = Brand.filter(
        (value: any) => value.id === Formik.values.brand
      );
      return <span style={{ color: "#000" }}>{result[0].brandName}</span>;
    }
  }

  const renderTypes = (values: any) => {
    if (values.length === 0) {
      return <span style={{ color: "#a7a5a6" }}>Pilih Jenis</span>;
    } else {
      const result: any = Types.filter(
        (value: any) => value.id === Formik.values.jenis
      );
      return <span style={{ color: "#000" }}>{result[0].typeName}</span>;
    }
  }

  const renderSupplier = (values: any) => {
    if (values.length === 0) {
      return <span style={{ color: "#a7a5a6" }}>Pilih Supplier</span>;
    } else {
      const result: any = Supplier.filter(
        (value: any) => value.id === Formik.values.supplier
      );
      return <span style={{ color: "#000" }}>{result[0].nameSupplier}</span>;
    }
  }

  const renderAccountBuy = (values: any) => {
    if (values.length === 0) {
      return <span style={{ color: "#a7a5a6" }}>Pilih Akun Pembelian</span>;
    } else {
      const result: any = Account.filter(
        (value: any) => value.id === Formik.values.akunBeli
      );
      return <span style={{ color: "#000" }}>{result[0].accountName + ' - ' + result[0].accountCode}</span>;
    }
  }

  const renderAccountSell = (values: any) => {
    if (values.length === 0) {
      return <span style={{ color: "#a7a5a6" }}>Pilih Akun Penjualan</span>;
    } else {
      const result: any = Account.filter(
        (value: any) => value.id === Formik.values.akunJual
      );
      return <span style={{ color: "#000" }}>{result[0].accountName + ' - ' + result[0].accountCode}</span>;
    }
  }

  return (
    <form onSubmit={Formik.handleSubmit}>
      <div style={{ display: "flex" }}>
        <NavigationBarUser
          title={"Form Data Satuan"}
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
                <h2 style={{ color: "#000" }}>Form Data Satuan</h2>
                {
                  action === 'update' ?
                    <div style={{ backgroundColor: Colors.warning, height: 40, width: 40, ...CENTER, borderRadius: 10 }}>
                      <Icon style={{ color: '#fff', fontSize: 20 }}>border_color</Icon>
                    </div>
                    :
                    null
                }
              </Stack>
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"flex-start"}
                gap={isMobile ? 2 : 3}
              >
                <Stack direction={"column"} gap={1}>
                  <span>ID SKU</span>
                  <TextField
                    type="text"
                    disabled
                    value={genId}
                    size="small"
                    sx={{ bgcolor: "#f4f4f4", width: isMobile ? "40vw" : "25vw" }}
                    InputProps={{
                      endAdornment: (
                        action === 'update' ?
                          null
                          :
                          <Tooltip title="Regenerate ID">
                            <IconButton onClick={generateId}>
                              <Icon sx={{ fontSize: 25, color: Colors.primary }}>refresh</Icon>
                            </IconButton>
                          </Tooltip>
                      )
                    }}
                  />
                </Stack>
                <Stack direction={"column"} gap={1}>
                  <span>Nama Brand</span>
                  <Select
                    size="small"
                    displayEmpty
                    sx={{
                      bgcolor: "white",
                      width: isMobile ? "40vw" : "25vw",
                      color: "#000",
                    }}
                    name="brand"
                    value={Formik.values.brand}
                    onChange={Formik.handleChange}
                    renderValue={renderBrand}
                  >
                    {Brand.map((item: any, index: number) => (
                      <MenuItem key={index} value={item.id}>
                        {item.brandName}
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
                  <span>Jenis</span>
                  <Select
                    size="small"
                    displayEmpty
                    sx={{
                      bgcolor: "white",
                      width: isMobile ? "40vw" : "25vw",
                      color: "#000",
                    }}
                    name="jenis"
                    value={Formik.values.jenis}
                    onChange={Formik.handleChange}
                    renderValue={renderTypes}
                  >
                    {Types.map((item: any, index: number) => (
                      <MenuItem key={index} value={item.id}>
                        {item.typeName}
                      </MenuItem>
                    ))}
                  </Select>
                </Stack>
                <Stack direction={"column"} gap={1}>
                  <span>Supplier</span>
                  <Select
                    size="small"
                    displayEmpty
                    sx={{
                      bgcolor: "white",
                      width: isMobile ? "40vw" : "25vw",
                      color: "#000",
                    }}
                    name="supplier"
                    value={Formik.values.supplier}
                    onChange={Formik.handleChange}
                    renderValue={renderSupplier}
                  >
                    {Supplier.map((item: any, index: number) => (
                      <MenuItem key={index} value={item.id}>
                        {item.nameSupplier}
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
                  <span>Harga Beli/PCs</span>
                  <TextField
                    type="text"
                    size="small"
                    placeholder={'Harga Beli'}
                    name="hargaBeli"
                    value={Formik.values.hargaBeli}
                    onChange={Formik.handleChange}
                    sx={{ bgcolor: "#fff", width: isMobile ? "40vw" : "25vw" }}
                  />
                </Stack>
                <Stack direction={"column"} gap={1}>
                  <span>Harga Jual/PCs</span>
                  <TextField
                    type="text"
                    size="small"
                    placeholder="Harga Jual"
                    name="hargaJual"
                    value={Formik.values.hargaJual}
                    onChange={Formik.handleChange}
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
                <Stack direction={"column"} gap={1}>
                  <span>Harga Beli/Lusin</span>
                  <TextField
                    type="text"
                    size="small"
                    name="hargaBeliLusin"
                    placeholder="Harga Beli"
                    value={Formik.values.hargaBeliLusin}
                    onChange={Formik.handleChange}
                    sx={{ bgcolor: "#fff", width: isMobile ? "40vw" : "25vw" }}
                  />
                </Stack>
                <Stack direction={"column"} gap={1}>
                  <span>Harga Jual/Lusin</span>
                  <TextField
                    type="text"
                    size="small"
                    name="hargaJualLusin"
                    placeholder="Harga Jual"
                    value={Formik.values.hargaJualLusin}
                    onChange={Formik.handleChange}
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
                <Stack direction={"column"} gap={1}>
                  <span>Harga Beli/Box</span>
                  <TextField
                    type="text"
                    size="small"
                    name="hargaBeliBox"
                    value={Formik.values.hargaBeliBox}
                    onChange={Formik.handleChange}
                    placeholder="Harga Beli"
                    sx={{ bgcolor: "#fff", width: isMobile ? "40vw" : "25vw" }}
                  />
                </Stack>
                <Stack direction={"column"} gap={1}>
                  <span>Harga Jual/Box</span>
                  <TextField
                    type="text"
                    size="small"
                    name="hargaJualBox"
                    value={Formik.values.hargaJualBox}
                    onChange={Formik.handleChange}
                    placeholder="Harga Jual"
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
                <Stack direction={"column"} gap={1}>
                  <span>Pilih Akun Pembelian</span>
                  <Select
                    size="small"
                    displayEmpty
                    sx={{
                      bgcolor: "white",
                      width: isMobile ? "40vw" : "25vw",
                      color: "#000",
                    }}
                    name="akunBeli"
                    value={Formik.values.akunBeli}
                    onChange={Formik.handleChange}
                    renderValue={renderAccountBuy}
                  >
                    {Account.map((item: any, index: number) => (
                      <MenuItem
                        key={index}
                        value={item.id}
                      >
                        {item.accountName + ' - ' + item.accountCode}
                      </MenuItem>
                    ))}
                  </Select>
                </Stack>
                <Stack direction={"column"} gap={1}>
                  <span>Pilih Akun Penjualan</span>
                  <Select
                    size="small"
                    displayEmpty
                    sx={{
                      bgcolor: "white",
                      width: isMobile ? "40vw" : "25vw",
                      color: "#000",
                    }}
                    name="akunJual"
                    value={Formik.values.akunJual}
                    onChange={Formik.handleChange}
                    renderValue={renderAccountSell}
                  >
                    {Account.map((item: any, index: number) => (
                      <MenuItem
                        key={index}
                        value={item.id}
                      >
                        {item.accountName + ' - ' + item.accountCode}
                      </MenuItem>
                    ))}
                  </Select>
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
                <button
                  type={'submit'}
                  style={{
                    ...CENTER,
                    borderRadius: 10,
                    backgroundColor: Colors.primary,
                    padding: "10px 30px",
                    cursor: "pointer",
                  }}
                >
                  {
                    loader === true ?
                      <CircularProgress size={20} color={'inherit'} />
                      :
                      <span style={{ fontSize: 13, color: '#fff' }}>SIMPAN</span>
                  }
                </button>
              </Stack>
            </Stack>
          </div>
        </Box>
      </div>
    </form>
  );
};

export default SatuanForm;
