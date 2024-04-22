import { useEffect, useState, useCallback } from 'react'
import styles from './TableMail.module.scss'
import classNames from 'classnames/bind'
import Mailcontent from './Mailcontent'

import { RemoveReceivedMails } from '../../../firebase/Notify/ReceivedMails'
import { RemoveSentMails } from '../../../firebase/Notify/SentMails'

const cx = classNames.bind(styles)

export default function Tablemail({ listdata, status, user }) {
    const [page, setPage] = useState(0)             // Phan trang provip
    const listEmail = listdata;
    const [showcontent, setShowcontent] = useState(false)
    const [numemail, setNumemail] = useState(0)

    var handleChangepage = useCallback((e) => {
        setPage(e.target.value)
    }, [])

    var handleClickcheckbox = (e) => {
        e.stopPropagation()
    }

    var handleShowcontent = useCallback((page, index) => {
        setShowcontent(true);
        setNumemail(page * 10 + index)
    }, [])

    var handleUnshowcontent = useCallback(() => {
        setShowcontent(false);
    }, [])

    const removeEmail = () => {
        const listID = [];
        const checkboxInputs = document.querySelectorAll('input[type="checkbox"]');
        checkboxInputs.forEach(checkbox => {
            if (checkbox.checked) {
                listID.push(checkbox.id);
            }
        });

        if (status === 'received_mail') {
            RemoveReceivedMails(user, listID);
        }
        else RemoveSentMails(user, listID);

    }

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
                                    <div onClick={() => handleShowcontent(page, index)} key={page * 10 + index} className={cx('row', 'line-row', `line${count}`)}>
                                        <div onClick={(e) => handleClickcheckbox(e)} className={cx('col-md-1', 'contain-checkbox')}>
                                            <input
                                                type='checkbox'
                                                id={listEmail[page * 10 + index].mail_id}
                                            ></input>
                                        </div>
                                        <div className={cx('col-md-2', 'sender-col')}>
                                            {status === 'received_mail' ?
                                                listEmail[page * 10 + index].sender.username
                                                : 'Tôi'
                                            }
                                        </div>
                                        <div className={cx('col-md-8', 'content-col')}>
                                            <span className={cx('content-title')}>{listEmail[page * 10 + index].subject}</span>
                                            <span className={cx('barrie')}>-</span>
                                            <span className={cx('content-content')}>{` ${listEmail[page * 10 + index].content.split('<br>')[0]}`}</span>
                                        </div>
                                        <div className={cx('col-md-1', 'time-col')}>
                                            <p> {listEmail[page * 10 + index].date}</p>
                                        </div>
                                    </div>
                                )
                            }
                        })}
                    </div>
                    <div className={cx('notify-footer')}>
                        <div className={cx('notify-footer-left')}>
                            <button onClick={removeEmail}>Xóa</button>
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