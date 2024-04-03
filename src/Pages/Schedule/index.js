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
var number = 0

export default function Schedule() {
  const [listdata, setListdata] = useState([]);
  var [edit, setEdit] = useState(false)               // Edit mode
  var [add, setAdd] = useState(false)                 // Add mode
  var [page, setPage] = useState(0)                   // Current page number
  var [searchbool, setSearchbool] = useState(true)    // (for search bar) true -> found ... false -> not found 
  var [doctorbool, setDoctorbool] = useState(true)    // (for doctor in add mode) true -> found ... false -> not found

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

  var handleEdit = useCallback(() => {
    setEdit(prev => !prev)
  }, [])

  var handleAdd = useCallback(() => {
    setAdd(prev => !prev)
  }, [])

  var handleChangepage = useCallback((e) => {
    setPage(e.target.value)
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
              {searchbool || <p>Không tìm thấy !</p>}
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
                {
                  Array.from({ length: 10 }, (_, index) => {
                    if (page * 10 + index + 1 > listdata.length) console.log('hello khay')
                    else {
                      let count = index % 2;
                      var handleColor = (indexx) => {
                        if (listdata[indexx].Status == 'Xong') return 'done'
                        else if (listdata[indexx].Status == 'Đang khám') return 'doing'
                        else return 'pending'
                      }

                      return (
                        <div key={index} className={cx('row', 'line-row', `line${count}`)}>
                          <div className={cx('col-md-1', 'schedule-table-index')}>{page * 10 + index + 1}</div>
                          <div className={cx('col-md-2', 'schedule-table-ID_doctor')}>{listdata[page * 10 + index].ID_doctor}</div>
                          <div className={cx('col-md-2', 'schedule-table-Name_doctor')}>{listdata[page * 10 + index].Name_doctor}</div>
                          <div className={cx('col-md-2', 'schedule-table-Time_in', 'edit-time')}>
                            <p>{listdata[page * 10 + index].Time_in}</p>
                            <p>{listdata[page * 10 + index].Time_in}</p>
                          </div>
                          <div className={cx('col-md-2', 'schedule-table-Patient')}>{listdata[page * 10 + index].Patient}</div>
                          <div className={cx('col-md-1', 'schedule-table-Room')}>{listdata[page * 10 + index].Room}</div>
                          <div className={cx('col-md-2', 'ahuhu', 'schedule-table-Status', `Status-${handleColor(page * 10 + index)}`)}>
                            <svg></svg>
                            <svg></svg>
                            <svg></svg>
                            {listdata[page * 10 + index].Status}
                          </div>
                        </div>
                      )
                    }

                  })
                }
              </div>
            </div>
            <div className={cx('schedule-pages')}>
              {
                Array.from({ length: Math.ceil(listdata.length / 10) }, (_, index) => (
                  <button
                    onClick={handleChangepage}
                    value={index}
                    key={index}
                  >
                    {index + 1}
                  </button>
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
              {searchbool || <p>Không tìm thấy !</p>}
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
                {
                  Array.from({ length: 10 }, (_, index) => {
                    if (page * 10 + index + 1 > listdata.length) console.log('hello khay')
                    else {
                      let count = index % 2;

                      return (
                        <div key={index} className={cx('row', 'line-row', `line${count}`)}>
                          <div className={cx('col-md-1', 'schedule-table-index')}>{page * 10 + index + 1}</div>
                          <div className={cx('col-md-2', 'schedule-table-ID_doctor')}>{listdata[page * 10 + index].ID_doctor}</div>
                          <div className={cx('col-md-2', 'schedule-table-Name_doctor')}>{listdata[page * 10 + index].Name_doctor}</div>
                          <div className={cx('col-md-2', 'schedule-table-Time_in', 'edit-time')}>
                            <p>{listdata[page * 10 + index].Time_in}</p>
                            <p>{listdata[page * 10 + index].Time_in}</p>
                          </div>
                          <div className={cx('col-md-2', 'schedule-table-Patient')}>{listdata[page * 10 + index].Patient}</div>
                          <div className={cx('col-md-1', 'schedule-table-Room')}>{listdata[page * 10 + index].Room}</div>
                          <div className={cx('col-md-2', 'schedule-table-Status', 'schedule-icons')}>
                            <svg class="svg-inline--fa fa-check-square fa-w-14" aria-hidden="true" data-prefix="far" data-icon="check-square" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M400 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V80c0-26.51-21.49-48-48-48zm0 400H48V80h352v352zm-35.864-241.724L191.547 361.48c-4.705 4.667-12.303 4.637-16.97-.068l-90.781-91.516c-4.667-4.705-4.637-12.303.069-16.971l22.719-22.536c4.705-4.667 12.303-4.637 16.97.069l59.792 60.277 141.352-140.216c4.705-4.667 12.303-4.637 16.97.068l22.536 22.718c4.667 4.706 4.637 12.304-.068 16.971z"></path></svg>
                            <svg class="svg-inline--fa fa-times fa-w-11" aria-hidden="true" data-prefix="fas" data-icon="times" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512" data-fa-i2svg=""><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>
                            <svg class="svg-inline--fa fa-clock fa-w-16" aria-hidden="true" data-prefix="far" data-icon="clock" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm61.8-104.4l-84.9-61.7c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v141.7l66.8 48.6c5.4 3.9 6.5 11.4 2.6 16.8L334.6 349c-3.9 5.3-11.4 6.5-16.8 2.6z"></path></svg>
                          </div>
                        </div>
                      )
                    }
                  })
                }
              </div>
            </div>
            <div className={cx('schedule-pages')}>
              {
                Array.from({ length: Math.ceil(listdata.length / 10) }, (_, index) => (
                  <button
                    onClick={handleChangepage}
                    value={index}
                    key={index}
                  >
                    {index + 1}
                  </button>
                ))}
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
              {searchbool || <p>Không tìm thấy !</p>}
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
                {
                  Array.from({ length: 10 }, (_, index) => {
                    if (page * 10 + index + 1 > listdata.length) console.log('hello khay')
                    else {
                      let count = index % 2;
                      var handleColor = (indexx) => {
                        if (listdata[indexx].Status == 'Xong') return 'done'
                        else if (listdata[indexx].Status == 'Đang khám') return 'doing'
                        else return 'pending'
                      }

                      return (
                        <div key={index} className={cx('row', 'line-row', `line${count}`)}>
                          <div className={cx('col-md-1', 'schedule-table-index')}>{page * 10 + index + 1}</div>
                          <div className={cx('col-md-2', 'schedule-table-ID_doctor')}>{listdata[page * 10 + index].ID_doctor}</div>
                          <div className={cx('col-md-2', 'schedule-table-Name_doctor')}>{listdata[page * 10 + index].Name_doctor}</div>
                          <div className={cx('col-md-2', 'schedule-table-Time_in', 'edit-time')}>
                            <p>{listdata[page * 10 + index].Time_in}</p>
                            <p>{listdata[page * 10 + index].Time_in}</p>
                          </div>
                          <div className={cx('col-md-2', 'schedule-table-Patient')}>{listdata[page * 10 + index].Patient}</div>
                          <div className={cx('col-md-1', 'schedule-table-Room')}>{listdata[page * 10 + index].Room}</div>
                          <div className={cx('col-md-2', 'ahuhu', 'schedule-table-Status', `Status-${handleColor(page * 10 + index)}`)}>
                            <svg></svg>
                            <svg></svg>
                            <svg></svg>
                            {listdata[page * 10 + index].Status}
                          </div>
                        </div>
                      )
                    }

                  })
                }
              </div>
            </div>
          </div>
          <div className={cx('schedule-add')}>
            <div className={cx('contain-form')}>
              <div className={cx('schedule-form')}>
                <div className={cx('form-close')} onClick={handleAdd}>
                  <i className={cx("fas fa-times")}></i>
                </div>
                <div className={cx('form-title')}>
                  <h3>THÊM LỊCH HẸN</h3>
                </div>
                <div className={cx('form-doctor')}>
                  <h5>Bác sĩ:</h5>
                  <div className={cx('input-doctor')}>
                    <input type='text' placeholder='ID bác sĩ...'></input>
                    <input type='text' placeholder='Tên bác sĩ...'></input>
                  </div>
                  {doctorbool || <p className={cx('not-found')}>Không tìm thấy bác sĩ !</p>}
                </div>
                <div className={cx('form-time')}>
                  <h5>Thời gian hẹn:</h5>
                  <input type='time' placeholder='Thời gian...'></input>
                  <input type='date' placeholder='Thời gian...'></input>
                </div>
                <div className={cx('form-others')}>
                  <h5>Khác:</h5>
                  <div className={cx('input-others')}>
                    <input type='text' placeholder='Tên bệnh nhân...'></input>
                    <input placeholder='Phòng...' type='text'></input>
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
