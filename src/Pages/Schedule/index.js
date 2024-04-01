import classNames from 'classnames/bind'
import styles from './Schedule.module.scss'
import React, { Component } from 'react'
import Footer from '../../Components/Footer'

const cx = classNames.bind(styles)

export default function Schedule() {
  return (
    <>
      <div className={cx('schedule', 'container')}>
        <div className={cx('schedule-title')}>
          <p>Lịch làm việc</p>
          <div className={cx('schedule-title-right')}>
            <button>Thêm cuộc hẹn</button>
            <button>Chỉnh sửa</button>
          </div>
        </div>
        <div className={cx('schedule-wrapper')}>
          <div className={cx('schedule-search')}>
            <input maxLength={100} placeholder='Tên bệnh nhân...' type='text'></input>
            <i class={cx("fas fa-search", 'search')}></i>
          </div>
          <div className={cx('schedule-content')}>
            <div className={cx('schedule-table')}>
              <div className={cx('row', 'line-row', 'line1')}>
                <div className={cx('col-md-1', 'schedule-table-index')}>STT</div>
                <div className={cx('col-md-2', 'schedule-table-ID_doctor')}>ID bác sĩ</div>
                <div className={cx('col-md-2', 'schedule-table-Name_doctor')}>Tên bác sĩ</div>
                <div className={cx('col-md-2', 'schedule-table-Time_in')}>Thời gian hẹn</div>
                <div className={cx('col-md-2', 'schedule-table-Patient')}>Tên bệnh nhân</div>
                <div className={cx('col-md-1', 'schedule-table-Room')}>Phòng</div>
                <div className={cx('col-md-2', 'schedule-table-Status')}>Trạng thái</div>
              </div>
              {(list.map((item, i) => {
                let count = i%2;
                return (
                  <div key={i} className={cx('row', 'line-row', `line${count}`)}>
                    <div className={cx('col-md-1', 'schedule-table-index')}>{i + 1}</div>
                    <div className={cx('col-md-2', 'schedule-table-ID_doctor')}>{item.ID_doctor}</div>
                    <div className={cx('col-md-2', 'schedule-table-Name_doctor')}>{item.Name_doctor}</div>
                    <div className={cx('col-md-2', 'schedule-table-Time_in')}>{item.Time_in}</div>
                    <div className={cx('col-md-2', 'schedule-table-Patient')}>{item.Patient}</div>
                    <div className={cx('col-md-1', 'schedule-table-Room')}>{item.Room}</div>
                    <div className={cx('col-md-2', 'schedule-table-Status')}>{item.Status}</div>
                  </div>
                )
              }))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
