const { User } = require('../../models')
const { rootRD, loginRD } = require('./redirects')

module.exports = {
    isAuthed(req, res, next) {
        if (!req.session.user_id)
            return loginRD(res)
        next();
    },
    isLoggedIn(req, res, next) {
        if (req.session.user_id)
            return rootRD(res)
        next();
    },
    async auth(req, res, next) {
        const id = req.session.user_id;
        if (id) {
            const user = await User.findByPk(user_id, { attributes: ['id', 'username'] })
            if (user) req.user = user;
            else req.user = null;
        }
        next();
    }
}