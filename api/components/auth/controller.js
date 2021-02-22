const aut = require('../../../auth');
const TABLA = 'auth';

module.exports = function (injectedStore) {
  let store = injectedStore;

  if (!store) {
    store = require('../../../store/dummy');
  }

  async function login(userName, password) {
    const data = await store.query(TABLA, { userName: userName });

    if (data.password === password) {
      // generar token
      return aut.sign(data);
    } else {
      throw new Error('Informacion invalida');
    }
  }

  function upsert(data) {
    const authData = {
      id: data.id,
    };

    if (data.userName) {
      authData.userName = data.userName;
    }

    if (data.password) {
      authData.password = data.password;
    }

    store.upsert(TABLA, authData);
  }

  return {
    upsert,
    login,
  };
};
