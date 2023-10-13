import React, { useState } from "react";
import axios from "axios";
import ErrorPopUp from "./ErrorPopUp";
const apiUrl = process.env.REACT_APP_API_URL;

function Register({ ClosePopup }) {
    const [error, setError] = useState('');
    const [showPopup, setShowPopup] = useState(false);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: ''
    });

    const handleSubmit = async (e) => {
        const serializedFormData = {
            username: formData.email,
            password: formData.password,
            name: formData.name
        };
        try {
            const response = await axios.post(`${apiUrl}/api/v1/auth/register`, serializedFormData, {
                withCredentials: true,
            });
            setError(response.data.message);
            setShowPopup(true);
        } catch (error) {
            console.log(error.response.data.message);
            setShowPopup(true);
        }
        setFormData({
            email: '',
            password: '',
            name: '',
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
                <h1>Register</h1>
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
                <input
                    type="text"
                    placeholder="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}></input>
                <button type="submit" onClick={handleSubmit}>Register</button>
            </form>
            <button onClick={ClosePopup}>Close</button>
        </div>
        {showPopup &&
            <ErrorPopUp
                ClosePopup={ClosePopup}
                error={error}
            />
        }
    </div>
}

export default Register;