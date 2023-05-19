//Запрос API
const queryApi = (url) => {
    const dataPage = fetch(url)
        .then(response => response.json())
        .then(objPhotos => objPhotos.hits )
        .catch(error => console.log(error))
    return dataPage
}

export {queryApi}