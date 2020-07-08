import axios from 'axios';

export default axios.create({
    // for CRUD operations we are making use of a json-server hosted using a tunnelling service ngrok
    baseURL: "http://b2766643c67d.ngrok.io"
});