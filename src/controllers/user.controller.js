const User = require("../models/user.model");
const Cart = require("../models/cart.model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  const { username, email, password } = req.body;
  let foundUser = await User.findOne({ email });
  if (foundUser) {
    return res.status(400).json({ message: "El usuario ya existe" });
  }
  try {
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const newCart = await Cart.create({});

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      cart: newCart
    });
    return res.json({ newUser });
  } catch (error) {
    return res.status(500).json({
      msg: "Hubo un error al crear el usuario",
      error: error.message,
    });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    let foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }
    const foundedPassword = await bcryptjs.compare(
      password,
      foundUser.password
    );
    if (!foundedPassword) {
      return res
        .status(400)
        .json({ msg: "Usuario o contraseña incorrecta" });
    }

    const payload = { user: { id: foundUser.id } };
    jwt.sign(
      payload,
      process.env.SECRET_KEY,
      { expiresIn: '1d' },
      (error, token) => {
        if (error) {
          return res.status(500).json({
            msg: "Error al generar el token",
            error: error.message
          });
        }
        const isProd = process.env.NODE_ENV === 'production';
        res.
          cookie('token', token, {
            httpOnly: true,
            secure: isProd,
            sameSite: isProd ? 'None' : 'Lax',
            maxAge: 24 * 60 * 60 * 1000 // 1 day
          })
          .json({
            msg: "Usuario logueado correctamente"
          });
      }
    );
  } catch (error) {
    return res.status(500).json({
      msg: "Hubo un error al iniciar sesión",
      error: error.message
    });
  }
};

exports.verifyUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    return res.json({ user });
  } catch (error) {
    return res.status(500).json({
      msg: "Hubo un error al validar el usuario",
      error
    });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({ username: { $ne: "Administrador" } }).select("username email role");
    return res.json({ users });
  } catch (error) {
    return res.status(500).json({
      msg: "Hubo un error al consultar los usuarios",
      error: error.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  const newDataUser = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      newDataUser,
      { new: true }
    ).select("-password");

    res.json({
      msg: "Usuario actualizado correctamente.",
      data: updatedUser
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hubo un error actualizando el usuario."
    })
  }
};

exports.adminUser = async (req, res) => {
  let newRole = "";
  const { id, role } = req.body[0];
  if (role == "Usuario") {
    newRole = "Administrador"
  } else {
    newRole = "Usuario"
  }

  const newDataUser = {
    role: newRole
  }

  try {
    await User.findByIdAndUpdate(
      id,
      newDataUser,
      { new: true }
    );
    return res.json({ msg: "Rol actualizado correctamente." });
  } catch (error) {
    return res.status(500).json({
      msg: "Hubo un error al actualizar el usuario",
      error: error.message,
    });
  }
};

exports.logoutUser = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax'
  })
  return res.json({ msg: "Sesión cerrada correctamente" });
};
