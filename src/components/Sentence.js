import Letter from "./Letter";
import {createRef, useEffect, useState} from "react";

const Sentence = ({
                      guesses,
                      setGuesses,
                      cipherText,
    focusedLetter,
    setFocusedLetter
                  }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [inputRefsArray, setInputRefsArray] = useState([]);

    useEffect(() => {
        setInputRefsArray(Array.from({ length: cipherText.length }, () => createRef()));
    }, [cipherText]);


    const focusNextLetter = (prevLetter) => {
        for (let i = currentIndex + 1; i < cipherText.length; i++) {
            if (cipherText[i].match("[A-Za-z]") &&
                guesses[cipherText[i]] === "" &&
                cipherText[i] !== prevLetter) {
                inputRefsArray[i]?.current?.focus(); // Focus the next valid letter
                setCurrentIndex(i); // Update the currentIndex to the newly focused letter
                break; // Exit the loop once the next letter is focused
            }
        }
    };

    const letters = cipherText.split('').map((c, index) => (
        <Letter
            key={index}
            index={index}
            letter={c}
            guesses={guesses}
            setGuesses={setGuesses}
            focusedLetter={focusedLetter}
            setFocusedLetter={setFocusedLetter}
            focusIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            focusNextLetter={focusNextLetter}
            ref={inputRefsArray[index]}
        />
    ));

    let words = [[]];
    letters.forEach(letter => {
        if (letter.props.letter === " ") { // Access the letter prop correctly
            words.push([]);
        } else {
            words[words.length - 1].push(letter); // Correctly refer to the last array
        }
    });

    return (
        <div className="sentence">
            <p className="cipherLetter">{"\t"}</p>
            {words.map((word, index) => (
                <div key={index} className="word">
                    {word}
                </div>
            ))}
        </div>
    );
};

export default Sentence;