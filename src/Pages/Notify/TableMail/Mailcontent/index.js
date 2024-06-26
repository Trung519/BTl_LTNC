import { useCallback, useEffect, useState, useContext } from 'react';
import styles from './Mailcontent.module.scss'
import classNames from 'classnames/bind'
import { StatusContext } from '../..';

const cx = classNames.bind(styles)

export default function Mailcontent({ listemail, num, unShow }) {
    const [content, setContent] = useState(""); // State để lưu nội dung email

    var mail = listemail[num];
    const status = useContext(StatusContext)
    var handleClick = useCallback(() => {
        unShow();
    }, [])

    useEffect(() => {
        setContent(mail.content); // Cập nhật nội dung email khi num thay đổi
    }, [num])

    return (
        <div className={cx('email-content')}>
            <svg onClick={handleClick} class="svg-inline--fa fa-arrow-left fa-w-14" aria-hidden="true" data-prefix="fas" data-icon="arrow-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z"></path></svg>
            <div className={cx('content-wrapper')}>
                <div className={cx('content-header')}>
                    <h2>{mail.subject}</h2>
                </div>
                <div className={cx('content-belowheader')}>
                    <div className={cx('belowheader-name')}>
                        <div className={cx('sender')}>{mail.sender.username}</div>
                        <div className={cx('receiver')}>đến {mail.receiver[0].username}</div>
                    </div>
                    <div className={cx('time')}>{mail.hour} {mail.date}</div>
                </div>
                <div className={cx('content-body')} dangerouslySetInnerHTML={{ __html: content }}></div>
            </div>
        </div>
    )
}
