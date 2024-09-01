import {useEffect, useState} from "react";
import useTimer from "../misc/Timer";

const MenuBar = (
    {
        index,
        setIndex,
        maxIndex,
        newGame,
        hint,
        seconds,
        minutes
    }
) => {
    const [navigationTarget, setNavigationTarget] = useState(index);

    const handleNext = () => {
        const newIndex = (index + 1) % maxIndex;
        setIndex(newIndex);
        newGame(newIndex);
    };

    const handlePrevious = () => {
        let newIndex = (index - 1) % maxIndex;
        newIndex = newIndex >= 0 ? newIndex : maxIndex + newIndex;
        setIndex(newIndex);
        newGame(newIndex);
    };

    const handleRandom = () => {
        const newIndex = Math.floor(Math.random() * maxIndex);
        setIndex(newIndex);
        newGame(newIndex);
    };

    const handleHint = () => {
        hint();
    };

    const handleChange = (e) => {
        if (e.target.value.match("^[0-9]*$")) {
            if (e.target.value === "") {
                setNavigationTarget("");
            } else {
                const val = Math.max(0, Math.min(e.target.value, maxIndex - 1));
                setNavigationTarget(val);
            }
        }
    }

    const handleGo = () => {
        const newIndex = navigationTarget === "" ? 0 : navigationTarget;
        setIndex(newIndex);
        newGame(newIndex);
    }
    useEffect(() => {
        setNavigationTarget(index);
    }, [index]);

    return (
        <div className="menuBar">
            <p className="logo">Cryptograms</p>
            <div className="menuButtons">
                <div className="navigationBox" style={{marginRight: "25px"}}>
                    <p>Puzzle Number : </p>
                    <input type="text" max={maxIndex} value={navigationTarget} onChange={handleChange}
                           style={{width: "50px", marginLeft: "10px"}}/>
                    <button className="menuBarButton" onClick={handleGo}>Go</button>
                </div>
                <div className="navigationBox menuButtons" style={{marginRight: "25px"}}>
                    <button className="menuBarButton" onClick={handleNext}>Next</button>
                    <button className="menuBarButton" onClick={handlePrevious}>Previous</button>
                    <button className="menuBarButton" onClick={handleRandom}>Random
                    </button>
                </div>
                <button className="menuBarButton" onClick={handleHint}>Hint</button>

                <div className="timer navigationBox"><p>{minutes+" : "+seconds}</p></div>
            </div>
        </div>
    );
}
export default MenuBar;