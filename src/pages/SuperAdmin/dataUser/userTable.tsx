import React, { useState } from "react";
import {
  TablePagination,
  Box,
  TableSortLabel,
  TableHead,
  Table,
  TableBody,
  TableContainer,
  Checkbox,
  Stack,
  TextField,
  InputAdornment,
  Icon,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { ConstructionOutlined, FilterList } from "@mui/icons-material";
import { Colors } from "../../../utils/colors";
import { CENTER } from "../../../utils/stylesheet";
import DeleteModal from "../../../components/deleteModal";
import { isMobile } from "react-device-detect";
import { HTTPDeleteUsers } from "../../../apis/SuperAdmin/user";
import secureLocalStorage from "react-secure-storage";
import { useDispatch } from "react-redux";
import { setUserData } from "../../../stores/reduxes/user";
import { HTTPGetRoles } from "../../../apis/SuperAdmin/role";

const columns = [
  { id: "no", label: "No" },
  { id: "name", label: "Nama Pengguna" },
  { id: "store", label: "Nama Toko" },
  { id: "role", label: "Role Pengguna" },
  { id: "isActive", label: "Status" },
];

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    textAlign: "center",
    fontWeight: '700'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const UserTable = (props: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selected, setSelected] = useState<any[]>([]);
  const [page, setPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(10);
  const [isDeleteModal, setDeleteModal] = React.useState(false);
  const [DataRole, setDataRole] = React.useState([]);
  const [init, setInit] = React.useState([]);

  const handleDelete = async (param: string) => {
    if (selected.length > 0) {
      if (param === "yes") {
        const token = secureLocalStorage.getItem("TOKEN") as string;
        const respDelete = await HTTPDeleteUsers({
          ids: selected,
          token: token,
        });
        console.log(respDelete);
        setDeleteModal(!isDeleteModal);
        window.location.reload();
      } else {
        setDeleteModal(!isDeleteModal);
      }
    }
  };

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage + 1);
    props.changePage(newPage + 1)
  };

  const handleChangeRowsPerPage = (event: any) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    props.itemsPerPage(parseInt(event.target.value, 10))
    setPage(1);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = props.data.map((n: any) => n.id.toString());
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: any[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (name: any) => selected.indexOf(name) !== -1;

  const FormAddUser = () => {
    navigate("/user-data/form-user/add");
  };

  const FormUpdateUser = (item: any) => {
    dispatch(setUserData({ data: item }));
    navigate("/user-data/form-user/update");
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.search(event.target.value)
  }

  const GetRoleTable = async () => {
    try {
      const response = await HTTPGetRoles({
        limit: "10",
        page: "1",
        q: "",
      });
      setDataRole(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    GetRoleTable();
  }, [init]);

  return (
    <div>
      <div style={{ maxWidth: isMobile ? "100vw" : "78vw" }}>
        <Stack direction={"column"} gap={4}>
          <Stack direction={"row"} justifyContent={"space-between"}>
            {DataRole.length === 0 ? (
              <Tooltip title="Role belum tersedia" placement="right">
                <div
                  style={{
                    ...CENTER,
                    backgroundColor: "#ababab",
                    borderRadius: 5,
                    cursor: "pointer",
                    padding: isMobile ? "12px 15px" : "10px 30px",
                    alignSelf: "flex-start",
                  }}
                >
                  <Stack alignItems={"center"} direction={"row"} gap={1}>
                    <Icon style={{ color: "#fff", fontSize: 17 }}>add</Icon>
                    <p
                      style={{
                        margin: 0,
                        fontWeight: 500,
                        fontSize: isMobile ? 13 : 15,
                        color: "#ffff",
                      }}
                    >
                      Tambah Data Pengguna
                    </p>
                  </Stack>
                </div>
              </Tooltip>
            ) : (
              <div
                onClick={FormAddUser}
                style={{
                  ...CENTER,
                  backgroundColor: Colors.primary,
                  borderRadius: 5,
                  cursor: "pointer",
                  padding: isMobile ? "12px 15px" : "10px 30px",
                  alignSelf: "flex-start",
                }}
              >
                <Stack alignItems={"center"} direction={"row"} gap={1}>
                  <Icon style={{ color: "#fff", fontSize: 17 }}>add</Icon>
                  <p
                    style={{
                      margin: 0,
                      fontWeight: 500,
                      fontSize: isMobile ? 13 : 15,
                      color: "#ffff",
                    }}
                  >
                    Tambah Data Pengguna
                  </p>
                </Stack>
              </div>
            )}
            <div
              onClick={() => handleDelete("open")}
              style={{
                ...CENTER,
                backgroundColor:
                  selected.length === 0 ? Colors.secondary : Colors.error,
                borderRadius: 5,
                cursor: "pointer",
                padding: 10,
              }}
            >
              <Icon style={{ color: "#fff", fontSize: isMobile ? 20 : 25 }}>
                delete_outline
              </Icon>
            </div>
          </Stack>
        </Stack>
        <div style={{ marginTop: 10 }}>
          <Stack
            direction={isMobile ? "column" : "row"}
            alignItems={"center"}
            gap={3}
            justifyContent={isMobile ? "center" : "space-between"}
            sx={{
              paddingX: 4,
              paddingY: 2,
              backgroundColor: Colors.primary,
              borderRadius: "10px 10px 0px 0px",
            }}
          >
            <Stack alignItems={"center"} gap={2} direction={"row"}>
              <Icon sx={{ fontSize: 27, color: "#fff" }}>view_list</Icon>
              <p style={{ color: "#fff", fontWeight: 500, margin: 0 }}>
                Daftar Data Pengguna
              </p>
            </Stack>
            <TextField
              type="search"
              size="small"
              placeholder="Pencarian by Nama"
              sx={{
                bgcolor: "white",
                borderRadius: 1,
                width: isMobile ? "90%" : "20vw",
              }}
              onChange={handleSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon>search</Icon>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
        </div>
      </div>
      <Box
        sx={{
          overflow: "auto",
          bgcolor: "white",
          border: 1,
          borderColor: Colors.secondary,
          borderBottomLeftRadius: 5,
          borderBottomRightRadius: 5,
        }}
      >
        <Box sx={{ border: 1, borderColor: Colors.secondary }}>
          {
            props.loader ?
              <div style={{ ...CENTER, backgroundColor: '#fff', padding: 20 }}>
                <CircularProgress size={40} color={'error'} />
              </div>
              :
              <>
                {props.data.length === 0 ? (
                  <div style={{ ...CENTER, padding: "20px 0" }}>
                    <span>Tidak ada data</span>
                  </div>
                ) : (
                  <TableContainer>
                    <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                        <TableRow>
                          <StyledTableCell>
                            <Checkbox
                              color="primary"
                              indeterminate={
                                selected.length > 0 &&
                                selected.length < props.data.length
                              }
                              checked={
                                props.data.length > 0 &&
                                selected.length === props.data.length
                              }
                              onChange={handleSelectAllClick}
                            />
                          </StyledTableCell>
                          {columns.map((column: any) => (
                            <StyledTableCell key={column.id}>
                              {column.label}
                            </StyledTableCell>
                          ))}
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {props.data.map((item: any, index: number) => {
                          const isItemSelected = isSelected(item.id.toString());
                          const labelId = `enhanced-table-checkbox-${index}`;

                          return (
                            <TableRow
                              role="checkbox"
                              tabIndex={-1}
                              key={index}
                              sx={{
                                "&:hover": { bgcolor: Colors.inherit },
                                cursor: "pointer",
                              }}
                            >
                              <StyledTableCell
                                onClick={(e) =>
                                  handleClick(e, item.id.toString())
                                }
                                align="center"
                                padding="checkbox"
                              >
                                <Checkbox
                                  color="primary"
                                  checked={isItemSelected}
                                  inputProps={{
                                    "aria-labelledby": labelId,
                                  }}
                                />
                              </StyledTableCell>
                              <StyledTableCell
                                onClick={() => FormUpdateUser(item)}
                                align="center"
                              >
                                {index + 1}
                              </StyledTableCell>
                              <StyledTableCell
                                onClick={() => FormUpdateUser(item)}
                                align="center"
                              >
                                {item.name}
                              </StyledTableCell>
                              <StyledTableCell
                                onClick={() => FormUpdateUser(item)}
                                align="center"
                              >
                                {item.storeId === 0
                                  ? "Tidak ada Toko"
                                  : item.storeName}
                              </StyledTableCell>
                              <StyledTableCell
                                onClick={() => FormUpdateUser(item)}
                                align="center"
                              >
                                {item.roleName}
                              </StyledTableCell>
                              <StyledTableCell
                                onClick={() => FormUpdateUser(item)}
                                align="center"
                              >
                                {item.status === true ? (
                                  <div
                                    style={{
                                      ...CENTER,
                                      backgroundColor: Colors.success,
                                      padding: "5px 10px",
                                      borderRadius: 10,
                                    }}
                                  >
                                    <p style={{ color: "#fff", margin: 0 }}>
                                      Active
                                    </p>
                                  </div>
                                ) : (
                                  <div
                                    style={{
                                      ...CENTER,
                                      backgroundColor: Colors.error,
                                      padding: "5px 10px",
                                      borderRadius: 10,
                                    }}
                                  >
                                    <p style={{ color: "#fff", margin: 0 }}>
                                      Deactive
                                    </p>
                                  </div>
                                )}
                              </StyledTableCell>
                            </TableRow>
                          );
                        })
                        }
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </>
          }
        </Box>
        {props.data !== undefined && (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={props.pagination.totalItem === undefined ? 0 : props.pagination.totalItem}
            rowsPerPage={itemsPerPage}
            page={page - 1}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
      </Box>
      <DeleteModal isOpen={isDeleteModal} setOpen={handleDelete} />
    </div>
  );
};

export default UserTable;