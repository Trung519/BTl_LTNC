import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
// import Stack from "@mui/material/Stack"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { DeleteData, Patients, getPatients } from "../P_R_be";
import HistoryRow from "./HistoryRow";
import { AddData, AddHist, Add_Med } from "../P_R_be";
// import { patients } from "../PatientRecord";
import DialogMedicineListAdd from "./DialogMedicineListAdd";
import DialogHistoryAdd from "./DialogHistoryAdd";
import DialogModify from "./DialogModify";
import DialogInfo from "./DialogInfo";
import { toast } from "react-toastify";

function MainRow(props) {
  const { row, setNewPatientsAndRender, newPatients, index, user } = props;
  // console.log("row", row);

  // const [patient, setPatient] = React.useState([]);
  // // console.log("1", row);
  // React.useEffect(() => {
  //   Patients().then((post) => {
  //     if (post != null) {
  //       setPatient(post);
  //     }
  //   });
  // }, []);

  // console.log("Hellobabeeeeeeeeeeeee", patient);
  const handleCloseFormOpen = () => {
    setInfoFormOpen(false);
    setmodifyFormOpen(false);
    setAddHistoryFormOpen(false);
    setAddMedicineListFormOpen(false);
  };

  const [historyList, setHistoryList] = React.useState(row.history || []);
  const [openSubRow, setOpenSubRow] = React.useState(false);
  const [addHistoryFormOpen, setAddHistoryFormOpen] = React.useState(false);
  const [infoFormOpen, setInfoFormOpen] = React.useState(false);
  const [modifyFormOpen, setmodifyFormOpen] = React.useState(false);
  const [addMedicineListFormOpen, setAddMedicineListFormOpen] =
    React.useState(false);

  const [newGender, setNewGender] = React.useState(row.gender);
  // React.useEffect(() => {
  //   setHistoryList(row.history || []);
  // }, [newPatients]);
  const handleChangeGender = (event) => {
    setNewGender(event.target.value);
  };
  // const indexInPatients = () => {
  //   // console.log(row.STT);
  //   return patients.findIndex((e) => {
  //     return e.STT == row.STT;
  //   });
  // };

  //
  // console.log(patients);

  const indexInPatients = newPatients.findIndex((e) => {
    return e.CCCD === row.CCCD;
  });

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
        {/* <TableCell>{index + 1}</TableCell> */}
        <TableCell align="center">{"BN" + row.CCCD.slice(-6)}</TableCell>
        <TableCell>{row.fullName}</TableCell>
        <TableCell align="center">{row.gender}</TableCell>
        <TableCell align="center">{row.CCCD}</TableCell>
        <TableCell align="center">{row.BHYT}</TableCell>
        <TableCell align="center">{row.birthDay}</TableCell>
        {user.typeEmp === 'Quản trị' ?
          (
            <TableCell align="center">
              <IconButton
                aria-label="info"
                size="small"
                color="info"
                onClick={() => {
                  setInfoFormOpen(true);
                }}
              >
                <InfoOutlinedIcon></InfoOutlinedIcon>
              </IconButton>
              {/* DialogInfo */}
              <DialogInfo
                infoFormOpen={infoFormOpen}
                setInfoFormOpen={setInfoFormOpen}
                row={row}
              ></DialogInfo>

              <IconButton
                // **********Button để chỉnh sửa
                aria-label="edit"
                size="small"
                onClick={() => setmodifyFormOpen(true)}
              >
                <EditOutlinedIcon></EditOutlinedIcon>
              </IconButton>
              {/* DialogModify */}
              <DialogModify
                modifyFormOpen={modifyFormOpen}
                // patients={patients}
                newPatients={newPatients}
                indexInPatients={indexInPatients}
                setNewPatientsAndRender={setNewPatientsAndRender}
                row={row}
                newGender={newGender}
                handleChangeGender={handleChangeGender}
                setmodifyFormOpen={setmodifyFormOpen}
              ></DialogModify>

              <IconButton
                aria-label="delete"
                size="small"
                color="error"
                onClick={(event) => {
                  // console.log(indexInPatients);
                  // console.log(e.CCCD);
                  // console.log(row.CCCD);
                  // console.log("bf", row.history);
                  event.preventDefault();
                  newPatients.splice(indexInPatients, 1);
                  setNewPatientsAndRender([...newPatients]);
                  // console.log("af", row.history);

                  DeleteData(row.CCCD);
                  toast.success("Xóa thành công !", {
                    position: "top-right",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    // transition: Bounce,
                  });
                }}
              >
                <DeleteOutlineIcon></DeleteOutlineIcon>
              </IconButton>
            </TableCell>
          ) :
          (
            <TableCell align="center">
              <IconButton
                aria-label="info"
                size="small"
                color="info"
                onClick={() => {
                  setInfoFormOpen(true);
                }}
              >
                <InfoOutlinedIcon></InfoOutlinedIcon>
              </IconButton>
              {/* DialogInfo */}
              <DialogInfo
                infoFormOpen={infoFormOpen}
                setInfoFormOpen={setInfoFormOpen}
                row={row}
              ></DialogInfo>
            </TableCell>
          )}
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
              {/* ********button thêm lịch sử khám */}
              {user.typeEmp === "Bác sĩ" || user.typeEmp === "Trưởng khoa" || user.typeEmp === "Quản trị" ? (
                <>
                  <IconButton
                    aria-label="add"
                    size="small"
                    color="info"
                    onClick={() => setAddHistoryFormOpen(true)}
                  >
                    <AddCircleIcon></AddCircleIcon>
                  </IconButton>
                  <DialogHistoryAdd
                    addHistoryFormOpen={addHistoryFormOpen}
                    setAddHistoryFormOpen={setAddHistoryFormOpen}
                    AddHist={AddHist}
                    historyList={historyList}
                    // listNewMedicine={listNewMedicine}
                    setHistoryList={setHistoryList}
                    // setListNewMedicine={setListNewMedicine}
                    row={row}
                    DialogMedicineListAdd={DialogMedicineListAdd}
                    setAddMedicineListFormOpen={setAddMedicineListFormOpen}
                    addMedicineListFormOpen={addMedicineListFormOpen}
                    namePharmacist={user.name}
                  ></DialogHistoryAdd>
                </>
              ) : ""}
              <Table size="small" aria-label="history">
                <colgroup>
                  <col style={{ width: "20%" }} />
                  <col style={{ width: "20%" }} />
                  <col style={{ width: "20%" }} />
                  <col style={{ width: "20%" }} />
                  <col style={{ width: "20%" }} />
                </colgroup>
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        color: "#000000",
                        // bgcolor: "#08107D",
                        fontSize: "16px",
                        fontWeight: "530",
                      }}
                    >
                      Ngày
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "#000000",
                        // bgcolor: "#08107D",
                        fontSize: "16px",
                        fontWeight: "530",
                      }}
                    >
                      Bác sĩ phụ trách
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "#000000",
                        // bgcolor: "#08107D",
                        fontSize: "16px",
                        fontWeight: "530",
                      }}
                    >
                      Chẩn đoán
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        color: "#000000",
                        // bgcolor: "#08107D",
                        fontSize: "16px",
                        fontWeight: "530",
                      }}
                    >
                      Đơn thuốc
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        color: "#000000",
                        // bgcolor: "#08107D",
                        fontSize: "16px",
                        fontWeight: "530",
                      }}
                    >
                      Tình trạng đơn thuốc
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* {console.log("historyList", historyList)} */}
                  {historyList.length !== 0 ? (
                    historyList.map((historyRow, index) => (
                      <HistoryRow
                        CCCD={row.CCCD}
                        key={index}
                        historyRow={historyRow}
                        index={index}
                        user={user}
                        pharmacist={historyRow.pharmacist ? historyRow.pharmacist : "undifined"}
                      />
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4}>Không có lịch sử khám</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default MainRow;
