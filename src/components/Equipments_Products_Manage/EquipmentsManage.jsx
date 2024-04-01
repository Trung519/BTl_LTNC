import './EquipmentsManage.css';
import { useState } from 'react';
import Modal from './Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

export default function EquipmentsManage({ }) {
    const [rowToEdit, setRowToEdit] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [equipmentsRows, setEquipmentsRows] = useState([
        {
            name: 'X-Ray Machine 1',
            type: 'X-Ray',
            id: 'XR01',
            room: 'Room 101',
            description: 'X-Ray machine',
            status: 'Hoạt động'
        },
        {
            name: 'X-Ray Machine 2',
            type: 'X-Ray',
            id: 'XR02',
            room: 'Room 102',
            description: 'X-Ray machine',
            status: 'Không hoạt động'
        },
        {
            name: 'X-Ray Machine 3',
            type: 'X-Ray',
            id: 'XR03',
            room: 'Room 103',
            description: 'X-Ray machine',
            status: 'Sửa chữa'
        },

    ]);


    function handleSubmit(newRow) {
        rowToEdit === null ?
            setEquipmentsRows([...equipmentsRows, newRow]) : setEquipmentsRows(equipmentsRows.map((currTow, idx) => {
                if (idx !== rowToEdit) {
                    return currTow;
                }
                return newRow;
            })
            );
    }

    function handleDeleteRow(targetIndex) {
        setEquipmentsRows(equipmentsRows.filter((_, idx) => idx !== targetIndex));
    }

    function handleEditRow(idx) {
        setRowToEdit(idx);
        setModalOpen(true);
    }


    return (
        <div id='container'>
            <div id='header-container'>
            <button id="addnew-btn" onClick={() => setModalOpen(true)}> + Thêm mới</button>
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