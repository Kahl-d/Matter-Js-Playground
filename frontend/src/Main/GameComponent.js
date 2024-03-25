import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';
import './Game.css';

const GameComponent = () => {
    const worldRef = useRef(null);

    useEffect(() => {
        if (!worldRef.current) return;

        // Engine setup
        const engine = Matter.Engine.create();
        engine.world.gravity.y = 1; // Default gravity

        const render = Matter.Render.create({
            element: worldRef.current,
            engine: engine,
            options: {
                width: document.documentElement.clientWidth,
                height: document.documentElement.clientHeight - 10,
                wireframes: false,
                background: 'transparent',
            },
        });

        // Ball setup
        const ball = Matter.Bodies.circle(50, 100, 20, {
            restitution: 0.5, // Makes the ball bouncy
            friction: 0.05,
            density: 0.01,
        });

        // Ground setup
        const ground = Matter.Bodies.rectangle(
            render.options.width / 2,
            render.options.height,
            render.options.width,
            20,
            { isStatic: true }
        );

        // Walls to keep the ball in
        const leftWall = Matter.Bodies.rectangle(0, render.options.height / 2, 20, render.options.height, { isStatic: true });
        const rightWall = Matter.Bodies.rectangle(render.options.width, render.options.height / 2, 20, render.options.height, { isStatic: true });

        Matter.World.add(engine.world, [ball, ground, leftWall, rightWall]);

        Matter.Engine.run(engine);
        Matter.Render.run(render);

        const controlBall = (event) => {
            const forceMagnitude = 0.05;
            const jumpForce = -0.5;
            event.preventDefault();
            switch (event.keyCode) {
                case 39: // Right
                    Matter.Body.applyForce(ball, ball.position, { x: forceMagnitude, y: 0 });
                    break;
                case 37: // Left
                    Matter.Body.applyForce(ball, ball.position, { x: -forceMagnitude, y: 0 });
                    break;
                case 38: // Up, used for testing, can be removed
                    Matter.Body.applyForce(ball, ball.position, { x: 0, y: jumpForce });
                    break;
                case 40: // Down, can be used to increase gravity momentarily
                    engine.world.gravity.y = 2;
                    setTimeout(() => engine.world.gravity.y = 1, 100);
                    break;
                case 32: // Space - Jump
                    if (Math.abs(ball.velocity.y) < 0.05) { // Prevents double jump
                        Matter.Body.applyForce(ball, ball.position, { x: 0, y: jumpForce });
                    }
                    break;
            }
        };

        document.addEventListener('keydown', controlBall);

        return () => {
            document.removeEventListener('keydown', controlBall);
            Matter.Engine.clear(engine);
            Matter.Render.stop(render);
            render.canvas.remove();
        };
    }, []);

    return <div ref={worldRef} className="game-world"></div>;
};

export default GameComponent;
