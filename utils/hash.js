const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const { secret } = require('./../config/jwt-config')

let generateHash = (password) => {
    return new Promise((resolve, reject) => {
        const rounds = 1; //for test
        bcrypt.hash(password, rounds, function (err, hash) {
            if (err) {
                reject(err);
            }
            resolve(hash);
        });
    });
};
const compareHash = (password, hash) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, function (err, res) {
            if (err) {
                reject(err);
            }
            if (res == false) {
                reject("invalid password");
            }
            resolve(res);
        });
    });
};

let generateToken = (id) => {
    const expiresIn = '1d';

    const payload = {
        sub: id,
        iat: Date.now()
    };

    const signedToken = jwt.sign(payload, secret, { expiresIn: expiresIn });

    return {
        token: "Bearer " + signedToken,
        expires: expiresIn
    }
};

let validateToken = (token) => {
    try {
        var decoded = jwt.verify(token, JWT_SECRET);
        return decoded;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    validateToken, generateHash, compareHash, generateToken
}