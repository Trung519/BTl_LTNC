import {useEffect, useState} from 'react'
import styles from './TableMail.module.scss'
import classNames from 'classnames/bind'
import GetMail from '../../../firebase/Notify/GetMail'

const cx = classNames.bind(styles)

export default function Tablemail() {
    const [page, setPage] = useState(0)
    const [listEmail, setListEmail] = useState([]);

    const [typeOfEmail, setTypeOfEmail] = useState("received_mail");

    useEffect(() => {
        GetMail(1, typeOfEmail, setListEmail)
    },[typeOfEmail])

    return (
        <div className={cx('tablemail-wrapper')}>
{            listEmail && <div className={cx('row', 'primary-row')}>
                <div className={cx('col-md-1','primary-checkbox')}>
                    <input type='checkbox'></input>
                </div>
                <div className={cx('col-md-2','primary-sender')}>
                    <p>Người gửi</p>
                </div>
                <div className={cx('col-md-8','primary-content')}>
                    <p>Nội dung</p>
                </div>
                <div className={cx('col-md-1','primary-time')}>
                    <p>Thời gian</p>
                </div>
            </div>}
        </div>
    )
}