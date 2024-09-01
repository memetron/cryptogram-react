import {useState} from "react";

const MenuBar = (
    {
        index,
        setIndex,
        maxIndex,
        newGame,
        hint
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
        newIndex = newIndex>=0?newIndex:maxIndex+newIndex;
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
        const val = Math.max(0, Math.min(e.target.value, maxIndex - 1));
        setNavigationTarget(val);
    }

    const handleGo = () => {
        setIndex(navigationTarget);
        newGame(navigationTarget);
    }

    return (
        <div className="menuBar">
            <div className="menuBarItems menuBarText">
                {"Current Puzzle : " + index}
            </div>
            <div className="menuButtons">
                <button className="menuBarButton" onClick={handleNext}>Next</button>
                <button className="menuBarButton" onClick={handlePrevious}>Previous</button>
                <button className="menuBarButton" onClick={handleRandom}>Random</button>
                <button className="menuBarButton" onClick={handleHint}>Hint</button>
                <div className="navigationBox">
                    <input type="number" max={maxIndex} value={navigationTarget} onChange={handleChange}/>
                    <button className="menuBarButton" onClick={handleGo}>Go</button>
                </div>
            </div>
        </div>
    );
}
export default MenuBar;