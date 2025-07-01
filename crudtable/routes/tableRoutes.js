const express = require('express');
const tableController = require('../controllers/tableController');

const router = express.Router();


router.post('/create-table', tableController.createTable);
router.post('/add-column', tableController.addColumn);
router.get('/tables', tableController.getAllTables);


router.post('/data', tableController.insertData);
// router.get('/data/:tableName', tableController.getData);
router.get('/data/:tableName/:id', tableController.getDataById);
router.put('/data/:tableName/:id', tableController.updateData);
router.delete('/data/:tableName/:id', tableController.deleteData);

module.exports = router;


