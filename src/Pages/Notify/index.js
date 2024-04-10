import React, { useState, useEffect, useCallback } from 'react';
import styles from './Notify.module.scss';
import classNames from 'classnames/bind';
import Footer from '../../Components/Footer'
import SideBar from './SideBar';
import Tablemail from './TableMail';
import InputMail from './InputMail/InputMail';
import { WidthFull } from '@mui/icons-material';

const cx = classNames.bind(styles)

function Notify() {
  const [status, setStatus] = useState('coming')
  const [inputmail, setInputmail] = useState(false);


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
            <Tablemail />
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