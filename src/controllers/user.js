const { Router } = require('express');

const { isGuest } = require('../middlewares/guards');
const { register, login } = require('../services/user');
const { createToken } = require('../services/jwt');

const userRouter = Router();

userRouter.get('/register', isGuest(), (req, res) => {
    res.render('register');
});
userRouter.post('/register', isGuest(), async (req,res) => {
    const { email, password } = req.body;

    try {
        const result = await register(email, password);
        const token = createToken(result);

        res.cookie('token', token);
    } catch(err) {
        res.render('register', { data: { email }, errors: err.errors});
    }
});

module.exports = { userRouter };