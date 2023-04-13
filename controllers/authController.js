const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ 'message': 'Username and password are required.' });

    const user = await User.findOne({ email: email }).exec();
    if (!user) return res.sendStatus(401);
    
    const match = await bcrypt.compare(password, user.password);
    if (match) {

        const roles = Object.values(user.roles).filter(Boolean);
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "email": user.email,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '150s' }
        );
        const refreshToken = jwt.sign(
            { "email": user.email },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        
        user.refreshToken = refreshToken;
        const result = await user.save();
        console.log(result);
        console.log(roles);

        
        res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

        
        //res.json({ roles, accessToken, email, firstName, lastName, dni, phone, id });
        res.json({user, accessToken})

    } else {
        res.sendStatus(401);
    }
}

module.exports = { handleLogin };