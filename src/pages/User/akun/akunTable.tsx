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
  Icon,
  TextField,
  InputAdornment,
  CircularProgress,
  Tooltip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { FilterList } from "@mui/icons-material";
import { Colors } from "../../../utils/colors";
import { CENTER } from "../../../utils/stylesheet";
import { isMobile } from "react-device-detect";
import secureLocalStorage from "react-secure-storage";
import { HTTPGetAccountCategory } from "../../../apis/User/account/accountCategory";
import { useFormik } from "formik";
import { HTTPUpdateAccounts } from "../../../apis/User/account/account";

const columns = [
  { id: "kode", label: "Kode Akun" },
  { id: "nama", label: "Nama Akun" },
  { id: "kategori", label: "Kategori" },
  { id: "saldo", label: "Saldo" },
  { id: "edit", label: "Edit" },
];

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    textAlign: "center",
    fontWeight: "700",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const AkunTable = (props: any) => {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(10);
  const [DataCategory, setDataCategory] = React.useState([])
  const [init, setInit] = React.useState(false)
  const token = secureLocalStorage.getItem('TOKEN')
  const [tooltipOpen, setTooltipOpen] = React.useState(false)
  const [editModal, setEditModal] = React.useState(false)
  const [itemSelected, setItemSelected] = React.useState<any>({})
  const [onSend, setSend] = React.useState(false)

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage + 1);
    props.changePage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    props.itemsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const FormPage = () => {
    if (DataCategory.length !== 0) {
      navigate("/akun/form-akun");
    }
  }
  const KategoriPage = () => navigate("/akun/kategori-akun");
  const DetailPage = () => navigate("/akun/detail-akun");

  const GetCategoryTable = async () => {
    try {
      const response = await HTTPGetAccountCategory({
        limit: '10',
        page: '1',
        q: undefined,
        token: token as string,
      });
      setDataCategory(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpen = () => {
    if (DataCategory.length === 0) {
      setTooltipOpen(true)
    } else {
      setTooltipOpen(false)
    }
  }

  const handleClose = () => {
    setTooltipOpen(false)
  }

  React.useEffect(() => {
    GetCategoryTable();
  }, [init]);

  const handleEdit = () => {
    setEditModal(!editModal)
  }

  const Formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: itemSelected.accountName,
      code: itemSelected.accountCode
    },
    onSubmit: async (values) => {
      setSend(true)
      try {
        const resp = await HTTPUpdateAccounts({
          accountCode: values.code,
          accountName: values.name,
          id: itemSelected.id,
          token: token as string
        })
        setSend(false)
        handleEdit()
        props.getData()
      } catch (error) {
        setSend(false)
        console.log(error)
      }
    }
  })
  
  return (
    <div>
      <Stack
        direction={isMobile ? "column" : "row"}
        justifyContent={"flex-start"}
        alignItems={"center"}
        gap={2}
      >
        <Tooltip title="Kategori Akun belum tersedia" placement="bottom" open={tooltipOpen} onOpen={handleOpen} onClose={handleClose}>
          <div
            onClick={FormPage}
            style={{
              ...CENTER,
              backgroundColor: DataCategory.length === 0 ? "#ababab" : Colors.primary,
              borderRadius: 5,
              cursor: "pointer",
              padding: "10px 30px",
              alignSelf: "flex-start",
              width: isMobile ? "100%" : "auto",
            }}
          >
            <Stack alignItems={"center"} direction={"row"} gap={1}>
              <Icon style={{ color: "#fff", fontSize: 17 }}>add</Icon>
              <p
                style={{
                  margin: 0,
                  fontWeight: 500,
                  fontSize: 15,
                  color: "#ffff",
                }}
              >
                Tambah Data Akun
              </p>
            </Stack>
          </div>
        </Tooltip>
        <div
          onClick={KategoriPage}
          style={{
            ...CENTER,
            border: `1px solid ${Colors.primary}`,
            borderRadius: 5,
            cursor: "pointer",
            padding: "10px 30px",
            alignSelf: "flex-start",
            width: isMobile ? "100%" : "auto",
          }}
        >
          <p
            style={{
              margin: 0,
              fontWeight: 500,
              fontSize: 15,
              color: Colors.primary,
            }}
          >
            List Kategori Akun
          </p>
        </div>
      </Stack>
      <Stack
        direction={isMobile ? "column" : "row"}
        alignItems={"center"}
        gap={3}
        justifyContent={isMobile ? "center" : "space-between"}
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
          <p style={{ color: "#fff", fontWeight: 500, margin: 0 }}>
            Daftar Data Akun
          </p>
        </Stack>
        <TextField
          type="search"
          size="small"
          placeholder="Pencarian by ID"
          sx={{
            bgcolor: "white",
            borderRadius: 1,
            width: isMobile ? "90%" : "20vw",
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Icon>search</Icon>
              </InputAdornment>
            ),
          }}
        />
      </Stack>
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
                {
                  props.data.length === 0 ?
                    <div style={{ ...CENTER, padding: '20px 0' }}>
                      <span>Tidak ada data</span>
                    </div>
                    :
                    <TableContainer>
                      <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                          <TableRow>
                            {columns.map((column: any) => (
                              <StyledTableCell key={column.id}>
                                {column.label}
                              </StyledTableCell>
                            ))}
                          </TableRow>
                        </TableHead>

                        <TableBody>
                          {props.data.map((item: any, index: number) => {
                            return (
                              <TableRow
                                role="checkbox"
                                tabIndex={-1}
                                key={index}
                                sx={{ "&:hover": { bgcolor: Colors.inherit } }}
                              >
                                <StyledTableCell style={{ cursor: "pointer" }} onClick={DetailPage} align="center">
                                  {item.accountCode}
                                </StyledTableCell>
                                <StyledTableCell style={{ cursor: "pointer" }} onClick={DetailPage} align="center">
                                  {item.accountName}
                                </StyledTableCell>
                                <StyledTableCell style={{ cursor: "pointer" }} onClick={DetailPage} align="center">
                                  {item.accountCategoryName}
                                </StyledTableCell>
                                <StyledTableCell style={{ cursor: "pointer" }} onClick={DetailPage} align="center">
                                  {(item.balance).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  <Button onClick={() => { setItemSelected(item); handleEdit() }} variant={'contained'} color={'success'}>
                                    <Icon sx={{ color: '#fff' }} fontSize="medium">border_color</Icon>
                                  </Button>
                                </StyledTableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </TableContainer>
                }
              </>
          }
        </Box>
        {props.data !== undefined && (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={
              props.pagination.totalItem === undefined
                ? 0
                : props.pagination.totalItem
            }
            rowsPerPage={itemsPerPage}
            page={page - 1}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
      </Box>
      <Dialog open={editModal} onClose={handleEdit} PaperProps={{ style: { maxWidth: '100vw' } }}>
        <DialogTitle>
          <Stack direction={'row'} width={'100%'} alignItems={'center'} justifyContent={'space-between'}>
            <strong><span>Form Edit Data Akun</span></strong>
            <IconButton onClick={handleEdit}>
              <Icon sx={{ color: '#ababab' }} fontSize="medium">close</Icon>
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={Formik.handleSubmit} >
            <Stack
              direction={isMobile ? "column" : "row"}
              alignItems={"center"}
              justifyContent={isMobile ? "center" : "flex-start"}
              gap={isMobile ? 2 : 3}
            >
              <Stack direction={"column"} gap={1}>
                <span>*Nama Akun</span>
                <TextField
                  type="text"
                  size="small"
                  placeholder="Nama Akun"
                  name="name"
                  value={Formik.values.name}
                  onChange={Formik.handleChange}
                  sx={{ bgcolor: "#fff", width: isMobile ? "80vw" : "15vw" }}
                />
              </Stack>
              <Stack direction={"column"} gap={1}>
                <span>*Kode Akun</span>
                <TextField
                  type="text"
                  size="small"
                  placeholder="Kode Akun"
                  name="code"
                  value={Formik.values.code}
                  onChange={Formik.handleChange}
                  sx={{ bgcolor: "#fff", width: isMobile ? "80vw" : "15vw" }}
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
                onClick={handleEdit}
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
              <button type="submit" style={{ all: "unset" }}>
                <div
                  style={{
                    ...CENTER,
                    borderRadius: 10,
                    backgroundColor: Colors.primary,
                    padding: "10px 30px",
                    cursor: "pointer",
                    color: "#fff",
                  }}
                >
                  {onSend === true ? (
                    <CircularProgress size={20} color={"inherit"} />
                  ) : (
                    <span style={{ fontSize: 13, color: "#fff" }}>
                      SIMPAN
                    </span>
                  )}
                </div>
              </button>
            </Stack>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AkunTable;
