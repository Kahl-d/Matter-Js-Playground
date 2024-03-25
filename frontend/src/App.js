import React, { useState, useEffect } from "react";
import "./app.css";
import OnScreenKeyboard from "./Components/OnScreenKeyboard";
import GameComponent from "./Components2/GameComponent";
import Home from "./Main/Home"

const App = () => {
    // const [typedName, setTypedName] = useState('');

    // useEffect(() => {
    //     const name = "Hi I'm Khalid";
    //     let index = 0;
    //     const intervalId = setInterval(() => {
    //         if (index < name.length) {
    //             setTypedName(prev => prev + name[index]);
    //             index++;
    //         } else {
    //             clearInterval(intervalId);
    //         }
    //     }, 100);

    //     return () => clearInterval(intervalId);
    // }, []);

    return (
        // <div id="appContainer">
        //     <div id="top">
        //         <h1>{typedName}</h1>
        //     </div>
        //     <div id="bottom">
        //         <OnScreenKeyboard />
        //     </div>



        // </div>

        //C=G+I+E Game Compoennt
            // <GameComponent />

        <div id="appContainer">
            <Home/>
        </div>
    );
};

export default App;
