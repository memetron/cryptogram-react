import React from "react";
import Modal from 'react-modal';

const VictoryModal = (
    {
        isOpen,
        setIsOpen
    }
) => {
    return <Modal
        isOpen={isOpen}
        contentLabel="Victory Screen"
    >
        <button onClick={setIsOpen(false)}>Close</button>
        <div>You Win!</div>
    </Modal>
}
export default VictoryModal;