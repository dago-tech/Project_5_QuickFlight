import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { getData } from "../helpers/axios";
import { format, parseISO } from "date-fns";
import BackButton from "../components/BackButton";
import "../styles/styles.css";

const ReservationList = () => {
    const endpoint = "flights/reservation_list/";
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        getData(endpoint)
            .then((response) => {
                setData(response);
                setError(null);
            })
            .catch((error) => {
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <div>
            <BackButton />
            <div className="center">
                <h1>Reservation List</h1>
                {loading && <Loader />}
                {error && <p className="error">{`Error: ${error.message}`}</p>}
                {data && (
                    <table>
                        <thead>
                            <tr>
                                <th>Origin</th>
                                <th>Destination</th>
                                <th>Departure time</th>
                                <th>Arrival time</th>
                                <th>Airline</th>
                                <th>Price (COP)</th>
                                <th>User ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length > 0 ? (
                                data.map((el) => (
                                    <tr key={el.id}>
                                        <td>{el.flight.origin}</td>
                                        <td>{el.flight.destination}</td>
                                        <td>
                                            {format(
                                                parseISO(
                                                    el.flight.departure_date
                                                ),
                                                "yyyy-MM-dd HH:mm"
                                            )}
                                        </td>
                                        <td>
                                            {format(
                                                parseISO(
                                                    el.flight.arrival_date
                                                ),
                                                "yyyy-MM-dd HH:mm"
                                            )}
                                        </td>
                                        <td>{el.flight.airline}</td>
                                        <td>{el.flight.price}</td>
                                        <td>{el.user.user_id}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7">No data</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default ReservationList;
