const router = require('express').Router();
const Post = require('../models')
const { isLoggedIn, isAuthed, auth } = require('./utils/authenticate')
const { dashRD, loginRD } = require('./utils/redirects')

logErr = (req, res, err) => {
    console.log(err);
    if (err.errors) req.session.errors = err.errors.map(obj => obj.message);
    dash(res);
}

err404 = (res) => {
    res.status(404).json({ error: 'Post not found'})
    dash(res);
}

router.post('/new-post', isAuthed, auth, async (req, res) => {
    try {
        const post = await Post.create(req.body)
        await req.user.addPost(post)
        dash(res);
    } catch (err) {logErr(req, res, err)}
})

router.put('/edit', isAuthed, auth, async(req, res) => {
    const { id, content } = req.body;
    try {
        const post = await Post.update({ content: content, where: { id: id }})
        if (!post) return err404(res)
    } catch (err) {logErr(req, res, err)}
})

router.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const post = await Post.findByPk(id)
        if (!post) return err404(res)

        await post.destroy()
        dash(res);
    } catch (err) {logErr(req, res, err)}
})

module.exports = router;