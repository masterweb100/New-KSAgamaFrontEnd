import * as React from 'react';
import { Box, Toolbar, AppBar, CssBaseline, Drawer, Stack, Avatar, Badge, Icon, Menu, MenuItem, IconButton, ListItemText, ListItemIcon } from '@mui/material/';
import { Notifications, ChevronLeftRounded } from '@mui/icons-material/';
import { useNavigate } from 'react-router-dom';
import './style.css'
import { Colors } from '../utils/colors';
import { StyleSheet } from '../utils/stylesheet';
import { ListAdmin } from './data';
import { isMobile } from 'react-device-detect';

const drawerWidth = 240;
const logo = require('../assets/images/ksa-logo-purple.png')

const NavigationBar = ({ title, indexNav, isChild }: { title: string, indexNav: number, isChild: boolean }) => {
    const navigate = useNavigate()
    const [isDrawer, setDrawer] = React.useState(false)
    const [profile, setProfile] = React.useState<any>(null)

    const Routing = (param: number) => {
        navigate(param)
    }

    const toggleDrawer = () => setDrawer(!isDrawer)
    const profileClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setProfile(event.currentTarget);
    };

    const profileClose = () => {
        setProfile(null);
    };

    const SettingsPage = () => {
        profileClose()
        navigate('/admin-profile')
    }

    const Logout = () => {
        profileClose()
        navigate('/')
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: isMobile ? '100%' : `calc(100% - ${drawerWidth}px)`,
                    ml: isMobile ? 0 : `${drawerWidth}px`,
                    backgroundColor: '#fff'
                }}
            >
                <Toolbar>
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} width={'100%'}>
                        <Stack direction={'row'} alignItems={'center'} gap={2}>
                            {
                                isMobile ?
                                    <Icon sx={{ color: Colors.secondary, fontSize: 25, cursor: 'pointer' }} onClick={toggleDrawer}>menu</Icon>
                                    :
                                    null
                            }
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
                        </Stack>
                        <Stack direction={'row'} alignItems={'center'} gap={3}>
                            <Badge badgeContent={100} color="secondary">
                                <Notifications sx={{ color: Colors.secondary, fontSize: isMobile ? 25 : 30 }} />
                            </Badge>
                            <>
                                <IconButton onClick={profileClick}>
                                    <Avatar
                                        alt={'avatar'}
                                        src={'https://png.pngtree.com/png-vector/20190704/ourlarge/pngtree-businessman-user-avatar-free-vector-png-image_1538405.jpg'}
                                        sx={{ width: isMobile ? 30 : 50, height: isMobile ? 30 : 50 }}
                                    ></Avatar>
                                </IconButton>
                                <Menu
                                    anchorEl={profile}
                                    open={Boolean(profile)}
                                    onClose={profileClose}
                                >
                                    <MenuItem sx={{ '&:hover': { color: Colors.primary, transition: 'all .3s' }, transition: 'all .3s' }} onClick={SettingsPage}>
                                        <ListItemIcon sx={{ color: 'inherit' }}>
                                            <Icon>settings</Icon>
                                        </ListItemIcon>
                                        <ListItemText sx={{ color: 'inherit' }}>Settings</ListItemText>
                                    </MenuItem>
                                    <MenuItem sx={{ '&:hover': { color: Colors.primary, transition: 'all .3s' }, transition: 'all .3s' }} onClick={Logout}>
                                        <ListItemIcon sx={{ color: 'inherit' }}>
                                            <Icon>logout</Icon>
                                        </ListItemIcon>
                                        <ListItemText sx={{ color: 'inherit' }}>Logout</ListItemText>
                                    </MenuItem>
                                </Menu>
                            </>
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
                variant={isMobile ? "temporary" : "permanent"}
                anchor="left"
                open={isMobile ? isDrawer : true}
                onClose={toggleDrawer}
            >
                <Toolbar>
                    <img src={logo} style={styles.imgLogo} alt="" />
                </Toolbar>

                <Stack direction={'column'} gap={0.5} paddingRight={3} marginTop={5}>
                    {
                        ListAdmin.map((item: any, index: number) => (
                            <div
                                key={item.id}
                                className={`${indexNav === index ? 'active-nav' : 'side-btn'}`}
                                onClick={() => Routing(item.navigate)}
                            >
                                <Stack direction={'row'} gap={2} alignItems={'center'}>
                                    <Icon sx={{ color: 'inherit', ...styles.iconHover }}>{item.icon}</Icon>
                                    <p style={{ fontSize: 16, margin: 0, fontWeight: 600 }}>{item.name}</p>
                                </Stack>
                            </div>
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
        color: Colors.primary,
        fontSize: isMobile ? 16 : 20,
        margin: 0
    },

    iconHover: {
        fontSize: 25,
        transition: 'all 0.1s'
    },

    imgLogo: {
        height: 'auto',
        width: '90%',
        objectFit: 'contain',
    }
}

export default NavigationBar;
