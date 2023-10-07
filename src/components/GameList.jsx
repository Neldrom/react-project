import React, { useState, useEffect } from "react";
import Game from "./Game";
import axios from 'axios';
import Form from './Form';
import UserGames from "./userGames.jsx";

function GameList() {
    let checks = [];
    let index = 0;
    const [games, setGames] = useState([]);
    const [userGames, setUserGames] = useState([]);
    const [checkboxStates, setCheckboxStates] = useState([]);
    const [loggedIn, setLoggedInStatus] = useState(false);

    useEffect(() => {
        axios.get('api/v1/auth/loginStatus')
            .then((response) => {
                setLoggedInStatus(response.data.status);
            })
    })

    useEffect(() => {

        axios.get('api/v1/auth/loadGames')
            .then((response) => {
                setGames(response.data);
                for (index; index < response.data.length; index++) {
                    checks[index] = false;
                }
                setCheckboxStates(checks);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        axios.get('api/v1/auth/loadUserGames')
            .then((response) => {
                setUserGames(response.data);
                for (index; index < checks.length + response.data.length - 2; index++) {
                    checks[index] = false;
                }
                console.log(checks.length);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);


    function handleSelectAll() {
        setCheckboxStates((prevStates) => prevStates.map(() => !prevStates[0]));
    }

    const [selectedOption, setSelectedOption] = useState('option1');

    const handleRadioChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleButtonClick = () => {
        var allGames = [];
        games.forEach(game => {
            allGames.push(game)
        });
        userGames.forEach(game => {
            allGames.push(game)
        });
        console.log(games);
        if (selectedOption === 'option1') {
            const inputs = Array.from(document.querySelectorAll("input[type='checkBox']"));
            // console.log(inputs);
            let newGames = [];

            for (let i = 0; i < inputs.length; i++) {
                if (inputs[i].checked === true) {
                    newGames.push(allGames[i]);
                }
            }

            const randomIndex = Math.floor(Math.random() * newGames.length);
            const selectedGame = newGames[randomIndex];
            setRandomGame(selectedGame);
            setShowPopup(true);
        } else if (selectedOption === 'option2') {
            const numberValue = parseFloat(inputValue);
            const inputs = Array.from(document.querySelectorAll("input[type='checkBox']"));
            let newGames = [];

            for (let i = 0; i < inputs.length; i++) {
                if (inputs[i].checked === true && allGames[i].min_players <= numberValue && allGames[i].max_players >= numberValue) {
                    newGames.push(allGames[i]);
                }
            }
            const randomIndex = Math.floor(Math.random() * newGames.length);
            const selectedGame = newGames[randomIndex];
            setRandomGame(selectedGame);
            setShowPopup(true);
        }
    };

    const [randomGame, setRandomGame] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    function ClosePopup() {
        setRandomGame(null);
        setShowPopup(false);
    }

    return <div className="container">
        <div className="border align-self-center row headRow">
            <div className="col-sm-1"></div>
            <div className="col-sm-4">Title</div>
            <div className="col-sm-2">Players</div>
            <div className="col-sm-3">Game Type</div>
            <div className="col-sm-1">Pack</div>
            <div className="col-sm-1">✓</div>
        </div>

        {randomGame && showPopup && (
            <div className="popup-overlay">
                <div className="popup">
                    <h2>{randomGame.title}</h2>
                    <p>Players: {randomGame.min_players} - {randomGame.max_players}</p>
                    <p>Game type: {randomGame.game_type}</p>
                    {randomGame.pack_number != 0 &&
                        <p>Pack number: {randomGame.pack_number}</p>
                    }
                    <button onClick={ClosePopup}>Close</button>
                </div>
            </div>
        )}

        {games.map((game, index) => (
            <Game
                key={index}
                id={index}
                title={game.title}
                min_players={game.min_players}
                max_players={game.max_players}
                game_type={game.game_type}
                pack_number={game.pack_number}
                checked={checkboxStates[index]}
            />
        ))}
        {userGames.length > 0 && userGames.map((game, index) => (
            <UserGames
                key={index}
                id={index}
                title={game.title}
                min_players={game.min_players}
                max_players={game.max_players}
                game_type={game.game_type}
                checked={checkboxStates[index]}
            />
        ))}
        <Form ClosePopup={ClosePopup} />
        <div className="divGen footer row">
            <div className="listOptions col bottom_foot">
                <dl>
                    <dd><input type="radio"
                        name="option"
                        value="option1"
                        checked={selectedOption === 'option1'}
                        onChange={handleRadioChange} /> Selected </dd>
                    <dd><input type="radio"
                        name="option"
                        value="option2"
                        checked={selectedOption === 'option2'}
                        onChange={handleRadioChange} /> Number of players: <input type="text" value={inputValue} onChange={handleInputChange} maxLength="3" minLength="1" size="1" /></dd>
                </dl>
            </div>

            <button type="button" className="selectAll col bottom_foot" onClick={handleSelectAll}>
                Select All
            </button>

            <button type="submit" className="generate col bottom_foot" id="myButton" onClick={handleButtonClick}>
                Generate
            </button>

        </div>
    </div>
}

export default GameList;