//Запрос API
export const queryApi = (queryValue, page) => {
                                                // сервис изображений Pixabay
    const API_KEY = '34823710-80207717ed108df05ffec9219';
    const queryParams = `?key=${API_KEY}&q=${queryValue}&per_page=12&page=${page}&image_type=photo&orientation=horizontal&safesearch=true`;
    const url = `https://pixabay.com/api/${queryParams}`

    return (
        fetch(url)
            .then(response => {
                if (response) {
                    return  response.json()
                } else {
                    return Promise.reject(new Error("Данных нет!"))
                }
                })
            .catch(error => console.log(error))
    )
}
