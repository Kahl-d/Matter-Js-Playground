// AppNew.js
import React from "react";
import { GameProvider } from "./Main/GameContext";
import GameComponent from "./Main/GameComponent";
import Home1 from "./Main/Home"; 
import Home2 from "./Main/Home2"; 
import './AppNew.css'; 

const AppNew = () => {
    const initializeObstacles = (engine) => {
        // Define and add obstacles here using Matter.js functions
        // e.g., Matter.World.add(engine.world, [obstacle]);
    };

    return (
        <GameProvider initializeObstacles={initializeObstacles}>
            <div className="appContainer">
                <GameComponent />
                <div className="homeContainer">
                    <Home1 />
                    <Home2 />
                    {/* Additional home components as needed */}
                </div>
            </div>
        </GameProvider>
    );
};

export default AppNew;
