
export function requireLogin(req, res, next) {
    if (!req.session.user) {
        console.log("Not Authorised");
        const err = new Error('Unauthorised');
        err.status = 401;
        next(err);
    } else {
        console.log("Authorised");
        next();
    }
};