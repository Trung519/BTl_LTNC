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
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import Divider from "@mui/material/Divider";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
// import Paper from "@mui/material/Paper";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import Box from "@mui/material/Box";

function createMedicine(
  STT,
  medicineID,
  name,
  origin,
  batch,
  NSX,
  HSD,
  cost,
  sellPrice,
  stock
) {
  return {
    STT,
    medicineID,
    name,
    origin,
    batch,
    NSX,
    HSD,
    stock,
    cost,
    sellPrice,
  };
}
const listMedicine = [
  createMedicine(
    "1",
    "1",
    "A",
    "Trung Quốc",
    "L1",
    "01/01/2023",
    "01/01/2024",
    "1$",
    "2$",
    "200"
  ),
  createMedicine(
    "2",
    "2",
    "B",
    "Trung Quốc",
    "L1",
    "01/01/2023",
    "01/01/2024",
    "1$",
    "2$",
    "200"
  ),
  createMedicine(
    "2",
    "3",
    "C",
    "Trung Quốc",
    "L1",
    "01/01/2023",
    "01/01/2024",
    "1$",
    "2$",
    "200"
  ),
  createMedicine(
    "3",
    "4",
    "D",
    "Trung Quốc",
    "L1",
    "01/01/2023",
    "01/01/2024",
    "1$",
    "2$",
    "200"
  ),
  createMedicine(
    "4",
    "5",
    "E",
    "Trung Quốc",
    "L1",
    "01/01/2023",
    "01/01/2024",
    "1$",
    "2$",
    "200"
  ),
  createMedicine(
    "5",
    "6",
    "F",
    "Trung Quốc",
    "L1",
    "01/01/2023",
    "01/01/2024",
    "1$",
    "2$",
    "200"
  ),
];
const MedicineManage = () => {
  const [renderMedicineList, setRenderMedicineList] =
    React.useState(listMedicine);
  const [newFormOpen, setNewFormOpen] = React.useState(false);
  const handleCloseFormOpen = () => {
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
          <Grid item xs={1} sm={1.5} md={3} sx={{ margin: "15px 0 0 10px" }}>
            <Typography
              variant="h5"
              // gutterBottom
              component="div"
              sx={{
                display: "inline-block",
              }}
            >
              QUẢN LÝ KHO THUỐC
            </Typography>
          </Grid>
          <Grid item xs={1} sm={0.5} md={1}>
            <Button
              variant="contained"
              color="success"
              sx={{ margin: "13px 0 0 13px" }}
              onClick={() => {
                setNewFormOpen(true);
              }}
            >
              Thêm
            </Button>
            {/* DialogAdd */}
            <Dialog
              fullWidth
              maxWidth="sm"
              open={newFormOpen}
              onClose={handleCloseFormOpen}
              PaperProps={{
                component: "form",
                onSubmit: (event) => {
                  event.preventDefault();

                  const formData = new FormData(event.currentTarget);
                  const formJson = Object.fromEntries(formData.entries());
                  // cách lấy data
                  // const newPatient = createMedicine(
                  //   "1",
                  //   "100",
                  //   formJson.fullName,
                  //   formJson.gender,
                  //   formJson.CCCD,
                  //   formJson.BHYT,
                  //   formJson.birthDay
                  // );
                  // console.log(newPatient);
                  handleCloseFormOpen();
                },
              }}
            >
              <DialogTitle>Thêm hồ sơ bệnh án</DialogTitle>
              <DialogContent>
                <DialogContentText></DialogContentText>

                <Grid
                  container
                  spacing={{ xs: 1, md: 2 }}
                  columns={{ xs: 1, sm: 4, md: 12 }}
                >
                  <Grid item xs={1} sm={2} md={4}>
                    <Paper>xs=2</Paper>
                  </Grid>
                  <Grid item xs={1} sm={2} md={8}>
                    <Paper>xs=2</Paper>
                  </Grid>
                  <Grid item xs={1} sm={2} md={4}>
                    <Paper>xs=2</Paper>
                  </Grid>
                  <Grid item xs={1} sm={2} md={2.5}>
                    <Paper>xs=2</Paper>
                  </Grid>
                  <Grid item xs={1} sm={2} md={2.5}>
                    <Paper>xs=2</Paper>
                  </Grid>
                  <Grid item xs={1} sm={2} md={3}>
                    <Paper>xs=2</Paper>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseFormOpen}>hủy</Button>
                <Button type="submit">Xác nhận</Button>
              </DialogActions>
            </Dialog>
          </Grid>
          <Grid item xs={1} sm={2} md={3}>
            {/* Tìm kiếm theo ID */}
            <Autocomplete
              onChange={(event, value) => {
                if (value === null) setRenderMedicineList(listMedicine);
                else setRenderMedicineList([value]);
              }}
              sx={{ width: 300, marginLeft: "15px" }}
              options={listMedicine}
              getOptionLabel={(option) => option.medicineID}
              id="id_search"
              clearOnEscape
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Tìm kiếm theo mã ID thuốc"
                  variant="standard"
                />
              )}
            />
          </Grid>
          <Grid item xs={1} sm={2} md={3}>
            <Autocomplete
              onChange={(event, value) => {
                if (value === null) setRenderMedicineList(listMedicine);
                else setRenderMedicineList([value]);
                // console.log(value);
              }}
              sx={{ width: 300, marginLeft: "15px" }}
              options={listMedicine}
              getOptionLabel={(option) => option.name}
              id="name_search"
              clearOnEscape
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Tìm kiếm theo tên thuốc"
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
              <col style={{ width: "12%" }} />
              <col style={{ width: "22%" }} />
              <col style={{ width: "12%" }} />
              <col style={{ width: "12%" }} />
              <col style={{ width: "12%" }} />
              <col style={{ width: "12%" }} />
            </colgroup>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    color: "#ffffff",
                    bgcolor: "#08107D",
                    fontSize: "18px",
                  }}
                >
                  STT
                </TableCell>
                <TableCell
                  sx={{
                    color: "#ffffff",
                    bgcolor: "#08107D",
                    fontSize: "18px",
                  }}
                >
                  Mã thuốc
                </TableCell>
                <TableCell
                  sx={{
                    color: "#ffffff",
                    bgcolor: "#08107D",
                    fontSize: "18px",
                  }}
                  align="left"
                >
                  Tên thuốc
                </TableCell>
                <TableCell
                  sx={{
                    color: "#ffffff",
                    bgcolor: "#08107D",
                    fontSize: "18px",
                  }}
                >
                  Xuất xứ
                </TableCell>
                <TableCell
                  sx={{
                    color: "#ffffff",
                    bgcolor: "#08107D",
                    fontSize: "18px",
                  }}
                >
                  Giá nhập
                </TableCell>
                <TableCell
                  sx={{
                    color: "#ffffff",
                    bgcolor: "#08107D",
                    fontSize: "18px",
                  }}
                >
                  Giá bán
                </TableCell>
                <TableCell
                  sx={{
                    color: "#ffffff",
                    bgcolor: "#08107D",
                    fontSize: "18px",
                  }}
                >
                  Tồn kho&nbsp;(hộp)
                </TableCell>

                <TableCell sx={{ bgcolor: "#08107D" }} />
              </TableRow>
            </TableHead>
            <TableBody>
              {renderMedicineList.map((row) => (
                <TableRow
                  key={row.medicineID}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                  // component="th" scope="row"
                  >
                    {row.STT}
                  </TableCell>
                  <TableCell>{row.medicineID}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.origin}</TableCell>
                  <TableCell>{row.cost}</TableCell>
                  <TableCell>{row.sellPrice}</TableCell>
                  <TableCell>{row.stock}</TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="info"
                      size="small"
                      color="info"
                      // onClick={() => {
                      //   setInfoFormOpen(!infoFormOpen);
                      // }}
                    >
                      <InfoOutlinedIcon></InfoOutlinedIcon>
                    </IconButton>
                    {/* DialogInfo */}
                    <IconButton
                      aria-label="edit"
                      size="small"
                      // onClick={() => setmodifyFormOpen(!modifyFormOpen)}
                    >
                      <EditOutlinedIcon></EditOutlinedIcon>
                    </IconButton>
                    {/* DialogModify */}
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
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Paper>
  );
};

export default MedicineManage;
