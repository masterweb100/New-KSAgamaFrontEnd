import { Box, Icon, Stack, Toolbar } from "@mui/material";
import React from "react";
import NavigationBarUser from "../../../../components/appBarUser";
import { Store } from "@mui/icons-material/";
import StickyNote2OutlinedIcon from "@mui/icons-material/StickyNote2Outlined";
import { Colors } from "../../../../utils/colors";
import { useFilePicker } from "use-file-picker";
import "./style.css";
import { isMobile } from "react-device-detect";

const NoteSatuanProduk = () => {
  const [openFile, { filesContent, loading, errors }] = useFilePicker({
    accept: ".xlsx",
    multiple: false,
    // onFilesSuccessfulySelected: async ({ plainFiles }) => {
    //   setLoader(true);
    //   try {
    //     let Forms = new FormData();
    //     Forms.append("file", plainFiles[0]);
    //     await HTTPAddCategoryXLSX({ form: Forms, token: token });
    //     toast.success("Berhasil menambahkan Kategori!");
    //     await GetCategory();
    //     setLoader(false);
    //   } catch (error: any) {
    //     setLoader(false);
    //     if (error.status === 500) {
    //       toast.error("Server sedang mengalami gangguan!");
    //     } else {
    //       toast.error("Terjadi Kesalahan!");
    //     }
    //   }
    // },
  });

  const Template = require("../../../../assets/template/Import Satuan.xlsx");

  return (
    <div style={{ display: "flex" }}>
      <NavigationBarUser
        title={"Note Import Satuan Produk"}
        isChild={true}
        name={"List Produk"}
        idPanel={1}
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
        <Stack direction={"column"} gap={3} style={{ background: "white" }}>
          <div className={"box1"}>
            <Stack direction={"row"} gap={2}>
              <StickyNote2OutlinedIcon
                sx={{
                  color: "inherit",
                  fontSize: 30,
                  transition: "all 0.1s",
                }}
              ></StickyNote2OutlinedIcon>
              <Stack direction={"column"} gap={1}>
                <h3 style={{ margin: 0 }}>
                  Ikuti langkah berikut untuk mengimport produk-produkmu
                </h3>
                <ul
                  style={{
                    margin: 0,
                    paddingInlineStart: "15px",
                    listStyleType: "upper-greek",
                  }}
                >
                  <li>
                    <b>Download File Template Produk</b>
                    <p
                      style={{
                        marginBlockEnd: "0.5em",
                        marginBlockStart: "0.5em",
                      }}
                    >
                      Mulai dengan mendownload file template produk dalam format
                      Excel. Format ini mempunyai format yang dibutuhkan untuk
                      mengimport detail data {"Satuan"} Produkmu.
                    </p>
                    <a href={Template} download="Import Satuan.xlsx">
                      Download File Template
                    </a>
                  </li>
                  <br />
                  <li>
                    <b>Salin Produkmu ke dalam Template</b>
                    <p
                      style={{
                        marginBlockEnd: "0.5em",
                        marginBlockStart: "0.5em",
                      }}
                    >
                      Menggunakan Excel, masukkan detail produkmu ke dalam file
                      template. Pastikan sudah sesuai dengan kolom yang telah
                      kami sediakan di dalam Template.
                      <br />
                      <br />
                      <b>PENTING:</b>
                      Jangan mengubah kolom dalam file Template. Ini dibutuhkan
                      untuk proses import data. Kamu juga dapat menggunakan file
                      yang sudah pernah kamu import untuk mengupdate semua
                      produk-produkmu, menghemat waktu dan tenaga daripada
                      mengupdate satu persatu melalui browser. Maksimum 200 data
                      yang dapat kamu import dalam satu waktu.
                    </p>
                  </li>
                  <br />
                  <li>
                    <b>Upload File Template yang telah diupdate di sini.</b>
                    <p
                      style={{
                        marginBlockEnd: "0.5em",
                        marginBlockStart: "0.5em",
                      }}
                    >
                      Upload Template yang telah diupdate disini:
                    </p>
                  </li>
                  <div
                    onClick={openFile}
                    style={{
                      backgroundColor: "#fff",
                      padding: isMobile ? "12px 15px" : "10px 30px",
                      borderRadius: 5,
                      border: `1px solid ${Colors.primary}`,
                      cursor: "pointer",
                      width: "fit-content",
                    }}
                  >
                    <Stack direction={"row"} alignItems={"center"} gap={1}>
                      <Icon sx={{ color: Colors.primary, fontSize: 20 }}>
                        file_upload
                      </Icon>
                      {isMobile ? (
                        <span style={{ fontSize: 13, color: Colors.primary }}>
                          Import
                        </span>
                      ) : (
                        <span style={{ fontSize: 15, color: Colors.primary }}>
                          Import Data Satuan Produk
                        </span>
                      )}
                    </Stack>
                  </div>
                </ul>
              </Stack>
            </Stack>
          </div>
        </Stack>
      </Box>
    </div>
  );
};

export default NoteSatuanProduk;
