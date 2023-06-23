import { Box, Toolbar, styled, Tabs, Tab } from "@mui/material";
import { Colors } from "../../../utils/colors";
import React from "react";
import NavigationBarUser from "../../../components/appBarUser";
import AkunTable from "./akunTable";
import { akunData } from "./dummy";
import { isMobile } from "react-device-detect";
import secureLocalStorage from "react-secure-storage";
import { HTTPGetAccounts } from "../../../apis/User/account/account";
import { toast } from "react-toastify";

const Akun = () => {
  const [init, setInit] = React.useState(false);
  const [DataCategory, setDataCategory] = React.useState([]);
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1);
  const [pagination, setPagination] = React.useState({});
  const [search, setSearch] = React.useState("");
  const [loader, setLoader] = React.useState(true);
  const token = secureLocalStorage.getItem("USER_SESSION") as string;

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

  const GetAccountsTable = async () => {
    try {
      setLoader(true);
      const response = await HTTPGetAccounts({
        limit: limit.toString(),
        page: page.toString(),
        q: search.length === 0 ? undefined : search,
        token: token,
      });
      console.log(response);
      setDataCategory(response.data.data);
      setPagination(response.data.pagination);
      setLoader(false);
    } catch (error: any) {
      setLoader(false);
      console.log(error)
      if (error.status === 500) {
        toast.error('Server sedang mengalami gangguan!')
      } else {
        toast.error('Terjadi Kesalahan!')
      };
    }
  };

  React.useEffect(() => {
    GetAccountsTable();
  }, [init]);

  return (
    <div style={{ display: "flex" }}>
      <NavigationBarUser
        title={"Akun"}
        isChild={false}
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
        <div style={{ maxWidth: isMobile ? "100vw" : "78vw" }}>
          <div style={{ marginTop: 20 }}>
            <AkunTable
              data={DataCategory}
              changePage={onChangePage}
              itemsPerPage={onChangeLimit}
              pagination={pagination}
              search={onSearch}
              loader={loader}
              getData={GetAccountsTable}
            ></AkunTable>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default Akun;
