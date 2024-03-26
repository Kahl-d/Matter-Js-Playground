// GameComponent.js
import React, { useEffect, useRef } from 'react';
import { useGameContext } from './GameContext';
import Matter from 'matter-js';

const GameComponent = () => {
    const gameRef = useRef(null);
    const { engine } = useGameContext();

    useEffect(() => {
        // Clear the render area on reinitialization
        gameRef.current.innerHTML = "";

        // Correctly import and use Engine, Runner, Render, Bodies, Body, Events, and Composite from Matter
        const { Runner, Render, Bodies, Body, Events, Composite } = Matter;

        // Setup renderer
        const render = Render.create({
            element: gameRef.current,
            engine: engine,
            options: {
                width: document.documentElement.clientWidth,
                height: document.documentElement.clientHeight,
                wireframes: false,
                background: 'transparent',
            },
        });

        // Add ball
        const ball = Bodies.circle(100, render.options.height / 2, 20, {
            restitution: 0.5,
            friction: 0.05,
            label: 'ball',
        });

        // Add obstacles
        const floor = Bodies.rectangle(render.options.width / 2, render.options.height, render.options.width, 20, { isStatic: true });
        const obstacle1 = Bodies.rectangle(render.options.width * 1.5, render.options.height - 100, 200, 20, { isStatic: true });

        Composite.add(engine.world, [ball, floor, obstacle1]);

        // Keydown event for applying forces to the ball
        const handleKeydown = (event) => {
            const force = 0.05;
            switch (event.keyCode) {
                case 37: // Left arrow
                    Body.setVelocity(ball, { x: ball.velocity.x - force, y: ball.velocity.y });
                    break;
                case 39: // Right arrow
                    Body.setVelocity(ball, { x: ball.velocity.x + force, y: ball.velocity.y });
                    break;
                case 38: // Up arrow
                    if (ball.position.y >= render.options.height - 40) { // Simple jump check
                        Body.setVelocity(ball, { x: ball.velocity.x, y: ball.velocity.y - force * 5 });
                    }
                    break;
                default:
                    // It's a good practice to have a default case, even if it does nothing
                    break;
            }
        };

        document.addEventListener('keydown', handleKeydown);

        // Scroll the screen based on the ball's position
        Events.on(engine, 'afterUpdate', () => {
            if (ball.position.x > window.innerWidth / 2) {
                window.scrollTo({
                    left: ball.position.x - window.innerWidth / 2,
                    behavior: 'smooth',
                });
            }
        });

        // Use Runner instead of Engine.run based on the Matter.js deprecation warning
        const runner = Runner.create();
        Runner.run(runner, engine);
        Render.run(render);

        return () => {
            document.removeEventListener('keydown', handleKeydown);
            Render.stop(render);
            Composite.clear(engine.world);
            Runner.stop(runner);
            render.canvas.remove();
        };
    }, [engine]); // Ensure re-initialization only if the engine changes

    return <div ref={gameRef} className="game-overlay"></div>;
};

export default GameComponent;
