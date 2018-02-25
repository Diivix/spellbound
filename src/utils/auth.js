
export function requireLogin (req, res, next) {
    if (!req.user) {
        const err = new Error('Unauthorised');
        err.status = 401;
        next(err);
    } else {
      next();
    }
  };