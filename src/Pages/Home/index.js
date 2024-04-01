import classNames from 'classnames/bind'
import styles from './Home.module.scss'
import Header from '../../Components/Header'
import Footer from '../../Components/Footer'

const cx = classNames.bind(styles)

function Home() {
    return (
        <>
            <div className={cx('container-fluid', 'body')}>
                <div className={cx('home')}>
                    <div className={cx('content')}>
                        <p>CHĂM SÓC SỨC KHỎE</p>
                        <h1>DẪN ĐẦU VỀ</h1>
                        <h1>CHUYÊN MÔN Y KHOA</h1>
                        <div className={cx('characters')}>
                            <div className={cx('character')}>
                                <p>Tận tâm</p>
                                <i className={cx("fas fa-notes-medical")}></i>
                            </div>
                            <div className={cx('character')}>
                                <p>Nhanh chóng</p>
                                <i className={cx("fas fa-stopwatch")}></i>
                            </div>
                            <div className={cx('character')}>
                                <p> Hiệu quả</p>
                                <i className={cx("character3","fas fa-file-medical-alt")}></i>
                            </div>
                            <div className={cx('character')}>
                                <p>Chất lượng</p>
                                <i className={cx("fas fa-heart")}></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Home