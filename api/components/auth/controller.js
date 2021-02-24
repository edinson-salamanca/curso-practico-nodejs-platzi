const bcrypt = require('bcrypt');

const aut = require('../../../auth');
const TABLA = 'auth';

module.exports = function (injectedStore) {
  let store = injectedStore;

  if (!store) {
    store = require('../../../store/dummy');
  }

  async function login(userName, password) {
    const data = await store.query(TABLA, { userName: userName });

    const isEquals = await bcrypt.compare(password, data.password);

    if (isEquals) {
      return aut.sign(data);
    }

    // return bcrypt.compare(password, data.password).then((isEquals) => {
    //   if (isEquals) {
    //     // generar token
    //     return aut.sign(data);
    //   }
    // });
  }

  async function upsert(data) {
    const authData = {
      id: data.id,
    };

    if (data.userName) {
      authData.userName = data.userName;
    }

    if (data.password) {
      authData.password = await bcrypt.hash(data.password, 5);
    }

    store.upsert(TABLA, authData);
  }

  return {
    upsert,
    login,
  };
};
