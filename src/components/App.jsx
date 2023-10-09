import React, { useEffect, useState } from "react";
import GameList from "./GameList";
import About from "./About";
import Register from "./Register";
import Login from "./Login";
import axios from "axios";
import ErrorPopUp from "./ErrorPopUp"
import "./styles.css";
const apiUrl = vars.REACT_APP_API_URL;

function App() {
  const [page, changePage] = useState('gameList');
  const [showPopup, setShowPopup] = useState(false);
  const [signingType, setSigningType] = useState('');
  const [popupMessage, setPopupMessage] = useState('');
  const [loggedIn, setLoggedInStatus] = useState(false);

  useEffect(() => {
    axios.get(`${apiUrl}/api/v1/auth/loginStatus`)
      .then((response) => {
        setLoggedInStatus(response.data.status);
      })
  })

  const handleClick = (e) => {
    changePage(e.target.value);
  }

  const handleLoginClick = (e) => {
    setSigningType(e.target.value);
    setShowPopup(true);
  }

  function ClosePopup() {
    setShowPopup(false);
  }

  const handleLogoutClick = (e) => {
    axios.post(`${apiUrl}/api/v1/auth/logout`)
      .then((response) => {
        window.location.reload();
        setPopupMessage(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return <div><h1>JackBox Party Game Picker</h1>
    <div className="container main">
      <div className='header'>
        <div id="nav">
          <nav>
            <button onClick={handleClick} value="gameList">Random</button>
            <button onClick={handleClick} value="about">About</button>
            {loggedIn===false &&
              <button onClick={handleLoginClick} value="signIn">Sign In</button>
            }
            {loggedIn===false &&
              <button onClick={handleLoginClick} value="register">Register</button>
            }
            {loggedIn &&
              <button onClick={handleLogoutClick} value="message">Logout</button>
            }
          </nav>
        </div>
      </div>

      {showPopup && signingType === "register" &&
        <Register ClosePopup={ClosePopup} />
      }
      {page === 'about' &&
        <About />
      }
      {page === 'gameList' &&
        <GameList />
      }
      {showPopup && signingType === "signIn" &&
        <Login ClosePopup={ClosePopup} />
      }
      {showPopup && signingType === "profile" &&
        <div className="popup-overlay">
          <div className="popup">
            <div>email: {popupMessage.username}</div>
            <div>name: {popupMessage.name}</div>
            <button onClick={ClosePopup}>Close</button>
          </div>
        </div>
      }
      {showPopup && signingType === "message" &&
        <ErrorPopUp
          error={popupMessage}
          ClosePopup={ClosePopup}
        />
      }
    </div>
  </div>
}

export default App;