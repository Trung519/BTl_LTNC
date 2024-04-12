import { useEffect, useState } from 'react'
import styles from './TableMail.module.scss'
import classNames from 'classnames/bind'
import GetMail from '../../../firebase/Notify/GetMail'

const cx = classNames.bind(styles)

export default function Tablemail({listdata}) {
    const [page, setPage] = useState(0)             // Phan trang provip
    const listEmail = listdata;

    return (
        <div className={cx('tablemail-wrapper')}>
            <div className={cx('row', 'primary-row')}>
                <div className={cx('col-md-1', 'primary-checkbox')}>
                    <input type='checkbox'></input>
                </div>
                <div className={cx('col-md-2', 'primary-sender')}>
                    <p>Người gửi</p>
                </div>
                <div className={cx('col-md-8', 'primary-content')}>
                    <p>Nội dung</p>
                </div>
                <div className={cx('col-md-1', 'primary-time')}>
                    <p>Thời gian</p>
                </div>
            </div>
            <div className={cx('content-container')}>
                {
                    Array.from({ length: 10 }, (_, index) => {
                        if (page * 10 + index + 1 > listEmail.length) { }
                        else {
                            let count = index % 2;
                            var handleColor = (indexx) => {
                                if (listEmail[indexx].Status == 'Xong') return 'done'
                                else if (listEmail[indexx].Status == 'Đang khám') return 'doing'
                                else return 'pending'
                            }

                            return (
                                <div key={page * 10 + index + 1} className={cx('row', 'line-row', `line${count}`)}>
                                    <div className={cx('col-md-1')}>
                                        <input type='checkbox'></input>
                                    </div>
                                    <div className={cx('col-md-2', 'sender-col')}>{listEmail[page * 10 + index].sender}</div>
                                    <div className={cx('col-md-8', 'content-col')}>
                                        <span className={cx('content-title')}>{listEmail[page * 10 + index].subject}</span>
                                        <span className={cx('barrie')}>-</span>
                                        <span className={cx('content-content')}>{` ${listEmail[page * 10 + index].content}`}</span>
                                    </div>
                                    <div className={cx('col-md-1', 'time-col')}>
                                        <p> {listEmail[page * 10 + index].date}</p>
                                    </div>
                                </div>
                            )
                        }

                    })
                }
            </div>
        </div>
    )
}