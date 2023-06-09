import React, { useState } from "react";
import { toast } from "react-toastify";
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
import { Colors } from "../../../../utils/colors";
import { CENTER } from "../../../../utils/stylesheet";
import { isMobile } from "react-device-detect";
import secureLocalStorage from "react-secure-storage";
import moment from "moment";
import {
  HTTPAddCategoryXLSX,
  HTTPDeleteCategory,
  HTTPGetCategories,
  HTTPUpdateCategory,
} from "../../../../apis/User/product/category";
import DeleteModal from "../../../../components/deleteModal";
import { useFilePicker } from "use-file-picker";

const columns = [
  { id: "id", label: "ID Kategori" },
  { id: "jenis", label: "Nama Kategori" },
  { id: "Edit", label: "Edit" },
  { id: "updatedBy", label: "Updated By" },
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

const KategoriTable = () => {
  const navigate = useNavigate();
  const token = secureLocalStorage.getItem("USER_SESSION") as string;
  const [selected, setSelected] = useState<any[]>([]);
  const [itemsPerPage, setItemsPerPage] = React.useState(10);
  const [KategoriData, setKategoriData] = React.useState([]);
  const [init, setInit] = React.useState(false);
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1);
  const [pagination, setPagination] = React.useState<any>({});
  const [search, setSearch] = React.useState("");
  const [onSend, setSend] = React.useState(false);
  const [editModal, setEditModal] = React.useState(false);
  const [itemSelected, setItemSelected] = React.useState<any>({});
  const [loader, setLoader] = React.useState(false);
  const [isDeleteModal, setDeleteModal] = React.useState(false);

  const handleSearch = (event: any) => {
    setSearch(event.target.value);
    setInit(!init);
  };

  const GetCategory = async () => {
    setLoader(true);
    try {
      const resp = await HTTPGetCategories({
        limit: limit.toString(),
        page: page.toString(),
        q: search,
        token: token,
      });
      setKategoriData(resp.data.data);
      setPagination(resp.data.pagination);
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

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage + 1);
    setInit(!init);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    setLimit(parseInt(event.target.value, 10));
    setPage(1);
    setInit(!init);
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

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = KategoriData.map(
        (item: any, index: number) => item.id
      );
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const isSelected = (name: any) => selected.indexOf(name) !== -1;
  const FormAddKategori = () =>
    navigate("/gudang/list-produk/form-kategori/add");

  const NoteNavigate = () => navigate("/note-kategori");
  const FormUpdateKategori = () => {
    if (selected.length > 0) {
      navigate("/gudang/list-produk/form-kategori/update");
    }
  };

  React.useEffect(() => {
    GetCategory();
  }, [init]);

  const handleEdit = () => {
    setEditModal(!editModal);
  };

  const onEdit = async () => {
    setSend(true);
    try {
      await HTTPUpdateCategory({
        categoryName: itemSelected.categoryName,
        id: itemSelected.id,
        token: token as string,
      });
      handleEdit();
      setSend(false);
      await GetCategory();
    } catch (error: any) {
      setSend(false);
      console.log(error);
      if (error.status === 500) {
        toast.error("Server sedang mengalami gangguan!");
      } else {
        toast.error("Terjadi Kesalahan!");
      }
    }
  };

  const handleDelete = async (param: string) => {
    if (selected.length > 0) {
      if (param === "yes") {
        await HTTPDeleteCategory({
          ids: selected,
          token: token,
        });
        setDeleteModal(!isDeleteModal);
        GetCategory();
      } else {
        setDeleteModal(!isDeleteModal);
      }
    }
  };

  const [openFile, { filesContent, loading, errors }] = useFilePicker({
    accept: ".xlsx",
    multiple: false,
    onFilesSuccessfulySelected: async ({ plainFiles }) => {
      setLoader(true);
      try {
        let Forms = new FormData();
        Forms.append("file", plainFiles[0]);
        await HTTPAddCategoryXLSX({ form: Forms, token: token });
        toast.success("Berhasil menambahkan Kategori!");
        await GetCategory();
        setLoader(false);
      } catch (error: any) {
        setLoader(false);
        if (error.status === 500) {
          toast.error("Server sedang mengalami gangguan!");
        } else {
          toast.error("Terjadi Kesalahan!");
        }
      }
    },
  });

  return (
    <div>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Stack direction={"row"} alignItems={"center"} gap={isMobile ? 1 : 2}>
          <div
            onClick={FormAddKategori}
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
                  color: "#fff",
                }}
              >
                Tambah Data Kategori Produk
              </p>
            </Stack>
          </div>
          <div
            onClick={NoteNavigate}
            style={{
              backgroundColor: "#fff",
              padding: isMobile ? "12px 15px" : "10px 30px",
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
                <span style={{ fontSize: 15, color: Colors.primary }}>
                  Import Data Kategori
                </span>
              )}
            </Stack>
          </div>
        </Stack>
        <Stack direction={"row"} alignItems={"center"} gap={isMobile ? 1 : 2}>
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
            Daftar Data Kategori Produk
          </p>
        </Stack>
        <TextField
          type="search"
          size="small"
          placeholder="Cari..."
          value={search}
          onChange={handleSearch}
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
          {loader ? (
            <div style={{ ...CENTER, backgroundColor: "#fff", padding: 20 }}>
              <CircularProgress size={40} color={"error"} />
            </div>
          ) : (
            <>
              {KategoriData.length === 0 ? (
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
                              selected.length < KategoriData.length
                            }
                            checked={
                              KategoriData.length > 0 &&
                              selected.length === KategoriData.length
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
                      {KategoriData.map((item: any, index: number) => {
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
                              {item.id}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {item.categoryName}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              <Button
                                onClick={() => {
                                  setItemSelected(item);
                                  handleEdit();
                                }}
                                variant={"contained"}
                                color={"success"}
                              >
                                <Icon sx={{ color: "#fff" }} fontSize="medium">
                                  border_color
                                </Icon>
                              </Button>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {item.updatedBy === null ? "-" : item.updatedBy}
                            </StyledTableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </>
          )}
        </Box>
        {KategoriData !== undefined && (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={
              pagination.totalItem === undefined ? 0 : pagination.totalItem
            }
            rowsPerPage={itemsPerPage}
            page={page - 1}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
      </Box>
      <Dialog
        open={editModal}
        onClose={handleEdit}
        PaperProps={{ style: { maxWidth: "100vw" } }}
      >
        <DialogTitle>
          <Stack
            direction={"row"}
            width={"100%"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <strong>
              <span>Form Edit Data Kategori</span>
            </strong>
            <IconButton onClick={handleEdit}>
              <Icon sx={{ color: "#ababab" }} fontSize="medium">
                close
              </Icon>
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Stack direction={"column"} gap={1}>
            <span>Nama Kategori</span>
            <TextField
              type="text"
              size="small"
              placeholder="Nama Kategori"
              sx={{ bgcolor: "#fff", width: isMobile ? "80vw" : "15vw" }}
              value={itemSelected.categoryName}
              onChange={(e) =>
                setItemSelected({
                  ...itemSelected,
                  categoryName: e.target.value,
                })
              }
            />
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
              <span style={{ fontSize: 13, color: Colors.primary }}>BATAL</span>
            </div>
            <button onClick={onEdit} style={{ all: "unset" }}>
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
                  <span style={{ fontSize: 13, color: "#fff" }}>SIMPAN</span>
                )}
              </div>
            </button>
          </Stack>
        </DialogContent>
      </Dialog>
      <DeleteModal isOpen={isDeleteModal} setOpen={handleDelete} />
    </div>
  );
};

export default KategoriTable;
