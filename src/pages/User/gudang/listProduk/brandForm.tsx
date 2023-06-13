import React from 'react';
import { Box, Stack, TextField, Toolbar, Select, MenuItem, SelectChangeEvent, Icon, Tooltip, IconButton, CircularProgress } from '@mui/material';
import NavigationBarUser from '../../../../components/appBarUser';
import { CENTER } from '../../../../utils/stylesheet';
import { Colors } from '../../../../utils/colors';
import { useNavigate, useParams } from "react-router-dom";
import { isMobile } from 'react-device-detect';
import { HTTPAddBrand, HTTPGenerateBrandID } from '../../../../apis/User/product/brand';
import { HTTPGetCategories } from '../../../../apis/User/product/category';
import secureLocalStorage from 'react-secure-storage';
import { useFormik } from 'formik';

const BrandForm = () => {
    const navigate = useNavigate()
    const token = secureLocalStorage.getItem("TOKEN") as string
    const { action }: any = useParams()
    const [init, setInit] = React.useState(false)
    const [genId, setGenId] = React.useState('')
    const [categoryId, setCategoryId] = React.useState<any>([])
    const [onSend, setSend] = React.useState(false)

    const GoBack = () => {
        navigate(-1)
    }

    const Formik = useFormik({
        initialValues: {
            brandName: '',
            categoryId: '',
        },
        onSubmit: async (values) => {
            setSend(true)
            try {
                const resp = await HTTPAddBrand({
                    brandName: values.brandName,
                    genId: genId,
                    productCategoryId: parseInt(values.categoryId),
                    token: token
                })
                setSend(false)
                navigate('/gudang/list-produk')
            } catch (error) {
                console.log(error)
                setSend(false)
            }
        }
    })

    const getId = async () => {
        try {
            const respID = await HTTPGenerateBrandID()
            setGenId(respID.data.data.genId)
        } catch (error) {
            console.log(error)
        }
    }

    const getCategory = (values: any) => {
        if (values.length === 0) {
            return <span style={{ color: '#a7a5a6' }}>Pilih Kategori</span>;
        } else {
            const result = categoryId.filter((value: any) => value.id === Formik.values.categoryId)
            return <span style={{ color: '#000' }}>{result[0].categoryName}</span>;
        }
    }

    const Initial = async () => {
        try {
            const respID = await HTTPGenerateBrandID()
            const respUser = await HTTPGetCategories({ limit: '50', page: '', q: '', token: token })
            setGenId(respID.data.data.genId)
            setCategoryId(respUser.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    React.useEffect(() => { Initial() }, [init])

    return (
        <form onSubmit={Formik.handleSubmit}>
            <div style={{ display: 'flex' }}>
                <NavigationBarUser title={'Form Data Brand'} isChild={true} name={'List Produk'} idPanel={2}></NavigationBarUser>
                <Box
                    component="main"
                    sx={{ bgcolor: '#f4f5ff', p: isMobile ? 2 : 5, width: '100vw', minHeight: '100vh' }}
                >
                    <Toolbar />
                    <div style={{ flex: 1, ...CENTER }}>
                        <Stack direction={'column'} gap={3} sx={{ backgroundColor: '#fff', borderRadius: 2, border: '1px solid #cccccc', padding: '4% 3%' }}>
                            <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                                <h2 style={{ color: '#000' }}>Form Data Brand</h2>
                                {
                                    action === 'update' ?
                                        <div style={{ backgroundColor: Colors.warning, height: 40, width: 40, ...CENTER, borderRadius: 10 }}>
                                            <Icon style={{ color: '#fff', fontSize: 20 }}>border_color</Icon>
                                        </div>
                                        :
                                        null
                                }
                            </Stack>
                            <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-start'} gap={isMobile ? 2 : 3}>
                                <Stack direction={'column'} gap={1}>
                                    <span>ID SKU</span>
                                    <TextField
                                        type="text"
                                        disabled
                                        size="small"
                                        value={genId}
                                        sx={{ bgcolor: "#f4f4f4", width: isMobile ? '40vw' : '25vw' }}
                                        InputProps={{
                                            endAdornment: (
                                                action === 'update' ?
                                                    null
                                                    :
                                                    <Tooltip title="Regenerate ID">
                                                        <IconButton onClick={getId}>
                                                            <Icon sx={{ fontSize: 25, color: Colors.primary }}>refresh</Icon>
                                                        </IconButton>
                                                    </Tooltip>
                                            )
                                        }}
                                    />
                                </Stack>
                                <Stack direction={'column'} gap={1}>
                                    <span>Nama Brand</span>
                                    <TextField
                                        type="text"
                                        size="small"
                                        id="brandName"
                                        name="brandName"
                                        value={Formik.values.brandName}
                                        onChange={Formik.handleChange}
                                        placeholder={'Nama Brand'}
                                        sx={{ bgcolor: "#fff", width: isMobile ? '40vw' : '25vw' }}
                                    />
                                </Stack>
                            </Stack>
                            <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-start'} gap={isMobile ? 2 : 3}>
                                <Stack direction={'column'} gap={1}>
                                    <span>Kategori</span>
                                    <Select
                                        size="small"
                                        displayEmpty
                                        id="categoryId"
                                        name="categoryId"
                                        value={Formik.values.categoryId}
                                        onChange={Formik.handleChange}
                                        sx={{ bgcolor: "white", width: isMobile ? '40vw' : '25vw', color: '#000' }}
                                        renderValue={(selected: any) => getCategory(selected)}
                                    >
                                        {
                                            categoryId.map((item: any, index: number) => (
                                                <MenuItem key={index} value={item.id}>{item.categoryName}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                </Stack>
                                {/* <Stack direction={'column'} gap={1}>
                                <span>Min. Stok</span>
                                <TextField
                                    type="text"
                                    size="small"
                                    defaultValue={'20'}
                                    sx={{ bgcolor: "#fff", width: isMobile ? '40vw' : '25vw' }}
                                />
                            </Stack> */}
                            </Stack>
                            <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} gap={2} marginTop={5}>
                                <div onClick={GoBack} style={{ ...CENTER, borderRadius: 10, border: `1px solid ${Colors.primary}`, padding: '10px 30px', cursor: 'pointer' }}>
                                    <span style={{ fontSize: 13, color: Colors.primary }}>BATAL</span>
                                </div>
                                <button type="submit" style={{ all: 'unset' }}>
                                    <div style={{ ...CENTER, borderRadius: 10, backgroundColor: Colors.primary, padding: '10px 30px', cursor: 'pointer', color: '#fff' }}>
                                        {
                                            onSend === true ?
                                                <CircularProgress size={20} color={'inherit'} />
                                                :
                                                <span style={{ fontSize: 13, color: '#fff' }}>SIMPAN</span>
                                        }
                                    </div>
                                </button>
                            </Stack>
                        </Stack>
                    </div>
                </Box>
            </div>
        </form>
    )
}

export default BrandForm;