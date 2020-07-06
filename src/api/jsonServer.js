import axios from 'axios';

export default axios.create({
    // for CRUD operations we are making use of a json-server hosted using a tunnelling service ngrok
    baseURL: "http://b48087e6c721.ngrok.io"
});