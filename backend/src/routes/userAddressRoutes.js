const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middleware/requireAuth');
const { options, notificationSend } = require('../api/notifications');

const UserAddress = mongoose.model('UserAddress');

const router = express.Router();

router.use(requireAuth);

router.get('/users/address', async (req, res) => {
    const { user_id } = req.headers;

    await UserAddress.findOne({ _id: user_id }, (err, result) => {
        if (err) {
            res.status(422).send({ error: err });
        }
        else {
            res.send(result);
        }
    });
})

router.put('/users/address', async (req, res) => {
    const { user_id } = req.headers;

    const { coordinate, userName } = req.body;

    console.log(coordinate, userName);
    if (!coordinate) {
        return res.status(422).send({ error: 'You must send coordinate' });
    }

    await UserAddress.findOneAndUpdate({ _id: user_id }, { 
        latitude: coordinate.latitude,
        longitude: coordinate.longitude
    }, {
        upsert: true
    }, async (err, result) => {
        if (err) {
            return res.status(422).send({ error: err.message });
        } else {
            const userUpdated = {
                to: "ExponentPushToken[_58XauD5FxUEQ9XQ_PkmCw]",
                sound: "default",
                title: userName,
                body: "Address updated",
                data: result,
            };
            try {
                response = await notificationSend.post('/send', userUpdated, options);
            } catch (e) {
                console.error(e);
            }
            res.send(result);
        }
    });
})

module.exports = router;