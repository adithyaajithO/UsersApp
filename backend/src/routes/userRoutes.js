const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middleware/requireAuth');
const { options, notificationSend } = require('../api/notifications');

const User = mongoose.model('User');

const router = express.Router();

router.use(requireAuth);

router.get('/users', async (req, res) => {
    await User.find({}, (err, result) => {
        if (err) {
            res.status(422).send({ error: err });
        }
        else {
            res.send(result);
        }
    });
})

router.put('/users', async (req, res) => {
    const { user_id } = req.headers;
    console.log(req.headers);

    const { userName, password } = req.body;

    if (!userName && !password) {
        return res.status(422).send({ error: 'You must send user name and password' });
    }

    query = !userName ? { password } : !password ? { userName } : { userName, password };
    console.log(query);

    await User.findOneAndUpdate({ _id: user_id }, query, async (err, result) => {
        if (err) {
            return res.status(422).send({ error: err.message });
        } else {
            if (result) {
                // const options = {
                //     headers: {
                //         Accept: 'application/json',
                //         'Accept-encoding': 'gzip, deflate',
                //         'Content-Type': 'application/json',
                //       }
                // }
                const userUpdated = {
                    to: "ExponentPushToken[_58XauD5FxUEQ9XQ_PkmCw]",
                    sound: "default",
                    title: result.userName,
                    body: "Details updated",
                    data: result,
                };

                // notificationSend = axios.create({
                //     baseURL: 'https://exp.host/--/api/v2/push'
                // });
                try {
                    response = await notificationSend.post('/send', userUpdated, options);
                    // await fetch('https://exp.host/--/api/v2/push/send', {
                    //     method: 'POST',
                    //     headers: {
                    //         Accept: 'application/json',
                    //         'Accept-encoding': 'gzip, deflate',
                    //         'Content-Type': 'application/json',
                    //     },
                    //     body: JSON.stringify(message),
                    // });
                    // console.log(response);
                } catch (e) {
                    console.error(e);
                }
                res.send(result);
            }
            else {
                return res.status(404).send({ error: 'user not found' });
            }
        }
    });
})

router.delete('/users', async (req, res) => {
    const { user_id } = req.headers;

    await User.findById(user_id, async (err, result) => {
        if (err) {
            return res.status(422).send({ error: err.message });
        } else {
            if (result) {
                await User.deleteOne({ _id: result._id }, async (err) => {
                    if (err) {
                        return res.status(422).send({ error: err.message });
                    }
                    else {
                        const userDeleted = {
                            to: "ExponentPushToken[_58XauD5FxUEQ9XQ_PkmCw]",
                            sound: "default",
                            title: user_id,
                            body: "User Image added",
                        };
                        try {
                            response = await notificationSend.post('/send', userDeleted, options);
                            res.send({ status: 'Success' })
                        } catch (e) {
                            console.error(e);
                            return res.status(422).send({ Error: err });
                        }

                        // res.send({ status: 'Success' });
                    }
                })
            }
            else {
                return res.status(404).send({ error: 'user not found' });
            }
        }
    });
})


module.exports = router;