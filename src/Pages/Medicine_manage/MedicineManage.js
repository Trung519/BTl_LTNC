import * as React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Pagination from "@mui/material/Pagination";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

// import Paper from "@mui/material/Paper";

import Box from "@mui/material/Box";
import DialogAdd from "./components/DialogAdd";
import MainRow from "./components/MainRow";
import { Medicine } from "./P_R-be";
import Footer from "../../Components/Footer";

const Medicine_manage = () => {
  React.useEffect(() => {
    Medicine().then((post) => {
      if (post != null) {
        setNewListMedicineAndRender(Object.values(post));
        // *******Lấy dữ liệu về từ db
        // console.log("render", Object.values(post));
        handleLoadingDone();
      }
    });
  }, []);
  const [renderMedicineList, setRenderMedicineList] = React.useState([]);
  const [newListMedicine, setNewListMedicine] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [page, setPage] = React.useState(1);
  // aauto;
  const handleLoadingDone = () => {
    setLoading(false);
  };
  const [emptyRows, setEmptyRows] = React.useState(0);
  const rowsPerPage = 7;
  // let emptyRows = 1;
  const handleChangePage = (e, p) => {
    setEmptyRows(Math.max(0, p * rowsPerPage - newListMedicine.length));
    setPage(p);
    // console.log("p", p);
    // console.log("p * 5 - 5", p * 5 - 5);
    // console.log("p * 5", p * 5);
    // console.log("emptyRows", emptyRows);

    setRenderMedicineList(
      newListMedicine.slice(p * rowsPerPage - rowsPerPage, p * rowsPerPage)
    );
  };

  const [newFormOpen, setNewFormOpen] = React.useState(false);
  // React.useEffect(() => {
  //   console.log("effect");
  //   listMedicine = newListMedicine;
  // }, [newListMedicine]);
  const setNewListMedicineAndRender = (newListMedicine) => {
    setNewListMedicine([...newListMedicine]);
    // setRenderMedicineList([...newListMedicine]);
    setRenderMedicineList(
      newListMedicine.slice(
        page * rowsPerPage - rowsPerPage,
        page * rowsPerPage
      )
    );
  };

  return (
    <Box sx={{ bgcolor: "#F1F8FF;", paddingTop: "16px" }}>
      <Backdrop
        sx={{ color: "#fff", zIndex: 10 }}
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
            > */}
            {/* <Grid
                item
                xs={1}
                sm={1.5}
                md={3}
                sx={{ margin: "15px 0 0 10px" }}
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
              QUẢN LÝ KHO THUỐC
            </Typography>
            {/* </Grid> */}

            {/* <Grid item xs={1} sm={2} md={3}> */}
            {/* Tìm kiếm theo ID */}
            <Autocomplete
              onChange={(event, value) => {
                if (value === null)
                  setRenderMedicineList(
                    newListMedicine.slice(
                      page * rowsPerPage - rowsPerPage,
                      page * rowsPerPage
                    )
                  );
                else setRenderMedicineList([value]);
              }}
              sx={{ width: 300, marginLeft: "15px" }}
              options={newListMedicine}
              getOptionLabel={(option) => option.medicineID}
              id="id_search"
              clearOnEscape
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Tìm kiếm theo mã ID thuốc"
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
            {/* </Grid> */}
            {/* <Grid item xs={1} sm={2} md={3}> */}
            <Autocomplete
              onChange={(event, value) => {
                if (value === null)
                  setRenderMedicineList(
                    newListMedicine.slice(
                      page * rowsPerPage - rowsPerPage,
                      page * rowsPerPage
                    )
                  );
                else setRenderMedicineList([value]);
                // console.log(value);
              }}
              sx={{ width: 300, marginLeft: "15px" }}
              options={newListMedicine}
              getOptionLabel={(option) => option.name}
              id="name_search"
              clearOnEscape
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Tìm kiếm theo tên thuốc"
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
            {/* <Grid item xs={1} sm={0.5} md={1}> */}
            <Button
              variant="contained"
              // color="success"
              sx={{
                margin: "13px 0 0 13px",
                backgroundColor: "#3497F9",
                boxShadow: "none",
              }}
              onClick={() => {
                setNewFormOpen(true);
              }}
            >
              Thêm
            </Button>
            {/* DialogAdd */}
            <DialogAdd
              newFormOpen={newFormOpen}
              setNewFormOpen={setNewFormOpen}
              setNewListMedicineAndRender={setNewListMedicineAndRender}
              newListMedicine={newListMedicine}
              setEmptyRows={setEmptyRows}
              emptyRows={emptyRows}
              // createMedicine={createMedicine}
            ></DialogAdd>
            {/* </Grid> */}
            {/* </Grid> */}
          </Box>
          <Paper elevation={0} sx={{ marginLeft: 1 }}>
            <TableContainer
              sx={
                {
                  // maxHeight: 480,
                  // overflowY: "scroll",
                  // maxWidth: "1000px",
                  // overflowX: "auto",
                }
              }
            >
              <Table sx={{ marginBottom: "20px" }}>
                <colgroup>
                  <col style={{ width: "10%" }} />
                  <col style={{ width: "20%" }} />
                  <col style={{ width: "10%" }} />
                  <col style={{ width: "10%" }} />
                  <col style={{ width: "13%" }} />
                  <col style={{ width: "13%" }} />
                  <col style={{ width: "13%" }} />
                  <col style={{ width: "11%" }} />
                  {/* <col style={{ width: "150px" }} /> */}
                  {/* <col style={{ width: "500px" }} /> */}
                </colgroup>
                <TableHead>
                  <TableRow>
                    {/* <TableCell
                      sx={{
                        color: "#000000",
                        // bgcolor: "#08107D",
                        fontSize: "17px",
                      }}
                    >
                      STT
                    </TableCell> */}
                    <TableCell
                      align="center"
                      sx={{
                        color: "#000000",
                        // bgcolor: "#08107D",
                        fontSize: "17px",
                      }}
                    >
                      Mã thuốc
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "#000000",
                        // bgcolor: "#08107D",
                        fontSize: "17px",
                      }}
                      align="left"
                    >
                      Tên thuốc
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        color: "#000000",
                        // bgcolor: "#08107D",
                        fontSize: "17px",
                      }}
                    >
                      Xuất xứ
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        color: "#000000",
                        // bgcolor: "#08107D",
                        fontSize: "17px",
                      }}
                    >
                      HSD
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        color: "#000000",
                        // bgcolor: "#08107D",
                        fontSize: "17px",
                      }}
                    >
                      Tồn kho&nbsp;(viên)
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        color: "#000000",
                        // bgcolor: "#08107D",
                        fontSize: "17px",
                      }}
                    >
                      Giá nhập&nbsp;(VND)
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        color: "#000000",
                        // bgcolor: "#08107D",
                        fontSize: "17px",
                      }}
                    >
                      Giá bán&nbsp;(VND)
                    </TableCell>

                    <TableCell
                      align="center"
                      sx={{
                        color: "#000000",
                        // bgcolor: "#08107D",
                        fontSize: "17px",
                      }}
                    >
                      Thao tác
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {renderMedicineList.map((row, index) => (
                    <MainRow
                      index={index}
                      row={row}
                      setNewListMedicineAndRender={setNewListMedicineAndRender}
                      newListMedicine={newListMedicine}
                      emptyRows={emptyRows}
                      setEmptyRows={setEmptyRows}
                      // listMedicine={listMedicine}
                    ></MainRow>
                  ))}
                  <TableRow sx={{ height: 67 * emptyRows }}></TableRow>
                </TableBody>
              </Table>
              <Pagination
                color="primary"
                onChange={handleChangePage}
                page={page}
                count={Math.ceil(newListMedicine.length / rowsPerPage)}
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
};

export default Medicine_manage;
