import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { memo } from "react";

function ConfirmModalDeleteSchedule({ displayConfirm, setDisplayConfirm, handleDeleteRow, key }) {
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
                    Bạn chắc chắc muốn xóa bỏ lịch hẹn này?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Lịch hẹn không thể hoàn tác sau khi xóa
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={e => {
                        e.preventDefault();
                        handlClose()
                    }}>Không</Button>
                    <Button onClick={
                        handleDeleteRow(key)} autoFocus>
                        Đồng ý
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default memo(ConfirmModalDeleteSchedule);
