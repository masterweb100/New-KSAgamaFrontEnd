import React from "react";
import {
  Box,
  Stack,
  Toolbar,
  InputAdornment,
  TextField,
  Icon,
  CircularProgress,
} from "@mui/material";
import NavigationBar from "../../../components/appBar";
import { useNavigate } from "react-router-dom";
import { isMobile } from "react-device-detect";
import "./styles.css";
import { Colors } from "../../../utils/colors";
import { HTTPGetRoles } from "../../../apis/SuperAdmin/role";
import { useDispatch } from "react-redux";
import { setRoleData } from "../../../stores/reduxes/role";
import { CENTER } from "../../../utils/stylesheet";
import { toast } from "react-toastify";

const AccessUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [init, setInit] = React.useState(false)
  const [DataRole, setDataRole] = React.useState<any[]>([])
  const [loader, setLoader] = React.useState(true)

  const GetRoleTable = async () => {
    setLoader(true)
    try {
      const response = await HTTPGetRoles({
        limit: '100',
        page: '',
        q: ''
      })
      setDataRole(response.data.data)
      setLoader(false)
    } catch (error: any) {
      setLoader(false)
      console.log(error)
      if (error.status === 500) {
        toast.error('Server sedang mengalami gangguan!')
      } else {
        toast.error('Terjadi Kesalahan!')
      }
    }
  }

  React.useEffect(() => {
    GetRoleTable()
  }, [init])

  const SettingPage = (item: any) => {
    dispatch(setRoleData({ data: item }))
    navigate("/user-access/settings");
  }

  return (
    <div style={{ display: "flex" }}>
      <NavigationBar
        title={"Role Pengguna"}
        indexNav={4}
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
        <Stack
          direction={isMobile ? "column" : "row"}
          alignItems={"center"}
          gap={3}
          justifyContent={"space-between"}
          sx={{
            marginTop: 3,
            paddingX: 4,
            paddingY: 2,
            backgroundColor: Colors.primary,
            borderRadius: "10px 10px 0px 0px",
          }}
        >
          <Stack alignItems={"center"} gap={2} direction={"row"}>
            <Icon sx={{ fontSize: 27, color: "#fff" }}>view_list</Icon>
            <p style={{ color: "#fff", fontWeight: 500, margin: 0 }}>Peran</p>
          </Stack>
        </Stack>
        <Stack direction={"column"} gap={0}>
          {
            loader ?
              <div style={{ ...CENTER, backgroundColor: '#fff', padding: 20 }}>
                <CircularProgress size={40} color={'error'} />
              </div>
              :
              <>
                {
                  DataRole.length === 0 ?
                    <div className={"list"}>
                      <span style={{ textAlign: 'center', width: '100%' }}>Tidak Ada Data</span>
                    </div>
                    :
                    DataRole.map((item, index) => (
                      <div onClick={() => SettingPage(item)} key={index} className={"list"}>
                        <span>{item.roleName}</span>
                      </div>
                    ))
                }
              </>
          }
        </Stack>
      </Box>
    </div>
  );
};

export default AccessUser;
