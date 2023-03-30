import { Box, Toolbar } from '@mui/material';
import React from 'react'
import NavigationBarUser from '../../../../components/appBarUser';
import { laporanData } from '../dummy';

const LapTransaksi = () => {
    return (
        <div style={{ display: 'flex' }}>
            <NavigationBarUser title={'Penjualan & Pembelian'} isChild={false} name={'Lap. Penjualan & Pembelian'} idPanel={6}></NavigationBarUser>
            <Box component="main" sx={{ bgcolor: '#f4f5ff', py: 5, px: 5, width: '100vw', minHeight: '100vh' }}>
                <Toolbar />
                <div>
                    {
                        laporanData.map((item, index) => (
                            <div key={index}>
                                <h3>{item.title}</h3>
                                {
                                    item.list.map((item, index) => (
                                        <div key={index} className={'list'} style={{ color: '#000' }}>
                                            <span>{item}</span>
                                        </div>
                                    ))
                                }
                            </div>
                        ))
                    }
                </div>
            </Box>
        </div>
    )
}

export default LapTransaksi;