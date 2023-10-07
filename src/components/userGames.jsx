import React, { useState, useEffect } from "react"
import axios from 'axios';
import ErrorPopUp from "./ErrorPopUp";

function UserGames({ title, min_players, max_players, game_type, id, checked }){
    const [isChecked, setIsChecked] = useState(checked);
    const [error, setError] = useState('');
    const [showPopup,setShowPopup] = useState(false);

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    };
    useEffect(() => {
        setIsChecked(checked);
    }, [checked]);

    function deleteGame(title) {
        axios.delete(`api/v1/auth/deleteGame/${title}`)
            .then((response) => {
                setError(response.data.message);
                setShowPopup(true);
            })
            .catch((error) => {
                setError(error.response.data.message);
                setShowPopup(true);
            });
            window.location.reload();
    }
    function closePopup(){
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