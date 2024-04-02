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
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import FormControl from "@mui/material/FormControl";

// import Paper from "@mui/material/Paper";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import Box from "@mui/material/Box";

function createMedicine(
  STT = listMedicine.length + 1,
  medicineID = `TM${listMedicine.length + 100}`,
  name,
  origin,
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
    HSD,
    cost,
    sellPrice,
    stock,
  };
}
let listMedicine = [
  createMedicine(
    "5",
    "TM104",
    "A",
    "Trung Quốc",
    "23/01/2024",
    "1$",
    "2$",
    "200"
  ),
  createMedicine(
    "4",
    "TM103",
    "B",
    "Trung Quốc",
    "01/01/2024",
    "1$",
    "2$",
    "200"
  ),
  createMedicine(
    "3",
    "TM102",
    "D",
    "Trung Quốc",
    "01/01/2024",
    "1$",
    "2$",
    "200"
  ),
  createMedicine(
    "2",
    "TM101",
    "E",
    "Trung Quốc",
    "01/01/2024",
    "1$",
    "2$",
    "200"
  ),
  createMedicine(
    "1",
    "TM100",
    "F",
    "Trung Quốc",
    "01/01/2024",
    "1$",
    "2$",
    "200"
  ),
];
// RowCustom
function Row(props) {
  const { row, setNewListMedicineAndRender } = props;
  const [infoFormOpen, setInfoFormOpen] = React.useState(false);
  const [modifyFormOpen, setmodifyFormOpen] = React.useState(false);
  const handleCloseFormOpen = () => {
    setInfoFormOpen(false);
    setmodifyFormOpen(false);
  };
  const indexInListMedicine = listMedicine.findIndex((e) => {
    return e.STT === row.STT;
  });
  return (
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
      <TableCell>{row.HSD}</TableCell>
      <TableCell>{row.stock}</TableCell>
      <TableCell>{row.cost}</TableCell>
      <TableCell>{row.sellPrice}</TableCell>
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
        >
          <DialogTitle>Thông tin thuốc trong kho</DialogTitle>
          <DialogContent dividers>
            <DialogContentText></DialogContentText>

            <Grid
              container
              spacing={{ xs: 1, md: 2 }}
              columns={{ xs: 1, sm: 4, md: 12 }}
            >
              <Grid item xs={1} sm={2} md={3}>
                <TextField
                  required
                  margin="dense"
                  id="medicineID"
                  name="medicineID"
                  label="Mã thuốc"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={row.medicineID}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={1} sm={2} md={6}>
                <TextField
                  required
                  margin="dense"
                  id="name"
                  name="name"
                  label="Tên thuốc"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={row.name}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={1} sm={2} md={3}>
                <TextField
                  required
                  margin="dense"
                  id="origin"
                  name="origin"
                  label="Xuất xứ"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={row.origin}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={0.5} sm={1} md={4}>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  // adapterLocale="en-gb"
                >
                  <FormControl
                    sx={{ minWidth: 120, marginTop: "17px" }}
                    size="small"
                  >
                    <DatePicker
                      readOnly
                      value={dayjs(row.HSD, "DD/MM/YYYY")}
                      required
                      size="small"
                      id="HSD"
                      name="HSD"
                      label="HSD"
                      // sx={{ padding: 0 }}
                      format="DD/MM/YYYY"
                    ></DatePicker>
                  </FormControl>
                </LocalizationProvider>{" "}
              </Grid>

              <Grid item xs={1} sm={2} md={2.5}>
                <TextField
                  required
                  margin="dense"
                  id="cost"
                  name="cost"
                  label="Giá nhập"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={row.cost}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={1} sm={2} md={2.5}>
                <TextField
                  required
                  margin="dense"
                  id="sellPrice"
                  name="sellPrice"
                  label="Giá bán"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={row.sellPrice}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={1} sm={2} md={3}>
                <TextField
                  required
                  margin="dense"
                  id="stock"
                  name="stock"
                  label="Tồn kho"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={row.stock}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseFormOpen}>hủy</Button>
            <Button type="submit">Xác nhận</Button>
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
              // const newMedicine = createMedicine(
              //   "1",
              //   // "100"
              // formJson.medicineID,
              //   formJson.name,
              //   formJson.origin,
              //   formJson.HSD,
              //   formJson.cost,
              //   formJson.sellPrice,
              //   formJson.stock;
              // );
              // console.log(newMedicine);
              listMedicine[indexInListMedicine] = {
                ...listMedicine[indexInListMedicine],
                medicineID: formJson.medicineID,
                name: formJson.name,
                origin: formJson.origin,
                HSD: formJson.HSD,
                cost: formJson.cost,
                sellPrice: formJson.sellPrice,
                stock: formJson.stock,
              };
              // console.log(indexInListMedicine);
              setNewListMedicineAndRender([...listMedicine]);
              handleCloseFormOpen();
            },
          }}
        >
          <DialogTitle>Chỉnh sửa thuốc trong kho</DialogTitle>
          <DialogContent dividers>
            <DialogContentText></DialogContentText>

            <Grid
              container
              spacing={{ xs: 1, md: 2 }}
              columns={{ xs: 1, sm: 4, md: 12 }}
            >
              <Grid item xs={1} sm={2} md={3}>
                <TextField
                  required
                  margin="dense"
                  id="medicineID"
                  name="medicineID"
                  label="Mã thuốc"
                  type="text"
                  fullWidth
                  variant="standard"
                  defaultValue={row.medicineID}
                />
              </Grid>
              <Grid item xs={1} sm={2} md={6}>
                <TextField
                  required
                  margin="dense"
                  id="name"
                  name="name"
                  label="Tên thuốc"
                  type="text"
                  fullWidth
                  variant="standard"
                  defaultValue={row.name}
                />
              </Grid>
              <Grid item xs={1} sm={2} md={3}>
                <TextField
                  required
                  margin="dense"
                  id="origin"
                  name="origin"
                  label="Xuất xứ"
                  type="text"
                  fullWidth
                  variant="standard"
                  defaultValue={row.origin}
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
                      id="HSD"
                      name="HSD"
                      label="HSD"
                      // sx={{ padding: 0 }}
                      format="DD/MM/YYYY"
                      value={dayjs(row.HSD, "DD/MM/YYYY")}
                    ></DatePicker>
                  </FormControl>
                </LocalizationProvider>{" "}
              </Grid>

              <Grid item xs={1} sm={2} md={2.5}>
                <TextField
                  required
                  margin="dense"
                  id="cost"
                  name="cost"
                  label="Giá nhập"
                  type="text"
                  fullWidth
                  variant="standard"
                  defaultValue={row.cost}
                />
              </Grid>
              <Grid item xs={1} sm={2} md={2.5}>
                <TextField
                  required
                  margin="dense"
                  id="sellPrice"
                  name="sellPrice"
                  label="Giá bán"
                  type="text"
                  fullWidth
                  variant="standard"
                  defaultValue={row.sellPrice}
                />
              </Grid>
              <Grid item xs={1} sm={2} md={3}>
                <TextField
                  required
                  margin="dense"
                  id="stock"
                  name="stock"
                  label="Tồn kho"
                  type="text"
                  fullWidth
                  variant="standard"
                  defaultValue={row.stock}
                />
              </Grid>
            </Grid>
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
            listMedicine.splice(indexInListMedicine, 1);
            setNewListMedicineAndRender([...listMedicine]);
          }}
        >
          <DeleteOutlineIcon></DeleteOutlineIcon>
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
const MedicineManage = () => {
  const [renderMedicineList, setRenderMedicineList] =
    React.useState(listMedicine);
  const [newListMedicine, setNewListMedicine] = React.useState(listMedicine);

  const [newFormOpen, setNewFormOpen] = React.useState(false);
  const handleCloseFormOpen = () => {
    setNewFormOpen(false);
  };
  React.useEffect(() => {
    console.log("effect");
    listMedicine = newListMedicine;
  }, [newListMedicine]);
  const setNewListMedicineAndRender = (newListMedicine) => {
    setNewListMedicine([...newListMedicine]);
    setRenderMedicineList([...newListMedicine]);
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
                  const newMedicine = createMedicine(
                    undefined,
                    // "100"
                    formJson.medicineID,
                    formJson.name,
                    formJson.origin,
                    formJson.HSD,
                    formJson.cost,
                    formJson.sellPrice,
                    formJson.stock
                  );
                  console.log(newMedicine);
                  setNewListMedicineAndRender([
                    newMedicine,
                    ...newListMedicine,
                  ]);
                  handleCloseFormOpen();
                },
              }}
            >
              <DialogTitle>Thêm thuốc trong kho</DialogTitle>
              <DialogContent dividers>
                <DialogContentText></DialogContentText>

                <Grid
                  container
                  spacing={{ xs: 1, md: 2 }}
                  columns={{ xs: 1, sm: 4, md: 12 }}
                >
                  <Grid item xs={1} sm={2} md={3}>
                    <TextField
                      required
                      margin="dense"
                      id="medicineID"
                      name="medicineID"
                      label="Mã thuốc"
                      type="text"
                      fullWidth
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={1} sm={2} md={6}>
                    <TextField
                      required
                      margin="dense"
                      id="name"
                      name="name"
                      label="Tên thuốc"
                      type="text"
                      fullWidth
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={1} sm={2} md={3}>
                    <TextField
                      required
                      margin="dense"
                      id="origin"
                      name="origin"
                      label="Xuất xứ"
                      type="text"
                      fullWidth
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
                          id="HSD"
                          name="HSD"
                          label="HSD"
                          // sx={{ padding: 0 }}
                          format="DD/MM/YYYY"
                        ></DatePicker>
                      </FormControl>
                    </LocalizationProvider>{" "}
                  </Grid>

                  <Grid item xs={1} sm={2} md={2.5}>
                    <TextField
                      required
                      margin="dense"
                      id="cost"
                      name="cost"
                      label="Giá nhập"
                      type="text"
                      fullWidth
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={1} sm={2} md={2.5}>
                    <TextField
                      required
                      margin="dense"
                      id="sellPrice"
                      name="sellPrice"
                      label="Giá bán"
                      type="text"
                      fullWidth
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={1} sm={2} md={3}>
                    <TextField
                      required
                      margin="dense"
                      id="stock"
                      name="stock"
                      label="Tồn kho"
                      type="text"
                      fullWidth
                      variant="standard"
                    />
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
              <col style={{ width: "70px" }} />
              <col style={{ width: "150px" }} />
              <col style={{ width: "270px" }} />
              <col style={{ width: "170px" }} />
              <col style={{ width: "150px" }} />
              <col style={{ width: "150px" }} />
              <col style={{ width: "160px" }} />
              <col style={{ width: "160px" }} />
              {/* <col style={{ width: "150px" }} /> */}
              {/* <col style={{ width: "500px" }} /> */}
            </colgroup>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    color: "#ffffff",
                    bgcolor: "#08107D",
                    fontSize: "17px",
                  }}
                >
                  STT
                </TableCell>
                <TableCell
                  sx={{
                    color: "#ffffff",
                    bgcolor: "#08107D",
                    fontSize: "17px",
                  }}
                >
                  Mã thuốc
                </TableCell>
                <TableCell
                  sx={{
                    color: "#ffffff",
                    bgcolor: "#08107D",
                    fontSize: "17px",
                  }}
                  align="left"
                >
                  Tên thuốc
                </TableCell>
                <TableCell
                  sx={{
                    color: "#ffffff",
                    bgcolor: "#08107D",
                    fontSize: "17px",
                  }}
                >
                  Xuất xứ
                </TableCell>
                <TableCell
                  sx={{
                    color: "#ffffff",
                    bgcolor: "#08107D",
                    fontSize: "17px",
                  }}
                >
                  HSD
                </TableCell>
                <TableCell
                  sx={{
                    color: "#ffffff",
                    bgcolor: "#08107D",
                    fontSize: "17px",
                  }}
                >
                  Tồn kho&nbsp;(hộp)
                </TableCell>
                <TableCell
                  sx={{
                    color: "#ffffff",
                    bgcolor: "#08107D",
                    fontSize: "17px",
                  }}
                >
                  Giá nhập&nbsp;(VND)
                </TableCell>
                <TableCell
                  sx={{
                    color: "#ffffff",
                    bgcolor: "#08107D",
                    fontSize: "17px",
                  }}
                >
                  Giá bán&nbsp;(VND)
                </TableCell>

                <TableCell sx={{ bgcolor: "#08107D" }} />
              </TableRow>
            </TableHead>
            <TableBody>
              {renderMedicineList.map((row) => (
                <Row
                  key={row.STT}
                  row={row}
                  setNewListMedicineAndRender={setNewListMedicineAndRender}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Paper>
  );
};

export default MedicineManage;
