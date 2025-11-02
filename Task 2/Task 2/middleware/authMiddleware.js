const isAuth = (req, res, next) => {
    if (req.session.userId) {
        next();
    } else {
        res.redirect('/auth/login');
    }
};

const isGuest = (req, res, next) => {
    if (!req.session.userId) {
        next();
    } else {
        res.redirect('/students');
    }
};

module.exports = { isAuth, isGuest };