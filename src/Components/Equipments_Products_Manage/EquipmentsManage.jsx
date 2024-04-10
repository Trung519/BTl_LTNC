export default function EquipmentsManage({ rows, deleteRow, editRow }) {
    return (
        <div>
            <h1>Equipments</h1>
            <table>
                <thead>
                    <th>No.</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>ID</th>
                    <th>In Room</th>
                    <th>Description</th>
                    <th>Status</th>
                </thead>
                <tbody>
                    {
                        rows.map((row, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{row.name}</td>
                                    <td>{row.type}</td>
                                    <td>{row.id}</td>
                                    <td>{row.room}</td>
                                    <td>{row.description}</td>
                                    <td><span>{row.status}</span></td>
                                    <td>
                                        <span>
                                            <button type="submit" onClick={()=> deleteRow(index)}>Delete</button>
                                            <button type="submit" onClick={() => editRow(index)} >Edit</button>
                                        </span>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}