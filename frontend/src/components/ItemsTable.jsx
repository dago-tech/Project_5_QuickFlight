import React from "react";
import ItemsTableRow from "./ItemsTableRow";

const ItemsTable = ({ data, deleteData, mode }) => {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Origin</th>
                        <th>Destination</th>
                        <th>Departure time</th>
                        <th>Arrival time</th>
                        <th>Airline</th>
                        <th>
                            Available
                            <br />
                            seats
                        </th>
                        <th>Price (COP)</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((el) => (
                            <ItemsTableRow
                                key={el.id}
                                el={el}
                                mode={mode}
                                deleteData={deleteData}
                            />
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7">No data</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ItemsTable;
