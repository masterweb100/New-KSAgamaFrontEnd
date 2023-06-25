import { Box, Stack, Toolbar, Icon, CircularProgress } from "@mui/material";
import React from "react";
import NavigationBarUser from "../../../../components/appBarUser";
import { Colors } from "../../../../utils/colors";
import { keuanganData } from "../dummy";
import "../style.css";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { isMobile } from "react-device-detect";
import moment from "moment";
import { toast } from "react-toastify";
import { HTTPReportsMonetary } from "../../../../apis/User/reports/monetary";
import secureLocalStorage from "react-secure-storage";
import { CENTER } from "../../../../utils/stylesheet";

const LapKeuangan = () => {
  const token = secureLocalStorage.getItem('USER_SESSION') as string
  const [init, setInit] = React.useState(false)
  const [dateFrom, setDateFrom] = React.useState<any>(moment().startOf('month'));
  const [dateTo, setDateTo] = React.useState<any>(moment().endOf('month'));
  const [loader, setLoader] = React.useState(true)
  const [MonetaryData, setMonetaryData] = React.useState<any>({
    saleReports: [],
    purchasingRepasorts: [],
    saleRevenue: 0,
    purchasingRevenue: 0,
    totalRevenue: 0
  })

  const GetData = async () => {
    setLoader(true)
    try {
      const resp = await HTTPReportsMonetary({
        from: moment(dateFrom).format('YYYY/MM/DD'),
        to: moment(dateTo).format('YYYY/MM/DD'),
        token: token
      })
      setMonetaryData(resp.data.data)
      setLoader(false)
    } catch (error: any) {
      setLoader(false)
      if (error.status === 500) {
        toast.error('Server sedang mengalami gangguan!')
      } else {
        toast.error('Terjadi Kesalahan!')
      };
    }
  }

  React.useEffect(() => {
    GetData()
  }, [init])

  const FromDate = (date: any) => {
    setDateFrom(date)
    setDateTo(null)
  }

  const ToDate = async (date: any) => {
    setDateTo(date)
    setInit(!init)
  }

  return (
    <div style={{ display: "flex" }}>
      <NavigationBarUser
        title={"Keuangan"}
        isChild={false}
        name={"Lap. Keuangan"}
        idPanel={6}
      ></NavigationBarUser>
      <Box
        component="main"
        sx={{ bgcolor: "#f4f5ff", p: 5, width: "100vw", minHeight: "100vh" }}
      >
        <Toolbar />
        <div style={{ maxWidth: isMobile ? "100vw" : "78vw" }}>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"flex-end"}
            gap={2}
          >
            <div
              style={{
                backgroundColor: "#fff",
                padding: "7px 15px",
                borderRadius: 5,
                border: `1px solid ${Colors.error}`,
              }}
            >
              <Stack direction={"row"} alignItems={"center"} gap={1}>
                <Icon sx={{ color: Colors.error, fontSize: 20 }}>
                  file_download
                </Icon>
                <span style={{ fontSize: 13, color: Colors.error }}>PDF</span>
              </Stack>
            </div>
            <div
              style={{
                backgroundColor: "#fff",
                padding: "7px 15px",
                borderRadius: 5,
                border: `1px solid ${Colors.success}`,
              }}
            >
              <Stack direction={"row"} alignItems={"center"} gap={1}>
                <Icon sx={{ color: Colors.success, fontSize: 20 }}>
                  file_download
                </Icon>
                <span style={{ fontSize: 13, color: Colors.success }}>
                  Excel
                </span>
              </Stack>
            </div>
          </Stack>
          <Stack
            direction={isMobile ? "column" : "row"}
            alignItems={isMobile ? "flex-start" : "center"}
            justifyContent={"space-between"}
            gap={3}
            sx={{ marginTop: 3 }}
          >
            <h2 style={{ margin: 0, width: "100%" }}>Laba Rugi</h2>
            <Stack
              direction={"row"}
              alignItems={"center"}
              gap={1}
              justifyContent={isMobile ? "space-between" : "flex-end"}
              width={"100%"}
            >
              <DatePicker
                value={dateFrom}
                onChange={FromDate}
                sx={{
                  bgcolor: "white",
                  borderRadius: 1,
                  width: isMobile ? "40vw" : "15vw",
                }}
              />
              <Icon sx={{ color: Colors.secondary, fontSize: 25 }}>east</Icon>
              <DatePicker
                value={dateTo}
                onChange={ToDate}
                sx={{
                  bgcolor: "white",
                  borderRadius: 1,
                  width: isMobile ? "40vw" : "15vw",
                }}
              />
            </Stack>
          </Stack>
          <Stack direction={"column"} gap={2}>
            <div>
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
                sx={{
                  marginTop: 3,
                  paddingX: 4,
                  paddingY: 2,
                  backgroundColor: Colors.primary,
                  borderRadius: "10px 10px 0px 0px",
                }}
              >
                <p style={{ color: "#fff", fontWeight: 500, margin: 0 }}>
                  Data Pendapatan
                </p>
                <p style={{ color: "#fff", fontWeight: 500, margin: 0 }}>
                  {moment(dateFrom).format("DD/MM/YYYY") +
                    " - " +
                    moment(dateTo).format("DD/MM/YYYY")}
                </p>
              </Stack>
              <Stack direction={"column"} gap={0}>
                <div>
                  <div className={"list"} style={{ color: "#000" }}>
                    <h3 style={{ margin: 0 }}>Penjualan</h3>
                  </div>
                  {
                    loader ?
                      <div style={{ ...CENTER, backgroundColor: '#fff', padding: 20 }}>
                        <CircularProgress size={40} color={'error'} />
                      </div>
                      :
                      <>
                        {
                          MonetaryData.saleReports.length === 0 ?
                            <div style={{ backgroundColor: '#fff', ...CENTER, padding: '20px 0' }}>
                              <span>Tidak ada data</span>
                            </div>
                            :
                            <>
                              {
                                MonetaryData.saleReports.map((item: any, index: number) => (
                                  <div
                                    className={"list"}
                                    key={index}
                                    style={{ paddingLeft: 70 }}
                                  >
                                    <span>{'Pendapatan' + " (" + item.accountCode + ")"}</span>
                                    <span>{(item.balance).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</span>
                                  </div>
                                ))
                              }
                            </>
                        }
                      </>
                  }
                  <div className={"list"} style={{ color: "#000" }}>
                    <h3 style={{ margin: 0 }}>Pendapatan / Laba Rugi</h3>
                    <h3 style={{ margin: 0 }}>{(MonetaryData.saleRevenue).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</h3>
                  </div>
                </div>
              </Stack>
            </div>
            <div>
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
                sx={{
                  marginTop: 3,
                  paddingX: 4,
                  paddingY: 2,
                  backgroundColor: Colors.primary,
                  borderRadius: "10px 10px 0px 0px",
                }}
              >
                <p style={{ color: "#fff", fontWeight: 500, margin: 0 }}>
                  Beban Pokok Penjualan
                </p>
                <p style={{ color: "#fff", fontWeight: 500, margin: 0 }}>
                  {moment(dateFrom).format("DD/MM/YYYY") +
                    " - " +
                    moment(dateTo).format("DD/MM/YYYY")}
                </p>
              </Stack>
              <Stack direction={"column"} gap={0}>
                <div>
                  <div className={"list"} style={{ color: "#000" }}>
                    <h3 style={{ margin: 0 }}>Pembelian</h3>
                  </div>
                  {
                    loader ?
                      <div style={{ ...CENTER, backgroundColor: '#fff', padding: 20 }}>
                        <CircularProgress size={40} color={'error'} />
                      </div>
                      :
                      <>
                        {
                          MonetaryData.purchasingReports.length === 0 ?
                            <div style={{ backgroundColor: '#fff', ...CENTER, padding: '20px 0' }}>
                              <span>Tidak ada data</span>
                            </div>
                            :
                            <>
                              {MonetaryData.purchasingReports.map((item: any, index: number) => (
                                <div
                                  className={"list"}
                                  key={index}
                                  style={{ paddingLeft: 70 }}
                                >
                                  <span>{'Pengluaran' + " (" + item.accountCode + ")"}</span>
                                  <span>{(item.balance).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</span>
                                </div>
                              ))}
                            </>
                        }
                      </>
                  }
                  <div className={"list"} style={{ color: "#000" }}>
                    <h3 style={{ margin: 0 }}>Pendapatan / Laba Rugi</h3>
                    <h3 style={{ margin: 0 }}>{(MonetaryData.purchasingRevenue).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</h3>
                  </div>
                </div>
              </Stack>
            </div>
            <div className={"list"} style={{ color: "#000" }}>
              <h3 style={{ margin: 0 }}>Laba Bersih</h3>
              <h3 style={{ margin: 0, color: MonetaryData.totalRevenue <= 0 ? Colors.error : Colors.success }}>{(MonetaryData.totalRevenue).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</h3>
            </div>
          </Stack>
        </div>
      </Box>
    </div>
  );
};

export default LapKeuangan;
