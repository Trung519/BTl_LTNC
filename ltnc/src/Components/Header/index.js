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
                <Navbar expand="lg" className={cx("bg-body-color", 'change-color')}>
                    <Container fluid>
                        <Navbar.Brand></Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll">
                            <Nav
                                className={cx("me-auto my-2 my-lg-0",'nav-actions')}
                                style={{ maxHeight: '100px' }}
                                navbarScroll
                            >
                                <Nav.Link className={cx('nav-action','nav-action1')} as={Link} to='/home'>Trang chủ</Nav.Link>
                                <Nav.Link className={cx('nav-action')} as={Link} to='/announcement'>Thông báo</Nav.Link>
                                <Nav.Link className={cx('nav-action')} as={Link} to='/file-patient'>Hồ sơ bệnh án</Nav.Link>
                                <Nav.Link className={cx('nav-action')} as={Link} to='/appointment'>Lịch hẹn</Nav.Link>
                                <Nav.Link className={cx('nav-action')} as={Link} to='/equip-manage'>Quản lý trang thiết bị y tế</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <div>
                    <Routes>
                        <Route path="/home" element/>
                        <Route path="/announcement" element/>
                        <Route path="/file-patient" element/>
                        <Route path="/appointment" element/>
                        <Route path="/equip-manage" element/>
                    </Routes>
                </div>
            </Router>
        </>
    );
}

export default Header;