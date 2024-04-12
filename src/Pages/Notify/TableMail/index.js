import { useEffect, useState, useCallback } from 'react'
import styles from './TableMail.module.scss'
import classNames from 'classnames/bind'
import GetMail from '../../../firebase/Notify/GetMail'
import Mailcontent from './Mailcontent'

const cx = classNames.bind(styles)

export default function Tablemail({ status }) {
    const [page, setPage] = useState(0)             // Phan trang provip
    const [listEmail, setListEmail] = useState([]);
    const [showcontent, setShowcontent] = useState(false)
    const [numemail, setNumemail] = useState(0)

    useEffect(() => {
        GetMail(2, status, setListEmail)
    }, [status])

    var handleChangepage = useCallback((e) => {
        setPage(e.target.value)
    }, [])

    var handleShowcontent = useCallback((e) => {
        setShowcontent(true);
        console.log(e.target.key)
        setNumemail(e.target.key)
    },[])

    return (
        <div className={cx('tablemail-wrapper')}>
            {!showcontent && <><div className={cx('row', 'primary-row')}>
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
            </div><div className={cx('content-container')}>
                    {Array.from({ length: 10 }, (_, index) => {
                        if (page * 10 + index + 1 > listEmail.length) { }
                        else {
                            let count = index % 2
                            return (
                                <div onClick={(e) => handleShowcontent(e)} key={page * 10 + index + 1} className={cx('row', 'line-row', `line${count}`)}>
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

                    })}
                </div><div className={cx('tablemail-pages')}>
                    {Array.from({ length: Math.ceil(listEmail.length / 10) }, (_, index) => (
                        <button
                            onClick={handleChangepage}
                            value={index}
                            key={index}
                            className={cx(`page-${page == index ? 'current' : ''}`)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div></>}
                    {showcontent && <Mailcontent listemail={listEmail} num={numemail}/>}
        </div>
    )
}