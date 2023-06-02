import { Box, Stack, Toolbar, Icon } from '@mui/material';
import React from 'react'
import NavigationBarUser from '../../../../components/appBarUser';
import { Colors } from '../../../../utils/colors';
import { kontakData } from '../dummy';
import EkspedisiTable from './ekspedisiTable';
import { isMobile } from 'react-device-detect';
import secureLocalStorage from 'react-secure-storage';
import { HTTPGetExpeditions } from '../../../../apis/User/contact/expedition';

const Ekspedisi = () => {
    const token = secureLocalStorage.getItem("TOKEN") as string
    const [init, setInit] = React.useState(false);
    const [DataRole, setDataRole] = React.useState([]);
    const [limit, setLimit] = React.useState(10);
    const [page, setPage] = React.useState(1)
    const [pagination, setPagination] = React.useState({})
    const [search, setSearch] = React.useState('')
    const [loader, setLoader] = React.useState(true)

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

    const GetExpeditionTable = async () => {
        try {
            setLoader(true)
            const response = await HTTPGetExpeditions({
                token: token,
                limit: limit.toString(),
                page: page.toString(),
                q: search,
            });
            console.log(response)
            setDataRole(response.data.data);
            setPagination(response.data.pagination);
            setLoader(false)
        } catch (error) {
            setLoader(false)
            console.log(error);
        }
    };

    React.useEffect(() => {
        GetExpeditionTable();
    }, [init]);

    return (
        <div style={{ display: 'flex' }}>
            <NavigationBarUser title={'Kontak'} isChild={false} name={'Ekspedisi'} idPanel={7}></NavigationBarUser>
            <Box component="main" sx={{ bgcolor: '#f4f5ff', p: isMobile ? 2 : 5, width: '100vw', minHeight: '100vh' }}>
                <Toolbar />
                <div style={{ maxWidth: isMobile ? '100vw' : '78vw' }}>
                    <Stack direction={'row'} alignItems={'center'} justifyContent={isMobile ? 'space-between' : 'flex-end'} gap={2}>
                        <div style={{ backgroundColor: '#fff', padding: '7px 15px', borderRadius: 5, border: `1px solid ${Colors.primary}` }}>
                            <Stack direction={'row'} alignItems={'center'} gap={1}>
                                <Icon sx={{ color: Colors.primary, fontSize: 20 }}>file_upload</Icon>
                                {
                                    isMobile ?
                                        <span style={{ fontSize: 13, color: Colors.primary }}>Import</span>
                                        :
                                        <span style={{ fontSize: 13, color: Colors.primary }}>Import Data Kontak</span>
                                }
                            </Stack>
                        </div>
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
                    <div style={{ marginTop: 20 }}>
                        <EkspedisiTable
                            data={DataRole}
                            changePage={onChangePage}
                            itemsPerPage={onChangeLimit}
                            pagination={pagination}
                            search={onSearch}
                            loader={loader}
                        ></EkspedisiTable>
                    </div>
                </div>
            </Box>
        </div>
    )
}

export default Ekspedisi;