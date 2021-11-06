import React from 'react';
import './deletemodal.modules.css';

const Modal = ({ setOpenModal, confirmAction }) => {
  const onDeleteClick = () => {
    confirmAction();
    setOpenModal(false);
  };

  return (
    <div className='modalBackground'>
      <div className='modalContainer'>
        <div className='titleCloseBtn'>
          <button
            className='modal-closeBtn'
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className='modal-title'>
          <h3>Confirm Delete</h3>
        </div>
        <div className='modal-body'>
          <small>
            Are you sure you want to delete Item. This action can not be
            reversed
          </small>
        </div>
        <div className='modal-footer'>
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id='cancelBtn'
          >
            Cancel
          </button>
          <button onClick={onDeleteClick}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
