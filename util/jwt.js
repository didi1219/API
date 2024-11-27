import 'dotenv/config.js';
import jsonwebtoken from 'jsonwebtoken';

export const sign = (playload, options) => {
    return jsonwebtoken.sign(playload,process.env.JWT_SECRET, options);
};

export const verify = (jwt, options = {}) => {
    return jsonwebtoken.verify(jwt,process.env.JWT_SECRET, options);
};