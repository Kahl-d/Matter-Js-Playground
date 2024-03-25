import React, { useEffect } from 'react';
import { useSpring, animated } from 'react-spring';

const Key = ({ label, handleKeyPress }) => {
  const [isPressed, setPressed] = useSpring(() => ({
    scale: 1,
    boxShadow: '0px 3px 3px rgba(0, 0, 0, 0.2)',
    config: { mass: 1, tension: 250, friction: 10 }
  }));

  useEffect(() => {
    const downHandler = ({ key }) => {
      let keyLabel = key;
      if (key === ' ') keyLabel = 'space';
      else if (key === 'Backspace') keyLabel = 'delete';
      else if (key === 'Enter') keyLabel = 'return';
      else keyLabel = key.toLowerCase();

      if (keyLabel === label.toLowerCase()) {
        handleKeyPress(label === 'space' ? ' ' : label);
        setPressed.start({ scale: 0.95, boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.2)' });
      }
    };

    const upHandler = () => setPressed.start({ scale: 1, boxShadow: '0px 3px 3px rgba(0, 0, 0, 0.2)' });

    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, [label, handleKeyPress, setPressed]);

  return (
    <animated.button
      onMouseDown={() => setPressed.start({ scale: 0.95, boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.2)' })}
      onMouseUp={() => setPressed.start({ scale: 1, boxShadow: '0px 3px 3px rgba(0, 0, 0, 0.2)' })}
      onTouchStart={() => setPressed.start({ scale: 0.95, boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.2)' })}
      onTouchEnd={() => setPressed.start({ scale: 1, boxShadow: '0px 3px 3px rgba(0, 0, 0, 0.2)' })}
      className={`key ${label}`}
      style={{
        transform: isPressed.scale.to(scale => `scale(${scale})`),
        boxShadow: isPressed.boxShadow
      }}
    >
      {label === 'space' ? 'play' : label}
    </animated.button>
  );
};

export default Key;
