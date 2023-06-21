import React, { useState } from "react";
import { toast } from 'react-toastify';
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
  Tooltip,
  Button,
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  CircularProgress,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { FilterList } from "@mui/icons-material";
import { Colors } from "../../../../utils/colors";
import { CENTER } from "../../../../utils/stylesheet";
import { isMobile } from "react-device-detect";
import { HTTPGetTypes } from "../../../../apis/User/product/types";
import secureLocalStorage from "react-secure-storage";
import { HTTPDeleteUnits, HTTPGetUnits, HTTPUpdateUnits } from "../../../../apis/User/product/units";
import { useFormik } from "formik";
import DeleteModal from "../../../../components/deleteModal";

const columns = [
  { id: "brand", label: "Nama Brand" },
  { id: "jenis", label: "Nama Jenis Produk" },
  { id: "supplier", label: "Nama Supplier" },
  { id: "hargaPcs", label: "Harga/PCs" },
  { id: "hargaLusin", label: "Harga/Lusinan" },
  { id: "hargaBox", label: "Harga/Box" },
  { id: "edit", label: "Edit" },
  { id: "updatedBy", label: "Updated By" },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    textAlign: "center",
    fontWeight: '700'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const SatuanTable = (props: any) => {
  const navigate = useNavigate();
  const token = secureLocalStorage.getItem('TOKEN')
  const [selected, setSelected] = useState<any[]>([]);
  const [page, setPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(10);
  const [init, setInit] = React.useState(false)
  const [limit, setLimit] = React.useState(10);
  const [UnitsData, setUnitsData] = React.useState([])
  const [TypesData, setTypesData] = React.useState([])
  const [search, setSearchData] = React.useState('')
  const [tooltipOpen, setTooltipOpen] = React.useState(false);
  const [onSend, setSend] = React.useState(false)
  const [editModal, setEditModal] = React.useState(false)
  const [itemSelected, setItemSelected] = React.useState<any>({})
  const [pagination, setPagination] = React.useState<any>({});
  const [loader, setLoader] = React.useState(false)
  const [isDeleteModal, setDeleteModal] = React.useState(false);

  const GetUnits = async () => {
    setLoader(true)
    try {
      const resp = await HTTPGetUnits({
        limit: limit.toString(),
        page: page.toString(),
        q: search,
        token: token as string
      })
      setUnitsData(resp.data.data)
      setPagination(resp.data.pagination)
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

  const GetTypes = async () => {
    try {
      const resp = await HTTPGetTypes({
        limit: limit.toString(),
        page: page.toString(),
        q: search,
        token: token as string
      })
      setTypesData(resp.data.data)
    } catch (error: any) {
      console.log(error)
if (error.status === 500) {
                toast.error('Server sedang mengalami gangguan!')
            } else {
                toast.error('Terjadi Kesalahan!')
            }
    }
  }

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage + 1);
    setInit(!init)
  };

  const handleChangeRowsPerPage = (event: any) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    setLimit(parseInt(event.target.value, 10))
    setPage(1);
    setInit(!init)
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
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = UnitsData.map((item: any, index: number) => item.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const isSelected = (name: any) => selected.indexOf(name) !== -1;
  const FormAddSatuan = () => {
    if (TypesData.length > 0) {
      navigate("/gudang/list-produk/form-satuan/add");
    }
  }

  React.useEffect(() => {
    GetUnits()
    GetTypes()
  }, [init])

  const handleOpen = () => {
    if (TypesData.length === 0) {
      setTooltipOpen(true)
    } else {
      setTooltipOpen(false)
    }
  }

  const handleEdit = () => {
    setEditModal(!editModal)
  }

  const Formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      hargaBeli: itemSelected.buyPriceInPcs,
      hargaJual: itemSelected.sellPriceInPcs,
      hargaBeliLusin: itemSelected.buyPriceInDozens,
      hargaJualLusin: itemSelected.sellPriceInDozens,
      hargaBeliBox: itemSelected.buyPriceInBox,
      hargaJualBox: itemSelected.sellPriceInBox,
    },
    onSubmit: async (values) => {
      setSend(true)
      try {
        const resp = await HTTPUpdateUnits({
          unitId: itemSelected.id,
          token: token as string,
          buyPriceInPcs: values.hargaBeli,
          sellPriceInPcs: values.hargaJual,
          buyPriceInDozens: values.hargaBeliLusin,
          sellPriceInDozens: values.hargaJualLusin,
          buyPriceInBox: values.hargaBeliBox,
          sellPriceInBox: values.hargaJualBox,
        })
        setSend(false)
        handleEdit()
        await GetUnits()
      } catch (error: any) {
        setSend(false)
        console.log(error)
if (error.status === 500) {
                toast.error('Server sedang mengalami gangguan!')
            } else {
                toast.error('Terjadi Kesalahan!')
            }
      }
    }
  })

  const handleDelete = async (param: string) => {
    if (selected.length > 0) {
      if (param === 'yes') {
        await HTTPDeleteUnits({
          ids: selected,
          token: token as string
        })
        setDeleteModal(!isDeleteModal);
        await GetUnits()
      } else {
        setDeleteModal(!isDeleteModal);
      }
    }
  };

  return (
    <div>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Tooltip title={'Jenis Produk belum tersedia'} placement="right" open={tooltipOpen} onOpen={handleOpen} onClose={() => setTooltipOpen(false)}>
          <div
            onClick={FormAddSatuan}
            style={{
              ...CENTER,
              backgroundColor: TypesData.length === 0 ? "#ababab" : Colors.primary,
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
                  color: "#fff",
                }}
              >
                Tambah Data Satuan Produk
              </p>
            </Stack>
          </div>
        </Tooltip>
        <Stack direction={"row"} alignItems={"center"} gap={isMobile ? 1 : 2}>
          <div
            onClick={() => handleDelete('open')}
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
            Daftar Data Satuan Produk
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
            loader ?
              <div style={{ ...CENTER, backgroundColor: '#fff', padding: 20 }}>
                <CircularProgress size={40} color={'error'} />
              </div>
              :
              <>
                {
                  UnitsData.length === 0 ?
                    <div style={{ ...CENTER, padding: '20px 0' }}>
                      <span>Tidak ada data</span>
                    </div>
                    :
                    <TableContainer>
                      <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                          <TableRow>
                            <StyledTableCell>
                              <Checkbox
                                color="primary"
                                indeterminate={
                                  selected.length > 0 &&
                                  selected.length < UnitsData.length
                                }
                                checked={
                                  UnitsData.length > 0 &&
                                  selected.length === UnitsData.length
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
                          {UnitsData.map((item: any, index: number) => {
                            const isItemSelected = isSelected(item.id);
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
                                  onClick={(e) => handleClick(e, item.id)}
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
                                <StyledTableCell align="center">
                                  {item.productBrandName}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  {item.productTypeName}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  {'item'}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  {(item.sellPriceInPcs).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  {(item.sellPriceInDozens).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  {(item.sellPriceInBox).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  <Button onClick={() => { setItemSelected(item); handleEdit() }} variant={'contained'} color={'success'}>
                                    <Icon sx={{ color: '#fff' }} fontSize="medium">border_color</Icon>
                                  </Button>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  {item.updatedBy === null ? '-' : item.updatedBy}
                                </StyledTableCell>
                              </TableRow>
                            );
                          })
                          }
                        </TableBody>
                      </Table>
                    </TableContainer>
                }
              </>
          }
        </Box>
        {UnitsData !== undefined && (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={pagination.totalItem === undefined ? 0 : pagination.totalItem}
            rowsPerPage={itemsPerPage}
            page={page - 1}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
      </Box>

      {/* UPDATE DATA POPUP */}
      <Dialog open={editModal} onClose={handleEdit} PaperProps={{ style: { maxWidth: '100vw' } }}>
        <DialogTitle>
          <Stack direction={'row'} width={'100%'} alignItems={'center'} justifyContent={'space-between'}>
            <strong><span>Form Edit Data Satuan</span></strong>
            <IconButton onClick={handleEdit}>
              <Icon sx={{ color: '#ababab' }} fontSize="medium">close</Icon>
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={Formik.handleSubmit} >
            <Stack direction={'column'} spacing={3}>
              <Stack
                direction={isMobile ? "column" : "row"}
                alignItems={"center"}
                justifyContent={isMobile ? "center" : "flex-start"}
                gap={isMobile ? 2 : 3}
              >
                <Stack direction={"column"} gap={1}>
                  <span>Harga Beli/PCs</span>
                  <TextField
                    type="text"
                    size="small"
                    placeholder="Harga Beli/PCs"
                    name="hargaBeli"
                    value={Formik.values.hargaBeli}
                    onChange={Formik.handleChange}
                    sx={{ bgcolor: "#fff", width: isMobile ? "80vw" : "15vw" }}
                  />
                </Stack>
                <Stack direction={"column"} gap={1}>
                  <span>Harga Jual/PCs</span>
                  <TextField
                    type="text"
                    size="small"
                    placeholder="Harga Jual/PCs"
                    name="hargaJual"
                    value={Formik.values.hargaJual}
                    onChange={Formik.handleChange}
                    sx={{ bgcolor: "#fff", width: isMobile ? "80vw" : "15vw" }}
                  />
                </Stack>
              </Stack>
              <Stack
                direction={isMobile ? "column" : "row"}
                alignItems={"center"}
                justifyContent={isMobile ? "center" : "flex-start"}
                gap={isMobile ? 2 : 3}
              >
                <Stack direction={"column"} gap={1}>
                  <span>Harga Beli/Lusin</span>
                  <TextField
                    type="text"
                    size="small"
                    placeholder="Harga Beli/Lusin"
                    name="hargaBeliLusin"
                    value={Formik.values.hargaBeliLusin}
                    onChange={Formik.handleChange}
                    sx={{ bgcolor: "#fff", width: isMobile ? "80vw" : "15vw" }}
                  />
                </Stack>
                <Stack direction={"column"} gap={1}>
                  <span>Harga Jual/Lusin</span>
                  <TextField
                    type="text"
                    size="small"
                    placeholder="Harga Jual/Lusin"
                    name="hargaJualLusin"
                    value={Formik.values.hargaJualLusin}
                    onChange={Formik.handleChange}
                    sx={{ bgcolor: "#fff", width: isMobile ? "80vw" : "15vw" }}
                  />
                </Stack>
              </Stack>
              <Stack
                direction={isMobile ? "column" : "row"}
                alignItems={"center"}
                justifyContent={isMobile ? "center" : "flex-start"}
                gap={isMobile ? 2 : 3}
              >
                <Stack direction={"column"} gap={1}>
                  <span>Harga Beli/Box</span>
                  <TextField
                    type="text"
                    size="small"
                    placeholder="Harga Beli/Box"
                    name="hargaBeliBox"
                    value={Formik.values.hargaBeliBox}
                    onChange={Formik.handleChange}
                    sx={{ bgcolor: "#fff", width: isMobile ? "80vw" : "15vw" }}
                  />
                </Stack>
                <Stack direction={"column"} gap={1}>
                  <span>Harga Jual/Box</span>
                  <TextField
                    type="text"
                    size="small"
                    placeholder="Harga Jual/Box"
                    name="hargaJualBox"
                    value={Formik.values.hargaJualBox}
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
            </Stack>
          </form>
        </DialogContent>
      </Dialog>
      <DeleteModal isOpen={isDeleteModal} setOpen={handleDelete} />
    </div>
  );
};

export default SatuanTable;
