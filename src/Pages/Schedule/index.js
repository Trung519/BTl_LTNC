import classNames from 'classnames/bind'
import styles from './Schedule.module.scss'
import React, { Component } from 'react'
import Footer from '../../Components/Footer'

// --------------Firebase--------------
import { useState, useEffect, useCallback } from 'react';
import { getDatabase, ref, onValue } from "firebase/database";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDHfpl2Vsr7GGd8Sb6VAdNRLWKEdE9M_MI",
  authDomain: "project1-33ba1.firebaseapp.com",
  databaseURL: "https://project1-33ba1-default-rtdb.firebaseio.com",
  projectId: "project1-33ba1",
  storageBucket: "project1-33ba1.appspot.com",
  messagingSenderId: "122408221984",
  appId: "1:122408221984:web:8d1f8ed3c54f8cc7acab45",
  measurementId: "G-W41PD0H5PY"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase();

// --------------End Firebase--------------


const cx = classNames.bind(styles)

export default function Schedule() {
  const [listdata, setListdata] = useState([]);
  var [edit, setEdit] = useState(false)
  var [add, setAdd] = useState(false)
  var [number, setNumber] = useState()
  var [page, setPage] = useState(1)

  useEffect(() => {
    const getListdata = () => {
      const scheduleRef = ref(database, "Schedule");
      onValue(scheduleRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const dataArray = Object.keys(data).map(key => ({
            id: key,
            ...data[key]
          }));
          setListdata(dataArray);
        } else {
          setListdata([]); // Nếu không có dữ liệu, set listdata thành mảng rỗng
        }
      });
    };
    getListdata();
  }, []);


  console.log(number)

  var handleEdit = useCallback(() => {
    setEdit(prev => !prev)
  }, [])

  var handleAdd = useCallback(() => {
    console.log(1)
    setAdd(prev => !prev)
  }, [])

  if (!edit && !add) {
    return (
      <>
        <div className={cx('schedule', 'container')}>
          <div className={cx('schedule-title')}>
            <p>Lịch làm việc</p>
            <div className={cx('schedule-title-right')}>
              <button onClick={handleAdd}>Thêm cuộc hẹn</button>
              <button onClick={handleEdit}>Chỉnh sửa</button>
              <button className={cx('no-click')}>Hoàn tất</button>
            </div>
          </div>
          <div className={cx('schedule-wrapper')}>
            <div className={cx('schedule-search')}>
              <input maxLength={100} placeholder='Tên bệnh nhân...' type='text'></input>
              <i class={cx("fas fa-search", 'search')}></i>
            </div>
            <div className={cx('schedule-content')}>
              <div className={cx('schedule-table')}>
                <div className={cx('row', 'line-row', 'line1', 'line-key')}>
                  <div className={cx('col-md-1', 'schedule-table-index')}>STT</div>
                  <div className={cx('col-md-2', 'schedule-table-ID_doctor')}>ID bác sĩ</div>
                  <div className={cx('col-md-2', 'schedule-table-Name_doctor')}>Tên bác sĩ</div>
                  <div className={cx('col-md-2', 'schedule-table-Time_in')}>Thời gian hẹn</div>
                  <div className={cx('col-md-2', 'schedule-table-Patient')}>Tên bệnh nhân</div>
                  <div className={cx('col-md-1', 'schedule-table-Room')}>Phòng</div>
                  <div className={cx('col-md-2', 'schedule-table-Status')}>Trạng thái</div>
                </div>
                {(listdata.map((item, i) => {
                  let count = i % 2;
                  var handleColor = (item) => {
                    if (item.Status == 'Xong') return 'done'
                    else if (item.Status == 'Đang khám') return 'doing'
                    else return 'pending'
                  }
                  return (
                    <div key={i} className={cx('row', 'line-row', `line${count}`)}>
                      <div className={cx('col-md-1', 'schedule-table-index')}>{i + 1}</div>
                      <div className={cx('col-md-2', 'schedule-table-ID_doctor')}>{item.ID_doctor}</div>
                      <div className={cx('col-md-2', 'schedule-table-Name_doctor')}>{item.Name_doctor}</div>
                      <div className={cx('col-md-2', 'schedule-table-Time_in')}>{item.Time_in}</div>
                      <div className={cx('col-md-2', 'schedule-table-Patient')}>{item.Patient}</div>
                      <div className={cx('col-md-1', 'schedule-table-Room')}>{item.Room}</div>
                      <div className={cx('col-md-2', 'schedule-table-Status', `Status-${handleColor(item)}`)}>
                        <i></i>
                        <i></i>
                        <i></i>
                        {item.Status}
                      </div>
                    </div>
                  )
                }))}
              </div>
            </div>
            <div className={cx('schedule-pages')}>
              {Array.from({ length: number }, (_, index) => (
                <button key={index}>{index + 1}</button>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }
  else if (edit) {
    return (
      <>
        <div className={cx('schedule', 'container')}>
          <div className={cx('schedule-title')}>
            <p>Lịch làm việc</p>
            <div className={cx('schedule-title-right')}>
              <button className={cx('no-click')}>Thêm cuộc hẹn</button>
              <button className={cx('no-click')}>Chỉnh sửa</button>
              <button onClick={handleEdit}>Hoàn tất</button>
            </div>
          </div>
          <div className={cx('schedule-wrapper')}>
            <div className={cx('schedule-search')}>
              <input maxLength={100} placeholder='Tên bệnh nhân...' type='text'></input>
              <i class={cx("fas fa-search", 'search')}></i>
            </div>
            <div className={cx('schedule-content')}>
              <div className={cx('schedule-table')}>
                <div className={cx('row', 'line-row', 'line1', 'line-key')}>
                  <div className={cx('col-md-1', 'schedule-table-index')}>STT</div>
                  <div className={cx('col-md-2', 'schedule-table-ID_doctor')}>ID bác sĩ</div>
                  <div className={cx('col-md-2', 'schedule-table-Name_doctor')}>Tên bác sĩ</div>
                  <div className={cx('col-md-2', 'schedule-table-Time_in')}>Thời gian hẹn</div>
                  <div className={cx('col-md-2', 'schedule-table-Patient')}>Tên bệnh nhân</div>
                  <div className={cx('col-md-1', 'schedule-table-Room')}>Phòng</div>
                  <div className={cx('col-md-2', 'schedule-table-Status')}>Trạng thái</div>
                </div>
                {(listdata.map((item, i) => {
                  let count = i % 2;
                  return (
                    <div key={i} className={cx('row', 'line-row', `line${count}`)}>
                      <div className={cx('col-md-1', 'schedule-table-index')}>{i + 1}</div>
                      <div className={cx('col-md-2', 'schedule-table-ID_doctor')}>{item.ID_doctor}</div>
                      <div className={cx('col-md-2', 'schedule-table-Name_doctor')}>{item.Name_doctor}</div>
                      <div className={cx('col-md-2', 'schedule-table-Time_in')}>{item.Time_in}</div>
                      <div className={cx('col-md-2', 'schedule-table-Patient')}>{item.Patient}</div>
                      <div className={cx('col-md-1', 'schedule-table-Room')}>{item.Room}</div>
                      <div className={cx('col-md-2', 'schedule-table-Status', 'schedule-icons')}>
                        <i class="far fa-check-square"></i>
                        <i class="fas fa-times"></i>
                        <i class="far fa-clock"></i>
                      </div>
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
  else {
    return (
      <>
        <div className={cx('schedule', 'container')}>
          <div className={cx('schedule-title')}>
            <p>Lịch làm việc</p>
            <div className={cx('schedule-title-right')}>
              <button className={cx('no-click')}>Thêm cuộc hẹn</button>
              <button className={cx('no-click')}>Chỉnh sửa</button>
              <button className={cx('no-click')}>Hoàn tất</button>
            </div>
          </div>
          <div className={cx('schedule-wrapper')}>
            <div className={cx('schedule-search')}>
              <input maxLength={100} placeholder='Tên bệnh nhân...' type='text'></input>
              <i class={cx("fas fa-search", 'search')}></i>
            </div>
            <div className={cx('schedule-content')}>
              <div className={cx('schedule-table')}>
                <div className={cx('row', 'line-row', 'line1', 'line-key')}>
                  <div className={cx('col-md-1', 'schedule-table-index')}>STT</div>
                  <div className={cx('col-md-2', 'schedule-table-ID_doctor')}>ID bác sĩ</div>
                  <div className={cx('col-md-2', 'schedule-table-Name_doctor')}>Tên bác sĩ</div>
                  <div className={cx('col-md-2', 'schedule-table-Time_in')}>Thời gian hẹn</div>
                  <div className={cx('col-md-2', 'schedule-table-Patient')}>Tên bệnh nhân</div>
                  <div className={cx('col-md-1', 'schedule-table-Room')}>Phòng</div>
                  <div className={cx('col-md-2', 'schedule-table-Status')}>Trạng thái</div>
                </div>
                {(listdata.map((item, i) => {
                  let count = i % 2;
                  var handleColor = (item) => {
                    if (item.Status == 'Xong') return 'done'
                    else if (item.Status == 'Đang khám') return 'doing'
                    else return 'pending'
                  }
                  return (
                    <div key={i} className={cx('row', 'line-row', `line${count}`)}>
                      <div className={cx('col-md-1', 'schedule-table-index')}>{i + 1}</div>
                      <div className={cx('col-md-2', 'schedule-table-ID_doctor')}>{item.ID_doctor}</div>
                      <div className={cx('col-md-2', 'schedule-table-Name_doctor')}>{item.Name_doctor}</div>
                      <div className={cx('col-md-2', 'schedule-table-Time_in')}>{item.Time_in}</div>
                      <div className={cx('col-md-2', 'schedule-table-Patient')}>{item.Patient}</div>
                      <div className={cx('col-md-1', 'schedule-table-Room')}>{item.Room}</div>
                      <div className={cx('col-md-2', 'schedule-table-Status', `Status-${handleColor(item)}`)}>
                        <i></i>
                        <i></i>
                        <i></i>
                        {item.Status}
                      </div>
                    </div>
                  )
                }))}
              </div>
            </div>
          </div>
          <div className={cx('schedule-add')}>
            <div className={cx('form-close')} onClick={handleAdd}>
              <i className={cx("fas fa-times")}></i>
            </div>
            <div className={cx('contain-form')}>
              <div className={cx('schedule-form')}>
                <div className={cx('form-title')}>
                  <h3>THÊM LỊCH HẸN</h3>
                </div>
                <div className={cx('form-doctor')}>
                  <h5>Bác sĩ:</h5>
                  <div className={cx('input-doctor')}>
                    <input type='text' placeholder='ID bác sĩ...'></input>
                    <input type='text' placeholder='Tên bác sĩ...'></input>
                  </div>
                </div>
                <div className={cx('form-time')}>
                  <h5>Thời gian hẹn:</h5>
                  <input type='date' placeholder='Thời gian...'></input>
                </div>
                <div className={cx('form-others')}>
                  <h5>Khác:</h5>
                  <div className={cx('input-others')}>
                    <input type='text' placeholder='Phòng'></input>
                    <input className={cx('no-change')} type='text' value='Đang chờ'></input>
                  </div>
                </div>
                <div className={cx('form-vali')}>
                  <button>Xác nhận</button>
                </div>
              </div>
            </div>

          </div>
        </div>

        <Footer />
      </>
    )
  }
}
