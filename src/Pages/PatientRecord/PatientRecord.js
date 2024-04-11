import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
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
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
// import Stack from "@mui/material/Stack"
import { AddHist, Add_Med } from "./P_R_be";
import DialogAdd from "./components/DialogAdd";
import MainRow from "./components/MainRow";
import { Patients } from "./P_R_be";
const top100Films = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather: Part II", year: 1974 },
  { label: "The Dark Knight", year: 2008 },
  { label: "12 Angry Men", year: 1957 },
  { label: "Schindler's List", year: 1993 },
];
// export let patients = [];
function createPatient(
  STT = 1, //patients.length + 1,
  patientID = 1, //`BN${patients.length + 100}`,
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

// Row.propTypes = {
//   row: PropTypes.shape({
//     patientID: PropTypes.string.isRequired,
//     CCCD: PropTypes.string.isRequired,
//     fullName: PropTypes.string.isRequired,
//     history: PropTypes.arrayOf(
//       PropTypes.shape({
//         amount: PropTypes.string.isRequired,
//         customerId: PropTypes.string.isRequired,
//         date: PropTypes.string.isRequired,
//       })
//     ).isRequired,
//     STT: PropTypes.number.isRequired,
//     BHYT: PropTypes.string.isRequired,
//     BirthDay: PropTypes.string.isRequired,
//   }).isRequired,
// };

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
  // let [patients, setPatient] = React.useState([]);
  //console.log("1", row);
  React.useEffect(() => {
    Patients().then((post) => {
      if (post != null) {
        setNewPatientsAndRender(Object.values(post));
        console.log("render", Object.values(post));
      }
    });
  }, []);
  // console.log("Hellobabefdsfdssdsf", patients);

  const [newFormOpen, setNewFormOpen] = React.useState(false);
  const [newGender, setNewGender] = React.useState("");
  const [renderPatientList, setRenderPatientList] = React.useState([]); //Render ra những thứ cần render
  const [newPatients, setNewPatients] = React.useState([]); //Có tác dụng giống với patients bên ngoài
  const [fullName, setfullname] = React.useState("");
  const [birthDay, setBirthDay] = React.useState(null);
  const [CCCD, setCCCD] = React.useState(0);
  const [BHYT, setBHYT] = React.useState(0);
  const handle_Name = (event) => {
    setfullname(event.target.value);
  };
  const handle_Date = (event) => {
    setBirthDay(event);
  };
  const handle_CCCD = (event) => {
    setCCCD(event.target.value);
  };
  const handle_BHYT = (event) => {
    setBHYT(event.target.value);
  };
  // React.useEffect(() => {
  // }, [newPatients]);
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
  // console.log("Hellobabenewpatient", newPatients);

  return (
    <Box sx={{ height: "100%" }}>
      <Paper elevation={3} sx={{ margin: "35px", borderRadius: "20px" }}>
        <Box
          sx={{
            flexGrow: 1,
            margin: "20px 15px 20px 0",
            borderBottom: "1px solid #CFCFCF",
          }}
        >
          <Grid
            container
            alignItems="center"
            spacing={{ xs: 1, md: 2 }}
            columns={{ xs: 1, sm: 4, md: 12 }}
          >
            <Grid
              item
              xs={1}
              sm={1.5}
              md={2}
              sx={{ margin: "0 0 0 10px", padding: "20px 0 0 0" }}
            >
              <Typography
                variant="h5"
                // gutterBottom
                component="div"
                sx={{
                  display: "inline-block",
                  borderBottom: "2px solid #3497F9",
                  padding: "25px 0 25px 0",
                }}
              >
                HỒ SƠ BỆNH ÁN
              </Typography>
            </Grid>
            <Grid item xs={1} sm={0.5} md={0.8} sx={{ margin: "0 0 0 10px" }}>
              <Button
                variant="contained"
                // color="success"
                sx={{
                  // margin: "0 20px 0 10px",
                  backgroundColor: "#3497F9",
                  boxShadow: "none",
                }}
                onClick={handleClickNewFormOpen}
              >
                Thêm
              </Button>

              <DialogAdd
                // patients={patients}
                newFormOpen={newFormOpen}
                handleCloseNewFormOpen={handleCloseNewFormOpen}
                createPatient={createPatient}
                setNewPatientsAndRender={setNewPatientsAndRender}
                newPatients={newPatients}
                handle_Name={handle_Name}
                handle_Date={handle_Date}
                newGender={newGender}
                handleChangeGender={handleChangeGender}
                handle_CCCD={handle_CCCD}
                handle_BHYT={handle_BHYT}
              ></DialogAdd>
            </Grid>
            <Grid item xs={1} sm={2} md={3}>
              {/* {console.log("search", newPatients)} */}
              <Autocomplete
                disablePortal
                onChange={(event, value) => {
                  console.log("1", newPatients);
                  if (value === null) setRenderPatientList(newPatients);
                  else setRenderPatientList([value]);
                }}
                sx={{ width: 300, marginLeft: "15px" }}
                options={newPatients}
                getOptionLabel={(option) => {
                  return option.fullName;
                }}
                id="fullname_search"
                clearOnEscape
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Tìm kiếm theo họ tên"
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "50px",
                      },
                      "& .MuiInputBase-root": {
                        backgroundColor: "#EBF5FF",
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#EBF5FF",
                      },
                    }}
                    // InputProps={
                    //   {
                    //     sx: {
                    //       borderRadius: "50px",
                    //       padding: 0,
                    //     },
                    //   }
                    // }
                    // InputLabelProps={
                    //   {
                    //     sx: {
                    //       color: "#3497F9",
                    //       borderWidth: "1px",
                    //       borderColor: "green !important",
                    //     },
                    //   }
                    // }
                    size="small"
                  />
                )}
              />
            </Grid>
            <Grid item xs={1} sm={2} md={3}>
              <Autocomplete
                // disablePortal
                onChange={(event, value) => {
                  if (value === null) setRenderPatientList(newPatients);
                  else setRenderPatientList([value]);
                }}
                sx={{ width: 300 }}
                options={newPatients}
                getOptionLabel={(option) => option.CCCD}
                id="CCCD_search"
                clearOnEscape
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Tìm kiếm theo số CCCD"
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "50px",
                      },
                      "& .MuiInputBase-root": {
                        backgroundColor: "#EBF5FF",
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#EBF5FF",
                      },
                    }}
                    // InputProps={{ sx: { borderRadius: "0", padding: 0 } }}
                    size="small"
                  />
                )}
              />
            </Grid>
            <Grid item xs={1} sm={2} md={3}>
              <Autocomplete
                disablePortal
                onChange={(event, value) => {
                  if (value === null) setRenderPatientList(newPatients);
                  else setRenderPatientList([value]);
                }}
                sx={{ width: 300 }}
                options={newPatients}
                getOptionLabel={(option) => option.BHYT}
                id="BHYT_search"
                clearOnEscape
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Tìm kiếm theo số BHYT"
                    variant="outlined"
                    // InputProps={{ sx: { borderRadius: "50px", padding: 0 } }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "50px",
                        borderColor: "#EBF5FF",
                      },
                      "& .MuiInputBase-root": {
                        backgroundColor: "#EBF5FF",
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#EBF5FF",
                      },
                    }}
                    size="small"
                  />
                )}
              />
            </Grid>
          </Grid>
        </Box>
        {/* <Divider
          variant="fullWidth"
          sx={{
            m: "20px 0 20px 0",
            fontWeight: "bold",
            opacity: 1,
            borderBottom: "1px solod red",
          }}
        /> */}
        <Paper elevation={0} sx={{ marginLeft: "40px" }}>
          <TableContainer sx={{ maxHeight: 480, overflowY: "scroll" }}>
            <Table stickyHeader>
              <colgroup>
                <col style={{ width: "2%" }} />
                <col style={{ width: "8%" }} />
                <col style={{ width: "15%" }} />
                <col style={{ width: "23%" }} />
                <col style={{ width: "10%" }} />
                <col style={{ width: "10%" }} />
                <col style={{ width: "10%" }} />
              </colgroup>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={
                      {
                        //  bgcolor: "#08107D"
                      }
                    }
                  />
                  <TableCell
                    sx={{
                      color: "#000000",
                      // bgcolor: "#08107D",
                      fontSize: "18px",
                    }}
                  >
                    ID
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#000000",
                      // bgcolor: "#08107D",
                      fontSize: "18px",
                    }}
                  >
                    Mã BN
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#000000",
                      // bgcolor: "#08107D",
                      fontSize: "18px",
                    }}
                    align="left"
                  >
                    Họ và tên
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#000000",
                      // bgcolor: "#08107D",
                      fontSize: "18px",
                    }}
                  >
                    Giới tính
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#000000",
                      // bgcolor: "#08107D",
                      fontSize: "18px",
                    }}
                  >
                    CCCD
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#000000",
                      // bgcolor: "#08107D",
                      fontSize: "18px",
                    }}
                  >
                    BHYT
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#000000",
                      // bgcolor: "#08107D",
                      fontSize: "18px",
                    }}
                  >
                    Ngày sinh
                  </TableCell>
                  <TableCell
                    sx={
                      {
                        // bgcolor: "#08107D"
                      }
                    }
                  />
                </TableRow>
              </TableHead>
              <TableBody>
                {renderPatientList.map((row, index) => {
                  return (
                    <MainRow
                      newPatients={newPatients}
                      key={row.CCCD}
                      // index={index}
                      row={row}
                      setNewPatientsAndRender={setNewPatientsAndRender}
                    ></MainRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Paper>
    </Box>
  );
}
