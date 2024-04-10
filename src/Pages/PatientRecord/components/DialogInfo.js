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
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const DialogInfo = (props) => {
  const { infoFormOpen, setInfoFormOpen, row } = props;
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
      // sx={{ width: "100%", maxWidth: "1000px" }}
    >
      <DialogTitle>Thông tin hồ sơ bệnh án</DialogTitle>
      <DialogContent dividers>
        <DialogContentText></DialogContentText>

        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{ xs: 1, md: 2 }}
            columns={{ xs: 1, sm: 4, md: 12 }}
          >
            <Grid item xs={1} sm={3} md={8}>
              <TextField
                // disabled
                // autoFocus
                margin="dense"
                id="fullName"
                name="fullname"
                label="Họ và tên"
                type="text"
                fullWidth
                variant="standard"
                value={row.fullName}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={0.5} sm={1} md={4}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <FormControl
                  sx={{ minWidth: 120, marginTop: "17px" }}
                  size="small"
                >
                  <DatePicker
                    size="small"
                    label="Ngày sinh"
                    // sx={{ padding: 0 }}
                    format="DD/MM/YYYY"
                    readOnly
                    value={dayjs(row.BirthDay, "DD/MM/YYYY")}
                  ></DatePicker>
                </FormControl>
              </LocalizationProvider>{" "}
            </Grid>
            <Grid item xs={0.5} sm={1} md={3}>
              <FormControl
                sx={{ minWidth: 120, marginTop: "17px" }}
                size="small"
              >
                <InputLabel id="demo-select-small-label">Giới tính</InputLabel>
                <Select
                  // displayEmpty
                  readOnly
                  labelId="demo-select-small"
                  id="demo-select"
                  // defaultValue={row.gender}
                  label="Giới tính"
                  value={row.gender}
                >
                  <MenuItem value={"Nam"}>Nam</MenuItem>
                  <MenuItem value={"Nữ"}>Nữ</MenuItem>
                  <MenuItem value={"Khác"}>Khác</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={1} sm={2} md={4.5}>
              <TextField
                margin="dense"
                id="CCCD"
                name="CCCD"
                label="Số CCCD"
                type="text"
                fullWidth
                value={row.CCCD}
                variant="standard"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={1} sm={2} md={4.5}>
              <TextField
                // autoFocus
                margin="dense"
                id="BHYT"
                name="BHYT"
                label="Số BHYT"
                type="text"
                fullWidth
                value={row.BHYT}
                variant="standard"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>

            <Grid item xs={1} sm={3} md={12}>
              {" "}
              <TextField
                // autoFocus
                margin="dense"
                id="address"
                name="address"
                label="Địa chỉ"
                type="text"
                fullWidth
                value={row.address}
                variant="standard"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
          </Grid>
        </Box>
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
