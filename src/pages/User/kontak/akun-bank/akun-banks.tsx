import { Box, Icon, Input, Stack, Toolbar } from "@mui/material";
import React from "react";
import NavigationBarUser from "../../../../components/appBarUser";
import { Colors } from "../../../../utils/colors";
import { kontakData } from "../dummy";
import AkunBankTable from "./akun-banksTable";
import { isMobile } from "react-device-detect";
import { HTTPGetCustomers } from "../../../../apis/User/contact/customer";
import secureLocalStorage from "react-secure-storage";
import { toast } from "react-toastify";
import ReactToPrint from "react-to-print";
import moment from "moment";
import { useFilePicker } from "use-file-picker";

const AkunBank = () => {
  const token = secureLocalStorage.getItem("USER_SESSION") as string;
  const [init, setInit] = React.useState(false);
  const [DataRole, setDataRole] = React.useState([]);
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1);
  const [pagination, setPagination] = React.useState({});
  const [search, setSearch] = React.useState("");
  const [loader, setLoader] = React.useState(true);

  const onChangeLimit = (param: any) => {
    setLimit(param);
    setPage(1);
    setInit(!init);
  };

  const onChangePage = (param: any) => {
    setPage(param);
    setInit(!init);
  };

  const onSearch = (param: string) => {
    setSearch(param);
    setInit(!init);
  };

  const GetCustomerTable = async () => {
    try {
      setLoader(true);
      const response = await HTTPGetCustomers({
        token: token,
        limit: limit.toString(),
        page: page.toString(),
        q: search.length === 0 ? undefined : search,
      });
      setDataRole(response.data.data);
      setPagination(response.data.pagination);
      setLoader(false);
    } catch (error: any) {
      setLoader(false);
      console.log(error);
      if (error.status === 500) {
        toast.error("Server sedang mengalami gangguan!");
      } else {
        toast.error("Terjadi Kesalahan!");
      }
    }
  };

  React.useEffect(() => {
    GetCustomerTable();
  }, [init]);

  const componentRef: any = React.useRef(null);
  const onBeforeGetContentResolve: any = React.useRef(null);
  const [onPrint, setPrint] = React.useState(false);

  const reactToPrintContent = React.useCallback(() => {
    return componentRef.current;
  }, [componentRef.current]);

  const handleAfterPrint = React.useCallback(() => {
    setPrint(false);
  }, []);

  const handleBeforePrint = React.useCallback(() => {
    setPrint(true);
  }, []);

  const handleOnBeforeGetContent = React.useCallback(() => {
    setPrint(true);
    return new Promise<void>((resolve) => {
      onBeforeGetContentResolve.current = resolve;
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  }, [setPrint]);

  React.useEffect(() => {
    if (typeof onBeforeGetContentResolve.current === "function") {
      onBeforeGetContentResolve.current();
    }
  }, [onBeforeGetContentResolve.current]);

  const PrintButton = React.useCallback(() => {
    return (
      <div
        style={{
          backgroundColor: "#fff",
          padding: "7px 15px",
          borderRadius: 5,
          border: `1px solid ${Colors.error}`,
          cursor: "pointer",
        }}
      >
        <Stack direction={"row"} alignItems={"center"} gap={1}>
          <Icon sx={{ color: Colors.error, fontSize: 20 }}>file_download</Icon>
          <span style={{ fontSize: 13, color: Colors.error }}>PDF</span>
        </Stack>
      </div>
    );
  }, []);

  const [openFile, { filesContent, loading, errors }] = useFilePicker({
    accept: ".xlsx",
    multiple: false,
    onFilesSuccessfulySelected: ({ plainFiles }) => {
      console.log("onFilesSuccessfulySelected", plainFiles);
    },
  });

  return (
    <div style={{ display: "flex" }}>
      <NavigationBarUser
        title={"Kontak"}
        isChild={false}
        name={"AkunBank"}
        idPanel={7}
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
        <div style={{ maxWidth: isMobile ? "100vw" : "78vw" }}>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={isMobile ? "space-between" : "flex-end"}
            gap={2}
          >
            <div
              onClick={openFile}
              style={{
                backgroundColor: "#fff",
                padding: "7px 15px",
                borderRadius: 5,
                border: `1px solid ${Colors.primary}`,
                cursor: "pointer",
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
                  <span style={{ fontSize: 13, color: Colors.primary }}>
                    Import Data Kontak
                  </span>
                )}
              </Stack>
            </div>
            {/* <Input style={{}} type='file' onChange={(e) => console.log(e)}></Input> */}
            <ReactToPrint
              content={reactToPrintContent}
              documentTitle={
                "Customer_" + moment().format("YYYY-MM-DD HH:mm:dd")
              }
              onAfterPrint={handleAfterPrint}
              onBeforeGetContent={handleOnBeforeGetContent}
              onBeforePrint={handleBeforePrint}
              removeAfterPrint
              trigger={PrintButton}
            />
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
          <div style={{ marginTop: onPrint ? 0 : 20 }} ref={componentRef}>
            <AkunBankTable
              data={DataRole}
              changePage={onChangePage}
              itemsPerPage={onChangeLimit}
              pagination={pagination}
              search={onSearch}
              loader={loader}
              getData={GetCustomerTable}
              onPrint={onPrint}
            ></AkunBankTable>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default AkunBank;
