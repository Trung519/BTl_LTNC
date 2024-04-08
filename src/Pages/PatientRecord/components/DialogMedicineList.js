import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
// import Stack from "@mui/material/Stack"
import CloseIcon from "@mui/icons-material/Close";
const DialogMedicineList = (props) => {
  const { setMedicineListDialogOpen, medicineListDialogOpen, historyRow } =
    props;
  return (
    <Dialog
      onClose={() => setMedicineListDialogOpen(false)}
      aria-labelledby="customized-dialog-title"
      open={medicineListDialogOpen}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>Đơn thuốc</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={() => setMedicineListDialogOpen(false)}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <TableContainer component={Paper} sx={{ minWidth: 800 }}>
          <Table sx={{ minWidth: 800 }} aria-label="simple table">
            <colgroup>
              <col style={{ width: "25%" }} />
              <col style={{ width: "25%" }} />
              <col style={{ width: "25%" }} />
              <col style={{ width: "25%" }} />
            </colgroup>
            <TableHead>
              <TableRow>
                <TableCell>Tên thuốc</TableCell>
                <TableCell>Cách uống</TableCell>
                <TableCell>Liều lượng</TableCell>
                <TableCell>Số lượng</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* {historyRow.medicineList.map((row) => (
                <TableRow
                  key={row.medicine}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.medicine}
                  </TableCell>
                  <TableCell>{row.usage}</TableCell>
                  <TableCell>{row.dosagePerDay}</TableCell>
                  <TableCell>{row.unit}</TableCell>
                </TableRow>
              ))} */}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={() => setMedicineListDialogOpen(false)}>
          Xong
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogMedicineList;
