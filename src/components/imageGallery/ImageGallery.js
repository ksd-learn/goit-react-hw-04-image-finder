import { Component } from 'react';
import { ImageGalleryItem } from '../imageGalleryItem/ImageGalleryItem';
import { Button } from '../button/Button';
import { Modal } from '../modal/Modal';
import { Loader } from '../loader/Loader';
import { apiPixabay } from '../../api/apiServicces';
import { queryApi } from '../../api/queryApi';
import css from './imageGallery.module.css';
import PropTypes from 'prop-types';

export class ImageGallery extends Component {

    state = {
        data: [],
        page: 1,
        status: 'start',                            // "start", "pending", "resolved", "error"
        idImgModal: 0,
        showModal: false,
        error: 'null'
    };
                                                    // добавление полученной страницы в state
    addPage = (dataPage) => {
        this.setState(
            (prevstate) => {
                if (dataPage.length > 0) {
                    if (this.state.page === 1) {
                        return {data: dataPage}
                    } else {
                        const newData = prevstate.data.concat(dataPage);
                        return { data: newData}
                    }
                }
            }
        )
    };
                                                    // формирование шаблона массива state.data
    patternPage = (dataPage) => {
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
    dataQueryApi = (page) => {
        let queryValue = this.props.nameSearch;
        let url = apiPixabay(queryValue, page);     //html  запроса

        queryApi(url)                               //запрос > анализ данных > запись в state
            .then(dataPage => {
                if (dataPage.length > 0) {
                    return this.patternPage(dataPage)
                } else {
                    return Promise.reject(new Error("Поиск завершен"))
                }
            })
            .then((dataPattern => this.addPage(dataPattern)))
            .catch(error => this.setState({ error }))
            .finally(() => this.setState({ status: 'resolved' }))
    };
                                                    // действие кнопки "Load more"
    handlBtnLoadMore = () => {
        this.setState((prevState) => {
            return { status: 'pending', page: prevState.page + 1 }
        })
    };
    
                                                    // управление модальным окном (откр/закр)
    switchModal = (id) => {
        this.setState(({ showModal }) => (
            { idImgModal: id, showModal: !showModal }
        ))
    };
                                                    // действие после render
    componentDidUpdate(prevProps, prevState) {
        let queryValue = this.props.nameSearch;
        let {page, error} = this.state;

        if (prevProps.nameSearch !== queryValue) {          //новая тема
            this.setState({
                    data: [],
                    status: 'pending',
                    page: 1,
                    showModal: false,
                    error: 'null'
            });
            this.dataQueryApi(1);
        }

        if (prevState.page !== page && page > 1) {  //следующая страница
            this.dataQueryApi(page)
        }

        if ( prevState.error!== error && error.message === "Поиск завершен") {
            this.setState({
                    status: 'start',
            });
        }
    };
    
    render() {

        let { data, status, idImgModal, showModal, error } = this.state;
        const dataPhoto = data.find(item => item.id === idImgModal);

        return (
            <section className={css.sectionGallery}>
                {data.length > 0 &&
                    <ul className={css.imageGallery}>
                        {data.map((item) => {
                        return (
                            <ImageGalleryItem key={item.id} item={item} onOpen={this.switchModal} />
                        )})}
                    </ul>}                
                
                {(data.length === 0 && error.message === "Поиск завершен") &&
                    <p>"Поиск завершен"</p>}

                {status === 'resolved' && 
                    <Button onClick={this.handlBtnLoadMore} />}

                {status === 'pending' && 
                    <Loader />}

                {showModal && 
                    <Modal dataPhoto={dataPhoto} onClose={this.switchModal} />}
            </section>
        )
    }
}

ImageGallery.propTypes = {
    nameSearch: PropTypes.string.isRequired,
};