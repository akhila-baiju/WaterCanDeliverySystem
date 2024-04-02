// UserDelete.js
import React, { useState } from 'react';
import ConfirmDeleteModal from './ConfirmDeleteModal ';
import remove from '../../assets/images/remove.png';

const UserDelete = ({ userId, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = () => {
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    // Your user deletion logic here
    onDelete(userId);
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {/* Your other components */}
      {/* <button onClick={handleDelete}>Delete User</button> */}
      <img src={remove} alt="removelogo" onClick= {handleDelete}  />
      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onDelete={handleConfirmDelete}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default UserDelete;
