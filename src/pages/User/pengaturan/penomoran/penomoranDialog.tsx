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
    MenuItem,
    TextField,
    InputAdornment,
    Radio,
    FormControlLabel,
    RadioGroup,
} from '@mui/material';
import { styled } from "@mui/material/styles";
import { Colors } from '../../../../utils/colors';
import { CENTER } from '../../../../utils/stylesheet';

const CustomRadio = styled(Radio)(() => ({
    color: Colors.secondary,
    '&.Mui-checked': {
        color: Colors.primary,
    }
}))

const PenomoranDialog = ({ isOpen, setOpen, title, subtitle }: { isOpen: boolean, setOpen: any, title: string, subtitle: string }) => {
    const [status, setStatus] = React.useState('');
    const [formatNumber, setFormatNumber] = React.useState('')

    const handleChangeStatus = (event: SelectChangeEvent) => {
        setStatus(event.target.value as string);
    };

    const handleFormatNumber = (event: any) => {
        setFormatNumber(event.target.value)
        setStatus('')
    }

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
                    <b>Penomoran {title} - {subtitle}</b>
                    <div onClick={handleClose} style={{ cursor: 'pointer' }}>
                        <Icon style={{ color: Colors.secondary, fontSize: 25 }}>close</Icon>
                    </div>
                </Stack>
            </DialogTitle>
            <DialogContent>
                <Stack direction={'column'} gap={3}>
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-start'} gap={3}>
                        <Stack direction={'column'} gap={1}>
                            <span>*Format Penomoran</span>
                            <TextField
                                type="text"
                                size="small"
                                onChange={handleFormatNumber}
                                value={formatNumber}
                                inputProps={{ maxLength: 3 }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position={'end'}>
                                            <span>{'/[NUMBER]'}</span>
                                        </InputAdornment>
                                    )
                                }}
                                sx={{ bgcolor: "#fff", width: '25vw' }}
                            />
                        </Stack>
                        <Stack direction={'column'} gap={1}>
                            <span>Ubah Penomoran</span>
                            <Select
                                size="small"
                                value={status}
                                displayEmpty
                                sx={{ bgcolor: "white", width: '25vw', color: '#000' }}
                                onChange={handleChangeStatus}
                                renderValue={(selected: any) => {
                                    if (selected.length === 0) {
                                        return <span style={{ color: '#a7a5a6' }}>Penomoran</span>;
                                    }
                                    return selected
                                }}
                            >
                                {
                                    [...Array(10)].map((item, index) => (
                                        <MenuItem value={`${formatNumber}/00${index + 1}`}>{formatNumber}/00{index + 1}</MenuItem>
                                    ))
                                }
                            </Select>
                        </Stack>
                    </Stack>
                    <div>
                        <span>Contoh Output Otomatis</span>
                        <br />
                        <span><b>{formatNumber}/0001</b></span>
                    </div>
                    <Stack direction={'column'} gap={1}>
                        <span>*Nomor Saat Ini</span>
                        <TextField
                            type="text"
                            size="small"
                            defaultValue={'0023'}
                            sx={{ bgcolor: "#fff", width: '25vw' }}
                        />
                    </Stack>
                    <Stack direction={'column'} gap={1}>
                        <span>*Reset Nomor Setiap</span>
                        <RadioGroup defaultValue="Tidak Pernah">
                            <FormControlLabel value="Tidak Pernah" control={<CustomRadio />} label="Tidak Pernah" />
                            <FormControlLabel value="Setiap Bulan" control={<CustomRadio />} label="Setiap Bulan" />
                            <FormControlLabel value="Setiap Tahun" control={<CustomRadio />} label="Setiap Tahun" />
                        </RadioGroup>
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

export default PenomoranDialog;