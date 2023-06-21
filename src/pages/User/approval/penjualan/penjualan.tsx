import { Box, Stack, Toolbar, InputAdornment, TextField, Icon } from '@mui/material';
import React from 'react'
import NavigationBarUser from '../../../../components/appBarUser';
import { Colors } from '../../../../utils/colors';
import { penjualanDataTable } from '../dummy';
import PenjualanTable from './penjualanTable';
import { isMobile } from 'react-device-detect';
import { HTTPGetApprovalsReturn } from '../../../../apis/User/approval/return';
import secureLocalStorage from 'react-secure-storage';
import { toast } from 'react-toastify';

const AppPenjualan = () => {
    const [init, setInit] = React.useState(false);
    const [DataReturn, setDataReturn] = React.useState([]);
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

    const GetReturnTable = async () => {
        try {
            setLoader(true);
            const response = await HTTPGetApprovalsReturn({
                limit: limit.toString(),
                page: page.toString(),
                q: search.length === 0 ? undefined : search,
                token: token,
            });
            setDataReturn(response.data.data);
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
        GetReturnTable();
    }, [init]);

    return (
        <div style={{ display: 'flex' }}>
            <NavigationBarUser title={'Approval Return Penjualan'} isChild={false} name={'App. Penjualan'} idPanel={8}></NavigationBarUser>
            <Box component="main" sx={{ bgcolor: '#f4f5ff', p: isMobile ? 2 : 5, width: '100vw', minHeight: '100vh' }}>
                <Toolbar />
                <div style={{ maxWidth: isMobile ? '100vw' : '75vw' }}>
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
                            <p style={{ color: "#fff", fontWeight: 500, margin: 0 }}>Daftar Approval Penjualan</p>
                        </Stack>
                        <TextField
                            type="search"
                            size="small"
                            placeholder="Pencarian by ID"
                            sx={{ bgcolor: "white", borderRadius: 1, width: isMobile ? '90%' : '20vw' }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Icon>search</Icon>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Stack>
                    <PenjualanTable
                        data={DataReturn}
                        changePage={onChangePage}
                        itemsPerPage={onChangeLimit}
                        pagination={pagination}
                        search={onSearch}
                        loader={loader}
                        getData={GetReturnTable}
                    />
                </div>
            </Box>
        </div>
    )
}

export default AppPenjualan;