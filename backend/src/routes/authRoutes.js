const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');

const { options, notificationSend } = require('../api/notifications');

const router = express.Router();

router.post('/signup', async (req, res) => {
    const { userName, password } = req.body;

    if (!userName || !password) {
        return res.status(422).send({ error: 'Must provide user ID and password'});
    }

    try {
        const user = new User({ userName, password });
        await user.save();

        const userAdded = {
            to: "ExponentPushToken[_58XauD5FxUEQ9XQ_PkmCw]",
            sound: "default",
            title: userName,
            body: "Welcome to users-app !!",
        };
        try {
            response = await notificationSend.post('/send', userAdded, options);
            const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');
            const userAdded = {
                to: "ExponentPushToken[_58XauD5FxUEQ9XQ_PkmCw]",
                sound: "default",
                title: userName,
                body: "Welcome to users-app",
            };
            try {
                response = await notificationSend.post('/send', userAdded, options);
                // res.send({ status: 'Success' })
            } catch (e) {
                console.error(e);
                // return res.status(422).send({ Error: err });
            }
            res.send({ token });
        } catch (e) {
            console.error(e);
            return res.status(422).send({ Error: err });
        }

        // const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');
        // res.send({ token });
    }
    catch (e) {
        return res.status(422).send({ error: "User Exists !!" });
    }
});

router.post('/signin', async (req, res) => {
    const { userName, password } = req.body;

    if (!userName || !password) {
        return res.status(422).send({ error: 'Must provide user ID and password'});
    }
    
    const user = await User.findOne({ userName });
    if (!user) {
        return res.status(422).send({ error: 'User does not exist'});
    }

    try {
        await user.comparePassword(password);
        const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');
        const userLoggedIn = {
            to: "ExponentPushToken[_58XauD5FxUEQ9XQ_PkmCw]",
            sound: "default",
            title: userName,
            body: "You are now logged in",
        };
        try {
            response = await notificationSend.post('/send', userLoggedIn, options);
            // res.send({ status: 'Success' })
        } catch (e) {
            console.error(e);
            // return res.status(422).send({ Error: err });
        }
        res.send({ token });
    }
    catch (e) {
        return res.status(422).send({ error: 'User does not exist' });
    }

});

module.exports = router;