import { useState, useEffect } from "react";
import { getData, writeUserData } from "../../services/firebase";
import { Link } from "react-router-dom";
import styles from "./SignUpForm.module.css";
import doctorImage from "../assets/doctor_4x.png";
import Alert from "@mui/material/Alert";
import Fade from "@mui/material/Fade";

export default function SignUpForm() {
  const [account, setAccount] = useState([]);
  const [dataEmp, setDataEmp] = useState([]);
  const [signUpState, setSignUpState] = useState({
    Password: "",
    Username: "",
    Email: "",
    ID: "",
  });
  const [displayAlert, setDisplayAlert] = useState(false);

  useEffect(() => {
    getData().then((post) => {
      if (post != null) {
        setAccount(post["Account"] ?? []);
        setDataEmp(post["Employee"] ?? []);
      }
    });
  }, [displayAlert]);

  const [errorInput, setErrorInput] = useState([
    {
      display: false,
      msg: "",
    },
    {
      display: false,
      msg: "",
    },
    {
      display: false,
      msg: "",
    },
    {
      display: false,
      msg: "",
    },
  ]);

  // console.log('re-render');
  const [state, setState] = useState(true);
  function checkInvalid() {
    let form = document.getElementById("registerForm");
    var inputs = form.getElementsByTagName("input");
    // console.log(inputs);
    let isError = false;
    let newState = errorInput;
    setState((pre) => !pre);

    for (var i = 0; i < inputs.length; i++) {
      // DUYỆT QUA TỪNG INPUT NẾU TRỐNG THÌ HIỆN LỖI VUI LÒNG NHẬP
      // NẾU KHÔNG TRỐNG
      // NẾU USERNAME CÓ NGƯỜI DÙNG HIÊNJ LỖI
      // NẾU EMAIL K  HỢP LỆ HIỆN LỖI

      if (inputs[i].value === "") {
        isError = true;
        inputs[i].style.borderColor = "red";
        newState[i].msg = `Vui lòng nhập ${inputs[i].placeholder}`;
        newState[i].display = true;
        // setErrorInput(newState);
      } else {
        inputs[i].style.borderColor = "rgba(255,255,255,0.2)";

        newState[i].display = false;

        if (i === 1) {
          // username

          let findacc = account.find(
            (acc) => acc.Username === signUpState.Username
          );
          if (findacc) {
            newState[i].msg = "Tên tài khoản đã có người sử dụng";
            newState[i].display = true;
            inputs[i].style.borderColor = "red";
            // setErrorInput(newState);
            isError = true;
          }
        } else if (i === 2) {
          // Email
          const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          if (!regex.test(signUpState.Email)) {
            newState[i].msg = "Email không hợp lệ!";
            newState[i].display = true;
            inputs[i].style.borderColor = "red";
            //  setErrorInput(newState);
            isError = true;
          } else {
            let findEmail = account.find(
              (acc) => acc.Email === signUpState.Email
            );
            if (findEmail) {
              newState[i].msg = "Email đã có người sử dụng";
              newState[i].display = true;
              inputs[i].style.borderColor = "red";
              isError = true;
            }
          }
        } else if (i === 0) {
          // id
          let findEmp = dataEmp.find((item) => item.ID === signUpState.ID);
          let findAcc = account.find((item) => item.ID === signUpState.ID);
          //   console.log(signUpState.ID);
          //   console.log("findEmp", findEmp);
          //   console.log("findAcc", findAcc);
          //   console.log("dataEmp", dataEmp);
          //   console.log("accout", account);
          if (findAcc) {
            newState[i].msg =
              "ID đã có người sử dụng vui lòng liên hệ quản trị để lấy lại thông tin đăng nhập";
            newState[i].display = true;
            inputs[i].style.borderColor = "red";
            isError = true;
          }
          if (!findEmp) {
            newState[i].msg =
              "Không tìm thấy ID nhân viên hoặc bạn không phải là nhân viên của bệnh viện ?";
            newState[i].display = true;
            inputs[i].style.borderColor = "red";
            isError = true;
          }
        }
      }
    }

    setErrorInput(newState);
    return isError;
  }

  function handleChange(e) {
    setSignUpState({
      ...signUpState,
      [e.target.name]: e.target.value,
    });
  }
  //   console.log(signUpState);

  const handleSignUp = () => {
    if (!checkInvalid()) {
      let newAcc = [...account, signUpState];
      writeUserData(newAcc, "/Account");
      setDisplayAlert(true);
      setTimeout(() => {
        setDisplayAlert(false);
      }, 3000);
    }
  };
  //   console.log(errorInput);

  return (
    <div className={styles.background}>
      <div className={styles.bigWrapper}>
        <div className={styles.left}>
          <h1>Bệnh viện Đa khoa</h1>
          <h1>Tâm Đức</h1>
          <img src={doctorImage} alt="not found" />
        </div>
        <div className={styles.wrapper}>
          <form action="" id="registerForm">
            <Fade in={displayAlert}>
              <Alert severity="success">Đăng ký tài khoản thành công</Alert>
            </Fade>
            <h1>Đăng ký</h1>
            <div className={styles.inputBox}>
              <input
                type="text"
                placeholder="ID Nhân viên"
                name="ID"
                onChange={handleChange}
                autoComplete="off"
                required
              />
              {errorInput[0].display && (
                <div className={styles.msgError}>{errorInput[0].msg}</div>
              )}
            </div>
            <div className={styles.inputBox}>
              <input
                type="text"
                placeholder="Tên đăng nhập"
                name="Username"
                onChange={handleChange}
                autoComplete="off"
                required
              />
              {errorInput[1].display && (
                <div className={styles.msgError}>{errorInput[1].msg}</div>
              )}
            </div>

            <div className={styles.inputBox}>
              {/* <div className={styles.msgError}>Email không hợp lệ</div>  */}
              <input
                type="email"
                placeholder="Email"
                name="Email"
                onChange={handleChange}
                autoComplete="off"
                required
              />
              {errorInput[2].display && (
                <div className={styles.msgErrorEmail}>{errorInput[2].msg}</div>
              )}
            </div>

            <div className={styles.inputBox}>
              <input
                type="password"
                placeholder="Mật khẩu"
                name="Password"
                onChange={handleChange}
                autoComplete="off"
                required
              />
              {errorInput[3].display && (
                <div className={styles.msgErrorPassword}>
                  {errorInput[3].msg}
                </div>
              )}
            </div>
            <div className={styles.btnContainer}>
              <div className={styles.btn} onClick={handleSignUp}>
                Đăng ký
              </div>
              <Link className={styles.link} to="/login">
                Đăng nhập
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
