import { ImageGalleryItem } from '../imageGalleryItem/ImageGalleryItem';
import css from './imageGallery.module.css';

export const ImageGallery = ({ data, switchModal }) => {
    return (
        <ul className={css.imageGallery}>
            {data.map((item) => {
                return (
                    <ImageGalleryItem key={item.id} item={item} switchModal={switchModal} />
                )
            })}
        </ul>
    )
};






                            //ТАК БЫЛО ДО УСТРАНЕНИЯ ЗАМЕЧАНИЙ
//export const ImageGallery = ({queryValue}) => {
//
//    const [data, setData] = useState([]);
//    const [page, setPage] = useState(1);
//    const [showLoad, setShowLoad] = useState('start');       // "start", "pending", "resolved", "error"
//    const [idImgModal, setIdImgModal] = useState(0);
//    const [showModal, setShowModal] = useState(false);
//    const [error, setError] = useState('null');
//
//    const refQueryValue = useRef(queryValue);
//                                                        // действие кнопки "Load more"
//    const handlBtnLoadMore = () => {
//        setShowLoad('pending');
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
//        const addImgPage = (dataPage) => {     //!!!!!!!!
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
//                        return addImgPage(dataPage)
//                    } else {
//                        return Promise.reject(new Error("Поиск завершен"))
//                    }
//                })
//                .then(dataPattern => addPage(dataPattern))    //!!!!!! перенес в addImgPage
//                .catch(error => setError(error))
//                .finally(() => setShowLoad('resolved'))         //!!!! добавил условие по количеству страниц
//        };
//
//        if (refQueryValue.current !== queryValue) {         //новый поиск
//            refQueryValue.current = queryValue;
//            setError('null');
//            setShowModal(false);
//            setData([]);
//            setPage(1);
//            setShowLoad('pending');
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
//            setShowLoad('start')
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
//            {showLoad=== 'resolved'  && 
//                <Button onClick={handlBtnLoadMore} />}
//
//            {showLoad === 'pending' && 
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