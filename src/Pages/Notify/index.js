import React, { useState, useEffect, createContext } from 'react';
import styles from './Notify.module.scss';
import classNames from 'classnames/bind';
import Footer from '../../Components/Footer'
import SideBar from './SideBar';
import Tablemail from './TableMail';
import InputMail from './InputMail/InputMail.jsx'
import GetMail from '../../firebase/Notify/GetMail.js';
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const cx = classNames.bind(styles)
export const StatusContext = createContext()

function Notify({ user }) {
  //----------------------------BACKEND----------------------------
  const [status, setStatus] = useState('received_mail')
  const [inputmail, setInputmail] = useState(false);
  var [loading, setLoading] = useState(true)
  const [listData, setListData] = useState([]);

  //Table mail
  const [page, setPage] = useState(1)             // Phan trang provip
  //Mailcontent
  const [showcontent, setShowcontent] = useState(false)
  const [numemail, setNumemail] = useState(0)


  useEffect(() => {
    GetMail(user, status, setListData);
  }, [status, inputmail])

  var handleLoadingDone = () => {
    setLoading(false)
  }

  setTimeout(handleLoadingDone, 500);
  //--------------------------BACKEND----------------------------

  var handleClickStatus = (temp) => {
    setStatus(temp)
    setPage(1);
    setShowcontent(false)
  }

  var handleInputmail = () => {
    setInputmail(prev => !prev)
  }

  var handleMainChangepage = (e,p) => {
    setPage(p);
  }

  var handleMainUnshowcontent = () => {
    setShowcontent(false)
  }

  var handleMainSetShowcontent = (page, index) => {
    setShowcontent(true);
    setNumemail((page - 1) * 10 + index)
  }

  return (
    <StatusContext.Provider value={status}>
      <div id='backgroundE'>
        <Backdrop
          sx={{ color: "#fff", zIndex: 1 }}
          open={loading}
          onClick={handleLoadingDone}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
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
                handleMainChangepage={handleMainChangepage}
                page={page}
                listdata={listData}
                status={status}
                user={user}
                showcontent={showcontent}
                handleMainSetShowcontent={handleMainSetShowcontent}
                numemail={numemail}
                handleMainUnshowcontent={handleMainUnshowcontent}
              />
            </div>
          </div>
          <div className={cx('input-mail')}>
            {inputmail && <InputMail user={user} />}
          </div>
        </div>
        <Footer />
      </div>
    </StatusContext.Provider>
  )
}

export default Notify