import { useEffect, useRef, useState } from 'react';
import { ImageGalleryItem } from '../imageGalleryItem/ImageGalleryItem';
import { Button } from '../button/Button';
import { Modal } from '../modal/Modal';
import { Loader } from '../loader/Loader';
import { apiPixabay } from '../../api/apiServicces';
import { queryApi } from '../../api/queryApi';
import css from './imageGallery.module.css';
import PropTypes from 'prop-types';

export const ImageGallery = ({nameSearch}) => {

    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [status, setStatus] = useState('start');       // "start", "pending", "resolved", "error"
    const [idImgModal, setIdImgModal] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState('null');

    const refNameSearch = useRef(nameSearch);
                                                        // действие кнопки "Load more"
    const handlBtnLoadMore = () => {
        setStatus('pending');
        setPage(page + 1)
    };
                                                        // управление модальным окном (откр/закр)
    const switchModal = (id) => {
        setIdImgModal(id);
        setShowModal((prevState) => !prevState)
    };
                                                //действия с запросами
    useEffect(() => {
        if (nameSearch === '') return;
                                                        // добавление полученной страницы в state
        const addPage = (dataPage) => {
            if (dataPage.length > 0) {
                setData((prevstate) => [...prevstate, ...dataPage])
            }
        };
                                                        // формирование шаблона массива state.data
        const patternPage = (dataPage) => {
            return (
                dataPage.map(item => {
                    return {
                        id: item.id,
                        webformatURL: item.webformatURL,
                        largeImageURL: item.largeImageURL,
                        user: item.user
                    }
                })
            )
        };
                                            // подготовка и запись в state данных, полученных с сервера API 
        const dataQueryApi = (page) => {

            let url = apiPixabay(nameSearch, page);         //html  запроса
            
            queryApi(url)                                   //запрос > обработка данных > запись в state
                .then(dataPage => {
                    if (dataPage.length > 0) {
                        return patternPage(dataPage)
                    } else {
                        return Promise.reject(new Error("Поиск завершен"))
                    }
                })
                .then(dataPattern => addPage(dataPattern))
                .catch(error => setError(error))
                .finally(() => setStatus('resolved'))
        };

        if (refNameSearch.current !== nameSearch) {         //новый поиск
            refNameSearch.current = nameSearch;
            setError('null');
            setShowModal(false);
            setData([]);
            setPage(1);
            setStatus('pending');
            dataQueryApi(1);
        } else {
            if (page > 1) {                                 //запрос следующей страницы
                dataQueryApi(page)
            }
        } 

    }, [nameSearch, page]);

    useEffect(() => {
        if (error.message === "Поиск завершен") {
            setStatus('start')
        }
    }, [error])

    const dataPhoto = data.find(item => item.id === idImgModal);

    return (
        <section className={css.sectionGallery}>
            {data.length > 0 &&
                <ul className={css.imageGallery}>
                    {data.map((item) => {
                        return (
                            <ImageGalleryItem key={item.id} item={item} onOpen={switchModal} />
                        )
                    })}
                </ul>}                
                
            {(data.length === 0 && error.message === "Поиск завершен") &&
                <p>"Поиск завершен"</p>}

            {status=== 'resolved'  && 
                <Button onClick={handlBtnLoadMore} />}

            {status === 'pending' && 
                <Loader />}

            {showModal && 
                <Modal dataPhoto={dataPhoto} onClose={switchModal} />}
        </section>
    )
}

ImageGallery.propTypes = {
    nameSearch: PropTypes.string.isRequired,
};