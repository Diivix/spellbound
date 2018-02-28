
export function requireLogin (req, res, next) {
  console.log(req.session.user);
    if (!req.user) {
        const err = new Error('Unauthorised');
        err.status = 401;
        next(err);
    } else {
      next();
    }
  };