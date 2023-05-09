import React from "react";
import {
  CircularProgress,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Stack,
} from "@mui/material";
import "./style.css";
import { styled } from "@mui/material/styles";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { isMobile } from "react-device-detect";
import { Colors } from "../../utils/colors";
import { HTTPLogin } from "../../apis/authentication";
import secureLocalStorage from "react-secure-storage";

const topBg = require("../../assets/images/top-login.png");
const redCircle = require("../../assets/images/circle-red.png");
const redBird = require("../../assets/images/bird-red.png");
const logo = require("../../assets/images/ksa-logo.png");

const CustomTextField = styled(OutlinedInput)({
  "& label.Mui-focused": {
    color: "rgba(225, 32, 159, 1)",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#ababab",
      borderRadius: 10,
    },
    "&:hover fieldset": {
      borderColor: "#000",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#c42401",
    },
  },
});

const Login = () => {
  const navigate = useNavigate();
  const [isPasswordShow, setPasswordShow] = React.useState(true);
  const [progress, setProgress] = React.useState(false);
  const [username, setUsername] = React.useState("")
  const [usernameErr, setUsernameErr] = React.useState(false)
  const [password, setPassword] = React.useState("")
  const [passwordErr, setPasswordErr] = React.useState(false)

  const handlePasswordShow = () => setPasswordShow(!isPasswordShow);

  const PushUser = () => {
    if (username === 'supadmin') {
      setUsernameErr(false)
      if (password === '123') {
        setPasswordErr(false)
        setProgress(true);
        setTimeout(() => {
          // navigate("/dashboard");
          Login('super')
          setProgress(false);
        }, 1000);
      } else {
        setPasswordErr(true)
      }
    } else if (username === 'admin' || username === 'user') {
      setUsernameErr(false)
      if (password === '123') {
        setPasswordErr(false)
        console.log('user', 'admin')
        setProgress(true);
        setTimeout(() => {
          // navigate("/dashboard-user");
          Login('user')
          setProgress(false);
        }, 1000);
      } else {
        setPasswordErr(true)
      }
    } else {
      setUsernameErr(true)
      setPasswordErr(false)
    }
  };

  const handleUsername = (event: any) => {
    setUsername(event.target.value as string);
  };

  const handlePassword = (event: any) => {
    setPassword(event.target.value as string);
  };

  const handleSubmit = (event: any) => {
    if (event.key === 'Enter') {
      PushUser()
    }
  }

  const Login = async (param: string) => {
    try {
      // let newForm = new FormData()
      // newForm.append("username", username)
      // newForm.append("password", password)
      // console.log(newForm)
      // const response = await HTTPLogin({form: newForm})
      // if (response.code === 200) {
      //   secureLocalStorage.setItem("TOKEN", response.data.token as string)
      // }
      
      secureLocalStorage.setItem("TOKEN", param as string)
      if (param === 'user') {
        navigate('/dashboard-user')
      } else {
        navigate('/dashboard')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const Auth = () => {
    const auth = secureLocalStorage.getItem("TOKEN")
    console.log(auth)
    if (auth !== null) {
      if (auth === 'user') {
        navigate('dashboard-user')
      } else {
        navigate('dashboard')
      }
    }
  }


  const [init, setInit] = React.useState(false)
  React.useEffect(() => {
    Auth()
  }, [init])

  return (
    <div>
      {
        isMobile ?
          null
          :
          <>
            <img
              src={topBg}
              style={{ width: "100%", position: "absolute", top: -30, right: 0, left: 0, zIndex: 0, }}
              alt=""
            />
            <p style={{ position: "absolute", top: "5%", left: "7%", fontSize: 35, fontWeight: 400, color: "#fff", whiteSpace: "pre-line", }}>
              Welcome!{"\n"}KSA Project Accounting {"&"} Distribution
            </p>
            <img
              src={redCircle}
              className={"circle-anim"}
              style={{ width: 40, height: 40, position: "absolute", left: "2%", top: "35%", }}
              alt=""
            />
            <img
              src={redCircle}
              className={"circle-anim"}
              style={{ width: 90, height: 90, position: "absolute", left: "4%", top: "38%", }}
              alt=""
            />
            <img
              src={redCircle}
              className={"circle-anim"}
              style={{ width: 80, height: 80, position: "absolute", left: "40%", top: "-6%", }}
              alt=""
            />
            <img
              src={redCircle}
              className={"circle-anim"}
              style={{ width: 190, height: 190, position: "absolute", left: "40%", top: "40%", }}
              alt=""
            />
            <img
              src={redBird}
              className={"circle-anim"}
              style={{ width: "auto", height: "70%", position: "absolute", left: "0%", bottom: "0%", objectFit: "contain", }}
              alt=""
            />
          </>
      }
      {progress === true && isMobile === true ? (
        <div className="loader">
          <CircularProgress color="secondary" />
        </div>
      ) : null}
      <div className="wrapper-login">
        <div style={{ position: "relative", flex: 1, overflow: "hidden" }}>
          {progress === true && isMobile === false ? (
            <div className="loader">
              <CircularProgress color="secondary" />
            </div>
          ) : null}
          <div style={{ padding: isMobile === true ? "30px 10px" : "30px 50px", position: "relative" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                marginBottom: 50,
              }}
            >
              <img src={logo} style={{ height: 80, width: "auto" }} alt="" />
            </div>
            <Stack direction={"column"} gap={3}>
              <Stack alignItems={"center"} gap={1} direction={"row"}>
                <p style={{ fontWeight: 700, fontSize: 18, color: "#c42401" }}>Login Form</p>
              </Stack>
              <div>
                <p style={{ fontWeight: 600, margin: 0 }}>Username</p>
                <Stack direction={'column'}>
                  <CustomTextField
                    onChange={handleUsername}
                    value={username}
                    placeholder="Masukkan username anda"
                    size={"small"}
                    error={usernameErr}
                    sx={{ width: isMobile ? '80vw' : 350 }}
                  ></CustomTextField>
                  {
                    usernameErr === true ?
                      <small style={{ fontWeight: 400, margin: 0, color: Colors.primary }}>Username tidak ditemukan</small>
                      :
                      <small style={{ margin: 0 }}></small>
                  }
                </Stack>
              </div>
              <div>
                <p style={{ fontWeight: 600, margin: 0 }}>Password</p>
                <Stack direction={'column'}>
                  <CustomTextField
                    onChange={handlePassword}
                    value={password}
                    error={passwordErr}
                    placeholder="Masukkan password anda"
                    size={"small"}
                    onKeyDown={handleSubmit}
                    sx={{ width: isMobile ? '80vw' : 350 }}
                    type={isPasswordShow ? "password" : "text"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton onClick={handlePasswordShow} edge={"end"}>
                          {isPasswordShow ? (
                            <Visibility sx={{ color: "#ababab" }}></Visibility>
                          ) : (
                            <VisibilityOff
                              sx={{ color: "#ababab" }}
                            ></VisibilityOff>
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  ></CustomTextField>
                  {
                    passwordErr === true ?
                      <small style={{ fontWeight: 400, margin: 0, color: Colors.primary }}>Password tidak sesuai</small>
                      :
                      <small style={{ margin: 0 }}></small>
                  }
                </Stack>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  onClick={PushUser}
                  style={{
                    cursor: "pointer",
                    padding: "10px 40px",
                    backgroundColor: "#c42401",
                    borderRadius: 10,
                    display: "flex",
                    alignSelf: "flex-start",
                  }}
                >
                  <p style={{ fontWeight: 600, color: "#fff", margin: 0 }}>Login</p>
                </div>
                <p style={{ fontWeight: 400, color: "#ababab", fontSize: 13 }}>
                  <i>Forgot password? Contact your Admin</i>
                </p>
              </div>
            </Stack>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
