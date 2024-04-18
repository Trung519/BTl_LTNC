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
import { toast } from "react-toastify";

const DialogAdd = (props) => {
  const {
    newFormOpen,
    handleCloseNewFormOpen,
    // createPatient,
    setNewPatientsAndRender,
    newPatients,
  } = props;
  const [newGender, setNewGender] = React.useState("");
  // const [fullName, setfullname] = React.useState("");
  // const [birthDay, setBirthDay] = React.useState(null);
  const [CCCD, setCCCD] = React.useState("");
  // const [BHYT, setBHYT] = React.useState(0);
  const handleChangeGender = (event) => {
    setNewGender(event.target.value);
  };
  const handle_CCCD = (event) => {
    setCCCD(event.target.value);
  };
  // const handle_Date = (event) => {
  //   setBirthDay(event);
  // };
  // const handle_CCCD = (e) => {
  //   if (/^0\d*$/.test(e.target.value) && e.target.value.length <= 12) {
  //     setCCCD(e.target.value);
  //   }
  // };
  // const handle_BHYT = (event) => {
  //   setBHYT(event.target.value);
  // };
  const checkCCCD = (CCCD) => {
    if (/^0\d{11}$/.test(CCCD)) return 1;
    else return 0;
  };
  console.log("re-render, DialogAdd");
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
          // console.log("birthDay", formJson.birthDay);
          if (checkCCCD(formJson.CCCD)) {
            AddData(
              formJson.fullName,
              formJson.birthDay,
              formJson.gender,
              formJson.CCCD,
              formJson.BHYT,
              formJson.address
            );
            toast.success("Thêm bệnh nhân thành công !", {
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
            const newPatient = {
              fullName: formJson.fullName,
              birthDay: formJson.birthDay,
              gender: formJson.gender,
              CCCD: formJson.CCCD,
              BHYT: formJson.BHYT,
              address: formJson.address,
            };
            console.log("newPatient", newPatient);
            setNewPatientsAndRender([newPatient, ...newPatients]);
            handleCloseNewFormOpen();
          } else {
            setCCCD("");
            toast.error("CCCD không đúng định dạng !", {
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
          }
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
                // onChange={handle_Name}
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
                    // onChange={handle_Date}
                    // {...props}
                    // slots={{
                    //   textField: (textFieldProps) => (
                    //     <CustomTextField {...textFieldProps} />
                    //   ),
                    // }}
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
                  // defaultValue={""}
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
                // inputProps={{ inputMode: "numeric" }}
                value={CCCD}
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
                // onChange={handle_BHYT}
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
