import './Modal.css';

import { useState } from 'react';

export default function Modal({ closeModal, onSubmit, defaultValue }) {
    const [equimentState, setequimentState] = useState(
        defaultValue || {
            name: '',
            type: '',
            id: '',
            room: '',
            description: '',
            status: 'Active',
        }
    );

        function handleChange(e) {
            setequimentState({
                ...equimentState,
                [e.target.name]: e.target.value
            });
        };

        function handleSubmit(e) {
            e.preventDefault();

            onSubmit(equimentState);

            closeModal();
        }

        return (
            <div className='modal-container' onClick={(e) => {
                if (e.target.className === 'modal-container') {
                    closeModal();
                }
            }}>
                <div className="modal">
                    <form>
                        <div>
                            <label htmlFor="name">Tên</label>
                            <input type="text" name="name" onChange={handleChange} value={equimentState.name}/>
                        </div>

                        <div>
                            <label htmlFor="type">Loại</label>
                            <input type="text" name="type"
                                onChange={handleChange} value={equimentState.type}
                            
                            />
                        </div>

                        {/* <div>
                            <label htmlFor="id">ID</label>
                            <input type="text" name="id"
                                onChange={handleChange} value={equimentState.id}
                            />
                        </div> */}

                        <div>
                            <label htmlFor="room">Phòng</label>
                            <input type="text" name="room"
                                onChange={handleChange} value={equimentState.room}
                            />
                        </div>

                        <div>
                            <label htmlFor="description">Mô tả</label>
                            <input type="text" name="description"
                                onChange={handleChange} value={equimentState.description}
                            />
                        </div>

                        <div>
                            <label htmlFor="status">Trạng thái</label>
                            <select name="status"
                                onChange={handleChange} value={equimentState.status}
                            >
                                <option value='Hoạt động'>Hoạt động</option>
                                <option value='Không hoạt động'>Không hoạt động</option>
                                <option value='Sửa chữa'>Sửa chữa</option>
                            </select>
                        </div>
                        <button id='submit-btn' type='submit' onClick={handleSubmit}>Lưu</button>
                    </form>
                </div>
            </div>
        );
}