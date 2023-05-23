import { useEffect, useState } from 'react';
import { Searchbar } from './searchbar/Searchbar';
import { ImageGallery } from './imageGallery/ImageGallery';
import { Button } from './button/Button';
import { Modal } from './modal/Modal';
import { Loader } from './loader/Loader';
import { queryApi } from '../api/queryApi';


export const App = () => {

  const [queryValue, setqueryValue] = useState('');
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [showLoad, setShowLoad] = useState(false); 
  const [showBtnLoad, setShowBtnLoad] = useState(false)
  const [imgModal, setImgModal] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('null');
                                                      
  const addQueryValue = (name) => {
    if (name === queryValue) return; 
    setqueryValue(name);
    setError('null');
    setShowModal(false);
    setShowBtnLoad(false)
    setData([]);
    setPage(1);
    setShowLoad(true);
  };
                                                      // действие кнопки "Load more"
  const handlBtnLoadMore = () => {
      setShowLoad(true);
      setShowBtnLoad(false)
      setPage((prevState) => prevState + 1)
  };
                                                      // управление модальным окном (откр/закр)
  const switchModal = (largeImageURL, user) => {
      setImgModal({largeImageURL, user});
      setShowModal((prevState) => !prevState)
  };
                                                      //действия с запросами
  useEffect(() => {
    if (queryValue === '') return;
    queryApi(queryValue, page)
      .then(({ total, hits }) => {
        if (!hits.length) return Promise.reject(new Error("Поиск завершен, данных нет!"));                                      
        const newDataPage = hits.map(item => {                // формируем шаблон массива state>data
            return {
                id: item.id,
                webformatURL: item.webformatURL,
                largeImageURL: item.largeImageURL,
                user: item.user
            }
        });
        setShowBtnLoad(Math.ceil(total / 12) > page);
        setData((prevstate) => [...prevstate, ...newDataPage]);
      })
      .catch(error => setError(error))
      .finally(() => {
        setShowLoad(false)
      })
  }, [queryValue, page]);

  return (
    <>
      <Searchbar addQueryValue={addQueryValue} />
      {data.length > 0 &&
        <ImageGallery data={data} switchModal={switchModal} />
        }      
      {error &&
        <p>{error.message}</p>}
      {showBtnLoad && 
        <Button onClick={handlBtnLoadMore} />}
      {showLoad && 
        <Loader />}
      {showModal && 
        <Modal imgModal={imgModal} onClose={switchModal} />}
    </>
  );
}
