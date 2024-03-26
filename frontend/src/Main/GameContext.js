import React, { createContext, useContext, useEffect, useState } from 'react';
import Matter from 'matter-js';

const GameContext = createContext();

export const useGameContext = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
    const [engine] = useState(() => Matter.Engine.create({ gravity: { y: 0 } }));

    // A safe way to initialize obstacles, ensuring engine and world are ready
    useEffect(() => {
        const { World, Bodies } = Matter;

        // Example obstacle, adjust as needed
        const obstacles = [
            Bodies.rectangle(400, 600, 800, 20, { isStatic: true }),
            Bodies.rectangle(500, 900, 300, 20, { isStatic: true }),

            // Add more obstacles here
        ];

        World.add(engine.world, obstacles);
    }, [engine]);

    const value = { engine };

    return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
