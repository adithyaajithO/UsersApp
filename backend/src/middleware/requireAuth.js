const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const User = mongoose.model('User');

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    // authorization === 'Bearer `String`'
    console.log(authorization);

    if (!authorization) {
        return res.status(401).send({ error: "You must be logged in" });
    }

    const token = authorization.replace('Bearer ', '');
    jwt.verify(token, 'MY_SECRET_KEY', async (e, payload) => {
        if (e) {
            return res.status(401).send({ error: "You must be logged in" });
        }
        const { userId } = payload;
        console.log('userId ', userId);
        const user = await User.findById(userId);
        if (!user) {
            return res.status(401).send({ error: "You must be logged in"});
        }
        req.user = user;
        next();
    })
}