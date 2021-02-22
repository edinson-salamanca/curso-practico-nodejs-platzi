const express = require('express');

const response = require('../../../network/response.js');
const Controller = require('./index');

const router = express.Router();

router.get('/', list);
router.get('/:id', get);
router.post('/', upsert);
router.put('/', upsert);

async function list(req, res) {
  try {
    let list = await Controller.list();
    response.success(req, res, list, 200);
  } catch (error) {
    response.error(req, res, error.message, 500);
  }
}

async function get(req, res) {
  try {
    let user = await Controller.get(req.params.id);
    response.success(req, res, user, 200);
  } catch (error) {
    response.error(req, res, error.message, 500);
  }
}

async function upsert(req, res) {
  try {
    let user = await Controller.upsert(req.body);
    response.success(req, res, user, 201);
  } catch (error) {
    response.error(req, res, error.message, 500);
  }
}
module.exports = router;
