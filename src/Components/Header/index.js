import Container from "react-bootstrap/Container";
import { BrowserRouter as Router, Routes, Route, Link, Redirect } from "react-router-dom";
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
import ErrorAccess from "../ErrorAccess";

import { NavDropdown } from "react-bootstrap";
const cx = classNames.bind(styles);

function Header({ user }) {
  const handleExit = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("name");
    localStorage.removeItem("department");
    localStorage.removeItem("typeEmp");

    window.location.assign("/home");
  }

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
              {user.typeEmp !== "normal" ?
                <div className={cx("header-wrapper-right", "col-md-3")}>
                  <button onClick={handleExit}>Đăng xuất</button>
                </div>
                :
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
              }
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
                  {
                    user.typeEmp === "Quản trị" ? (
                      <>
                        <Nav.Link className={cx('nav-action')} as={Link} to='/home'>Trang chủ</Nav.Link>
                        <Nav.Link className={cx('nav-action')} as={Link} to='/announcement'>Thông báo</Nav.Link>
                        <Nav.Link className={cx('nav-action')} as={Link} to='/file-patient'>Hồ sơ bệnh án</Nav.Link>
                        <Nav.Link className={cx('nav-action')} as={Link} to='/appointment'>Lịch làm việc</Nav.Link>
                        <NavDropdown className={cx('nav-action', 'nav-action-last')} title='Quản lý'>
                          <NavDropdown.Item className={cx('nav-action1')} as={Link} to='/equip_manage'>Quản lý thiết bị</NavDropdown.Item>
                          <NavDropdown.Item className={cx('nav-action1')} as={Link} to='/medicine_manage'>Quản lý thuốc</NavDropdown.Item>
                          <NavDropdown.Item className={cx('nav-action1')} as={Link} to='/employee'>Quản lý nhân viên</NavDropdown.Item>
                        </NavDropdown>
                      </>
                    ) : (
                      user.typeEmp === "Trưởng khoa" ? (
                        <>
                          <Nav.Link className={cx('nav-action')} as={Link} to='/home'>Trang chủ</Nav.Link>
                          <Nav.Link className={cx('nav-action')} as={Link} to='/announcement'>Thông báo</Nav.Link>
                          <Nav.Link className={cx('nav-action')} as={Link} to='/file-patient'>Hồ sơ bệnh án</Nav.Link>
                          <Nav.Link className={cx('nav-action')} as={Link} to='/appointment'>Lịch làm việc</Nav.Link>
                          <NavDropdown className={cx('nav-action', 'nav-action-last')} title='Quản lý'>
                            <NavDropdown.Item className={cx('nav-action1')} as={Link} to='/equip_manage'>Quản lý thiết bị</NavDropdown.Item>
                            <NavDropdown.Item className={cx('nav-action1')} as={Link} to='/employee'>Quản lý nhân viên</NavDropdown.Item>
                          </NavDropdown>
                        </>
                      ) : (
                        user.typeEmp === "Bác sỹ" || user.typeEmp === "Y tá" ? (
                          <>
                            <Nav.Link className={cx('nav-action')} as={Link} to='/home'>Trang chủ</Nav.Link>
                            <Nav.Link className={cx('nav-action')} as={Link} to='/announcement'>Thông báo</Nav.Link>
                            <Nav.Link className={cx('nav-action')} as={Link} to='/file-patient'>Hồ sơ bệnh án</Nav.Link>
                            <Nav.Link className={cx('nav-action')} as={Link} to='/appointment'>Lịch làm việc</Nav.Link>
                            <Nav.Link className={cx('nav-action')} as={Link} to='/equip_manage'>Quản lý thiết bị</Nav.Link>
                          </>
                        ) : (
                          user.typeEmp === "Dược sĩ" ? (
                            <>
                              <Nav.Link className={cx('nav-action')} as={Link} to='/home'>Trang chủ</Nav.Link>
                              <Nav.Link className={cx('nav-action')} as={Link} to='/announcement'>Thông báo</Nav.Link>
                              <Nav.Link className={cx('nav-action')} as={Link} to='/file-patient'>Hồ sơ bệnh án</Nav.Link>
                              <Nav.Link className={cx('nav-action')} as={Link} to='/appointment'>Lịch làm việc</Nav.Link>
                              <NavDropdown className={cx('nav-action', 'nav-action-last')} title='Quản lý'>
                                <NavDropdown.Item className={cx('nav-action1')} as={Link} to='/equip_manage'>Quản lý thiết bị</NavDropdown.Item>
                                <NavDropdown.Item className={cx('nav-action1')} as={Link} to='/medicine_manage'>Quản lý thuốc</NavDropdown.Item>
                              </NavDropdown>
                            </>
                          ) : (
                            <>
                              <Nav.Link className={cx('nav-action')} as={Link} to='/home'>Trang chủ</Nav.Link>
                              <Nav.Link className={cx('nav-action')} as={Link} to='/login'>Thông báo</Nav.Link>
                              <Nav.Link className={cx('nav-action')} as={Link} to='/login'>Hồ sơ bệnh án</Nav.Link>
                              <Nav.Link className={cx('nav-action')} as={Link} to='/login'>Lịch làm việc</Nav.Link>
                              <Nav.Link className={cx('nav-action')} as={Link} to='/login'>Quản lý</Nav.Link>
                            </>
                          )
                        )
                      )
                    )
                  }
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
        <div>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/announcement" element={
              user.typeEmp === "normal" ? <LoginForm /> : <Notify user={user} />
            } />
            <Route path="/file-patient" element={
              user.typeEmp === "normal" ? <LoginForm /> : <PatientRecord />
            } />
            <Route path="/appointment" element={
              user.typeEmp === "normal" ? <LoginForm /> : <Schedule user={user} />
            } />
            <Route path="/medicine_manage" element={
              user.typeEmp === "normal" ? <LoginForm /> : (
                user.typeEmp === "Trưởng khoa" || user.typeEmp === "Bác sỹ" || user.typeEmp === "Y tá" ? <ErrorAccess /> : <Medicine_manage />
              )
            } />
            <Route path="/equip_manage" element={
              user.typeEmp === "normal" ? <LoginForm /> : <EquipmentsManage />
            } />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/employee" element={
              user.typeEmp === "normal" ? <LoginForm /> : (
                user.typeEmp === "Dược sỹ" || user.typeEmp === "Bác sỹ" || user.typeEmp === "Y tá" ? <ErrorAccess /> : <Employee />
              )
            } />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default Header;
