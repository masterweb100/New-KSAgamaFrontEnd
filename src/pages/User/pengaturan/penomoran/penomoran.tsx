import { Box, Stack, Toolbar } from '@mui/material';
import React from 'react'
import NavigationBarUser from '../../../../components/appBarUser';
import { CENTER } from '../../../../utils/stylesheet';
import PenomoranDialog from './penomoranDialog';
import './styles.css'
import { isMobile } from 'react-device-detect';

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
    const [isDetail, setDetail] = React.useState(false)
    const [activeContent, setActiveContent] = React.useState<any>({})

    const DetailDialog = React.useCallback((title: string, subtitle: string) => {
        setActiveContent({
            title: title,
            subtitle: subtitle
        })
        setDetail(true)
    }, [])

    return (
        <div style={{ display: 'flex' }}>
            <NavigationBarUser title={'Pengaturan'} isChild={false} name={'Pengaturan Penomoran'} idPanel={9}></NavigationBarUser>
            <Box component="main" sx={{ bgcolor: '#f4f5ff', p: isMobile ? 3 : 5, width: '100vw', minHeight: '100vh' }}>
                <Toolbar />
                <Stack direction={'column'} gap={3}>
                    {
                        dummyData.map((item, index) => (
                            <Stack direction={'column'} key={index} gap={1}>
                                <h3 style={{ color: '#000', fontWeight: 600, margin: 0 }}>{item.title}</h3>
                                <Stack direction={'row'} alignItems={'center'} gap={2} flexWrap={'wrap'}>
                                    {
                                        item.data.map((value, index) => (
                                            <div onClick={() => DetailDialog(item.title, value.title)} key={index} className={'selection'} style={{ ...CENTER, width: isMobile ? '40vw' : '12vw' }}>
                                                <Stack direction={'column'} alignItems={'center'} justifyContent={'center'}>
                                                    <span style={{ fontSize: 13 }}>{value.title}</span>
                                                    <span>{value.id}</span>
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
            <PenomoranDialog
                isOpen={isDetail}
                setOpen={() => setDetail(false)}
                title={activeContent.title}
                subtitle={activeContent.subtitle}
            ></PenomoranDialog>
        </div>
    )
}

export default SetPenomoran;