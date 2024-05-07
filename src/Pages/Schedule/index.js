import classNames from 'classnames/bind'
import styles from './Schedule.module.scss'
import React from 'react'
import Footer from '../../Components/Footer'
import { toast } from "react-toastify";
import Pagination from "@mui/material/Pagination";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import ConfirmModalDeleteSchedule from "../../Components/CofirmModalDeleteSchedule";


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
        id_Doctor: user.typeEmp === 'Bác sĩ' ? user.id : "",
        name_Doctor: user.typeEmp === 'Bác sĩ' ? user.name : "",
        time: "",
        date: "",
        name_Patient: "",
        room: ""
    });

    const [showEdit, setShowEdit] = useState(false);
    const [formEdit, setFormEdit] = useState({
        id_schedule: "",
        ID_doctor: user.typeEmp === 'Bác sĩ' ? user.id : "",
        Name_doctor: user.typeEmp === 'Bác sĩ' ? user.name : "",
        Time: "",
        Date: "",
        Patient: "",
        Room: "",
        CCCD: "",
        Status: "",
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
        if (user.typeEmp !== "Bác sĩ") {
            searchIdDoctorByName(user, form.name_Doctor, setSuggestions);
        }
    }, [form.name_Doctor])

    useEffect(() => {
        if (user.typeEmp !== "Bác sĩ") {
            searchNameDoctorByID(user, form.id_Doctor, setSuggestionsID)
        }
    }, [form.id_Doctor])

    useEffect(() => {
        if (user.typeEmp !== "Bác sĩ") {
            searchIdDoctorByName(user, formEdit.Name_doctor, setSuggestions);
        }
    }, [formEdit.Name_doctor])

    useEffect(() => {
        if (user.typeEmp !== "Bác sĩ") {
            searchNameDoctorByID(user, formEdit.ID_doctor, setSuggestionsID)
        }
    }, [formEdit.ID_doctor])

    const handleSelectSuggestion = (suggestion) => {
        setForm({
            ...form,
            id_Doctor: suggestion.ID,
            name_Doctor: `${suggestion.FirstName} ${suggestion.LastName}`
        });
        setFormEdit({
            ...formEdit,
            ID_doctor: suggestion.ID,
            Name_doctor: `${suggestion.FirstName} ${suggestion.LastName}`
        })
        setSuggestions([]);
        setSuggestionsID([])
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
        if (user.typeEmp === "Bác sĩ" && (e.target.name === "id_Doctor" || e.target.name === "name_Doctor")) return;

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
        setPage(1)
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

    const handleEditForm = async (form) => {
        await setFormEdit(form);
        setShowEdit(true);
    }

    const handleCollectDataWhenEdit = (e) => {
        if (user.typeEmp === "Bác sĩ" && (e.target.name === "ID_doctor" || e.target.name === "Name_doctor")) return;

        const edit = { ...formEdit };

        if (e.target.name === 'CCCD') {
            if (checkNum(e.target.value)) {
                const { name, value } = e.target;
                edit[name] = value;
                setFormEdit(edit);
            }
        }
        else {
            const { name, value } = e.target;
            edit[name] = value;
            setFormEdit(edit);
        }
    }

    const submitFormWhenEdit = async () => {
        await Updatewhenedit(formEdit);
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
        })
        setShowEdit(false);
    }

    const handleDeleteRow = (id) => {
        updateWhenRemove(id);
        toast.success("Xóa lịch hẹn thành công !", {
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


    setTimeout(handleLoadingDone, 500);

    var handleEdit = (() => {
        setEdit(prev => !prev)
    })

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
                                    listdata ? Array.from({ length: 10 }, (_, index) => {
                                        if ((page - 1) * 10 + index + 1 > listdata.length) { }
                                        else {
                                            let count = index % 2;
                                            var handleColor = (indexx) => {
                                                if (listdata[indexx].Status == 'Xong') return 'done'
                                                else if (listdata[indexx].Status == 'Đang khám') return 'doing'
                                                else return 'pending'
                                            }
                                            console.log(listdata)
                                            console.log(listdata[1])
                                            console.log(index, page)
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

                                    }) : ""
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
                                <button onClick={() => {
                                    handleEdit();
                                    setLoading(true)
                                }}>Hoàn tất</button>
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
                                                <div key={listdata[(page - 1) * 10 + index].id_schedule}
                                                    className={cx('row', 'line-row', `line${count}`)}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handleEditForm(listdata[(page - 1) * 10 + index])
                                                    }}>
                                                    <div style={{ display: 'none' }} className={cx('col-md-1', 'schedule-table-index')}>{(page - 1) * 10 + index + 1}</div>
                                                    <div className={cx('col-md-1', 'schedule-table-ID_doctor')} >{listdata[(page - 1) * 10 + index].ID_doctor}</div>
                                                    <div className={cx('col-md-2', 'schedule-table-Name_doctor')} >{listdata[(page - 1) * 10 + index].Name_doctor}</div>
                                                    <div className={cx('col-md-2', 'schedule-table-Time_in', 'edit-time')}>
                                                        {<p>{listdata[(page - 1) * 10 + index].Time + ", " + listdata[(page - 1) * 10 + index].Date}</p>}
                                                    </div>
                                                    <div className={cx('col-md-2', 'schedule-table-Patient')} >{listdata[(page - 1) * 10 + index].Patient}</div>
                                                    <div className={cx('col-md-2', 'schedule-table-Patient')} >{listdata[(page - 1) * 10 + index].CCCD}</div>
                                                    <div className={cx('col-md-1', 'schedule-table-Room')} >{listdata[(page - 1) * 10 + index].Room}</div>
                                                    <div className={cx('col-md-2', `schedule-icons-${handleColor((page - 1) * 10 + index)}`, 'schedule-table-Status', 'schedule-icons')} onClick={e => e.preventDefault()}>
                                                        {listdata[(page - 1) * 10 + index].Status === 'Xong' ? (
                                                            <div className={cx('select-status')} style={{ padding: 0 }}>Xong</div>
                                                        ) : listdata[(page - 1) * 10 + index].Status === 'Đang khám' ? (
                                                            <div className={cx('select-status')} style={{ padding: 0 }}>Đang khám</div>
                                                        ) : (
                                                            <div className={cx('select-status')} style={{ padding: 0 }}>Chưa khám</div>
                                                        )}
                                                        <svg
                                                            style={{
                                                                transform: selectedId === listdata[(page - 1) * 10 + index].id_schedule ? 'scale(1.5)' : 'scale(1)',
                                                                color: '#d32f2f !important;'
                                                            }}
                                                            className={cx('color-red',`MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root ${selectedId === listdata[(page - 1) * 10 + index].id_schedule ? 'choosen-to-remove' : ''}`)}
                                                            focusable="false"
                                                            aria-hidden="true"
                                                            viewBox="0 0 24 24"
                                                            data-testid="DeleteOutlineIcon"
                                                            onClick={e => {
                                                                e.stopPropagation();
                                                                handleDeleteRow(listdata[(page - 1) * 10 + index].id_schedule);
                                                            }}>
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
                    {showEdit && <div className={cx('schedule-add')}>
                        <div className={cx('contain-form')} style={{ height: "400px", padding: "5px 10px" }}>
                            <div className={cx('form-title')}>
                                <span>Chỉnh sửa cuộc hẹn</span>
                            </div>
                            <div className={cx('form-doctor')}>
                                <div className={cx('doctor-id')}>
                                    <input
                                        type='text'
                                        placeholder='ID Bác Sĩ'
                                        value={user.typeEmp === "Bác sĩ" ? user.id : formEdit.ID_doctor}
                                        name="ID_doctor"
                                        onChange={handleCollectDataWhenEdit}
                                        onClick={(e) => {
                                            setUlshow(true);
                                        }}
                                        readOnly={user.typeEmp === "Bác sĩ"}
                                    ></input>
                                    {user.typeEmp !== "Bác sĩ" && ulshow && <ul className={cx('ul-id')}>
                                        {suggestionsID.map((suggestion, index) => {
                                            if (index > 4 || formEdit.ID_doctor == '') { }
                                            else {
                                                return (
                                                    <li key={index} onClick={(e) => {
                                                        handleSelectSuggestion(suggestion)
                                                    }}>
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
                                        value={user.typeEmp === "Bác sĩ" ? user.name : formEdit.Name_doctor}
                                        name="Name_doctor"
                                        onChange={handleCollectDataWhenEdit}
                                        readOnly={user.typeEmp === "Bác sĩ"}
                                        onClick={(e) => {
                                            setUlshow(true)
                                            setSuggestionsID([])
                                        }}></input>
                                    {user.typeEmp !== "Bác sĩ" && ulshow && <ul className={cx('ul-name')}>
                                        {suggestions.map((suggestion, index) => {
                                            if (index > 4 || formEdit.Name_doctor == '') { }
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
                                        value={formEdit.Time}
                                        name="Time"
                                        onChange={handleCollectDataWhenEdit}
                                    ></input>
                                </div>
                                <div className={cx('form-time-date')}>
                                    <input
                                        type='date'
                                        value={formEdit.Date}
                                        name="date"
                                        onChange={handleCollectDataWhenEdit}></input>
                                </div>
                            </div>
                            <div className={cx('form-other-1')}>
                                <input
                                    type='text'
                                    placeholder='Tên bệnh nhân'
                                    value={formEdit.Patient}
                                    name="Patient"
                                    onChange={handleCollectDataWhenEdit}
                                ></input>
                                <input
                                    type='text'
                                    placeholder='CCCD'
                                    value={formEdit.CCCD}
                                    name="CCCD"
                                    onChange={handleCollectDataWhenEdit}
                                ></input>
                                {/* <input
                                    type='text'
                                    placeholder='Phòng'
                                    value={formEdit.Room}
                                    name="Room"
                                    onChange={handleCollectDataWhenEdit}
                                ></input> */}
                            </div>
                            <div className={cx('form-other-1')}>
                                <input
                                    type='text'
                                    placeholder='Phòng'
                                    value={formEdit.Room}
                                    name="Room"
                                    onChange={handleCollectDataWhenEdit}
                                ></input>
                                <select
                                    value={formEdit.Status}
                                    name="Status"
                                    onChange={handleCollectDataWhenEdit}
                                    style={{
                                        width: "45%",
                                        border: "none",
                                        padding: "2% 5%",
                                        borderBottom: "1.5px solid #adadad", // Thêm dấu chấm phẩy ở đây
                                    }}
                                >
                                    <option value="Xong" selected={formEdit.Status === "Xong"}>Xong</option>
                                    <option value="Đang khám" selected={formEdit.Status === "Đang khám"}>Đang khám</option>
                                    <option value="Chưa khám" selected={formEdit.Status === "Chưa khám"}>Chưa khám</option>
                                </select>
                            </div>
                            <div className={cx('form-button')} >
                                <button onClick={() => setShowEdit(false)}>HỦY</button>
                                <button onClick={e => {
                                    e.preventDefault();
                                    submitFormWhenEdit();
                                }}>XÁC NHẬN</button>
                            </div>
                        </div>
                    </div>}
                </div>
                <Footer />
            </div >
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
                                        value={user.typeEmp === "Bác sĩ" ? user.id : form.id_Doctor}
                                        name="id_Doctor"
                                        onChange={handleCollectData}
                                        onClick={() => {
                                            setUlshow(true);
                                        }}
                                        readOnly={user.typeEmp === "Bác sĩ"}

                                    ></input>
                                    {user.typeEmp !== "Bác sĩ" && ulshow && <ul className={cx('ul-id')}>
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
                                        value={user.typeEmp === "Bác sĩ" ? user.name : form.name_Doctor}
                                        name="name_Doctor"
                                        onChange={handleCollectData}
                                        readOnly={user.typeEmp === "Bác sĩ"}
                                        onClick={() => {
                                            setUlshow(true)
                                            setSuggestionsID([])
                                        }}></input>
                                    {user.typeEmp !== "Bác sĩ" && ulshow && <ul className={cx('ul-name')}>
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
                </div>
                <Footer />
            </div>
        )
    }
}
