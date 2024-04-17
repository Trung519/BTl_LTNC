import classNames from 'classnames/bind'
import styles from './Schedule.module.scss'
import React, { Component } from 'react'
import Footer from '../../Components/Footer'

// --------------Firebase--------------
import { useState, useEffect, useCallback } from 'react';
import { addNewSchedule, searchIdDoctorByName, searchNameDoctorByID, setListSchedule } from '../../Components/Firebase/FireBase';

import Updatewhenedit from '../../firebase/Schedule/updateWhenEdit.js'
import updateWhenRemove from '../../firebase/Schedule/updateWhenRemove.js';
// --------------End Firebase--------------

const cx = classNames.bind(styles)
var number = 0

export default function Schedule() {
    var [edit, setEdit] = useState(false)               // Edit mode
    var [add, setAdd] = useState(false)                 // Add mode
    var [page, setPage] = useState(0)                   // Current page number
    var [searchbool, setSearchbool] = useState(true)    // (for search bar) true -> found ... false -> not found 
    var [doctorbool, setDoctorbool] = useState(true)    // (for doctor in add mode) true -> found ... false -> not found

    // --------------START BACKEND <KHÔNG PHẬN SỰ MIỄN VÀO>--------------
    const [listdata, setListdata] = useState([]);

    const [form, setForm] = useState({
        id_Doctor: "",
        name_Doctor: "",
        time: "",
        date: "",
        name_Patient: "",
        room: ""
    });

    const [suggestions, setSuggestions] = useState([]);

    const [suggestionsID, setSuggestionsID] = useState([]);

    const [namePatientSearch, setNamePatientSearch] = useState("")

    useEffect(() => {
        setListSchedule(namePatientSearch, setListdata);
    }, [namePatientSearch]);

    useEffect(() => {
        searchIdDoctorByName(form.name_Doctor, setSuggestions);
    }, [form.name_Doctor])

    useEffect(() => {
        searchNameDoctorByID(form.id_Doctor, setSuggestionsID)
    }, [form.id_Doctor])

    const handleSelectSuggestion = (suggestion) => {
        setForm({
            ...form,
            id_Doctor: suggestion.ID,
            name_Doctor: `${suggestion.FirstName} ${suggestion.LastName}`
        });
        setSuggestions([]);
        setUlshow(false)
    }

    const handleCollectData = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    }
    const handleNamePatientChange = (e) => {
        setNamePatientSearch(e.target.value);
        if(listdata.length == 0) setSearchbool(false)
        else setSearchbool(true)
        setPage(0)
    }
    const submitForm = () => {
        const checkValue = new Promise((resolve, reject) => {
            if (
                form.id_Doctor === "" ||
                form.name_Doctor === "" ||
                form.time === "" ||
                form.date === "" ||
                form.name_Patient === "" ||
                form.name_CCCD === "" ||
                form.room === ""
            ) {
                resolve(false);
            } else {
                resolve(true);
            }
        });

        checkValue.then((isValid) => {
            if (isValid) {
                setAdd(false);
                addNewSchedule(form, setForm);
            } else {
                alert("Vui lòng nhập đầy đủ thông tin !");
            }
        });
    };

    const [listEdit, setListEdit] = useState([]);
    const [listRemove, setListRemove] = useState([]);

    const isEdited = (key, status) => {
        for (let i = 0; i < listEdit.length; i++) {
            if (listEdit[i].id_schedule === key) {
                const list = [...listEdit]
                list[i].status = status;
                setListEdit(list);
                return true;
            }
        }
        return false;
    }

    const isSelectedToEdit = (key, status) => {
        console.log(key);
        if (isEdited(key, status)) return;
        else {
            const newData = {
                id_schedule: key,
                status: status
            }
            setListEdit(prev => [...prev, newData])
        }
    }

    var handleEdit = (() => {
        setEdit(prev => !prev)
        if (listEdit.length > 0) {
            Updatewhenedit(listEdit);
            setListEdit([]);
        }
        if (listRemove.length > 0) {
            updateWhenRemove(listRemove)
            setListRemove([]);
        }
    })

    const isSelectedToRemove = (key) => {
        const isFound = listRemove.find(item => item.id_schedule === key);

        if (isFound) {
            const newList = listRemove.filter(item => item.id_schedule !== key);
        }
        else {
            const newData = {
                id_schedule: key
            }
            setListRemove(prev => [...prev, newData])
        }
    }

    // ---------------END BACKEND <KHÔNG PHẬN SỰ MIỄN VÀO>---------------  

    var [ulshow, setUlshow] = useState(true)

    var handleAdd = useCallback(() => {
        setAdd(prev => !prev)
    }, [])

    var handleChangepage = useCallback((e) => {
        setPage(e.target.value)
    }, [])

    if (!edit && !add) {
        return (
            <>
                <div className={cx('schedule')}>
                    <div className={cx('schedule-wrapper')}>
                        <div className={cx('schedule-title')}>
                            <p>Lịch làm việc</p>
                            <div className={cx('schedule-title-right')}>
                                <button onClick={handleAdd}>Thêm cuộc hẹn</button>
                                <button onClick={() => setEdit(true)}>Chỉnh sửa</button>
                                <button className={cx('no-click')}>Hoàn tất</button>
                            </div>
                        </div>
                        <div className={cx('schedule-search')}>
                            <input maxLength={100} placeholder='Tên bệnh nhân...' type='text'
                                onChange={handleNamePatientChange}></input>
                            <i class={cx("fas fa-search", 'search')}></i>
                            {searchbool || <p>Không tìm thấy !</p>}
                        </div>
                        <div className={cx('schedule-content')}>
                            <div className={cx('schedule-table')}>
                                <div className={cx('row', 'line-row', 'line1', 'line-key', 'special-line')}>
                                    <div className={cx('col-md-1', 'schedule-table-index')}>STT</div>
                                    <div className={cx('col-md-1', 'schedule-table-ID_doctor')}>ID Bác Sĩ</div>
                                    <div className={cx('col-md-2', 'schedule-table-Name_doctor')}>Tên Bác Sĩ</div>
                                    <div className={cx('col-md-2', 'schedule-table-Time_in')}>Thời Gian Hẹn</div>
                                    <div className={cx('col-md-2', 'schedule-table-Patient')}>Tên Bệnh Nhân</div>
                                    <div className={cx('col-md-2', 'schedule-table-Patient')}>Số CCCD</div>
                                    <div className={cx('col-md-1', 'schedule-table-Room')}>Phòng</div>
                                    <div className={cx('col-md-1', 'schedule-table-Status')}>Trạng Thái</div>
                                </div>
                                {
                                    Array.from({ length: 10 }, (_, index) => {
                                        if (page * 10 + index + 1 > listdata.length) { }
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
                                                    <div className={cx('col-md-1', 'schedule-table-ID_doctor')}>{listdata[page * 10 + index].ID_doctor}</div>
                                                    <div className={cx('col-md-2', 'schedule-table-Name_doctor')}>{listdata[page * 10 + index].Name_doctor}</div>
                                                    <div className={cx('col-md-2', 'schedule-table-Time_in', 'edit-time')}>
                                                        {<p>{listdata[page * 10 + index].Hour_in + ", " + listdata[page * 10 + index].Date_in}</p>}
                                                    </div>
                                                    <div className={cx('col-md-2', 'schedule-table-Patient')}>{listdata[page * 10 + index].Patient}</div>
                                                    <div className={cx('col-md-2', 'schedule-table-Patient')}>{listdata[page * 10 + index].CCCD}</div>
                                                    <div className={cx('col-md-1', 'schedule-table-Room')}>{listdata[page * 10 + index].Room}</div>
                                                    <div className={cx('col-md-1', 'ahuhu', 'schedule-table-Status', `Status-${handleColor(page * 10 + index)}`)}>
                                                        <select name="select-in-normal" disabled id='Linh'>
                                                            <option className={cx('option1')} value={listdata[page * 10 + index].Status}>{listdata[page * 10 + index].Status}</option>
                                                            <option className={cx('option2')} value="Xong">Xong</option>
                                                            <option className={cx('option3')} value="Đang khám">Đang khám</option>
                                                            <option className={cx('option4')} value="Đang chờ">Đang chờ</option>
                                                        </select>
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
                                        className={cx(`page-${page == index ? 'current' : ''}`)}
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
                <div className={cx('schedule')}>
                    <div className={cx('schedule-wrapper')}>
                        <div className={cx('schedule-title')}>
                            <p>Lịch làm việc</p>
                            <div className={cx('schedule-title-right')}>
                                <button className={cx('no-click')}>Thêm cuộc hẹn</button>
                                <button className={cx('no-click')}>Chỉnh sửa</button>
                                <button onClick={handleEdit}>Hoàn tất</button>
                            </div>
                        </div>
                        <div className={cx('schedule-search')}>
                            <input maxLength={100} placeholder='Tên bệnh nhân...' type='text'
                                onChange={handleNamePatientChange}></input>
                            <i class={cx("fas fa-search", 'search')}></i>
                            {searchbool || <p>Không tìm thấy !</p>}
                        </div>
                        <div className={cx('schedule-content')}>
                            <div className={cx('schedule-table')}>
                                <div className={cx('row', 'line-row', 'line1', 'line-key', 'special-line')}>
                                    <div style={{ display: 'none' }} className={cx('col-md-1', 'schedule-table-index')}>STT</div>
                                    <div className={cx('col-md-1', 'schedule-table-ID_doctor')}>ID Bác sĩ</div>
                                    <div className={cx('col-md-2', 'schedule-table-Name_doctor')}>Tên Bác Sĩ</div>
                                    <div className={cx('col-md-2', 'schedule-table-Time_in')}>Thời Gian Hẹn</div>
                                    <div className={cx('col-md-2', 'schedule-table-Patient')}>Tên Bệnh Nhân</div>
                                    <div className={cx('col-md-2', 'schedule-table-Patient')}>Số CCCD Bệnh Nhân</div>
                                    <div className={cx('col-md-1', 'schedule-table-Room')}>Phòng</div>
                                    <div className={cx('col-md-2', 'schedule-table-Status')}>Trạng Thái</div>
                                </div>
                                {
                                    Array.from({ length: 10 }, (_, index) => {
                                        if (page * 10 + index + 1 > listdata.length) { }
                                        else {
                                            let count = index % 2;
                                            var handleColor = (indexx) => {
                                                if (listdata[indexx].Status == 'Xong') return 'done'
                                                else if (listdata[indexx].Status == 'Đang khám') return 'doing'
                                                else return 'pending'
                                            }

                                            return (
                                                <div key={listdata[index].id_schedule} className={cx('row', 'line-row', `line${count}`)}>
                                                    <div style={{ display: 'none' }} className={cx('col-md-1', 'schedule-table-index')}>{page * 10 + index + 1}</div>
                                                    <div className={cx('col-md-1', 'schedule-table-ID_doctor')}>{listdata[page * 10 + index].ID_doctor}</div>
                                                    <div className={cx('col-md-2', 'schedule-table-Name_doctor')}>{listdata[page * 10 + index].Name_doctor}</div>
                                                    <div className={cx('col-md-2', 'schedule-table-Time_in', 'edit-time')}>
                                                        {<p>{listdata[page * 10 + index].Hour_in + ", " + listdata[page * 10 + index].Date_in}</p>}
                                                    </div>
                                                    <div className={cx('col-md-2', 'schedule-table-Patient')}>{listdata[page * 10 + index].Patient}</div>
                                                    <div className={cx('col-md-2', 'schedule-table-Patient')}>{listdata[page * 10 + index].CCCD}</div>
                                                    <div className={cx('col-md-1', 'schedule-table-Room')}>{listdata[page * 10 + index].Room}</div>
                                                    <div className={cx('col-md-2', `schedule-icons-${handleColor(page * 10 + index)}`, 'schedule-table-Status', 'schedule-icons')}>
                                                        {handleColor(page * 10 + index) === 'done' && (
                                                            <select name="select-in-edit"
                                                                onChange={(e) => isSelectedToEdit(listdata[page * 10 + index].id_schedule, e.target.value)}
                                                            >
                                                                <option value="Xong">Xong</option>
                                                                <option value="Đang khám">Đang khám</option>
                                                                <option value="Đang chờ">Đang chờ</option>
                                                            </select>
                                                        )}
                                                        {handleColor(page * 10 + index) === 'doing' && (
                                                            <select name="select-in-edit"
                                                                onChange={(e) => isSelectedToEdit(listdata[page * 10 + index].id_schedule, e.target.value)}
                                                            >
                                                                <option value="Xong">Xong</option>
                                                                <option value="Đang khám" selected>Đang khám</option>
                                                                <option value="Đang chờ">Đang chờ</option>
                                                            </select>
                                                        )}
                                                        {handleColor(page * 10 + index) === 'pending' && (
                                                            <select name="select-in-edit"
                                                                onChange={(e) => isSelectedToEdit(listdata[page * 10 + index].id_schedule, e.target.value)}
                                                            >
                                                                <option value="Xong">Xong</option>
                                                                <option value="Đang khám">Đang khám</option>
                                                                <option selected value="Đang chờ">Đang chờ</option>
                                                            </select>
                                                        )}
                                                        <svg class="svg-inline--fa fa-trash-alt fa-w-14" aria-hidden="true" data-prefix="far" data-icon="trash-alt"
                                                            role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""
                                                            onClick={() => isSelectedToRemove(listdata[page * 10 + index].id_schedule)}
                                                        ><path fill="currentColor" d="M192 188v216c0 6.627-5.373 12-12 12h-24c-6.627 0-12-5.373-12-12V188c0-6.627 5.373-12 12-12h24c6.627 0 12 5.373 12 12zm100-12h-24c-6.627 0-12 5.373-12 12v216c0 6.627 5.373 12 12 12h24c6.627 0 12-5.373 12-12V188c0-6.627-5.373-12-12-12zm132-96c13.255 0 24 10.745 24 24v12c0 6.627-5.373 12-12 12h-20v336c0 26.51-21.49 48-48 48H80c-26.51 0-48-21.49-48-48V128H12c-6.627 0-12-5.373-12-12v-12c0-13.255 10.745-24 24-24h74.411l34.018-56.696A48 48 0 0 1 173.589 0h100.823a48 48 0 0 1 41.16 23.304L349.589 80H424zm-269.611 0h139.223L276.16 50.913A6 6 0 0 0 271.015 48h-94.028a6 6 0 0 0-5.145 2.913L154.389 80zM368 128H80v330a6 6 0 0 0 6 6h276a6 6 0 0 0 6-6V128z"></path></svg>
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
                                        className={cx(`page-${page == index ? 'current' : ''}`)}
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
                <div className={cx('schedule')}>
                    <div className={cx('schedule-wrapper')}>
                        <div className={cx('schedule-title')}>
                            <p>Lịch làm việc</p>
                            <div className={cx('schedule-title-right')}>
                                <button onClick={handleAdd}>Thêm cuộc hẹn</button>
                                <button onClick={handleEdit}>Chỉnh sửa</button>
                                <button className={cx('no-click')}>Hoàn tất</button>
                            </div>
                        </div>
                        <div className={cx('schedule-search')}>
                            <input maxLength={100} placeholder='Tên bệnh nhân...' type='text'
                                onChange={handleNamePatientChange}></input>
                            <i class={cx("fas fa-search", 'search')}></i>
                            {listdata.length != 0 && <p>Không tìm thấy !</p>}
                        </div>
                        <div className={cx('schedule-content')}>
                            <div className={cx('schedule-table')}>
                                <div className={cx('row', 'line-row', 'line1', 'line-key', 'special-line')}>
                                    <div className={cx('col-md-1', 'schedule-table-index')}>STT</div>
                                    <div className={cx('col-md-1', 'schedule-table-ID_doctor')}>ID Bác Sĩ</div>
                                    <div className={cx('col-md-2', 'schedule-table-Name_doctor')}>Tên Bác Sĩ</div>
                                    <div className={cx('col-md-2', 'schedule-table-Time_in')}>Thời Gian Hẹn</div>
                                    <div className={cx('col-md-2', 'schedule-table-Patient')}>Tên Bệnh Nhân</div>
                                    <div className={cx('col-md-2', 'schedule-table-Patient')}>Số CCCD</div>
                                    <div className={cx('col-md-1', 'schedule-table-Room')}>Phòng</div>
                                    <div className={cx('col-md-1', 'schedule-table-Status')}>Trạng Thái</div>
                                </div>
                                {
                                    Array.from({ length: 10 }, (_, index) => {
                                        if (page * 10 + index + 1 > listdata.length) { }
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
                                                    <div className={cx('col-md-1', 'schedule-table-ID_doctor')}>{listdata[page * 10 + index].ID_doctor}</div>
                                                    <div className={cx('col-md-2', 'schedule-table-Name_doctor')}>{listdata[page * 10 + index].Name_doctor}</div>
                                                    <div className={cx('col-md-2', 'schedule-table-Time_in', 'edit-time')}>
                                                        {<p>{listdata[page * 10 + index].Hour_in + ", " + listdata[page * 10 + index].Date_in}</p>}
                                                    </div>
                                                    <div className={cx('col-md-2', 'schedule-table-Patient')}>{listdata[page * 10 + index].Patient}</div>
                                                    <div className={cx('col-md-2', 'schedule-table-Patient')}>{listdata[page * 10 + index].CCCD}</div>
                                                    <div className={cx('col-md-1', 'schedule-table-Room')}>{listdata[page * 10 + index].Room}</div>
                                                    <div className={cx('col-md-1', 'ahuhu', 'schedule-table-Status', `Status-${handleColor(page * 10 + index)}`)}>
                                                        <select name="select-in-normal" disabled>
                                                            <option className={cx('option1')} value={listdata[page * 10 + index].Status}>{listdata[page * 10 + index].Status}</option>
                                                            <option className={cx('option2')} value="Xong">Xong</option>
                                                            <option className={cx('option3')} value="Đang khám">Đang khám</option>
                                                            <option className={cx('option4')} value="Đang chờ">Đang chờ</option>
                                                        </select>
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
                                        className={cx(`page-${page == index ? 'current' : ''}`)}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
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
                                <h5>Bác Sĩ:</h5>
                                <div className={cx('form-doctor')}>
                                    <div className={cx('doctor-id')}>
                                        <input type='text' placeholder='ID bác sĩ...' value={form.id_Doctor} name="id_Doctor"
                                            onChange={handleCollectData}
                                            onClick={() => {
                                                setUlshow(true)
                                                //setSuggestions([])
                                            }}>
                                        </input>
                                        {ulshow && <ul className={cx('ul-id')}>
                                            {suggestionsID.map((suggestion, index) => {
                                                if (index > 4 || form.id_Doctor == '') { }
                                                else {
                                                    return (
                                                        <li key={index} onClick={() => handleSelectSuggestion(suggestion)}>
                                                            {suggestion.ID}
                                                        </li>
                                                    )
                                                }
                                            })}
                                        </ul>}
                                    </div>
                                    <div className={cx('doctor-name')}>
                                        <input type='text' placeholder='Tên bác sĩ...' value={form.name_Doctor} name="name_Doctor"
                                            onChange={handleCollectData}
                                            onClick={() => {
                                                setUlshow(true)
                                                setSuggestionsID([])
                                            }}>
                                        </input>
                                        {ulshow && <ul className={cx('ul-name')}>
                                            {suggestions.map((suggestion, index) => {
                                                if (index > 4 || form.name_Doctor == '') { }
                                                else {
                                                    return (
                                                        <li key={index} onClick={() => handleSelectSuggestion(suggestion)}>
                                                            {`${suggestion.FirstName} ${suggestion.LastName}`}
                                                        </li>
                                                    )
                                                }
                                            })}
                                        </ul>}
                                    </div>
                                </div>
                                <div className={cx('form-time')}>
                                    <div className={cx('form-time-title')}>
                                        <h5>Thời Gian Hẹn:</h5>
                                    </div>
                                    <div className={cx('form-time-input')}>
                                        <input type='time' value={form.time} name="time" onChange={handleCollectData}></input>
                                        <input type='date' value={form.date} name="date" onChange={handleCollectData}></input>
                                    </div>
                                </div>
                                <div className={cx('form-others')}>
                                    <div className={cx('form-others-title')}>
                                        <h5>Ghi Chú:</h5>
                                    </div>
                                    <div className={cx('form-others-input')}>
                                        <input type='text' placeholder='Tên bệnh nhân...' value={form.name_Patient} name="name_Patient" onChange={handleCollectData}></input>
                                        <input type='number' placeholder='CCCD bệnh nhân...' value={form.name_CCCD} name="name_CCCD" onChange={handleCollectData}></input>
                                        <input placeholder='Phòng...' type='text' value={form.room} name="room" onChange={handleCollectData}></input>
                                    </div>
                                </div>
                                <div className={cx('form-vali')} onClick={submitForm}>
                                    <button>Xác Nhận</button>
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
