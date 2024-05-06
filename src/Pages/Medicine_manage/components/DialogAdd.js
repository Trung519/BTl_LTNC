import * as React from "react";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
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
import { toast } from "react-toastify";
const DialogAdd = (props) => {
  const {
    newFormOpen,
    setNewFormOpen,
    setNewListMedicineAndRender,
    newListMedicine,
    emptyRows,
    setEmptyRows,
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
          // console.log("test dayjs", dayjs(formJson.HSD, "MM/DD/YYYY"));
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
          toast.success("Thêm thuốc thành công !", {
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
          setNewListMedicineAndRender([...newListMedicine, newMedicine]);
          setEmptyRows(Math.max(0, emptyRows - 1));
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
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              adapterLocale="en-gb"
            >
              <FormControl
                sx={{ minWidth: 120, marginTop: "17px" }}
                size="small"
              >
                <DatePicker
                  // value="en-gb"
                  required
                  size="small"
                  id="HSD"
                  name="HSD"
                  label="HSD"
                  slotProps={{
                    textField: {
                      required: true,
                    },
                  }}
                  // sx={{ padding: 0 }}
                  // format="DD/MM/YYYY"
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
              type="number"
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
              type="number"
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
              type="number"
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
