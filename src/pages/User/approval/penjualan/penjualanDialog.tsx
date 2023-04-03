import * as React from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    TextField,
    Icon,
    SelectChangeEvent,
    Select,
    MenuItem
} from '@mui/material';
import { Colors } from '../../../../utils/colors';
import { CENTER } from '../../../../utils/stylesheet';

const PenjualanDialog = ({ isOpen, setOpen }: { isOpen: boolean, setOpen: any }) => {
    const [status, setStatus] = React.useState('');

    const handleChangeStatus = (event: SelectChangeEvent) => {
        setStatus(event.target.value as string);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const descriptionElementRef = React.useRef<HTMLElement>(null);
    React.useEffect(() => {
        if (isOpen) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [isOpen]);

    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
            scroll={'body'}
            PaperProps={{ style: { maxWidth: '100vw' } }}
        >
            <DialogTitle>
                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} marginBottom={3}>
                    <b>Form Approval Data Return Penjualan</b>
                    <div onClick={handleClose} style={{ cursor: 'pointer' }}>
                        <Icon style={{ color: Colors.secondary, fontSize: 25 }}>close</Icon>
                    </div>
                </Stack>
            </DialogTitle>
            <DialogContent>
                <Stack direction={'column'} gap={3}>
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-start'} gap={3}>
                        <Stack direction={'column'} gap={1}>
                            <span>ID Invoice</span>
                            <TextField
                                type="text"
                                size="small"
                                disabled
                                defaultValue={'INV/0033'}
                                sx={{ bgcolor: "#f4f4f4", width: '25vw' }}
                            />
                        </Stack>
                        <Stack direction={'column'} gap={1}>
                            <span>Nama Pelanggan</span>
                            <TextField
                                type="text"
                                size="small"
                                disabled
                                defaultValue={'Jodi'}
                                sx={{ bgcolor: "#f4f4f4", width: '25vw' }}
                            />
                        </Stack>
                    </Stack>
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-start'} gap={3}>
                        <Stack direction={'column'} gap={1}>
                            <span>Jenis Barang</span>
                            <TextField
                                type="text"
                                size="small"
                                disabled
                                defaultValue={'Philips'}
                                sx={{ bgcolor: "#f4f4f4", width: '25vw' }}
                            />
                        </Stack>
                        <Stack direction={'column'} gap={1}>
                            <span>Jumlah Barang</span>
                            <TextField
                                type="text"
                                size="small"
                                disabled
                                defaultValue={'403'}
                                sx={{ bgcolor: "#f4f4f4", width: '25vw' }}
                            />
                        </Stack>
                    </Stack>
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-start'} gap={3}>
                        <Stack direction={'column'} gap={1}>
                            <span>Jenis Penjualan</span>
                            <TextField
                                type="text"
                                size="small"
                                disabled
                                defaultValue={'Jenis Penjualan'}
                                sx={{ bgcolor: "#f4f4f4", width: '25vw' }}
                            />
                        </Stack>
                        <Stack direction={'column'} gap={1}>
                            <span>Jumlah Barang Return</span>
                            <TextField
                                type="text"
                                size="small"
                                disabled
                                defaultValue={'15'}
                                sx={{ bgcolor: "#f4f4f4", width: '25vw' }}
                            />
                        </Stack>
                    </Stack>
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-start'} gap={3}>
                        <Stack direction={'column'} gap={1}>
                            <span>Status</span>
                            <TextField
                                type="text"
                                size="small"
                                disabled
                                defaultValue={'Refund'}
                                sx={{ bgcolor: "#f4f4f4", width: '25vw' }}
                            />
                        </Stack>
                        <Stack direction={'column'} gap={1}>
                            <span>Status Approval</span>
                            <Select
                                size="small"
                                value={status}
                                displayEmpty
                                sx={{ bgcolor: "white", width: '25vw', color: '#000' }}
                                onChange={handleChangeStatus}
                                renderValue={(selected: any) => {
                                    if (selected.length === 0) {
                                        return <span style={{ color: '#a7a5a6' }}>Setuju / Tidak Setuju</span>;
                                    }
                                    return selected
                                }}
                            >
                                <MenuItem value={'Setuju'}>Setuju</MenuItem>
                                <MenuItem value={'Tidak Setuju'}>Tidak Setuju</MenuItem>
                            </Select>
                        </Stack>
                    </Stack>
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} gap={2} marginTop={3}>
                        <div onClick={handleClose} style={{ ...CENTER, borderRadius: 10, border: `1px solid ${Colors.primary}`, padding: '10px 30px', cursor: 'pointer' }}>
                            <span style={{ fontSize: 13, color: Colors.primary }}>BATAL</span>
                        </div>
                        <div style={{ ...CENTER, borderRadius: 10, backgroundColor: Colors.primary, padding: '10px 30px', cursor: 'pointer' }}>
                            <span style={{ fontSize: 13, color: '#fff' }}>SIMPAN</span>
                        </div>
                    </Stack>
                </Stack>
            </DialogContent>
            <DialogActions>
            </DialogActions>
        </Dialog>
    );
}

export default PenjualanDialog;