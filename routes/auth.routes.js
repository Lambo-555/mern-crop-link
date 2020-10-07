const {Router} = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator');
const User = require('../models/User');
const router = Router();

/// /api/auth
router.post(
    //API route
    '/register',
    //middleware
    [
      check('email', 'Wrong email').isEmail(),
      check('password', 'Auth.Error: pass.length < 6')
          .isLength({min: 6})
    ],
    //logic
    async (req, res) => {
      try {
        //validator
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({
            errors: errors.array(),
            message: 'Not correct registration data'
          });
        }

        const {email, password} = req.body;

        const candidate = await User.findOne({email: email});
        if (candidate) {
          console.warn('client try to get exist email');
          return res.status(400)
              .json({message: 'Auth.Error: email not unique'});
        }

        const hashedPass = await bcrypt.hash(password, 'salt')
        const user = new User({email: email, password: hashedPass})

        await user.save();

        res.status(201)
            .json({message: `Auth.NewUserIsRegistered. Email: ${email}`})

      } catch (e) {
        res.status(500).json({message: 'Auth.Error: req res'});
        console.error(e.message);
      }
    });

/// /api/login
router.post(
    '/login',
    [
      check('email', 'Enter the correct email')
          .normalizeEmail()
          .isEmail(),
      check('password', 'Enter right password').exists()
    ],
    async (req, res) => {
      try {
        //validator
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({
            errors: errors.array(),
            message: 'Auth.Error: Login data is wrong'
          });
        }

        const {email, password} = req.body;
        const user = await User.findOne({email});
        if (!user) {
          return res.status(400)
              .json({message: 'Auth.Error: User not found'});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400)
              .json({message: 'Auth.Error: Wrong password'});
        }

        const token = jwt.sign(
            {userId: user.id},
            config.get('jwtSecret'),
            {expiresIn: '1h'}
        );

        res.json({ token: token, userId: user.id})

      } catch (e) {
        res.status(500).json({message: 'Auth.Error: req res'});
        console.error(e.message);
      }
    });

module.exports = router;