import { useState, useCallback, useEffect } from 'react'
import styles from './Notifycontent.module.scss'
import classNames from 'classnames/bind'
import Pagination from "@mui/material/Pagination";
import { RemoveReceivedMails } from '../../../firebase/Notify/ReceivedMails'
import { RemoveSentMails } from '../../../firebase/Notify/SentMails'
import GetMail from '../../../firebase/Notify/GetMail';
import { toast } from "react-toastify";
import Inputmail from '../InputMail/InputMail.jsx'


const cx = classNames.bind(styles)

export default function Notifycontent({ listdata, status, user, page, handleMainChangepage, showcontent, handleMainSetShowcontent, numemail, handleMainUnshowcontent }) {
    const [inputmail, setInputmail] = useState(false);
    const rowsPerPage = 5;
    const [listData, setListData] = useState([]);

    var handleChangepage = useCallback((e, p) => {
        handleMainChangepage(e, p);
    }, [])

    var handleClickcheckbox = (e) => {
        e.stopPropagation()
    }

    var returnReceivername = (list) => {
        return list.receiver[0].username
    }

    var handleShowcontent = useCallback((page, index) => {
        handleMainSetShowcontent(page, index)
    }, [])

    var handleUnshowcontent = useCallback(() => {
        handleMainUnshowcontent();
    }, [])


    var handleInputmail = () => {
        setInputmail(prev => !prev)
    }

    useEffect(() => {
        GetMail(user, status, setListData);
    }, [user, status, inputmail])

    const removeEmail = () => {
        const listID = [];
        var confirmdel = 0;
        const checkboxInputs = document.querySelectorAll('input[type="checkbox"]');
        checkboxInputs.forEach(checkbox => {
            if (checkbox.checked) {
                confirmdel++;
                listID.push(checkbox.id);
            }
        });

        if (status === 'received_mail') {
            RemoveReceivedMails(user, listID);
        }
        else RemoveSentMails(user, listID);
        
        if(confirmdel >= 1){
            toast.success(`Xóa ${confirmdel} thông báo thành công !`, {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            // transition: Bounce,
        });

        var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    
        // Duyệt qua từng checkbox và chuyển chúng về trạng thái unchecked
        checkboxes.forEach(function(checkbox) {
            checkbox.checked = false;
        });
    }
    else{
        toast.error("Chưa chọn thông báo !", {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            // transition: Bounce,
        });
    }
        
    }

    return (
        <div className={cx('tablemail-wrapper')}>
            {user.typeEmp === 'Quản trị' && <div className={cx('notify-admin')}>
                <button onClick={handleInputmail}>
                    <svg class="svg-inline--fa fa-pencil-alt fa-w-16" aria-hidden="true" data-prefix="fas" data-icon="pencil-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M497.9 142.1l-46.1 46.1c-4.7 4.7-12.3 4.7-17 0l-111-111c-4.7-4.7-4.7-12.3 0-17l46.1-46.1c18.7-18.7 49.1-18.7 67.9 0l60.1 60.1c18.8 18.7 18.8 49.1 0 67.9zM284.2 99.8L21.6 362.4.4 483.9c-2.9 16.4 11.4 30.6 27.8 27.8l121.5-21.3 262.6-262.6c4.7-4.7 4.7-12.3 0-17l-111-111c-4.8-4.7-12.4-4.7-17.1 0zM124.1 339.9c-5.5-5.5-5.5-14.3 0-19.8l154-154c5.5-5.5 14.3-5.5 19.8 0s5.5 14.3 0 19.8l-154 154c-5.5 5.5-14.3 5.5-19.8 0zM88 424h48v36.3l-64.5 11.3-31.1-31.1L51.7 376H88v48z"></path></svg>
                    <p>Tạo</p>
                </button>
                <button id='adjustt' onClick={removeEmail}>
                    <svg
                        className={cx(`MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root`, 'trash-bin')}
                        focusable="false"
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        data-testid="DeleteOutlineIcon">
                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM8 9h8v10H8zm7.5-5-1-1h-5l-1 1H5v2h14V4z"></path>
                    </svg>
                    <p>Xóa</p>
                </button>
            </div>}
            <div className={cx('content-container')}>
                {Array.from({ length: 5 }, (_, index) => {
                    if ((page - 1) * 5 + index + 1 > listData.length) { }
                    else {
                        let data = listData[(page - 1) * 5 + index]
                        return (
                            <div className={cx('wrapper')}>
                                <div className={cx('content-header')}>
                                    <p className={cx('header-title')}>{data.subject}</p>
                                   {user.typeEmp === 'Quản trị' && <input 
                                    type='checkbox' 
                                    className={cx('choose-to-del')}
                                    id={listData[(page - 1) * 5 + index].mail_id}
                                    ></input>}
                                </div>
                                <div className={cx('content-info')}>
                                    <span>Bởi </span>
                                    <span className={cx('info-sender')}>{data.sender.username}</span>
                                    <span> - {data.date}, {data.hour}</span>
                                </div>
                                <div className={cx('content-main')} dangerouslySetInnerHTML={{ __html: data.content }}></div>
                            </div>
                        )
                    }
                })}
            </div>
            <div className={cx('notify-footer')}>
                <div className={cx('tablemail-pages')}>
                    <Pagination
                        color="primary"
                        onChange={handleChangepage}
                        page={page}
                        count={Math.ceil(listData.length / rowsPerPage)}
                        rowsPerPage={5}
                        showFirstButton
                        showLastButton
                    />
                </div>
            </div>
            {inputmail && <Inputmail
                user={user}
            />}
        </div>
    )
}