import './Modal.css';

import { useState } from 'react';

export default function Modal({ closeModal, onSubmit, selectedTab, defaultValue }) {
    const [equimentState, setequimentState] = useState(
        defaultValue || {
            name: '',
            type: '',
            id: '',
            room: '',
            description: '',
            status: 'active',
        }
    );

    const [productState, setProductState] = useState({
        name: '',
        cprice: '',
        sprice: '',
        stock: '',
        lowstock: 'No',
    })

    if (selectedTab === 'equipments') {

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
                            <label htmlFor="name">Name</label>
                            <input type="text" name="name" onChange={handleChange} value={equimentState.name} />
                        </div>

                        <div>
                            <label htmlFor="type">Type</label>
                            <input type="text" name="type"
                                onChange={handleChange} value={equimentState.type}
                            />
                        </div>

                        <div>
                            <label htmlFor="id">ID</label>
                            <input type="text" name="id"
                                onChange={handleChange} value={equimentState.id}
                            />
                        </div>

                        <div>
                            <label htmlFor="room">Room</label>
                            <input type="text" name="room"
                                onChange={handleChange} value={equimentState.room}
                            />
                        </div>

                        <div>
                            <label htmlFor="description">Description</label>
                            <input type="text" name="description"
                                onChange={handleChange} value={equimentState.description}
                            />
                        </div>

                        <div>
                            <label htmlFor="status">Status</label>
                            <select name="status"
                                onChange={handleChange} value={equimentState.status}
                            >
                                <option value='active'>Active</option>
                                <option value='inactive'>Inactive</option>
                                <option value='suspended'>Suspended</option>
                            </select>
                        </div>
                        <button type='submit' onClick={handleSubmit}>Submit</button>
                    </form>
                </div>
            </div>
        );
    }
    else {
        function handleChange(e) {
            setProductState({
                ...productState,
                [e.target.name]: e.target.value
            });
        };

        const handleSubmit = (e) => {
            e.preventDefault();

            onSubmit(productState);

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
                            <label htmlFor="name">Name</label>
                            <input type="text" name="name"
                            onChange={handleChange} value={productState.name}
                            />
                        </div>

                        <div>
                            <label htmlFor="cprice">Cost Price</label>
                            <input type="number" name="cprice" 
                            onChange={handleChange} value={productState.cprice}
                            />
                        </div>

                        <div>
                            <label htmlFor="sprice">Sell Price</label>
                            <input type="number" name="sprice" 
                            onChange={handleChange} value={productState.sprice}
                            />
                        </div>

                        <div>
                            <label htmlFor="stock">Stock</label>
                            <input type="number" name="stock" 
                            onChange={handleChange} value={productState.stock}
                            />
                        </div>

                        <div>
                            <label htmlFor="lowstock">Low Stock</label>
                            <select name="lowstock" 
                            onChange={handleChange} value={productState.lowstock}
                            >
                                <option value='Yes'>Yes</option>
                                <option value='No'>No</option>
                            </select>
                        </div>
                        <button type='submit' onClick={handleSubmit} >Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}