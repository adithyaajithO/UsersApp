import axios from 'axios';

export default axios.create({
    // for search query list
    baseURL: "https://geocoder.ls.hereapi.com/search/6.2"
});