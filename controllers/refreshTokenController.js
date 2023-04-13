const User = require('../model/User');
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) return res.sendStatus(403); 
    
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.email !== decoded.email) return res.sendStatus(403);
            const roles = Object.values(foundUser.roles);
            const email = foundUser.email
            const firstName = foundUser.firstName
            const lastName = foundUser.lastName
            const dni = foundUser.dni
            const phone = foundUser.phone
            const id = foundUser.id
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "email": decoded.email,
                        "roles": roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '300s' }
            );
            res.json({ roles, accessToken, email, firstName, lastName, dni, phone, id })
        }
    );
}

module.exports = { handleRefreshToken }