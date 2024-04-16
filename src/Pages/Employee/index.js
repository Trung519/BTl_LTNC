import classNames from "classnames/bind";
import { TextField } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import styles from "./Employee.module.scss";
import ModalFormAdd from "./Components/ModalFormAdd";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { getData } from "../../services/firebase";
import ConfirmDelete from "./Components/ConfirmDelete";
import Footer from "../../Components/Footer";

const cx = classNames.bind(styles);
function Employee() {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const [displayForm, setDisplayForm] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const [rowToEdit, setRowToEdit] = useState(null);
  const [dataEmp, setDataEmp] = useState([]);
  useEffect(() => {
    getData().then((post) => {
      setDataEmp(post["Employee"] ?? []);
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
  const emptyRows = Math.max(0, page * rowsPerPage - dataEmp.length);
  const handleSearch = (e) => {
    let lowerCase = e.target.value.toLowerCase();
    setInputSearch(lowerCase);
  };
  return (
    <div id="backgroundE">
      <div id="container">
        <h1 className={cx("header-page")}>
          Quản lý nhân viên y tế
          <button
            onClick={() => {
              setDisplayForm(true);
              setRowToEdit(null);
            }}
            className={cx("btn-add-new")}
          >
            +Thêm mới
          </button>
        </h1>
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
            <th>Nhân viên</th>
            <th>Thao tác</th>
          </thead>
          <tbody>
            {filterDataEmp
              .slice(page * rowsPerPage - rowsPerPage, page * rowsPerPage)
              .map((item, index) => (
                <tr key={index}>
                  <td className={cx("col-id")}>{item.ID}</td>
                  <td
                    className={cx("head-first")}
                  >{`${item.FirstName} ${item.LastName}`}</td>
                  <td>{item.Gender}</td>
                  <td>{item.birthDay} </td>
                  <td>{item.AcademicDegree}</td>
                  <td>{item.Department}</td>
                  <td>{item.typeEmp}</td>
                  <td>
                    <div className={cx("some-btn")}>
                      <button
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
                      </button>
                      <button
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
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            <tr style={{ height: 56 * emptyRows }}></tr>
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
            rowsPerPage={5}
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
      />
      <ConfirmDelete
        confirmDelete={confirmDelete}
        setConfirmDelete={setConfirmDelete}
        setDataEmp={setDataEmp}
        ID={rowToEdit}
      />
      <Footer />
    </div>
  );
}

export default Employee;
