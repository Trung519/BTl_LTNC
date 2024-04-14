import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Medicine } from "../../Medicine_manage/P_R-be";
import Autocomplete from "@mui/material/Autocomplete";
const DialogMedicineListAdd = (props) => {
  const {
    listNewMedicine,
    setListNewMedicine,
    CCCD,
    addMedicineListFormOpen,
    setAddMedicineListFormOpen,
    Add_Med,
  } = props;

  const [listMedicine, setListMedicine] = React.useState([]);
  const [medicineAddList, setMedicineAddList] = React.useState(listNewMedicine);
  const nameValue = React.useRef();
  const usageValue = React.useRef();
  const dosageValue = React.useRef();
  const unitValue = React.useRef();
  // let listMedicine = [];
  React.useEffect(() => {
    Medicine().then((post) => {
      if (post != null) {
        setListMedicine(Object.values(post));
        // console.log("listMedicine", listMedicine);
      }
    });
  }, []);
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
            // alignItems="center"
            // justifyContent="center"
          >
            <Grid item xs={1} sm={2} md={3}>
              {/* <TextField
                // required
                margin="dense"
                id="name"
                name="name"
                label="Tên thuốc"
                type="text"
                fullWidth
                variant="standard"
                inputRef={nameValue}
              /> */}
              <Autocomplete
                // sx={{ width: 300, marginLeft: "15px" }}
                sx={{ marginTop: "8px" }}
                id="name"
                // name="name"
                options={listMedicine}
                getOptionLabel={(option) => {
                  return option.name;
                }}
                clearOnEscape
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Tên thuốc"
                    variant="standard"
                    size="small"
                    inputRef={nameValue}
                  />
                )}
              />
            </Grid>
            <Grid item xs={1} sm={2} md={3}>
              <TextField
                // required
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
                // required
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
                // required
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
                // type="submit"
                aria-label="add"
                size="small"
                color="info"
                sx={{ marginTop: "23px" }}
                onClick={() => {
                  if (
                    nameValue.current.value &&
                    usageValue.current.value &&
                    dosageValue.current.value &&
                    unitValue.current.value
                  ) {
                    const newMedicineElement = {
                      medicine: nameValue.current.value,
                      usage: usageValue.current.value,
                      dosagePerDay: dosageValue.current.value,
                      unit: unitValue.current.value,
                    };
                    nameValue.current.value = "";
                    usageValue.current.value = "";
                    dosageValue.current.value = "";
                    unitValue.current.value = "";
                    setMedicineAddList((prev) => [newMedicineElement, ...prev]);
                  }
                }}
              >
                <AddCircleIcon></AddCircleIcon>
              </IconButton>
            </Grid>
            <Grid item xs={1} sm={4} md={12}>
              {/* table */}
              <TableContainer component={Paper} sx={{ minWidth: 600 }}>
                <Table sx={{ minWidth: 600 }} aria-label="simple table">
                  <colgroup>
                    <col style={{ width: "24.5%" }} />
                    <col style={{ width: "24.5%" }} />
                    <col style={{ width: "23%" }} />
                    <col style={{ width: "23%" }} />
                    <col style={{ width: "2%" }} />
                  </colgroup>
                  <TableBody>
                    {medicineAddList.map((row, index) => (
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
                        <TableCell>
                          <IconButton
                            aria-label="add"
                            size="small"
                            color="info"
                            onClick={() => {
                              // console.log(index);
                              const temp = medicineAddList;
                              temp.splice(index, 1);
                              setMedicineAddList([...temp]);
                            }}
                          >
                            <DeleteOutlineIcon></DeleteOutlineIcon>
                          </IconButton>
                        </TableCell>
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
            // setAddMedicineListFormOpen(false);
            setMedicineAddList([]);
          }}
        >
          Xóa hết
        </Button>
        <Button
          onClick={() => {
            setListNewMedicine(medicineAddList);
            setAddMedicineListFormOpen(false);
          }}
        >
          Xác nhận
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogMedicineListAdd;
