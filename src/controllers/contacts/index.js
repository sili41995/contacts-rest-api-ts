const add = require('./add');
const deleteById = require('./deleteById');
const getAll = require('./getAll');
const getById = require('./getById');
const updateById = require('./updateById');
const updateAvatarById = require('./updateAvatarById');

module.exports = {
  getAll,
  getById,
  add,
  updateById,
  deleteById,
  updateAvatarById,
};
