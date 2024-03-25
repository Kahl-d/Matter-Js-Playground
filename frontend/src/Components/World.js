import React, { useEffect, useRef, useState } from "react";
import Ball from "./Ball";
import "./world.css";

const World = () => {
  const worldRef = useRef(null);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [velocity, setVelocity] = useState({ vx: 0, vy: 0 });
  const worldSize = { width: window.innerWidth * 2, height: window.innerHeight * 2 };
  const friction = 0.98;
  const scrollThreshold = 50; // Distance from edge before scrolling starts

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case "ArrowUp":
          setVelocity((prevVelocity) => ({ ...prevVelocity, vy: prevVelocity.vy - 1.5 }));
          break;
        case "ArrowDown":
          setVelocity((prevVelocity) => ({ ...prevVelocity, vy: prevVelocity.vy + 1.5 }));
          break;
        case "ArrowLeft":
          setVelocity((prevVelocity) => ({ ...prevVelocity, vx: prevVelocity.vx - 1.5 }));
          break;
        case "ArrowRight":
          setVelocity((prevVelocity) => ({ ...prevVelocity, vx: prevVelocity.vx + 1.5 }));
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const moveBallAndScroll = () => {
      setVelocity((prevVelocity) => ({
        vx: prevVelocity.vx * friction,
        vy: prevVelocity.vy * friction,
      }));

      setPosition((prevPosition) => {
        const newX = Math.max(0, Math.min(worldSize.width - 20, prevPosition.x + velocity.vx));
        const newY = Math.max(0, Math.min(worldSize.height - 20, prevPosition.y + velocity.vy));

        const viewPortX = worldRef.current.scrollLeft + window.innerWidth;
        const viewPortY = worldRef.current.scrollTop + window.innerHeight;

        // Only scroll if the ball is within threshold of the viewport edges
        if (newX > viewPortX - scrollThreshold) {
          worldRef.current.scrollLeft += scrollThreshold;
        } else if (newX < worldRef.current.scrollLeft + scrollThreshold) {
          worldRef.current.scrollLeft -= scrollThreshold;
        }

        if (newY > viewPortY - scrollThreshold) {
          worldRef.current.scrollTop += scrollThreshold;
        } else if (newY < worldRef.current.scrollTop + scrollThreshold) {
          worldRef.current.scrollTop -= scrollThreshold;
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
        height: `${worldSize.height}px`,
        overflow: "auto",
        position: "relative",
      }}
    >
    <div className="worlds" style={{width: "100vw", height: "100vh"}}></div>
    <div className="worlds" style={{width: "100vw", height: "100vh"}}></div>
    <div className="worlds" style={{width: "100vw", height: "100vh"}}></div>
    <div className="worlds" style={{width: "100vw", height: "100vh"}}></div>
  
      <Ball position={position} />
    </div>
  );
};

export default World;
