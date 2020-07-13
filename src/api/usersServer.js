import axios from 'axios';

export default axios.create({
    // for CRUD operations we are making use of a node server using express framework making use of a tunnelling service 'ngrok'
    baseURL: "http://f6ee34ac8b47.ngrok.io"
});