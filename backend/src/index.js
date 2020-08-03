require('./models/User');
require('./models/Track');
require('./models/UserAddress');
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');
const userRoutes = require('./routes/userRoutes');
const userImageRoutes = require('./routes/userImageRoutes');
const userAddressRoutes = require('./routes/userAddressRoutes');
const bodyParser = require('body-parser');
const path = require('path');
const requireAuth = require('./middleware/requireAuth');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({limit: '15mb', extended: true}));

app.use(express.static(path.join(__dirname + '/../uploads')));

app.use(authRoutes);
app.use(trackRoutes);
app.use(userRoutes);
app.use(userImageRoutes);
app.use(userAddressRoutes);

const mongoUri = 'mongodb+srv://admin:pass123@cluster0.4o9hf.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority'
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
mongoose.connection.on('connected', () => {
    console.log('Connected to mongo instance');
});
mongoose.connection.on('error', (e) => {
    console.error('Error in connecting to mongo instance', e);
});


app.get('/', requireAuth, (req, res) => {
    res.send(`Your userName is ${req.user.userName}`);
});

app.listen(3001, () => {
    console.log('Listening on port 3001');
});