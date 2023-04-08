import { Box, Toolbar } from '@mui/material';
import React from 'react'
import NavigationBarUser from '../../../../components/appBarUser';
import { laporanData } from '../dummy';
import { useNavigate } from 'react-router-dom';
import { isMobile } from 'react-device-detect';

const LapTransaksi = () => {
    const navigate = useNavigate()
    const NavigatePage = (param: string) => navigate(param)
    
    return (
        <div style={{ display: 'flex' }}>
            <NavigationBarUser title={'Penjualan & Pembelian'} isChild={false} name={'Lap. Penjualan & Pembelian'} idPanel={6}></NavigationBarUser>
            <Box component="main" sx={{ bgcolor: '#f4f5ff', p: isMobile ? 3 : 5, width: '100vw', minHeight: '100vh' }}>
                <Toolbar />
                <div>
                    {
                        laporanData.map((item, index) => (
                            <div key={index}>
                                <h3>{item.title}</h3>
                                {
                                    item.list.map((item, index) => (
                                        <div key={index} onClick={() => NavigatePage(item.navigate)} className={'list'} style={{ color: '#000' }}>
                                            <span>{item.label}</span>
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