import * as React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";

// import Paper from "@mui/material/Paper";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import DialogInfo from "./DialogInfo";
import DialogModify from "./DialogModify";
import { DeleteData } from "../P_R-be";
import { toast } from "react-toastify";

const MainRow = (props) => {
  const { row, setNewListMedicineAndRender, newListMedicine, index } = props;
  const [infoFormOpen, setInfoFormOpen] = React.useState(false);
  const [modifyFormOpen, setModifyFormOpen] = React.useState(false);
  const indexInListMedicine = newListMedicine.findIndex((e) => {
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
        {index + 1}
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

        <DialogInfo
          row={row}
          infoFormOpen={infoFormOpen}
          setInfoFormOpen={setInfoFormOpen}
        ></DialogInfo>

        <IconButton
          aria-label="edit"
          size="small"
          onClick={() => {
            setModifyFormOpen(true);
            console.log("date", row.HSD);
          }}
        >
          <EditOutlinedIcon></EditOutlinedIcon>
        </IconButton>
        {/* DialogModify */}
        <DialogModify
          modifyFormOpen={modifyFormOpen}
          setModifyFormOpen={setModifyFormOpen}
          // listMedicine={listMedicine}
          newListMedicine={newListMedicine}
          indexInListMedicine={indexInListMedicine}
          setNewListMedicineAndRender={setNewListMedicineAndRender}
          row={row}
        ></DialogModify>
        <IconButton
          aria-label="delete"
          size="small"
          color="error"
          onClick={() => {
            DeleteData(row.name);
            const temp = newListMedicine;
            temp.splice(indexInListMedicine, 1);
            setNewListMedicineAndRender([...temp]);
            toast.error("Xóa thành công !", {
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
    </TableRow>
  );
};

export default MainRow;
