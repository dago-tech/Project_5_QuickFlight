import React from "react";
import { format, parseISO } from "date-fns";
import { Link } from "react-router-dom";

const ItemsTableRow = ({ el, deleteData, mode }) => {
    const id = el["id"];
    const origin = el["origin"];
    const destination = el["destination"];
    const departureDate = el["departure_date"];
    const arrivalDate = el["arrival_date"];
    const airline = el["airline"];
    const availableSeats = el["available_seats"];
    const price = el["price"];

    const departureDateFormatted = format(
        parseISO(departureDate),
        "yyyy-MM-dd HH:mm"
    );
    const arrivalDateFormatted = format(
        parseISO(arrivalDate),
        "yyyy-MM-dd HH:mm"
    );

    const currentDate = new Date();

    const condition1 = mode == "delete";
    const condition2 =
        mode == "book" &&
        availableSeats > 0 &&
        currentDate < new Date(departureDate);
    const condition3 =
        mode == "book" &&
        (availableSeats <= 0 || currentDate > new Date(departureDate));

    return (
        <tr>
            <td>{origin}</td>
            <td>{destination}</td>
            <td>{departureDateFormatted}</td>
            <td>{arrivalDateFormatted}</td>
            <td>{airline}</td>
            <td>{availableSeats}</td>
            <td>{price}</td>

            {condition1 && (
                <>
                    <td>
                        <button onClick={() => deleteData(id)}>Delete</button>
                    </td>
                </>
            )}
            {condition2 && (
                <>
                    <td>
                        <Link to={`/user/${id}`}>
                            <button>Book</button>
                        </Link>
                    </td>
                </>
            )}
            {condition3 && (
                <>
                    <td>
                        <button disabled={true}>Book</button>
                    </td>
                </>
            )}
        </tr>
    );
};

export default ItemsTableRow;
