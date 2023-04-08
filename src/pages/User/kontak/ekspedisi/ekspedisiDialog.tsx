import * as React from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    TextField,
    Icon,
    TableHead,
    Table,
    TableBody,
    TableContainer,
    TableCell,
    TableRow,
    Paper
} from '@mui/material';
import { Colors } from '../../../../utils/colors';
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from "@mui/material/styles";
import { detailData } from '../dummy';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { isMobile } from 'react-device-detect';

const columns = [
    { id: "tanggal", label: "Tanggal" },
    { id: "id", label: "ID Invoice" },
    { id: "referensi", label: "Referensi" },
    { id: "total", label: "Total" },
];

const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: Colors.inherit,
        color: '#000',
        fontWeight: 700
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 13,
    },
}));

const StyledTableRow = styled(TableRow)(() => ({
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const EkspedisiDialog = ({ isOpen, setOpen }: { isOpen: boolean, setOpen: any }) => {

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
            TransitionComponent={Transition}
            fullScreen={isMobile}
            PaperProps={{ style: { maxWidth: '100vw' } }}
        >
            <DialogTitle>
                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                    <b>Detail Data Ekspedisi</b>
                    <div onClick={handleClose} style={{ cursor: 'pointer' }}>
                        <Icon style={{ color: Colors.secondary, fontSize: 25 }}>close</Icon>
                    </div>
                </Stack>
            </DialogTitle>
            <DialogContent>
                <Stack direction={'column'} gap={3}>
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-end'} gap={2} marginTop={5}>
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
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-start'} gap={3}>
                        <Stack direction={'column'} gap={1}>
                            <span>Nama Ekspedisi</span>
                            <TextField
                                type="text"
                                size="small"
                                disabled
                                defaultValue={'Joko Hartono'}
                                sx={{ bgcolor: "#f4f4f4", width: '25vw' }}
                            />
                        </Stack>
                        <Stack direction={'column'} gap={1}>
                            <span>Tipe Kontak</span>
                            <TextField
                                type="text"
                                size="small"
                                disabled
                                defaultValue={'Ekspedisi'}
                                sx={{ bgcolor: "#f4f4f4", width: '25vw' }}
                            />
                        </Stack>
                    </Stack>
                    <Stack direction={'column'} gap={1}>
                        <h2 style={{ margin: 0 }}>Piutang</h2>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        {
                                            columns.map((item) => (
                                                <StyledTableCell key={item.id} align="center">{item.label}</StyledTableCell>
                                            ))
                                        }
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {detailData.map((item, index) => (
                                        <StyledTableRow key={index}>
                                            <StyledTableCell align="center">{item.tanggal}</StyledTableCell>
                                            <StyledTableCell align="center">{item.id + (index + 1)}</StyledTableCell>
                                            <StyledTableCell align="center">{item.referensi}</StyledTableCell>
                                            <StyledTableCell align="center">{item.total}</StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Stack>
                    <Stack direction={'column'} gap={1}>
                        <h2 style={{ margin: 0 }}>Hutang</h2>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        {
                                            columns.map((item) => (
                                                <StyledTableCell key={item.id} align="center">{item.label}</StyledTableCell>
                                            ))
                                        }
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {detailData.map((item, index) => (
                                        <StyledTableRow key={index}>
                                            <StyledTableCell align="center">{item.tanggal}</StyledTableCell>
                                            <StyledTableCell align="center">{item.id + (index + 1)}</StyledTableCell>
                                            <StyledTableCell align="center">{item.referensi}</StyledTableCell>
                                            <StyledTableCell align="center">{item.total}</StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Stack>
                    <Stack direction={'column'} gap={1}>
                        <h2 style={{ margin: 0 }}>Transaksi</h2>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        {
                                            columns.map((item) => (
                                                <StyledTableCell key={item.id} align="center">{item.label}</StyledTableCell>
                                            ))
                                        }
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {detailData.map((item, index) => (
                                        <StyledTableRow key={index}>
                                            <StyledTableCell align="center">{item.tanggal}</StyledTableCell>
                                            <StyledTableCell align="center">{item.id + (index + 1)}</StyledTableCell>
                                            <StyledTableCell align="center">{item.referensi}</StyledTableCell>
                                            <StyledTableCell align="center">{item.total}</StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Stack>
                </Stack>
            </DialogContent>
            <DialogActions>
            </DialogActions>
        </Dialog>
    );
}

export default EkspedisiDialog;