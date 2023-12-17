import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import "../styles/styles.css";

export function Home() {
    const button_style = {
        width: "250px",
        marginBottom: "25px",
    };
    return (
        <>
            <div style={{ textAlign: "center" }}>
                <h1 style={{ margin: "30px" }}>Quick Flight</h1>
                <p className="styled_text">
                    Explore, book, fly - your journey starts here.✈️
                </p>
                <Link to="/flight_creation">
                    <Button variant="contained" sx={button_style}>
                        Register a new flight
                    </Button>
                </Link>
                <br />
                <Link to="/flight_list">
                    <Button variant="contained" sx={button_style}>
                        Flight list
                    </Button>
                </Link>
                <br />
                <Link to="/search">
                    <Button variant="contained" sx={button_style}>
                        Search for your flight
                    </Button>
                </Link>
                <br />
                <Link to="/reservation_list">
                    <Button variant="contained" sx={button_style}>
                        Reservation List
                    </Button>
                </Link>
                <br />
                <Link to="/stats">
                    <Button variant="contained" sx={button_style}>
                        Stats
                    </Button>
                </Link>
            </div>
        </>
    );
}
