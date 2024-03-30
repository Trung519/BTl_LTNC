import Container from 'react-bootstrap/Container';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import classNames from 'classnames/bind'
import styles from './Header.module.scss'
import MU from '../assets/MU.png'
/* Import Components Navbar*/
import Home from '../../Pages/Home';
import Equipment_manage from '../../Pages/Equipment_manage';
import Medicine_manage from '../../Pages/Medicine_manage';
import Notify from '../../Pages/Notify';
import PatientRecord from '../../Pages/PatientRecord';
import Schedule from '../../Pages/Schedule';
import { NavDropdown } from 'react-bootstrap';
const cx = classNames.bind(styles)

function Header() {
    return (
        <>
            <Router>
                <div className={cx('container-fluid', 'header')}>
                    <div className={cx('container', 'header-wrapper')}>
                        <div className={cx('row')}>
                            <div className={cx('header-wrapper-left', 'col-md-7')}>
                                <div className={cx('header-logo')}>
                                    <img alt='' src={MU}></img>
                                </div>
                                <div className={cx('header-info')}>
                                    <h2>Bệnh viện đa khoa HCMUT</h2>
                                    <p>Hotline: 0987.654.321</p>
                                    <p>Địa chỉ: KTX khu A, ĐHQG-TPHCM</p>
                                </div>
                            </div>
                            <div className={cx('header-wrapper-blank', 'col-md-1')}></div>
                            <div className={cx('header-wrapper-right', 'col-md-4')}>
                                <button>Đăng nhập</button>
                                <button>Đăng ký</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <Navbar expand="lg" className={cx("bg-body-color", 'change-color')}>
                        <Container fluid>
                            <Navbar.Brand></Navbar.Brand>
                            <Navbar.Toggle aria-controls="navbarScroll" />
                            <Navbar.Collapse id="navbarScroll">
                                <Nav
                                    className={cx("me-auto my-2 my-lg-0", 'nav-actions')}
                                    style={{ maxHeight: '100px' }}
                                    navbarScroll
                                >
                                    <Nav.Link className={cx('nav-action')} as={Link} to='/home'>TRang chủ</Nav.Link>
                                    <Nav.Link className={cx('nav-action')} as={Link} to='/announcement'>Thông báo</Nav.Link>
                                    <Nav.Link className={cx('nav-action')} as={Link} to='/file-patient'>Hồ sơ bệnh án</Nav.Link>
                                    <Nav.Link className={cx('nav-action')} as={Link} to='/appointment'>Lịch làm việc</Nav.Link>
                                    <NavDropdown className={cx('nav-action')} title='Quản lí'>
                                        <NavDropdown.Item className={cx('nav-action')} as={Link} to='/equip_manage'>Quản lý thiết bị</NavDropdown.Item>
                                        <NavDropdown.Item className={cx('nav-action')} as={Link} to='/medicine_manage'>Quản lý thuốc</NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </div>
                <div>
                    <Routes>
                        <Route path="/home" element={<Home/>}/>
                        <Route path="/announcement" element={<Notify />} />
                        <Route path="/file-patient" element={<PatientRecord />} />
                        <Route path="/appointment" element={<Schedule />} />
                        <Route path="/equip-manage" element={<Equipment_manage />} />
                        <Route path="/medicine-manage" element={<Medicine_manage />} />
                    </Routes>
                </div>
            </Router>
        </>
    );
}

export default Header;