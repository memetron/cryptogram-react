import './App.css';
import Sentence from "./components/Sentence";
import {createContext, useEffect, useState} from "react";

export const UserContext = createContext(null);

function App() {


    const [guesses, setGuesses] = useState({});
    const [cipherText, setCipherText] = useState("HELLO, WORLD!");
    const [key, setKey] = useState({});

    useEffect(() => {
        const initGuesses = () => {
            let dict = {};
            "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('').forEach(c => {
                dict[c] = "";
            });
            setGuesses(dict);
        };

        const initKey = () => {
            let dict = {};
            let remainingChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
            "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('').forEach(c => {
                dict[c] = remainingChars
            });
        };
        initGuesses();
        initKey();
    }, []);

    return (
        <div className="App">
                <header className="App-header">
                    <Sentence cipherText={cipherText} guesses={guesses} setGuesses={setGuesses}/>
                </header>
        </div>
    );
}

export default App;
