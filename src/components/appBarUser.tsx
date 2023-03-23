import * as React from 'react';
import { Box, Toolbar, AppBar, CssBaseline, Drawer, Stack, Avatar, Badge, Typography } from '@mui/material/';
import { Dashboard, AdminPanelSettings, AccountBalance, Store, Notifications, PermContactCalendar, LockPerson, ChevronLeftRounded, ArrowForwardIosSharp } from '@mui/icons-material/';
import { useNavigate } from 'react-router-dom';
import './style.css'
import { Colors } from '../utils/colors';
import { StyleSheet } from '../utils/stylesheet';
import { ListAdmin, ListUser } from './data';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps, } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { styled } from '@mui/material/styles';
import Icon from '@mui/material/Icon';

const drawerWidth = 240;
const logo = require('../assets/images/ksa-logo-purple.png')

const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    fontWeight: 700,
    marginRight: 10,
    color: Colors.secondary,
    '&:before': {
        display: 'none',
    },
    '& .Mui-expanded': {
        backgroundColor: Colors.inherit,
        color: Colors.primary,
        borderTopRightRadius: 100,
        borderBottomRightRadius: 100
    }
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharp sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        padding: '3px 5px'
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    paddingLeft: 20,
    margin: 0
}));

const NavigationBarUser = ({ title, indexNav, isChild }: { title: string, indexNav: number, isChild: boolean }) => {
    const navigate = useNavigate()

    const [indexSelect, setIndexSelect] = React.useState<any>(null)

    const Routing = (param: number) => {
        navigate(param)
    }

    const [expanded, setExpanded] = React.useState<string | false>('panel0');
    const [panel, setPanel] = React.useState(0)

    const handleClick = (panel: number, isExpand: boolean) => {
        setPanel(panel)
        setExpanded(isExpand ? `panel${panel}` : false)
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, backgroundColor: '#fff' }}
            >
                <Toolbar>
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} width={'100%'}>
                        {
                            isChild ?
                                <Stack
                                    onClick={() => navigate(-1)}
                                    sx={{
                                        "&:hover": {
                                            backgroundColor: Colors.inherit,
                                            borderRadius: 2,
                                            transition: 'all 0.3s',
                                            cursor: 'pointer',
                                        },
                                        borderRadius: 2,
                                        padding: '10px',
                                        transition: 'all 0.3s',
                                    }}
                                    alignItems={'center'}
                                    gap={1}
                                    direction={'row'}
                                >
                                    <ChevronLeftRounded style={{ color: Colors.secondary, fontSize: 30 }}></ChevronLeftRounded>
                                    <p style={styles.title}>{title}</p>
                                </Stack>
                                :
                                <p style={styles.title}>{title}</p>
                        }
                        <Stack direction={'row'} alignItems={'center'} gap={5}>
                            <Badge badgeContent={100} color="secondary">
                                <Notifications sx={{ color: '#909090', fontSize: 30 }} />
                            </Badge>
                            <Avatar alt={'avatar'} src={'https://png.pngtree.com/png-vector/20190704/ourlarge/pngtree-businessman-user-avatar-free-vector-png-image_1538405.jpg'} sx={{ width: 50, height: 50 }}></Avatar>
                        </Stack>
                    </Stack>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Toolbar>
                    <img src={logo} style={styles.imgLogo} alt="" />
                </Toolbar>
                <Stack direction={'column'} gap={1}>
                    {
                        ListUser.map((item, index) => (
                            <>
                                {
                                    item.expandable === false ?
                                        <Stack
                                            key={index}
                                            onClick={() => handleClick(index, item.expandable)}
                                            direction={'row'}
                                            alignItems={'center'}
                                            gap={1}
                                            style={{
                                                ...styles.tab,
                                                padding: '15px 20px',
                                                backgroundColor: index === panel ? Colors.inherit : '#fff',
                                                color: index === panel ? Colors.primary : Colors.secondary,
                                                marginTop: index === 0 ? 50 : 0
                                            }}>
                                            <Icon sx={{ color: index === panel ? Colors.primary : Colors.secondary, ...styles.iconHover }}>{item.icon}</Icon>
                                            <p style={{ fontSize: 16, margin: 0, fontWeight: 600 }}>{item.name}</p>
                                        </Stack>
                                        :
                                        <Accordion key={index} expanded={expanded === `panel${index}`} onClick={() => handleClick(index, item.expandable)}>
                                            <AccordionSummary>
                                                <Stack direction={'row'} alignItems={'center'} gap={1}>
                                                    <Icon sx={{ color: index === panel ? Colors.primary : Colors.secondary, ...styles.iconHover }}>{item.icon}</Icon>
                                                    <p style={{ fontSize: 16, margin: 0, fontWeight: 600 }}>{item.name}</p>
                                                </Stack>
                                            </AccordionSummary>
                                            <AccordionDetails sx={{ paddingLeft: 0 }}>
                                                <Stack direction={'column'} gap={0.5}>
                                                    {
                                                        item.children.map((item, index) => (
                                                            <Stack key={index} direction={'row'} alignItems={'center'} gap={1} style={{ ...styles.tab, padding: '15px', paddingLeft: '50px' }}>
                                                                <Icon sx={{ color: Colors.secondary, ...styles.iconHover }}>{item.icon}</Icon>
                                                                <p style={{ fontSize: 14, margin: 0, fontWeight: 600, color: Colors.secondary }}>{item.name}</p>
                                                            </Stack>
                                                        ))
                                                    }
                                                </Stack>
                                            </AccordionDetails>
                                        </Accordion>
                                }
                            </>
                        ))
                    }
                </Stack>
            </Drawer>
        </Box>
    );
}

const styles: StyleSheet = {
    title: {
        fontWeight: '700',
        color: '#673de5',
        fontSize: 20,
        margin: 0
    },

    iconHover: {
        fontSize: 20,
        transition: 'all 0.3s'
    },

    imgLogo: {
        height: 70,
        width: 'auto',
        objectFit: 'contain'
    },

    tab: {
        borderTopRightRadius: 100,
        borderBottomRightRadius: 100,
        marginRight: 10,
        cursor: 'pointer',
        transition: 'all 0.3s'
    }
}

export default NavigationBarUser;
