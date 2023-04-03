import React from 'react';
import { Stack, TextField, Dialog, DialogContent, DialogTitle, Icon, InputAdornment } from '@mui/material';
import { CENTER } from '../../../../utils/stylesheet';
import { Colors } from '../../../../utils/colors';

const EkspedisiDialog = ({ isOpen, setOpen }: { isOpen: boolean, setOpen: any }) => {
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
                    <b>Form Tambah Data Ekspedisi</b>
                    <div onClick={handleClose} style={{ cursor: 'pointer' }}>
                        <Icon style={{ color: Colors.secondary, fontSize: 25 }}>close</Icon>
                    </div>
                </Stack>
            </DialogTitle>
            <DialogContent>
                <Stack direction={'column'} gap={3} marginTop={5}>
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-start'} gap={3}>
                        <Stack direction={'column'} gap={1}>
                            <span>*Tipe Kontak</span>
                            <TextField
                                type="text"
                                size="small"
                                disabled
                                defaultValue={'Ekspedisi'}
                                sx={{ bgcolor: "#f4f4f4", width: '25vw' }}
                            />
                        </Stack>
                        <Stack direction={'column'} gap={1}>
                            <span>*ID Ekspedisi</span>
                            <TextField
                                type="text"
                                size="small"
                                disabled
                                defaultValue={'432IJKJL'}
                                sx={{ bgcolor: "#f4f4f4", width: '25vw' }}
                            />
                        </Stack>
                    </Stack>
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-start'} gap={3}>
                        <Stack direction={'column'} gap={1}>
                            <span>Nama Ekspedisi</span>
                            <TextField
                                type="text"
                                size="small"
                                placeholder='Nama Ekspedisi'
                                sx={{ bgcolor: "#fff", width: '25vw' }}
                            />
                        </Stack>
                        <Stack direction={'column'} gap={1}>
                            <span>Nomor Telepon</span>
                            <TextField
                                type="text"
                                size="small"
                                placeholder='No Telp'
                                sx={{ bgcolor: "#fff", width: '25vw' }}
                            />
                        </Stack>
                    </Stack>
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-start'} gap={3}>
                        <Stack direction={'column'} gap={1}>
                            <span>Alamat Ekspedisi</span>
                            <TextField
                                type="text"
                                size="small"
                                placeholder={'Alamat Ekspedisi'}
                                sx={{ bgcolor: "#fff", width: '25vw' }}
                            />
                        </Stack>
                        <Stack direction={'column'} gap={1}>
                            <span>Harga Ongkir</span>
                            <TextField
                                type="text"
                                size="small"
                                placeholder='19.000'
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position={'end'}>
                                            <span>/ Kg</span>
                                        </InputAdornment>
                                    )
                                }}
                                sx={{ bgcolor: "#fff", width: '25vw' }}
                            />
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
                </Stack>
            </DialogContent>
        </Dialog>
    )
}

export default EkspedisiDialog;