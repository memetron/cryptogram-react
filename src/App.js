import './App.css';
import Sentence from "./components/Sentence";
import {createContext, useEffect, useState} from "react";
import * as Papa from 'papaparse';
import VictoryModal from "./components/VictoryModal";

export const UserContext = createContext(null);

function App() {
    const [guesses, setGuesses] = useState({});
    const [cipherText, setCipherText] = useState("HELLO, WORLD!");
    const [plainText, setPlainText] = useState("");
    const [key, setKey] = useState({});
    const [victoryModal, setVictoryModal] = useState(false);
    const [activeLetters, setActiveLetters] = useState(new Set());
    const [quoteIndex, setQuoteIndex] = useState(0);
    const [author, setAuthor] = useState("");

    const newGame = () => {
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
            console.log("index = " + index);
            const csv = await loadCsv();
            setPlainText(csv[index].quote);
            setAuthor(csv[index].author)
            setQuoteIndex((quoteIndex + 1) % csv.length);
        };

        initGuesses();
        initKey();
        initQuote(quoteIndex);
    }

    useEffect(() => {
        newGame();
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

    return (
        <div className="App">
            <div className="game">
                <p className="author">{author + " - "}</p>
                <div>
                    <VictoryModal isOpen={victoryModal} setIsOpen={setVictoryModal} newGame={newGame}/>
                    <Sentence cipherText={cipherText} guesses={guesses} setGuesses={setGuesses}/>
                </div>
            </div>

        </div>
    );
}

export default App;