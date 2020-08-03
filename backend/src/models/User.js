const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.pre('save', function (next) {
    const user = this;
    console.log('wooot');
    // if (!user.isModified('password')) {
    //     return next();
    // }
    bcrypt.genSalt(10, (e, salt) => {
        if (e) {
            return next(e);
        }

        bcrypt.hash(user.password, salt, (e, hash) => {
            if (e) {
                return next(e);
            }
            user.password = hash;
            console.log('user ::', user);
            next();
        });
    });
});

userSchema.pre('findOneAndUpdate', async function (next) {
    const user = await this.model.findOne(this.getQuery());

    const update = this.getUpdate();
    console.log('thisss password :: ', update, update.password);
    // user.password = update.password;
    // await user.save();
    // if (!user.isModified('password')) {
    //     return next();
    // }

    bcrypt.genSalt(10, (e, salt) => {
        if (e) {
            return next(e);
        }

        bcrypt.hash(update.password, salt, async (e, hash) => {
            if (e) {
                return next(e);
            }
            console.log('test1');
            // user.password = hash;
            user.password = update.password;
            // user.userName = update.userName;
            await user.save();
            console.log('test2');
            console.log('1 ', user);
            next();
        });
    });
});

userSchema.methods.comparePassword = function (candidatePassword) {
    const user = this;

    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, user.password, (e, isMatch) => {
            if (e) {
                return reject(e);
            }

            if (!isMatch) {
                return reject(false);
            }

            resolve(true);
        });
    });
}

mongoose.model('User', userSchema);