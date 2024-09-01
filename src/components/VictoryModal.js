import React from "react";
import Modal from 'react-bootstrap/Modal';
import {AwesomeButton} from "react-awesome-button";

const VictoryModal = (
    {
        isOpen,
        setIsOpen,
        newGame,
        index,
        setIndex
    }
) => {
    const handlePress = () => {
        newGame(index + 1);
        setIndex(index + 1)
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
                <AwesomeButton type="primary" onPress={newGame}>New Game</AwesomeButton>
            </Modal.Footer>
        </Modal>
    );
}
export default VictoryModal;