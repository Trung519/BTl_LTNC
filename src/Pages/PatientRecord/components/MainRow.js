import * as React from "react";
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
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
// import Stack from "@mui/material/Stack"
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
import { Patients } from "../P_R_be";
import HistoryRow from "./HistoryRow";
import { patients } from "../PatientRecord";
import { AddData, AddHist, Add_Med } from "../P_R_be";

function MainRow(props) {
  const { row, setNewPatientsAndRender } = props;
  console.log("1", row);
  React.useEffect(() => {
    Patients().then((post) => {
      if (post != null) {
        console.log("Hellobabe", post);
        patients = [post] ?? [];
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
  function DialogAddMedicineList({
    listNewMedicine,
    setListNewMedicine,
    CCCD,
  }) {
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
                    AddHist(
                      formJson.CCCD,
                      formJson.date,
                      formJson.doctor,
                      formJson.disease
                    );
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

export default MainRow;
