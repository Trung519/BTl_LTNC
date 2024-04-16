import classNames from "classnames/bind";
import styles from "./ModalFormAdd.module.scss";
import { TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import InputSelect from "../InputSelect";
import { Alert } from "@mui/material";
import Fade from "@mui/material/Fade";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import { getData, writeUserData } from "../../../../services/firebase";
import { Construction, Key } from "@mui/icons-material";

const cx = classNames.bind(styles);
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

function ModalFormAdd({
  displayForm,
  setDisplayForm,
  rowToEdit,
  dataEmp,
  setDataEmp,
}) {
  // const [dataEmp, setDataEmp] = useState([]);
  // useEffect(() => {
  //   getData().then((post) => {
  //     setDataEmp(post["Employee"] ?? []);
  //   });
  // }, []);

  const [formState, setFormState] = useState([]);
  console.log("rowtoedit", rowToEdit);
  useEffect(() => {
    let findEmp = dataEmp.find((item) => item.ID === rowToEdit);
    if (findEmp) {
      setFormState(findEmp);
    } else {
      setFormState({
        AcademicDegree: "Cử nhân",
        Department: "",
        FirstName: "",
        Gender: "Nam",
        ID: "",
        LastName: "",
        birthDay: getFormattedDate(),
        typeEmp: "Bác sỹ",
      });
    }
  }, [rowToEdit]);
  const [displayAlertError, setDisplayAlertError] = useState(false);

  const handleDateChange = (newDate) => {
    const formattedDate = dayjs(newDate).format("DD/MM/YYYY");
    setFormState((prev) => ({ ...prev, birthDay: formattedDate }));
  };
  const isValidEmp = () => {
    let doctor = dataEmp.filter((item) => item.typeEmp === "Bác sỹ");
    let nurse = dataEmp.filter((item) => item.typeEmp === "Y tá");
    let pharmacist = dataEmp.filter((item) => item.typeEmp === "Dược sỹ");
    let supporter = dataEmp.filter((item) => item.typeEmp === "Hậu cần");
    setFormState((prev) => {
      let newEmp = prev;
      if (newEmp.typeEmp === "Bác sỹ") {
        newEmp.ID = "BS" + String(doctor.length).padStart(3, "0");
      } else if (newEmp.typeEmp === "Y tá") {
        newEmp.ID = "NS" + String(nurse.length).padStart(3, "0");
      } else if (newEmp.typeEmp === "Dược sỹ") {
        newEmp.ID = "PH" + String(pharmacist.length).padStart(3, "0");
      } else if (newEmp.typeEmp === "Hậu cần") {
        newEmp.ID = "SP" + String(supporter.length).padStart(3, "0");
      }

      return newEmp;
    });
    const values = Object.values(formState);
    return !values.includes("");
  };
  const handleAddEmp = () => {
    if (isValidEmp()) {
      if (rowToEdit) {
        setDataEmp((prev) => {
          let newdataEmp = prev.map((item) => {
            if (item.ID === rowToEdit) {
              return formState;
            } else return item;
          });
          writeUserData(newdataEmp, "/Employee");
          return newdataEmp;
        });
      } else {
        setDataEmp((prev) => {
          let newDataEmp = [formState, ...prev];
          // console.log("newdataEMp", newDataEmp);
          writeUserData(newDataEmp, "/Employee");
          setFormState({
            AcademicDegree: "Cử nhân",
            Department: "",
            FirstName: "",
            Gender: "Nam",
            ID: "",
            LastName: "",
            birthDay: getFormattedDate(),
            typeEmp: "Bác sỹ",
          });
          return newDataEmp;
        });
      }
      setDisplayForm(false);
    } else {
      setDisplayAlertError(true);
      setTimeout(() => {
        setDisplayAlertError(false);
      }, 3000);
    }
  };
  // console.log("dataEmp", dataEmp);
  return (
    displayForm && (
      <div
        className="modal-container"
        onClick={(e) => {
          if (e.target.className === "modal-container") {
            setDisplayForm(false);
          }
        }}
      >
        <div className={cx("modal-content")}>
          <div className={cx("header-page")}>
            <div className={cx("title")}> Nhân Viên Y Tế</div>
            <Fade in={displayAlertError}>
              <Alert
                variant="outlined"
                severity="error"
                className={cx("error-alert")}
              >
                Vui lòng không để trống thông tin !
              </Alert>
            </Fade>
          </div>
          <div className={cx("form-input")}>
            <div>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDkEoKUkglVAFqCIra2gk0bxb4ipxLRtKp8w&usqp=CAU"></img>
            </div>
            <div className="container">
              <div className="row row-cols-1 row-cols-lg-2">
                <div className="col">
                  <TextField
                    id="standard-basic"
                    label="First Name"
                    variant="standard"
                    // className={cx("input-info", {
                    //   "red-border": !formState.fullName,
                    // })}
                    value={formState.FirstName}
                    fullWidth
                    onChange={(e) =>
                      setFormState({ ...formState, FirstName: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="col">
                  <TextField
                    id="standard-basic"
                    label="Last Name"
                    variant="standard"
                    // className={cx("input-info", {
                    //   "red-border": !formState.fullName,
                    // })}
                    value={formState.LastName}
                    fullWidth
                    onChange={(e) =>
                      setFormState({ ...formState, LastName: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div className="row row-cols-1 row-cols-lg-2">
                <div className="col">
                  <lable>Bằng cấp</lable>
                  <select
                    value={formState.AcademicDegree}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        AcademicDegree: e.target.value,
                      })
                    }
                  >
                    <option>Cử nhân</option>
                    <option>Thạc sỹ</option>
                    <option>Tiến sỹ</option>
                  </select>
                </div>
                <div className="col">
                  <lable>Giới tính</lable>
                  <select
                    value={formState.Gender}
                    onChange={(e) =>
                      setFormState({ ...formState, Gender: e.target.value })
                    }
                  >
                    <option>Nam</option>
                    <option>Nữ</option>
                    <option>Khác</option>
                  </select>
                </div>
              </div>

              <div className="row row-cols-1 row-cols-lg-2">
                <div className="col">
                  {/* BO PHAN KHOA */}
                  <InputSelect
                    formState={formState}
                    setFormState={setFormState}
                  />
                </div>

                <div className="col">
                  <label>Loại nhân viên</label>
                  <select
                    value={formState.typeEmp}
                    onChange={(e) =>
                      setFormState({ ...formState, typeEmp: e.target.value })
                    }
                  >
                    <option>Bác sỹ</option>
                    <option>Y tá</option>
                    <option>Dược sỹ</option>
                    <option>Hậu cần</option>
                  </select>
                </div>
                <div className="col">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      sx={{ marginTop: "10px" }}
                      format="DD/MM/YYYY"
                      label="Ngày sinh"
                      value={dayjs(formState.birthDay, "DD/MM/YYYY")}
                      onChange={handleDateChange}
                    />
                  </LocalizationProvider>
                </div>
              </div>
              <div className="row justify-content-md-center">
                <div className="col-1">
                  <button
                    id="submit-btn"
                    className={cx("btn-save")}
                    type="submit"
                    onClick={handleAddEmp}
                  >
                    Lưu
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
export default ModalFormAdd;
