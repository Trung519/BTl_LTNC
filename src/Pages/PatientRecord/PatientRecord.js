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
import Footer from "../../Components/Footer";
import Pagination from "@mui/material/Pagination";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default function PatientRecord({ user }) {
  console.log("re-render patient-record");

  React.useEffect(() => {
    Patients().then((post) => {
      if (post != null) {
        setNewPatientsAndRender(Object.values(post));
        //*********Lấy dữ liệu về từ db
        // console.log("render", Object.values(post));
        handleLoadingDone();
      }
    });
  }, []);

  /////hehehehheheheeh
  const [loading, setLoading] = React.useState(true);

  const [newFormOpen, setNewFormOpen] = React.useState(false);
  const [renderPatientList, setRenderPatientList] = React.useState([]); //Render ra những thứ cần render
  const [newPatients, setNewPatients] = React.useState([]); //Có tác dụng giống với patients bên ngoài
  const [page, setPage] = React.useState(1);
  // aauto;
  const handleLoadingDone = () => {
    setLoading(false);
  };
  const [emptyRows, setEmptyRows] = React.useState(0);
  const rowsPerPage = 7;
  // let emptyRows = 1;
  const handleChangePage = (e, p) => {
    setEmptyRows(Math.max(0, p * rowsPerPage - newPatients.length));
    setPage(p);
    // console.log("p", p);
    // console.log("p * 5 - 5", p * rowsPerPage - rowsPerPage);
    // console.log("p * 5", p * rowsPerPage);
    // console.log("emptyRows", emptyRows);

    setRenderPatientList(
      newPatients.slice(p * rowsPerPage - rowsPerPage, p * rowsPerPage)
    );
  };

  // React.useEffect(() => {
  // }, [newPatients]);
  const setNewPatientsAndRender = (newPatients) => {
    setNewPatients([...newPatients]);
    //ko con render nua, set newPatient thoi
    // render theo page
    setRenderPatientList(
      newPatients.slice(page * rowsPerPage - rowsPerPage, page * rowsPerPage)
    );
    // setRenderPatientList([...newPatients]);
  };

  const handleClickNewFormOpen = () => {
    setNewFormOpen(true);
  };

  const handleCloseNewFormOpen = () => {
    setNewFormOpen(false);
  };
  // console.log("Hellobabenewpatient", newPatients);

  return (
    <Box sx={{ bgcolor: "#F1F8FF;", paddingTop: "16px" }}>
      <Backdrop
        sx={{ color: "#fff", zIndex: 1 }}
        open={loading}
      // onClick={handleLoadingDone}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ marginX: "74px", marginBottom: "20px" }}>
        <Paper
          elevation={0}
          sx={{
            borderRadius: "12px",
            //  maxHeight: "750px",
            padding: "32px",
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              flexGrow: 1,
              margin: "20px 15px 20px 0",
              borderBottom: "1px solid #CFCFCF",
            }}
          >
            {/* <Grid
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
                sx={{
                  margin: "0 0 0 10px",
                  padding: "0 0 0 0",
                  "& .MuiGrid-item": {
                    padding: 0,
                  },
                }}
              > */}
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
            {/* </Grid> */}

            {/* <Grid item xs={1} sm={2} md={3}> */}
            {/* {console.log("search", newPatients)} */}
            <Autocomplete
              // disablePortal
              onChange={(event, value) => {
                console.log("1", newPatients);
                if (value === null)
                  setRenderPatientList(
                    newPatients.slice(
                      page * rowsPerPage - rowsPerPage,
                      page * rowsPerPage
                    )
                  );
                else setRenderPatientList([value]);
              }}
              sx={{ width: 300 }}
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
                      // color: "red",
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
            {/* </Grid> */}
            {/* <Grid item xs={1} sm={2} md={3}> */}
            <Autocomplete
              // disablePortal
              onChange={(event, value) => {
                if (value === null)
                  setRenderPatientList(
                    newPatients.slice(
                      page * rowsPerPage - rowsPerPage,
                      page * rowsPerPage
                    )
                  );
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
            {/* </Grid> */}
            {/* <Grid item xs={1} sm={2} md={3}> */}
            <Autocomplete
              disablePortal
              onChange={(event, value) => {
                if (value === null)
                  setRenderPatientList(
                    newPatients.slice(
                      page * rowsPerPage - rowsPerPage,
                      page * rowsPerPage
                    )
                  );
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
            {/* </Grid> */}
            {/* <Grid item xs={1} sm={0.5} md={0.8} sx={{ margin: "0 0 0 10px" }}> */}
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
            {/* </Grid> */}
            {/* </Grid> */}
          </Box>

          <Paper elevation={0}>
            <TableContainer
              sx={
                {
                  // maxHeight: 480,
                  // overflowY: "scroll",
                }
              }
            >
              <Table sx={{ marginBottom: "20px" }}>
                <colgroup>
                  <col style={{ width: "5%" }} />
                  {/* <col style={{ width: "8%" }} /> */}
                  <col style={{ width: "10%" }} />
                  <col style={{ width: "25%" }} />
                  <col style={{ width: "10%" }} />
                  <col style={{ width: "13%" }} />
                  <col style={{ width: "13%" }} />
                  <col style={{ width: "13%" }} />
                  <col style={{ width: "11%" }} />
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
                    {/* <TableCell
                      sx={{
                        color: "#000000",
                        // bgcolor: "#08107D",
                        fontSize: "18px",
                      }}
                    >
                      STT
                    </TableCell> */}
                    <TableCell
                      align="center"
                      sx={{
                        color: "#000000",
                        // bgcolor: "#08107D",
                        fontSize: "18px",
                        fontWeight: "550",
                      }}
                    >
                      Mã BN
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "#000000",
                        // bgcolor: "#08107D",
                        fontSize: "18px",
                        fontWeight: "550",
                      }}
                      align="left"
                    >
                      Họ và tên
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        color: "#000000",
                        // bgcolor: "#08107D",
                        fontSize: "18px",
                        fontWeight: "550",
                      }}
                    >
                      Giới tính
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        color: "#000000",
                        // bgcolor: "#08107D",
                        fontSize: "18px",
                        fontWeight: "550",
                      }}
                    >
                      CCCD
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        color: "#000000",
                        // bgcolor: "#08107D",
                        fontSize: "18px",
                        fontWeight: "550",
                      }}
                    >
                      BHYT
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        color: "#000000",
                        // bgcolor: "#08107D",
                        fontSize: "18px",
                        fontWeight: "550",
                      }}
                    >
                      Ngày sinh
                    </TableCell>
                    {
                      user.typeEmp === 'Quản trị' ?
                        (
                          <TableCell
                            align="center"
                            sx={{
                              color: "#000000",
                              // bgcolor: "#08107D",
                              fontSize: "18px",
                              fontWeight: "550",
                            }}
                          >
                            Thao tác
                          </TableCell>
                        ) :
                        (
                          <TableCell
                            align="center"
                            sx={{
                              color: "#000000",
                              // bgcolor: "#08107D",
                              fontSize: "18px",
                              fontWeight: "550",
                            }}
                          >
                            Xem thêm
                          </TableCell>
                        )
                    }
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
                        user={user}
                      ></MainRow>
                    );
                  })}
                  <TableRow sx={{ height: 67 * emptyRows }}></TableRow>
                </TableBody>
              </Table>
              <Pagination
                color="primary"
                onChange={handleChangePage}
                page={page}
                count={Math.ceil(newPatients.length / rowsPerPage)}
                // count={5}
                // rowsPerPage={5}
                showFirstButton
                showLastButton
              />
            </TableContainer>
          </Paper>
        </Paper>
      </Box>
      <Footer></Footer>
    </Box>
  );
}
