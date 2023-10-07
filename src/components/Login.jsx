import React, { useState } from "react";
import axios from "axios";
import ErrorPopUp from "./ErrorPopUp";

function Login({ ClosePopup }) {
    const [error, setError] = useState('');
    const [showPopup, setShowPopup] = useState(false);

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const serializedFormData = {
            username: formData.email,
            password: formData.password,
        };

        axios.post('api/v1/auth/login', serializedFormData)
            .then((response) => {
                setError(response.data.message);
                setShowPopup(true);
                window.location.reload();
            })
            .catch((error) => {
                setError(error.response.data.message);
                setShowPopup(true);
            });
        setFormData({
            email: '',
            password: ''
        })
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return <div className="popup-overlay">
        <div className="popup">
            <form>
                <h1>Sign in</h1>
                <input
                    type="email"
                    placeholder="E-mail"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}></input>
                <input
                    type="password"
                    placeholder="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}></input>
                <button type="submit" onClick={handleSubmit}>Sign In</button>
            </form>
            <button onClick={ClosePopup}>Close</button>
        </div>
        <div>
            {showPopup &&
                <ErrorPopUp
                    ClosePopup={ClosePopup}
                    error={error}
                />
            }
        </div>

    </div>
}

export default Login;