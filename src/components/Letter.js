import { useEffect, useState, forwardRef } from "react";

const CryptogramLetter = forwardRef(({
                                         index,
                                         letter,
                                         guesses,
                                         setGuesses,
                                         focusedLetter,
                                         setFocusedLetter,
                                         setCurrentIndex,
                                         focusNextLetter
                                     }, ref) => {
    const [focusType, setFocusType] = useState("unfocused");
    const [isActiveFocus, setIsActiveFocus] = useState(false);
    const [isRepeated, setIsRepeated] = useState(false);

    const handleChange = (e) => {
        let guess = e.target.value.toUpperCase();
        console.log(guess);
        if (guess.length > 1) {
            guess = guess.replace(guesses[letter], '')
        }
        const regex = '^[A-Z]?$';
        if (guess.match(regex) && guess !== letter) {
            setGuesses({ ...guesses, [letter]: guess });
            if (guess.length === 1) {
                focusNextLetter(letter);
            }
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Backspace") {
            e.preventDefault();
            setGuesses({ ...guesses, [letter]: "" });
        }
    }

    const handleFocus = () => {
        setCurrentIndex(index);
        setFocusedLetter(letter);
        setIsActiveFocus(true);
    };

    const handleBlur = () => {
        setIsActiveFocus(false);
    };


    useEffect(() => {
        if (focusedLetter === letter) {
            setFocusType(isActiveFocus ? "major-focus" : "minor-focus");
        } else {
            setFocusType("unfocused");
        }
    }, [focusedLetter, letter, isActiveFocus]);

    useEffect(() => {
        let count = 0;
        Object.keys(guesses).forEach(key => {
            if (guesses[letter] !== "" && guesses[key] === guesses[letter]) {
                count += 1;
            }
        });
        if (count > 1) {
            setIsRepeated(true);
        } else {
            setIsRepeated(false);
        }
    }, [guesses]);

    return (
        <div className="letterBox">
            {letter.match("[a-zA-Z]") && (
                <input
                    className={`${focusType} inputBox no-caret`}
                    type="text"
                    value={guesses[letter] || ""}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    ref={ref}
                />
            )}
            {letter.match("[a-zA-Z]") && (<hr className="letterDivider"/>)}
            <p className={isRepeated?"repeatedLetter":"cipherLetter"}>{letter.toUpperCase()}</p>
        </div>
    );
});

export default CryptogramLetter;