import classNames from 'classnames/bind'
import styles from './Schedule.module.scss'
import React from 'react'
import Footer from '../../Components/Footer'
import { toast } from "react-toastify";
import Pagination from "@mui/material/Pagination";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";


// --------------Firebase--------------
import { useState, useEffect, useCallback } from 'react';
import { addNewSchedule, searchIdDoctorByName, searchNameDoctorByID, setListSchedule } from '../../firebase/Schedule/FireBase.js'

import Updatewhenedit from '../../firebase/Schedule/updateWhenEdit.js'
import updateWhenRemove from '../../firebase/Schedule/updateWhenRemove.js';
// --------------End Firebase--------------

const cx = classNames.bind(styles)

export default function Schedule({ user }) {
    var [edit, setEdit] = useState(false)               // Edit mode
    var [add, setAdd] = useState(false)                 // Add mode
    var [page, setPage] = useState(1)                   // Current page number
    var [loading, setLoading] = useState(true)
    const [selectedId, setSelectedId] = useState(null);
    const rowsPerPage = 10;

    // --------------START BACKEND <KHÔNG PHẬN SỰ MIỄN VÀO>--------------
    const [listdata, setListdata] = useState([]);

    const [form, setForm] = useState({
        id_Doctor: user.typeEmp === 'Bác sỹ' ? user.id : "",
        name_Doctor: user.typeEmp === 'Bác sỹ' ? user.name : "",
        time: "",
        date: "",
        name_Patient: "",
        room: ""
    });

    const [suggestions, setSuggestions] = useState([]);

    const [suggestionsID, setSuggestionsID] = useState([]);

    const [namePatientSearch, setNamePatientSearch] = useState("")

    useEffect(() => {
        setListSchedule(user, namePatientSearch, setListdata);
    }, [namePatientSearch]);

    var handleLoadingDone = () => {
        setLoading(false)
    }

    useEffect(() => {
        if (user.typeEmp !== "Bác sỹ") {
            searchIdDoctorByName(user, form.name_Doctor, setSuggestions);
        }
    }, [form.name_Doctor])

    useEffect(() => {
        if (user.typeEmp !== "Bác sỹ") {
            searchNameDoctorByID(user, form.id_Doctor, setSuggestionsID)
        }
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

    const checkNum = (str) => {
        if (str.length > 12) return false;
        for (var i = 0; i < str.length; i++) {
            if (str[i] < '0' || str[i] > '9') return false;
        }
        return true;
    }

    const handleCollectData = (e) => {
        if (user.typeEmp === "Bác sỹ" && (e.target.name === "id_Doctor" || e.target.name === "name_Doctor")) return;

        if (e.target.name === 'name_CCCD') {
            if (checkNum(e.target.value)) {
                const { name, value } = e.target;
                setForm({
                    ...form,
                    [name]: value
                });
            }
        }
        else {
            const { name, value } = e.target;
            setForm({
                ...form,
                [name]: value
            });
        }
    }

    const handleNamePatientChange = (e) => {
        setNamePatientSearch(e.target.value);
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
                form.room === "" ||
                form.name_CCCD.length != 12
            ) {
                resolve(false);
            } else {
                toast.success("Thêm lịch hẹn thành công !", {
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

    var handleChangeData = (key, status, value, isRemove = false) => {
        const newListData = [...listdata];

        const data = newListData[key];

        if (isRemove === true) {
            const newData = [...data, isRemove];
            newListData[key] = newData;
            setListEdit(newListData);
        }
        else {
            data.status = value;
            newListData[key] = data;
            setListEdit(newListData);
        }
    }

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
        if (isEdited(key, status)) return;
        else {
            const newData = {
                id_schedule: key,
                status: status
            }
            setListEdit(prev => [...prev, newData])
        }
    }

    setTimeout(handleLoadingDone, 500);

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
        if (listEdit.length > 0) {
            toast.success("Chỉnh sửa thành công !", {
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
        else if (listRemove.length > 0 && listEdit.length <= 0) {
            toast.success("Xóa thành công !", {
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
    })

    const isSelectedToRemove = (e, key) => {
        const isFound = listRemove.find(item => item.id_schedule === key);

        setSelectedId(key);

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

    var [ulshow, setUlshow] = useState(false)

    var handleAdd = useCallback(() => {
        setAdd(prev => !prev)
    }, [])

    var handleChangepage = useCallback((e, p) => {
        setPage(p)
    }, [])

    if (!edit && !add) {
        return (
            <div id='backgroundE'>
                <Backdrop
                    sx={{ color: "#fff", zIndex: 1 }}
                    open={loading}
                    onClick={handleLoadingDone}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
                <div className={cx('schedule')}>
                    <div className={cx('schedule-wrapper')}>
                        <div className={cx('schedule-title')}>
                            <p>Lịch làm việc</p>
                            {user.typeEmp !== "Dược sỹ" && <div className={cx('schedule-title-right')}>
                                <button onClick={handleAdd}>Thêm cuộc hẹn</button>
                                <button onClick={() => {
                                    setEdit(true)
                                    setLoading(true)
                                }}>Chỉnh sửa</button>
                            </div>}
                        </div>
                        <div className={cx('schedule-search')}>
                            <input maxLength={100} placeholder='Tên bệnh nhân...' type='text'
                                onChange={handleNamePatientChange}></input>
                            <i class={cx("fas fa-search", 'search')}></i>
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
                                        if ((page - 1) * 10 + index + 1 > listdata.length) { }
                                        else {
                                            let count = index % 2;
                                            var handleColor = (indexx) => {
                                                if (listdata[indexx].Status == 'Xong') return 'done'
                                                else if (listdata[indexx].Status == 'Đang khám') return 'doing'
                                                else return 'pending'
                                            }

                                            return (
                                                <div key={index} className={cx('row', 'line-row', `line${count}`)}>
                                                    <div className={cx('col-md-1', 'schedule-table-index')}>{(page - 1) * 10 + index + 1}</div>
                                                    <div className={cx('col-md-1', 'schedule-table-ID_doctor')}>{listdata[(page - 1) * 10 + index].ID_doctor}</div>
                                                    <div className={cx('col-md-2', 'schedule-table-Name_doctor')}>{listdata[(page - 1) * 10 + index].Name_doctor}</div>
                                                    <div className={cx('col-md-2', 'schedule-table-Time_in', 'edit-time')}>
                                                        {<p>{listdata[(page - 1) * 10 + index].Time + ", " + listdata[(page - 1) * 10 + index].Date}</p>}
                                                    </div>
                                                    <div className={cx('col-md-2', 'schedule-table-Patient')}>{listdata[(page - 1) * 10 + index].Patient}</div>
                                                    <div className={cx('col-md-2', 'schedule-table-Patient')}>{listdata[(page - 1) * 10 + index].CCCD}</div>
                                                    <div className={cx('col-md-1', 'schedule-table-Room')}>{listdata[(page - 1) * 10 + index].Room}</div>
                                                    <div className={cx('col-md-1', 'ahuhu', 'schedule-table-Status', `Status-${handleColor((page - 1) * 10 + index)}`)}>
                                                        <select className={cx('select-status')} name="select-in-normal" disabled>
                                                            <option className={cx('option1')} value={listdata[(page - 1) * 10 + index].Status}>{listdata[(page - 1) * 10 + index].Status}</option>
                                                            <option className={cx('option2')} value="Xong">Xong</option>
                                                            <option className={cx('option3')} value="Đang khám">Đang khám</option>
                                                            <option className={cx('option4')} value="Đang chờ">Chưa khám</option>
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
                            <Pagination
                                color="primary"
                                onChange={handleChangepage}
                                page={page}
                                count={Math.ceil(listdata.length / rowsPerPage)}
                                rowsPerPage={10}
                                showFirstButton
                                showLastButton
                            />
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
    else if (edit) {
        return (
            <div id='backgroundE'>
                <Backdrop
                    sx={{ color: "#fff", zIndex: 1 }}
                    open={loading}
                    onClick={handleLoadingDone}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
                <div className={cx('schedule')}>
                    <div className={cx('schedule-wrapper')}>
                        <div className={cx('schedule-title')}>
                            <p>Lịch làm việc</p>
                            {user.typeEmp !== "Dược sỹ" && <div className={cx('schedule-title-right')}>
                                <button onClick={handleAdd} className={cx('no-click')}>Thêm cuộc hẹn</button>
                                <button onClick={() => { handleEdit(); setLoading(true) }}>Hoàn tất</button>
                            </div>}
                        </div>
                        <div className={cx('schedule-search')}>
                            <input maxLength={100} placeholder='Tên bệnh nhân...' type='text'
                                onChange={handleNamePatientChange}></input>
                            <i class={cx("fas fa-search", 'search')}></i>
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
                                        if ((page - 1) * 10 + index + 1 > listdata.length) { }
                                        else {
                                            let count = index % 2;
                                            var handleColor = (indexx) => {
                                                if (listdata[indexx].Status == 'Xong') return 'done'
                                                else if (listdata[indexx].Status == 'Đang khám') return 'doing'
                                                else return 'pending'
                                            }

                                            return (
                                                <div key={listdata[index].id_schedule} className={cx('row', 'line-row', `line${count}`)}>
                                                    <div style={{ display: 'none' }} className={cx('col-md-1', 'schedule-table-index')}>{(page - 1) * 10 + index + 1}</div>
                                                    <div className={cx('col-md-1', 'schedule-table-ID_doctor')} contentEditable>{listdata[(page - 1) * 10 + index].ID_doctor}</div>
                                                    <div className={cx('col-md-2', 'schedule-table-Name_doctor')} contentEditable>{listdata[(page - 1) * 10 + index].Name_doctor}</div>
                                                    <div className={cx('col-md-2', 'schedule-table-Time_in', 'edit-time')}>
                                                        {<p>{listdata[(page - 1) * 10 + index].Time + ", " + listdata[(page - 1) * 10 + index].Date}</p>}
                                                    </div>
                                                    <div className={cx('col-md-2', 'schedule-table-Patient')} contentEditable>{listdata[(page - 1) * 10 + index].Patient}</div>
                                                    <div className={cx('col-md-2', 'schedule-table-Patient')} contentEditable>{listdata[(page - 1) * 10 + index].CCCD}</div>
                                                    <div className={cx('col-md-1', 'schedule-table-Room')} contentEditable>{listdata[(page - 1) * 10 + index].Room}</div>
                                                    <div className={cx('col-md-2', `schedule-icons-${handleColor((page - 1) * 10 + index)}`, 'schedule-table-Status', 'schedule-icons')}>
                                                        {handleColor((page - 1) * 10 + index) === 'done' && (
                                                            <select
                                                                className={cx('select-status')}
                                                                name="select-in-edit"
                                                                onChange={(e) => isSelectedToEdit(listdata[(page - 1) * 10 + index].id_schedule, e.target.value)}
                                                            >
                                                                <option value="Xong">Xong</option>
                                                                <option value="Đang khám">Đang khám</option>
                                                                <option value="Chưa khám">Chưa khám</option>
                                                            </select>
                                                        )}
                                                        {handleColor((page - 1) * 10 + index) === 'doing' && (
                                                            <select
                                                                name="select-in-edit"
                                                                className={cx('select-status')}
                                                                onChange={(e) => isSelectedToEdit(listdata[(page - 1) * 10 + index].id_schedule, e.target.value)}
                                                            >
                                                                <option value="Xong">Xong</option>
                                                                <option value="Đang khám" selected>Đang khám</option>
                                                                <option value="Chưa khám">Chưa khám</option>
                                                            </select>
                                                        )}
                                                        {handleColor((page - 1) * 10 + index) === 'pending' && (
                                                            <select className={cx('select-status')} name="select-in-edit"
                                                                onChange={(e) => isSelectedToEdit(listdata[(page - 1) * 10 + index].id_schedule, e.target.value)}
                                                            >
                                                                <option value="Xong">Xong</option>
                                                                <option value="Đang khám">Đang khám</option>
                                                                <option selected value="Chưa khám">Chưa khám</option>
                                                            </select>
                                                        )}
                                                        <svg
                                                            onClick={(e) => isSelectedToRemove(e, listdata[(page - 1) * 10 + index].id_schedule)}
                                                            style={{ transform: selectedId === listdata[(page - 1) * 10 + index].id_schedule ? 'scale(1.5)' : 'scale(1)',
                                                            color: selectedId === listdata[(page - 1) * 10 + index].id_schedule ? 'red' : '' }}
                                                            className={cx(`MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root ${selectedId === listdata[(page - 1) * 10 + index].id_schedule ? 'choosen-to-remove' : ''}`)}
                                                            focusable="false"
                                                            aria-hidden="true"
                                                            viewBox="0 0 24 24"
                                                            data-testid="DeleteOutlineIcon">
                                                            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM8 9h8v10H8zm7.5-5-1-1h-5l-1 1H5v2h14V4z"></path>
                                                        </svg>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    })
                                }
                            </div>
                        </div>
                        <div className={cx('schedule-pages')}>
                            <Pagination
                                color="primary"
                                onChange={handleChangepage}
                                page={page}
                                count={Math.ceil(listdata.length / rowsPerPage)}
                                rowsPerPage={10}
                                showFirstButton
                                showLastButton
                            />
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
    else {
        return (
            <div>
                <div className={cx('schedule')}>
                    <div className={cx('schedule-wrapper')}>
                        <div className={cx('schedule-title')}>
                            <p>Lịch làm việc</p>
                            {user.typeEmp !== "Dược sỹ" && <div className={cx('schedule-title-right')}>
                                <button onClick={handleAdd}>Thêm cuộc hẹn</button>
                                <button onClick={() => setEdit(true)}>Chỉnh sửa</button>
                            </div>}
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
                                        if ((page - 1) * 10 + index + 1 > listdata.length) { }
                                        else {
                                            let count = index % 2;
                                            var handleColor = (indexx) => {
                                                if (listdata[indexx].Status == 'Xong') return 'done'
                                                else if (listdata[indexx].Status == 'Đang khám') return 'doing'
                                                else return 'pending'
                                            }

                                            return (
                                                <div key={index} className={cx('row', 'line-row', `line${count}`)}>
                                                    <div className={cx('col-md-1', 'schedule-table-index')}>{(page - 1) * 10 + index + 1}</div>
                                                    <div className={cx('col-md-1', 'schedule-table-ID_doctor')}>{listdata[(page - 1) * 10 + index].ID_doctor}</div>
                                                    <div className={cx('col-md-2', 'schedule-table-Name_doctor')}>{listdata[(page - 1) * 10 + index].Name_doctor}</div>
                                                    <div className={cx('col-md-2', 'schedule-table-Time_in', 'edit-time')}>
                                                        {<p>{listdata[(page - 1) * 10 + index].Time + ", " + listdata[(page - 1) * 10 + index].Date}</p>}
                                                    </div>
                                                    <div className={cx('col-md-2', 'schedule-table-Patient')}>{listdata[(page - 1) * 10 + index].Patient}</div>
                                                    <div className={cx('col-md-2', 'schedule-table-Patient')}>{listdata[(page - 1) * 10 + index].CCCD}</div>
                                                    <div className={cx('col-md-1', 'schedule-table-Room')}>{listdata[(page - 1) * 10 + index].Room}</div>
                                                    <div className={cx('col-md-1', 'ahuhu', 'schedule-table-Status', `Status-${handleColor((page - 1) * 10 + index)}`)}>
                                                        <select className={cx('select-status')} name="select-in-normal" disabled>
                                                            <option className={cx('option1')} value={listdata[(page - 1) * 10 + index].Status}>{listdata[(page - 1) * 10 + index].Status}</option>
                                                            <option className={cx('option2')} value="Xong">Xong</option>
                                                            <option className={cx('option3')} value="Đang khám">Đang khám</option>
                                                            <option className={cx('option4')} value="Đang chờ">Chưa khám</option>
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
                            <Pagination
                                color="primary"
                                onChange={handleChangepage}
                                page={page}
                                count={Math.ceil(listdata.length / rowsPerPage)}
                                rowsPerPage={10}
                                showFirstButton
                                showLastButton
                            />
                        </div>
                    </div>
                    <div className={cx('schedule-add')}>
                        <div className={cx('contain-form')}>
                            <div className={cx('form-title')}>
                                <span>Thêm lịch hẹn</span>
                            </div>
                            <div className={cx('form-doctor')}>
                                <div className={cx('doctor-id')}>
                                    <input
                                        type='text'
                                        placeholder='ID Bác Sĩ'
                                        value={user.typeEmp === "Bác sỹ" ? user.id : form.id_Doctor}
                                        name="id_Doctor"
                                        onChange={handleCollectData}
                                        onClick={() => {
                                            setUlshow(true);
                                        }}
                                        readOnly={user.typeEmp === "Bác sỹ"}

                                    ></input>
                                    {user.typeEmp !== "Bác sỹ" && ulshow && <ul className={cx('ul-id')}>
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
                                    <input
                                        type='text'
                                        placeholder='Tên Bác Sĩ'
                                        value={user.typeEmp === "Bác sỹ" ? user.name : form.name_Doctor}
                                        name="name_Doctor"
                                        onChange={handleCollectData}
                                        readOnly={user.typeEmp === "Bác sỹ"}
                                        onClick={() => {
                                            setUlshow(true)
                                            setSuggestionsID([])
                                        }}></input>
                                    {user.typeEmp !== "Bác sỹ" && ulshow && <ul className={cx('ul-name')}>
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
                                <div className={cx('form-time-time')}>
                                    <input
                                        type='time'
                                        value={form.time}
                                        name="time"
                                        onChange={handleCollectData}
                                    ></input>
                                </div>
                                <div className={cx('form-time-date')}>
                                    <input
                                        type='date'
                                        value={form.date}
                                        name="date"
                                        onChange={handleCollectData}></input>
                                </div>
                            </div>
                            <div className={cx('form-other')}>
                                <input
                                    type='text'
                                    placeholder='Tên bệnh nhân'
                                    value={form.name_Patient}
                                    name="name_Patient"
                                    onChange={handleCollectData}
                                ></input>
                                <input
                                    type='text'
                                    placeholder='CCCD'
                                    value={form.name_CCCD}
                                    name="name_CCCD"
                                    onChange={handleCollectData}
                                ></input>
                                <input
                                    type='text'
                                    placeholder='Phòng'
                                    value={form.room}
                                    name="room"
                                    onChange={handleCollectData}
                                ></input>
                            </div>
                            <div className={cx('form-button')}>
                                <button onClick={handleAdd}>HỦY</button>
                                <button onClick={submitForm}>XÁC NHẬN</button>
                            </div>
                        </div>
                    </div>
                    {/* <div className={cx('schedule-add')}>
                        <div className={cx('contain-form')}>
                            <div className={cx('schedule-form')}>
                                <div className={cx('form-close')} onClick={handleAdd}>
                                    <i className={cx("fas fa-times")}></i>
                                </div>
                                <div className={cx('form-title')}>
                                    <span>Thêm lịch hẹn</span>
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

                    </div> */}
                </div>
                <Footer />
            </div>
        )
    }
}
