// ConfirmDeleteModal.js
import React from 'react';
import Modal from 'react-modal';
import '../../assets/css/ConfirmDeleteModal.css';

const ConfirmDeleteModal = ({ isOpen, onClose, onDelete }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Confirm Delete Modal"
      className="custom-modal"
    >
      <h2>Are you sure you want to delete this user?</h2>
      <div className="modal-buttons">
        <button onClick={onDelete} className="delete-button">
          Delete
        </button>
        <button onClick={onClose} className="cancel-button">
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmDeleteModal;
