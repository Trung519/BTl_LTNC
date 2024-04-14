import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { memo, useState } from "react";

function ConfirmModal({ displayConfirm, setDisplayConfirm, handleDeleteRow }) {
  const handlClose = () => {
    setDisplayConfirm(false);
  };
  // console.log(handleDeleteRow);
  return (
    <div>
      <Dialog
        open={displayConfirm}
        onClose={handlClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Bạn chắc chắn muốn bỏ thiết bị này?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Thiết bị sau khi xóa sẽ không thể khôi phục
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlClose}>Không</Button>
          <Button onClick={handleDeleteRow} autoFocus>
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default memo(ConfirmModal);
