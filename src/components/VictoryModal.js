import React, {useEffect, useState} from "react";
import Modal from 'react-bootstrap/Modal';
import {AwesomeButton} from "react-awesome-button";

const VictoryModal = (
    {
        isOpen,
        setIsOpen,
        newGame,
        index,
        setIndex,
        maxIndex,
        seconds,
        minutes
    }
) => {
    const [victorySeconds, setVictorySeconds] = useState(seconds);
    const [victoryMinutes, setVictoryMinutes] = useState(minutes);

    const handlePress = () => {
        const newIndex = (index + 1) % maxIndex;
        setIndex(newIndex);
        newGame(newIndex);
    }

    useEffect(() => {
        setVictorySeconds(seconds);
        setVictoryMinutes(minutes);
    }, [isOpen]);

    return (
        <Modal
            show={isOpen}
            onHide={newGame}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header className="modal-header">
                <Modal.Title className="modal-title">You win!</Modal.Title>
            </Modal.Header>
            <hr />
            <Modal.Body className="modal-body">
                <p>{"You solved the cryptogram in " + victoryMinutes + ":" + victorySeconds}</p>
            </Modal.Body>
            <Modal.Footer className="modal-footer">
                <AwesomeButton className="awesome-button" type="primary" onPress={handlePress}>
                    New Game
                </AwesomeButton>
            </Modal.Footer>
        </Modal>
    );
}
export default VictoryModal;