import Letter from "./Letter";
import {createRef, useEffect, useState} from "react";

const Sentence = ({
                      guesses,
                      setGuesses,
                      cipherText
                  }) => {
    const [focusedLetter, setFocusedLetter] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);

    const [inputRefsArray] = useState(() =>
        Array.from({ length: cipherText.length }, () => createRef())
    );


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

    return (
        <div className="sentence">
            {letters}
        </div>
    );
};

export default Sentence;