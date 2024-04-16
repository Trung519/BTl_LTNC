import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { writeUserData } from "../../../../services/firebase";

function ConfirmDelete({ confirmDelete, setConfirmDelete, setDataEmp, ID }) {
  const handleClose = () => {
    setConfirmDelete(false);
  };
  const handleDelete = () => {
    handleClose();
    setDataEmp((prev) => {
      let newDataEmp = prev.filter((item) => item.ID !== ID);
      writeUserData(newDataEmp, "/Employee");
      return newDataEmp;
    });
  };
  return (
    <Dialog
      open={confirmDelete}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Xác nhận xóa Nhân viên y tế ?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Dữ liệu sau khi xóa không thể khôi phục.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Không</Button>
        <Button onClick={handleDelete} autoFocus>
          Đồng ý
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDelete;
