// url сервиса поиска изображений Pixabay
const apiPixabay = (queryValue, page) => {
    const API_KEY = '34823710-80207717ed108df05ffec9219';
    const queryParams = `?key=${API_KEY}&q=${queryValue}&per_page=12&page=${page}&image_type=photo&orientation=horizontal&safesearch=true`;
    const url = `https://pixabay.com/api/${queryParams}`
    return url
}

export { apiPixabay };    