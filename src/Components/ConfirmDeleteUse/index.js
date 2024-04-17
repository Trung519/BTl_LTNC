import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { memo } from "react";

function ConfirmDeleteUse({
  alertDeleteUse,
  setAlertDeleteUse,
  handleDeleteUse,
}) {
  const handlClose = () => {
    setAlertDeleteUse(false);
  };

  return (
    <div>
      <Dialog
        open={alertDeleteUse}
        onClose={handlClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Xóa lịch sử sử dụng này?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn chỉ nên xóa lịch sử sử dụng đã có từ lâu
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlClose}>Không</Button>
          <Button onClick={handleDeleteUse} autoFocus>
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default memo(ConfirmDeleteUse);
