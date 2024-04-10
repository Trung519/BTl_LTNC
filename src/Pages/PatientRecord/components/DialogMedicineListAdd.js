import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const DialogMedicineListAdd = (props) => {
  const {
    listNewMedicine,
    setListNewMedicine,
    CCCD,
    addMedicineListFormOpen,
    setAddMedicineListFormOpen,
    Add_Med,
  } = props;
  const [medicineAddList, setMedicineAddList] = React.useState(listNewMedicine);
  const nameValue = React.useRef();
  const usageValue = React.useRef();
  const dosageValue = React.useRef();
  const unitValue = React.useRef();
  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={addMedicineListFormOpen}
      onClose={() => {
        setAddMedicineListFormOpen(false);
      }}
      PaperProps={{
        component: "form",
      }}
    >
      <DialogTitle>Thêm đơn thuốc</DialogTitle>
      <DialogContent dividers>
        <DialogContentText></DialogContentText>
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{ xs: 1, md: 1 }}
            columns={{ xs: 1, sm: 4, md: 12 }}
          >
            <Grid item xs={1} sm={2} md={3}>
              <TextField
                margin="dense"
                id="name"
                name="name"
                label="Tên thuốc"
                type="text"
                fullWidth
                variant="standard"
                inputRef={nameValue}
              />
            </Grid>
            <Grid item xs={1} sm={2} md={3}>
              <TextField
                margin="dense"
                id="usage"
                name="usage"
                label="Cách uống"
                type="text"
                fullWidth
                variant="standard"
                inputRef={usageValue}
              />
            </Grid>
            <Grid item xs={1} sm={2} md={2.5}>
              <TextField
                margin="dense"
                id="dosage"
                name="dosage"
                label="Liều lượng"
                type="text"
                fullWidth
                variant="standard"
                inputRef={dosageValue}
              />
            </Grid>
            <Grid item xs={1} sm={2} md={2.5}>
              <TextField
                margin="dense"
                id="unit"
                name="unit"
                label="Số lượng"
                type="text"
                fullWidth
                variant="standard"
                inputRef={unitValue}
              />
            </Grid>
            <Grid item xs={1} sm={2} md={1}>
              <IconButton
                aria-label="add"
                size="small"
                color="success"
                sx={{ marginTop: "23px" }}
                onClick={() => {
                  const newMedicineElement = {
                    medicine: nameValue.current.value,
                    usage: usageValue.current.value,
                    dosagePerDay: dosageValue.current.value,
                    unit: unitValue.current.value,
                  };
                  setMedicineAddList((prev) => [newMedicineElement, ...prev]);
                }}
              >
                <AddCircleIcon></AddCircleIcon>
              </IconButton>
            </Grid>
            <Grid item xs={1} sm={2} md={1}>
              {/* table */}
              <TableContainer component={Paper} sx={{ minWidth: 800 }}>
                <Table sx={{ minWidth: 800 }} aria-label="simple table">
                  {/* <TableHead>
                    <TableRow>
                      <TableCell>Tên thuốc</TableCell>
                      <TableCell>Cách uống</TableCell>
                      <TableCell>Liều lượng</TableCell>
                      <TableCell>Số lượng</TableCell>
                    </TableRow>
                  </TableHead> */}
                  <TableBody>
                    {medicineAddList.map((row) => (
                      <TableRow
                        key={row.medicine}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.medicine}
                        </TableCell>
                        <TableCell>{row.usage}</TableCell>
                        <TableCell>{row.dosagePerDay}</TableCell>
                        <TableCell>{row.unit}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setAddMedicineListFormOpen(false);
          }}
        >
          hủy
        </Button>
        <Button
          onClick={() => {
            Add_Med(
              CCCD,
              nameValue.current.value,
              usageValue.current.value,
              dosageValue.current.value,
              unitValue.current.value
            );
            setListNewMedicine(medicineAddList);
            setAddMedicineListFormOpen(false);
          }}
        >
          Xác nhận
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogMedicineListAdd;
