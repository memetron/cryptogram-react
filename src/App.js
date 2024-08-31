import './App.css';
import Sentence from "./components/Sentence";
import { createContext, useEffect, useState } from "react";
import { getQuote } from "./misc/Api";

export const UserContext = createContext(null);

function App() {
    const [guesses, setGuesses] = useState({});
    const [cipherText, setCipherText] = useState("HELLO, WORLD!");
    const [plainText, setPlainText] = useState("");
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

            for (let i = remainingChars.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [remainingChars[i], remainingChars[j]] = [remainingChars[j], remainingChars[i]];
            }

            "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('').forEach((c, index) => {
                if (remainingChars[index] === c) {
                    for (let k = 0; k < remainingChars.length; k++) {
                        if (remainingChars[k] !== c && remainingChars[k] !== "SWAPPED") {
                            [remainingChars[index], remainingChars[k]] = [remainingChars[k], remainingChars[index]];
                            remainingChars[k] = "SWAPPED"; // Mark as swapped to avoid duplicate swaps
                            break;
                        }
                    }
                }
                dict[c] = remainingChars[index];
            });

            setKey(dict);
        };

        const initQuote = async () => {
            try {
                const quote = await getQuote(); // Fetch the quote
                console.log("API Response:", quote);
                if (quote && quote.content) { // Check if the quote object and content are defined
                    setPlainText(quote.content); // Set the plain text to the quote content
                } else {
                    console.error("Quote content is undefined or empty.");
                }
            } catch (error) {
                console.error("Error fetching quote:", error);
            }
        };

        initGuesses();
        initKey();
        initQuote();
    }, []);

    useEffect(() => {
        if (plainText && Object.keys(key).length > 0) {
            let str = plainText.toLowerCase(); // Correctly call toLowerCase() as a function
            Object.keys(key).forEach(c => {
                const regex = new RegExp(c.toLowerCase(), 'g'); // Global replacement for the lowercase letter
                str = str.replace(regex, key[c].toUpperCase()); // Replace with the corresponding uppercase letter
            });
            setCipherText(str);
        }
    }, [plainText, key]);

    return (
        <div className="App">
            <header className="App-header">
                <Sentence cipherText={cipherText} guesses={guesses} setGuesses={setGuesses} />
            </header>
        </div>
    );
}

export default App;