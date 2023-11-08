import React from 'react';
import '../PhotoGallery/PhotoGallery';

const Modal = ({ showModal, closeModal, url }) => {
    if (!showModal) {
        return null;
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={closeModal}>&times;</span>
                <img src={url} alt="Modal" className='w-100 h-100'/>
            </div>
        </div>
    );
};

export default Modal;
