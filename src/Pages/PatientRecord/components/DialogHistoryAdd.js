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

const DialogHistoryAdd = (props) => {
  const {
    addMedicineListFormOpen,
    addHistoryFormOpen,
    setAddHistoryFormOpen,
    AddHist,
    historyList,
    setHistoryList,
    // listNewMedicine,
    // setListNewMedicine,
    row,
    DialogMedicineListAdd,
    setAddMedicineListFormOpen,
  } = props;
  const [listNewMedicine, setListNewMedicine] = React.useState([]);

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={addHistoryFormOpen}
      onClose={() => setAddHistoryFormOpen(false)}
      PaperProps={{
        component: "form",
        onSubmit: (event) => {
          event.preventDefault();

          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries(formData.entries());
          // AddHist(
          //   row.CCCD,
          //   row.STT,
          //   formJson.date,
          //   formJson.doctor,
          //   formJson.disease,
          //   listNewMedicine
          // );
          const newHistory = {
            date: formJson.date,
            doctor: formJson.doctor,
            disease: formJson.disease,
            medicineList: listNewMedicine,
          };
          AddHist(row.CCCD, [newHistory, ...historyList]);
          setHistoryList([newHistory, ...historyList]);
          setAddHistoryFormOpen(false);
        },
      }}
      // sx={{ width: "100%", maxWidth: "1000px" }}
    >
      <DialogTitle>Thêm lần khám bệnh</DialogTitle>
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

            <Grid item xs={1} sm={3} md={8}>
              <TextField
                margin="dense"
                id="doctor"
                name="doctor"
                label="Bác sĩ phụ trách"
                type="text"
                fullWidth
                variant="standard"
              />
            </Grid>
            <Grid item xs={1} sm={3} md={4}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <FormControl
                  sx={{ minWidth: 120, marginTop: "17px" }}
                  size="small"
                >
                  <DatePicker
                    required
                    size="small"
                    label="Ngày khám"
                    id="date"
                    name="date"
                    // sx={{ padding: 0 }}
                    format="DD/MM/YYYY"
                  ></DatePicker>
                </FormControl>
              </LocalizationProvider>{" "}
            </Grid>
            <Grid item xs={1} sm={3} md={12}>
              <TextField
                margin="dense"
                id="disease"
                name="disease"
                label="Chuẩn đoán"
                type="text"
                fullWidth
                variant="standard"
              />
            </Grid>
            <Grid item xs={1} sm={1} md={3}>
              <Button
                onClick={() => {
                  setAddMedicineListFormOpen(true);
                }}
              >
                Thêm đơn thuốc
              </Button>
              {/* DialogMedicineList */}
              <DialogMedicineListAdd
                setAddMedicineListFormOpen={setAddMedicineListFormOpen}
                // Add_Med={Add_Med}
                listNewMedicine={listNewMedicine}
                setListNewMedicine={setListNewMedicine}
                CCCD={row.CCCD}
                addMedicineListFormOpen={addMedicineListFormOpen}
              ></DialogMedicineListAdd>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setAddHistoryFormOpen(false)}>hủy</Button>
        <Button type="submit">Xác nhận</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogHistoryAdd;
