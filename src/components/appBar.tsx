import * as React from 'react';
import { Box, Toolbar, AppBar, CssBaseline, Drawer, Stack, Avatar, Badge, Icon } from '@mui/material/';
import { Notifications, ChevronLeftRounded } from '@mui/icons-material/';
import { useNavigate } from 'react-router-dom';
import './style.css'
import { Colors } from '../utils/colors';
import { StyleSheet } from '../utils/stylesheet';
import { ListAdmin } from './data';

const drawerWidth = 240;
const logo = require('../assets/images/ksa-logo-purple.png')

const NavigationBar = ({ title, indexNav, isChild }: { title: string, indexNav: number, isChild: boolean }) => {
    const navigate = useNavigate()

    const Routing = (param: number) => {
        navigate(param)
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
                                <Notifications sx={{ color: Colors.secondary, fontSize: 30 }} />
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
        fontSize: 20,
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
