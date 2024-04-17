import React, { useEffect, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

import { GetUserData } from '../../../firebase/Notify/GetUserData';
import { SendMail } from '../../../firebase/Notify/SendMail';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import styles from './InputMail.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles)

export default function Tags() {
    //-------------------------------------Backend-------------------------------------
    const [listUser, setListUsers] = useState([]);

    useEffect(() => {
        GetUserData(setListUsers);
    }, []);

    const [mail, setMail] = useState({
        title: "",
        receivers: [],
        content: "",
        time: ""
    });

    const handleSendMail = () => {
        const now = new Date();

        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');
        const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Tháng bắt đầu từ 0 nên cần cộng thêm 1
        const year = now.getFullYear();

        const time = `${hours}:${minutes} ${day}/${month}/${year}`;

        const newMail = { ...mail, time };

        const sender = {
            id: 1,
            userName: "nguyenphap242"
        }

        SendMail(sender, newMail, setMail)
    }
    //-------------------------------------Backend-------------------------------------
    const [show, setShow] = useState(true);

    return (
        show && <div className={cx('wrapper')}>
            <div className={cx('top')}>
                <div className={cx('top-content')}>Thư mới</div>
                <div className={cx('top-icon')}>
                    <FontAwesomeIcon icon={faXmark}
                        onClick={
                            () => {
                                setShow(false);
                            }
                        }
                    />
                </div>
            </div>
            <div className={cx('main')}>
                <Autocomplete className={cx('mail_receiver')}
                    sx={{ height: 40 }}
                    multiple
                    id="tags-standard"
                    options={listUser}
                    getOptionLabel={option => option.LastName + " " + option.FirstName}
                    onChange={(event, value) => {
                        setMail({ ...mail, receivers: value }); // Cập nhật state `mail` khi có thay đổi
                    }}
                    value={mail.receivers}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="standard"
                            label="Đến..."
                            placeholder="Người nhận"
                        />
                    )}
                />
                <div className={cx('create-blank')}></div>
                <TextField
                    sx={{ mt: 5 }}
                    id="standard-basic"
                    label="Tiêu đề..."
                    variant="standard"
                    className={cx('mail_title')}
                    value={mail.title} // Sử dụng giá trị từ state `mail`
                    onChange={(e) => {
                        setMail({ ...mail, title: e.target.value });
                    }}
                />
                <div className={cx('under_main')}>
                    <div className={cx('contain-textarea')}>
                        <textarea
                            placeholder='Nội dung'
                            value={mail.content}
                            onChange={(e) => {
                                setMail({ ...mail, content: e.target.value });
                            }}
                        ></textarea>
                    </div>
                    <div className={cx('bottom')}>
                        <Button
                            variant="contained" endIcon={<SendIcon />}
                            onClick={handleSendMail}
                        >
                            Gửi thư
                        </Button>
                    </div>
                </div>
            </div>

        </div>
    );
}
