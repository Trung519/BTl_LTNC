import * as React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import DialogMedicineList from "./DialogMedicineList";
import DialogGetMed from "./DialogGetMed";
import { toast } from "react-toastify";
const HistoryRow = (props) => {
  const { historyRow, index, CCCD, user, pharmacist } = props;
  // console.log("historyRow", historyRow);
  const [medicineListDialogOpen, setMedicineListDialogOpen] =
    React.useState(false);
  const [getMed, setGetMed] = React.useState(historyRow.getMed);
  const [getMedDialog, setGetMedDialog] = React.useState(false);
  const handleGetMed = () => {
    if (getMed) {
      toast.info(`Toa thuốc đã được lấy bởi dược sĩ ${user.name}`, {
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
    } else {
      setGetMedDialog(true);
    }
  };
  return (
    <TableRow key={index}>
      <TableCell component="th" scope="row">
        {historyRow.date}
      </TableCell>
      <TableCell>{historyRow.doctor}</TableCell>
      <TableCell>{historyRow.disease}</TableCell>
      <TableCell align="center">
        <Button
          variant="text"
          onClick={() => {
            setMedicineListDialogOpen(!medicineListDialogOpen);
          }}
        >
          Xem
        </Button>
        <DialogMedicineList
          setMedicineListDialogOpen={setMedicineListDialogOpen}
          medicineListDialogOpen={medicineListDialogOpen}
          historyRow={historyRow}
        ></DialogMedicineList>
      </TableCell>
      <TableCell align="center">
        {/* <IconButton
          // aria-label="expand row"
          size="small"
          onClick={handleGetMed}
        > */}

        {/* ********Xác nhận lấy thuốc */}
        {getMed ? (
          `Được xác nhận bởi ${user.name}`
        ) : user.typeEmp === "Dược sỹ" || user.typeEmp === "Quản trị" ? (
          <Button
            variant="outlined"
            onClick={() => {
              handleGetMed();
            }}
            sx={{ width: "110px" }}
          >
            Xác nhận
          </Button>
        ) : (
          "Chưa được xác nhận"
        )}
        <DialogGetMed
          setGetMedDialog={setGetMedDialog}
          getMedDialog={getMedDialog}
          setGetMed={setGetMed}
          getMed={getMed}
          CCCD={CCCD}
          index={index}
          pharmacist={{
            name: user.name,
            id: user.id,
          }}
        ></DialogGetMed>
        {/* </IconButton> */}
      </TableCell>
    </TableRow>
  );
};

export default HistoryRow;
