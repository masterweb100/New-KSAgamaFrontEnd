import { Box, Toolbar } from '@mui/material';
import React from 'react'
import NavigationBarUser from '../../../../components/appBarUser';
import { penjualanData } from '../dummy';
import PenjualanTable from './penjualanTable';
import { isMobile } from 'react-device-detect';
import { HTTPGetSales, HTTPGetTotalBillSales } from '../../../../apis/User/sales/sales';
import secureLocalStorage from 'react-secure-storage';
import { toast } from 'react-toastify';

const Penjualan = () => {
    const token = secureLocalStorage.getItem("USER_SESSION") as string
    const [init, setInit] = React.useState(false);
    const [DataSales, setDataSales] = React.useState([]);
    const [limit, setLimit] = React.useState(10);
    const [page, setPage] = React.useState(1)
    const [pagination, setPagination] = React.useState({})
    const [bill, setBill] = React.useState({
        subTotal: 0,
        total: 0,
    })
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

    const GetSalesTable = async () => {
        try {
            setLoader(true)
            const response = await HTTPGetSales({
                token: token,
                limit: limit.toString(),
                page: page.toString(),
                q: search.length === 0 ? undefined : search,
            });
            setDataSales(response.data.data);
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

    const GetTotalPrice = async () => {
        try {
            const resp = await HTTPGetTotalBillSales({
                limit: limit.toString(),
                page: page.toString(),
                token: token
            })
            setBill(resp.data.data)
        } catch (error: any) {
            if (error.status === 500) {
                toast.error('Server sedang mengalami gangguan!')
            } else {
                toast.error('Terjadi Kesalahan!')
            };
        }
    }

    React.useEffect(() => {
        GetSalesTable().then().catch();
        GetTotalPrice().then().catch();
    }, [init]);

    return (
        <div style={{ display: 'flex' }}>
            <NavigationBarUser title={'Penjualan'} isChild={false} name={'Penjualan'} idPanel={3}></NavigationBarUser>
            <Box component="main" sx={{ bgcolor: '#f4f5ff', p: isMobile ? 2 : 5, width: '100vw', minHeight: '100vh' }}>
                <Toolbar />
                <div style={{ maxWidth: isMobile ? '100vw' : '78vw' }}>
                    <PenjualanTable
                        data={DataSales}
                        changePage={onChangePage}
                        itemsPerPage={onChangeLimit}
                        pagination={pagination}
                        search={onSearch}
                        loader={loader}
                        getData={GetSalesTable}
                        totalBill={bill}
                    ></PenjualanTable>
                </div>
            </Box>
        </div>
    )
}

export default Penjualan;