import * as React from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    Icon,
    SelectChangeEvent,
    Select,
    MenuItem
} from '@mui/material';
import { Colors } from '../../../../utils/colors';
import { CENTER } from '../../../../utils/stylesheet';

const MutasiDialog = ({ isOpen, setOpen }: { isOpen: boolean, setOpen: any }) => {
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
                    <b>Perubahan Status Mutasi</b>
                    <div onClick={handleClose} style={{ cursor: 'pointer' }}>
                        <Icon style={{ color: Colors.secondary, fontSize: 25 }}>close</Icon>
                    </div>
                </Stack>
            </DialogTitle>
            <DialogContent>
                <Stack direction={'column'} gap={3}>
                    <Stack direction={'column'} gap={1}>
                        <span>Status Mutasi</span>
                        <Select
                            size="small"
                            value={status}
                            displayEmpty
                            sx={{ bgcolor: "white", width: '25vw', color: '#000' }}
                            onChange={handleChangeStatus}
                            renderValue={(selected: any) => {
                                if (selected.length === 0) {
                                    return <span style={{ color: '#a7a5a6' }}>Status</span>;
                                }
                                return selected
                            }}
                        >
                            <MenuItem value={'Sukses'}>Sukses</MenuItem>
                            <MenuItem value={'Pending'}>Pending</MenuItem>
                        </Select>
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

export default MutasiDialog;