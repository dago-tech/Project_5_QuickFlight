import { useState } from "react";
import { Link } from "react-router-dom";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import BackButton from "../components/BackButton";
import ItemsList from "../components/ItemsList";
import Button from "@mui/material/Button";
import "../styles/styles.css";

export function FlightSearch() {
    const initialFormData = {
        origin: "",
        destination: "",
        departure_date: new Date(),
        arrival_date: new Date(),
    };

    const [formData, setFormData] = useState(initialFormData);
    const [submited, setSubmited] = useState(false);
    const [errorForm, setErrorForm] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setSubmited(false);
    };
    const handleChangeDate = (field, date) => {
        setFormData({
            ...formData,
            [field]: date,
        });
        setSubmited(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.origin == "" || formData.destination == "") {
            setErrorForm("¡You did not fill out all the fields!");
            return;
        }
        // Clean ErrorForm if no validation issues
        setErrorForm("");

        setSubmited(true);
    };

    const handleReset = (e) => {
        setFormData(initialFormData);
    };

    return (
        <>
            <BackButton />
            <div className="center">
                <h1>Flight Search</h1>
                <p className="styled_text">
                    Fill this form to search for available flights or go to the
                    flight list
                </p>
                <Link to="/flight_list_to_book">
                    <Button variant="contained" size="small">
                        Flight List
                    </Button>
                </Link>
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
                            slotProps={{ textField: { variant: "outlined", size: 'small'} }}
                        />
                    </label>
                    <label>
                        Arrival date and time:
                        <DateTimePicker
                            value={formData.arrival_date}
                            size="small"
                            minDateTime={new Date()}
                            onChange={(date) =>
                                handleChangeDate("arrival_date", date)
                            }
                            slotProps={{ textField: { variant: "outlined", size: 'small' } }}
                        />
                    </label>
                    <br />
                    <input
                        type="button"
                        value="Search"
                        onClick={handleSubmit}
                    />
                    <input type="reset" value="Clear" onClick={handleReset} />
                </form>
                {errorForm && <p style={{ color: "red" }}>{errorForm}</p>}
            </div>

            {submited && (
                <div className="center">
                    <h1>Flight List</h1>
                    <ItemsList
                        endpoint="flights/search_flight/"
                        mode="book"
                        dataToSend={formData}
                    />
                </div>
            )}
        </>
    );
}
