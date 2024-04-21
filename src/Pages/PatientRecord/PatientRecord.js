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
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import DialogAdd from "./components/DialogAdd";
import MainRow from "./components/MainRow";
import { Patients } from "./P_R_be";
export default function PatientRecord() {
  // let [patients, setPatient] = React.useState([]);
  console.log("re-render patient-record");

  React.useEffect(() => {
    Patients().then((post) => {
      if (post != null) {
        setNewPatientsAndRender(Object.values(post));
        console.log("render", Object.values(post));
      }
    });
  }, []);

  /////hehehehheheheeh

  const [newFormOpen, setNewFormOpen] = React.useState(false);
  const [renderPatientList, setRenderPatientList] = React.useState([]); //Render ra những thứ cần render
  const [newPatients, setNewPatients] = React.useState([]); //Có tác dụng giống với patients bên ngoài

  // React.useEffect(() => {
  // }, [newPatients]);
  const setNewPatientsAndRender = (newPatients) => {
    setNewPatients([...newPatients]);
    setRenderPatientList([...newPatients]);
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
                // createPatient={createPatient}
                setNewPatientsAndRender={setNewPatientsAndRender}
                newPatients={newPatients}
              ></DialogAdd>
            </Grid>
            <Grid item xs={1} sm={2} md={3}>
              {/* {console.log("search", newPatients)} */}
              <Autocomplete
                // disablePortal
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

        <Paper elevation={0} sx={{ marginLeft: 1 }}>
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
                    STT
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
                      index={index}
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
