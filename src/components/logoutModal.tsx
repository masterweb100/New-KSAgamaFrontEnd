import {
    Dialog,
    DialogContent,
    Slide,
    Stack,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import * as React from "react";
import { Colors } from "../utils/colors";
import { CENTER } from "../utils/stylesheet";
import { Error } from "@mui/icons-material";
import secureLocalStorage from "react-secure-storage";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const LogoutModal = ({ isOpen, setOpen, navigate }: { isOpen: boolean; setOpen: any; navigate: any }) => {
    const Logout = () => {
        setOpen();
        secureLocalStorage.clear();
        navigate('/')
    }

    return (
        <Dialog
            open={isOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={setOpen}
        >
            <DialogContent>
                <Error
                    style={{
                        color: Colors.error,
                        fontSize: 25,
                        position: "absolute",
                        top: 10,
                        right: 10,
                    }}
                ></Error>
                <Stack direction={"column"} gap={2} alignItems={"center"}>
                    <Stack
                        direction={"column"}
                        alignItems={"center"}
                        justifyContent={"center"}
                        // width={"90%"}
                        textAlign={"center"}
                    >
                        <h3 style={{ color: "#686868" }}>Log Out</h3>
                        <span style={{ color: "#686868" }}>
                            Anda yakin ingin keluar?
                        </span>
                    </Stack>
                    <Stack
                        direction={"row"}
                        alignItems={"center"}
                        justifyContent={"center"}
                        gap={2}
                        marginTop={5}
                    >
                        <div
                            onClick={Logout}
                            style={{
                                ...CENTER,
                                borderRadius: 10,
                                backgroundColor: Colors.error,
                                padding: "10px 30px",
                                cursor: "pointer",
                            }}
                        >
                            <span style={{ fontSize: 13, color: "#fff" }}>LOG OUT</span>
                        </div>
                        <div
                            onClick={setOpen}
                            style={{
                                ...CENTER,
                                borderRadius: 10,
                                border: `1px solid ${Colors.error}`,
                                padding: "10px 30px",
                                cursor: "pointer",
                            }}
                        >
                            <span style={{ fontSize: 13, color: Colors.error }}>BATAL</span>
                        </div>
                    </Stack>
                </Stack>
            </DialogContent>
        </Dialog>
    );
};

export default LogoutModal;
