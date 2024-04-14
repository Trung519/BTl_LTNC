import { getData, writeUserData } from '../../services/firebase';
import { v4 as uuidv4 } from 'uuid'




// import Select from 'react-select';
import './EquipmentsManage.scss';
import { useState, useEffect, useCallback } from 'react';
import Modal from '../../Components/Modal/Modal';
import ConfirmDeleteMaintain from '../../Components/ConfirmDeleteMaintain';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faColonSign, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';


import TextField from "@mui/material/TextField";
import {
    TablePagination,
    tablePaginationClasses as classes,
} from '@mui/base/TablePagination';
import { styled } from '@mui/system';
import FirstPageRoundedIcon from '@mui/icons-material/FirstPageRounded';
import LastPageRoundedIcon from '@mui/icons-material/LastPageRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { Alert } from '@mui/material';
import Fade from '@mui/material/Fade';
import ConfirmModal from '../../Components/ConfirmModal';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Button } from 'bootstrap';
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Troubleshoot } from '@mui/icons-material';
import { sassTrue } from 'sass';
import { faCreativeCommonsNcJp } from '@fortawesome/free-brands-svg-icons';


export default function EquipmentsManage({ }) {
    const [idToEdit, setidToEdit] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [data, setData] = useState([]);
    const [equipmentsRows, setEquipmentsRows] = useState([]);
    const [maintain,setMaintain] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [displayAlert, setDisplayAlert] = useState(false);
    const [displayConfirm, setDisplayConfirm] = useState(false);
   
    // State variable to keep track of all the expanded rows
  // By default, nothing expanded. Hence initialized with empty array.
  const [expandedRows, setExpandedRows] = useState([]);

  // State variable to keep track which row is currently expanded.
  const [expandState, setExpandState] = useState({});


  const handleExpandRow = (event, Id) => {
    const currentExpandedRows = expandedRows;
    const isRowExpanded = currentExpandedRows.includes(Id);

    let obj = {};
    isRowExpanded ? (obj[Id] = false) :  (obj[Id] = true);
    setExpandState(obj);

    // If the row is expanded, we are here to hide it. Hence remove
    // it from the state variable. Otherwise add to it.
    const newExpandedRows = isRowExpanded ?
          currentExpandedRows.filter(id => id !== Id) :
          currentExpandedRows.concat(Id);

    setExpandedRows(newExpandedRows);
  }

    // const [historyRows, setHistoryRows] = useState([
    //     {
    //         date: '2021-06-01',
    //         description: 'Mua 1 cái mới',
    //     },
    //     {
    //         date: '2021-06-02',
    //         description: 'Sửa chữa',
    //     }

    // ]);





    useEffect(() => {
        getData().then((post) => {
            if (post != null) {
                setData(post);
                setEquipmentsRows(post["Equipment"] ?? []);
                setMaintain(post["Maintain"] ?? [])

            }
        });
    }, []);



    const handleDisplayAlert = () => {
        setDisplayAlert(true);
        setTimeout(() => {
            setDisplayAlert(false);
        }, 2000);
    }


    function handleSubmit(newRow) {
        if (idToEdit === null) {
            // add item
            // newRow={...newRow, id: uuidv4()}
            let ID = uuidv4()
            let newdata = [...equipmentsRows, { ...newRow, id: ID }]
            writeUserData(newdata, "/Equipment");
            setEquipmentsRows(newdata);
        }
        else {
            // edit item
            let newData = equipmentsRows;
            // newData[idToEdit] = newRow;
            let find = newData.find(item => item.id === idToEdit);
            if (find) {
                find.name = newRow.name;
                find.room = newRow.room;
                find.status = newRow.status;
                find.type = newRow.type;
                find.description = newRow.description;
            }
            writeUserData(newData, "/Equipment");
            setEquipmentsRows(newData);
        }
        // idToEdit === null ?
        //     setEquipmentsRows([...equipmentsRows, newRow]) : setEquipmentsRows(equipmentsRows.map((currTow, idx) => {
        //         if (idx !== idToEdit) {
        //             return currTow;
        //         }
        //         return newRow;
        //     })
        //     );
        handleDisplayAlert()
    }


    const handleOnclickDelete = (ID) => {
        setidToEdit(ID);
        setDisplayConfirm(true);
        // console.log('idtodit', idToEdit)
    }


    const handleDeleteRow = useCallback(
        () => {
            // console.log('idto Edit', idToEdit)
            writeUserData(equipmentsRows.filter((item, idx) => item.id !== idToEdit), "/Equipment");
            setEquipmentsRows(equipmentsRows.filter((item, idx) => item.id !== idToEdit));
            setDisplayConfirm(false);
        }, [idToEdit])




    function handleEditRow(id) {


        setidToEdit(id);
        setModalOpen(true);
    }


    const [inputText, setInputText] = useState("");
    let inputHandler = (e) => {
        //convert input text to lower case
        var lowerCase = e.target.value.toLowerCase();
        setInputText(lowerCase);
    };
    

    const filteredData = equipmentsRows.filter((el) => {
        if (inputText === "") {
            return el;
        }
        else {
            return el.name.toLowerCase().includes(inputText) || el.type.toLowerCase().includes(inputText) || el.room.toLowerCase().includes(inputText) || el.description.toLowerCase().includes(inputText) || el.status.toLowerCase().includes(inputText) || el.id.toLowerCase().includes(inputText);
        }
    })


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };


    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - equipmentsRows.length) : 0;

    // maintain
    const [alertDeleteMaintain, setAlertDeteteMaintain] = useState(false);
    const [formsState, setFormsState] = useState([]);  // luu danh sach maintain có mở form điền thông tin
    const [alertIsMaintaining, setAlertIsMaintaining] = useState(false);
    const clickAdd =(id) =>{
        if(isMaintaining(id)){
            setAlertIsMaintaining(true);
            setTimeout(() => {
                setAlertIsMaintaining(false);
            }, 3000);
        }
        else{

            let newFormsState = formsState;
            if(formsState.includes(id)){
                // co thi xoa
                newFormsState=formsState.filter(item=> item!==id);
            }
            else{
                // k co thi them
                newFormsState= [...formsState, id];
            }
            setFormsState(newFormsState);
        }
    }
    const cancelAddMaintain =(id) =>{
        // setDisplayFormMaintain(false);
        let newFormsState = formsState;
        newFormsState=formsState.filter(item=>item!==id);
        setFormsState(newFormsState);
        
    }

    function isMaintaining (id){
        //KIỂM TRA THIẾT BỊ CÓ ĐANG BẢO TRÌ KHÔNG NẾU ĐANG BẢO TRÌ THÌ K ĐC PHÉP THÊM MỚI 
        let log_maintain = maintain.filter(item => item.id===id);
        let find = log_maintain.find(item => item.state===false);
        if(find) return true;
        return false;
    }
    
    const addMaintain =(id) =>{
        // xử lý lưu lích sử maintain mới thêm vào database
        let input_content = document.getElementsByClassName("input-content")
        let id_maintain = uuidv4();
        let newMaintain = {
            content: input_content[0].value,
            id: id,
            state: false,
            time: getFormattedDate(),
            time_finish: '---',
            id_maintain: id_maintain,
        }
        let newDataMaintain = maintain;
        newDataMaintain= [newMaintain, ...maintain]
        writeUserData(newDataMaintain, "/Maintain");
        cancelAddMaintain(id);
        setMaintain(newDataMaintain);
    }
    
    const onClickDeleteMaintain =() =>{
        // alert confirm xóa lịch sử bảo trì
        setAlertDeteteMaintain(true);
    }
    const handleDeleteMaintain =(id_maintain) =>{
        // xử lý xóa lịch sử maintain
        let newDataMaintain = maintain;
        newDataMaintain= maintain.filter(item=> item.id_maintain!==id_maintain);
        writeUserData(newDataMaintain,"/Maintain");
        setMaintain(newDataMaintain);
        setAlertDeteteMaintain(false);
    }
    
    function getFormattedDate() {
        // Lấy ngày hôm nay
        const today = new Date();
        
        // Lấy ngày, tháng, năm từ đối tượng Date
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Lưu ý: Tháng bắt đầu từ 0
        const year = today.getFullYear();
    
        // Trả về ngày đã định dạng
        return `${day}/${month}/${year}`;
    }

    const setStateMaintain = (id_maintain) =>{
        setMaintain(prev =>{
            let today = getFormattedDate();

            let newDataMaintain= prev.map((item,index) =>{
                if(item.id_maintain===id_maintain){
                    return {...item, time_finish: today , state: true}
                }
                else{
                    return item;
                }
            })
            
            writeUserData(newDataMaintain,'/Maintain');
            return newDataMaintain;
        })
        

    }


    return (
        <div id='backgroundE'>
            <div id='container'>
                <div>
                    <Fade in={displayAlert}>
                        <Alert severity="success">Thêm thiết bị thành công</Alert>
                    </Fade>
                </div>




                <div id='header-container'>
                    <button id="addnew-btn" onClick={() => { setModalOpen(true); setidToEdit(null) }}> + Thêm mới</button>
                    <h1>Quản lý Thiết bị</h1>
                </div>
                <div className='search'>
                    <TextField
                        id="outlined-basic"
                        variant="outlined"
                        sx={{
                            "& fieldset": { border: 'none' },
                        }}
                        fullWidth
                        size='small'
                        onChange={inputHandler}
                        label="Tìm kiếm"
                        InputProps={{
                            style: {
                                borderRadius: "40px",
                                background: '#F4F6F6',
                            }
                        }}
                    />
                </div>


                <table id='equipment-table' >
                    <thead>
                        <th className='table-head-item' ></th>
                        <th className='table-head-item'>Tên </th>
                        <th className='table-head-item'>Loại</th>
                        <th className='table-head-item'>Phòng cất trữ</th>
                        <th className='table-head-item'>Mô tả</th>
                        <th className='table-head-item'>Trạng thái</th>
                        <th className='table-head-item'>Thao tác</th>
                    </thead>
                    <tbody>
                        {
                            (rowsPerPage > 0
                                ? filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : filteredData
                            )
                                .map((row, index) => {
                                    return (
                                        <>
                                            <tr key={index}>
                                                <td className='table-data-item'>
                                                    <IconButton
                                                        aria-label="expand row"
                                                        size="small"
                                                        onClick={event => handleExpandRow(event, index)
                                                        }
                                                    >
                                                        {expandState[index]  ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                                    </IconButton>
                                                </td>
                                                <td className='table-data-item'>{<div>
                                                    <span>{row.name}</span> <br />
                                                    {/* <span id="txt-id">{row.id}</span> */}
                                                </div>}
                                                </td>
                                                <td className='table-data-item'>{row.type}</td>
                                                <td className='table-data-item'>{row.room}</td>
                                                <td className='table-data-item' >{row.description}</td>
                                                <td className='table-data-item'><span>{row.status}</span></td>
                                                <td className='table-data-item'>
                                                    <div id='action-btn-container'>
                                                        <button className="action-btn" id="delete-btn" type="submit" onClick={() => handleOnclickDelete(row.id)}><FontAwesomeIcon icon={faTrashCan} style={{ color: "#ff3333", }} /></button>
                                                        <button className="action-btn" id="edit-btn" type="submit" onClick={() => handleEditRow(row.id)} ><FontAwesomeIcon icon={faPenToSquare} style={{ color: "#1a9cff", }} /></button>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="collapse-row" colSpan={7} >
                                                    <Collapse in={ expandedRows.includes(index)} timeout="auto" unmountOnExit>
                                                        <Box sx={{ margin: 1, bgcolor: '#F1F8FF', padding: '10px' }}>
                                                            <Typography variant="h6" gutterBottom component="div">
                                                                <div className='swaper-title'>
                                                                    <span>Lịch sử bảo dưỡng</span>
                                                                    
                                                                    <IconButton
                                                                        aria-label="add"
                                                                        size="small"
                                                                        color="info"
                                                                        onClick={()=>clickAdd(row.id)}
                                                                    >
                                                                        <AddCircleIcon></AddCircleIcon>
                                                                    </IconButton>    
                                                                    <Fade in={alertIsMaintaining}>
                                                                    <Alert variant="outlined" severity="error" className='error-add-maintain'>
                                                                        Thiết bị đang được bảo trì
                                                                    </Alert>                                                            
                                                                    </Fade>
                                                                </div>
                                                            </Typography>
                                                            <table className="collapse-table">
                                                                <thead>
                                                                    <th className='maintain-header'>Thời gian</th>
                                                                    <th className='maintain-header'>Thời gian hoàn thành</th>
                                                                    <th className='maintain-header'>Nội dung</th>
                                                                    <th className='maintain-header'></th>
                                                                </thead>
                                                                <tbody>
                                                                    {/* {historyRows.map((historyRow) => (
                                                                        <tr key={historyRow.date}>
                                                                            <td >
                                                                                {historyRow.date}
                                                                                
                                                                                
                                                                            </td>
                                                                            <td>{historyRow.description}</td>
                                                                            <td>14/03/2024</td>
                                                                            <td>Thiết bị đo không chính xác do thời gian dài sử dụng</td>
                                                                            <td>
                                                                            <button type="button">Bảo trì xong</button>
                                                                            </td>

                                                                        </tr>
                                                                    ))} */}
                                                                  {  formsState.includes(row.id) && <tr>
                                                                            <td className='maintain-data'>{`${getFormattedDate()}`}</td>
                                                                            <td className='maintain-data' >---</td>
                                                                            <td className='maintain-data'>
                                                                                <input className='input-content' type='text' autoFocus ></input>
                                                                            </td>
                                                                            <td className='maintain-data'>
                                                                               <button onClick={()=>addMaintain(row.id)} >Add</button>
                                                                               <button onClick={() => cancelAddMaintain(row.id)}>Cancel</button>
                                                                            </td>
                                                                    </tr>}
                                                                    
                                                                    {
                                                                        
                                                                        maintain.filter(item=> item.id===row.id).map((row,index)=>(

                                                                        <tr>
                                                                            <td className='maintain-data'>{row.time}</td>
                                                                            <td className='maintain-data' >{row.time_finish}</td>
                                                                            <td className='maintain-data'>{row.content}</td>
                                                                            <td className='maintain-data'>
                                                                               <div className='state-maintain'> {row.state ? <span  >Đã bảo trì</span> : <button onClick={()=>setStateMaintain(row.id_maintain)} className='btn-confirm-maintain'>Xác nhận bảo trì xong</button>} </div>
                                                                                <button className="action-btn" id="delete-btn" type="submit" ><FontAwesomeIcon icon={faTrashCan} style={{ color: "#ff3333", }} onClick={onClickDeleteMaintain} /></button>
                                                                                <ConfirmDeleteMaintain 
                                                                                alertDeleteMaintain={alertDeleteMaintain} 
                                                                                setAlertDeteteMaintain={setAlertDeteteMaintain}
                                                                                handleDeleteMaintain={handleDeleteMaintain}
                                                                                id_maintain={row.id_maintain}
                                                                                />
                                                                            </td>
                                                                        </tr>
                                                                        ))
                                                                    }
                                                                    

                                                                </tbody>
                                                            </table>
                                                        </Box>
                                                        <Box sx={{ margin: 1, bgcolor: '#F1F8FF', padding: '10px' }}>
                                                            <Typography variant="h6" gutterBottom component="div">
                                                                <div className='swaper-title'>
                                                                    <span>Lịch sử sử dụng</span>
                                                                    <IconButton
                                                                            aria-label="add"
                                                                            size="small"
                                                                            color="info"
                                                                            
                                                                        >
                                                                            <AddCircleIcon></AddCircleIcon>
                                                                        </IconButton> 
                                                                </div>
                                                            </Typography>
                                                            <table className="collapse-table">
                                                                <thead>
                                                                    <th>Thời gian</th>
                                                                    <th>Thời gian trả</th>
                                                                    <th>Người sử dụng</th>
                                                                    <th></th>
                                                                </thead>
                                                                <tbody>
                                                                    {/* {historyRows.map((historyRow) => (
                                                                        <tr key={historyRow.date}>
                                                                            <td >
                                                                                {historyRow.date}
                                                                            </td>
                                                                            <td>{historyRow.description}</td>
                                                                            

                                                                        </tr>
                                                                    ))} */}

                                                                   <tr>
                                                                        <td>13/04/2024</td>
                                                                        <td>---</td>
                                                                        <td>BS-1203</td>
                                                                        <td>
                                                                            <button>Xác nhận trả</button>
                                                                        </td>
                                                                   </tr>
                                                                   <tr>
                                                                        <td>13/04/2024</td>
                                                                        <td>14/04/2024</td>
                                                                        <td>BS-1203</td>
                                                                        <td>
                                                                           Đã trả thiết bị
                                                                        </td>
                                                                   </tr>
                                                                </tbody>
                                                            </table>
                                                        </Box>
                                                    </Collapse>
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })
                        }
                        {emptyRows > 0 && (
                            <tr style={{ height: 41 * emptyRows }}>
                                <td colSpan={6} aria-hidden />
                            </tr>)}
                    </tbody>
                    <tfoot>
                        <tr>
                            <CustomTablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                colSpan={6}
                                count={equipmentsRows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                labelRowsPerPage={"Số hàng hiển thị:"}
                                slotProps={{
                                    select: {
                                        'aria-label': 'rows per page',
                                    },
                                    actions: {
                                        showFirstButton: true,
                                        showLastButton: true,
                                        slots: {
                                            firstPageIcon: FirstPageRoundedIcon,
                                            lastPageIcon: LastPageRoundedIcon,
                                            nextPageIcon: ChevronRightRoundedIcon,
                                            backPageIcon: ChevronLeftRoundedIcon,
                                        },
                                    },
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </tr>
                    </tfoot>
                </table>
                {modalOpen && <Modal closeModal={() => {
                    setModalOpen(false);
                }} onSubmit={handleSubmit}
                    defaultValue={idToEdit !== null && equipmentsRows.find(item => item.id === idToEdit)} />}
                <ConfirmModal displayConfirm={displayConfirm} setDisplayConfirm={setDisplayConfirm} handleDeleteRow={handleDeleteRow}  ></ConfirmModal>
            </div>
        </div>
    );
}


const blue = {
    50: '#F0F7FF',
    200: '#A5D8FF',
    400: '#3399FF',
    900: '#003A75',
};


const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};


const CustomTablePagination = styled(TablePagination)(
    ({ theme }) => `
   & .${classes.spacer} {
     display: none;
   }
    & .${classes.toolbar}  {
     display: flex;
     flex-direction: column;
     align-items: flex-start;
     gap: 8px;
     padding: 4px 0;
      @media (min-width: 768px) {
       flex-direction: row;
       align-items: center;
     }
   }
    & .${classes.selectLabel} {
     margin: 0;
   }
    & .${classes.select}{
     font-family: 'IBM Plex Sans', sans-serif;
     padding: 2px 0 2px 4px;
     border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
     border-radius: 6px;
     background-color: transparent;
     color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
     transition: all 100ms ease;
      &:hover {
       background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
       border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
     }
      &:focus {
       outline: 3px solid ${theme.palette.mode === 'dark' ? blue[400] : blue[200]};
       border-color: ${blue[400]};
     }
   }
    & .${classes.displayedRows} {
     margin: 0;
      @media (min-width: 768px) {
       margin-left: auto;
     }
   }
    & .${classes.actions} {
     display: flex;
     gap: 6px;
     border: transparent;
     text-align: center;
   }
    & .${classes.actions} > button {
     display: flex;
     align-items: center;
     padding: 0;
     border: transparent;
     border-radius: 50%;
     background-color: transparent;
     border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
     color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
     transition: all 120ms ease;
      > svg {
       font-size: 22px;
     }
      &:hover {
       background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
       border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
     }
      &:focus {
       outline: 3px solid ${theme.palette.mode === 'dark' ? blue[400] : blue[200]};
       border-color: ${blue[400]};
     }
      &:disabled {
       opacity: 0.3;
       &:hover {
         border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
         background-color: transparent;
       }
     }
   }
   `,
);





