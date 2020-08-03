const axios = require('axios');


const options = {
    headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      }
}

const notificationSend = axios.create({
    baseURL: 'https://exp.host/--/api/v2/push'
});

module.exports = {
    options,
    notificationSend
};