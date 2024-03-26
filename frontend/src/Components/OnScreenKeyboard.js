import React, { useState } from 'react';
import './OnScreenKeyboard.css';
import Key from './Key'; // Import the Key component from its file

const OnScreenKeyboard = () => {
  const [inputValue, setInputValue] = useState("");

  const handleKeyPress = (key) => {
    switch (key) {
      case 'delete':
        setInputValue(val => val.slice(0, -1));
        break;
      case 'space':
        setInputValue(val => `${val} `);
        break;
      case 'return':
        console.log("Submit:", inputValue); // Submit logic here
        break;
      default:
        setInputValue(val => `${val}${key}`);
    }
  };

  const keyboardLayout = [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'delete'],
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'return'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'shift'],
    ['ctrl', 'alt', 'cmd', 'space', 'cmd2', 'alt2'] // Changed 'cmd' to 'cmd2' and 'alt' to 'alt2'
  ];

  return (
    <div className="keyboard-container">
      <input
        type="text"
        className="keyboard-input"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Type here or use the keyboard below..."
      />
      {keyboardLayout.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.map((key, keyIndex) => (
            <Key key={`${rowIndex}-${keyIndex}`} label={key} handleKeyPress={handleKeyPress} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default OnScreenKeyboard;
