export const decodeQuery = (req, res, next) => {
    for (let key in req.query) {
            req.query[key] = decodeURI(req.query[key]);
            req.query[key] = req.query[key].replace(/\+/g, ' ');
            console.log( req.query[key]);
    }
    next();
};