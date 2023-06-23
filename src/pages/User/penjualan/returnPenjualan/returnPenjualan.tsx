import { Box, Toolbar } from '@mui/material';
import React from 'react'
import NavigationBarUser from '../../../../components/appBarUser';
import { returnData } from '../dummy';
import ReturnPenjualanTable from './returnPenjualanTable';
import { isMobile } from 'react-device-detect';
import { HTTPGetReturn } from '../../../../apis/User/sales/return';
import secureLocalStorage from 'react-secure-storage';
import { toast } from 'react-toastify';

const ReturnPenjualan = () => {
    const token = secureLocalStorage.getItem("USER_SESSION") as string
    const [init, setInit] = React.useState(false);
    const [DataReturn, setDataReturn] = React.useState([]);
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

    const GetReturnTable = async () => {
        try {
            setLoader(true)
            const response = await HTTPGetReturn({
                token: token,
                limit: limit.toString(),
                page: page.toString(),
                q: search.length === 0 ? undefined : search,
            });
            setDataReturn(response.data.data);
            setPagination(response.data.pagination);
            setLoader(false)
        } catch (error: any) {
            setLoader(false)
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
            <NavigationBarUser title={'Return Penjualan'} isChild={false} name={'Return Penjualan'} idPanel={3}></NavigationBarUser>
            <Box component="main" sx={{ bgcolor: '#f4f5ff', p: isMobile ? 2 : 5, width: '100vw', minHeight: '100vh' }}>
                <Toolbar />
                <div style={{ maxWidth: isMobile ? '100vw' : '78vw' }}>
                    <ReturnPenjualanTable
                        data={DataReturn}
                        changePage={onChangePage}
                        itemsPerPage={onChangeLimit}
                        pagination={pagination}
                        search={onSearch}
                        loader={loader}
                        getData={GetReturnTable}
                    ></ReturnPenjualanTable>
                </div>
            </Box>
        </div>
    )
}

export default ReturnPenjualan;