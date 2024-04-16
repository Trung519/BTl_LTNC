import Container from "react-bootstrap/Container";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import Logo from "../assets/Logo.png";
import Home from "../../Pages/Home";
import EquipmentsManage from "../../Pages/EquipmentsManage";
import Medicine_manage from "../../Pages/Medicine_manage";
import Notify from "../../Pages/Notify";
import PatientRecord from "../../Pages/PatientRecord";
import Schedule from "../../Pages/Schedule";
import LoginForm from "../LoginForrm/LoginForm";
import SignUpForm from "../SignupForm/SignUpForm";
import Employee from "../../Pages/Employee";
import { NavDropdown } from "react-bootstrap";
const cx = classNames.bind(styles);

function Header() {
  return (
    <>
      <Router>
        <div className={cx("container-fluid", "header")}>
          <div className={cx("container", "header-wrapper")}>
            <div className={cx("row")}>
              <div className={cx("header-wrapper-left", "col-md-2")}>
                <Nav.Link as={Link} to="/home">
                  <div className={cx("header-logo")}>
                    <img alt="" src={Logo}></img>
                  </div>
                </Nav.Link>
              </div>
              <div className={cx("header-wrapper-info", "col-md-2")}>
                <div className={cx("info-item")}>
                  <i class="fas fa-phone-volume"></i>
                </div>
                <div className={cx("info")}>
                  <h4>Liên hệ</h4>
                  <p>0987.654.321</p>
                </div>
              </div>
              <div className={cx("header-wrapper-info", "col-md-2")}>
                <div className={cx("info-item")}>
                  <i class="far fa-clock"></i>
                </div>
                <div className={cx("info")}>
                  <h4>Giờ làm việc</h4>
                  <p>8:00 - 20:00</p>
                </div>
              </div>
              <div className={cx("header-wrapper-info", "col-md-3")}>
                <div className={cx("info-item")}>
                  <i class="fas fa-map-marker-alt"></i>
                </div>
                <div className={cx("info")}>
                  <h4>Địa chỉ</h4>
                  <p>KTX khu A ĐHQG - TPHCM</p>
                </div>
              </div>

              <div className={cx("header-wrapper-right", "col-md-3")}>
                <button>
                  <Link className={cx("link")} to={"/login"}>
                    Đăng nhập
                  </Link>
                </button>
                <button>
                  <Link className={cx("link")} to={"/signup"}>
                    Đăng ký
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Navbar expand="lg" className={cx("bg-body-color", "change-color")}>
            <Container fluid>
              <Navbar.Brand></Navbar.Brand>
              <Navbar.Toggle aria-controls="navbarScroll" />
              <Navbar.Collapse id="navbarScroll">
                <Nav
                  className={cx("me-auto my-2 my-lg-0", "nav-actions")}
                  style={{ maxHeight: "100px" }}
                  navbarScroll
                >
                  <Nav.Link className={cx("nav-action")} as={Link} to="/home">
                    Trang chủ
                  </Nav.Link>
                  <Nav.Link
                    className={cx("nav-action")}
                    as={Link}
                    to="/announcement"
                  >
                    Thông báo
                  </Nav.Link>
                  <Nav.Link
                    className={cx("nav-action")}
                    as={Link}
                    to="/file-patient"
                  >
                    Hồ sơ bệnh án
                  </Nav.Link>
                  <Nav.Link
                    className={cx("nav-action")}
                    as={Link}
                    to="/appointment"
                  >
                    Lịch làm việc
                  </Nav.Link>
                  <NavDropdown
                    className={cx("nav-action", "nav-action-last")}
                    title="Quản lí"
                  >
                    <NavDropdown.Item
                      className={cx("nav-action1")}
                      as={Link}
                      to="/employee"
                    >
                      Quản lý nhân viên
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      className={cx("nav-action1")}
                      as={Link}
                      to="/equip_manage"
                    >
                      Quản lý thiết bị
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      className={cx("nav-action1")}
                      as={Link}
                      to="/medicine_manage"
                    >
                      Quản lý thuốc
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
        <div>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/announcement" element={<Notify />} />
            <Route path="/file-patient" element={<PatientRecord />} />
            <Route path="/appointment" element={<Schedule />} />
            <Route path="/equip_manage" element={<EquipmentsManage />} />
            <Route path="/medicine_manage" element={<Medicine_manage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/employee" element={<Employee />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default Header;
