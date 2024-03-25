import React, { useState, useEffect } from "react";
import "./Home.css";
import OnScreenKeyboard from "../Components/OnScreenKeyboard";

const Home = () => {
    const [typedName, setTypedName] = useState('');
    const [index, setIndex] = useState(0);
    const name = "Hi I'm Khalid";

    useEffect(() => {
        if (index < name.length) {
            const timer = setTimeout(() => {
                setTypedName((prev) => prev + name.charAt(index));
                setIndex((prevIndex) => prevIndex + 1);
            }, 100);

            return () => clearTimeout(timer);
        }
        // Note: No need to clear interval or timeout here as we're clearing it above
        // and it's ensured to be called before the component is unmounted or the effect reruns.
    }, [index, name]); // Adding `name` as a dependency is optional since it's static. If it's dynamic, it should be included.

    return (
        <div id="homeContainer">
            <div id="top">
                <h1>{typedName}</h1>
            </div>
            <div id="bottom">
                <OnScreenKeyboard />
            </div>
        </div>
    );
}

export default Home;
