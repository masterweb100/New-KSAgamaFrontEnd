import React from "react";
import { Box, Toolbar } from "@mui/material";
import NavigationBar from "../../../components/appBar";
import RoleTable from "./roleTable";
import { isMobile } from "react-device-detect";
import { HTTPGetRoles } from "../../../apis/SuperAdmin/role";

const dummyTable = {
  content: [
    { id: 1, role: "Admin" },
    { id: 2, role: "User" },
  ],
  totalElements: 10,
  number: 0,
  size: 5,
};

const DataRole = () => {
  const [init, setInit] = React.useState(false);
  const [DataRole, setDataRole] = React.useState([]);
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1)
  const [pagination, setPagination] = React.useState({})
  const [search, setSearch] = React.useState('')
  const [loader, setLoader] = React.useState(true)

  const onChangeLimit = (param: any) => {
    setLimit(param)
    setPage(1)
    setInit(!init)
  }

  const onChangePage = (param: any) => {
    setPage(param)
    setInit(!init)
  }

  const onSearch = (param: string) => {
    setSearch(param)
    setInit(!init)
  }

  const GetRoleTable = async () => {
    try {
      setLoader(true)
      const response = await HTTPGetRoles({
        limit: limit.toString(),
        page: page.toString(),
        q: search,
      });
      setDataRole(response.data.data);
      setPagination(response.data.pagination);
      setLoader(false)
    } catch (error) {
      setLoader(false)
      console.log(error);
    }
  };

  React.useEffect(() => {
    GetRoleTable();
  }, [init]);

  return (
    <div style={{ display: "flex" }}>
      <NavigationBar
        title={"Data Role"}
        indexNav={3}
        isChild={false}
      ></NavigationBar>
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
          <RoleTable
            data={DataRole}
            changePage={onChangePage}
            itemsPerPage={onChangeLimit}
            pagination={pagination}
            search={onSearch}
            loader={loader}
          />
        </div>
      </Box>
    </div>
  );
};

export default DataRole;
