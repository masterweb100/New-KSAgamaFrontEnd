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

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DeleteModal = ({
  isOpen,
  setOpen,
}: {
  isOpen: boolean;
  setOpen: any;
}) => {
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
            width={"90%"}
            textAlign={"center"}
          >
            <h3 style={{ color: "#686868" }}>Yakin ingin menghapus data?</h3>
            <span style={{ color: "#686868" }}>
              Data yang sudah terhapus tidak akan bisa dikembalikan lagi.
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
              onClick={setOpen}
              style={{
                ...CENTER,
                borderRadius: 10,
                backgroundColor: Colors.error,
                padding: "10px 30px",
                cursor: "pointer",
              }}
            >
              <span style={{ fontSize: 13, color: "#fff" }}>HAPUS</span>
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

export default DeleteModal;
