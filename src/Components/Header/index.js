import Container from "react-bootstrap/Container";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import Logo1 from "../assets/Logo1.png"
import Home from "../../Pages/Home";
import EquipmentsManage from "../../Pages/EquipmentsManage";
import Medicine_manage from "../../Pages/Medicine_manage";
import Newnotify from "../../Pages/Newnotify";
import PatientRecord from "../../Pages/PatientRecord";
import Schedule from "../../Pages/Schedule";
import LoginForm from "../LoginForrm/LoginForm";
import SignUpForm from "../SignupForm/SignUpForm";
import Employee from "../../Pages/Employee";
import ErrorAccess from "../ErrorAccess";
import {useState} from 'react'
import { NavDropdown } from "react-bootstrap";

const cx = classNames.bind(styles);

function Header({ user }) {
  const [showdiv, setShowdiv] = useState(false)

  const handleExit = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("name");
    localStorage.removeItem("department");
    localStorage.removeItem("typeEmp");

    window.location.assign("/");
  }

  const handleShowdiv = () => {
    setShowdiv(prev => !prev)
  }

  return (
    <>
      <Router>
        <div className={cx("container-fluid", "header")}>
          <div className={cx("container", "header-wrapper")}>
            <div className={cx("row")}>
              <div className={cx("header-wrapper-left", "col-md-2")}>
                <Nav.Link as={Link} to="/">
                  <div className={cx("header-logo")}>
                    <img alt="" src={Logo1}></img>
                  </div>
                </Nav.Link>
              </div>
              <div className={cx("header-wrapper-info", "col-md-2")}>
                <div className={cx("info-item")}>
                  <i class="fas fa-phone-volume"></i>
                </div>
                <div className={cx("info")}>
                  <h4>Liên hệ</h4>
                  <p>0834800368</p>
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
                  <p>Khu phố Tân Lập, Phường Đông Hòa, TP. Dĩ An, Tỉnh Bình Dương </p>
                </div>
              </div>
              {user.typeEmp !== "normal" ?  // typeEmp === "normal" Se la dang nhap/dang xuat
                <div onClick={handleShowdiv} className={cx("header-wrapper-right", "col-md-3", "create-box")}>
                  <svg className={cx("header-wrapper-right-ava", "svg-inline--fa fa-user-circle fa-w-16")} aria-hidden="true" data-prefix="fas" data-icon="user-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" data-fa-i2svg=""><path fill="currentColor" d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z"></path></svg>
                  <div className={cx('header-wrapper-right-name')}>{user.name}</div>
                  <svg 
                  class="svg-inline--fa fa-chevron-down fa-w-14" aria-hidden="true" data-prefix="fas" data-icon="chevron-down" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"></path></svg>
                  {showdiv && 
                  <div onClick={handleExit} className={cx('logout-user')}>Đăng xuất</div>}
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
                        <Nav.Link className={cx('nav-action')} as={Link} to='/'>Trang chủ</Nav.Link>
                        <Nav.Link className={cx('nav-action')} as={Link} to='/announcement'>Thông báo</Nav.Link>
                        <Nav.Link className={cx('nav-action')} as={Link} to='/file-patient'>Hồ sơ bệnh án</Nav.Link>
                        <Nav.Link className={cx('nav-action')} as={Link} to='/appointment'>Lịch làm việc</Nav.Link>
                        <NavDropdown id="Change-Color" className={cx('nav-action', 'nav-action-last')} title='Quản lý'>
                          <NavDropdown.Item className={cx('nav-action1')} as={Link} to='/equip_manage'>Quản lý thiết bị</NavDropdown.Item>
                          <NavDropdown.Item className={cx('nav-action1')} as={Link} to='/medicine_manage'>Quản lý thuốc</NavDropdown.Item>
                          <NavDropdown.Item className={cx('nav-action1')} as={Link} to='/employee'>Quản lý nhân viên</NavDropdown.Item>
                        </NavDropdown>
                      </>
                    ) : (
                      user.typeEmp === "Trưởng khoa" ? (
                        <>
                          <Nav.Link className={cx('nav-action')} as={Link} to='/'>Trang chủ</Nav.Link>
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
                            <Nav.Link className={cx('nav-action')} as={Link} to='/'>Trang chủ</Nav.Link>
                            <Nav.Link className={cx('nav-action')} as={Link} to='/announcement'>Thông báo</Nav.Link>
                            <Nav.Link className={cx('nav-action')} as={Link} to='/file-patient'>Hồ sơ bệnh án</Nav.Link>
                            <Nav.Link className={cx('nav-action')} as={Link} to='/appointment'>Lịch làm việc</Nav.Link>
                            <Nav.Link className={cx('nav-action')} as={Link} to='/equip_manage'>Quản lý thiết bị</Nav.Link>
                          </>
                        ) : (
                          user.typeEmp === "Dược sĩ" ? (
                            <>
                              <Nav.Link className={cx('nav-action')} as={Link} to='/'>Trang chủ</Nav.Link>
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
                              <Nav.Link className={cx('nav-action')} as={Link} to='/'>Trang chủ</Nav.Link>
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
            <Route path="/" element={<Home />} />
            <Route path="/announcement" element={
              user.typeEmp === "normal" ? <LoginForm /> : <Newnotify user={user} />
            } />
            <Route path="/file-patient" element={
              user.typeEmp === "normal" ? <LoginForm /> : <PatientRecord user={user} />
            } />
            <Route path="/appointment" element={
              user.typeEmp === "normal" ? <LoginForm /> : <Schedule user={user} />
            } />
            <Route path="/medicine_manage" element={
              user.typeEmp === "normal" ? <LoginForm /> : (
                user.typeEmp === "Trưởng khoa" || user.typeEmp === "Bác sỹ" || user.typeEmp === "Y tá" ? <ErrorAccess /> : <Medicine_manage user={user} />
              )
            } />
            <Route path="/equip_manage" element={
              user.typeEmp === "normal" ? <LoginForm /> : <EquipmentsManage user={user}/>
            } />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/employee" element={
              user.typeEmp === "normal" ? <LoginForm /> : (
                user.typeEmp === "Dược sỹ" || user.typeEmp === "Bác sỹ" || user.typeEmp === "Y tá" ? <ErrorAccess /> : <Employee user={user}/>
              )
            } />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default Header;
