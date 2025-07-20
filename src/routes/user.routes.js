const express = require('express');
const userRouter = express.Router();
const auth = require('../middleware/authorization');
const {
    createUser,
    loginUser,
    verifyUser,
    getUsers,
    updateUser,
    adminUser,
    deleteUser,
    logoutUser
} = require('../controllers/user.controller');

userRouter.post('/create', createUser);
userRouter.post('/login', loginUser);
userRouter.get('/verify-user', auth, verifyUser);
userRouter.get('/', auth, getUsers);
userRouter.put('/update', auth, updateUser);
userRouter.put('/admin-user', auth, adminUser);
userRouter.delete('/', auth, deleteUser);
userRouter.post('/logout', logoutUser);

module.exports = userRouter;
