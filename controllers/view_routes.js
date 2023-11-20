const router = require('express').Router();
const { User, Post } = require('../models')
const { auth, isAuthed, isLoggedIn } = require('./utils/authenticate')

renderAuthPage = (page) => router.get(`/${page}`, isLoggedIn, auth, (req, res) => {
    res.render(page, {
        user: req.user,
        errors: req.session.errors
    })
    req.session.errors = [];
})

renderPostPage = (page) => res.render(page, {
    user: req.user,
    posts: posts.map(obj => obj.get({ plain: true}))
})

renderAuthPage('login')
renderAuthPage('register')

router.get('/', auth, async (req, res) => {
    const posts = await Post.findAll({
        include: {
            model: User,
            as: 'author'
        }
    })
    renderPostPage('home')
})

router.get('/dashboard', isAuthed, auth, async (req, res) => {
    const posts = await Post.findAll({
        where: {
            user_id: req.session.user_id
        }, include: {
            model: User,
            as: 'author'
        }
    })
    renderPostPage('dashboard')
    
})

module.exports = router;