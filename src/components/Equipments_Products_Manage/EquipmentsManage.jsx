import { getData, writeUserData } from '../../services/firebase';


import './EquipmentsManage.css';
import { useState, useEffect } from 'react';
import Modal from './Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

export default function EquipmentsManage({ }) {
    const [rowToEdit, setRowToEdit] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [data,setData] =useState([]);
    const [equipmentsRows, setEquipmentsRows] = useState([]);

    useEffect(() => {
        getData().then((post) => {
          if (post != null) {
            setData(post);
            setEquipmentsRows(post["Equipment"] ?? []);

          }
        });
      }, []);


    function handleSubmit(newRow) {
        rowToEdit === null ?
            setEquipmentsRows([...equipmentsRows, newRow]) : setEquipmentsRows(equipmentsRows.map((currTow, idx) => {
                if (idx !== rowToEdit) {
                    return currTow;
                }
                return newRow;
            })
            );
        if(rowToEdit===null){
            writeUserData([...equipmentsRows,newRow], "/Equipment");
        }
        else{
            let newData= equipmentsRows;
            newData[rowToEdit] =newRow;
            writeUserData(newData,"/Equipment");
        }
        
        
    }


    function handleDeleteRow(targetIndex) {
        writeUserData(equipmentsRows.filter((_, idx) => idx !== targetIndex), "/Equipment");
        setEquipmentsRows(equipmentsRows.filter((_, idx) => idx !== targetIndex));
    }

    function handleEditRow(idx) {
        setRowToEdit(idx);
        setModalOpen(true);
    }


    return (
        <div id='container'>
            <div id='header-container'>
            <button id="addnew-btn" onClick={() => {setModalOpen(true); setRowToEdit(null) }  }> + Thêm mới</button>
            <h1>Thiết bị</h1>
            </div>
            <table id='equipment-table'>
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
                        equipmentsRows.map((row, index) => {
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
                                            <button className="action-btn" id="delete-btn"type="submit" onClick={() => handleDeleteRow(index)}><FontAwesomeIcon icon={faTrashCan} style={{color: "#ff3333",}} /></button>
                                            <button className="action-btn" id="edit-btn"type="submit" onClick={() => handleEditRow(index)} ><FontAwesomeIcon icon={faPenToSquare} style={{color: "#1a9cff",}} /></button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            {modalOpen && <Modal closeModal={() => {
                setModalOpen(false);
            }} onSubmit={handleSubmit}
            defaultValue={rowToEdit !== null && equipmentsRows[rowToEdit]} />}
        </div>
    );
}