import { Box, Toolbar, styled, Tabs, Tab } from '@mui/material';
import React from 'react'
import NavigationBarUser from '../../../../components/appBarUser';
import { Colors } from '../../../../utils/colors';
import { pembelianData } from '../dummy';
import TrackingTable from './trackingTable';
import { isMobile } from 'react-device-detect';
import { HTTPGetTracking } from '../../../../apis/User/purchase/tracking';
import secureLocalStorage from 'react-secure-storage';
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

const Tracking = () => {
    const [value, setValue] = React.useState('semua');
    const token = secureLocalStorage.getItem("USER_SESSION") as string
    const [init, setInit] = React.useState(false);
    const [DataTracking, setDataTracking] = React.useState([]);
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

    const GetTrackingTable = async () => {
        try {
            setLoader(true)
            const response = await HTTPGetTracking({
                token: token,
                limit: limit.toString(),
                page: page.toString(),
                q: search.length === 0 ? undefined : search,
            });
            setDataTracking(response.data.data);
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
        GetTrackingTable();
    }, [init]);

    return (
        <div style={{ display: 'flex' }}>
            <NavigationBarUser title={'Tracking'} isChild={false} name={'Tracking'} idPanel={4}></NavigationBarUser>
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
                            <CustomTab value="menunggu" label="Menunggu Barang Diterima" />
                            <CustomTab value="diterima" label="Barang Diterima" />
                            <CustomTab value="selesai" label="Selesai" />
                            <CustomTab value="return" label="Return" />
                        </CustomTabs>
                    </Box>
                    <div style={{ marginTop: 20 }}>
                        <TrackingTable
                            data={DataTracking}
                            changePage={onChangePage}
                            itemsPerPage={onChangeLimit}
                            pagination={pagination}
                            search={onSearch}
                            loader={loader}
                            getData={GetTrackingTable}
                        ></TrackingTable>
                    </div>
                </div>
            </Box>
        </div>
    )
}

export default Tracking;