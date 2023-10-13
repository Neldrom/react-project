import React, { useState, useEffect } from "react"
import axios from 'axios';
import ErrorPopUp from "./ErrorPopUp";
const apiUrl = process.env.REACT_APP_API_URL;

function UserGames({ title, min_players, max_players, game_type, id, checked }) {
    const [isChecked, setIsChecked] = useState(checked);
    const [error, setError] = useState('');
    const [showPopup, setShowPopup] = useState(false);

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    };
    useEffect(() => {
        setIsChecked(checked);
    }, [checked]);

    function deleteGame(title) {
        fetch(`${apiUrl}/api/v1/auth/deleteGame/${title}`, {
            method: 'DELETE',
            credentials: 'include'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Netowrk response was not ok')
                }
                return response.json();
            })
            .then((data) => {
            setError(data.message);
            setShowPopup(true);
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        });
    }
    function closePopup() {
        setShowPopup(false);
    }

    return (
        <div className="row border gameRow">
            <div className="align-self-center col-sm-1">
                <button onClick={() => deleteGame(title)}>X</button>
            </div>
            <div className="align-self-center col-sm-4">{title}</div>
            <div className="align-self-center col-sm-2">{min_players} - {max_players}</div>
            <div className="align-self-center col-sm-3">{game_type}</div>
            <div className="align-self-center col-sm-1">-</div>
            <div className="d-flex align-items-center col-sm-1">
                <input type="checkBox" id={id} onChange={handleCheckboxChange} checked={isChecked} />
            </div>
            <div>
                {showPopup &&
                    <ErrorPopUp
                        error={error}
                        ClosePopup={closePopup}
                    />
                }
            </div>
        </div>

    )
}

export default UserGames;