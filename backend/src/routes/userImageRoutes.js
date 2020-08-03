const express = require('express');

const multer = require('multer');
const fs = require('fs');
const path = require('path');

const requireAuth = require('../middleware/requireAuth');
const { options, notificationSend } = require('../api/notifications');


const router = express.Router();

router.use(requireAuth);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        console.log('filename', file.mimetype);
        const { user_id } = req.headers;
        cb(null, `${user_id}.jpg`);
    }
})

const upload = multer({ storage: storage });


var mime = {
    html: 'text/html',
    txt: 'text/plain',
    css: 'text/css',
    gif: 'image/gif',
    jpg: 'image/jpeg',
    png: 'image/png',
    svg: 'image/svg+xml',
    js: 'application/javascript'
};

router.put('/users/image', upload.single('fileData'), async (req, res) => {
    const { user_id } = req.headers;

    const { userName } = req.body;

    const image = req.file;

    console.log(image);
    console.log(userName);
    fs.readFile(image.path, async (err, contents) => {
        if (err) {
            console.log('Error: ', err);
            return res.status(422).send({ error: err });
        } else {
            console.log('File contents ', contents);
            const imageUpdated = {
                to: "ExponentPushToken[_58XauD5FxUEQ9XQ_PkmCw]",
                sound: "default",
                title: userName,
                body: "User Image added",
            };
            try {
                response = await notificationSend.post('/send', imageUpdated, options);
                res.send({ status: 'Success' })
            } catch (e) {
                console.error(e);
                return res.status(422).send({ Error: err });
            }
        }
    });
})

router.get('/users/image', async (req, res) => {
    const { user_id } = req.headers;
    // res.sendFile(`/uploads/${user_id}.jpg`, (err) => {
    //     if (err) {
    //         res.status(422).send({ error: 'File not found'})
    //     }
    //     else {
    //         console.log('Success');
    //     }
    // });
    console.log(path.join(__dirname, '../../uploads', `${user_id}.jpg`));
    const file = `uploads/${user_id}.jpg`;
    fs.readFile(file, (err, contents) => {
        if (err) {
            console.log('Error: ', err);
            res.status(422).send({ error: 'File not found' })
        } else {
            console.log('File contents ', contents);
            // let type = mime[path.extname(file).slice(1)] || 'text/plain';
            // let s = fs.createReadStream(file);
            // s.on('open', function () {
            //     res.set('Content-Type', type);
            //     s.pipe(res);
            // });
            // s.on('error', function () {
            //     res.set('Content-Type', 'text/plain');
            //     res.status(404).end('Not found');
            // });
            res.sendFile(`${user_id}.jpg`, {
                root: path.join(__dirname, '../../uploads')
            }, (err) => {
                if (err) {
                    res.status(422).send({ error: 'File not found' })
                }
                else {
                    console.log('Success');
                }
            });
            // res.send({
            //     status: 'Success'
            // });
        }
    });
})

module.exports = router;