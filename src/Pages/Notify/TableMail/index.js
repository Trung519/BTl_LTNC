import { useEffect, useState, useCallback } from 'react'
import styles from './TableMail.module.scss'
import classNames from 'classnames/bind'
import Mailcontent from './Mailcontent'
import getUserNameByID from '../../../firebase/Notify/getUserNameByID'

const cx = classNames.bind(styles)

export default function Tablemail({ listdata, status }) {
    const [page, setPage] = useState(0)             // Phan trang provip
    const listEmail = listdata;
    const [showcontent, setShowcontent] = useState(false)
    const [numemail, setNumemail] = useState(0)

    var handleChangepage = useCallback((e) => {
        setPage(e.target.value)
    }, [])

    var handleClickcheckbox = useCallback((e) => {
        e.stopPropagation()
    }, [])

    var handleShowcontent = useCallback((page, index) => {
        setShowcontent(true);
        setNumemail(page * 10 + index)
    }, [])
    var handleUnshowcontent = useCallback(() => {
        setShowcontent(false);
    }, [])
    return (
        <div className={cx('tablemail-wrapper')}>
            {!showcontent &&
                <>
                    <div className={cx('row', 'primary-row')}>
                        <div className={cx('col-md-1', 'primary-checkbox')}>
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
                        {Array.from({ length: 10 }, (_, index) => {
                            if (page * 10 + index + 1 > listEmail.length) { }
                            else {
                                let count = index % 2
                                return (
                                    <div onClick={() => handleShowcontent(page, index)} key={page * 10 + index + 1} className={cx('row', 'line-row', `line${count}`)}>
                                        <div onClick={(e) => handleClickcheckbox(e)} className={cx('col-md-1')}>
                                            <input
                                                type='checkbox'
                                            ></input>
                                        </div>
                                        <div className={cx('col-md-2', 'sender-col')}>
                                            {status === 'received_mail' ?
                                                listEmail[page * 10 + index].sender.username
                                                : 'Tôi'}
                                        </div>
                                        <div className={cx('col-md-8', 'content-col')}>
                                            <span className={cx('content-title')}>{listEmail[page * 10 + index].subject}</span>
                                            <span className={cx('barrie')}>-</span>
                                            <span className={cx('content-content')}>{` ${listEmail[page * 10 + index].content}`}</span>
                                        </div>
                                        <div className={cx('col-md-1', 'time-col')}>
                                            <p> {listEmail[page * 10 + index].hour}</p>
                                            <p> {listEmail[page * 10 + index].date}</p>
                                        </div>
                                    </div>
                                )
                            }
                        })}
                    </div>
                    <div className={cx('notify-footer')}>
                        <div className={cx('notify-footer-left')}>
                            <button>Xóa hết</button>
                            <button>Xóa</button>
                        </div>
                        <div className={cx('tablemail-pages')}>
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
                        </div>
                    </div>

                </>
            }
            {showcontent && <Mailcontent
                listemail={listEmail}
                num={numemail}
                unShow={handleUnshowcontent}
            />}
        </div>
    )
}