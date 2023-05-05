import React from "react";
import NavigationBarUser from "../../../../components/appBarUser";
import { CENTER } from "../../../../utils/stylesheet";
import { Colors } from "../../../../utils/colors";
import { Box, Stack, TextField, Toolbar, Icon, InputAdornment } from "@mui/material";
import { isMobile } from "react-device-detect";
import { useDropzone } from 'react-dropzone';

const SetProfil = () => {
  const [oldPassShow, setOldPassShow] = React.useState(false)
  const [newPassShow, setNewPassShow] = React.useState(false)
  const [confirmPassShow, setConfirmPassShow] = React.useState(false)
  const [files, setFiles] = React.useState<any>([]);

  const toggleOldPass = () => setOldPassShow(!oldPassShow)
  const toggleNewPass = () => setNewPassShow(!newPassShow)
  const toggleConfirmPass = () => setConfirmPassShow(!confirmPassShow)

  const SetImage = (e: any) => {
    setFiles(e.map((file: any) => Object.assign(file, {
      preview: URL.createObjectURL(file)
    })))
  }

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': []
    },
    onDrop: SetImage,
    multiple: false
  });

  return (
    <div style={{ display: "flex" }}>
      <NavigationBarUser
        title={"Pengaturan"}
        isChild={false}
        name={"Profilku"}
        idPanel={9}
      ></NavigationBarUser>
      <Box
        component="main"
        sx={{
          bgcolor: "#f4f5ff",
          p: isMobile ? 2 : 5,
          width: "100vw",
          minHeight: "100vh",
        }}
      >
        <Toolbar />
        <div style={{ flex: 1, ...CENTER }}>
          <Stack
            direction={"column"}
            gap={3}
            sx={{
              backgroundColor: "#fff",
              borderRadius: 2,
              border: "1px solid #cccccc",
              padding: "4% 3%",
            }}
          >
            <h2 style={{ color: "#000", margin: 0 }}>Data User</h2>
            <Stack gap={1} direction={'column'}>
              <span>Upload Logo</span>
              {
                files.length === 0 ?
                  <div {...getRootProps({ className: 'dropzone' })} style={{
                    border: '1px dashed #909090',
                    borderRadius: '5px',
                    padding: '5% 0',
                    width: isMobile ? '100%' : '25vw',
                    cursor: 'pointer',
                    ...CENTER
                  }}>
                    <input {...getInputProps()} />
                    <Stack direction={'column'} alignItems={'center'} justifyContent={'center'} gap={2}>
                      <Icon style={{ color: '#909090', fontSize: 60 }}>cloud_upload</Icon>
                      <span style={{ color: '#909090', whiteSpace: 'pre-line', textAlign: 'center' }}>{'Drag & drop some image\nOR\nClick to select file'}</span>
                    </Stack>
                  </div>
                  :
                  <>
                    {
                      files.map((file: any, index: number) => (
                        <img
                          key={index}
                          src={file.preview}
                          style={{
                            borderRadius: '10px',
                            width: isMobile ? '100%' : '25vw',
                            objectFit: 'cover',
                            aspectRatio: 4 / 3,
                            position: 'relative'
                          }}
                          onLoad={() => { URL.revokeObjectURL(file.preview) }}
                          alt="..."
                        />
                      ))
                    }
                  </>
              }
              <span style={{ color: '#909090', fontSize: 13 }}>*Ukuran File Maksimal 1 MB</span>
            </Stack>
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"flex-start"}
              gap={isMobile ? 2 : 3}
            >
              <Stack direction={"column"} gap={1}>
                <span>*Nama Lengkap</span>
                <TextField
                  type="text"
                  size="small"
                  placeholder="Nama"
                  sx={{ bgcolor: "white", width: isMobile ? "40vw" : "25vw" }}
                />
              </Stack>
              <Stack direction={"column"} gap={1}>
                <span>*Username</span>
                <TextField
                  type="text"
                  size="small"
                  placeholder="Username"
                  sx={{ bgcolor: "white", width: isMobile ? "40vw" : "25vw" }}
                />
              </Stack>
            </Stack>
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"flex-start"}
              gap={isMobile ? 2 : 3}
            >
              <Stack direction={"column"} gap={1}>
                <span>*Alamat Email</span>
                <TextField
                  type="text"
                  size="small"
                  placeholder="Email"
                  sx={{ bgcolor: "white", width: isMobile ? "40vw" : "25vw" }}
                />
              </Stack>
              <Stack direction={"column"} gap={1}>
                <span>*No. Telepon</span>
                <TextField
                  type="text"
                  size="small"
                  placeholder="Telp"
                  sx={{ bgcolor: "white", width: isMobile ? "40vw" : "25vw" }}
                />
              </Stack>
            </Stack>
            <h2 style={{ color: "#000", margin: 0 }}>Ganti Password</h2>
            <Stack direction={"column"} gap={1}>
              <span>*Password Lama</span>
              <TextField
                type={oldPassShow ? "text" : "password"}
                size="small"
                placeholder="Password Lama"
                sx={{ bgcolor: "white", width: isMobile ? "60vw" : "25vw" }}
                InputProps={{
                  endAdornment:
                    <InputAdornment position='end'>
                      <Icon style={{ color: "#909090", fontSize: 25, cursor: 'pointer' }} onClick={toggleOldPass}>
                        {!oldPassShow ? 'visibility' : 'visibility_off'}
                      </Icon>
                    </InputAdornment>
                }}
              />
            </Stack>
            <Stack direction={"column"} gap={1}>
              <span>*Password Baru</span>
              <TextField
                type={newPassShow ? "text" : "password"}
                size="small"
                placeholder="Password Baru"
                sx={{ bgcolor: "white", width: isMobile ? "60vw" : "25vw" }}
                InputProps={{
                  endAdornment:
                    <InputAdornment position='end'>
                      <Icon style={{ color: "#909090", fontSize: 25, cursor: 'pointer' }} onClick={toggleNewPass}>
                        {!newPassShow ? 'visibility' : 'visibility_off'}
                      </Icon>
                    </InputAdornment>
                }}
              />
            </Stack>
            <Stack direction={"column"} gap={1}>
              <span>*Ulangi Password Baru</span>
              <TextField
                type={confirmPassShow ? "text" : "password"}
                size="small"
                placeholder="Ulangi Password Baru"
                sx={{ bgcolor: "white", width: isMobile ? "60vw" : "25vw" }}
                InputProps={{
                  endAdornment:
                    <InputAdornment position='end'>
                      <Icon style={{ color: "#909090", fontSize: 25, cursor: 'pointer' }} onClick={toggleConfirmPass}>
                        {!confirmPassShow ? 'visibility' : 'visibility_off'}
                      </Icon>
                    </InputAdornment>
                }}
              />
            </Stack>
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"center"}
              gap={2}
              marginTop={5}
            >
              <div
                style={{
                  ...CENTER,
                  borderRadius: 10,
                  border: `1px solid ${Colors.primary}`,
                  padding: "10px 30px",
                  cursor: "pointer",
                }}
              >
                <span style={{ fontSize: 13, color: Colors.primary }}>
                  BATAL
                </span>
              </div>
              <div
                style={{
                  ...CENTER,
                  borderRadius: 10,
                  backgroundColor: Colors.primary,
                  padding: "10px 30px",
                  cursor: "pointer",
                }}
              >
                <span style={{ fontSize: 13, color: "#fff" }}>SIMPAN</span>
              </div>
            </Stack>
          </Stack>
        </div>
      </Box>
    </div>
  );
};

export default SetProfil;
