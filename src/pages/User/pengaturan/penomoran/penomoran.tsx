import { Box, Stack, Toolbar } from '@mui/material';
import React from 'react'
import NavigationBarUser from '../../../../components/appBarUser';
import { CENTER } from '../../../../utils/stylesheet';
import './styles.css'

const dummyData = [
    {
        title: 'Gudang',
        data: [
            { title: 'ID SKU Brand', id: 'PRD/0001' },
            { title: 'ID Jenis Barang', id: 'PRD1/0001' },
            { title: 'ID Karegori Barang', id: 'KTGR/0001' },
        ]
    },
    {
        title: 'Penjualan',
        data: [
            { title: 'Invoice Penjualan', id: 'PJL/0001' },
        ]
    },
    {
        title: 'Pembelian',
        data: [
            { title: 'ID SKU Pembelian', id: 'PBL/0001' },
        ]
    },
    {
        title: 'Kontak',
        data: [
            { title: 'ID Pelanggan', id: 'PLG/0001' },
            { title: 'ID Supplier', id: 'SPL/0001' },
            { title: 'ID Ekspedisi', id: 'EKS/0001' },
        ]
    },
]

const SetPenomoran = () => {
    return (
        <div style={{ display: 'flex' }}>
            <NavigationBarUser title={'Pengaturan'} isChild={false} name={'Pengaturan Penomoran'} idPanel={9}></NavigationBarUser>
            <Box component="main" sx={{ bgcolor: '#f4f5ff', py: 5, px: 10, width: '100vw', minHeight: '100vh' }}>
                <Toolbar />
                <Stack direction={'column'} gap={3}>
                    {
                        dummyData.map((item, index) => (
                            <Stack direction={'column'} key={index} gap={1}>
                                <h3 style={{ color: '#000', fontWeight: 600, margin: 0 }}>{item.title}</h3>
                                <Stack direction={'row'} alignItems={'center'} gap={2} flexWrap={'wrap'}>
                                    {
                                        item.data.map((item, index) => (
                                            <div key={index} className={'selection'} style={{ ...CENTER }}>
                                                <Stack direction={'column'} alignItems={'center'} justifyContent={'center'}>
                                                    <span style={{ fontSize: 13 }}>{item.title}</span>
                                                    <span>{item.id}</span>
                                                </Stack>
                                            </div>
                                        ))
                                    }
                                </Stack>
                            </Stack>
                        ))
                    }
                </Stack>
            </Box>
        </div>
    )
}

export default SetPenomoran;