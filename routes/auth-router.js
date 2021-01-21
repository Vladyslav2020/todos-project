const {Router} = require('express');
const bcrypt = require('bcrypt');
const {check, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const router = Router();
const User = require('../models/User');
const config = require('config');

// /api/auth/register
router.post('/register',
    [
        check('email', 'Incorrect email').isEmail(),
        check('name', 'Incorrect name').notEmpty().isLength({min: 3}),
        check('password', 'Min length of password is 6 characters').isLength({min: 6})
    ], 
    async (req, res) => {
        try{
            const errors = validationResult(req);
            if (!errors.isEmpty()){
                return res.status(400).json({message: errors.array({ onlyFirstError: false })[0].msg});
            }
            const {name, email, password} = req.body;
            const candidat = await User.findOne({email});
            if (candidat){
                return res.status(400).json({message: "This user already exists"});
            }
            const hashedPassword = await bcrypt.hash(password, 12);
            const user = new User({name, email, password: hashedPassword});
            await user.save();
            res.status(200).json({message: "User created"});
        }
        catch(err){
            res.status(500).json({message: "Something is wrong, please try again"});
            console.log('Server was crashed:', err.message);
        }
});

// /api/auth/login
router.post('/login',
    [
        check('email', 'Incorrect email').normalizeEmail().isEmail(),
        check('password', 'Min size of password is 6 characters').exists()
    ],
    async(req, res) => {
        try{
            const errors = validationResult(req);
            if (!errors.isEmpty()){
                return res.status(400).json({message: 'Some data is incorrect'});
            }
            const {email, password} = req.body;
            const user = await User.findOne({email})
            if (!user){
                return res.status(400).json({message: "Incorrect data, try again"});
            }
            const isCorrect = await bcrypt.compare(password, user.password);
            if (!isCorrect){
                return res.status(400).json({message: "Incorrect data, try again"});
            }

            const token = jwt.sign({userId: user.id}, config.get('jwtSecretKey'), {expiresIn: '1h'})
            res.status(200).json({token, userId: user.id, name: user.name});
        }
        catch(err){
            res.status(500).json({message: "Server error, please try again"});
            console.log('Server was crashed', err.message);
        }
});

module.exports = router;