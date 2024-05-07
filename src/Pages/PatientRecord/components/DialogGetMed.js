import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { toast } from "react-toastify";
import { getMedCheck } from "../P_R_be";

const DialogGetMed = (props) => {
  const { getMedDialog, setGetMedDialog, setGetMed, CCCD, index, pharmacist } =
    props;
  const confirmAndQuit = () => {
    // setGetMedDialog(false);
    setGetMed(true);
    getMedCheck(CCCD, index, pharmacist);
    setGetMedDialog(false);
    toast.success(`Dược sĩ ${pharmacist.name} xác nhận lấy thuốc thành công`, {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      // transition: Bounce,
    });
  };
  //   const handleClose = () => {
  //     setGetMedDialog(false);
  //   };
  return (
    <Dialog
      open={getMedDialog}
      onClose={() => {
        setGetMedDialog(false);
      }}
      aria-labelledby="alert-dialog-title"
      //   aria-describedby="alert-dialog-description"
    >
      <DialogTitle>{"Xác nhận đã bốc thuốc?"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Dược sĩ: {pharmacist.name}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setGetMedDialog(false);
          }}
        >
          Hủy
        </Button>
        <Button onClick={confirmAndQuit}>Xác nhận</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogGetMed;
