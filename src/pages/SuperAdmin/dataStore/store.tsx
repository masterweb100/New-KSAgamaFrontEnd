import React from 'react';
import { Box, Toolbar } from '@mui/material';
import NavigationBar from '../../../components/appBar';
import StoreTable from './storeTable';
import DeleteModal from '../../../components/deleteModal';
import { isMobile } from 'react-device-detect';
import { HTTPGetStores } from '../../../apis/store';

const DataStore = () => {
    const [isDeleteModal, setDeleteModal] = React.useState(false);
    const [init, setInit] = React.useState(false)
    const [DataStore, setDataStore] = React.useState([])

    const handleDelete = () => {
        setDeleteModal(!isDeleteModal);
    };

    const GetStoreTable = async () => {
        try {
            const response = await HTTPGetStores({
                limit: '10',
                page: '1',
                q: ''
            })
            setDataStore(response.data.data)
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
                    <StoreTable data={DataStore} />
                </div>
                <DeleteModal isOpen={isDeleteModal} setOpen={handleDelete} />
            </Box>
        </div >
    )
}

export default DataStore;