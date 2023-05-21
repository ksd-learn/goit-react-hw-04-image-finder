import { useEffect, useRef, useState } from 'react';
import { ImageGalleryItem } from '../imageGalleryItem/ImageGalleryItem';
import { Button } from '../button/Button';
import { Modal } from '../modal/Modal';
import { Loader } from '../loader/Loader';
import { queryApi } from '../../api/queryApi';
import css from './imageGallery.module.css';
import PropTypes from 'prop-types';

export const ImageGallery = ({queryValue}) => {

    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [status, setStatus] = useState('start');       // "start", "pending", "resolved", "error"
    const [idImgModal, setIdImgModal] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState('null');

    const refQueryValue = useRef(queryValue);
                                                        // действие кнопки "Load more"
    const handlBtnLoadMore = () => {
        setStatus('pending');
        setPage((prevState) => prevState + 1)
    };
                                                        // управление модальным окном (откр/закр)
    const switchModal = (id) => {
        setIdImgModal(id);
        setShowModal((prevState) => !prevState)
    };
                                                //действия с запросами
    useEffect(() => {
        if (queryValue === '') return;
                                                        // добавление полученной страницы в state
        const addPage = (dataPage) => {
            if (dataPage.length > 0) {
                setData((prevstate) => [...prevstate, ...dataPage])
            }
        };
                                                        // формирование шаблона массива state.data
        const patternPage = (dataPage) => {
            const newDataPage = dataPage.map(item => {
                return {
                    id: item.id,
                    webformatURL: item.webformatURL,
                    largeImageURL: item.largeImageURL,
                    user: item.user
                }
            });
            addPage(newDataPage);
        };
                                            // подготовка и запись в state данных, полученных с сервера API 
        const dataQueryApi = (queryValue,page) => {
            let totalPage = 0;
            queryApi(queryValue, page)                      //запрос > обработка данных > запись в state
                .then(dataApi => {
                    totalPage = Math.ceil(dataApi.total/12);
                    return dataApi.hits
                })
                .then(dataPage => {
                    if (dataPage.length > 0) {
                        patternPage(dataPage)
                    } else {
                        return Promise.reject(new Error("Поиск завершен"))
                    }
                })
                .catch(error => setError(error))
                .finally(() => setStatus(
                    () => {
                        if (totalPage > page) {
                            return  'resolved'
                        } else return 'start'
                    }
                ))
        };

        if (refQueryValue.current !== queryValue) {         //новый поиск
            refQueryValue.current = queryValue;
            setError('null');
            setShowModal(false);
            setData([]);
            setPage(1);
            setStatus('pending');
            dataQueryApi(queryValue, 1);
        } else {
            if (page > 1) {                                 //запрос следующей страницы
                dataQueryApi(queryValue, page)
            }
        } 

    }, [queryValue, page]);

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
    queryValue: PropTypes.string.isRequired,
};

                            //ТАК БЫЛО ДО УСТРАНЕНИЯ ЗАМЕЧАНИЙ
//export const ImageGallery = ({queryValue}) => {
//
//    const [data, setData] = useState([]);
//    const [page, setPage] = useState(1);
//    const [status, setStatus] = useState('start');       // "start", "pending", "resolved", "error"
//    const [idImgModal, setIdImgModal] = useState(0);
//    const [showModal, setShowModal] = useState(false);
//    const [error, setError] = useState('null');
//
//    const refQueryValue = useRef(queryValue);
//                                                        // действие кнопки "Load more"
//    const handlBtnLoadMore = () => {
//        setStatus('pending');
//        setPage(page + 1)
//    };
//                                                        // управление модальным окном (откр/закр)
//    const switchModal = (id) => {
//        setIdImgModal(id);
//        setShowModal((prevState) => !prevState)
//    };
//                                                //действия с запросами
//    useEffect(() => {
//        if (queryValue === '') return;
//                                                        // добавление полученной страницы в state
//        const addPage = (dataPage) => {
//            if (dataPage.length > 0) {
//                setData((prevstate) => [...prevstate, ...dataPage])
//            }
//        };
//                                                        // формирование шаблона массива state.data
//        const patternPage = (dataPage) => {     //!!!!!!!!
//            return (
//                dataPage.map(item => {
//                    return {
//                        id: item.id,
//                        webformatURL: item.webformatURL,
//                        largeImageURL: item.largeImageURL,
//                        user: item.user
//                    }
//                })
//            )
//        };
//                                            // подготовка и запись в state данных, полученных с сервера API 
//        const dataQueryApi = (page) => {
//                                                  //!!!!!!!! объединил apiPixabay и queryApi в одну функцию
//            let url = apiPixabay(queryValue, page);         //html  запроса
//            
//            queryApi(url)                                   //запрос > обработка данных > запись в state
//                .then(dataPage => {
//                    if (dataPage.length > 0) {
//                        return patternPage(dataPage)
//                    } else {
//                        return Promise.reject(new Error("Поиск завершен"))
//                    }
//                })
//                .then(dataPattern => addPage(dataPattern))    //!!!!!! перенес в patternPage
//                .catch(error => setError(error))
//                .finally(() => setStatus('resolved'))         //!!!! добавил условие по количеству страниц
//        };
//
//        if (refQueryValue.current !== queryValue) {         //новый поиск
//            refQueryValue.current = queryValue;
//            setError('null');
//            setShowModal(false);
//            setData([]);
//            setPage(1);
//            setStatus('pending');
//            dataQueryApi(1);
//        } else {
//            if (page > 1) {                                 //запрос следующей страницы
//                dataQueryApi(page)
//            }
//        } 
//
//    }, [queryValue, page]);
//
//    useEffect(() => {
//        if (error.message === "Поиск завершен") {
//            setStatus('start')
//        }
//    }, [error])
//
//    const dataPhoto = data.find(item => item.id === idImgModal);
//
//    return (
//        <section className={css.sectionGallery}>
//            {data.length > 0 &&
//                <ul className={css.imageGallery}>
//                    {data.map((item) => {
//                        return (
//                            <ImageGalleryItem key={item.id} item={item} onOpen={switchModal} />
//                        )
//                    })}
//                </ul>}                
//                
//            {(data.length === 0 && error.message === "Поиск завершен") &&
//                <p>"Поиск завершен"</p>}
//
//            {status=== 'resolved'  && 
//                <Button onClick={handlBtnLoadMore} />}
//
//            {status === 'pending' && 
//                <Loader />}
//
//            {showModal && 
//                <Modal dataPhoto={dataPhoto} onClose={switchModal} />}
//        </section>
//    )
//}
//
//ImageGallery.propTypes = {
//    queryValue: PropTypes.string.isRequired,
//};