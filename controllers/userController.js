const userService = require('../services/userService');

const DEFAULT_AVATAR = process.env.DEFAULT_AVATAR_URL || null;
const PUBLIC_BASE_URL = process.env.PUBLIC_BASE_URL || ''; // p.ej. http://10.0.2.2:6000

// Normaliza la foto: nunca null, y convierte rutas locales en URL absoluta
const toAbsolute = (photo) => {
  // si no hay foto, usa el default (si está configurado)
  if (!photo || String(photo).trim() === '') {
    return DEFAULT_AVATAR || null;
  }
  const val = String(photo).trim();

  // si ya es absoluta, la devolvemos tal cual
  if (/^https?:\/\//i.test(val)) return val;

  // si es relativa (ej: /public/uploads/users/...), prepender base pública
  if (val.startsWith('/')) {
    if (PUBLIC_BASE_URL) return `${PUBLIC_BASE_URL}${val}`;
    return val; // fallback sin base (no recomendado, pero evita romper)
  }

  // cualquier otro caso, devuélvelo como está
  return val;
};

const mapUserOut = (u) => {
  if (!u) return u;
  const obj = typeof u.toJSON === 'function' ? u.toJSON() : u;
  obj.photo = toAbsolute(obj.photo);
  return obj;
};

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await userService.getAllUsers();
    const data = Array.isArray(allUsers) ? allUsers.map(mapUserOut) : [];
    res.status(200).send({ status: "OK", data });
  } catch (error) {
    res.status(500).send({ status: "FAILED", data: { error: error.message } });
  }
};

const getUser = async (req, res) => {
  const id = req.params.userId;
  try {
    const user = await userService.getUser(id);
    res.status(200).send({ status: "OK", data: mapUserOut(user) });
  } catch (error) {
    res.status(error.status || 500).send({ status: "FAILED", data: { error: error.message } });
  }
};

const createUser = async (req, res) => {
  try {
    const { body } = req;

    // si no envían photo, guarda el default en BD
    const photo = body.photo && body.photo.trim() !== "" ? body.photo : (DEFAULT_AVATAR || null);

    const createdUser = await userService.createUser(
      body.userName, body.password, body.email, body.name, body.lastName,
      body.phone, photo, body.fkIdRoles
    );

    res.status(201).send({ status: "OK", data: mapUserOut(createdUser) });
  } catch (error) {
    res.status(400).send({ status: "FAILED", data: { error: error.message } });
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.userId;
    let { userName, password, email, name, lastName, phone, photo, fkIdRoles } = req.body;

    // si no mandan photo (o vacía), guarda el default en BD
    if (!photo || photo.trim() === "") photo = (DEFAULT_AVATAR || null);

    const updatedUser = await userService.updateUser(
      id, userName, password, email, name, lastName, phone, photo, fkIdRoles
    );

    res.status(200).send({ status: "OK", data: mapUserOut(updatedUser) });
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
