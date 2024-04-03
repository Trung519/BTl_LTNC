import { getData, writeUserData } from '../../services/firebase';


import Select from 'react-select';
import './EquipmentsManage.css';
import { useState, useEffect } from 'react';
import Modal from './Modal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
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


export default function EquipmentsManage({ }) {
    const [rowToEdit, setRowToEdit] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [data, setData] = useState([]);
    const [equipmentsRows, setEquipmentsRows] = useState([
    ]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        getData().then((post) => {
            if (post != null) {
                setData(post);
                setEquipmentsRows(post["Equipment"] ?? []);

            }
        });
    }, []);


    function handleSubmit(newRow) {
        if (rowToEdit === null) {
            writeUserData([...equipmentsRows, newRow], "/Equipment");
            setEquipmentsRows([...equipmentsRows,newRow]);
        }
        else {
            let newData = equipmentsRows;
            newData[rowToEdit] = newRow;
            writeUserData(newData, "/Equipment");
            setEquipmentsRows(newData);
        }
        // rowToEdit === null ?
        //     setEquipmentsRows([...equipmentsRows, newRow]) : setEquipmentsRows(equipmentsRows.map((currTow, idx) => {
        //         if (idx !== rowToEdit) {
        //             return currTow;
        //         }
        //         return newRow;
        //     })
        //     );


    }


    function handleDeleteRow(targetIndex) {
        writeUserData(equipmentsRows.filter((_, idx) => idx !== targetIndex), "/Equipment");
        setEquipmentsRows(equipmentsRows.filter((_, idx) => idx !== targetIndex));
    }

    function handleEditRow(idx) {
       let index =idx + rowsPerPage*page;
        setRowToEdit(index);
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

    return (
        <div id='container'>
            <div id='header-container'>
                <button id="addnew-btn" onClick={() => { setModalOpen(true); setRowToEdit(null) }}> + Thêm mới</button>
                <h1>Thiết bị</h1>
            </div>
            <div className='search'>
                <TextField
                    id="outlined-basic"
                    variant="outlined"
                    fullWidth
                    onChange={inputHandler}
                    label="Tìm kiếm"
                />
            </div>

            <table id='equipment-table' >
                <thead>
                    <th className='name-col'>Tên </th>
                    <th className='type-col'>Loại</th>
                    <th className='name-col'>Phòng</th>
                    <th className='name-col'>Mô tả</th>
                    <th className='type-col'>Trạng thái</th>
                    <th className='type-col'>Thao tác</th>
                </thead>
                <tbody>
                    {
                        (rowsPerPage > 0
                            ? filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : filteredData
                        )
                            .map((row, index) => {
                                return (
                                    <tr key={index}>
                                        <td className='name-col'>{<div>
                                            <span>{row.name}</span> <br />
                                            <span id="txt-id">{row.id}</span>
                                        </div>}</td>
                                        <td className='type-col'>{row.type}</td>
                                        <td className='name-col'>{row.room}</td>
                                        <td className='name-col' >{row.description}</td>
                                        <td className='type-col'><span>{row.status}</span></td>
                                        <td className='type-col'>
                                            <div id='action-btn-container'>
                                                <button className="action-btn" id="delete-btn" type="submit" onClick={() => handleDeleteRow(index)}><FontAwesomeIcon icon={faTrashCan} style={{ color: "#ff3333", }} /></button>
                                                <button className="action-btn" id="edit-btn" type="submit" onClick={() => handleEditRow(index)} ><FontAwesomeIcon icon={faPenToSquare} style={{ color: "#1a9cff", }} /></button>
                                            </div>
                                        </td>
                                    </tr>
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
                defaultValue={rowToEdit !== null && equipmentsRows[rowToEdit]} />}
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
