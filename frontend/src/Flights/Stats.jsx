import { useEffect, useState } from "react";
import { getData } from "../helpers/axios";
import Loader from "../components/Loader";
import BackButton from "../components/BackButton";
import "../styles/styles.css";

export function Stats() {
    const endpoint_top_reservations = "flights/top_reservations/";
    const endpoint_count_airlines = "flights/count_airlines/";
    const [dataReservations, setDataReservations] = useState(null);
    const [dataCountAirlines, setDataCountAirlines] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        const getInfo = async (endpoint, func) => {
            try {
                const response = await getData(endpoint);
                func(response);
                setError(null);
                return response;
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        getInfo(endpoint_top_reservations, setDataReservations);
        getInfo(endpoint_count_airlines, setDataCountAirlines);
    }, []);

    return (
        <>
            <BackButton />
            <div className="center">
                <h1>Stats</h1>
                <p className="styled_text">
                    Here you have some stats of Quick Flight App
                </p>
                {loading && <Loader />}
                {error && <p className="error">{`Error: ${error.message}`}</p>}
                <div>
                    {dataReservations && (
                        <table>
                            <thead>
                                <tr>
                                    <th className="center_text">Airline</th>
                                    <th className="center_text">
                                        Number of reservations
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataReservations.length > 0 ? (
                                    dataReservations.map((el) => (
                                        <tr key={el.airline}>
                                            <td className="center_text">
                                                {el.airline}
                                            </td>
                                            <td className="center_text">
                                                {el.total_reservations}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="2">No data</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
                <div>
                    {dataReservations && (
                        <table>
                            <thead>
                                <tr>
                                    <th className="center_text">Stat</th>
                                    <th className="center_text">Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataCountAirlines ? (
                                    dataCountAirlines.map((el, index) => (
                                        <tr key={index}>
                                            <td className="center_text">
                                                Number of airlines:
                                            </td>
                                            <td className="center_text">
                                                {el.number_of_airlines}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="2">No data</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </>
    );
}
