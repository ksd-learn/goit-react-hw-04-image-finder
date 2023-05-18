import { Component } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css'
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {

    handleKeyDown = event => {
        if (event.code === 'Escape') {
            this.props.onClose(this.props.dataPhoto.id)
        }
    }

    handleBackdropDown = event => {
        if (event.currentTarget === event.target) {
            this.props.onClose(this.props.dataPhoto.id)
        }
    }

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown)
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown)
    }

    render() {

        let { largeImageURL, user } = this.props.dataPhoto;

        return createPortal(
            <div className={css.overlay} onClick={this.handleBackdropDown}>
                <div className={css.modal}>
                    <img src={largeImageURL} alt={user} />
                </div>
            </div>,
            modalRoot
        );
    }

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