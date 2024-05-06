import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { memo } from "react";

function ConfirmModal({
  alertDeleteMaintain,
  setAlertDeteteMaintain,
  handleDeleteMaintain,
}) {
  const handlClose = () => {
    setAlertDeteteMaintain(false);
  };
  // console.log(handleDeleteRow);
  return (
    <div>
      <Dialog
        open={alertDeleteMaintain}
        onClose={handlClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Xóa lịch hẹn này?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn xác nhận sẽ xóa lịch hẹn này?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlClose}>Không</Button>
          <Button onClick={() => handleDeleteMaintain()} autoFocus>
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default memo(ConfirmModal);
