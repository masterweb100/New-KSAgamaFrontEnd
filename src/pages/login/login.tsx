import React from 'react'
import { Select, FormControl, MenuItem, InputLabel, CircularProgress, IconButton, InputAdornment, OutlinedInput, Stack } from '@mui/material'
import './style.css'
import { styled } from '@mui/material/styles';
import { Visibility, VisibilityOff, ChevronLeft } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const topBg = require('../../assets/images/top-login.png')
const redCircle = require('../../assets/images/circle-red.png')
const redBird = require('../../assets/images/bird-red.png')
const logo = require('../../assets/images/ksa-logo.png')

const CustomTextField = styled(OutlinedInput)({
    '& label.Mui-focused': {
        color: 'rgba(225, 32, 159, 1)',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#ababab',
            borderRadius: 10,
        },
        '&:hover fieldset': {
            borderColor: '#000',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#c42401',
        },
    },
});

const Login = () => {
    const navigate = useNavigate()
    const [isPassword, setPassword] = React.useState(true)
    const handlePassword = () => setPassword(!isPassword)
    const [progress, setProgress] = React.useState(false)
    const [activePage, setActivePage] = React.useState(0)
    const [page, setPage] = React.useState(0)
    const [toko, setToko] = React.useState('')
    const [user, setUser] = React.useState('')

    const onToko = (event: any) => {
        setToko(event.target.value);
    };

    const onUser = (user: string) => {
        setUser(user)
        onPage(1)
    }

    const onPage = (page: number) => {
        if (page === 0 || page === 1) {
            setPage(page)
            setTimeout(() => {
                setActivePage(page)
            }, 200)
        } else {
            setProgress(true)
            setTimeout(() => {
                setPage(page)
                setProgress(false)
                setTimeout(() => {
                    setActivePage(page)
                }, 200)
            }, 1000)
        }
    }

    const PushUser = () => {
        setProgress(true)
        setTimeout(() => {
            if (user === 'User') {
                navigate('/dashboard-user')
            } else {
                navigate('/dashboard')
            }
            setProgress(false)
        }, 1000)
    }

    return (
        <div>
            <img src={topBg} style={{ width: '100%', position: 'absolute', top: -30, right: 0, left: 0, zIndex: 0 }} alt="" />
            <p style={{ position: 'absolute', top: '5%', left: '7%', fontSize: 35, fontWeight: 400, color: '#fff', whiteSpace: 'pre-line' }}>Welcome!{'\n'}KSA Project Accounting {'&'} Distribution</p>
            <img src={redCircle} className={'circle-anim'} style={{ width: 40, height: 40, position: 'absolute', left: '2%', top: '35%' }} alt="" />
            <img src={redCircle} className={'circle-anim'} style={{ width: 90, height: 90, position: 'absolute', left: '4%', top: '38%' }} alt="" />
            <img src={redCircle} className={'circle-anim'} style={{ width: 80, height: 80, position: 'absolute', left: '40%', top: '-6%' }} alt="" />
            <img src={redCircle} className={'circle-anim'} style={{ width: 190, height: 190, position: 'absolute', left: '40%', top: '40%' }} alt="" />
            <img src={redBird} className={'circle-anim'} style={{ width: 'auto', height: '70%', position: 'absolute', left: '0%', bottom: '0%', objectFit: 'contain' }} alt="" />
            <div className='wrapper-login'>
                <div style={{ position: 'relative', flex: 1, overflow: 'hidden' }}>
                    {
                        progress === true ?
                            <div className='loader'>
                                <CircularProgress color="secondary" />
                            </div>
                            :
                            null
                    }
                    <div style={{ padding: '30px 50px', position: 'relative' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', marginBottom: 50 }}>
                            <img src={logo} style={{ height: 80, width: 'auto' }} alt="" />
                        </div>
                        {
                            activePage === 0 ?
                                <Stack className={`${page === 1 ? 'slide-left-out' : page === 0 ? 'slide-left-in' : ''}`} direction={'column'} gap={1.5}>
                                    <p style={{ fontWeight: 700, fontSize: 18, color: '#c42401' }}>Login Form</p>
                                    <div className={'btn-stack'} onClick={() => onUser('Super Admin')}>
                                        <p style={{ fontSize: 16, fontWeight: '600', margin: 0 }}>Login Super Admin</p>
                                    </div>
                                    <div className={'btn-stack'} onClick={() => onUser('Admin')}>
                                        <p style={{ fontSize: 16, fontWeight: '600', margin: 0 }}>Login Admin</p>
                                    </div>
                                    <div className={'btn-stack'} onClick={() => onUser('User')}>
                                        <p style={{ fontSize: 16, fontWeight: '600', margin: 0 }}>Login User</p>
                                    </div>
                                </Stack>
                                :
                                null
                        }
                        {
                            activePage === 1 ?
                                <Stack className={`${page === 1 ? 'slide-right-in' : page === 0 ? 'slide-right-out' : page === 2 ? 'slide-left-out' : ''}`} direction={'column'} gap={3}>
                                    <Stack alignItems={'center'} gap={1} direction={'row'}>
                                        <div className='btn-back' onClick={() => onPage(0)}>
                                            <ChevronLeft sx={{ color: '#fff' }} />
                                        </div>
                                        <p style={{ fontWeight: 700, fontSize: 18, color: '#c42401' }}>Login Form {user}</p>
                                    </Stack>
                                    <div>
                                        <p style={{ fontWeight: 600, margin: 0 }}>Username</p>
                                        <CustomTextField placeholder='Masukkan username anda' size={'small'} sx={{ width: 350 }}></CustomTextField>
                                    </div>
                                    <div>
                                        <p style={{ fontWeight: 600, margin: 0 }}>Password</p>
                                        <CustomTextField
                                            placeholder='Masukkan password anda'
                                            size={'small'}
                                            sx={{ width: 350 }}
                                            type={isPassword ? 'password' : 'text'}
                                            endAdornment={
                                                <InputAdornment position='end'>
                                                    <IconButton onClick={handlePassword} edge={'end'}>
                                                        {
                                                            isPassword ?
                                                                <Visibility sx={{ color: '#ababab' }}></Visibility>
                                                                :
                                                                <VisibilityOff sx={{ color: '#ababab' }}></VisibilityOff>
                                                        }
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        ></CustomTextField>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', cursor: 'pointer' }} onClick={() => onPage(2)}>
                                        <div style={{ padding: '10px 40px', backgroundColor: '#c42401', borderRadius: 10, display: 'flex', alignSelf: 'flex-start' }}>
                                            <p style={{ fontWeight: 600, color: '#fff', margin: 0 }}>Login</p>
                                        </div>
                                        <p style={{ fontWeight: 400, color: '#ababab', fontSize: 13 }}><i>Forgot password? Contact your Admin</i></p>
                                    </div>
                                </Stack>
                                :
                                null
                        }
                        {
                            activePage === 2 ?
                                <Stack className={`${page === 2 ? 'slide-right-in' : page === 1 ? 'slide-right-out' : ''}`} direction={'column'} gap={3}>
                                    <Stack alignItems={'center'} gap={1} direction={'row'}>
                                        <div className='btn-back' onClick={() => onPage(1)}>
                                            <ChevronLeft sx={{ color: '#fff' }} />
                                        </div>
                                        <p style={{ fontWeight: 700, fontSize: 18, color: '#c42401' }}>{`Pilih Toko (${user})`}</p>
                                    </Stack>
                                    <FormControl sx={{ width: 350 }} size="small">
                                        <InputLabel id="demo-select-small">Pilih Toko</InputLabel>
                                        <Select
                                            labelId="demo-select-small"
                                            id="demo-select-small"
                                            value={toko}
                                            label="Pilih Toko"
                                            onChange={onToko}
                                        >
                                            {
                                                [1, 1, 1, 1, 1, 1, 1, 1].map((item, index) => (
                                                    <MenuItem value={index} key={index}>Toko {index + 1}</MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </FormControl>
                                    <div onClick={PushUser} style={{ padding: '10px 40px', backgroundColor: '#c42401', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                        <p style={{ fontWeight: 600, color: '#fff', margin: 0 }}>Select</p>
                                    </div>
                                </Stack>
                                :
                                null
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;