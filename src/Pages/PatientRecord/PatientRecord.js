import * as React from "react";
// import styles from "./CollapsibleTable.module.css";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Autocomplete from "@mui/material/Autocomplete";
// import Stack from "@mui/material/Stack"
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloseIcon from "@mui/icons-material/Close";
import { AddData, AddHist, Add_Med } from "./P_R_be";
import { Patients } from "./P_R_be";
import { formToJSON } from "axios";
import { ContactPageSharp } from "@mui/icons-material";

let patients = [];

function createPatient(

  STT = patients.length + 1,
  patientID = `BN${patients.length + 100}`,
  fullName,
  gender,
  CCCD,
  BHYT,
  BirthDay,
  address = "",
  history = []
) {
  return {
    STT,
    patientID,
    fullName,
    gender,
    CCCD,
    BHYT,
    BirthDay,
    address,
    history,
  };
}
// HistoryRowCustom
function HistoryRow(props) { //lịch sử khám
  const { historyRow } = props;
  const [medicineListDialogOpen, setMedicineListDialogOpen] =
    React.useState(false);
  const handleClose = () => {
    setMedicineListDialogOpen(false);
  };
  return (
    <TableRow key={historyRow.historyID}>
      <TableCell component="th" scope="row">
        {historyRow.date}
      </TableCell>
      <TableCell>{historyRow.doctor}</TableCell>
      <TableCell>{historyRow.disease}</TableCell>
      <TableCell>
        <Button
          variant="text"
          onClick={() => {
            setMedicineListDialogOpen(!medicineListDialogOpen);
          }}
        >
          Xem
        </Button>
        {/* DialogMedicineList */}
        <Dialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={medicineListDialogOpen}
          fullWidth
          maxWidth="md"
        >
          <DialogTitle sx={{ m: 0, p: 2 }}>Đơn thuốc</DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
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
                  {historyRow.medicineList.map((row) => (
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
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Xong
            </Button>
          </DialogActions>
        </Dialog>
      </TableCell>
    </TableRow>
  );
}
// RowCustom
function Row(props) {
  React.useEffect(() => {
    Patients().then((post) => {
      if (post != null) {
        console.log('Hellobabe', post);
        patients=[post]??[];
      }
    });
  }, []);
  console.log(patients);
  const handleCloseFormOpen = () => {
    setInfoFormOpen(false);
    setmodifyFormOpen(false);
    setAddHistoryFormOpen(false);
    setAddMedicineListFormOpen(false);
  };
  const {
    row,
    index,
    setNewPatients,
    setNewPatientsAndRender,
    newPatients,
    setRenderPatientList,
  } = props;
  const [historyList, setHistoryList] = React.useState(row.history);
  const [listNewMedicine, setListNewMedicine] = React.useState([]);
  const [openSubRow, setOpenSubRow] = React.useState(false);
  const [addHistoryFormOpen, setAddHistoryFormOpen] = React.useState(false);
  const [infoFormOpen, setInfoFormOpen] = React.useState(false);
  const [modifyFormOpen, setmodifyFormOpen] = React.useState(false);
  const [addMedicineListFormOpen, setAddMedicineListFormOpen] =
    React.useState(false);

  const [newGender, setNewGender] = React.useState(row.gender);
  React.useEffect(() => {
    setHistoryList(row.history);
    setNewGender(row.gender);
  }, [row.history, row.gender]);
  const handleChangeGender = (event) => {
    setNewGender(event.target.value);
  };
  // const indexInPatients = () => {
  //   // console.log(row.STT);
  //   return patients.findIndex((e) => {
  //     return e.STT == row.STT;
  //   });
  // };
  const indexInPatients = patients.findIndex((e) => {
    return e.STT === row.STT;
  });
  function DialogAddMedicineList({ listNewMedicine, setListNewMedicine, CCCD }) {
    const [medicineAddList, setMedicineAddList] =
      React.useState(listNewMedicine);
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
              Add_Med(CCCD, nameValue.current.value, usageValue.current.value, dosageValue.current.value, unitValue.current.value)
              setListNewMedicine(medicineAddList);
              setAddMedicineListFormOpen(false);
            }}
          >
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpenSubRow(!openSubRow)}
          >
            {openSubRow ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{row.STT}</TableCell>
        <TableCell>{row.patientID}</TableCell>
        <TableCell align="left">{row.fullName}</TableCell>
        <TableCell>{row.gender}</TableCell>
        <TableCell>{row.CCCD}</TableCell>
        <TableCell>{row.BHYT}</TableCell>
        <TableCell>{row.BirthDay}</TableCell>
        <TableCell>
          <IconButton
            aria-label="info"
            size="small"
            color="info"
            onClick={() => {
              setInfoFormOpen(!infoFormOpen);
            }}
          >
            <InfoOutlinedIcon></InfoOutlinedIcon>
          </IconButton>
          {/* DialogInfo */}
          <Dialog
            fullWidth
            maxWidth="sm"
            open={infoFormOpen}
            onClose={handleCloseFormOpen}
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
                      <InputLabel id="demo-select-small-label">
                        Giới tính
                      </InputLabel>
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
              <Button onClick={handleCloseFormOpen}>hủy</Button>
            </DialogActions>
          </Dialog>
          <IconButton
            aria-label="edit"
            size="small"
            onClick={() => setmodifyFormOpen(!modifyFormOpen)}
          >
            <EditOutlinedIcon></EditOutlinedIcon>
          </IconButton>
          {/* DialogModify */}
          <Dialog
            fullWidth
            maxWidth="sm"
            open={modifyFormOpen}
            onClose={handleCloseFormOpen}
            PaperProps={{
              component: "form",
              onSubmit: (event) => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                const formJson = Object.fromEntries(formData.entries());
                patients[indexInPatients] = {
                  ...patients[indexInPatients],
                  fullName: formJson.fullName,
                  gender: formJson.gender,
                  CCCD: formJson.CCCD,
                  BHYT: formJson.BHYT,
                  birthDay: formJson.birthDay,
                  address: formJson.address,
                };
                // console.log(patients[index]);
                setNewPatientsAndRender([...patients]);
                // setRenderPatientList(patients[indexInPatients])
                // console.log(patients);
                handleCloseFormOpen();
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
                      defaultValue={row.CCCD}
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
              <Button onClick={handleCloseFormOpen}>hủy</Button>
              <Button type="submit">Xác nhận</Button>
            </DialogActions>
          </Dialog>
          <IconButton
            aria-label="delete"
            size="small"
            color="error"
            onClick={() => {
              // const temp=newPatients.filter(patien)
              patients.splice(indexInPatients, 1);
              setNewPatientsAndRender([...patients]);
            }}
          >
            <DeleteOutlineIcon></DeleteOutlineIcon>
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={openSubRow} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1, display: "inline" }}>
              <Typography
                variant="h6"
                gutterBottom
                component="div"
                sx={{ display: "inline" }}
              >
                Lịch sử khám
              </Typography>
              <IconButton
                aria-label="add"
                size="small"
                color="success"
                onClick={() => setAddHistoryFormOpen(!addHistoryFormOpen)}
              >
                <AddCircleIcon></AddCircleIcon>
              </IconButton>
              {/* DialogHistoryAdd */}
              <Dialog
                fullWidth
                maxWidth="sm"
                open={addHistoryFormOpen}
                onClose={handleCloseFormOpen}
                PaperProps={{
                  component: "form",
                  onSubmit: (event) => {
                    event.preventDefault();

                    const formData = new FormData(event.currentTarget);
                    const formJson = Object.fromEntries(formData.entries());
                    AddHist(formJson.CCCD, formJson.date, formJson.doctor, formJson.disease)
                    const newHistory = {
                      historyID: historyList.length + 1,
                      date: formJson.date,
                      doctor: formJson.doctor,
                      disease: formJson.disease,
                      medicineList: listNewMedicine,
                    };
                    setHistoryList([newHistory, ...historyList]);

                    setListNewMedicine([]);

                    handleCloseFormOpen();
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
                          <InputLabel id="demo-select-small-label">
                            Giới tính
                          </InputLabel>
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
                        <DialogAddMedicineList
                          listNewMedicine={listNewMedicine}
                          setListNewMedicine={setListNewMedicine}
                          CCCD={row.CCCD}
                        ></DialogAddMedicineList>
                      </Grid>
                    </Grid>
                  </Box>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseFormOpen}>hủy</Button>
                  <Button type="submit">Xác nhận</Button>
                </DialogActions>
              </Dialog>

              <Table size="small" aria-label="history">
                <TableHead>
                  <TableRow>
                    <TableCell>Ngày</TableCell>
                    <TableCell>Bác sĩ phụ trách</TableCell>
                    <TableCell>Chẩn đoán</TableCell>
                    <TableCell>Đơn thuốc</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {historyList.map((historyRow) => {
                    // console.log(historyRow);
                    return (
                      <HistoryRow
                        key={historyRow.historyID}
                        historyRow={historyRow}
                      ></HistoryRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    patientID: PropTypes.string.isRequired,
    CCCD: PropTypes.string.isRequired,
    fullName: PropTypes.string.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.string.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    ).isRequired,
    STT: PropTypes.number.isRequired,
    BHYT: PropTypes.string.isRequired,
    BirthDay: PropTypes.string.isRequired,
  }).isRequired,
};
//danh sach patients ban dau
//   createPatient(
//     10,
//     "BN109",
//     "Nguyễn Văn A",
//     "Nam",
//     "0000000000",
//     "0000000000",
//     "23/01/2004",
//     "",
//     [
//       {
//         historyID: 1,
//         date: "01/02/2023",
//         doctor: "AB",
//         disease: "Cúm mùa",
//         medicineList: [
//           {
//             medicine: "Panadol",
//             usage: "uống sau khi ăn",
//             dosagePerDay: "1 ngày 2 lần",
//             unit: "20 viên/10 ngày",
//           },
//           {
//             medicine: "paracetamol",
//             usage: "uống sau khi ăn",
//             dosagePerDay: "1 ngày 2 lần",
//             unit: "20 viên/10 ngày",
//           },
//         ],
//       },
//       {
//         historyID: 2,
//         date: "01/02/2023",
//         doctor: "AB",
//         disease: "Cúm mùa",
//         medicineList: [
//           {
//             medicine: "Panadol",
//             usage: "uống sau khi ăn",
//             dosagePerDay: "1 ngày 2 lần",
//             unit: "20 viên/10 ngày",
//           },
//         ],
//       },
//     ]
//   ),
//   createPatient(
//     9,
//     "BN108",
//     "AAAAAAAAAAAAAAA",
//     "Nữ",
//     "1111111111111",
//     "11111111111",
//     "01/01/2004",
//     ""
//   ),
//   createPatient(
//     8,
//     "BN107",
//     "BBBBBBBBBBBBBBBBB",
//     "Nam",
//     "2222222222222",
//     "22222222222",
//     "01/01/2004"
//   ),
//   createPatient(
//     7,
//     "BN106",
//     "CCCCCCCCCCC",
//     "Nam",
//     "333333333333333",
//     "3333333333333",
//     "01/01/2004"
//   ),
//   createPatient(
//     6,
//     "BN105",
//     "DDDDDDDDDDD",
//     "Nam",
//     "4444444444",
//     "444444444444",
//     "01/01/2004"
//   ),
//   createPatient(
//     5,
//     "BN104",
//     "EEEEEEEEE",
//     "Nam",
//     "55555555",
//     "5555555",
//     "01/01/2004"
//   ),
//   createPatient(
//     4,
//     "BN103",
//     "FFFFFF",
//     "Nam",
//     "666666666",
//     "666666666",
//     "01/01/2004"
//   ),
//   createPatient(
//     3,
//     "BN102",
//     "GGGGGGGGGG",
//     "Nam",
//     "77777777777",
//     "7777777777777",
//     "01/01/2004"
//   ),
//   createPatient(
//     2,
//     "BN101",
//     "HHHHHHHHHH",
//     "Nam",
//     "888888888",
//     "88888888888",
//     "01/01/2004"
//   ),
//   createPatient(
//     1,
//     "BN100",
//     "IIIIIIIIII",
//     "Nam",
//     "999999999",
//     "9999999999999",
//     "01/01/2004"
//   ),
// ];

export default function PatientRecord() {
  const [newFormOpen, setNewFormOpen] = React.useState(false);
  const [newGender, setNewGender] = React.useState("");
  const [renderPatientList, setRenderPatientList] = React.useState(patients);//Render ra những thứ cần render
  const [newPatients, setNewPatients] = React.useState(patients);//Có tác dụng giống với patients bên ngoài
  const [fullName, setfullname] = React.useState("");
  const [birthDay, setBirthDay] = React.useState(null);
  const [CCCD, setCCCD] = React.useState(0);
  const [BHYT, setBHYT] = React.useState(0);

  //const [tableData, setTableData] = React.useState([]);

  // React.useEffect(() => {
  //     // Fetch data from Table_Body component
  //     setTableData(Table_Body());
  // }, []);
  const handle_Name = (event) => {
    setfullname(event.target.value);
  };
  const handle_Date = (event) => {
    setBirthDay(event);
  }
  const handle_CCCD = (event) => {
    setCCCD(event.target.value);
  }
  const handle_BHYT = (event) => {
    setBHYT(event.target.value);
  }
  React.useEffect(() => {
    patients = newPatients;
    
  }, [newPatients]);
  const setNewPatientsAndRender = (newPatients) => {
    setNewPatients([...newPatients]);
    setRenderPatientList([...newPatients]);
  };
  const handleChangeGender = (event) => {
    setNewGender(event.target.value);
  };
  const handleClickNewFormOpen = () => {
    setNewFormOpen(true);
  };

  const handleCloseNewFormOpen = () => {
    setNewFormOpen(false);
  };
  return (
    <Paper elevation={3} sx={{ m: 1 }}>
      <Box sx={{ flexGrow: 1, marginRight: "10px" }}>
        <Grid
          container
          spacing={{ xs: 1, md: 2 }}
          columns={{ xs: 1, sm: 4, md: 12 }}
        >
          <Grid item xs={1} sm={1.5} md={2} sx={{ margin: "15px 0 0 10px" }}>
            <Typography
              variant="h5"
              // gutterBottom
              component="div"
              sx={{
                display: "inline-block",
              }}
            >
              HỒ SƠ BỆNH ÁN
            </Typography>
          </Grid>
          <Grid item xs={1} sm={0.5} md={0.7}>
            <Button
              variant="contained"
              color="success"
              sx={{ margin: "13px 0 0 13px" }}
              onClick={handleClickNewFormOpen}
            >
              Thêm
            </Button>

            {/* DialogAdd */}
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
                  AddData(formJson.fullName, formJson.birthDay, formJson.gender, formJson.CCCD, formJson.BHYT);
                  // console.log(String.valueOf(patients.length + 1));

                  const newPatient = createPatient(
                    // "100",
                    undefined,
                    undefined,

                    formJson.fullName,
                    formJson.gender,
                    formJson.CCCD,
                    formJson.BHYT,
                    formJson.birthDay,
                    formJson.address
                  );
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
                <Button type="submit" >Xác nhận</Button>
              </DialogActions>
            </Dialog>
          </Grid>
          <Grid item xs={1} sm={2} md={3}>
            {/* Tìm kiếm theo họ tên */}
            <Autocomplete
              onChange={(event, value) => {
                if (value === null) setRenderPatientList(patients);
                else setRenderPatientList([value]);
              }}
              sx={{ width: 300, marginLeft: "15px" }}
              options={patients}
              getOptionLabel={(option) => option.fullName}
              id="fullname_search"
              clearOnEscape
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Tìm kiếm theo họ tên"
                  variant="standard"
                />
              )}
            />
          </Grid>
          <Grid item xs={1} sm={2} md={3}>
            <Autocomplete
              onChange={(event, value) => {
                if (value === null) setRenderPatientList(patients);
                else setRenderPatientList([value]);
              }}
              sx={{ width: 300 }}
              options={patients}
              getOptionLabel={(option) => option.CCCD}
              id="fullname_search"
              clearOnEscape
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Tìm kiếm theo số CCCD"
                  variant="standard"
                />
              )}
            />
          </Grid>
          <Grid item xs={1} sm={2} md={3}>
            <Autocomplete
              onChange={(event, value) => {
                if (value === null) setRenderPatientList(patients);
                else setRenderPatientList([value]);
              }}
              sx={{ width: 300 }}
              options={patients}
              getOptionLabel={(option) => option.BHYT}
              id="fullname_search"
              clearOnEscape
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Tìm kiếm theo số BHYT"
                  variant="standard"
                />
              )}
            />
          </Grid>
        </Grid>
      </Box>
      <Divider variant="middle" sx={{ m: 3 }} />
      <Paper elevation={0} sx={{ marginLeft: 1 }}>
        <TableContainer sx={{ maxHeight: 480, overflowY: "scroll" }}>
          <Table stickyHeader>
            <colgroup>
              <col style={{ width: "5%" }} />
              <col style={{ width: "5%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "23%" }} />
              <col style={{ width: "10%" }} />
              <col style={{ width: "10%" }} />
              <col style={{ width: "10%" }} />
            </colgroup>
            <TableHead>
              <TableRow>
                <TableCell sx={{ bgcolor: "#08107D" }} />
                <TableCell
                  sx={{
                    color: "#ffffff",
                    bgcolor: "#08107D",
                    fontSize: "18px",
                  }}
                >
                  ID
                </TableCell>
                <TableCell
                  sx={{
                    color: "#ffffff",
                    bgcolor: "#08107D",
                    fontSize: "18px",
                  }}
                >
                  Mã BN
                </TableCell>
                <TableCell
                  sx={{
                    color: "#ffffff",
                    bgcolor: "#08107D",
                    fontSize: "18px",
                  }}
                  align="left"
                >
                  Họ và tên
                </TableCell>
                <TableCell
                  sx={{
                    color: "#ffffff",
                    bgcolor: "#08107D",
                    fontSize: "18px",
                  }}
                >
                  Giới tính
                </TableCell>
                <TableCell
                  sx={{
                    color: "#ffffff",
                    bgcolor: "#08107D",
                    fontSize: "18px",
                  }}
                >
                  CCCD
                </TableCell>
                <TableCell
                  sx={{
                    color: "#ffffff",
                    bgcolor: "#08107D",
                    fontSize: "18px",
                  }}
                >
                  BHYT
                </TableCell>
                <TableCell
                  sx={{
                    color: "#ffffff",
                    bgcolor: "#08107D",
                    fontSize: "18px",
                  }}
                >
                  Ngày sinh
                </TableCell>
                <TableCell sx={{ bgcolor: "#08107D" }} />
              </TableRow>
            </TableHead>
            <TableBody>
              {renderPatientList.map((row, index) => {
                return (
                  <Row
                    key={row.id}
                    row={row}
                    index={index}
                    setNewPatients={setNewPatients} //để cho tác vụ tìm kiếm 
                    setNewPatientsAndRender={setNewPatientsAndRender}
                    newPatient={newPatients}
                    setRenderPatientList={setRenderPatientList}
                  />
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Paper>
  );
}