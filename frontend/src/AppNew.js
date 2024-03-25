// App.js
import React from "react";
import GameComponent from "./Main/GameComponent"; // This now controls only the ball
import Home from "./Main/Home";
import './AppNew.css'; // Make sure you have an App.css for global styles

const AppNew = () => {
    return (
        <div className="appContainer">
            <GameComponent />
            <Home id="home1" /> {/* First instance */}
            <Home id="home2" /> {/* Second instance, simulating multiple sections */}
            {/* Add more sections as needed */}
        </div>
    );
};

export default AppNew;
