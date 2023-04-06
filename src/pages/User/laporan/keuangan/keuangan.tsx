import { Box, Stack, Toolbar, Icon } from '@mui/material';
import React from 'react'
import NavigationBarUser from '../../../../components/appBarUser';
import { Colors } from '../../../../utils/colors';
import { keuanganData } from '../dummy';
import '../style.css'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const LapKeuangan = () => {
    const [dateFrom, setDateFrom] = React.useState<any>(null);
    const [dateTo, setDateTo] = React.useState<any>(null);

    return (
        <div style={{ display: 'flex' }}>
            <NavigationBarUser title={'Keuangan'} isChild={false} name={'Lap. Keuangan'} idPanel={6}></NavigationBarUser>
            <Box component="main" sx={{ bgcolor: '#f4f5ff', p: 5, width: '100vw', minHeight: '100vh' }}>
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
                        <h2 style={{ margin: 0 }}>Laba Rugi</h2>
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
                    <Stack direction={"column"} gap={2}>
                        {
                            keuanganData.map((item, index) => (
                                <div key={index}>
                                    <Stack
                                        direction={"row"}
                                        alignItems={"center"}
                                        justifyContent={"space-between"}
                                        sx={{
                                            marginTop: 3,
                                            paddingX: 4,
                                            paddingY: 2,
                                            backgroundColor: Colors.primary,
                                            borderRadius: "10px 10px 0px 0px",
                                        }}
                                    >
                                        <p style={{ color: "#fff", fontWeight: 500, margin: 0 }}>{item.title}</p>
                                        <p style={{ color: "#fff", fontWeight: 500, margin: 0 }}>{item.date}</p>
                                    </Stack>
                                    <Stack direction={'column'} gap={0}>
                                        <div>
                                            <div className={'list'} style={{ color: '#000' }}>
                                                <h3 style={{ margin: 0 }}>{item.subtitle}</h3>
                                            </div>
                                            {
                                                item.list.map((item, index) => (
                                                    <div className={'list'} key={index} style={{ paddingLeft: 70 }}>
                                                        <span>{item.title + ' (' + item.id + ')'}</span>
                                                        <span>{item.value}</span>
                                                    </div>
                                                ))
                                            }
                                            <div className={'list'} style={{ color: '#000' }}>
                                                <h3 style={{ margin: 0 }}>{item.footer}</h3>
                                                <h3 style={{ margin: 0 }}>{item.total}</h3>
                                            </div>
                                        </div>
                                    </Stack>
                                </div>
                            ))
                        }
                        <div className={'list'} style={{ color: '#000' }}>
                            <h3 style={{ margin: 0 }}>Laba Bersih</h3>
                            <h3 style={{ margin: 0 }}>50.000.000</h3>
                        </div>
                    </Stack>
                </div>
            </Box>
        </div>
    )
}

export default LapKeuangan;