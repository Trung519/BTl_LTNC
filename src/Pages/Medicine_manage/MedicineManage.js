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
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";

// import Paper from "@mui/material/Paper";

import Box from "@mui/material/Box";
import DialogAdd from "./components/DialogAdd";
import MainRow from "./components/MainRow";
import { Medicine } from "./P_R-be";

const Medicine_manage = () => {
  React.useEffect(() => {
    Medicine().then((post) => {
      if (post != null) {
        setNewListMedicineAndRender(Object.values(post));
        console.log("render", Object.values(post));
      }
    });
  }, []);
  const [renderMedicineList, setRenderMedicineList] = React.useState([]);
  const [newListMedicine, setNewListMedicine] = React.useState([]);

  const [newFormOpen, setNewFormOpen] = React.useState(false);
  // React.useEffect(() => {
  //   console.log("effect");
  //   listMedicine = newListMedicine;
  // }, [newListMedicine]);
  const setNewListMedicineAndRender = (newListMedicine) => {
    setNewListMedicine([...newListMedicine]);
    setRenderMedicineList([...newListMedicine]);
  };

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
            <Grid item xs={1} sm={1.5} md={3} sx={{ margin: "15px 0 0 10px" }}>
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
            </Grid>
            <Grid item xs={1} sm={0.5} md={1}>
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
                // createMedicine={createMedicine}
              ></DialogAdd>
            </Grid>
            <Grid item xs={1} sm={2} md={3}>
              {/* Tìm kiếm theo ID */}
              <Autocomplete
                onChange={(event, value) => {
                  if (value === null) setRenderMedicineList(newListMedicine);
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
            </Grid>
            <Grid item xs={1} sm={2} md={3}>
              <Autocomplete
                onChange={(event, value) => {
                  if (value === null) setRenderMedicineList(newListMedicine);
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
            </Grid>
          </Grid>
        </Box>
        <Paper elevation={0} sx={{ marginLeft: 1 }}>
          <TableContainer
            sx={{
              maxHeight: 480,
              overflowY: "scroll",
              // maxWidth: "1000px",
              // overflowX: "auto",
            }}
          >
            <Table stickyHeader>
              <colgroup>
                <col style={{ width: "2%" }} />
                <col style={{ width: "9%" }} />
                <col style={{ width: "20%" }} />
                <col style={{ width: "10%" }} />
                <col style={{ width: "8%" }} />
                <col style={{ width: "12%" }} />
                <col style={{ width: "12%" }} />
                <col style={{ width: "12%" }} />
                {/* <col style={{ width: "150px" }} /> */}
                {/* <col style={{ width: "500px" }} /> */}
              </colgroup>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      color: "#000000",
                      // bgcolor: "#08107D",
                      fontSize: "17px",
                    }}
                  >
                    STT
                  </TableCell>
                  <TableCell
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
                    sx={{
                      color: "#000000",
                      // bgcolor: "#08107D",
                      fontSize: "17px",
                    }}
                  >
                    Xuất xứ
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#000000",
                      // bgcolor: "#08107D",
                      fontSize: "17px",
                    }}
                  >
                    HSD
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#000000",
                      // bgcolor: "#08107D",
                      fontSize: "17px",
                    }}
                  >
                    Tồn kho&nbsp;(hộp)
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#000000",
                      // bgcolor: "#08107D",
                      fontSize: "17px",
                    }}
                  >
                    Giá nhập&nbsp;(VND)
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#000000",
                      // bgcolor: "#08107D",
                      fontSize: "17px",
                    }}
                  >
                    Giá bán&nbsp;(VND)
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
                {renderMedicineList.map((row, index) => (
                  <MainRow
                    index={index}
                    row={row}
                    setNewListMedicineAndRender={setNewListMedicineAndRender}
                    newListMedicine={newListMedicine}
                    // listMedicine={listMedicine}
                  ></MainRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Paper>
    </Box>
  );
};

export default Medicine_manage;
