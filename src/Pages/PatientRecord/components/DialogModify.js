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
import { UpdateData } from "../P_R_be";
import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

const DialogModify = (props) => {
  const {
    modifyFormOpen,
    newPatients,
    // patients,
    indexInPatients,
    setNewPatientsAndRender,
    row,
    newGender,
    handleChangeGender,
    setmodifyFormOpen,
  } = props;
  const handleErrorDate = (date) => {
    var initial = date.split(/\//);
    return [initial[1], initial[0], initial[2]].join("/"); //=> 'mm/dd/yyyy'
  };
  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={modifyFormOpen}
      onClose={() => {
        setmodifyFormOpen(false);
      }}
      PaperProps={{
        component: "form",
        onSubmit: (event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries(formData.entries());
          console.log(indexInPatients);
          console.log(newPatients);

          newPatients[indexInPatients] = {
            ...newPatients[indexInPatients],
            fullName: formJson.fullName,
            gender: formJson.gender,
            CCCD: formJson.CCCD,
            BHYT: formJson.BHYT,
            birthDay: formJson.birthDay,
            address: formJson.address,
          };
          UpdateData(
            formJson.fullName,
            formJson.birthDay,
            formJson.gender,
            formJson.CCCD,
            formJson.BHYT
          );
          // console.log(patients[index]);
          setNewPatientsAndRender([...newPatients]);
          // setRenderPatientList(patients[indexInPatients])
          // console.log(patients);
          setmodifyFormOpen(false);
          toast.success("Cập nhật thành công !", {
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
        },
      }}
      // sx={{ width: "100%", maxWidth: "1000px" }}
    >
      <DialogTitle>Chỉnh sửa hồ sơ bệnh án</DialogTitle>
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
                defaultValue={row.fullName}
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
                    id="birthDay"
                    name="birthDay"
                    label="Ngày sinh"
                    // sx={{ padding: 0 }}
                    format="DD/MM/YYYY"
                    value={dayjs(handleErrorDate(row.birthDay))}
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
                // inputProps={{ min: 0, style: { textAlign: "left" } }}
                fullWidth
                value={row.CCCD}
                // size="medium"
                variant="standard"
                InputProps={{
                  readOnly: true,
                }}
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
                defaultValue={row.BHYT}
                type="text"
                // inputProps={{ min: 0, style: { textAlign: "left" } }}
                fullWidth
                // size="medium"
                variant="standard"
              />
            </Grid>

            <Grid item xs={1} sm={3} md={12}>
              <TextField
                // autoFocus
                // required
                margin="dense"
                id="address"
                name="address"
                defaultValue={row.address}
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
        <Button
          onClick={() => {
            setmodifyFormOpen(false);
          }}
        >
          hủy
        </Button>
        <Button type="submit">Xác nhận</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogModify;
