import axios from 'axios';

export default axios.create({
    // for CRUD operations we are making use of a node server using express framework making use of a tunnelling service 'ngrok'
    baseURL: "http://b9e996c16511.ngrok.io"
});