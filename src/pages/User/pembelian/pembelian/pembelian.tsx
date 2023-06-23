import { Box, Toolbar, styled, Tabs, Tab } from '@mui/material';
import React from 'react'
import NavigationBarUser from '../../../../components/appBarUser';
import { Colors } from '../../../../utils/colors';
import { pembelianData } from '../dummy';
import PembelianTable from './pembelianTable';
import { isMobile } from 'react-device-detect';
import secureLocalStorage from 'react-secure-storage';
import { HTTPGetPurchases } from '../../../../apis/User/purchase/purchase';
import { toast } from 'react-toastify';

const CustomTabs = styled(Tabs)({
    color: Colors.primary,
    '& .MuiTabs-indicator': {
        backgroundColor: Colors.primary
    }
})

const CustomTab = styled(Tab)({
    '&.Mui-selected': {
        color: Colors.primary,
    },
})

const Pembelian = () => {
    const [value, setValue] = React.useState('semua');
    const token = secureLocalStorage.getItem("USER_SESSION") as string
    const [init, setInit] = React.useState(false);
    const [DataPurchase, setDataPurchase] = React.useState([]);
    const [limit, setLimit] = React.useState(10);
    const [page, setPage] = React.useState(1)
    const [pagination, setPagination] = React.useState({})
    const [search, setSearch] = React.useState('')
    const [loader, setLoader] = React.useState(true)

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        event.preventDefault()
        setValue(newValue);
    };


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

    const GetPurchasesTable = async () => {
        try {
            setLoader(true)
            const response = await HTTPGetPurchases({
                token: token,
                limit: limit.toString(),
                page: page.toString(),
                q: search.length === 0 ? undefined : search,
            });
            setDataPurchase(response.data.data);
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
        GetPurchasesTable();
    }, [init]);

    return (
        <div style={{ display: 'flex' }}>
            <NavigationBarUser title={'Pembelian'} isChild={false} name={'Pembelian'} idPanel={4}></NavigationBarUser>
            <Box component="main" sx={{ bgcolor: '#f4f5ff', p: isMobile ? 2 : 5, width: '100vw', minHeight: '100vh' }}>
                <Toolbar />
                <div style={{ maxWidth: isMobile ? '100vw' : '78vw' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <CustomTabs
                            value={value}
                            onChange={handleChange}
                            textColor="secondary"
                            indicatorColor="secondary"
                            variant={isMobile ? 'scrollable' : 'standard'}
                            scrollButtons={isMobile ? true : false}
                            allowScrollButtonsMobile={isMobile ? true : false}
                        >
                            <CustomTab value="semua" label="Semua" />
                            <CustomTab value="pending" label="Pending" />
                            <CustomTab value="lunas" label="Lunas" />
                            <CustomTab value="belumlunas" label="Belum Lunas" />
                            <CustomTab value="tidaksetuju" label="Tidak Disetujui" />
                        </CustomTabs>
                    </Box>
                    <div style={{ marginTop: 20 }}>
                        <PembelianTable
                            data={DataPurchase}
                            changePage={onChangePage}
                            itemsPerPage={onChangeLimit}
                            pagination={pagination}
                            search={onSearch}
                            loader={loader}
                            getData={GetPurchasesTable}
                        ></PembelianTable>
                    </div>
                </div>
            </Box>
        </div>
    )
}

export default Pembelian;