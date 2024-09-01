import './App.css';
import Sentence from "./components/Sentence";
import {createContext, useEffect, useState} from "react";
import * as Papa from 'papaparse';
import VictoryModal from "./components/VictoryModal";
import MenuBar from "./components/MenuBar";
import useTimer from "./misc/Timer";

export const UserContext = createContext(null);

function App() {
    const [guesses, setGuesses] = useState({});
    const [cipherText, setCipherText] = useState("HELLO, WORLD!");
    const [plainText, setPlainText] = useState("");
    const [key, setKey] = useState({});
    const [victoryModal, setVictoryModal] = useState(false);
    const [activeLetters, setActiveLetters] = useState(new Set());
    const [quoteIndex, setQuoteIndex] = useState(0);
    const [maxIndex, setMaxIndex] = useState(0);
    const [author, setAuthor] = useState("");
    const [focusedLetter, setFocusedLetter] = useState("");
    const [startTime, setStartTime] = useState(new Date())
    const {minutes, seconds} = useTimer(startTime);

    const newGame = (index) => {
        const initGuesses = () => {
            let dict = {};
            "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('').forEach(c => {
                dict[c] = "";
            });
            setGuesses(dict);
        };

        const initKey = () => {
            const shuffleArray = (array) => {
                for (let i = array.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [array[i], array[j]] = [array[j], array[i]];
                }
                return array;
            };

            let dict = {};
            let remainingChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');

            let validPermutation = false;
            while (!validPermutation) {
                remainingChars = shuffleArray([...remainingChars]);

                dict = {};
                validPermutation = true;
                for (let i = 0; i < remainingChars.length; i++) {
                    if (remainingChars[i] === "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[i]) {
                        validPermutation = false;
                        break;
                    }
                    dict["ABCDEFGHIJKLMNOPQRSTUVWXYZ"[i]] = remainingChars[i];
                }
            }
            setKey(dict);
        };

        const loadCsv = async function () {
            const response = await fetch('./quotes.csv'); // Fetch the CSV file
            const csvText = await response.text(); // Convert the response to text
            return Papa.parse(csvText, {
                header: true, // If your CSV has headers
                dynamicTyping: true, // Automatically types numbers, booleans, etc.
            }).data; // Return the parsed data
        };

        const initQuote = async (index) => {
            const csv = await loadCsv();
            setMaxIndex(csv.length);
            setPlainText(csv[index].quote);
            setAuthor(csv[index].author)
        };

        initGuesses();
        initKey();
        initQuote(index);
        setStartTime(new Date())
    }

    useEffect(() => {
        newGame(0);
    }, []);

    useEffect(() => {
        let letters = new Set();
        plainText.toUpperCase().split("").forEach(c => {
            if (c.match("[A-Z]")) {
                letters.add(c);
            }
        });
        setActiveLetters(letters);
        if (plainText && Object.keys(key).length > 0) {
            let str = plainText.toLowerCase(); // Correctly call toLowerCase() as a function
            Object.keys(key).forEach(c => {
                const regex = new RegExp(c.toLowerCase(), 'g'); // Global replacement for the lowercase letter
                str = str.replace(regex, key[c].toUpperCase()); // Replace with the corresponding uppercase letter
            });
            setCipherText(str);
        }
    }, [plainText, key]);

    useEffect(() => {
        if (activeLetters.size > 0) {
            let isSuccess = true;
            Array.from(activeLetters).forEach(c => {
                if (guesses[key[c]] !== c) {
                    isSuccess = false;
                }
            });

            console.log(isSuccess);
            setVictoryModal(isSuccess);
        }
    }, [guesses, activeLetters, key]);

    const hint = () => {
        for (let letter of activeLetters) {
            if (guesses[key[letter]] !== letter) {
                setGuesses({ ...guesses, [key[letter]]: letter });
                setFocusedLetter(key[letter]);
                return;
            }
        }
    };

    return (
        <div className="App">
            <MenuBar index={quoteIndex} setIndex={setQuoteIndex} maxIndex={maxIndex} newGame={newGame} hint={hint} seconds={seconds} minutes={minutes}/>
            <div className="game">
                <p className="author">{author + " - "}</p>
                <div>
                    <VictoryModal isOpen={victoryModal} setIsOpen={setVictoryModal} newGame={newGame} index={quoteIndex}
                                  setIndex={setQuoteIndex} maxIndex={maxIndex} seconds={seconds} minutes={minutes}/>
                    <Sentence cipherText={cipherText} guesses={guesses} setGuesses={setGuesses} focusedLetter={focusedLetter} setFocusedLetter={setFocusedLetter}/>
                </div>
            </div>

        </div>
    );
}

export default App;