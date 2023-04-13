const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {

    const {firstName, lastName, phone, email, dni, password} = req.body
    if (!firstName || !password) return res.status(400).json({ 'message': 'Username and password are required.' });

   
    const duplicate = await User.findOne({ email: email }).exec();
    if (duplicate) return res.sendStatus(409); 

    try {
        
        const hashedPwd = await bcrypt.hash(password, 10);

        
        const result = await User.create({
            'firstName': firstName,
            'lastName': lastName,
            'phone': phone,
            'email': email,
            'dni': dni,
            'password': hashedPwd
        });

        console.log(result);

        res.status(201).json({ 'success': `New user ${firstName} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewUser };