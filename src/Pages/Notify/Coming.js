import styles from './Coming.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

function Coming({ comingdata, handleClick }) {
    return (
        <>
            <div className={cx('container-fluid', 'hihi')}>
                <div className={cx('notify-wrapper')}>
                    <div className={cx('left-wrapper')}>
                        <div className={cx('to-flex')}>
                            <div className={cx('write-letter')}>
                                <svg className={cx("svg-inline--fa fa-pen fa-w-16")} aria-hidden="true" data-prefix="fas" data-icon="pen" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z"></path></svg>
                                <p>Soạn thư</p>
                            </div>
                        </div>
                        <div className={cx('to-flex')}>
                            <div className={cx('coming-letter', 'set-background')}>
                                <svg class="svg-inline--fa fa-envelope fa-w-16" aria-hidden="true" data-prefix="far" data-icon="envelope" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm0 48v40.805c-22.422 18.259-58.168 46.651-134.587 106.49-16.841 13.247-50.201 45.072-73.413 44.701-23.208.375-56.579-31.459-73.413-44.701C106.18 199.465 70.425 171.067 48 152.805V112h416zM48 400V214.398c22.914 18.251 55.409 43.862 104.938 82.646 21.857 17.205 60.134 55.186 103.062 54.955 42.717.231 80.509-37.199 103.053-54.947 49.528-38.783 82.032-64.401 104.947-82.653V400H48z"></path></svg>
                                <p>Hộp thư đến</p>
                            </div>
                        </div>
                        <div className={cx('to-flex')}>
                            <div onClick={() => handleClick('sent')} className={cx('sent-letter')}>
                                <svg className={cx("svg-inline--fa fa-paper-plane fa-w-16")} aria-hidden="true" data-prefix="far" data-icon="paper-plane" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M440 6.5L24 246.4c-34.4 19.9-31.1 70.8 5.7 85.9L144 379.6V464c0 46.4 59.2 65.5 86.6 28.6l43.8-59.1 111.9 46.2c5.9 2.4 12.1 3.6 18.3 3.6 8.2 0 16.3-2.1 23.6-6.2 12.8-7.2 21.6-20 23.9-34.5l59.4-387.2c6.1-40.1-36.9-68.8-71.5-48.9zM192 464v-64.6l36.6 15.1L192 464zm212.6-28.7l-153.8-63.5L391 169.5c10.7-15.5-9.5-33.5-23.7-21.2L155.8 332.6 48 288 464 48l-59.4 387.3z"></path></svg>
                                <p>Thư đã gửi</p>
                            </div>
                        </div>
                        <div className={cx('to-flex')}>
                            <div
                             onClick={() => handleClick('star')}
                                className={cx('start-hook')}>
                                <svg className={cx("svg-inline--fa fa-star fa-w-18")} aria-hidden="true" data-prefix="far" data-icon="star" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg=""><path fill="currentColor" d="M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z"></path></svg>
                                <p>Có gắn dấu sao</p>
                            </div>
                        </div>
                    </div>
                    <div className={cx('right-wrapper')}>
                        <div className={cx('cross-bar')}>
                            <div className={cx('select-all')}>
                                <input type='checkbox'></input>
                                <p>Chọn tất cả</p>
                            </div>
                            <div className={cx('delete')}>
                                <svg className={cx("svg-inline--fa fa-trash-alt fa-w-14")} aria-hidden="true" data-prefix="far" data-icon="trash-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M192 188v216c0 6.627-5.373 12-12 12h-24c-6.627 0-12-5.373-12-12V188c0-6.627 5.373-12 12-12h24c6.627 0 12 5.373 12 12zm100-12h-24c-6.627 0-12 5.373-12 12v216c0 6.627 5.373 12 12 12h24c6.627 0 12-5.373 12-12V188c0-6.627-5.373-12-12-12zm132-96c13.255 0 24 10.745 24 24v12c0 6.627-5.373 12-12 12h-20v336c0 26.51-21.49 48-48 48H80c-26.51 0-48-21.49-48-48V128H12c-6.627 0-12-5.373-12-12v-12c0-13.255 10.745-24 24-24h74.411l34.018-56.696A48 48 0 0 1 173.589 0h100.823a48 48 0 0 1 41.16 23.304L349.589 80H424zm-269.611 0h139.223L276.16 50.913A6 6 0 0 0 271.015 48h-94.028a6 6 0 0 0-5.145 2.913L154.389 80zM368 128H80v330a6 6 0 0 0 6 6h276a6 6 0 0 0 6-6V128z"></path></svg>
                                <p>Xóa</p>
                            </div>
                        </div>
                        <div className={cx('content-wrapper')}>
                            <div className={cx('single-row')}>
                                <div className={cx('row-icons')}>
                                    <input type='checkbox'></input>
                                    <svg className={cx("svg-inline--fa fa-star fa-w-18")} aria-hidden="true" data-prefix="far" data-icon="star" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg=""><path fill="currentColor" d="M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z"></path></svg>
                                </div>
                                <div className={cx('contain')}>
                                    <div className={cx('row-sender')}>Phòng công tác sinh viên</div>
                                    <div className={cx('row-content')}>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
                                    <div className={cx('row-time')}>17:05</div>
                                </div>

                            </div>
                            <div className={cx('single-row')}>
                                <div className={cx('row-icons')}>
                                    <input type='checkbox'></input>
                                    <svg className={cx("svg-inline--fa fa-star fa-w-18")} aria-hidden="true" data-prefix="far" data-icon="star" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg=""><path fill="currentColor" d="M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z"></path></svg>
                                </div>
                                <div className={cx('contain')}>
                                    <div className={cx('row-sender')}>Phòng công tác sinh viên</div>
                                    <div className={cx('row-content')}>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
                                    <div className={cx('row-time')}>17:05</div>
                                </div>

                            </div>
                            <div className={cx('single-row')}>
                                <div className={cx('row-icons')}>
                                    <input type='checkbox'></input>
                                    <svg className={cx("svg-inline--fa fa-star fa-w-18")} aria-hidden="true" data-prefix="far" data-icon="star" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg=""><path fill="currentColor" d="M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z"></path></svg>
                                </div>
                                <div className={cx('contain')}>
                                    <div className={cx('row-sender')}>Phòng công tác sinh viên</div>
                                    <div className={cx('row-content')}>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
                                    <div className={cx('row-time')}>17:05</div>
                                </div>

                            </div>

                            {/* <div className={cx('row')}>
                      <div className={cx('col-md-1','col-icons')}>
                        <input type='checkbox'></input>
                        <svg className={cx("svg-inline--fa fa-star fa-w-18")} aria-hidden="true" data-prefix="far" data-icon="star" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg=""><path fill="currentColor" d="M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z"></path></svg>
                      </div>
                      <div className={cx('col-md-2','sender')}>
                        Phòng công tác sinh viên  
                      </div>
                      <div className={cx('col-md-7','inside-letter')}>aaaaaaaaadkauhsjkfafjaaaaaaaaaaaaaaaaaaaajksafsdfasdfasdbfj,sbaf,jasdbfj,sdafjsdbafjsdba,fjasbdf,jasbdfj,sbámdnfasmdfn</div>
                      <div className={cx('col-md-2','send-time')}>17:05</div>
                    </div> */}
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Coming