import css from './ImageGalleryItem.module.css'
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({item:{id, webformatURL, user}, switchModal}) => {
    return (

        < li className={css.imageGalleryItem} onClick={() => {switchModal(id)}}>
            <img src={webformatURL} alt={user} />
        </li>

    )
}

ImageGalleryItem.propTypes = {
    item: PropTypes.shape({
            id: PropTypes.oneOfType([
                PropTypes.number,
                PropTypes.string
            ]).isRequired,
            webformatURL: PropTypes.string.isRequired,
            user: PropTypes.string.isRequired
        }),
    switchModal: PropTypes.func.isRequired,
};