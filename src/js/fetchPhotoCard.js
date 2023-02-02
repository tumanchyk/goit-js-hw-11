import axios from 'axios';
const ENDPOINT = "https://pixabay.com/api/";
const API_KEY = '33240465-604058830eb729e5ed32ecfda';
function fetchCard(query, numPage = 1){
    return axios.get(`${ENDPOINT}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${numPage}&per_page=40`).then(response => response.data)
}
export { fetchCard }