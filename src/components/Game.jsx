import React, { useState, useEffect } from "react";


function Game({ title, min_players, max_players, game_type, pack_number, id, checked }) {
    const [isChecked, setIsChecked] = useState(checked);

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    };
    useEffect(() => {
        setIsChecked(checked);
    }, [checked]);

    return (
        <div className="row border gameRow">
            <div className="align-self-center col-sm-1"></div>
            <div className="align-self-center col-sm-4">{title}</div>
            <div className="align-self-center col-sm-2">{min_players} - {max_players}</div>
            <div className="align-self-center col-sm-3">{game_type}</div>
            <div className="align-self-center col-sm-1">{pack_number}</div>
            <div className="d-flex align-items-center col-sm-1">
                <input type="checkBox" id={id} onChange={handleCheckboxChange} checked={isChecked} />
            </div>
        </div>

    )
}

export default Game;