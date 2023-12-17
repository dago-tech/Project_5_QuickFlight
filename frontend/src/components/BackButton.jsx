import React from "react";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
    const history = useNavigate();

    const handleClick = () => {
        history(-1);
    };

    return (
        <IconButton onClick={handleClick} color="primary" aria-label="back">
            <ArrowBackIcon />
        </IconButton>
    );
};

export default BackButton;
