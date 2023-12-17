import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { postData } from "../helpers/axios";
import BackButton from "../components/BackButton";
import ReservationMessage from "./ReservationMessage";
import "../styles/styles.css";

export function UserRegistration() {
    const user_create_endpoint = "flights/user_create/";
    const reservation_create_endpoint = "flights/reservation_create/";
    const { flightId } = useParams();

    const initialFormData = {
        user_name: "",
        user_id: "",
        email: "",
    };

    const [formData, setFormData] = useState(initialFormData);
    const [errorForm, setErrorForm] = useState(null);
    const [message, setMessage] = useState(null);

    const validateEmail = (value) => {
        // Regex for email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (
            formData.user_name == "" ||
            formData.user_id == "" ||
            formData.email == ""
        ) {
            setErrorForm("¡You did not fill out all the fields!");
            return;
        }
        if (!validateEmail(formData.email)) {
            setErrorForm("Invalid email format");
            return;
        }
        // Clean ErrorForm if no validation issues
        setErrorForm("");

        postData(user_create_endpoint, formData)
            .then((response) => {
                const user_id = response.id;

                return postData(reservation_create_endpoint, {
                    user: user_id,
                    flight: flightId,
                });
            })
            .then((response) => {
                console.log(response);
                setMessage("Reservation created successfully");
            })
            .catch(() => {
                setMessage("Error in reservation process");
            });
    };

    const handleReset = (e) => {
        setFormData(initialFormData);
    };

    return (
        <>
            <BackButton />
            <div className="center">
                <h1>User Registration</h1>
                <Link to="/home">Home</Link>
                <br />
                <form
                    className="form_flight_create"
                >
                    <label htmlFor="user_name">User Name:</label>
                    <input
                        type="text"
                        name="user_name"
                        placeholder="User name"
                        onChange={handleChange}
                        value={formData.user_name}
                        required
                    />
                    <br />
                    <label htmlFor="user_id">User ID:</label>
                    <input
                        type="text"
                        name="user_id"
                        placeholder="User identification"
                        onChange={handleChange}
                        value={formData.user_id}
                        required
                    />
                    <br />
                    <label htmlFor="email">Email: </label>
                    <input
                        type="email"
                        name="email"
                        placeholder="User email"
                        onChange={handleChange}
                        value={formData.email}
                        required
                    />
                    <br />
                    <input type="button" value="Reserve a Flight" onClick={handleSubmit} />
                    <input type="reset" value="Clear" onClick={handleReset} />
                </form>
                {errorForm && <p style={{ color: "red" }}>{errorForm}</p>}
                {message && (
                    <div className="center">
                        <ReservationMessage message={message} />
                    </div>
                )}
            </div>
        </>
    );
}
