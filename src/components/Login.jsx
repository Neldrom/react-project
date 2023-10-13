import React, { useState } from "react";
import axios from "axios";
import ErrorPopUp from "./ErrorPopUp";
const apiUrl = process.env.REACT_APP_API_URL;

function Login({ ClosePopup }) {
    const [error, setError] = useState('');
    const [showPopup, setShowPopup] = useState(false);

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const serializedFormData = {
            username: formData.email,
            password: formData.password,
        };
        console.log(serializedFormData);
        try {
            const response = await axios.post(`${apiUrl}/api/v1/auth/login`, serializedFormData, {
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
            <section>
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
            </section>
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