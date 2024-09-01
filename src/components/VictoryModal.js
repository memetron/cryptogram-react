import React from "react";
import Modal from 'react-bootstrap/Modal';
import {AwesomeButton} from "react-awesome-button";

const VictoryModal = (
    {
        isOpen,
        setIsOpen,
        newGame,
        index,
        setIndex,
        maxIndex
    }
) => {
    const handlePress = () => {
        const newIndex = (index + 1) % maxIndex;
        setIndex(newIndex);
        newGame(newIndex);
    }

    return (
        <Modal
            show={isOpen}
            onHide={newGame}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header>
                <Modal.Title>You win!</Modal.Title>
            </Modal.Header>
            <hr/>
            <Modal.Body>
                <p>TODO : Make timer.</p>
            </Modal.Body>

            <Modal.Footer>
                <AwesomeButton type="primary" onPress={handlePress}>New Game</AwesomeButton>
            </Modal.Footer>
        </Modal>
    );
}
export default VictoryModal;