export default function ProductsManage({rows, deleteRow, editRow}) {
    return (
        <div>
            <h1>Products and Services</h1>
            <table>
                <thead>
                    <th>No.</th>
                    <th>Name</th>
                    <th>Cost Price</th>
                    <th>Sell Price</th>
                    <th>Stock</th>
                    <th>Low Stock</th>
                    <th>Tags</th>
                </thead>
                <tbody>
                    {
                        rows.map((row, index) => {
                            return(
                                <tr key = {index}>
                                    <td>{index + 1}</td>
                                    <td>{row.name}</td>
                                    <td>{row.cprice}</td>
                                    <td>{row.sprice}</td>
                                    <td>{row.stock}</td>
                                    <td>{row.lowstock}</td>
                                    {/* <td>{row.tags.join(', ')}</td> */}
                                    <td>Medicine</td>
                                    <td><span>
                                        <button type="submit" onClick={() => deleteRow(index)} >Delete</button>
                                        <button type="submit" onClick={() => editRow(index)} >Edit</button>
                                        </span></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}