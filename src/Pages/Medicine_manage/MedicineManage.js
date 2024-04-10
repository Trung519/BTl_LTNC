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
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";

// import Paper from "@mui/material/Paper";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import Box from "@mui/material/Box";
import { AddData_Med } from "./P_R-be";
import DialogInfo from "./components/DialogInfo";
import DialogModify from "./components/DialogModify";
import DialogAdd from "./components/DialogAdd";
import MainRow from "./components/MainRow";

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

const Medicine_manage = () => {
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
            <DialogAdd
              newFormOpen={newFormOpen}
              setNewFormOpen={setNewFormOpen}
              setNewListMedicineAndRender={setNewListMedicineAndRender}
              newListMedicine={newListMedicine}
              createMedicine={createMedicine}
            ></DialogAdd>
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
                <MainRow
                  row={row}
                  setNewListMedicineAndRender={setNewListMedicineAndRender}
                  listMedicine={listMedicine}
                ></MainRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Paper>
  );
};

export default Medicine_manage;
