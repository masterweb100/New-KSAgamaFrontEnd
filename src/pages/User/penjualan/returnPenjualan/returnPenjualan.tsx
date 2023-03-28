import { Box, Stack, Toolbar } from '@mui/material';
import React from 'react'
import NavigationBarUser from '../../../../components/appBarUser';
import { returnData } from '../dummy';
import ReturnPenjualanTable from './returnPenjualanTable';

const ReturnPenjualan = () => {
    const [page, setPage] = React.useState(0);
    const [itemsPerPage, setItemsPerPage] = React.useState(5);
    
    return (
        <div style={{ display: 'flex' }}>
            <NavigationBarUser title={'Return Penjualan'} isChild={false} name={'Return Penjualan'} idPanel={3}></NavigationBarUser>
            <Box component="main" sx={{ bgcolor: '#f4f5ff', py: 5, px: 5, width: '100vw', minHeight: '100vh' }}>
                <Toolbar />
                <div>
                    <ReturnPenjualanTable
                        data={returnData}
                        setPage={setPage}
                        setItemsPerPage={setItemsPerPage}
                    ></ReturnPenjualanTable>
                </div>
            </Box>
        </div>
    )
}

export default ReturnPenjualan;