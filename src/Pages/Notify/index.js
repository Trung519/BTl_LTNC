import React, { useState, useEffect, useCallback } from 'react';
import styles from './Notify.module.scss';
import classNames from 'classnames/bind';
import Footer from '../../Components/Footer'
import SideBar from './SideBar/SideBar';
import TableMail from './TableMail/TableMail';
import InputMail from './InputMail/InputMail';

const cx = classNames.bind(styles)

function Notify() {
  return(
    <>
    <div className={cx('wrap-notify')}>
      <div className={cx('sidebar')}>
        <SideBar/>
      </div>
      <div className={cx('table-mail')}>
        <TableMail/>
      </div>
      <div className={cx('input-mail')}>
        <InputMail/>
      </div>
    </div>
    <Footer />
    </>
  )
}

export default Notify