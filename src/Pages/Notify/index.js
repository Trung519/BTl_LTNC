import React, { useState, useEffect, createContext } from 'react';
import styles from './Notify.module.scss';
import classNames from 'classnames/bind';
import Footer from '../../Components/Footer'
import SideBar from './SideBar';
import Tablemail from './TableMail';
import InputMail from './InputMail/InputMail.jsx'
import GetMail from '../../firebase/Notify/GetMail.js';

const cx = classNames.bind(styles)
export const StatusContext = createContext()

function Notify({user}) {
  //----------------------------BACKEND----------------------------
  const [status, setStatus] = useState('received_mail')
  const [inputmail, setInputmail] = useState(false);

  const [listData, setListData] = useState([]);

  useEffect(() => {
    GetMail(user, status, setListData);
  }, [status, inputmail])
  //--------------------------BACKEND----------------------------

  var handleClickStatus = (temp) => {
    setStatus(temp)
  }

  var handleInputmail = () => {
    setInputmail(prev => !prev)
  }

  return (
    <StatusContext.Provider value={status}>
      <>
        <div className={cx('wrap-notify')}>
          <div className={cx('notify-content')}>
            <div className={cx('sidebar')}>
              <SideBar
                status={status}
                handleClick={handleClickStatus}
                handleMail={handleInputmail}
                user={user}
              />
            </div>
            <div className={cx('table-mail')}>
              <Tablemail
                listdata={listData}
                status={status}
                user={user}
              />
            </div>
          </div>
          <div className={cx('input-mail')}>
            {inputmail && <InputMail user={user}/>}
          </div>
        </div>
        <Footer />
      </>
    </StatusContext.Provider>
  )
}

export default Notify