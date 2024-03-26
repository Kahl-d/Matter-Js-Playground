import React, { useEffect, useRef, useState } from "react";
import Ball from "./Ball";
import "./world.css";
import OnScreenKeyboard from "./OnScreenKeyboard";

const World = () => {
  const [typedName, setTypedName] = useState('');

  useEffect(() => {
    const name = "Hi I'm Khalid";
    let index = 0;
    const intervalId = setInterval(() => {
      if (index < name.length) {
        setTypedName(prev => prev + name[index]);
        index++;
      } else {
        clearInterval(intervalId);
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, []);

  const worldRef = useRef(null);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [velocity, setVelocity] = useState({ vx: 0, vy: 0 });
  const [isJumping, setIsJumping] = useState(false);
  const worldSize = { width: (window.innerWidth * 2), height: window.innerHeight -10 };
  const friction = 0.98;
  const gravity = 0.2; // Adjust gravity as needed
  const jumpVelocity = 15; // Adjust jump velocity as needed
  const scrollThreshold = 50; // Distance from edge before scrolling starts

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case "ArrowUp":
          setIsJumping(true);
          setVelocity((prevVelocity) => ({ ...prevVelocity, vy: -jumpVelocity }));
          break;
        case "ArrowDown":
          setVelocity((prevVelocity) => ({ ...prevVelocity, vy: prevVelocity.vy  }));
          break;
        case "ArrowLeft":
          setVelocity((prevVelocity) => ({ ...prevVelocity, vx: prevVelocity.vx - 2 }));
          break;
        case "ArrowRight":
          setVelocity((prevVelocity) => ({ ...prevVelocity, vx: prevVelocity.vx + 2 }));
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isJumping]);

  useEffect(() => {
    const moveBallAndScroll = () => {
      // Apply gravity in the vertical direction only
      setVelocity((prevVelocity) => ({
        vx: prevVelocity.vx * friction,
        vy: (prevVelocity.vy + gravity) * friction,
      }));

      setPosition((prevPosition) => {
        const newX = Math.max(0, Math.min(worldSize.width - 20, prevPosition.x + velocity.vx));
        const newY = Math.max(0, Math.min(worldSize.height - 20, prevPosition.y + velocity.vy));

        const viewPortX = worldRef.current.scrollLeft + window.innerWidth;
        const viewPortY = worldRef.current.scrollTop + window.innerHeight;

        // Only scroll if the ball is within threshold of the viewport edges
        if (newX > viewPortX - scrollThreshold || newX < worldRef.current.scrollLeft + scrollThreshold) {
          worldRef.current.scrollLeft += velocity.vx;
        }

        if (newY > viewPortY - scrollThreshold || newY < worldRef.current.scrollTop + scrollThreshold) {
          worldRef.current.scrollTop += velocity.vy;
        }

        if (newY >= worldSize.height - 20) {
          setIsJumping(false);
        }

        return { x: newX, y: newY };
      });
    };

    const frameId = requestAnimationFrame(moveBallAndScroll);

    return () => cancelAnimationFrame(frameId);
  }, [velocity, position]);

  return (
    <div
      id="worldContainer"
      ref={worldRef}
      style={{
        width: `${worldSize.width}px`,
        height: `${worldSize.height +10}px`,
        overflow: "auto",
        position: "relative",
      }}
    >
      <div className="worlds" style={{ width: "100vw", height: "100vh" }}>
        <h1>{typedName}</h1>
        <OnScreenKeyboard />
      </div>
      <div className="worlds" style={{ width: "100vw", height: "100vh" }}>

      </div>
  
      <Ball position={position} />
    </div>
  );
};

export default World;
