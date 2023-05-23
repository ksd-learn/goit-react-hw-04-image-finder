import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css'
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({imgModal, onClose}) => {

    const { largeImageURL, user } = imgModal;

    const handleBackdropDown = event => {
        if (event.currentTarget === event.target) {
            onClose()
        }
    };

    useEffect(() => {
        const handleKeyDown = event => {
            if (event.code === 'Escape') {
                onClose()
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [onClose]);

    return createPortal(
        <div className={css.overlay} onClick={handleBackdropDown}>
            <div className={css.modal}>
                <img src={largeImageURL} alt={user} />
            </div>
        </div>,
        modalRoot
    );
}

Modal.propTypes = {
    imgModal: PropTypes.shape({
        largeImageURL: PropTypes.string.isRequired,
        user: PropTypes.string.isRequired
    }).isRequired,
    onClose: PropTypes.func.isRequired,
};