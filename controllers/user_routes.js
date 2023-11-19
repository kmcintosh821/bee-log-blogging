const router = require('express').Router();
const User = require('../models')
const { rootRD, loginRD, regRD } = require('./utils/redirects')

regErr = (req, res, err) => {
    console.log(err);
    if (err.errors) req.session.errors = err.errors.map(obj => obj.message);
    regRD(res);
}

router.post('/register', async (req, res) => {
    try {
        const user = await User.create(req.body)
        req.session.user_id = user.id;
        
        rootRD(res);
    } catch (err) {regErr(req, res, err)}
})

router.post('/login', async(req, res) => {
    const user = await User.findOne({where: { username: req.body.username}})
    if (!post) {
        req.session.errors = ['User not found.']
        return loginRD(res);
    }
    const validpass = await user.validatePass(req.body.password)
    if (!validpass) {
        req.session.errors = ['Incorrect password.']
        return loginRD(res);
    }
    req.session.user_id = user.id;
    rootRD(res);
})

router.get('/logout', async (req, res) => {
    req.session.destroy();
    rootRD(res);
})

module.exports = router;