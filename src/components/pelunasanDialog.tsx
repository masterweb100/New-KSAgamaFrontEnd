import React from 'react';
import { Stack, TextField, Select, MenuItem, SelectChangeEvent, Dialog, DialogContent, DialogTitle, Icon } from '@mui/material';
import { CENTER, StyleSheet } from '../utils/stylesheet';
import { Colors } from '../utils/colors';
import { isMobile } from 'react-device-detect';

const PelunasanDialog = ({ isOpen, setOpen }: { isOpen: boolean, setOpen: any }) => {
    const [metode, setMetode] = React.useState('');

    const handleChangeMetode = (event: SelectChangeEvent) => {
        setMetode(event.target.value as string);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
                        <span style={{fontSize: isMobile ? 17 : 20 }}>Pelunasan Pembayaran</span>
                    </Stack>
                    <div onClick={handleClose} style={{ cursor: 'pointer' }}>
                        <Icon style={{ color: Colors.secondary, fontSize: 25 }}>close</Icon>
                    </div>
                </Stack>
            </DialogTitle>
            <DialogContent>
                <h3 style={{ margin: 0 }}>INV/0040</h3>
                <Stack direction={'column'} style={{ border: '1px solid #000', marginTop: 10 }} gap={0}>
                    <Stack direction={'row'} style={{ ...styles.cell }}>
                        <span>Sisa Pembayaran</span>
                        <span>50.000</span>
                    </Stack>
                    <Stack direction={'row'} style={{ ...styles.cell }}>
                        <span>Total</span>
                        <span>150.000</span>
                    </Stack>
                    <Stack direction={'row'} style={{ ...styles.cell }}>
                        <span>Pembayaran</span>
                        <TextField
                            type="text"
                            size="small"
                            placeholder='Masukkan Jumlah Pembayaran'
                            sx={{ bgcolor: "#fff", width: isMobile ? '25vw' : '15vw' }}
                        />
                    </Stack>
                    <Stack direction={'row'} gap={5} style={{ ...styles.cell, border: 'none' }}>
                        <span>Metode Pembayaran</span>
                        <Select
                            size="small"
                            value={metode}
                            displayEmpty
                            sx={{ bgcolor: "white", width: isMobile ? '25vw' : '15vw', color: '#000' }}
                            onChange={handleChangeMetode}
                            renderValue={(selected: any) => {
                                if (selected.length === 0) {
                                    return <span style={{ color: '#a7a5a6' }}>Pilih Metode</span>;
                                }
                                return selected
                            }}
                        >
                            {
                                ['Tunai', 'Transfer', 'QRIS', 'Debit', 'Credit'].map((item, index) => (
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
                    <div style={{ ...CENTER, borderRadius: 10, backgroundColor: Colors.primary, padding: '10px 30px', cursor: 'pointer' }}>
                        <span style={{ fontSize: 13, color: '#fff' }}>SIMPAN</span>
                    </div>
                </Stack>
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