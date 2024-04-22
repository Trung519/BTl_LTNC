import classNames from "classnames/bind";
import styles from "./ModalFormAdd.module.scss";
import { TextField, colors } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import InputSelect from "../InputSelect";
import { Alert } from "@mui/material";
import Fade from "@mui/material/Fade";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

import dayjs from "dayjs";
import { writeUserData } from "../../../../services/firebase";

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
  setAlertAddSuccess,
  read,
}) {
  // const [dataEmp, setDataEmp] = useState([]);
  // useEffect(() => {
  //   getData().then((post) => {
  //     setDataEmp(post["Employee"] ?? []);
  //   });
  // }, []);

  const [formState, setFormState] = useState([]);
  const [msgError, setMsgError] = useState("");
  // console.log("rowtoedit", rowToEdit);
  useEffect(() => {
    let findEmp = dataEmp.find((item) => item.ID === rowToEdit);
    if (findEmp) {
      setFormState(findEmp);
    } else {
      setFormState({
        AcademicDegree: "",
        Department: "",
        FirstName: "",
        Gender: "",
        ID: "",
        LastName: "",
        birthDay: getFormattedDate(),
        typeEmp: "",
      });
    }
  }, [rowToEdit]);
  const [displayAlertError, setDisplayAlertError] = useState(false);
  function isValidAge(birthDayString) {
    // format dd/mm/yyyy;
    if (birthDayString) {
      // console.log("birthDay", birthDayString);
      const [day, month, year] = birthDayString.split("/");
      const birthDay = new Date(`${year}-${month}-${day}`);
      const today = new Date();
      const age = today.getFullYear() - birthDay.getFullYear();
      if (age < 18) {
        setMsgError("Nhân viên chưa đủ 18 tuổi !");
        setDisplayAlertError(true);
        setTimeout(() => {
          setDisplayAlertError(false);
        }, 3000);
        return false;
      }
      return true;
    }
    setMsgError("Vui lòng nhập ngày sinh !");
    setDisplayAlertError(true);
    setTimeout(() => {
      setDisplayAlertError(false);
    }, 3000);
    return false;
  }

  const handleDateChange = (newDate) => {
    const formattedDate = dayjs(newDate).format("DD/MM/YYYY");
    setFormState((prev) => ({ ...prev, birthDay: formattedDate }));
  };

  // const handleChangeBirthDate = (e) => {
  //   // const [year, month, day] = e.target.value.split("-");
  //   // const date = `${day}/${month}/${year}`;
  //   // console.log(date);
  //   setFormState((prev) => ({ ...prev, birthDay: e.target.value }));
  // };
  const isValidEmp = () => {
    // let admin = dataEmp.filter((item) => item.typeEmp === "Quản trị");
    // let dean = dataEmp.filter((item) => item.typeEmp === "Trưởng khoa");
    // let doctor = dataEmp.filter((item) => item.typeEmp === "Bác sỹ");
    // let nurse = dataEmp.filter((item) => item.typeEmp === "Y tá");
    // let pharmacist = dataEmp.filter((item) => item.typeEmp === "Dược sỹ");
    // let supporter = dataEmp.filter((item) => item.typeEmp === "Hậu cần");
    if (!rowToEdit) {
      setFormState((prev) => {
        let newEmp = prev;
        const randomNumber = Math.floor(Math.random() * 10000000);

        newEmp.ID = randomNumber.toString().padStart(7, "0");
        return newEmp;
      });
    }

    const values = Object.values(formState);
    if (values.includes("")) {
      setMsgError("Vui lòng không để trống thông tin !");
      setDisplayAlertError(true);
      setTimeout(() => {
        setDisplayAlertError(false);
      }, 3000);
      return false;
    }
    if (formState.typeEmp === "Trưởng khoa") {
      let findDean = dataEmp.find(
        (item) =>
          item.Department === formState.Department &&
          item.typeEmp === "Trưởng khoa" &&
          item.ID !== formState.ID
      );
      if (findDean) {
        console.log(findDean);
        setMsgError(
          `${findDean.ID} đang là Trưởng khoa ${formState.Department}`
        );
        setDisplayAlertError(true);
        setTimeout(() => {
          setDisplayAlertError(false);
        }, 3000);
        return false;
      }
    }

    return true;
  };
  const handleAddEmp = () => {
    if (isValidEmp() && isValidAge(formState.birthDay)) {
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
        toast.success("Cập nhật thành công !", {
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
        // luu du lieu moi vao va set ve trang thai ban dau
        setDataEmp((prev) => {
          let newDataEmp = [formState, ...prev];
          // console.log("newdataEMp", newDataEmp);
          writeUserData(newDataEmp, "/Employee");
          setFormState({
            AcademicDegree: "",
            Department: "",
            FirstName: "",
            Gender: "Nam",
            ID: "",
            LastName: "",
            birthDay: getFormattedDate(),
            typeEmp: "",
          });
          return newDataEmp;
        });
        toast.success("Thêm Nhân viên thành công !", {
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
      }
      setDisplayForm(false);
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
                {/* Vui lòng không để trống thông tin ! */}
                {msgError}
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
                    label="Họ"
                    variant="standard"
                    disabled={read}
                    value={formState.LastName}
                    fullWidth
                    onChange={(e) =>
                      setFormState({ ...formState, LastName: e.target.value })
                    }
                    required
                    autoComplete="off"
                  />
                </div>
                <div className="col">
                  <TextField
                    id="standard-basic"
                    label="Tên"
                    variant="standard"
                    // className={cx("input-info", {
                    //   "red-border": !formState.fullName,
                    // })}
                    disabled={read}
                    value={formState.FirstName}
                    fullWidth
                    onChange={(e) =>
                      setFormState({ ...formState, FirstName: e.target.value })
                    }
                    required
                    autoComplete="off"
                  />
                </div>
              </div>
              <div className="row row-cols-1 row-cols-lg-2 ">
                <div className="col">
                  <div className={cx("info-select")}>
                    {/* <label>Bằng cấp</label>
                    <select
                      value={formState.AcademicDegree}
                      onChange={(e) =>
                        setFormState({
                          ...formState,
                          AcademicDegree: e.target.value,
                        })
                      }
                      disabled={read}
                    >
                      <option>Cử nhân</option>
                      <option>Thạc sĩ</option>
                      <option>Tiến sĩ</option>
                    </select> */}

                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Bằng Cấp
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={formState.AcademicDegree}
                        label="Bằng Cấp"
                        onChange={(e) =>
                          setFormState({
                            ...formState,
                            AcademicDegree: e.target.value,
                          })
                        }
                      >
                        <MenuItem value={"Cử Nhân"}>Cử Nhân</MenuItem>
                        <MenuItem value={"Thạc Sĩ"}>Thạc Sĩ</MenuItem>
                        <MenuItem value={"Tiến Sĩ"}>Tiến Sĩ</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <div className="col">
                  <div className={cx("info-select")}>
                    {/* <label>Giới tính</label>
                    <select
                      value={formState.Gender}
                      onChange={(e) =>
                        setFormState({ ...formState, Gender: e.target.value })
                      }
                      disabled={read}
                    >
                      <option>Nam</option>
                      <option>Nữ</option>
                      <option>Khác</option>
                    </select> */}
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Giới Tính
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={formState.Gender}
                        label="Giới Tính"
                        onChange={(e) =>
                          setFormState({
                            ...formState,
                            Gender: e.target.value,
                          })
                        }
                      >
                        <MenuItem value={"Nam"}>Nam</MenuItem>
                        <MenuItem value={"Nữ"}>Nữ</MenuItem>
                        <MenuItem value={"Khác"}>Khác</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>
              </div>

              <div className="row row-cols-1 row-cols-lg-2 align-items-center">
                <div className="col">
                  {/* BO PHAN KHOA */}
                  <InputSelect
                    formState={formState}
                    setFormState={setFormState}
                    disabled={read}
                  />
                </div>

                <div className="col">
                  <div className={cx("info-select")}>
                    {/* <label>Chức vụ</label>
                    <select
                      value={formState.typeEmp}
                      onChange={(e) =>
                        setFormState({ ...formState, typeEmp: e.target.value })
                      }
                      disabled={read}
                    >
                      <option>Quản trị</option>
                      <option>Trưởng khoa</option>
                      <option>Bác sĩ</option>
                      <option>Y tá</option>
                      <option>Dược sĩ</option>
                      <option>Hậu cần</option>
                    </select> */}
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Chức Vụ
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={formState.typeEmp}
                        label="Chức Vụ"
                        onChange={(e) =>
                          setFormState({
                            ...formState,
                            typeEmp: e.target.value,
                          })
                        }
                      >
                        <MenuItem value={"Quản trị"}>Quản trị</MenuItem>
                        <MenuItem value={"Trưởng khoa"}>Trưởng khoa</MenuItem>
                        <MenuItem value={"Bác sĩ"}>Bác sĩ</MenuItem>
                        <MenuItem value={"Y tá"}>Y tá</MenuItem>
                        <MenuItem value={"Dược sĩ"}>Dược sĩ</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>
                {/* <div className="col">
                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    disabled={read}
                  >
                    <DatePicker
                      sx={{ marginTop: "10px" }}
                      format="DD/MM/YYYY"
                      label="Ngày sinh"
                      value={dayjs(formState.birthDay, "DD/MM/YYYY")}
                      onChange={handleDateChange}
                      disabled={read}
                    />
                  </LocalizationProvider>
                </div> */}
                <div className="col">
                  {/* <div className={cx("input-date")}>
                    <input
                      type="date"
                      name="date"
                      value={formState.birthDay}
                      onChange={handleChangeBirthDate}
                    ></input>
                    <label htmlFor="date">Ngày sinh</label>
                  </div> */}
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <DatePicker
                        label="Ngày Sinh"
                        // value={formState.birthDay}
                        value={dayjs(formState.birthDay, "DD/MM/YYYY")}
                        onChange={handleDateChange}
                        format="DD/MM/YYYY"
                        referenceDate={dayjs("22/04/2024", "DD/MM/YYYY")}
                        disabled={read}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>
              </div>
              <div className="row justify-content-md-center">
                <div className={cx("btn-action")}>
                  <button
                    className={cx("btn-save", { disable: read })}
                    onClick={() => setDisplayForm(false)}
                  >
                    Hủy
                  </button>
                  <button
                    id="submit-btn"
                    className={cx("btn-save", { disable: read })}
                    type="submit"
                    onClick={handleAddEmp}
                    disabled={read}
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
