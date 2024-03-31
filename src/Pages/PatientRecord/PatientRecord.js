import * as React from "react";
// import styles from "./CollapsibleTable.module.css";
import PropTypes from "prop-types";
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
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloseIcon from "@mui/icons-material/Close";
import dayjs from "dayjs";
function createData(STT, patientID, fullName, gender, CCCD, BHYT, BirthDay) {
  return {
    STT,
    patientID,
    fullName,
    gender,
    CCCD,
    BHYT,
    BirthDay,
    address: "abc",
    history: [
      {
        historyID: "1",
        date: "01/02/2023",
        doctor: "AB",
        disease: "Cúm mùa",
        medicineList: [
          {
            medicine: "Panadol",
            usage: "uống sau khi ăn",
            dosagePerDay: "1 ngày 2 lần",
            unit: "20 viên/10 ngày",
          },
          {
            medicine: "paracetamol",
            usage: "uống sau khi ăn",
            dosagePerDay: "1 ngày 2 lần",
            unit: "20 viên/10 ngày",
          },
        ],
      },
      {
        historyID: "2",
        date: "01/02/2023",
        doctor: "AB",
        disease: "Cúm mùa",
        medicineList: [
          {
            medicine: "Panadol",
            usage: "uống sau khi ăn",
            dosagePerDay: "1 ngày 2 lần",
            unit: "20 viên/10 ngày",
          },
        ],
      },
    ],
  };
}
// HistoryRowCustome
function HistoryRow(props) {
  const { historyRow } = props;
  const [medicineListDialogOpen, setMedicineListDialogOpen] =
    React.useState(false);
  const handleClose = () => {
    setMedicineListDialogOpen(false);
  };
  return (
    <TableRow key={historyRow.date}>
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
// RowCustome
function Row(props) {
  const handleCloseFormOpen = () => {
    setInfoFormOpen(false);
    setmodifyFormOpen(false);
    setAddHistoryFormOpen(false);
  };
  const { row } = props;
  const [openSubRow, setOpenSubRow] = React.useState(false);
  const [addHistoryFormOpen, setAddHistoryFormOpen] = React.useState(false);
  const [infoFormOpen, setInfoFormOpen] = React.useState(false);
  const [modifyFormOpen, setmodifyFormOpen] = React.useState(false);
  const [newGender, setNewGender] = React.useState(row.gender);

  const handleChangeGender = (event) => {
    setNewGender(event.target.value);
  };
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
              onSubmit: (event) => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                const formJson = Object.fromEntries(formData.entries());
                const email = formJson.email;
                console.log(email);
                handleCloseFormOpen();
              },
            }}
            // sx={{ width: "100%", maxWidth: "1000px" }}
          >
            <DialogTitle>Thông tin hồ sơ bệnh án</DialogTitle>
            <DialogContent>
              <DialogContentText></DialogContentText>

              <Box
                // direction="row"
                // // divider={<Divider orientation="vertical" flexItem />}
                // spacing={2}
                display={"flex"}
                flexWrap={"wrap"}
                justifyContent={"space-between"}
                // flexDirection={}
              >
                <Box display={"inline"} sx={{ width: "60%" }}>
                  <TextField
                    // disabled
                    // autoFocus
                    margin="dense"
                    id="fullName"
                    name="fullname"
                    label="Họ và tên"
                    type="text"
                    fullWidth
                    value={row.fullName}
                    variant="standard"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Box>
                <Box
                  display={"inline"}
                  sx={{ width: "30%", minWidth: "120px" }}
                >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      readOnly
                      size="small"
                      label="Ngày sinh"
                      // sx={{ padding: 0 }}
                      format="DD/MM/YYYY"
                      value={dayjs(row.BirthDay)}
                    ></DatePicker>
                  </LocalizationProvider>{" "}
                </Box>

                <Box
                  display={"inline"}
                  sx={{ width: "35%", minWidth: "150px" }}
                >
                  <TextField
                    // autoFocus
                    // required
                    // disabled
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
                </Box>
                <Box
                  display={"inline"}
                  sx={{ width: "35%", minWidth: "150px" }}
                >
                  <TextField
                    autoFocus
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
                </Box>
                <FormControl
                  sx={{ m: 1, minWidth: 120, marginTop: "17px" }}
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
                <Box display={"inline"} sx={{ width: "100%" }}>
                  <TextField
                    autoFocus
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
                </Box>
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
                // cách lấy data
                const newPatient = createData(
                  "1",
                  "100",
                  formJson.fullName,
                  formJson.gender,
                  formJson.CCCD,
                  formJson.BHYT,
                  formJson.birthDay
                );
                console.log(newPatient);

                handleCloseFormOpen();
              },
            }}
            // sx={{ width: "100%", maxWidth: "1000px" }}
          >
            <DialogTitle>Chỉnh sửa hồ sơ bệnh án</DialogTitle>
            <DialogContent>
              <DialogContentText></DialogContentText>

              <Box
                // direction="row"
                // // divider={<Divider orientation="vertical" flexItem />}
                // spacing={2}
                display={"flex"}
                flexWrap={"wrap"}
                justifyContent={"space-between"}
                // flexDirection={}
              >
                <Box display={"inline"} sx={{ width: "60%" }}>
                  <TextField
                    // disabled
                    // autoFocus
                    margin="dense"
                    id="fullName"
                    name="fullName"
                    label="Họ và tên"
                    type="text"
                    fullWidth
                    defaultValue={row.fullName}
                    variant="standard"
                    // InputProps={{
                    //   readOnly: true,
                    // }}
                  />
                </Box>
                <Box
                  display={"inline"}
                  sx={{ width: "30%", minWidth: "120px" }}
                >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      // readOnly
                      size="small"
                      label="Ngày sinh"
                      id="birthDay"
                      name="birthDay"
                      // sx={{ padding: 0 }}
                      format="DD/MM/YYYY"
                      defaultValue={dayjs(row.BirthDay)}
                    ></DatePicker>
                  </LocalizationProvider>{" "}
                </Box>

                <Box
                  display={"inline"}
                  sx={{ width: "35%", minWidth: "150px" }}
                >
                  <TextField
                    // autoFocus
                    // required
                    // disabled
                    margin="dense"
                    id="CCCD"
                    name="CCCD"
                    label="Số CCCD"
                    type="text"
                    fullWidth
                    defaultValue={row.CCCD}
                    variant="standard"
                    // InputProps={{
                    //   readOnly: true,
                    // }}
                  />
                </Box>
                <Box
                  display={"inline"}
                  sx={{ width: "35%", minWidth: "150px" }}
                >
                  <TextField
                    autoFocus
                    margin="dense"
                    id="BHYT"
                    name="BHYT"
                    label="Số BHYT"
                    type="text"
                    fullWidth
                    defaultValue={row.BHYT}
                    variant="standard"
                    // InputProps={{
                    //   readOnly: true,
                    // }}
                  />
                </Box>
                <FormControl
                  sx={{ m: 1, minWidth: 120, marginTop: "17px" }}
                  size="small"
                >
                  <InputLabel id="demo-select-small-label">
                    Giới tính
                  </InputLabel>
                  <Select
                    // displayEmpty
                    // readOnly
                    labelId="demo-select-small"
                    id="gender"
                    name="gender"
                    // defaultValue={row.gender}
                    label="Giới tính"
                    value={newGender}
                    onChange={handleChangeGender}
                  >
                    <MenuItem value={"Nam"}>Nam</MenuItem>
                    <MenuItem value={"Nữ"}>Nữ</MenuItem>
                    <MenuItem value={"Khác"}>Khác</MenuItem>
                  </Select>
                </FormControl>
                <Box display={"inline"} sx={{ width: "100%" }}>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="address"
                    name="address"
                    label="Địa chỉ"
                    type="text"
                    fullWidth
                    defaultValue={row.address}
                    variant="standard"
                    // InputProps={{
                    //   readOnly: true,
                    // }}
                  />
                </Box>
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
            // onClick={() => setOpen(!open)}
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
                    // cách lấy data
                    const newPatient = createData(
                      "1",
                      "100",
                      formJson.fullName,
                      formJson.gender,
                      formJson.CCCD,
                      formJson.BHYT,
                      formJson.birthDay
                    );
                    console.log(newPatient);

                    handleCloseFormOpen();
                  },
                }}
                // sx={{ width: "100%", maxWidth: "1000px" }}
              >
                <DialogTitle>Thêm Lần Khám</DialogTitle>
                <DialogContent>
                  <DialogContentText></DialogContentText>

                  <Box
                    // direction="row"
                    // // divider={<Divider orientation="vertical" flexItem />}
                    // spacing={2}
                    display={"flex"}
                    flexWrap={"wrap"}
                    justifyContent={"space-between"}
                    // flexDirection={}
                  >
                    <Box display={"inline"} sx={{ width: "60%" }}>
                      <TextField
                        // disabled
                        // autoFocus
                        margin="dense"
                        id="fullName"
                        name="fullName"
                        label="Họ và tên"
                        type="text"
                        fullWidth
                        defaultValue={row.fullName}
                        variant="standard"
                        // InputProps={{
                        //   readOnly: true,
                        // }}
                      />
                    </Box>
                    <Box
                      display={"inline"}
                      sx={{ width: "30%", minWidth: "120px" }}
                    >
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          // readOnly
                          size="small"
                          label="Ngày sinh"
                          id="birthDay"
                          name="birthDay"
                          // sx={{ padding: 0 }}
                          format="DD/MM/YYYY"
                          defaultValue={dayjs(row.BirthDay)}
                        ></DatePicker>
                      </LocalizationProvider>{" "}
                    </Box>

                    <Box
                      display={"inline"}
                      sx={{ width: "35%", minWidth: "150px" }}
                    >
                      <TextField
                        // autoFocus
                        // required
                        // disabled
                        margin="dense"
                        id="CCCD"
                        name="CCCD"
                        label="Số CCCD"
                        type="text"
                        fullWidth
                        defaultValue={row.CCCD}
                        variant="standard"
                        // InputProps={{
                        //   readOnly: true,
                        // }}
                      />
                    </Box>
                    <Box
                      display={"inline"}
                      sx={{ width: "35%", minWidth: "150px" }}
                    >
                      <TextField
                        autoFocus
                        margin="dense"
                        id="BHYT"
                        name="BHYT"
                        label="Số BHYT"
                        type="text"
                        fullWidth
                        defaultValue={row.BHYT}
                        variant="standard"
                        // InputProps={{
                        //   readOnly: true,
                        // }}
                      />
                    </Box>
                    <FormControl
                      sx={{ m: 1, minWidth: 120, marginTop: "17px" }}
                      size="small"
                    >
                      <InputLabel id="demo-select-small-label">
                        Giới tính
                      </InputLabel>
                      <Select
                        // displayEmpty
                        // readOnly
                        labelId="demo-select-small"
                        id="gender"
                        name="gender"
                        // defaultValue={row.gender}
                        label="Giới tính"
                        value={newGender}
                        onChange={handleChangeGender}
                      >
                        <MenuItem value={"Nam"}>Nam</MenuItem>
                        <MenuItem value={"Nữ"}>Nữ</MenuItem>
                        <MenuItem value={"Khác"}>Khác</MenuItem>
                      </Select>
                    </FormControl>
                    <Box display={"inline"} sx={{ width: "100%" }}>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="address"
                        name="address"
                        label="Địa chỉ"
                        type="text"
                        fullWidth
                        defaultValue={row.address}
                        variant="standard"
                        // InputProps={{
                        //   readOnly: true,
                        // }}
                      />
                    </Box>
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
                  {row.history.map((historyRow) => {
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
    STT: PropTypes.string.isRequired,
    symptom: PropTypes.string.isRequired,
    BHYT: PropTypes.string.isRequired,
    BirthDay: PropTypes.string.isRequired,
  }).isRequired,
};

const patients = [
  createData(
    "1",
    "100",
    "Nguyễn Văn A",
    "Nam",
    "0000000000",
    "0000000000",
    "01/01/2004"
  ),
  createData(
    "2",
    "101",
    "AAAAAAAAAAAAAAA",
    "Nữ",
    "1111111111111",
    "11111111111",
    "01/01/2004"
  ),
  createData(
    "3",
    "102",
    "BBBBBBBBBBBBBBBBB",
    "Nam",
    "2222222222222",
    "22222222222",
    "01/01/2004"
  ),
  createData(
    "4",
    "103",
    "CCCCCCCCCCC",
    "Nam",
    "333333333333333",
    "3333333333333",
    "01/01/2004"
  ),
  createData(
    "5",
    "102",
    "DDDDDDDDDDD",
    "Nam",
    "4444444444",
    "444444444444",
    "01/01/2004"
  ),
  createData(
    "6",
    "102",
    "EEEEEEEEE",
    "Nam",
    "55555555",
    "5555555",
    "01/01/2004"
  ),
  createData(
    "7",
    "102",
    "FFFFFF",
    "Nam",
    "666666666",
    "666666666",
    "01/01/2004"
  ),
  createData(
    "8",
    "102",
    "GGGGGGGGGG",
    "Nam",
    "77777777777",
    "7777777777777",
    "01/01/2004"
  ),
  createData(
    "9",
    "102",
    "HHHHHHHHHH",
    "Nam",
    "888888888",
    "88888888888",
    "01/01/2004"
  ),
  createData(
    "10",
    "102",
    "IIIIIIIIII",
    "Nam",
    "999999999",
    "9999999999999",
    "01/01/2004"
  ),
];

export default function PatientRecord() {
  const [newFormOpen, setNewFormOpen] = React.useState(false);
  const [newGender, setNewGender] = React.useState("");
  const [renderPatientList, setRenderPatientList] = React.useState(patients);

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
      <Box display="flex" sx={{ paddingTop: "10px" }}>
        <Typography
          variant="h5"
          // gutterBottom
          component="div"
          sx={{ padding: "15px 0 0 15px" }}
        >
          HỒ SƠ BỆNH ÁN
        </Typography>
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
              const newPatient = createData(
                "1",
                "100",
                formJson.fullName,
                formJson.gender,
                formJson.CCCD,
                formJson.BHYT,
                formJson.birthDay
              );
              console.log(newPatient);
              handleCloseNewFormOpen();
            },
          }}
        >
          <DialogTitle>Thêm hồ sơ bệnh án</DialogTitle>
          <DialogContent>
            <DialogContentText></DialogContentText>

            <Box
              display={"flex"}
              flexWrap={"wrap"}
              justifyContent={"space-between"}
            >
              <Box display={"inline"} sx={{ width: "60%" }}>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="fullName"
                  name="fullName"
                  label="Họ và tên"
                  type="text"
                  fullWidth
                  variant="standard"
                />
              </Box>
              <Box display={"inline"} sx={{ width: "30%", minWidth: "120px" }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    size="small"
                    id="birthDay"
                    name="birthDay"
                    label="Ngày sinh"
                    sx={{ padding: 0 }}
                    format="DD/MM/YYYY"
                  ></DatePicker>
                </LocalizationProvider>{" "}
              </Box>

              <Box display={"inline"} sx={{ width: "35%", minWidth: "150px" }}>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="CCCD"
                  name="CCCD"
                  label="Số CCCD"
                  type="text"
                  // inputProps={{ min: 0, style: { textAlign: "left" } }}
                  fullWidth
                  // size="medium"
                  variant="standard"
                />
              </Box>
              <Box display={"inline"} sx={{ width: "35%", minWidth: "150px" }}>
                <TextField
                  autoFocus
                  // required
                  margin="dense"
                  id="BHYT"
                  name="BHYT"
                  label="Số BHYT"
                  type="text"
                  // inputProps={{ min: 0, style: { textAlign: "left" } }}
                  fullWidth
                  // size="medium"
                  variant="standard"
                />
              </Box>
              <FormControl
                sx={{ m: 1, minWidth: 120, marginTop: "17px" }}
                size="small"
              >
                <InputLabel id="demo-select-small-label">Giới tính</InputLabel>
                <Select
                  // autoWidth
                  // labelId="demo-select-small"
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
              <Box display={"inline"} sx={{ width: "100%" }}>
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
              </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseNewFormOpen}>hủy</Button>
            <Button type="submit">Xác nhận</Button>
          </DialogActions>
        </Dialog>
        {/* Tìm kiếm theo họ tên */}
        <Autocomplete
          onChange={(event, value) => {
            if (value === null) setRenderPatientList(patients);
            else setRenderPatientList([value]);
          }}
          sx={{ width: 300, marginLeft: "50px" }}
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
        <Autocomplete
          onChange={(event, value) => {
            if (value === null) setRenderPatientList(patients);
            else setRenderPatientList([value]);
          }}
          sx={{ width: 300, marginLeft: "50px" }}
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
        <Autocomplete
          onChange={(event, value) => {
            if (value === null) setRenderPatientList(patients);
            else setRenderPatientList([value]);
          }}
          sx={{ width: 300, marginLeft: "50px" }}
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
              {renderPatientList.map((row) => (
                <Row key={row.STT} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Paper>
  );
}
