import axios from 'axios';
const ENDPOINT = "https://pixabay.com/api/";
const API_KEY = '33240465-604058830eb729e5ed32ecfda';

class PhotoAPI{
    constructor(){
        this.queryItem = '';
        this.pageNum = 1;
    }
     async fetchCard(){
        const response = await axios.get(`${ENDPOINT}?key=${API_KEY}&q=${this.queryItem}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.pageNum}&per_page=40`)
        this.incrementPage();           
        return response.data
    }
    resetPage(){
        this.pageNum = 1
    }
    incrementPage(){
        this.pageNum += 1
    }
}

export { PhotoAPI }