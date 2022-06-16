const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.token;

    const user = await User.findByToken(token);
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  requireToken,
};
