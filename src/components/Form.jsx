import React, { useState } from "react";
import axios from 'axios';
import ErrorPopUp from "./ErrorPopUp";
const apiUrl = process.env.REACT_APP_API_URL;

function Form() {
    const [error, setError] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        minPlayers: '',
        maxPlayers: '',
        gameType: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const serializedFormData = {
            title: formData.title,
            minPlayers: formData.minPlayers,
            maxPlayers: formData.maxPlayers,
            gameType: formData.gameType,
        };
        try {
            const response = await axios.post(`${apiUrl}/api/v1/auth/addGame`, serializedFormData, {
              withCredentials: true, 
            });
      
            setError(response.data.message);
            setShowPopup(true);
            setTimeout(() => {
                window.location.reload();
            }, 2000);
          } catch (error) {
            console.log(error.response.data.message);
            setShowPopup(true);
          }
    };

    function ClosePopup() {
        setShowPopup(false);
    }

    const handleChange = (e) => {

        const { name, value } = e.target;
        if (name === 'minPlayers' || name === 'maxPlayers') {
            if (!/^\d*$/.test(value)) {
                alert("Please Insert Number");
                return;
            }
        }
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <form className="border align-self-center row" onSubmit={handleSubmit}>
            <div className="col-sm-1"></div>
            <div className="col-sm-4">
                <input
                    type="text"
                    name="title"
                    className="titleBox"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="col-sm-1">
                <input
                    type="text"
                    name="minPlayers"
                    className="playersBox"
                    placeholder="Min"
                    value={formData.minPlayers}
                    onChange={handleChange}
                    maxLength="3"
                />
            </div>
            <div className="col-sm-1">
                <input
                    type="text"
                    name="maxPlayers"
                    className="playersBox"
                    placeholder="Max"
                    value={formData.maxPlayers}
                    onChange={handleChange}
                    maxLength="3"
                />
            </div>
            <div className="col-sm-3">
                <input
                    type="text"
                    name="gameType"
                    className="gameBox"
                    placeholder="Game Type"
                    value={formData.gameType}
                    onChange={handleChange}
                />
            </div>
            <div className="col-sm-1"></div>
            <div className="col-sm-1">
                <button type="submit"> + </button>
            </div>
            {showPopup &&
                <ErrorPopUp
                    ClosePopup={ClosePopup}
                    error={error}
                />
            }
        </form>
    );
}

export default Form;