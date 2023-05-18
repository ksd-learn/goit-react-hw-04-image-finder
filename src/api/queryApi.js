//Запрос API
const queryApi = async (url) => {
    const dataPage = await fetch(url)
        .then(response => response.json())
        .then(objPhotos => objPhotos.hits )
        .catch(error => console.log(error))
    return dataPage
}

export {queryApi}