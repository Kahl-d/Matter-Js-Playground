import React from 'react';

const Ball = ({ position }) => {
  return (
    <div
      id="ball"
      style={{
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: '30px',
        height: '30px',
        borderRadius: '50%',
        backgroundColor: 'black',
        transition: 'left 0.1s ease-out, top 0.1s ease-out', // Enhanced smoothness in movement
      }}
    />
  );
};

export default Ball;
