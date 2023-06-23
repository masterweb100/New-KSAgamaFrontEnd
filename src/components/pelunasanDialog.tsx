import React from 'react';
import { toast } from 'react-toastify';
import { Stack, TextField, Select, MenuItem, SelectChangeEvent, Dialog, DialogContent, DialogTitle, Icon, CircularProgress } from '@mui/material';
import { CENTER, StyleSheet } from '../utils/stylesheet';
import { Colors } from '../utils/colors';
import { isMobile } from 'react-device-detect';
import { HTTPPaySales } from '../apis/User/sales/sales';
import secureLocalStorage from 'react-secure-storage';
import { useFormik } from 'formik';
import { HTTPPayPurchase } from '../apis/User/purchase/purchase';

const PelunasanDialog = ({ isOpen, setOpen, item, type, refresh }: { isOpen: boolean, setOpen: any, item: any, type: string, refresh: any }) => {
    const token = secureLocalStorage.getItem('USER_SESSION') as string
    const [loader, setLoader] = React.useState(false)

    const handleClose = () => {
        setOpen(false);
    };

    const Formik = useFormik({
        initialValues: {
            method: '',
            totalPayment: ''
        },

        onSubmit: async (values) => {
            setLoader(true)
            try {
                const data = {
                    token: token,
                    method: (values.method).toUpperCase(),
                    totalPayment: parseInt(values.totalPayment) > item.bill ? item.bill : parseInt(values.totalPayment)
                }
                if (type === 'sales') {
                    await HTTPPaySales({...data, saleId: item.id})
                }
                else if (type === 'purchase') {
                    await HTTPPayPurchase({...data, purchasingId: item.id})
                } else {
                    console.log('hehe')
                }
                await refresh()
                setLoader(false)
                setOpen(false)
            } catch (error: any) {
                setLoader(false)
                setOpen(false)
                console.log(error)
if (error.status === 500) {
                toast.error('Server sedang mengalami gangguan!')
            } else {
                toast.error('Terjadi Kesalahan!')
            }
            }
        }
    })

    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
            scroll={'body'}
            PaperProps={{ style: { maxWidth: '100vw' } }}
        >
            <DialogTitle>
                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                    <Stack direction={'row'} alignItems={'center'} gap={2}>
                        <Icon style={{ color: Colors.secondary, fontSize: 25 }}>payments_outlined</Icon>
                        <span style={{ fontSize: isMobile ? 17 : 20 }}>Pelunasan Pembayaran</span>
                    </Stack>
                    <div onClick={handleClose} style={{ cursor: 'pointer' }}>
                        <Icon style={{ color: Colors.secondary, fontSize: 25 }}>close</Icon>
                    </div>
                </Stack>
            </DialogTitle>
            <DialogContent>
                <form onSubmit={Formik.handleSubmit}>
                    <h3 style={{ margin: 0 }}>{item.invoice}</h3>
                    <Stack direction={'column'} style={{ border: '1px solid #000', marginTop: 10 }} gap={0}>
                        <Stack direction={'row'} style={{ ...styles.cell }}>
                            <span>Sisa Pembayaran</span>
                            <span>{item.bill}</span>
                        </Stack>
                        <Stack direction={'row'} style={{ ...styles.cell }}>
                            <span>Total</span>
                            <span>{item.totalBill}</span>
                        </Stack>
                        <Stack direction={'row'} style={{ ...styles.cell }}>
                            <span>Pembayaran</span>
                            <TextField
                                type="number"
                                size="small"
                                placeholder='0'
                                name="totalPayment"
                                value={parseInt(Formik.values.totalPayment) > item.bill ? item.bill.toString() : Formik.values.totalPayment}
                                onChange={Formik.handleChange}
                                sx={{ bgcolor: "#fff", width: isMobile ? '25vw' : '15vw' }}
                            />
                        </Stack>
                        <Stack direction={'row'} gap={5} style={{ ...styles.cell, border: 'none' }}>
                            <span>Metode Pembayaran</span>
                            <Select
                                size="small"
                                displayEmpty
                                sx={{ bgcolor: "white", width: isMobile ? '25vw' : '15vw', color: '#000' }}
                                name="method"
                                value={Formik.values.method}
                                onChange={Formik.handleChange}
                                renderValue={(selected: any) => {
                                    if (selected.length === 0) {
                                        return <span style={{ color: '#a7a5a6' }}>Pilih Metode</span>;
                                    }
                                    return selected
                                }}
                            >
                                {
                                    ['Tunai', 'Transfer', 'QRIS', 'Debit', 'Kredit'].map((item, index) => (
                                        <MenuItem key={index} value={item}>{item}</MenuItem>
                                    ))
                                }
                            </Select>
                        </Stack>
                    </Stack>
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} gap={2} marginTop={5}>
                        <div onClick={handleClose} style={{ ...CENTER, borderRadius: 10, border: `1px solid ${Colors.primary}`, padding: '10px 30px', cursor: 'pointer' }}>
                            <span style={{ fontSize: 13, color: Colors.primary }}>BATAL</span>
                        </div>
                        <button type='submit' style={{ ...CENTER, borderRadius: 10, backgroundColor: Colors.primary, padding: '10px 30px', cursor: 'pointer', color: ' #fff' }}>
                            {
                                loader ?
                                    <CircularProgress size={20} color={'inherit'}></CircularProgress>
                                    :
                                    <span style={{ fontSize: 13, color: '#fff' }}>BAYAR</span>
                            }
                        </button>
                    </Stack>
                </form>
            </DialogContent>
        </Dialog>
    )
}

const styles: StyleSheet = {
    cell: {
        padding: '10px 20px',
        width: '100%',
        borderBottom: '1px solid #000',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
}

export default PelunasanDialog;