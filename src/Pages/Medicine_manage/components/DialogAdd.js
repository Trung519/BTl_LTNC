import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import FormControl from "@mui/material/FormControl";
import { AddData_Med } from "../P_R-be";
const DialogAdd = (props) => {
  const {
    newFormOpen,
    setNewFormOpen,
    setNewListMedicineAndRender,
    newListMedicine,
    // createMedicine,
  } = props;
  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={newFormOpen}
      onClose={() => {
        setNewFormOpen(false);
      }}
      PaperProps={{
        component: "form",
        onSubmit: (event) => {
          event.preventDefault();

          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries(formData.entries());
          AddData_Med(
            formJson.medicineID,
            formJson.name,
            formJson.origin,
            formJson.HSD,
            formJson.cost,
            formJson.sellPrice,
            formJson.stock
          );
          // cách lấy data
          const newMedicine = {
            medicineID: formJson.medicineID,
            name: formJson.name,
            origin: formJson.origin,
            HSD: formJson.HSD,
            cost: formJson.cost,
            sellPrice: formJson.sellPrice,
            stock: formJson.stock,
          };
          console.log(newMedicine);
          setNewListMedicineAndRender([newMedicine, ...newListMedicine]);
          setNewFormOpen(false);
        },
      }}
    >
      <DialogTitle>Thêm thuốc trong kho</DialogTitle>
      <DialogContent dividers>
        <DialogContentText></DialogContentText>

        <Grid
          container
          spacing={{ xs: 1, md: 2 }}
          columns={{ xs: 1, sm: 4, md: 12 }}
        >
          <Grid item xs={1} sm={2} md={3}>
            <TextField
              required
              margin="dense"
              id="medicineID"
              name="medicineID"
              label="Mã thuốc"
              type="text"
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item xs={1} sm={2} md={6}>
            <TextField
              required
              margin="dense"
              id="name"
              name="name"
              label="Tên thuốc"
              type="text"
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item xs={1} sm={2} md={3}>
            <TextField
              required
              margin="dense"
              id="origin"
              name="origin"
              label="Xuất xứ"
              type="text"
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item xs={0.5} sm={1} md={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <FormControl
                sx={{ minWidth: 120, marginTop: "17px" }}
                size="small"
              >
                <DatePicker
                  required
                  size="small"
                  id="HSD"
                  name="HSD"
                  label="HSD"
                  // sx={{ padding: 0 }}
                  format="DD/MM/YYYY"
                ></DatePicker>
              </FormControl>
            </LocalizationProvider>{" "}
          </Grid>

          <Grid item xs={1} sm={2} md={2.5}>
            <TextField
              required
              margin="dense"
              id="cost"
              name="cost"
              label="Giá nhập"
              type="text"
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item xs={1} sm={2} md={2.5}>
            <TextField
              required
              margin="dense"
              id="sellPrice"
              name="sellPrice"
              label="Giá bán"
              type="text"
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item xs={1} sm={2} md={3}>
            <TextField
              required
              margin="dense"
              id="stock"
              name="stock"
              label="Tồn kho"
              type="text"
              fullWidth
              variant="standard"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setNewFormOpen(false);
          }}
        >
          hủy
        </Button>
        <Button type="submit">Xác nhận</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogAdd;
