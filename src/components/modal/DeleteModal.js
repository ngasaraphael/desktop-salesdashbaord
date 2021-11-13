import React from 'react';
import './deletemodal.modules.css';

const Modal = ({ setOpenModal, confirmAction, title }) => {
  const onConfirm = () => {
    confirmAction();
    setOpenModal(false);
  };

  if (!title) {
    title = 'Confirm Action';
  }

  //Close modal with escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      setOpenModal(false);
    }
  });

  //Close modal onClick of modalBackground
  window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modalBackground')) {
      setOpenModal(false);
    }
  });

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
            x
          </button>
        </div>
        <div className='modal-title'>
          <h4>{title}</h4>
        </div>
        <div className='modal-body'>
          <small>This action can not be reversed</small>
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
          <button onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
