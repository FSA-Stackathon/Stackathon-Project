const {
  models: { User },
} = require('../db');

const requireToken = async (req, res, next) => {
  try {
    const token = req.signedCookies.token;

    const user = await User.findByToken(token);
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

const isAdmin = async (req, res, next) => {
  try {
    if(req.user.user_type === 'admin'){
      req.auth = true;
      next();
    }
    if(req.user.user_type !== 'admin'){
      req.auth = false;
      return res.status(403).send('You shall not pass!')
    }
  } catch(err) {
    next(err);
  }
}

module.exports = {
  requireToken,
  isAdmin,
};
