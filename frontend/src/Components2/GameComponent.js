import React, { useEffect } from 'react';
import Matter from 'matter-js';
import './game.css';

const GameComponent = () => {
  useEffect(() => {
    // Engine and renderer setup
    const width = window.innerWidth;
    const height = window.innerHeight;
    const engine = Matter.Engine.create();
    const render = Matter.Render.create({
      element: document.querySelector('#world-component'),
      engine: engine,
      options: {
        width: width,
        height: height,
        wireframes: false,
        background: 'transparent',
      },
    });

    // Ball creation
    const ball = Matter.Bodies.circle(400, 100, 20, {
      restitution: 0.8,
      friction: 0.1,
      density: 0.01,
    });
    Matter.World.add(engine.world, ball);

    // Divs setup with names
    const divNames = ['Section 1', 'Section 2', 'Section 3', 'Section 4', 'Section 5'];
    const divs = [];

    for (let i = 0; i < divNames.length; i++) {
      const div = document.createElement('div');
      div.id = `div${i + 1}`;
      div.className = 'section';
      div.innerHTML = divNames[i];
      document.body.appendChild(div);
      divs.push(div);

      // Obstacles setup for each section
      const obstacle = Matter.Bodies.rectangle(width / 2, (i + 1) * height, 200, 20, { isStatic: true });
      Matter.World.add(engine.world, obstacle);
    }

    // Running the engine and renderer
    Matter.Engine.run(engine);
    Matter.Render.run(render);

    // Function to scroll to the corresponding div when the ball enters a new div
    const scrollIfNeeded = (element) => {
      if (!element) return;
      const rect = element.getBoundingClientRect();
      if (
        rect.top < 0 ||
        rect.bottom > window.innerHeight
      ) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    };

    // Check which div the ball is currently in and scroll if needed
    const checkBallPosition = () => {
      const ballY = ball.position.y;
      for (let i = 0; i < divs.length; i++) {
        const rect = divs[i].getBoundingClientRect();
        if (ballY >= rect.top && ballY <= rect.bottom) {
          scrollIfNeeded(divs[i]);
          break;
        }
      }
    };

    // Keyboard control for the ball
    const controlBall = (event) => {
      event.preventDefault(); // Prevent scrolling with arrow keys
      const forceMagnitude = 0.05; // Adjust as needed for desired movement speed
      switch (event.keyCode) {
        case 39: // Right arrow
          Matter.Body.applyForce(ball, ball.position, { x: forceMagnitude, y: 0 });
          break;
        case 37: // Left arrow
          Matter.Body.applyForce(ball, ball.position, { x: -forceMagnitude, y: 0 });
          break;
        case 32: // Space bar - jump
        case 38: // Up arrow - jump
          if (Math.abs(ball.velocity.y) < 0.1) {
            Matter.Body.applyForce(ball, ball.position, { x: 0, y: -0.5 }); // Applying gravity
          }
          break;
      }
    };

    document.addEventListener('keydown', controlBall);

    // Camera follow logic, check ball position on every frame update
    Matter.Events.on(engine, 'beforeUpdate', () => {
      checkBallPosition();
    });

    // Cleanup function
    return () => {
      document.removeEventListener('keydown', controlBall);
      Matter.Events.off(engine, 'beforeUpdate');
      Matter.Engine.clear(engine);
      Matter.Render.stop(render);
      render.canvas.remove();
    };
  }, []);

  return <div id="world-component" />;
};

export default GameComponent;
