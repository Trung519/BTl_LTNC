import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import Footer from "../../Components/Footer";

const cx = classNames.bind(styles);

function Home() {
    return (
        <>
            <div className={cx('container-fluid', 'body')}>
                <div className={cx('home')}>
                    <div className={cx('content')}>
                        <p>CHĂM SÓC SỨC KHỎE</p>
                        <div>
                            <h1>DẪN ĐẦU VỀ</h1>
                            <h1>CHUYÊN MÔN Y KHOA</h1>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Home;
