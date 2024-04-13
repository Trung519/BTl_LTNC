import React, { useState, useEffect } from 'react';
import styles from './Notify.module.scss';
import classNames from 'classnames/bind';
import Footer from '../../Components/Footer'
import SideBar from './SideBar';
import Tablemail from './TableMail';
import InputMail from './InputMail/InputMail.jsx'

import GetMail from '../../firebase/Notify/GetMail.js';

const cx = classNames.bind(styles)

function Notify() {
//----------------------------BACKEND----------------------------
  const [status, setStatus] = useState('received_mail')
  const [inputmail, setInputmail] = useState(false);

  const [listData, setListData] = useState([]);

  useEffect(() => {
    GetMail(1, status, setListData);
  },[status,inputmail])
  //--------------------------BACKEND----------------------------

  var handleClickStatus = (temp) => {
    setStatus(temp)
  }

  var handleInputmail = () => {
    setInputmail(prev => !prev)
  }

  return (
    <>
      <div className={cx('wrap-notify')}>
        <div className={cx('notify-content')}>
          <div className={cx('sidebar')}>
            <SideBar
              status={status}
              handleClick={handleClickStatus}
              handleMail={handleInputmail}
            />
          </div>
          <div className={cx('table-mail')}>
            <Tablemail listdata={listData}/>
          </div>
        </div>
        <div className={cx('input-mail')}>
          {inputmail && <InputMail />}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Notify