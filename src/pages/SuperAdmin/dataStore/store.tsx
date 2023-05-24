import React from 'react';
import { Box, Toolbar } from '@mui/material';
import NavigationBar from '../../../components/appBar';
import StoreTable from './storeTable';
import { isMobile } from 'react-device-detect';
import { HTTPGetStores } from '../../../apis/SuperAdmin/store';

const DataStore = () => {
    const [init, setInit] = React.useState(false)
    const [DataStore, setDataStore] = React.useState([])
    const [limit, setLimit] = React.useState(10);
    const [page, setPage] = React.useState(1)
    const [pagination, setPagination] = React.useState({})
    const [search, setSearch] = React.useState('')

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

    const GetStoreTable = async () => {
        try {
            const response = await HTTPGetStores({
                limit: limit.toString(),
                page: page.toString(),
                q: search,
            })
            setDataStore(response.data.data)
            setPagination(response.data.pagination)
        } catch (error) {
            console.log(error)
        }
    }

    React.useEffect(() => {
        GetStoreTable()
    }, [init])

    return (
        <div style={{ display: 'flex' }}>
            <NavigationBar title={'Data Toko'} indexNav={2} isChild={false}></NavigationBar>
            <Box
                component="main"
                sx={{ bgcolor: '#f4f5ff', p: isMobile ? 2 : 5, width: '100vw', minHeight: '100vh' }}
            >
                <Toolbar />
                <div style={{ maxWidth: isMobile ? '100vw' : '78vw' }}>
                    <StoreTable
                        data={DataStore}
                        changePage={onChangePage}
                        itemsPerPage={onChangeLimit}
                        pagination={pagination}
                        search={onSearch}
                    />
                </div>
            </Box>
        </div >
    )
}

export default DataStore;