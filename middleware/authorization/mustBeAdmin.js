export const admin = (req, res, next) => {
    if(req.session.status === 'admin'){
        next();
    } else {
        res.sendStatus(403);
    }
};