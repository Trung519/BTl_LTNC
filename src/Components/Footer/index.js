import styles from './Footer.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

function Footer() {
    return (
        <>
            <div className={cx('container-fluid', 'footer')}>
                <div className={cx('container', 'footer-info')}>
                    <div className={cx('footer-info-left')}>
                        <h2>BỆNH VIỆN ĐA KHOA TÂM ĐỨC</h2>
                        <div className={cx('to-flex', 'left-address')}>
                            <i class="fas fa-map-marker-alt"></i>
                            <p>Địa chỉ: KTX khu A, ĐHQP-TPHCM</p>
                        </div>
                        <div className={cx('to-flex', 'left-email')}>
                            <i class="far fa-envelope"></i>
                            <p>Email: abc@hcmut.edu.vn</p>
                        </div>
                        <div className={cx('to-flex', 'left-hotline')}>
                            <i class="fas fa-mobile-alt"></i>
                            <p>Hotline: 0987.654.321</p>
                        </div>
                        <div className={cx('to-flex', 'left-website')}>
                            <i class="fas fa-globe-asia"></i>
                            <p>Website: https://mybk.hcmut.edu.vn/my/index.action</p>
                        </div>
                    </div>
                    <div className={cx('footer-info-right')}>
                        <h4>Liên hệ với chúng tôi</h4>
                        <div className={cx('contact-items')}>
                            <div>
                                <i class="fab fa-facebook"></i>
                            </div>
                            <div>
                                <i class="fab fa-youtube"></i>
                            </div>
                            <div>
                                <i class="fab fa-instagram"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('container', 'footer-dev')}>
                    <p>Phát triển bới BTL LTNC</p>
                </div>
            </div>
        </>
    )
}

export default Footer