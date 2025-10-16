const userService = require('../services/userService');

const DEFAULT_AVATAR = process.env.DEFAULT_AVATAR_URL || null;

const withDefaultPhoto = (u) => {
  if (!u) return u;
  // funciona para objetos planos y para instancias Sequelize con .toJSON()
  const obj = typeof u.toJSON === 'function' ? u.toJSON() : u;
  if (!obj.photo && DEFAULT_AVATAR) obj.photo = DEFAULT_AVATAR;
  return obj;
};

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await userService.getAllUsers();
    const data = Array.isArray(allUsers) ? allUsers.map(withDefaultPhoto) : [];
    res.status(200).send({ status: "OK", data });
  } catch (error) {
    res.status(500).send({ status: "FAILED", data: { error: error.message } });
  }
};

const getUser = async (req, res) => {
  const id = req.params.userId;
  try {
    const user = await userService.getUser(id);
    res.status(200).send({ status: "OK", data: withDefaultPhoto(user) });
  } catch (error) {
    res.status(error.status || 500).send({ status: "FAILED", data: { error: error.message } });
  }
};

const createUser = async (req, res) => {
  try {
    const { body } = req;

    // si no envían photo, usa la del .env
    const photo = body.photo && body.photo.trim() !== "" ? body.photo : DEFAULT_AVATAR;

    const createdUser = await userService.createUser(
      body.userName, body.password, body.email, body.name, body.lastName,
      body.phone, photo, body.fkIdRoles
    );

    res.status(201).send({ status: "OK", data: withDefaultPhoto(createdUser) });
  } catch (error) {
    res.status(400).send({ status: "FAILED", data: { error: error.message } });
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.userId;
    let { userName, password, email, name, lastName, phone, photo, fkIdRoles } = req.body;

    // si no mandan photo (o viene vacía), no forces NULL; aplica default si en BD está vacío
    if (!photo || photo.trim() === "") photo = DEFAULT_AVATAR;

    const updatedUser = await userService.updateUser(
      id, userName, password, email, name, lastName, phone, photo, fkIdRoles
    );

    res.status(200).send({ status: "OK", data: withDefaultPhoto(updatedUser) });
  } catch (error) {
    res.status(400).send({ status: "FAILED", data: { error: error.message } });
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.userId;
  const deletedUser = await userService.deleteUser(id);
  if (deletedUser)
    res.status(200).send({ status: "OK", data: deletedUser });
  else
    res.status(400).send({ status: "FAILED", data: deletedUser });
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
};