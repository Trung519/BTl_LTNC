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

import dayjs from "dayjs";
// import "dayjs/locale/en-gb";
import FormControl from "@mui/material/FormControl";

// import Paper from "@mui/material/Paper";

const DialogInfo = (props) => {
  const { row, infoFormOpen, setInfoFormOpen } = props;
  const handleErrorDate = (date) => {
    var initial = date.split(/\//);
    return [initial[1], initial[0], initial[2]].join("/"); //=> 'mm/dd/yyyy'
  };
  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={infoFormOpen}
      onClose={() => {
        setInfoFormOpen(false);
      }}
      PaperProps={{
        component: "form",
      }}
    >
      <DialogTitle>Thông tin thuốc trong kho</DialogTitle>
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
              value={row.medicineID}
              InputProps={{
                readOnly: true,
              }}
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
              value={row.name}
              InputProps={{
                readOnly: true,
              }}
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
              value={row.origin}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={0.5} sm={1} md={4}>
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              // adapterLocale="en-gb"
            >
              <FormControl
                sx={{ minWidth: 120, marginTop: "17px" }}
                size="small"
              >
                <DatePicker
                  format="DD/MM/YYYY"
                  readOnly
                  value={dayjs(handleErrorDate(row.HSD))}
                  // dayjs(row.HSD).format("DD/MM/YYYY")
                  // row.HSD
                  // dayjs("03/17/2024", "MM/DD/YYYY").format("DD/MM/YYYY")

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
                ></DatePicker>
                {/* <DateField label="HSD" defaultValue={dayjs(row.HSD)} /> */}
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
              value={row.cost}
              InputProps={{
                readOnly: true,
              }}
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
              value={row.sellPrice}
              InputProps={{
                readOnly: true,
              }}
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
              value={row.stock}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setInfoFormOpen(false);
          }}
        >
          hủy
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogInfo;
