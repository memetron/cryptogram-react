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

    const handleChange = (e) => {
        const guess = e.target.value.toUpperCase();
        const regex = '^[A-Z]?$';
        if (guess.match(regex) && guess !== letter) {
            setGuesses({ ...guesses, [letter]: guess });
            if (guess.length === 1) {
                focusNextLetter(letter);
            }
        }
    };

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

    return (
        <div className="letterBox">
            {letter.match("[a-zA-Z]") && (
                <input
                    className={`${focusType} inputBox`}
                    type="text"
                    value={guesses[letter] || ""}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    ref={ref}
                    maxLength={1} // Ensure only one letter is input
                />
            )}
            {letter.match("[a-zA-Z]") && (<hr className="letterDivider"/>)}
            <p className="cipherLetter">{letter.toUpperCase()}</p>
        </div>
    );
});

export default CryptogramLetter;