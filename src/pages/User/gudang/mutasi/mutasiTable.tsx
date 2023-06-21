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
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { FilterList } from "@mui/icons-material";
import { Colors } from "../../../../utils/colors";
import { CENTER } from "../../../../utils/stylesheet";
import MutasiDialog from "./mutasiDialog";
import { isMobile } from "react-device-detect";
import DeleteModal from "../../../../components/deleteModal";
import moment from "moment";
import { HTTPDeleteMutations, HTTPGetMutations } from "../../../../apis/User/mutationReturn/mutations";
import secureLocalStorage from "react-secure-storage";

const columns = [
  { id: "tanggal", label: "Tanggal" },
  { id: "no", label: "Nomor Mutasi" },
  { id: "status", label: "Status" },
  { id: "jenisBarang", label: "Jenis Barang" },
  { id: "jumlah", label: "Jumlah Barang" },
  { id: "asal", label: "Gudang Asal" },
  { id: "tujuan", label: "Gudang Tujuan" },
  { id: "updatedBy", label: "Updated By" },
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

const MutasiTable = () => {
  const navigate = useNavigate();
  const token = secureLocalStorage.getItem('TOKEN') as string
  const [selected, setSelected] = useState<any[]>([]);
  const [page, setPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(10);
  const [isStatus, setStatus] = React.useState(false);
  const [isDeleteModal, setDeleteModal] = React.useState(false);
  const [ItemSelected, setItemSelected] = React.useState({})
  const [init, setInit] = React.useState(false);
  const [DataMutations, setDataMutations] = React.useState([]);
  const [pagination, setPagination] = React.useState<any>({})
  const [search, setSearch] = React.useState('')
  const [loader, setLoader] = React.useState(true)

  const onSearch = (param: string) => {
    setSearch(param)
    setInit(!init)
  }

  const GetMutationsTable = async () => {
    try {
      setLoader(true)
      const response = await HTTPGetMutations({
        token: token,
        limit: itemsPerPage.toString(),
        page: page.toString(),
        q: search.length === 0 ? undefined : search,
      });
      setDataMutations(response.data.data);
      setPagination(response.data.pagination);
      setLoader(false)
    } catch (error) {
      setLoader(false)
      console.log(error);
    }
  };

  const handleDelete = async (param: string) => {
    if (selected.length > 0) {
      if (param === 'yes') {
        await HTTPDeleteMutations({
          ids: selected,
          token: token as string
        })
        setDeleteModal(!isDeleteModal);
        GetMutationsTable()
        setSelected([])
      } else {
        setDeleteModal(!isDeleteModal);
      }
    }
  };

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
    setInit(!init)
  };

  const handleChangeRowsPerPage = (event: any) => {
    setItemsPerPage(parseInt(event.target.value, 10));
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
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = DataMutations.map((item: any, index: number) => item.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const isSelected = (name: any) => selected.indexOf(name) !== -1;

  const FormPage = () => {
    navigate("/gudang/mutasi/form-mutasi");
  };

  const StatusDialog = (item: any) => {
    setItemSelected(item)
    setStatus(true)
  }

  React.useEffect(() => {
    GetMutationsTable();
  }, [init]);

  return (
    <div>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <div
          onClick={FormPage}
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
              Tambah Data Mutasi
            </p>
          </Stack>
        </div>
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
            Daftar Data Mutasi
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
            loader ?
              <div style={{ ...CENTER, backgroundColor: '#fff', padding: 20 }}>
                <CircularProgress size={40} color={'error'} />
              </div>
              :
              <>
                {
                  DataMutations.length === 0 ?
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
                                  selected.length < DataMutations.length
                                }
                                checked={
                                  DataMutations.length > 0 &&
                                  selected.length === DataMutations.length
                                }
                                onChange={handleSelectAllClick}
                              />
                            </StyledTableCell>
                            {columns.map((column: any) => (
                              <StyledTableCell key={column.id}>
                                <div style={{ width: 120 }}>
                                  {column.label}
                                </div>
                              </StyledTableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {DataMutations.map((item: any, index: number) => {
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
                                <StyledTableCell
                                  onClick={() => StatusDialog(item)}
                                  align="center"
                                >
                                  {moment(item.date).format('YYYY/MM/DD')}
                                </StyledTableCell>
                                <StyledTableCell
                                  onClick={() => StatusDialog(item)}
                                  align="center"
                                >
                                  {item.genId}
                                </StyledTableCell>
                                <StyledTableCell
                                  onClick={() => StatusDialog(item)}
                                  align="center"
                                >
                                  <div
                                    style={{
                                      ...CENTER,
                                      backgroundColor: Colors.warning,
                                      padding: "5px 10px",
                                      borderRadius: 10,
                                    }}
                                  >
                                    <p style={{ color: "#fff", margin: 0 }}>
                                      {item.status.replace(/_/g, ' ')}
                                    </p>
                                  </div>
                                </StyledTableCell>
                                <StyledTableCell
                                  onClick={() => StatusDialog(item)}
                                  align="center"
                                >
                                  {item.productUnitTypeName}
                                </StyledTableCell>
                                <StyledTableCell
                                  onClick={() => StatusDialog(item)}
                                  align="center"
                                >
                                  {item.qty}
                                </StyledTableCell>
                                <StyledTableCell
                                  onClick={() => StatusDialog(item)}
                                  align="center"
                                >
                                  {item.storeOriginName}
                                </StyledTableCell>
                                <StyledTableCell
                                  onClick={() => StatusDialog(item)}
                                  align="center"
                                >
                                  {item.storeDestinationName}
                                </StyledTableCell>
                                <StyledTableCell
                                  onClick={() => StatusDialog(item)}
                                  align="center"
                                >
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
        {DataMutations !== undefined && (
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
      <MutasiDialog
        isOpen={isStatus}
        setOpen={() => setStatus(false)}
        item={ItemSelected}
        getData={GetMutationsTable}
      ></MutasiDialog>
      <DeleteModal isOpen={isDeleteModal} setOpen={handleDelete} />
    </div>
  );
};

export default MutasiTable;
