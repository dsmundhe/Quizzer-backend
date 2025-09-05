const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserModel } = require('../schema/UserSchema');

// JWT secret from .env
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

// ================= SIGNUP =================
const signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        if (!name || !email || !password) {
            return res.status(400).json({ msg: 'Provide all required data' });
        }

        const isPresent = await UserModel.findOne({ email });
        if (isPresent) {
            return res.status(409).json({ msg: "User Already Present!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await UserModel.create({ name, email, password: hashedPassword });

        return res.status(201).json({ msg: "Signup Successful!" });

    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
};

// ================= LOGIN =================
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ msg: 'Provide email and password' });
        }

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ msg: 'Invalid password' });
        }

        // Create JWT token
        const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
            expiresIn: '1h' // token expires in 1 hour
        });

        const { password: pwd, ...userData } = user.toObject();
        return res.status(200).json({ msg: 'Login Successful!', user: userData, token });

    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
};

// ================= EDIT PROFILE =================
const editProfile = async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;

    try {
        const updateData = {};

        if (name) updateData.name = name;
        if (email) updateData.email = email;
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updateData.password = hashedPassword;
        }

        const updatedUser = await UserModel.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ msg: 'User not found' });
        }

        const { password: pwd, ...userData } = updatedUser.toObject();
        return res.status(200).json({ msg: 'Profile updated successfully', user: userData });

    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
};

// ================= DELETE PROFILE =================
const deleteProfile = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedUser = await UserModel.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ msg: 'User not found' });
        }

        return res.status(200).json({ msg: 'User deleted successfully' });

    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
};

module.exports = { signup, login, editProfile, deleteProfile };
