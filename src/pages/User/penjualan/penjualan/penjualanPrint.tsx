import * as React from 'react';
import NavigationBarUser from '../../../../components/appBarUser';
import { Box, CircularProgress, Icon, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, tableCellClasses } from '@mui/material';
import { isMobile } from 'react-device-detect';
import { CENTER } from '../../../../utils/stylesheet';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../stores/rootReducer';
import secureLocalStorage from 'react-secure-storage';
import { HTTPGetSalesByID } from '../../../../apis/User/sales/sales';
import { toast } from 'react-toastify';
import { Colors } from '../../../../utils/colors';
import { styled } from "@mui/material/styles";
import ReactToPrint from 'react-to-print';
import moment from 'moment';
import { HTTPGetCustomerID } from '../../../../apis/User/contact/customer';

const columns = [
    { id: "tanggal", label: "Tanggal" },
    { id: "qty", label: "QTY" },
    { id: "unit", label: "Unit" },
    { id: "pajak", label: "Pajak" },
    { id: "total", label: "Total" },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        textAlign: "center",
        fontWeight: '700',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const PenjualanPrint = () => {
    const SalesRedux = useSelector((state: RootState) => state.salesData.data)
    const token = secureLocalStorage.getItem('USER_SESSION') as string
    const userStore = secureLocalStorage.getItem('USER_STORE') as string
    const userData = secureLocalStorage.getItem('USER_DATA') as string
    const componentRef: any = React.useRef(null);
    const onBeforeGetContentResolve: any = React.useRef(null);
    const [loader, setLoader] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [onPrint, setPrint] = React.useState(false)
    const [init, setInit] = React.useState(false)
    const [SalesData, setSalesData] = React.useState([])
    const [CustomerData, setCustomerData] = React.useState({
        nameCustomer: '',
        address: '',
        email: '',
        phone: 0
    })

    const InitPrint = async () => {
        setLoader(true)
        try {
            const resp = await HTTPGetSalesByID({
                token: token,
                id: SalesRedux.id
            })
            setSalesData(resp.data.data.saleProducts)
            const user = await HTTPGetCustomerID({ id: SalesRedux.customerId })
            setCustomerData(user.data.data)
            setLoader(false)
        } catch (error: any) {
            setLoader(false)
            if (error.status === 500) {
                toast.error('Server sedang mengalami gangguan!')
            } else {
                toast.error('Terjadi Kesalahan!')
            }
        }
    }

    React.useEffect(() => { InitPrint() }, [init])


    const reactToPrintContent = React.useCallback(() => {
        return componentRef.current;
    }, [componentRef.current]);

    const handleAfterPrint = React.useCallback(() => {
        setPrint(false)
    }, []);

    const handleBeforePrint = React.useCallback(() => {
        setPrint(true)
    }, []);

    const handleOnBeforeGetContent = React.useCallback(() => {
        setPrint(true)
        setLoading(true);
        return new Promise<void>((resolve) => {
            onBeforeGetContentResolve.current = resolve;
            setTimeout(() => {
                setLoading(false);
                resolve();
            }, 2000);
        });
    }, [setLoading]);

    React.useEffect(() => {
        if (typeof onBeforeGetContentResolve.current === "function") {
            onBeforeGetContentResolve.current();
        }
    }, [onBeforeGetContentResolve.current]);

    const PrintButton = React.useCallback(() => {
        return (
            <div style={{ ...CENTER, backgroundColor: Colors.error, borderRadius: 5, cursor: 'pointer', padding: isMobile ? '10px 6px' : 10, color: '#fff' }}>
                <Stack direction={'row'} spacing={1} alignItems={'center'}>
                    <Icon sx={{ color: '#fff' }} fontSize="small">file_download</Icon>
                    <span style={{ color: '#fff', fontSize: 13, fontWeight: '600' }}>Export</span>
                </Stack>
            </div>
        )
    }, [])

    return (
        <div style={{ display: 'flex' }}>
            <NavigationBarUser title={'Laporan Data Penjualan'} isChild={true} name={'Penjualan'} idPanel={3}></NavigationBarUser>
            <Box
                component="main"
                sx={{ bgcolor: '#f4f5ff', width: '100vw', minHeight: '100vh' }}
            >
                <Toolbar />
                <div ref={componentRef} style={{ flex: 1, ...CENTER }}>
                    <Stack direction={'column'} spacing={3} style={{ backgroundColor: '#fff', padding: '3%' }}>
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                            <Stack direction={'row'} spacing={3} alignItems={'center'}>
                                <img src={require('../../../../assets/images/ksa-logo-purple.png')} style={{ width: '25%', height: 'auto', objectFit: 'contain' }} alt="" />
                                <div style={{ padding: 10, width: '41%', backgroundColor: Colors.primary }}>
                                    <h2 style={{ color: '#fff', margin: 0 }}>Invoice</h2>
                                </div>
                            </Stack>
                            {
                                onPrint ?
                                    null
                                    :
                                    <ReactToPrint
                                        content={reactToPrintContent}
                                        documentTitle={SalesRedux.invoice + '_' + moment().format('YYYY-MM-DD')}
                                        onAfterPrint={handleAfterPrint}
                                        onBeforeGetContent={handleOnBeforeGetContent}
                                        onBeforePrint={handleBeforePrint}
                                        removeAfterPrint
                                        trigger={PrintButton}
                                    />
                            }
                        </Stack>
                        <h1 style={{ color: '#000', margin: '3% 0' }}>Invoice {SalesRedux.invoice}</h1>
                        <div style={{ backgroundColor: '#eee', padding: 20, width: '100%' }}>
                            <Stack direction={"column"} spacing={0}>
                                <span style={{ color: '#000' }}><b>Referensi: </b>{SalesRedux.reference.length === 0 ? '-' : SalesRedux.reference}</span>
                                <span style={{ color: '#000' }}><b>Tanggal: </b>{moment(SalesRedux.transactionDate).format('YYYY/MM/DD')}</span>
                                <span style={{ color: '#000' }}><b>Tanggal Jatuh Tempo: </b>{moment(SalesRedux.dueDate).format('YYYY/MM/DD')}</span>
                            </Stack>
                        </div>
                        <Stack width={'100%'} direction={'row'} spacing={5}>
                            <Stack width={'50%'} direction={'row'} spacing={3}>
                                <div style={{ width: onPrint ? '6vw' : '4vw', height: onPrint ? '6vw' : '4vw', ...CENTER, backgroundColor: Colors.primary }}>
                                    <Icon style={{ color: '#fff' }} fontSize={onPrint ? 'medium' : 'large'}>info</Icon>
                                </div>
                                <Stack direction={'column'} spacing={0}>
                                    <span style={{ color: '#000' }}><b>Informasi Perusahaan</b></span>
                                    <span style={{ color: '#000' }}>{JSON.parse(userStore).storeName}</span>
                                    <span style={{ color: '#000' }}>{JSON.parse(userStore).address}</span>
                                    <span style={{ color: '#000' }}>{JSON.parse(userData).email}</span>
                                </Stack>
                            </Stack>
                            <Stack width={'50%'} direction={'row'} spacing={3}>
                                <div style={{ width: onPrint ? '6vw' : '4vw', height: onPrint ? '6vw' : '4vw', ...CENTER, backgroundColor: Colors.primary }}>
                                    <Icon style={{ color: '#fff' }} fontSize={onPrint ? 'medium' : 'large'}>receipt_long</Icon>
                                </div>
                                <Stack direction={'column'} spacing={0}>
                                    <span style={{ color: '#000' }}><b>Tagihan Kepada</b></span>
                                    <span style={{ color: '#000' }}>{CustomerData.nameCustomer}</span>
                                    <span style={{ color: '#000' }}>{CustomerData.address}</span>
                                    <span style={{ color: '#000' }}>{CustomerData.email}</span>
                                    <span style={{ color: '#000' }}>{CustomerData.phone}</span>
                                </Stack>
                            </Stack>
                        </Stack>
                        <Stack direction={'row'} alignItems={'center'} spacing={3}>
                            <div style={{ width: onPrint ? '6vw' : '4vw', aspectRatio: 1, ...CENTER, backgroundColor: Colors.primary }}>
                                <Icon style={{ color: '#fff' }} fontSize={onPrint ? 'medium' : 'large'}>receipt_long</Icon>
                            </div>
                            <h3 style={{ color: '#000' }}>Detail Tagihan:</h3>
                        </Stack>
                        {
                            loader ?
                                <div style={{ ...CENTER, backgroundColor: '#fff', padding: 20 }}>
                                    <CircularProgress size={40} color={'error'} />
                                </div>
                                :
                                <TableContainer>
                                    <Table stickyHeader aria-label="sticky table">
                                        <TableHead>
                                            <TableRow>
                                                {columns.map((column: any) => (
                                                    <StyledTableCell sx={{ backgroundColor: '#eee' }} key={column.id}>
                                                        <div style={{ whiteSpace: 'nowrap' }}>
                                                            {column.label}
                                                        </div>
                                                    </StyledTableCell>
                                                ))}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                SalesData.map((item: any, index: number) => {
                                                    return (
                                                        <TableRow
                                                            role="checkbox"
                                                            tabIndex={-1}
                                                            key={index}
                                                        >
                                                            <StyledTableCell align="center">{moment(item.createdAt).format('YYYY/MM/DD')}</StyledTableCell>
                                                            <StyledTableCell align="center">{item.qty}</StyledTableCell>
                                                            <StyledTableCell align="center">{item.productUnitType === 'DOZEN' ? 'LUSIN' : item.productUnitType}</StyledTableCell>
                                                            <StyledTableCell align="center">{item.isPPN ? '11%' : '0%'}</StyledTableCell>
                                                            <StyledTableCell align="center">{(item.totalPrice).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</StyledTableCell>
                                                        </TableRow>
                                                    )
                                                })
                                            }
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                        }
                        <div style={{ backgroundColor: '#eee', padding: 20, width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                            <Stack direction={"column"} width={'50%'} spacing={0}>
                                <Stack direction={"row"} justifyContent={'space-between'} alignItems={'center'}>
                                    <span style={{ color: '#000' }}><b>PPN: </b></span>
                                    <span style={{ color: '#000' }}>
                                        {(SalesRedux.taxPrice).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                                    </span>
                                </Stack>
                                <Stack direction={"row"} justifyContent={'space-between'} alignItems={'center'}>
                                    <span style={{ color: '#000' }}><b>Total: </b></span>
                                    <span style={{ color: '#000' }}>
                                        {(SalesRedux.totalBill).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                                    </span>
                                </Stack>
                                <Stack direction={"row"} justifyContent={'space-between'} alignItems={'center'}>
                                    <span style={{ color: '#000' }}><b>Pembayaran Diterima: </b></span>
                                    <span style={{ color: '#000' }}>
                                        {(SalesRedux.totalBill - SalesRedux.bill).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                                    </span>
                                </Stack>
                                <Stack direction={"row"} justifyContent={'space-between'} alignItems={'center'}>
                                    <span style={{ color: '#000' }}><b>Sisa Tagihan: </b></span>
                                    <span style={{ color: '#000' }}>
                                        {(SalesRedux.bill).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                                    </span>
                                </Stack>
                            </Stack>
                        </div>
                        {
                            SalesRedux.notes.length === 0 || SalesRedux.notes === null ?
                                null
                                :
                                <>
                                    <div style={{ backgroundColor: '#eee', padding: 20, width: '15%' }}>
                                        <span style={{ color: '#000', fontWeight: '700' }}>Note:</span>
                                    </div>
                                    <div style={{ backgroundColor: '#eee', padding: 20, width: '100%' }}>
                                        <span style={{ color: '#000' }}>
                                            {SalesRedux.notes}
                                        </span>
                                    </div>
                                </>
                        }
                        <Stack direction={'column'} spacing={10}>
                            <span style={{ color: '#000' }}>Hormat Kami,</span>
                            <span style={{ color: '#000' }}>{JSON.parse(userStore).storeName}</span>
                        </Stack>
                    </Stack>
                </div>
            </Box >
        </div >
    )
}

export default PenjualanPrint;