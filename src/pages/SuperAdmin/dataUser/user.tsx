import React from 'react';
import { Box, Toolbar } from '@mui/material';
import NavigationBar from '../../../components/appBar';
import './styles.css'
import UserTable from './userTable';
import { isMobile } from 'react-device-detect';
import { HTTPGetUsers } from '../../../apis/user';

const DataUser = () => {
    const [init, setInit] = React.useState(false)
    const [DataUser, setDataUser] = React.useState([])
    const [limit, setLimit] = React.useState(10);
    const [page, setPage] = React.useState(1)
    const [pagination, setPagination] = React.useState(false)
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

    const GetUserTable = async () => {
        try {
            const response = await HTTPGetUsers({
                limit: limit.toString(),
                page: page.toString(),
                q: search,
            })
            setDataUser(response.data.data)
            setPagination(response.data.pagination)
        } catch (error) {
            console.log(error)
        }
    }

    React.useEffect(() => {
        GetUserTable()
    }, [init])

    return (
        <div style={{ display: 'flex' }}>
            <NavigationBar title={'Data Pengguna'} indexNav={1} isChild={false}></NavigationBar>
            <Box
                component="main"
                sx={{ bgcolor: '#f4f5ff', p: isMobile ? 2 : 5, width: '100vw', minHeight: '100vh' }}
            >
                <Toolbar />
                <div style={{ maxWidth: isMobile ? '100vw' : '78vw' }}>
                    <UserTable 
                        data={DataUser} 
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

export default DataUser;