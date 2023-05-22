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
  const [idImgModal, setIdImgModal] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('null');
                                                      
  const addQueryValue = (name) => {
      if (name !== queryValue) {
          setqueryValue(name);
          setError('null');
          setShowModal(false);
          setShowBtnLoad(false)
          setData([]);
          setPage(1);
          setShowLoad(true);
      }
  };
                                                      // действие кнопки "Load more"
  const handlBtnLoadMore = () => {
      setShowLoad(true);
      setShowBtnLoad(false)
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
                                                              // формирование шаблона массива state.data
                                                              // добавление полученной страницы в state
      const addImgPage = (dataPage) => {
          const newDataPage = dataPage.map(item => {
              return {
                  id: item.id,
                  webformatURL: item.webformatURL,
                  largeImageURL: item.largeImageURL,
                  user: item.user
              }
          });
          setData((prevstate) => [...prevstate, ...newDataPage])
      };
      queryApi(queryValue, page)
          .then(({ total, hits }) => {
              if (hits.length > 0) {
                  addImgPage(hits);
                  setShowBtnLoad(Math.ceil(total / 12) > page);
              } else {
                  return Promise.reject(new Error("Поиск завершен, данных нет!"))
              }
              })
          .catch(error => setError(error))
          .finally(() => {
              setShowLoad(false)
          })
  }, [queryValue, page]);

  const dataPhoto = data.find(item => item.id === idImgModal);

  return (
    <>
      <Searchbar addQueryValue={addQueryValue} />
      {data.length > 0 &&
        <ImageGallery data={data} switchModal={switchModal} />
        }      
      {(error.message === "Поиск завершен, данных нет!") &&
        <p>"Поиск завершен, данных нет!""</p>}
      {showBtnLoad && 
        <Button onClick={handlBtnLoadMore} />}
      {showLoad && 
        <Loader />}
      {showModal && 
        <Modal dataPhoto={dataPhoto} onClose={switchModal} />}
    </>
  );
}
