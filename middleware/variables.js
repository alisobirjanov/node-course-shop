module.exports = function(req, res, next) {
    res.locals.isAuth = req.session.isAuthenticated;
    // res.locals.user = req.session.user
    res.locals.csrf = req.csrfToken()
    next()

} 