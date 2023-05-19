import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css'
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({dataPhoto, onClose}) => {

    let { largeImageURL, user } = dataPhoto;

    const handleBackdropDown = event => {
        if (event.currentTarget === event.target) {
            onClose(dataPhoto.id)
        }
    };

    useEffect(() => {
        const handleKeyDown = event => {
            if (event.code === 'Escape') {
                onClose(dataPhoto.id)
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [onClose, dataPhoto]);

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
    dataPhoto: PropTypes.shape({
        id: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ]).isRequired,
        webformatURL: PropTypes.string.isRequired,
        user: PropTypes.string.isRequired
    }).isRequired,
    onClose: PropTypes.func.isRequired,
};