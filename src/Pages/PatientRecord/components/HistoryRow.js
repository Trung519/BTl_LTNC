import * as React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import DialogMedicineList from "./DialogMedicineList";

const HistoryRow = (props) => {
  const { historyRow, index } = props;
  // console.log("historyRow", historyRow);
  const [medicineListDialogOpen, setMedicineListDialogOpen] =
    React.useState(false);

  return (
    <TableRow key={index}>
      <TableCell component="th" scope="row">
        {historyRow.date}
      </TableCell>
      <TableCell>{historyRow.doctor}</TableCell>
      <TableCell>{historyRow.disease}</TableCell>
      <TableCell>
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
    </TableRow>
  );
};

export default HistoryRow;
