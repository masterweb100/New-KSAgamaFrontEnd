import { Box, Toolbar, Stack, Icon } from '@mui/material';
import React from 'react'
import NavigationBarUser from '../../../components/appBarUser';
import { Colors } from '../../../utils/colors';
import DetailAkunTable from './akunDetailTable';
import { detailData } from './dummy';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const DetailAkun = () => {
    const [dateFrom, setDateFrom] = React.useState<any>(null);
    const [dateTo, setDateTo] = React.useState<any>(null);

    return (
        <div style={{ display: 'flex' }}>
            <NavigationBarUser title={'Detail Akun'} isChild={true} name={'Akun'} idPanel={5}></NavigationBarUser>
            <Box
                component="main"
                sx={{ bgcolor: '#f4f5ff', p: 5, width: '100vw', minHeight: '100vh' }}
            >
                <Toolbar />
                <div>
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-end'} gap={2}>
                        <div style={{ backgroundColor: '#fff', padding: '7px 15px', borderRadius: 5, border: `1px solid ${Colors.error}` }}>
                            <Stack direction={'row'} alignItems={'center'} gap={1}>
                                <Icon sx={{ color: Colors.error, fontSize: 20 }}>file_download</Icon>
                                <span style={{ fontSize: 13, color: Colors.error }}>PDF</span>
                            </Stack>
                        </div>
                        <div style={{ backgroundColor: '#fff', padding: '7px 15px', borderRadius: 5, border: `1px solid ${Colors.success}` }}>
                            <Stack direction={'row'} alignItems={'center'} gap={1}>
                                <Icon sx={{ color: Colors.success, fontSize: 20 }}>file_download</Icon>
                                <span style={{ fontSize: 13, color: Colors.success }}>Excel</span>
                            </Stack>
                        </div>
                    </Stack>
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} sx={{ marginTop: 3 }}>
                        <div>
                            <h1 style={{ margin: 0 }}>Transaksi Kas</h1>
                            <h2 style={{ margin: 0 }}>1 - 10000</h2>
                        </div>
                        <Stack direction={'row'} alignItems={'center'} gap={1}>
                            <DatePicker
                                value={dateFrom}
                                onChange={(date) => setDateFrom(date)}
                                sx={{ bgcolor: "white", borderRadius: 1, width: '15vw' }}
                            />
                            <Icon sx={{ color: Colors.secondary, fontSize: 25 }}>east</Icon>
                            <DatePicker
                                value={dateTo}
                                onChange={(date) => setDateTo(date)}
                                sx={{ bgcolor: "white", borderRadius: 1, width: '15vw' }}
                            />
                        </Stack>
                    </Stack>
                    <div style={{ marginTop: 20 }}>
                        <DetailAkunTable data={detailData}></DetailAkunTable>
                    </div>
                </div>
            </Box>
        </div>
    )
}

export default DetailAkun;