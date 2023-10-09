import React from "react";

function ErrorPopUp({error, ClosePopup}) {
    return <div className="popup-overlay">
        <div className="popup">
            <div>{error}</div>
            <button onClick={ClosePopup}>Close</button>
        </div>
    </div>
}

export default ErrorPopUp;