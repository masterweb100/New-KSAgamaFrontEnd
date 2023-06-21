import { Box, Toolbar } from "@mui/material";
import React from "react";
import NavigationBarUser from "../../../components/appBarUser";
import KategoriTable from "./kategoriTable";
import { isMobile } from "react-device-detect";
import { HTTPGetAccountCategory } from "../../../apis/User/account/accountCategory";
import secureLocalStorage from "react-secure-storage";
import { toast } from "react-toastify";

const KategoriAkun = () => {
  const [init, setInit] = React.useState(false);
  const [DataCategory, setDataCategory] = React.useState([]);
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1);
  const [pagination, setPagination] = React.useState({});
  const [search, setSearch] = React.useState("");
  const [loader, setLoader] = React.useState(true);
  const token = secureLocalStorage.getItem("TOKEN") as string;

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

  const GetCategoryTable = async () => {
    try {
      setLoader(true);
      const response = await HTTPGetAccountCategory({
        limit: limit.toString(),
        page: page.toString(),
        q: search,
        token: token,
      });
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
    GetCategoryTable();
  }, [init]);

  return (
    <div style={{ display: "flex" }}>
      <NavigationBarUser
        title={"List Kategori Akun"}
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
        <div style={{ maxWidth: isMobile ? "100vw" : "78vw" }}>
          <KategoriTable
            data={DataCategory}
            changePage={onChangePage}
            itemsPerPage={onChangeLimit}
            pagination={pagination}
            search={onSearch}
            loader={loader}
          ></KategoriTable>
        </div>
      </Box>
    </div>
  );
};

export default KategoriAkun;
