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
import FormControl from "@mui/material/FormControl";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import MenuItem from "@mui/material/MenuItem";
import { AddData } from "../P_R_be";
const DialogAdd = (props) => {
  const {
    newFormOpen,
    handleCloseNewFormOpen,
    createPatient,
    setNewPatientsAndRender,
    newPatients,
    handle_Name,
    handle_Date,
    newGender,
    handleChangeGender,
    handle_CCCD,
    handle_BHYT,
  } = props;
  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={newFormOpen}
      onClose={handleCloseNewFormOpen}
      PaperProps={{
        component: "form",
        onSubmit: (event) => {
          event.preventDefault();

          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries(formData.entries());
          // cách lấy data
          AddData(
            formJson.fullName,
            formJson.birthDay,
            formJson.gender,
            formJson.CCCD,
            formJson.BHYT
          );
          // console.log(String.valueOf(patients.length + 1));

          const newPatient = {
            fullName: formJson.fullName,
            birthDay: formJson.birthDay,
            gender: formJson.gender,
            CCCD: formJson.CCCD,
            BHYT: formJson.BHYT,
          };
          console.log("newPatient", newPatient);
          //xu li add database
          // setRenderPatientList((prev) => [newPatient, ...prev]);
          setNewPatientsAndRender([newPatient, ...newPatients]);
          // newPatient = [newPatient, ...patients];
          handleCloseNewFormOpen();
        },
      }}
    >
      <DialogTitle>Thêm hồ sơ bệnh án</DialogTitle>
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
                required
                margin="dense"
                id="fullName"
                name="fullName"
                label="Họ và tên"
                type="text"
                fullWidth
                variant="standard"
                onChange={handle_Name}
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
                    id="birthDay"
                    name="birthDay"
                    label="Ngày sinh"
                    onChange={handle_Date}
                    renderInput={(params) => <TextField {...params} />}
                    format="DD/MM/YYYY"
                  ></DatePicker>
                </FormControl>
              </LocalizationProvider>{" "}
            </Grid>
            <Grid item xs={0.5} sm={1} md={3}>
              <FormControl
                sx={{ minWidth: 120, marginTop: "17px" }}
                size="small"
              >
                <InputLabel>Giới tính</InputLabel>
                <Select
                  // autoWidth
                  // labelId="demo-select-small"
                  required
                  sx={{ height: "56" }}
                  id="gender"
                  name="gender"
                  label="Giới tính"
                  value={newGender}
                  onChange={handleChangeGender}
                >
                  <MenuItem value={"Nam"}>Nam</MenuItem>
                  <MenuItem value={"Nữ"}>Nữ</MenuItem>
                  <MenuItem value={"Khác"}>Khác</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={1} sm={2} md={4.5}>
              <TextField
                // autoFocus
                required
                margin="dense"
                id="CCCD"
                name="CCCD"
                label="Số CCCD"
                type="text"
                onChange={handle_CCCD}
                // inputProps={{ min: 0, style: { textAlign: "left" } }}
                fullWidth
                // size="medium"
                variant="standard"
              ></TextField>
            </Grid>
            <Grid item xs={1} sm={2} md={4.5}>
              <TextField
                // autoFocus
                // required
                margin="dense"
                id="BHYT"
                name="BHYT"
                label="Số BHYT"
                type="text"
                onChange={handle_BHYT}
                // inputProps={{ min: 0, style: { textAlign: "left" } }}
                fullWidth
                // size="medium"
                variant="standard"
              />
            </Grid>

            <Grid item xs={1} sm={3} md={12}>
              <TextField
                autoFocus
                // required
                margin="dense"
                id="address"
                name="address"
                label="Địa chỉ"
                type="text"
                // inputProps={{ min: 0, style: { textAlign: "left" } }}
                fullWidth
                // size="medium"
                variant="standard"
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseNewFormOpen}>hủy</Button>
        <Button type="submit">Xác nhận</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogAdd;
