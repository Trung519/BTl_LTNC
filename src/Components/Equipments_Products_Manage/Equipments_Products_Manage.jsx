import TabButton from './TabButton';
import ProductsManage from './ProductsManage';
import EquipmentsManage from './EquipmentsManage';
import Modal from './Modal';

import { useState } from 'react';

export default function Equipments_Products_Manage() {
    const [selectedTab, setSelectedTab] = useState();
    const [modalOpen, setModalOpen] = useState(false);

    const [equipmentsRows, setEquipmentsRows] = useState([
        {
            name: 'X-Ray Machine 1',
            type: 'X-Ray',
            id: 'XR01',
            room: 'Room 101',
            description: 'X-Ray machine',
            status: 'Active'
        },
        {
            name: 'X-Ray Machine 2',
            type: 'X-Ray',
            id: 'XR02',
            room: 'Room 102',
            description: 'X-Ray machine',
            status: 'Inactive'
        },
        {
            name: 'X-Ray Machine 3',
            type: 'X-Ray',
            id: 'XR03',
            room: 'Room 103',
            description: 'X-Ray machine',
            status: 'Active'
        },
        
    ]);

    const [productsRows, setProductsRows] =useState( [
        {
            name: 'Paracetamol',
            cprice: 100,
            sprice: 200,
            stock: 100,
            lowstock: 'No',
            tags: ['Medicine']
        },
        {
            name: 'Amoxicillin',
            cprice: 200,
            sprice: 300,
            stock: 50,
            lowstock: 'Yes',
            tags: ['Medicine']
        },
        {
            name: 'Ciprofloxacin',
            cprice: 300,
            sprice: 400,
            stock: 25,
            lowstock: 'Yes',
            tags: ['Medicine']
        }
    ]);

    const [rowToEdit, setRowToEdit] = useState(null);

    function handleSubmit(newRow) {
        if (selectedTab === 'equipments'){
        rowToEdit === null ?
        setEquipmentsRows([...equipmentsRows, newRow]): setEquipmentsRows(equipmentsRows.map((currTow, idx)=> {
            if (idx !== rowToEdit){
                return currTow;
            }
            return newRow;
        })
        );
    }
    else {
        rowToEdit === null ?
        setProductsRows([...productsRows, newRow]): setProductsRows(productsRows.map((currTow, idx)=> {
            if (idx !== rowToEdit){
                return currTow;
            }
            return newRow;
        })
        );
    }
    };

    function handleDeleteRow(targetIndex){
        if (selectedTab === 'equipments'){
            setEquipmentsRows(equipmentsRows.filter((_, idx) => idx !== targetIndex));
        }
        else {
            setProductsRows(productsRows.filter((_, idx) => idx !== targetIndex));
        }
    }

    function handleEditRow(idx) {
        
            setRowToEdit(idx);

            setModalOpen(true);
        
    }

    function handleTabSelect(selectedButton) {
        setSelectedTab(selectedButton);
    }

    let tabContent = <p> Please select a page</p>;

    if (selectedTab) {
        tabContent = (
            <>
                
                <div>
                    {selectedTab === 'equipments' && <EquipmentsManage rows={equipmentsRows} deleteRow={handleDeleteRow}
                    editRow={handleEditRow}
                    />}

                    {selectedTab === 'products' && <ProductsManage rows={productsRows} deleteRow={handleDeleteRow} 
                    editRow={handleEditRow}
                    />}
                </div>
                <button onClick={() => setModalOpen(true)}> Add New</button>
            </>

        )
    }

    return (
        <div>
            <menu>
                <TabButton isSelected={selectedTab === 'equipments'} onSelect={() => handleTabSelect('equipments')} >Equipments</TabButton>
                <TabButton isSelected={selectedTab === 'products'} onSelect={() => handleTabSelect('products')}>Products and Services</TabButton>
            </menu>
            {tabContent}
            {modalOpen && <Modal closeModal={() => {
                setModalOpen(false);
            }} selectedTab={selectedTab}  onSubmit={handleSubmit}/>}
        </div>
    );
}