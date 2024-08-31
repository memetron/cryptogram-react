import './App.css';
import Sentence from "./components/Sentence";
import { createContext, useEffect, useState } from "react";
import { getQuote } from "./misc/Api";
import VictoryModal from "./components/VictoryModal";

export const UserContext = createContext(null);

function App() {
    const [guesses, setGuesses] = useState({});
    const [cipherText, setCipherText] = useState("HELLO, WORLD!");
    const [plainText, setPlainText] = useState("");
    const [key, setKey] = useState({});
    const [victoryModal, setVictoryModal] = useState(false);

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

            console.log(dict);
            setKey(dict);
        };

        const shuffleArray = (array) => {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        };

        const initQuote = async () => {
            try {
                // const quote = await getQuote(); // Fetch the quote
                const quote = {content: "This is a test quote to show dad the program not being stupid and not getting a quote"};
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
                <VictoryModal isOpen={victoryModal} setIsOpen={setVictoryModal}/>
                <Sentence cipherText={cipherText} guesses={guesses} setGuesses={setGuesses} />
            </header>
        </div>
    );
}

export default App;