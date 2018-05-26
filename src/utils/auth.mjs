
export function requireLogin(req, res, next) {
    console.log("Got here...")
    if (!req.session.user) {
        const err = new Error('Unauthorised');
        err.status = 401;
        next(err);
    } else {
        next();
    }
};