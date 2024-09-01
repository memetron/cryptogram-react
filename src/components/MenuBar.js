const MenuBar = (
    {
        index,
        setIndex,
        maxIndex,
        newGame,
        hint
    }
) => {
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
    return (
        <div className="menuBar">
            <div className="menuBarItems">
                {"Current Puzzle : " + index}
            </div>
            <div className="menuButtons">
                <button className="menuBarButton" onClick={handleNext}>Next</button>
                <button className="menuBarButton" onClick={handlePrevious}>Previous</button>
                <button className="menuBarButton" onClick={handleRandom}>Random</button>
                <button className="menuBarButton" onClick={handleHint}>Hint</button>
            </div>
        </div>
    );
}
export default MenuBar;