import { getData, writeUserData } from "../../services/firebase";
import { v4 as uuidv4 } from "uuid";
import ConfirmDeleteMaintain from "../../Components/ConfirmDeleteMaintain";
// import Select from 'react-select';
import "./EquipmentsManage.scss";
import { useState, useEffect, useCallback } from "react";
import Modal from "../../Components/Modal/Modal";
import Pagination from "@mui/material/Pagination";

import { toast } from "react-toastify";

import TextField from "@mui/material/TextField";
import {
  TablePagination,
  tablePaginationClasses as classes,
} from "@mui/base/TablePagination";
import { styled } from "@mui/system";
import { Alert } from "@mui/material";
import Fade from "@mui/material/Fade";
import ConfirmModal from "../../Components/ConfirmModal";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ConfirmDeleteUse from "../../Components/ConfirmDeleteUse";
import Footer from "../../Components/Footer";
import InputBorrower from "./Components/InputBorrower";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import UpdateSuccess from "../../Components/UpdateSuccess";
import ModalFormAdd from "../Employee/Components/ModalFormAdd";
//Import icon
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export default function EquipmentsManage({ user }) {
  const [idToEdit, setidToEdit] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [equipmentsRows, setEquipmentsRows] = useState([]);
  const [maintain, setMaintain] = useState([]);
  const [use, setUse] = useState([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const [displayAlert, setDisplayAlert] = useState(false);
  const [displayConfirm, setDisplayConfirm] = useState(false);
  const [dataEmp, setDataEmp] = useState([]);
  const [alertAddSuccess, setAlertAddSuccess] = useState(false);

  // State variable to keep track of all the expanded rows
  // By default, nothing expanded. Hence initialized with empty array.
  const [expandedRows, setExpandedRows] = useState([]);

  // State variable to keep track which row is currently expanded.
  const [expandState, setExpandState] = useState({});

  const handleExpandRow = (event, Id) => {
    const currentExpandedRows = expandedRows;
    const isRowExpanded = currentExpandedRows.includes(Id);

    let obj = {};
    isRowExpanded ? (obj[Id] = false) : (obj[Id] = true);
    setExpandState(obj);

    // If the row is expanded, we are here to hide it. Hence remove
    // it from the state variable. Otherwise add to it.
    const newExpandedRows = isRowExpanded
      ? currentExpandedRows.filter((id) => id !== Id)
      : currentExpandedRows.concat(Id);

    setExpandedRows(newExpandedRows);
  };

  // const [historyRows, setHistoryRows] = useState([
  //     {
  //         date: '2021-06-01',
  //         description: 'Mua 1 cái mới',
  //     },
  //     {
  //         date: '2021-06-02',
  //         description: 'Sửa chữa',
  //     }

  // ]);

  useEffect(() => {
    getData().then((post) => {
      if (post != null) {
        setData(post);
        setEquipmentsRows(post["Equipment"] ?? []);
        setMaintain(post["Maintain"] ?? []);
        setUse(post["Use"] ?? []);
        setDataEmp(post["Employee"]);
        handleLoadingDone();
      }
    });
  }, []);

  const handleDisplayAlert = () => {
    setDisplayAlert(true);
    setTimeout(() => {
      setDisplayAlert(false);
    }, 2000);
  };

  function handleSubmit(newRow) {
    if (idToEdit === null) {
      // add item
      // newRow={...newRow, id: uuidv4()}
      let ID = uuidv4();
      let newdata = [...equipmentsRows, { ...newRow, id: ID }];
      writeUserData(newdata, "/Equipment");
      setEquipmentsRows(newdata);
    } else {
      // edit item
      let newData = equipmentsRows;
      // newData[idToEdit] = newRow;
      let find = newData.find((item) => item.id === idToEdit);
      if (find) {
        find.name = newRow.name;
        find.room = newRow.room;
        find.status = newRow.status;
        find.type = newRow.type;
        find.description = newRow.description;
      }
      writeUserData(newData, "/Equipment");
      setEquipmentsRows(newData);
    }
    // idToEdit === null ?
    //     setEquipmentsRows([...equipmentsRows, newRow]) : setEquipmentsRows(equipmentsRows.map((currTow, idx) => {
    //         if (idx !== idToEdit) {
    //             return currTow;
    //         }
    //         return newRow;
    //     })
    //     );
    handleDisplayAlert();
  }

  const handleOnclickDelete = (ID) => {
    setidToEdit(ID);
    setDisplayConfirm(true);
    // console.log('idtodit', idToEdit)
  };

  const handleDeleteRow = useCallback(() => {
    // console.log('idto Edit', idToEdit)
    writeUserData(
      equipmentsRows.filter((item, idx) => item.id !== idToEdit),
      "/Equipment"
    );
    setEquipmentsRows(
      equipmentsRows.filter((item, idx) => item.id !== idToEdit)
    );
    setDisplayConfirm(false);
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
  }, [idToEdit]);

  function handleEditRow(id) {
    setidToEdit(id);
    setModalOpen(true);
  }

  const [inputText, setInputText] = useState("");
  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  const filteredData = equipmentsRows.filter((el) => {
    if (inputText === "") {
      return el;
    } else {
      return (
        el.name.toLowerCase().includes(inputText) ||
        el.type.toLowerCase().includes(inputText) ||
        el.room.toLowerCase().includes(inputText) ||
        el.description.toLowerCase().includes(inputText) ||
        el.status.toLowerCase().includes(inputText) ||
        el.id.toLowerCase().includes(inputText)
      );
    }
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };

  // const emptyRows =
  //   page > 0
  //     ? Math.max(0, (1 + page) * rowsPerPage - equipmentsRows.length)
  //     : 0;
  const emptyRows = Math.max(0, page * rowsPerPage - filteredData.length);

  // maintain
  const [alertDeleteMaintain, setAlertDeteteMaintain] = useState(false);
  const [formsState, setFormsState] = useState([]); // luu danh sach maintain có mở form điền thông tin
  const [alertIsMaintaining, setAlertIsMaintaining] = useState(false);
  const clickAdd = (id) => {
    if (!isAvailable(id)) {
      setAlertIsMaintaining(true);
      setArrayAlertErrorMaintain(...arrayAlertErrorMaintain, id);
      setTimeout(() => {
        setAlertIsMaintaining(false);
        setArrayAlertErrorMaintain([]);
      }, 3000);
    } else {
      let newFormsState = formsState;
      if (formsState.includes(id)) {
        // co thi xoa
        newFormsState = formsState.filter((item) => item !== id);
      } else {
        // k co thi them nếu có ở formsStateUse thì bỏ nó
        newFormsState = [...formsState, id];
        setFormsUseState((prev) => prev.filter((item) => item !== id));
      }
      setFormsState(newFormsState);
    }
  };
  const cancelAddMaintain = (id) => {
    // setDisplayFormMaintain(false);
    let newFormsState = formsState;
    newFormsState = formsState.filter((item) => item !== id);
    setFormsState(newFormsState);
  };

  function isAvailable(id) {
    //KIỂM TRA THIẾT BỊ CÓ ĐANG BẢO TRÌ HAY CÓ ĐANG ĐƯỢC SỬ DỤNG KHÔNG.
    let log_maintain = maintain.filter((item) => item.id === id);
    let log_use = use.filter((item) => item.id === id);
    let find_maintain = log_maintain.find((item) => item.state === false);
    let find_use = log_use.find((item) => item.state === false);
    if (find_maintain || find_use) return false;
    return true;
  }

  const addMaintain = (id) => {
    // xử lý lưu lích sử maintain mới thêm vào database và set trạng thái cho thiết bị
    setEquipmentsRows((prev) => {
      let newDataEquip = prev.map((item) => {
        if (item.id === id) {
          return { ...item, status: "Đang bảo trì" };
        } else {
          return item;
        }
      });
      writeUserData(newDataEquip, "/Equipment");
      return newDataEquip;
    });

    let input_content = document.getElementsByClassName("input-content");
    let id_maintain = uuidv4();
    let newMaintain = {
      content: input_content[0].value,
      id: id,
      state: false,
      time: getFormattedDate(),
      time_finish: "---",
      id_maintain: id_maintain,
    };
    let newDataMaintain = maintain;
    newDataMaintain = [newMaintain, ...maintain];
    writeUserData(newDataMaintain, "/Maintain");
    cancelAddMaintain(id);
    setMaintain(newDataMaintain);
  };
  const [rowMaintaintoDelete, setRowMaintaintoDelete] = useState(null);

  const onClickDeleteMaintain = (id) => {
    // alert confirm xóa lịch sử bảo trì
    setRowMaintaintoDelete(id);

    setAlertDeteteMaintain(true);
  };
  const handleDeleteMaintain = () => {
    // xử lý xóa lịch sử maintain
    let newDataMaintain = maintain;
    newDataMaintain = maintain.filter(
      (item) => item.id_maintain !== rowMaintaintoDelete
    );
    writeUserData(newDataMaintain, "/Maintain");
    setMaintain(newDataMaintain);
    setAlertDeteteMaintain(false);
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
  };

  function getFormattedDate() {
    // Lấy ngày hôm nay
    const today = new Date();

    // Lấy ngày, tháng, năm từ đối tượng Date
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Lưu ý: Tháng bắt đầu từ 0
    const year = today.getFullYear();

    // Trả về ngày đã định dạng
    return `${day}/${month}/${year}`;
  }

  const setStateMaintain = (id_maintain) => {
    // SET TRẠNG THÁI CỦA BẢO TRÌ ĐỒNG THỜI TRẠNG THÁI CỦA THIẾT BỊ SET THÀNH SẴN CÓ
    let id = maintain.find((item) => item.id_maintain === id_maintain).id;

    setEquipmentsRows((prev) => {
      let newDataEquip = prev.map((item) => {
        if (item.id === id) {
          return { ...item, status: "Sẵn có" };
        } else {
          return item;
        }
      });
      writeUserData(newDataEquip, "/Equipment");
      return newDataEquip;
    });

    setMaintain((prev) => {
      let today = getFormattedDate();
      let newDataMaintain = prev.map((item, index) => {
        if (item.id_maintain === id_maintain) {
          return { ...item, time_finish: today, state: true };
        } else {
          return item;
        }
      });

      writeUserData(newDataMaintain, "/Maintain");
      return newDataMaintain;
    });
  };

  // LỊCH SỬ SỬ DỤNG;
  const [formsUseState, setFormsUseState] = useState([]);
  const [alertIsUsing, setAlertIsUsing] = useState(false);
  const clickAddUse = (id) => {
    // CHỖ NÀY KIỂM TRA NÓ CÓ ĐANG BẢO TRÌ HAY ĐANG DÙNG K.
    // NẾU K BẢO TRÌ VÀ K DÙNG.
    if (isAvailable(id)) {
      let newFormsUseState = formsUseState;
      if (formsUseState.includes(id)) {
        // co thi xoa
        newFormsUseState = formsUseState.filter((item) => item !== id);
      } else {
        // k co thi them vao nếu cỏ ở formsState thì bỏ nó;
        newFormsUseState = [...formsUseState, id];
        setFormsState((prev) => prev.filter((item) => item !== id));
      }
      setFormsUseState(newFormsUseState);
    } else {
      setArrayAlertErrorUse(...arrayAlertErrorUse, id);
      setMsgErrorUse("Thiết bị đang được bảo trì hoặc sử dụng !");
      setAlertIsUsing(true);
      setTimeout(() => {
        setAlertIsUsing(false);
        setArrayAlertErrorUse([]);
      }, 3000);
    }
  };

  const onClickCancelAddUse = (id) => {
    let newFormsUseState = formsUseState;
    newFormsUseState = formsUseState.filter((item) => item !== id);
    setFormsUseState(newFormsUseState);
  };

  const [inputborrower, setInputBorrower] = useState("");
  const handleAddUse = (id) => {
    // XỬ LÝ LƯU LỊCH SỬ SỬ DỤNG MỚI THÊM VÀO DB VÀ SET TRẠNG THÁI ĐANG SỬ DỤNG CHO THIẾT BỊ;

    if (inputborrower == "") {
      setMsgErrorUse("Vui lòng nhập thông tin người mượn");
      setAlertIsUsing(true);
      setTimeout(() => {
        setAlertIsUsing(false);
      }, 3000);
    } else {
      let findEmp = dataEmp.find((item) => item.ID === inputborrower);
      if (findEmp) {
        setEquipmentsRows((prev) => {
          let newDataEquip = prev.map((item) => {
            if (item.id === id) {
              return { ...item, status: "Đang sử dụng" };
            } else {
              return item;
            }
          });
          writeUserData(newDataEquip, "/Equipment");
          return newDataEquip;
        });
        let id_use = uuidv4();
        let newUse = {
          borrower: inputborrower,
          id: id,
          state: false,
          time: getFormattedDate(),
          time_finish: "---",
          id_use: id_use,
        };
        let newDataUse = use;
        newDataUse = [newUse, ...use];
        writeUserData(newDataUse, "/Use");
        onClickCancelAddUse(id);
        setUse(newDataUse);
        setInputBorrower("");
      } else {
        setMsgErrorUse("Không tìm thấy ID trong Danh sách nhân viên !");
        setAlertIsUsing(true);
        setTimeout(() => {
          setAlertIsUsing(false);
        }, 3000);
      }
    }
  };
  const setStateUse = (id_use) => {
    let id = use.find((item) => item.id_use === id_use).id;

    setEquipmentsRows((prev) => {
      let newDataEquip = prev.map((item) => {
        if (item.id === id) {
          return { ...item, status: "Sẵn có" };
        } else {
          return item;
        }
      });
      writeUserData(newDataEquip, "/Equipment");
      return newDataEquip;
    });

    setUse((prev) => {
      let today = getFormattedDate();
      let newDataUse = prev.map((item, index) => {
        if (item.id_use === id_use) {
          return { ...item, time_finish: today, state: true };
        } else {
          return item;
        }
      });
      writeUserData(newDataUse, "/Use");
      return newDataUse;
    });
  };
  const [arrayAlertErrorUse, setArrayAlertErrorUse] = useState([]);
  const [arrayAlertErrorMaintain, setArrayAlertErrorMaintain] = useState([]);
  const [alertDeleteUse, setAlertDeleteUse] = useState(false);
  const [rowtoDeleteUse, setRowtoDeleteUse] = useState(null);

  const onClickDeleteUse = (id) => {
    setRowtoDeleteUse(id);
    setAlertDeleteUse(true);
  };
  const handleDeleteUse = () => {
    // xử lý xóa lịch sử sử dụng;
    let newDataUse = use;
    newDataUse = use.filter((item) => item.id_use !== rowtoDeleteUse);
    writeUserData(newDataUse, "/Use");
    setUse(newDataUse);
    setAlertDeleteUse(false);
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
  };
  const [msgErrorUse, setMsgErrorUse] = useState("");
  const [loading, setLoading] = useState(true);
  const handleLoadingDone = () => {
    setLoading(false);
  };
  const [displayForm, setDisplayForm] = useState(false);
  const [idToRead, setIdToRead] = useState(null);

  return (
    <div id="backgroundE">
      <Backdrop
        sx={{ color: "#fff", zIndex: 1 }}
        open={loading}
        onClick={handleLoadingDone}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div id="container">
        {/* <div>
          <Fade in={displayAlert}>
            <Alert severity="success">Thêm thiết bị thành công</Alert>
          </Fade>
        </div> */}

        <div id="header-container">
          {user.typeEmp === "Quản trị" && <button
            id="addnew-btn"
            onClick={() => {
              setModalOpen(true);
              setidToEdit(null);
            }}
          >
            {" "}
            + Thêm mới
          </button>}
          <div id="header-box">
            <h1 id="header-page">Quản lý Thiết bị</h1>
          </div>
        </div>
        <div className="search">
          <TextField
            id="outlined-basic"
            variant="outlined"
            sx={{
              "& fieldset": { border: "none" },
            }}
            fullWidth
            size="small"
            onChange={inputHandler}
            label="Tìm kiếm"
            InputProps={{
              style: {
                borderRadius: "40px",
                background: "#F4F6F6",
              },
            }}
          />
        </div>

        <table id="equipment-table">
          <thead>
            <th className="table-head-item"></th>
            <th className="table-head-item">Tên </th>
            <th className="table-head-item">Loại</th>
            <th className="table-head-item">Phòng cất trữ</th>
            <th className="table-head-item">Mô tả</th>
            <th className="table-head-item">Trạng thái</th>
            {user.typeEmp === "Quản trị" && <th className="table-head-item">Thao tác</th>}
          </thead>
          <tbody>
            {filteredData
              .slice(page * rowsPerPage - rowsPerPage, page * rowsPerPage)
              .map((row, index) => {
                return (
                  <>
                    <tr key={index}>
                      <td className="table-data-item">
                        <IconButton
                          aria-label="expand row"
                          size="small"
                          onClick={(event) => handleExpandRow(event, row.id)}
                        >
                          {expandState[row.id] ? (
                            <KeyboardArrowUpIcon />
                          ) : (
                            <KeyboardArrowDownIcon />
                          )}
                        </IconButton>
                      </td>
                      <td className="table-data-item">
                        {
                          <div>
                            <span>{row.name}</span> <br />
                            {/* <span id="txt-id">{row.id}</span> */}
                          </div>
                        }
                      </td>
                      <td className="table-data-item">{row.type}</td>
                      <td className="table-data-item">{row.room}</td>
                      <td className="table-data-item">{row.description}</td>
                      <td className="table-data-item">
                        <span>{row.status}</span>
                      </td>
                      {user.typeEmp === "Quản trị" && <td className="table-data-item">
                        <div id="action-btn-container">
                          {/* <button
                          className="action-btn"
                          id="edit-btn"
                          type="submit"
                          onClick={() => handleEditRow(row.id)}
                        >
                          <FontAwesomeIcon
                            icon={faPenToSquare}
                            style={{ color: "#1a9cff" }}
                          />
                        </button> */}
                          <IconButton
                            aria-label="edit"
                            size="small"
                            onClick={() => handleEditRow(row.id)}
                          >
                            <EditOutlinedIcon></EditOutlinedIcon>
                          </IconButton>

                          <IconButton
                            aria-label="delete"
                            size="small"
                            color="error"
                            onClick={() => handleOnclickDelete(row.id)}
                          >
                            <DeleteOutlineIcon></DeleteOutlineIcon>
                          </IconButton>
                        </div>
                      </td>}
                    </tr>
                    {expandedRows.includes(row.id) && (
                      <tr>
                        <td className="collapse-row" colSpan={7}>
                          <Collapse
                            in={expandedRows.includes(row.id)}
                            timeout="auto"
                            unmountOnExit
                          >
                            {(user.typeEmp === "Quản trị" || user.typeEmp === "Trưởng khoa") && <Box
                              sx={{
                                margin: 1,
                                bgcolor: "#F1F8FF",
                                padding: "10px",
                              }}
                            >
                              <Typography
                                variant="h6"
                                gutterBottom
                                component="div"
                              >
                                <div className="swaper-title">
                                  <span>Lịch sử bảo dưỡng</span>

                                  <IconButton
                                    aria-label="add"
                                    size="small"
                                    color="info"
                                    onClick={() => clickAdd(row.id)}
                                  >
                                    <AddCircleIcon></AddCircleIcon>
                                  </IconButton>
                                  <Fade
                                    in={
                                      alertIsMaintaining &&
                                      arrayAlertErrorMaintain.includes(row.id)
                                    }
                                  >
                                    <Alert
                                      variant="outlined"
                                      severity="error"
                                      className="error-add-maintain"
                                    >
                                      Thiết bị đang được bảo trì hoặc sử dụng !
                                    </Alert>
                                  </Fade>
                                </div>
                              </Typography>
                              <table className="collapse-table">
                                <thead>
                                  <th className="maintain-header">Thời gian</th>
                                  <th className="maintain-header">
                                    Thời gian hoàn thành
                                  </th>
                                  <th className="maintain-header">Nội dung</th>
                                  {formsState.includes(row.id) ? (
                                    <th className="maintain-header"></th>
                                  ) : (
                                    <>
                                      <th className="maintain-header">
                                        Trạng thái
                                      </th>
                                      <th className="maintain-header">
                                        Thao tác
                                      </th>
                                    </>
                                  )}
                                </thead>
                                <tbody>
                                  {formsState.includes(row.id) && (
                                    <tr>
                                      <td className="maintain-data">{`${getFormattedDate()}`}</td>
                                      <td className="maintain-data">---</td>
                                      <td className="maintain-data">
                                        <input
                                          className="input-content"
                                          type="text"
                                          autoFocus
                                          autoComplete="off"
                                        ></input>
                                      </td>
                                      <td className="maintain-data">
                                        <button
                                          className="btn-use"
                                          onClick={() => addMaintain(row.id)}
                                        >
                                          Thêm
                                        </button>
                                        <button
                                          className="btn-use"
                                          onClick={() =>
                                            cancelAddMaintain(row.id)
                                          }
                                        >
                                          Hủy
                                        </button>
                                      </td>
                                    </tr>
                                  )}

                                  {maintain
                                    .filter((item) => item.id === row.id)
                                    .map((row, index) => (
                                      <tr>
                                        <td className="maintain-data">
                                          {row.time}
                                        </td>
                                        <td className="maintain-data">
                                          {row.time_finish}
                                        </td>
                                        <td className="maintain-data">
                                          {row.content}
                                        </td>
                                        <td className="maintain-data">
                                          <div className="state-maintain">
                                            {" "}
                                            {row.state ? (
                                              <span>Đã bảo trì</span>
                                            ) : (
                                              <button
                                                onClick={() =>
                                                  setStateMaintain(
                                                    row.id_maintain
                                                  )
                                                }
                                                className="btn-confirm-maintain"
                                              >
                                                Xác nhận bảo trì
                                              </button>
                                            )}{" "}
                                          </div>
                                        </td>
                                        <td className="maintain-data">
                                          {/* <button
                                            className="action-btn"
                                            id="delete-btn"
                                            type="submit"
                                          >
                                            <FontAwesomeIcon
                                              icon={faTrashCan}
                                              style={{
                                                color: "#ff3333",
                                              }}
                                              onClick={() =>
                                                onClickDeleteMaintain(
                                                  row.id_maintain
                                                )
                                              }
                                            />
                                          </button> */}
                                          <IconButton
                                            aria-label="delete"
                                            size="small"
                                            color="error"
                                            onClick={() =>
                                              onClickDeleteMaintain(
                                                row.id_maintain
                                              )
                                            }
                                          >
                                            <DeleteOutlineIcon></DeleteOutlineIcon>
                                          </IconButton>
                                        </td>
                                      </tr>
                                    ))}
                                </tbody>
                              </table>
                            </Box>}
                            <Box
                              sx={{
                                margin: 1,
                                bgcolor: "#F1F8FF",
                                padding: "10px",
                              }}
                            >
                              <Typography
                                variant="h6"
                                gutterBottom
                                component="div"
                              >
                                <div className="swaper-title">
                                  <span>Lịch sử sử dụng</span>
                                  <IconButton
                                    aria-label="add"
                                    size="small"
                                    color="info"
                                    onClick={() => clickAddUse(row.id)}
                                  >
                                    <AddCircleIcon></AddCircleIcon>
                                  </IconButton>
                                  <Fade
                                    in={
                                      alertIsUsing &&
                                      arrayAlertErrorUse.includes(row.id)
                                    }
                                  >
                                    <Alert
                                      variant="outlined"
                                      severity="error"
                                      className="error-add-maintain"
                                    >
                                      {msgErrorUse}
                                    </Alert>
                                  </Fade>
                                </div>
                              </Typography>
                              <table className="collapse-table">
                                <thead>
                                  <th className="header-use">Thời gian</th>
                                  <th className="header-use">Thời gian trả</th>
                                  <th className="header-use">Người sử dụng</th>
                                  {formsUseState.includes(row.id) ? (
                                    <th className="header-use"></th>
                                  ) : (
                                    <>
                                      <th className="header-use">Trạng thái</th>
                                      <th className="header-use">Thao tác</th>
                                    </>
                                  )}
                                </thead>
                                <tbody>
                                  {formsUseState.includes(row.id) && (
                                    <tr>
                                      <td className="data-use">{`${getFormattedDate()}`}</td>
                                      <td className="data-use">---</td>
                                      <td className="data-use">
                                        <InputBorrower
                                          inputSearch={inputborrower}
                                          setInputSearch={setInputBorrower}
                                        />
                                      </td>
                                      <td className="data-use">
                                        <button
                                          className="btn-use"
                                          onClick={() => handleAddUse(row.id)}
                                        >
                                          Thêm
                                        </button>
                                        <button
                                          className="btn-use"
                                          onClick={() =>
                                            onClickCancelAddUse(row.id)
                                          }
                                        >
                                          Hủy
                                        </button>
                                      </td>
                                    </tr>
                                  )}

                                  {use
                                    .filter((item) => item.id === row.id)
                                    .map((row, index) => (
                                      <tr>
                                        <td className="data-use">{row.time}</td>
                                        <td className="data-use">
                                          {row.time_finish}
                                        </td>
                                        <td className="data-use">
                                          <div
                                            className="row-borrower"
                                            onClick={() => {
                                              setIdToRead(row.borrower);
                                              setDisplayForm(true);
                                            }}
                                          >
                                            {row.borrower}
                                          </div>
                                        </td>
                                        <td className="data-use">
                                          <div className="state-use">
                                            {row.state ? (
                                              <span>Đã trả</span>
                                            ) : (
                                              <button
                                                className="btn-confirm-return"
                                                onClick={() =>
                                                  setStateUse(row.id_use)
                                                }
                                              >
                                                Xác nhận trả
                                              </button>
                                            )}
                                          </div>
                                        </td>
                                        <td className="data-use">
                                          {/* <button
                                            className="action-btn"
                                            id="delete-btn"
                                            type="submit"
                                          >
                                            <FontAwesomeIcon
                                              icon={faTrashCan}
                                              style={{
                                                color: "#ff3333",
                                              }}
                                              onClick={() =>
                                                onClickDeleteUse(row.id_use)
                                              }
                                            />
                                          </button> */}

                                          <IconButton
                                            aria-label="delete"
                                            size="small"
                                            color="error"
                                            onClick={() =>
                                              onClickDeleteUse(row.id_use)
                                            }
                                          >
                                            <DeleteOutlineIcon></DeleteOutlineIcon>
                                          </IconButton>
                                        </td>
                                      </tr>
                                    ))}
                                </tbody>
                              </table>
                            </Box>
                          </Collapse>
                        </td>
                      </tr>
                    )}
                  </>
                );
              })}
            {emptyRows > 0 && <tr style={{ height: 55 * emptyRows }}></tr>}
          </tbody>
          <tfoot>
            {/* <tr>
                            <CustomTablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                                colSpan={7}
                                count={equipmentsRows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                labelRowsPerPage={"Số hàng hiển thị:"}
                                slotProps={{
                                    select: {
                                        "aria-label": "rows per page",
                                    },
                                    actions: {
                                        showFirstButton: true,
                                        showLastButton: true,
                                        slots: {
                                            firstPageIcon: FirstPageRoundedIcon,
                                            lastPageIcon: LastPageRoundedIcon,
                                            nextPageIcon: ChevronRightRoundedIcon,
                                            backPageIcon: ChevronLeftRoundedIcon,
                                        },
                                    },
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </tr> */}
          </tfoot>
        </table>
        <div className="pagination-equip">
          <Pagination
            color="primary"
            onChange={handleChangePage}
            page={page}
            count={Math.ceil(equipmentsRows.length / rowsPerPage)}
            // rowsPerPage={5}
            showFirstButton
            showLastButton
          />
        </div>
        {modalOpen && (
          <Modal
            closeModal={() => {
              setModalOpen(false);
            }}
            onSubmit={handleSubmit}
            defaultValue={
              idToEdit !== null &&
              equipmentsRows.find((item) => item.id === idToEdit)
            }
            setAlertAddSuccess={setAlertAddSuccess}
          />
        )}
        <ConfirmModal
          displayConfirm={displayConfirm}
          setDisplayConfirm={setDisplayConfirm}
          handleDeleteRow={handleDeleteRow}
        ></ConfirmModal>

        <ConfirmDeleteMaintain
          alertDeleteMaintain={alertDeleteMaintain}
          setAlertDeteteMaintain={setAlertDeteteMaintain}
          handleDeleteMaintain={handleDeleteMaintain}
        />
        <ConfirmDeleteUse
          alertDeleteUse={alertDeleteUse}
          setAlertDeleteUse={setAlertDeleteUse}
          handleDeleteUse={handleDeleteUse}
        />
        {alertAddSuccess && <UpdateSuccess />}
        <ModalFormAdd
          displayForm={displayForm}
          setDisplayForm={setDisplayForm}
          rowToEdit={idToRead}
          dataEmp={dataEmp}
          read={true}
        />
      </div>
      <Footer />
    </div>
  );
}

const blue = {
  50: "#F0F7FF",
  200: "#A5D8FF",
  400: "#3399FF",
  900: "#003A75",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const CustomTablePagination = styled(TablePagination)(
  ({ theme }) => `
   & .${classes.spacer} {
     display: none;
   }
    & .${classes.toolbar}  {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
      padding: 4px 0;
  
      @media (min-width: 768px) {
        flex-direction: row;
        align-items: center;
      }
    }
  
    & .${classes.selectLabel} {
      margin: 0;
    }
  
    & .${classes.select}{
      font-family: 'IBM Plex Sans', sans-serif;
      padding: 2px 0 2px 4px;
      border: 1px solid ${theme.palette.mode === "dark" ? grey[800] : grey[200]
    };
      border-radius: 6px; 
      background-color: transparent;
      color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
      transition: all 100ms ease;
  
      &:hover {
       background-color: ${theme.palette.mode === "dark" ? grey[800] : grey[50]
    };
       border-color: ${theme.palette.mode === "dark" ? grey[600] : grey[300]};
     }
      &:focus {
       outline: 3px solid ${theme.palette.mode === "dark" ? blue[400] : blue[200]
    };
       border-color: ${blue[400]};
     }
   }
    & .${classes.displayedRows} {
      margin: 0;
  
      @media (min-width: 768px) {
        margin-left: auto;
      }
    }
  
    & .${classes.actions} {
      display: flex;
      gap: 6px;
      border: transparent;
      text-align: center;
    }
  
    & .${classes.actions} > button {
      display: flex;
      align-items: center;
      padding: 0;
      border: transparent;
      border-radius: 50%;
      background-color: transparent;
      border: 1px solid ${theme.palette.mode === "dark" ? grey[800] : grey[200]
    };
      color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
      transition: all 120ms ease;
  
      > svg {
        font-size: 22px;
      }
  
      &:hover {
       background-color: ${theme.palette.mode === "dark" ? grey[800] : grey[50]
    };
       border-color: ${theme.palette.mode === "dark" ? grey[600] : grey[300]};
     }
      &:focus {
       outline: 3px solid ${theme.palette.mode === "dark" ? blue[400] : blue[200]
    };
       border-color: ${blue[400]};
     }
      &:disabled {
       opacity: 0.3;
       &:hover {
         border: 1px solid ${theme.palette.mode === "dark" ? grey[800] : grey[200]
    };
         background-color: transparent;
       }
     }
   }
   `
);
