import React from 'react';
import { toast } from 'react-toastify';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    Icon,
    SelectChangeEvent,
    Select,
    MenuItem,
    CircularProgress
} from '@mui/material';
import { Colors } from '../../../../utils/colors';
import { CENTER } from '../../../../utils/stylesheet';
import { isMobile } from 'react-device-detect';
import { HTTPPatchReturns } from '../../../../apis/User/mutationReturn/returns';
import secureLocalStorage from 'react-secure-storage';

const ReturnDialog = ({ isOpen, setOpen, item, getData }: { isOpen: boolean, setOpen: any, item: any, getData: any }) => {
    const [status, setStatus] = React.useState('RECEIVED');
    const [loader, setLoader] = React.useState(false)
    const token = secureLocalStorage.getItem('TOKEN')

    const handleChangeStatus = (event: SelectChangeEvent) => {
        setStatus(event.target.value as string);
    };

    const handleClose = () => setOpen(false)

    const handleSubmit = async () => {
        setLoader(true)
        try {
            const resp = await HTTPPatchReturns({
                productReturnId: item.id,
                status: status,
                token: token as string
            })
            setLoader(false)
            setOpen(false);
            await getData()
        } catch (error: any) {
            setLoader(false)
            console.log(error)
if (error.status === 500) {
                toast.error('Server sedang mengalami gangguan!')
            } else {
                toast.error('Terjadi Kesalahan!')
            }
        }
    };

    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
            scroll={'body'}
            PaperProps={{ style: { maxWidth: '100vw' } }}
        >
            <DialogTitle>
                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} marginBottom={3}>
                    <b>Perubahan Status Return</b>
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
                            sx={{ bgcolor: "white", width: isMobile ? '30vw' : '25vw', color: '#000' }}
                            onChange={handleChangeStatus}
                            renderValue={(selected: any) => {
                                if (selected.length === 0) {
                                    return <span style={{ color: '#a7a5a6' }}>Setuju / Tidak Setuju</span>;
                                }
                                return selected === 'RECEIVED' ? 'Terima Barang' : 'Tolak Barang'
                            }}
                        >
                            <MenuItem value={'RECEIVED'}>Terima Barang</MenuItem>
                            <MenuItem value={'REJECTED'}>Tolak Barang</MenuItem>
                        </Select>
                    </Stack>
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} gap={2} marginTop={3}>
                        <div onClick={handleClose} style={{ ...CENTER, borderRadius: 10, border: `1px solid ${Colors.primary}`, padding: '10px 30px', cursor: 'pointer' }}>
                            <span style={{ fontSize: 13, color: Colors.primary }}>BATAL</span>
                        </div>
                        <div onClick={handleSubmit} style={{ ...CENTER, borderRadius: 10, backgroundColor: Colors.primary, padding: '10px 30px', cursor: 'pointer', color: '#fff' }}>
                            {
                                loader ?
                                    <CircularProgress size={20} sx={{ color: 'inherit' }}></CircularProgress>
                                    :
                                    <span style={{ fontSize: 13, color: '#fff' }}>SIMPAN</span>
                            }
                        </div>
                    </Stack>
                </Stack>
            </DialogContent>
            <DialogActions>
            </DialogActions>
        </Dialog>
    );
}

export default ReturnDialog;