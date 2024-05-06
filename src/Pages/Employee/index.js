import classNames from "classnames/bind";
import { TextField } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import styles from "./Employee.module.scss";
import ModalFormAdd from "./Components/ModalFormAdd";
import { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import { getData } from "../../services/firebase";
import ConfirmDelete from "./Components/ConfirmDelete";
import Footer from "../../Components/Footer";
import UpdateSuccess from "../../Components/UpdateSuccess";

//fixed icon
import IconButton from "@mui/material/IconButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const cx = classNames.bind(styles);
function Employee({ user }) {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const [displayForm, setDisplayForm] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const [rowToEdit, setRowToEdit] = useState(null);
  const [dataEmp, setDataEmp] = useState([]);
  const [alertAddSuccess, setAlertAddSuccess] = useState(false);
  useEffect(() => {
    getData().then((post) => {
      setDataEmp(post["Employee"] ?? []);
      handleLoadingDone();
      setRowToEdit(-1);
    });
  }, []);

  const handleChange = (e, p) => {
    setPage(p);
  };
  const [inputSearch, setInputSearch] = useState("");
  const filterDataEmp = dataEmp.filter((emp) => {
    if (inputSearch === "") {
      return emp;
    } else {
      return (
        emp.FirstName.toLowerCase().includes(inputSearch) ||
        emp.LastName.toLowerCase().includes(inputSearch) ||
        emp.ID.toLowerCase().includes(inputSearch) ||
        emp.birthDay.toLowerCase().includes(inputSearch) ||
        emp.typeEmp.toLowerCase().includes(inputSearch) ||
        emp.Gender.toLowerCase().includes(inputSearch) ||
        emp.Department.toLowerCase().includes(inputSearch) ||
        emp.AcademicDegree.toLowerCase().includes(inputSearch)
      );
    }
  });
  const emptyRows = Math.max(0, page * rowsPerPage - filterDataEmp.length);
  const handleSearch = (e) => {
    let lowerCase = e.target.value.toLowerCase();
    setInputSearch(lowerCase);
  };
  const [loading, setLoading] = useState(true);
  const handleLoadingDone = () => {
    setLoading(false);
  };
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
        <div id="header-container">
          <button
            onClick={() => {
              setDisplayForm(true);
              setRowToEdit(null);
            }}
            className={cx("btn-add-new")}
          >
            +Thêm mới
          </button>

          <div id="header-box">
            <h1 className={cx("header-page")}>Quản lý nhân viên y tế</h1>
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
            label="Tìm kiếm"
            onChange={(e) => handleSearch(e)}
            InputProps={{
              style: {
                borderRadius: "40px",
                background: "#F4F6F6",
              },
            }}
          />
        </div>
        <table className={cx("table-emp")}>
          <thead>
            <th className="col-id">ID</th>
            <th className={cx("head-first")}>Họ và tên</th>
            <th>Giới tính</th>
            <th>Ngày sinh</th>
            <th>Bằng cấp</th>
            <th>Bộ Phận Khoa</th>
            <th>Chức vụ</th>
            {user.typeEmp === "Quản trị" && <th>Thao tác</th>}
          </thead>
          <tbody>
            {filterDataEmp
              .slice(page * rowsPerPage - rowsPerPage, page * rowsPerPage)
              .map((item, index) => (
                <tr key={index}>
                  <td className={cx("col-id")}>{item.ID}</td>
                  <td
                    className={cx("head-first")}
                  >{`${item.LastName} ${item.FirstName}`}</td>
                  <td>{item.Gender}</td>
                  <td>{item.birthDay} </td>
                  <td>{item.AcademicDegree}</td>
                  <td>{item.Department}</td>
                  <td>{item.typeEmp}</td>
                  {user.typeEmp === "Quản trị" && <td>
                    <div className={cx("some-btn")}>
                      {/* <button
                        className="action-btn"
                        id="delete-btn"
                        type="submit"
                        onClick={() => {
                          setRowToEdit(item.ID);
                          setConfirmDelete(true);
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faTrashCan}
                          style={{ color: "#ff3333" }}
                        />
                      </button> */}
                      {/* <button
                        className="action-btn"
                        id="edit-btn"
                        type="submit"
                        onClick={() => {
                          setDisplayForm(true);
                          setRowToEdit(item.ID);
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faPenToSquare}
                          style={{ color: "#1a9cff" }}
                        />
                      </button> */}

                      <IconButton
                        aria-label="edit"
                        size="small"
                        onClick={() => {
                          setDisplayForm(true);
                          setRowToEdit(item.ID);
                        }}
                      >
                        <EditOutlinedIcon></EditOutlinedIcon>
                      </IconButton>

                      <IconButton
                        aria-label="delete"
                        size="small"
                        color="error"
                        onClick={() => {
                          setRowToEdit(item.ID);
                          setConfirmDelete(true);
                        }}
                      >
                        <DeleteOutlineIcon></DeleteOutlineIcon>
                      </IconButton>
                    </div>
                  </td>}
                </tr>
              ))}
            <tr style={{ height: 55 * emptyRows }}></tr>
          </tbody>
          <tfoot>
            <tr></tr>
          </tfoot>
        </table>
        <div className={cx("pagination")}>
          <Pagination
            color="primary"
            onChange={handleChange}
            page={page}
            count={Math.ceil(dataEmp.length / rowsPerPage)}
            // rowsPerPage={5}
            showFirstButton
            showLastButton
          />
        </div>
      </div>
      <ModalFormAdd
        displayForm={displayForm}
        setDisplayForm={setDisplayForm}
        rowToEdit={rowToEdit}
        dataEmp={dataEmp}
        setDataEmp={setDataEmp}
        setAlertAddSuccess={setAlertAddSuccess}
      />
      <ConfirmDelete
        confirmDelete={confirmDelete}
        setConfirmDelete={setConfirmDelete}
        setDataEmp={setDataEmp}
        ID={rowToEdit}
      />
      {alertAddSuccess && <UpdateSuccess />}
      <Footer />
    </div>
  );
}

export default Employee;
