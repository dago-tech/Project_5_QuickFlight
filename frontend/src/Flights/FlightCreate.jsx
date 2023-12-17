import { useState } from "react";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { postData } from "../helpers/axios";
import BackButton from "../components/BackButton";
import "../styles/styles.css";

export function FlightCreate() {
    const endpoint = "flights/create_flight/";
    const initialFormData = {
        origin: "",
        destination: "",
        departure_date: new Date(),
        arrival_date: new Date(),
        airline: "",
        available_seats: "",
        price: "",
    };

    const [formData, setFormData] = useState(initialFormData);
    const [errorForm, setErrorForm] = useState(null);
    const [message, setMessage] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleChangeDate = (field, date) => {
        setFormData({
            ...formData,
            [field]: date,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (
            formData.origin == "" ||
            formData.destination == "" ||
            formData.airline == "" ||
            formData.available_seats == "" ||
            formData.price == ""
        ) {
            setErrorForm("¡You did not fill out all the fields!");
            return;
        }
        // Clean ErrorForm if no validation issues
        setErrorForm("");

        postData(endpoint, formData)
            .then(() => {
                setMessage("Flight created successfully");
            })
            .catch((error) => {
                setMessage(error.response.data[0]);
            });
    };

    const handleReset = (e) => {
        setFormData(initialFormData);
    };

    return (
        <>
            <BackButton />
            <div className="center">
                <h1>Flight Registration</h1>
                <br />
                <form className="form_flight_create">
                    <label htmlFor="origin">Origin:</label>
                    <input
                        type="text"
                        name="origin"
                        placeholder="BOG - Bogota - Colombia"
                        onChange={handleChange}
                        value={formData.origin}
                    />
                    <p className="help_label">
                        IATA Code - City - Country
                    </p>
                    <label htmlFor="destination">Destination: </label>
                    <input
                        type="text"
                        name="destination"
                        placeholder="JFK - New York - USA"
                        onChange={handleChange}
                        value={formData.destination}
                    />
                    <p className="help_label">
                        IATA Code - City - Country
                    </p>
                    <label>
                        Departure date and time:
                        <DateTimePicker
                            name="destination"
                            value={formData.departure_date}
                            minDateTime={new Date()}
                            onChange={(date) =>
                                handleChangeDate("departure_date", date)
                            }
                            slotProps={{ textField: { variant: "outlined", size: 'small' } }}
                        />
                    </label>
                    <label>
                        Arrival date and time:
                        <DateTimePicker
                            value={formData.arrival_date}
                            minDateTime={new Date()}
                            onChange={(date) =>
                                handleChangeDate("arrival_date", date)
                            }
                            slotProps={{ textField: { variant: "outlined", size: 'small' } }}
                        />
                    </label>
                    <label htmlFor="airline">Airline: </label>
                    <input
                        type="text"
                        name="airline"
                        placeholder="Airline"
                        onChange={handleChange}
                        value={formData.airline}
                    />
                    <label htmlFor="available_seats">Available Seats: </label>
                    <input
                        type="text"
                        name="available_seats"
                        placeholder="Available seats number"
                        onChange={handleChange}
                        value={formData.available_seats || ""}
                    />
                    <label htmlFor="price">Ticket Price: </label>
                    <input
                        type="text"
                        name="price"
                        placeholder="Price"
                        onChange={handleChange}
                        value={formData.price || ""}
                    />
                    <br />
                    <input type="button" value="Create Flight" onClick={handleSubmit} />
                    <input type="reset" value="Clear" onClick={handleReset} />
                </form>
                {message && <p style={{ fontWeight: "bold" }}>{message}</p>}
                {errorForm && <p style={{ color: "red" }}>{errorForm}</p>}
            </div>
        </>
    );
}
